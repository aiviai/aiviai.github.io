---
layout: single
title: "微调Llama-3-Instruct-8B-SimPO并使用Llama Index和AutoGen Studio构建AI Agent"
sidebar:
  nav: "docs"
date: 2024-05-29 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, Tutorial]
tags: [AI, AI-Agents, AutoGen, Chainlit, GPT, GPT-4, HuggingFace, LLM, Llama-3, Mistral]
classes: wide
author_profile: true
---


#  微调Llama-3-Instruct-8B-SimPO并使用Llama Index和AutoGen Studio构建AI Agent 

###  Nvidia AI workbench下载链接 [ https://docs.nvidia.com/ai-workbench/user-guide/latest/installation/windows.html ](<https://docs.nvidia.com/ai-workbench/user-guide/latest/installation/windows.html>)

###  Colab微调代码 

[ https://colab.research.google.com/drive/1P8pqaGuKmNprxX4YQgHHrbEwP_mndYoa ](<https://colab.research.google.com/drive/1P8pqaGuKmNprxX4YQgHHrbEwP_mndYoa>)

###  本地微调代码 
    
    
```
    ###AI超元域频道原创代码和视频，版权所有，禁止盗搬视频
    #先配置微调环境
    #conda create --name unsloth_env python=3.10
    #conda activate unsloth_env
```
    
    #conda install pytorch-cuda=12.1 pytorch cudatoolkit xformers -c pytorch -c nvidia -c xformers
    
    #pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
    #pip install --no-deps packaging ninja einops flash-attn xformers trl peft accelerate bitsandbytes
    
    
    
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
        "princeton-nlp/Llama-3-Instruct-8B-SimPO", # [NEW] 15 Trillion token Llama-3
    ] # More models at https://huggingface.co/unsloth
```
    
```
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = "princeton-nlp/Llama-3-Instruct-8B-SimPO",
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
    #保存为gguf格式
    model.save_pretrained_gguf("llama3SimPO", tokenizer, quantization_method = "q4_k_m")
    model.save_pretrained_gguf("llama3SimPO", tokenizer, quantization_method = "q8_0")
    model.save_pretrained_gguf("llama3SimPO", tokenizer, quantization_method = "f16")
```
    
    
```
    #to hugging face
    model.push_to_hub_gguf("您的hf账号/llama3SimPO", tokenizer, quantization_method = "q4_k_m")
    model.push_to_hub_gguf("您的hf账号/llama3SimPO", tokenizer, quantization_method = "q8_0")
    model.push_to_hub_gguf("您的hf账号/llama3SimPO", tokenizer, quantization_method = "f16")
```
    
    

###  转GGUF 

[ https://huggingface.co/spaces/ggml-org/gguf-my-repo ](<https://huggingface.co/spaces/ggml-org/gguf-my-repo>)

###  Modelfile内容 
    
    
    FROM ./llama-3-instruct-8b-simpo-q8_0.gguf
    
    
    PARAMETER stop "<|im_start|>"
    PARAMETER stop "<|im_end|>"
    
```
    TEMPLATE """
    <|im_start|>system
    {{ .System }}<|im_end|>
    <|im_start|>user
    {{ .Prompt }}<|im_end|>
    <|im_start|>assistant
    """
```
    
    
    
    
    PARAMETER temperature 0.8
    PARAMETER num_ctx 8192
    
```
    PARAMETER stop "<|system|>"
    PARAMETER stop "<|user|>"
    PARAMETER stop "<|assistant|>"
```
    
    
    
    SYSTEM """You are a helpful, smart, kind, and efficient AI assistant.Your name is Aila. You always fulfill the user's requests to the best of your ability."""
    
    
    
    
    
    ##导入模型并运行
    ollama create mymodel -f Modelfile
    
    ollama run mymodel
    

###  Llama Index & chainlit 构建Todo Manager 
    
    
    ###AI超元域频道原创代码和视频，版权所有，禁止盗搬视频
    
    ###安装chainlit
    pip install chainlit
    
    ###安装llama index
    pip install llama-index
    
    
    
```
    ###运行方式
    ###chainlit run todo.py -w
    ###AI超元域频道原创代码和视频，版权所有，禁止盗搬视频
```
    
```
    import chainlit as cl
    from llama_index.core.tools import BaseTool, FunctionTool
    from llama_index.core.agent import ReActAgent
    from llama_index.llms.ollama import Ollama
    from llama_index.core import Settings
    import nest_asyncio
```
    
```
    nest_asyncio.apply()
    llm = Ollama(model="simpo:latest", request_timeout=120.0)
    Settings.llm = llm
```
    
    todo_list = []
    
```
    def add_todo(item: str) -> str:
        """Add an item to the todo list."""
        todo_list.append(item)
        return f"Added to todo: {item}"
```
    
```
    def list_todos() -> str:
        """List all items in the todo list."""
        if todo_list:
            return "Your Todo List:\n" + "\n".join(f"- {item}" for item in todo_list)
        else:
            return "Your todo list is currently empty."
```
    
```
    def remove_todo(item: str) -> str:
        """Remove an item from the todo list if it exists."""
        if item in todo_list:
            todo_list.remove(item)
            return f"Removed from todo: {item}"
        else:
            return "Item not found in todo list."
```
    
```
    add_tool = FunctionTool.from_defaults(fn=add_todo)
    list_tool = FunctionTool.from_defaults(fn=list_todos)
    remove_tool = FunctionTool.from_defaults(fn=remove_todo)
```
    
```
    agent = ReActAgent.from_tools(
        [add_tool, list_tool, remove_tool],
        llm=llm,
        verbose=True,
    )
```
    
```
    @cl.on_chat_start
    async def on_chat_start():
        """Send a welcome message when the chat starts."""
        await cl.Message(content="Hello, welcome to your Todo Manager!AI超元域频道创建").send()
        cl.user_session.set("agent", agent)
```
    
```
    @cl.on_message
    async def on_message(message: cl.Message):
        """Handle new messages and execute the corresponding todo list operations."""
        agent = cl.user_session.get("agent")
        full_command = message.content.strip()  # Get the full command as a single string
        response = agent.chat(full_command)  # Pass the full command as a single string
        await cl.Message(content=str(response)).send()
```
    
    # Ensure the agent.chat method is adapted to handle a single string of the full command.
    

###  AutoGen Studio + llama3 SimPO 
    
    
    ###安装
    pip install autogenstudio
    
    ##启动autogen studio
    autogenstudio ui --port 8081
    
    ###在浏览器访问 http://127.0.0.1:8081/
    
```
    ###Agent1 你的名字叫Jack，你是一个中文AI作家。你的角色是根据指定主题创作引人入胜且信息丰富的文章，并且根据你的同事Emma的建议来修改和完善你创作的文章，每当你收到Emma的建议时，都要根据Emma的建议给出修改和完善后的完整文章。
    ###Agent2 你的名字叫Emma，你的角色是一个中文AI文章评审员。你的任务是针对你的同事Jack所写的文章评估并提出改进建议，每次对话你都要对文章作出评估并给出修改建议。
    ###提问  Jack，请用中文写一篇关于科学家穿遇到未来的文章。
```
    
    
```
    ###Ollama api 配置
    ###model name:simpo:latest
    ###Api key:ollama
    ###base url:http://localhost:11434/v1
```

###  如有问题请联系我的徽信 stoeng 

###  🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇ 

###  👉👉👉 [ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>)

###  👉👉👉 [ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>)
