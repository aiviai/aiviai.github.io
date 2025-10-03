---
layout: single
title: "autoTrain微调phi-3 medium"
sidebar:
  nav: "docs"
date: 2024-06-02 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, HuggingFace, LLM, Llama-3, Phi-3, PyTorch, Vision]
classes: wide
author_profile: true
---


#  autoTrain微调phi-3 medium 

## 

[ ![Image](https://github.com/win4r/win4r.github.io/assets/42172631/958e2bfd-aa36-4d7c-9ad6-950dc33fbc6c) ](<https://github.com/win4r/win4r.github.io/assets/42172631/958e2bfd-aa36-4d7c-9ad6-950dc33fbc6c>)

###  注意上图画圈的部分，如果选择LLM ORPO，那么chat-template要选择chatml 

###  在huggingface运行 

[ https://huggingface.co/login?next=%2Fspaces%2Fautotrain-projects%2Fautotrain-advanced%3Fduplicate%3Dtrue ](<https://huggingface.co/login?next=%2Fspaces%2Fautotrain-projects%2Fautotrain-advanced%3Fduplicate%3Dtrue>)

###  通过ngrok在colab运行UI界面 

[ https://colab.research.google.com/github/huggingface/autotrain-advanced/blob/main/colabs/AutoTrain_ngrok.ipynb ](<https://colab.research.google.com/github/huggingface/autotrain-advanced/blob/main/colabs/AutoTrain_ngrok.ipynb>)

##  ngrok token 

[ https://dashboard.ngrok.com/get-started/your-authtoken ](<https://dashboard.ngrok.com/get-started/your-authtoken>)

###  本地微调命令 
    
    
```
    conda create -n autotrain python=3.10
    conda activate autotrain
    pip install autotrain-advanced
    conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
    conda install -c "nvidia/label/cuda-12.1.0" cuda-nvcc
```
    
```
    conda install xformers -c xformers
    python -m nltk.downloader punkt
    pip install flash-attn --no-build-isolation # if you want to use flash-attn
    pip install deepspeed # if you want to use deepspeed
```
    
    
    #运行微调，注意，请先设置配置文件的内容
    autotrain --config 这里填自己文件名

###  本地微调的配置文件内容: 
    
    
```
    task: llm-orpo
    base_model: unsloth/llama-3-8b-Instruct
    project_name: autotrain-llama3-8b-orpo
    log: tensorboard
    backend: local
```
    
```
    data:
      path: argilla/distilabel-capybara-dpo-7k-binarized
      train_split: train
      valid_split: null
      chat_template: chatml
      column_mapping:
        text_column: chosen
        rejected_text_column: rejected
        prompt_text_column: prompt
```
    
```
    params:
      block_size: 1024
      model_max_length: 8192
      max_prompt_length: 512
      epochs: 3
      batch_size: 2
      lr: 3e-5
      peft: true
      quantization: int4
      target_modules: all-linear
      padding: right
      optimizer: adamw_torch
      scheduler: linear
      gradient_accumulation: 4
      mixed_precision: fp16
```
    
```
    hub:
      username: leo009
      token: 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
      push_to_hub: true
```

##  如有问题请联系我的徽信 stoeng 

###  🔥🔥🔥观看更多大模型微调视频请访问我的频道⬇ 

###  👉👉👉 [ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>)

###  👉👉👉 [ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>)
