---
layout: single
title: "视频中所出现的代码 Tavily Search+RAG"
sidebar:
  nav: "docs"
date: 2024-05-06 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG]
tags: [AI, GPT, GPT-4, HuggingFace, LLM, Llama-3, Mistral, Ollama, PyTorch, RAG]
classes: wide
author_profile: true
---


#  视频中所出现的代码 **Tavily Search+RAG**

##  **unsloth安装命令：  
  
**
    
    
    conda create --name unsloth_env python=3.10
    conda activate unsloth_env
    
    conda install pytorch-cuda=12.1 pytorch cudatoolkit xformers -c pytorch -c nvidia -c xformers
    
    pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
    
    pip install --no-deps trl peft accelerate bitsandbytes

##  微调代码： 
    
    
    #app.py
    
    #dataset https://huggingface.co/datasets/shibing624/alpaca-zh/viewer
    
    from unsloth import FastLanguageModel
    import torch
    
    from trl import SFTTrainer
    from transformers import TrainingArguments
    
    
    
    
```
    max_seq_length = 2048 # Choose any! We auto support RoPE Scaling internally!
    dtype = None # None for auto detection. Float16 for Tesla T4, V100, Bfloat16 for Ampere+
    load_in_4bit = True # Use 4bit quantization to reduce memory usage. Can be False.
```
    
```
    # 4bit pre quantized models we support for 4x faster downloading + no OOMs.
    fourbit_models = [
        "unsloth/mistral-7b-bnb-4bit",
        "unsloth/mistral-7b-instruct-v0.2-bnb-4bit",
        "unsloth/llama-2-7b-bnb-4bit",
        "unsloth/gemma-7b-bnb-4bit",
        "unsloth/gemma-7b-it-bnb-4bit", # Instruct version of Gemma 7b
        "unsloth/gemma-2b-bnb-4bit",
        "unsloth/gemma-2b-it-bnb-4bit", # Instruct version of Gemma 2b
        "unsloth/llama-3-8b-bnb-4bit", # [NEW] 15 Trillion token Llama-3
    ] # More models at https://huggingface.co/unsloth
```
    
```
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = "unsloth/llama-3-8b-bnb-4bit",
        max_seq_length = max_seq_length,
        dtype = dtype,
        load_in_4bit = load_in_4bit,
        # token = "hf_...", # use one if using gated models like meta-llama/Llama-2-7b-hf
    )
```
    
```
    model = FastLanguageModel.get_peft_model(
        model,
        r = 16, # Choose any number > 0 ! Suggested 8, 16, 32, 64, 128
        target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                          "gate_proj", "up_proj", "down_proj",],
        lora_alpha = 16,
        lora_dropout = 0, # Supports any, but = 0 is optimized
        bias = "none",    # Supports any, but = "none" is optimized
        # [NEW] "unsloth" uses 30% less VRAM, fits 2x larger batch sizes!
        use_gradient_checkpointing = "unsloth", # True or "unsloth" for very long context
        random_state = 3407,
        use_rslora = False,  # We support rank stabilized LoRA
        loftq_config = None, # And LoftQ
    )
```
    
    alpaca_prompt = """Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.
    
    ### Instruction:
    {}
    
    ### Input:
    {}
    
    ### Response:
    {}"""
    
```
    EOS_TOKEN = tokenizer.eos_token # Must add EOS_TOKEN
    def formatting_prompts_func(examples):
        instructions = examples["instruction"]
        inputs       = examples["input"]
        outputs      = examples["output"]
        texts = []
        for instruction, input, output in zip(instructions, inputs, outputs):
            # Must add EOS_TOKEN, otherwise your generation will go on forever!
            text = alpaca_prompt.format(instruction, input, output) + EOS_TOKEN
            texts.append(text)
        return { "text" : texts, }
    pass
```
    
    from datasets import load_dataset
    
    #file_path = "/home/Ubuntu/alpaca_gpt4_data_zh.json"
    
    #dataset = load_dataset("json", data_files={"train": file_path}, split="train")
    
    dataset = load_dataset("yahma/alpaca-cleaned", split = "train")
    
    dataset = dataset.map(formatting_prompts_func, batched = True,)
    
    
    
    
```
    trainer = SFTTrainer(
        model = model,
        tokenizer = tokenizer,
        train_dataset = dataset,
        dataset_text_field = "text",
        max_seq_length = max_seq_length,
        dataset_num_proc = 2,
        packing = False, # Can make training 5x faster for short sequences.
        args = TrainingArguments(
            per_device_train_batch_size = 2,
            gradient_accumulation_steps = 4,
            warmup_steps = 5,
            max_steps = 60,
            learning_rate = 2e-4,
            fp16 = not torch.cuda.is_bf16_supported(),
            bf16 = torch.cuda.is_bf16_supported(),
            logging_steps = 1,
            optim = "adamw_8bit",
            weight_decay = 0.01,
            lr_scheduler_type = "linear",
            seed = 3407,
            output_dir = "outputs",
        ),
    )
```
    
    trainer_stats = trainer.train()
    
```
    model.save_pretrained_gguf("llama3", tokenizer, quantization_method = "q4_k_m")
    model.save_pretrained_gguf("llama3", tokenizer, quantization_method = "q8_0")
    model.save_pretrained_gguf("llama3", tokenizer, quantization_method = "f16")
```
    
    
```
    #to hugging face
    model.push_to_hub_gguf("leo009/llama3", tokenizer, quantization_method = "q4_k_m")
    model.push_to_hub_gguf("leo009/llama3", tokenizer, quantization_method = "q8_0")
    model.push_to_hub_gguf("leo009/llama3", tokenizer, quantization_method = "f16")
```
    

##  模型导入ollama 
    
    
    FROM ./downloads/mistrallite.Q4_K_M.gguf
    ollama create example -f Modelfile
    

##  实现在线搜索 

  1. **Create a virtual environment**


    
    
    python3 -m venv ~/.venvs/aienv
    source ~/.venvs/aienv/bin/activate
    

  2. 获取 **Tavily AI API**


[ https://app.tavily.com/home ](<https://app.tavily.com/home>)
    
    
    export TAVILY_API_KEY=tvly-xxxxxxxxxxx

  3. **install tavily-python**


    
    
    pip install tavily-python
    
    
    #app.py
    import warnings
    
    # Suppress only the specific NotOpenSSLWarning
    warnings.filterwarnings("ignore", message="urllib3 v2 only supports OpenSSL 1.1.1+")
    
```
    from phi.assistant import Assistant
    from phi.llm.ollama import OllamaTools
    from phi.tools.tavily import TavilyTools
```
    
    
```
    # 创建一个Assistant实例，配置其使用OllamaTools中的llama3模型，并整合Tavily工具
    assistant = Assistant(
        llm=OllamaTools(model="mymodel3"),  # 使用OllamaTools的llama3模型
        tools=[TavilyTools()],
        show_tool_calls=True,  # 设置为True以展示工具调用信息
    )
```
    
    # 使用助手实例输出请求的响应，并以Markdown格式展示结果
    assistant.print_response("Search tavily for 'GPT-5'", markdown=True)

##  微调好的模型： [ https://huggingface.co/leo009/llama3/tree/main ](<https://huggingface.co/leo009/llama3/tree/main>)

##  如有问题请联系我的徽信：stoeng 
