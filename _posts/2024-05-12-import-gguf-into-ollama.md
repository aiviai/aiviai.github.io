---
layout: single
title: "Import GGUF into Ollama"
sidebar:
  nav: "docs"
date: 2024-05-12 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, Tutorial]
tags: [AI, AI-Agents, AutoGen, HuggingFace, LLM, Llama-3, Mistral, Ollama, Phi-3, PyTorch]
classes: wide
author_profile: true
---


#  Import GGUF into Ollama 

**1.Create a Modelfile**
    
    
    ##格式0
    
    FROM tinyllama-my-model.gguf
    
```
    ### Set the system message
    SYSTEM """
    You are a super helpful helper.
    """
```
    
    PARAMETER stop <s>
    PARAMETER stop </s>
    
    #格式0的运行方式：ollama run my-model "<s>\nQ: \nWhat is the capital of France?\nA:\n"
    
    
    
    ##格式1
    FROM ./llama3-unsloth.Q8_0.gguf
    
```
    TEMPLATE """{{- if .System }}
    <|system|>
    {{ .System }}
    {{- end }}
    <|user|>
    {{ .Prompt }}
    <|assistant|>
    """
```
    
    SYSTEM """You are a helpful, smart, kind, and efficient AI assistant.Your name is Aila. You always fulfill the user's requests to the best of your ability."""
    
    
```
    PARAMETER temperature 0.8
    PARAMETER num_ctx 8192
    PARAMETER stop "<|system|>"
    PARAMETER stop "<|user|>"
    PARAMETER stop "<|assistant|>"
```
    
    
```
    ##格式2
    FROM GEITje-7B-chat-v2.gguf
    TEMPLATE """{{- if .System }}
    <|system|>
    {{ .System }}
    </s>
    {{- end }}
    <|user|>
    {{ .Prompt }}
    </s>
    <|assistant|>
    """
    PARAMETER temperature 0.2
    PARAMETER num_ctx 8192
    PARAMETER stop "<|system|>"
    PARAMETER stop "<|user|>"
    PARAMETER stop "<|assistant|>"
    PARAMETER stop "</s>"
```
    
    
```
    ##格式3
    FROM models/tinyllama-1.1b-chat-v0.3.Q6_K.gguf
    PARAMETER temperature 0.7
    PARAMETER stop "<|im_start|>"
    PARAMETER stop "<|im_end|>"
    TEMPLATE """
    <|im_start|>system
    {{ .System }}<|im_end|>
    <|im_start|>user
    {{ .Prompt }}<|im_end|>
    <|im_start|>assistant
    """
    SYSTEM """You are a helpful assistant."""
```
    

**2.Build the Model in Ollama**
    
    
    ollama create example -f Modelfile
    

3\. **Run the Model**
    
    
    ollama run example
    
