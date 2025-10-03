---
layout: single
title: "axolotl微调Qwen2"
sidebar:
  nav: "docs"
date: 2024-06-13 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM]
tags: [AI, AutoGen, Fine-Tuning, GPT, HuggingFace, LLM, Llama-3, Ollama, PyTorch, Qwen]
classes: wide
author_profile: true
---


#  axolotl微调Qwen2 

###  ollama部署Qwen2 
    
    
```
    #ollama下载地址https://www.ollama.com/
    ollama run qwen2:7b
    ollama run qwen2:72b
```
    
    ##为ollama开启公网ip
    
    sudo mkdir -p /etc/systemd/system/ollama.service.d/
    
    sudo nano /etc/systemd/system/ollama.service.d/override.conf
    
    sudo nano /etc/systemd/system/ollama.service
    
```
    ##输入
    [Service]
    Environment="OLLAMA_HOST=0.0.0.0"
```
    
    #然后Ctrl+O 按回车 再按Ctrl+X
    
    sudo systemctl daemon-reload
    
    sudo systemctl restart ollama.service
    
    在浏览器访问 http://64.247.196.27:11434/v1

###  vLLM部署Qwen 7b 
    
    
```
    conda create -n myenv python=3.9 -y
    conda activate myenv
    pip install vllm
```
    
    
    
    #开启API
    
    ##通用模型localhost
    python -m vllm.entrypoints.openai.api_server --model Qwen/Qwen2-7B --dtype auto --api-key token-abc123
    
    ##通用模型公网访问
    python -m vllm.entrypoints.openai.api_server --model Qwen/Qwen2-7B --dtype auto --api-key token-abc123 --host 0.0.0.0
    
```
    ##glm-4-9b的公网访问 
    ##需要将 trust_remote_code 选项设置为 True
    python -m vllm.entrypoints.openai.api_server --model Qwen/Qwen2-7B --dtype auto --api-key token-abc123 --host 0.0.0.0 --trust-remote-code
```
    
```
    #接口信息
            {
                "model": "Qwen/Qwen2-7B",
                "base_url": "http://64.247.196.36:8000/v1",
                "api_key": "token-abc123",
            },
```
    

###  autogen studio 安装和启动 
    
    
    pip install autogenstudio
    
    autogenstudio ui --port 8081 --host 0.0.

###  colab脚本 [ https://colab.research.google.com/drive/1Vq_4i2AEaYqXVWdLt6HpGL-1hVdfWxQh#scrollTo=at5ei-2J8VZt ](<https://colab.research.google.com/drive/1Vq_4i2AEaYqXVWdLt6HpGL-1hVdfWxQh#scrollTo=at5ei-2J8VZt>)

### 

###  pdf处理 

[ https://pypi.org/project/marker-pdf/ ](<https://pypi.org/project/marker-pdf/>)
    
    
     pip install marker-pdf 
     marker_single GPT.pdf ./folder --batch_multiplier 2 --max_pages 52 --langs English

###  配置 

Axolotl 是一种旨在简化各种 AI 模型微调的工具，为多种配置和架构提供支持。 

Python >=3.10 and Pytorch >=2.1.1 
    
    
    # 从 GitHub 克隆 axolotl 仓库
    git clone https://github.com/OpenAccess-AI-Collective/axolotl
    
    # 切换到 axolotl 目录
    cd axolotl
    
    # 将当前用户添加到 docker 组,以便在没有 sudo 的情况下运行 docker 命令
    sudo usermod -aG docker $USER
    
    # 更新组信息,使更改生效
    newgrp docker
    
```
    # 运行 axolotl docker 容器,使用所有可用的 GPU,并在退出时自动删除容器
    # docker hub https://hub.docker.com/r/winglian/axolotl/tags
    docker run --gpus '"all"' --rm -it winglian/axolotl:main-latest
```
    
    
    # 使用 Accelerate 库启动 axolotl 训练脚本,使用 examples/openllama-3b/qlora.yml 配置文件
    accelerate launch -m axolotl.cli.train examples/qwen2/qlora-fsdp.yaml

数据集配置文件：   
  


https://github.com/OpenAccess-AI-Collective/axolotl/blob/main/examples/qwen2/qlora-fsdp.yaml 

##  **🔥** 如有问题请联系我的徽信 stoeng 

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) ** ****

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

注意: 

配置文件中fp16设为false bfp16设为true 

如果数据集内容太少，需要将 ` eval_sample_packing ` 设置为 ` False `

使用 Nano 在终端编辑 Qlora.yml 训练文件 
    
    
```
    nano examples/qwen2/qlora-fsdp.yaml
    (Ctrl+o) = Save
    (Ctrl+x) = Exit
```
    

上传至hugging face 
    
    
    pip install huggingface-cli
    
    huggingface-cli login
    
    huggingface-cli upload leo009/Qwen2-finetuned qlora-out
    

数据集 [ https://huggingface.co/datasets/tatsu-lab/alpaca ](<https://huggingface.co/datasets/tatsu-lab/alpaca>)

###  qlora-fsdp.yaml配置文件 
    
    
```
    base_model: Qwen/Qwen2-7B
    trust_remote_code: true
    load_in_8bit: false
    load_in_4bit: true
    strict: false
    datasets:
      - path: tatsu-lab/alpaca
        type: alpaca
    dataset_prepared_path:
    val_set_size: 0.05
    output_dir: ./outputs/out
    sequence_len: 2048
    sample_packing: true
    eval_sample_packing: true
    pad_to_sequence_len: true
    adapter: qlora
    lora_model_dir:
    lora_r: 32
    lora_alpha: 64
    lora_dropout: 0.05
    lora_target_linear: true
    lora_fan_in_fan_out:
    wandb_project:
    wandb_entity:
    wandb_watch:
    wandb_name:
    wandb_log_model:
    gradient_accumulation_steps: 8
    micro_batch_size: 1
    num_epochs: 4
    optimizer: adamw_torch
    lr_scheduler: cosine
    learning_rate: 0.0002
    train_on_inputs: false
    group_by_length: false
    bf16: auto
    fp16:
    tf32: true
    gradient_checkpointing: false
    gradient_checkpointing_kwargs:
      use_reentrant: false
    early_stopping_patience:
    resume_from_checkpoint:
    local_rank:
    logging_steps: 1
    xformers_attention:
    flash_attention: false
    warmup_steps: 10
    evals_per_epoch: 4
    saves_per_epoch: 1
    debug:
    deepspeed:
    weight_decay: 0.0
    special_tokens:
```
