---
layout: single
title: "🚀unsloth微调Qwen3大模型保姆级视频教程！从数据处理到LoRA微调Qwen3-14B到4比特量化并且用LM Studio运行！零代码基础也能完成的LoRA高效微调全过程详解！小白也能轻松入门"
sidebar:
  nav: "docs"
date: 2025-05-03 00:00:00 +0800
categories: LLMs
tags: [Qwen3, Fine-Tuning, 微调, 微调Qwen3, Qwen3-14B, AI, AIGC]
classes: wide
author_profile: true
---

unsloth微调Qwen3模型提供显著优势：训练速度提高2倍，VRAM使用减少70%，支持8倍长的上下文。Qwen3-30B-A3B仅需17.5GB VRAM即可运行。unsloth的Dynamic 2.0量化技术保证了高精度，同时支持原生128K上下文长度。Qwen3模型具有思考模式和非思考模式，适用于不同复杂度的任务。微调后的模型可用于法律文档分析、定制知识库构建等领域，能够处理特定领域查询并保持上下文，优于纯检索系统。unsloth支持4bit/16bit的QLoRA/LoRA微调，适用于2018年后的NVIDIA GPU，为资源有限环境下的模型定制提供了高效解决方案。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV17jGdzAETg/)
- [👉👉👉 通过YouTube观看](https://youtu.be/opk1f-XtIsw)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  

## Qwen3模型微调的主要场景

unsloth支持对Qwen3模型进行微调，可以应用于以下场景：

1. 法律文档辅助 - 在法律文本（合同、案例法、法规）上进行微调，用于合同分析、案例法研究或合规支持
2. 定制知识库 - 将专业领域的知识直接嵌入到模型中，使其能够处理特定领域的查询和文档总结

Qwen3模型本身具有两种工作模式，使微调后的模型更加灵活：

1. 思考模式(Thinking Mode)：模型会在给出最终答案前进行逐步推理，适合需要深度思考的复杂问题
2. 非思考模式(Non-Thinking Mode)：模型提供快速、近乎即时的回答，适合简单问题

## 使用unsloth微调Qwen3的主要优势

unsloth使Qwen3(8B)微调速度提高2倍，VRAM使用减少70%，并且比所有使用Flash Attention 2的环境支持长8倍的上下文长度。使用unsloth，Qwen3-30B-A3B模型可以舒适地在仅17.5GB VRAM的环境中运行。

unsloth为Qwen3提供了Dynamic 2.0量化方法，在5-shot MMLU和KL散度基准测试中提供最佳性能。这意味着可以运行和微调量化后的Qwen3 LLM，同时保持最小的精度损失。unsloth还上传了支持原生128K上下文长度的Qwen3版本。

unsloth支持多种微调技术，包括4bit和16bit的QLoRA/LoRA微调。它通过手动推导所有计算密集型数学步骤并手写GPU核心，在不更改硬件的情况下使训练速度更快。

## 技术特点与支持

unsloth提供了多种设置选项来优化微调过程：

- max_seq_length = 2048：控制上下文长度。虽然Qwen3支持40960，但建议测试时使用2048。unsloth能够实现8倍长的上下文微调
- load_in_4bit = True：启用4位量化，减少微调时内存使用量至原来的1/4，适用于16GB GPU

unsloth上传了所有版本的Qwen3，包括Dynamic 2.0 GGUF、动态4位等格式到Hugging Face。此外，unsloth还支持包括30B-A3B和235B-A22B在内的Qwen3 MOE模型。

unsloth的技术支持包括：

- 支持2018年以后的NVIDIA GPU，最低CUDA能力要求7.0
- 支持各种Transformer风格的模型，包括Phi-4推理、Mixtral、MOE、Cohere等
- 支持任何训练算法，比如带VLM的GRPO

## 实际应用优势

与纯检索系统相比，微调提供了几个显著优势：

1. 微调几乎可以做到检索增强生成(RAG)能做的一切，但反之则不然
2. 在微调过程中，外部知识直接嵌入到模型中，使模型能够处理特定领域查询并在不依赖外部检索系统的情况下保持上下文
3. 即使在同时使用微调和RAG的混合设置中，微调后的模型也提供了可靠的后备方案

在特定领域，如医疗保健领域的视觉问答(VQA)任务中，微调使模型更好地理解领域特定的细微差别，提高其提供准确和上下文相关响应的能力。微调后的模型在精确度和召回率上表现明显优于零样本预测。

为获得最佳结果，建议策划结构良好的数据集，理想情况下是问答对形式。这可以增强学习、理解和响应准确性。

使用unsloth微调Qwen3模型可以实现更快的训练速度、更低的内存需求和更长的上下文支持，同时保持高精度。这使得即使在资源有限的环境中，也能够将强大的Qwen3模型适配到特定领域的应用场景中。

### 🔥🔥🔥完整微调代码

```python

**微调后的模型获得的能力:**

1. 双模式操作能力:

 - 普通对话模式: 适用于日常聊天场景
 - 思考模式(Thinking Mode): 用于解决需要推理的问题

2. 数学推理能力: 能够解决数学问题并展示详细的推理过程，如示例中的"解方程(x + 2)^2 = 0"
3. 对话能力保持: 同时保持了自然对话的能力，能够进行流畅的多轮对话

微调使模型成为一个"双重人格"的助手，既能进行普通闲聊，又能在需要时切换到更严谨的思考模式来解决复杂问题，特别是数学问题。

### 安装
"""

# Commented out IPython magic to ensure Python compatibility.
# %%capture
# import os
# if "COLAB_" not in "".join(os.environ.keys()):
#     # 如果不是在Google Colab环境中运行，则简单安装unsloth库
#     !pip install unsloth
# else:
#     # 在Google Colab环境中运行时的特殊安装流程
#     # 首先安装所有依赖库，但不处理它们的依赖关系(--no-deps参数)
#     !pip install --no-deps bitsandbytes accelerate xformers==0.0.29.post3 peft trl==0.15.2 triton cut_cross_entropy unsloth_zoo
#     # 安装常用的自然语言处理和模型托管工具
#     !pip install sentencepiece protobuf datasets huggingface_hub hf_transfer
#     # 最后安装unsloth库本身，不处理依赖(避免版本冲突)
#     !pip install --no-deps unsloth
#

"""### Unsloth"""

from unsloth import FastLanguageModel
import torch

fourbit_models = [
    "unsloth/Qwen3-1.7B-unsloth-bnb-4bit", # Qwen 14B 2x faster
    "unsloth/Qwen3-4B-unsloth-bnb-4bit",
    "unsloth/Qwen3-8B-unsloth-bnb-4bit",
    "unsloth/Qwen3-14B-unsloth-bnb-4bit",
    "unsloth/Qwen3-32B-unsloth-bnb-4bit",

    # 4bit dynamic quants for superior accuracy and low memory use
    "unsloth/gemma-3-12b-it-unsloth-bnb-4bit",
    "unsloth/Phi-4",
    "unsloth/Llama-3.1-8B",
    "unsloth/Llama-3.2-3B",
    "unsloth/orpheus-3b-0.1-ft-unsloth-bnb-4bit" # [NEW] We support TTS models!
] # More models at https://huggingface.co/unsloth

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/Qwen3-14B",
    max_seq_length = 2048,   # Context length - can be longer, but uses more memory
    load_in_4bit = True,     # 4bit uses much less memory
    load_in_8bit = False,    # A bit more accurate, uses 2x memory
    full_finetuning = False, # We have full finetuning now!
    token = "",      # use one if using gated models
)

"""We now add LoRA adapters so we only need to update 1 to 10% of all parameters!"""

# 添加LoRA适配器
# 通过LoRA技术，只需要更新1-10%的参数即可实现有效微调
model = FastLanguageModel.get_peft_model(
    model,
    r = 32,           # # LoRA秩，建议值为8,16,32,64,128
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj",],
    lora_alpha = 32,  # LoRA alpha值，建议设为rank或rank*2
    lora_dropout = 0, # LoRA dropout，0值经过优化
    bias = "none",    # 偏置设置，"none"已优化
    # [新特性] "unsloth"模式减少30%显存，可适应2倍大的批次大小
    use_gradient_checkpointing = "unsloth", #梯度检查点，用于长上下文
    random_state = 3407,  # 随机种子
    use_rslora = False,   # 是否使用rank stabilized LoRA
    loftq_config = None,  # LoftQ配置
)

"""<a name="Data"></a>
### Data Prep
Qwen3 has both reasoning and a non reasoning mode. So, we should use 2 datasets:

1. We use the [Open Math Reasoning]() dataset which was used to win the [AIMO](https://www.kaggle.com/competitions/ai-mathematical-olympiad-progress-prize-2/leaderboard) (AI Mathematical Olympiad - Progress Prize 2) challenge! We sample 10% of verifiable reasoning traces that used DeepSeek R1, and whicht got > 95% accuracy.

2. We also leverage [Maxime Labonne's FineTome-100k](https://huggingface.co/datasets/mlabonne/FineTome-100k) dataset in ShareGPT style. But we need to convert it to HuggingFace's normal multiturn format as well.
"""

# 数据准备
# Qwen3同时具有推理和非推理模式，因此使用两种数据集：
# 1. OpenMathReasoning数据集 - 用于数学推理能力
# 2. FineTome-100k数据集 - 用于一般对话能力
from datasets import load_dataset
# 加载数学推理数据集
reasoning_dataset = load_dataset("unsloth/OpenMathReasoning-mini", split = "cot",token="")
# 加载对话数据集
non_reasoning_dataset = load_dataset("mlabonne/FineTome-100k", split = "train",token="")

"""Let's see the structure of both datasets:"""

# 查看推理数据集结构
reasoning_dataset

# 查看非推理数据集结构
non_reasoning_dataset

"""We now convert the reasoning dataset into conversational format:"""

# 将推理数据集转换为对话格式
# 将数学问题和解决方案转换为用户-助手对话格式
# 参数:
#     examples: 批量样本，包含问题和解决方案
# 返回:
#     包含对话格式的字典

def generate_conversation(examples):
    problems  = examples["problem"]
    solutions = examples["generated_solution"]
    conversations = []
    for problem, solution in zip(problems, solutions):
        conversations.append([
            {"role" : "user",      "content" : problem},
            {"role" : "assistant", "content" : solution},
        ])
    return { "conversations": conversations, }

# 将转换后的推理数据集应用对话模板
reasoning_conversations = tokenizer.apply_chat_template(
    reasoning_dataset.map(generate_conversation, batched = True)["conversations"],
    tokenize = False, # 不进行分词，仅应用模板
)

"""Let's see the first transformed row:"""

# 查看转换后的第一个样本
reasoning_conversations[0]

"""Next we take the non reasoning dataset and convert it to conversational format as well.

We have to use Unsloth's `standardize_sharegpt` function to fix up the format of the dataset first.
"""

# 处理非推理数据集，转换为标准对话格式
from unsloth.chat_templates import standardize_sharegpt
dataset = standardize_sharegpt(non_reasoning_dataset)

# 将标准化后的非推理数据集应用对话模板
non_reasoning_conversations = tokenizer.apply_chat_template(
    dataset["conversations"],
    tokenize = False,
)

"""Let's see the first row"""

# 查看转换后的第一个非推理样本
non_reasoning_conversations[0]

"""Now let's see how long both datasets are:"""

# 查看两个数据集的大小
print(len(reasoning_conversations))
print(len(non_reasoning_conversations))

"""The non reasoning dataset is much longer. Let's assume we want the model to retain some reasoning capabilities, but we specifically want a chat model.

Let's define a ratio of chat only data. The goal is to define some mixture of both sets of data.

Let's select 25% reasoning and 75% chat based:
"""

# 设置聊天数据比例
# 让模型保持25%的推理能力和75%的聊天能力
chat_percentage = 0.75

"""Let's sample the reasoning dataset by 25% (or whatever is 100% - chat_percentage)"""

# 从非推理数据集中抽样，抽取数量为推理数据集的25%
import pandas as pd
non_reasoning_subset = pd.Series(non_reasoning_conversations)
non_reasoning_subset = non_reasoning_subset.sample(
    int(len(reasoning_conversations) * (1.0 - chat_percentage)),# 采样大小：推理数据集大小的25%
    random_state = 2407,
)

"""Finally combine both datasets:"""

# 合并两个数据集
data = pd.concat([
    pd.Series(reasoning_conversations),    # 推理对话数据
    pd.Series(non_reasoning_subset)        # 采样后的非推理对话数据
])
data.name = "text"  # 设置数据列名为"text"

# 将合并的数据转换为HuggingFace Dataset格式
from datasets import Dataset
combined_dataset = Dataset.from_pandas(pd.DataFrame(data))
# 随机打乱数据集
combined_dataset = combined_dataset.shuffle(seed = 3407)

# 查看数据集的基本信息
print(combined_dataset)

# 使用DataFrame展示前10条记录
import pandas as pd

# 转换为pandas DataFrame以便更好地显示
df = pd.DataFrame(combined_dataset[:10])
display(df)

"""<a name="Train"></a>
### Train the model
Now let's use Huggingface TRL's `SFTTrainer`! More docs here: [TRL SFT docs](https://huggingface.co/docs/trl/sft_trainer). We do 60 steps to speed things up, but you can set `num_train_epochs=1` for a full run, and turn off `max_steps=None`.
"""

# 使用HuggingFace TRL的SFTTrainer进行训练
from trl import SFTTrainer, SFTConfig
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = combined_dataset,
    eval_dataset = None,  # 可以设置评估数据集
    args = SFTConfig(
        dataset_text_field = "text",  # 指定数据集中的文本字段
        per_device_train_batch_size = 2,  # 每个设备的训练批次大小
        gradient_accumulation_steps = 4,  # 使用梯度累积模拟更大批次大小
        warmup_steps = 5,  # 预热步数
        # num_train_epochs = 1,  # 设置为1以进行完整训练
        max_steps = 30,
        learning_rate = 2e-4,   # 学习率（长期训练可降至2e-5）
        logging_steps = 1,  # 日志记录间隔
        optim = "adamw_8bit",  # 优化器
        weight_decay = 0.01,  # 权重衰减
        lr_scheduler_type = "linear",  # 学习率调度类型
        seed = 3407,  # 随机种子
        report_to = "none",   # 可设置为"wandb"等进行实验追踪
    ),
)

# 显示当前内存统计
gpu_stats = torch.cuda.get_device_properties(0)
start_gpu_memory = round(torch.cuda.max_memory_reserved() / 1024 / 1024 / 1024, 3)
max_memory = round(gpu_stats.total_memory / 1024 / 1024 / 1024, 3)
print(f"GPU = {gpu_stats.name}. Max memory = {max_memory} GB.")
print(f"{start_gpu_memory} GB of memory reserved.")

"""Let's train the model! To resume a training run, set `trainer.train(resume_from_checkpoint = True)`"""

# 开始训练模型
# 要恢复训练，可设置 resume_from_checkpoint = True
trainer_stats = trainer.train()

# 显示最终内存和时间统计
used_memory = round(torch.cuda.max_memory_reserved() / 1024 / 1024 / 1024, 3)
used_memory_for_lora = round(used_memory - start_gpu_memory, 3)
used_percentage = round(used_memory / max_memory * 100, 3)
lora_percentage = round(used_memory_for_lora / max_memory * 100, 3)
print(f"{trainer_stats.metrics['train_runtime']} seconds used for training.")
print(
    f"{round(trainer_stats.metrics['train_runtime']/60, 2)} minutes used for training."
)
print(f"Peak reserved memory = {used_memory} GB.")
print(f"Peak reserved memory for training = {used_memory_for_lora} GB.")
print(f"Peak reserved memory % of max memory = {used_percentage} %.")
print(f"Peak reserved memory for training % of max memory = {lora_percentage} %.")

"""<a name="Inference"></a>
### Inference
Let's run the model via Unsloth native inference! According to the `Qwen-3` team, the recommended settings for reasoning inference are `temperature = 0.6, top_p = 0.95, top_k = 20`

For normal chat based inference, `temperature = 0.7, top_p = 0.8, top_k = 20`
"""

# 模型推理
# 使用Unsloth原生推理功能测试模型
# 根据Qwen-3团队建议：
# - 推理模式：temperature=0.6, top_p=0.95, top_k=20
# - 普通聊天模式：temperature=0.7, top_p=0.8, top_k=20

# 测试没有启用thinking模式的普通对话
messages = [
    {"role" : "user", "content" : "Solve (x + 2)^2 = 0."}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize = False,
    add_generation_prompt = True, # 必须添加生成提示
    enable_thinking = False,  # 禁用thinking模式
)

# 使用普通对话参数进行文本生成
from transformers import TextStreamer
_ = model.generate(
    **tokenizer(text, return_tensors = "pt").to("cuda"),
    max_new_tokens = 256, # 增加以获得更长输出
    temperature = 0.7, top_p = 0.8, top_k = 20, # 普通对话模式参数
    streamer = TextStreamer(tokenizer, skip_prompt = True),
)

# 测试启用thinking模式的推理对话
messages = [
    {"role" : "user", "content" : "Solve (x + 2)^2 = 0."}
]
text = tokenizer.apply_chat_template(
    messages,
    tokenize = False,
    add_generation_prompt = True,  # 必须添加生成提示
    enable_thinking = True, # 启用thinking模式
)

# 使用推理模式参数进行文本生成
from transformers import TextStreamer
_ = model.generate(
    **tokenizer(text, return_tensors = "pt").to("cuda"),
    max_new_tokens = 1024,  # 增加以获得更长输出
    temperature = 0.6, top_p = 0.95, top_k = 20, # 推理模式参数
    streamer = TextStreamer(tokenizer, skip_prompt = True),
)

"""<a name="Save"></a>
### Saving, loading finetuned models
To save the final model as LoRA adapters, either use Huggingface's `push_to_hub` for an online save or `save_pretrained` for a local save.

**[NOTE]** This ONLY saves the LoRA adapters, and not the full model. To save to 16bit or GGUF, scroll down!
"""

# 模型保存
# 以下是多种保存模型的方式

# 保存LoRA适配器（不包含完整模型，体积小）
model.save_pretrained("lora_model")  # Local saving
tokenizer.save_pretrained("lora_model")
# model.push_to_hub("leo009/Qwen3-lora_model", token = "") # 上传到HuggingFace Hub
# tokenizer.push_to_hub("leo009/Qwen3-lora_model", token = "") # 上传到HuggingFace Hub

"""Now if you want to load the LoRA adapters we just saved for inference, set `False` to `True`:"""

# 加载刚刚保存的LoRA适配器（用于推理）
if True:
    from unsloth import FastLanguageModel
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name = "lora_model",  # 训练时使用的模型
        max_seq_length = 2048,
        load_in_4bit = True,
    )

"""### Saving to float16 for VLLM

We also support saving to `float16` directly. Select `merged_16bit` for float16 or `merged_4bit` for int4. We also allow `lora` adapters as a fallback. Use `push_to_hub_merged` to upload to your Hugging Face account! You can go to https://huggingface.co/settings/tokens for your personal tokens.
"""

# 保存为float16格式（用于VLLM）
# 支持多种保存方式：merged_16bit（float16）、merged_4bit（int4）或lora（适配器）

# Merge to 16bit
if False:
    model.save_pretrained_merged("model", tokenizer, save_method = "merged_16bit",)
if False: # 上传到HuggingFace Hub
    model.push_to_hub_merged("hf/model", tokenizer, save_method = "merged_16bit", token = "")

# 保存为4位精度
if True:
    model.save_pretrained_merged("model", tokenizer, save_method = "merged_4bit_forced",) # 改为_forced版本
if True: # 上传到HuggingFace Hub
    model.push_to_hub_merged("leo009/Qwen3-vLLM", tokenizer, save_method = "merged_4bit_forced", token = "") # 同样改为_forced版本

# 仅保存LoRA适配器
if False:
    model.save_pretrained_merged("model", tokenizer, save_method = "lora",)
if False: # 上传到HuggingFace Hub
    model.push_to_hub_merged("hf/model", tokenizer, save_method = "lora", token = "")

"""### GGUF / llama.cpp Conversion
To save to `GGUF` / `llama.cpp`, we support it natively now! We clone `llama.cpp` and we default save it to `q8_0`. We allow all methods like `q4_k_m`. Use `save_pretrained_gguf` for local saving and `push_to_hub_gguf` for uploading to HF.

Some supported quant methods (full list on our [Wiki page](https://github.com/unslothai/unsloth/wiki#gguf-quantization-options)):
* `q8_0` - Fast conversion. High resource use, but generally acceptable.
* `q4_k_m` - Recommended. Uses Q6_K for half of the attention.wv and feed_forward.w2 tensors, else Q4_K.
* `q5_k_m` - Recommended. Uses Q6_K for half of the attention.wv and feed_forward.w2 tensors, else Q5_K.

[**NEW**] To finetune and auto export to Ollama, try our [Ollama notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3_(8B)-Ollama.ipynb)
"""

# GGUF / llama.cpp 格式转换
# 支持多种量化方法，如q8_0、q4_k_m、q5_k_m等

# F16（Float16）格式

# 精度类型：半精度浮点数（16位浮点数）
# 内存占用：比原始FP32（32位浮点数）减少约50%的存储空间
# 精度保留：保留了相对较高的数值精度，损失较小
# 推理性能：比FP32快，但比更低位量化格式慢
# 适用场景：当需要在内存使用和模型精度之间取得平衡时使用

# Q4_K_M格式

# 精度类型：混合4位量化格式（是GGUF量化方案的一种）
# 内存占用：比F16减少约75%的存储空间，比原始FP32减少约87.5%
# 量化策略：针对不同权重采用不同的量化策略

# 对注意力机制中的WV矩阵和前馈网络中的W2矩阵的一半使用Q6_K量化
# 对其余权重使用Q4_K量化

# 精度与速度：牺牲一定精度以获得更小的文件大小和更快的推理速度
# 适用场景：适合在资源受限设备上运行模型，如个人电脑或移动设备

# # Save to 8bit Q8_0
# if False:
#     model.save_pretrained_gguf("model", tokenizer,)
# # Remember to go to https://huggingface.co/settings/tokens for a token!
# # And change hf to your username!
# if False:
#     model.push_to_hub_gguf("hf/model", tokenizer, token = "")

# # 保存为16位GGUF
# if False:
#     model.save_pretrained_gguf("model", tokenizer, quantization_method = "f16")
# if False: # 上传到HuggingFace Hub
#     model.push_to_hub_gguf("hf/model", tokenizer, quantization_method = "f16", token = "")

# # 保存为q4_k_m格式GGUF
if True:
    model.save_pretrained_gguf("model", tokenizer, quantization_method = "q4_k_m")
if True:# 上传到HuggingFace Hub
    model.push_to_hub_gguf("leo009/Qwen3-GGUF", tokenizer, quantization_method = "q4_k_m", token = "")

# # 保存多种GGUF格式（批量导出更高效）
# if False:
#     model.push_to_hub_gguf(
#         "hf/model", # Change hf to your username!
#         tokenizer,
#         quantization_method = ["q4_k_m", "q8_0", "q5_k_m",],
#         token = "", # Get a token at https://huggingface.co/settings/tokens
#     )

from google.colab import drive
drive.mount('/content/gdrive')

# Save to Google Drive with q4_k_m quantization
if True:
    model.save_pretrained_gguf("/content/gdrive/MyDrive/MyModel/model",
                              tokenizer,
                              quantization_method = "q4_k_m")

"""Now, use the `model.gguf` file or `model-Q4_K_M.gguf` file in llama.cpp or a UI based system like Jan or Open WebUI. You can install Jan [here](https://github.com/janhq/jan) and Open WebUI [here](https://github.com/open-webui/open-webui)

And we're done! If you have any questions on Unsloth, we have a [Discord](https://discord.gg/unsloth) channel! If you find any bugs or want to keep updated with the latest LLM stuff, or need help, join projects etc, feel free to join our Discord!

Some other links:
1. Train your own reasoning model - Llama GRPO notebook [Free Colab](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.1_(8B)-GRPO.ipynb)
2. Saving finetunes to Ollama. [Free notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3_(8B)-Ollama.ipynb)
3. Llama 3.2 Vision finetuning - Radiography use case. [Free Colab](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.2_(11B)-Vision.ipynb)
6. See notebooks for DPO, ORPO, Continued pretraining, conversational finetuning and more on our [documentation](https://docs.unsloth.ai/get-started/unsloth-notebooks)!

<div class="align-center">
  <a href="https://unsloth.ai"><img src="https://github.com/unslothai/unsloth/raw/main/images/unsloth%20new%20logo.png" width="115"></a>
  <a href="https://discord.gg/unsloth"><img src="https://github.com/unslothai/unsloth/raw/main/images/Discord.png" width="145"></a>
  <a href="https://docs.unsloth.ai/"><img src="https://github.com/unslothai/unsloth/blob/main/images/documentation%20green%20button.png?raw=true" width="125"></a>

  Join Discord if you need help + ⭐️ <i>Star us on <a href="https://github.com/unslothai/unsloth">Github</a> </i> ⭐️
</div>

"""
```



