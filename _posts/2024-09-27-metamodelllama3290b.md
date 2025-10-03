---
layout: single
title: "Meta最新多模态模型Llama3.2震撼发布!90B参数"
sidebar:
  nav: "docs"
date: 2024-09-27 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG, Vision]
tags: [AI, Claude, HuggingFace, LLM, Llama-3, Ollama, Vision]
classes: wide
author_profile: true
---


#  Meta最新多模态模型Llama3.2震撼发布!90B参数 

###  本地安装 
    
    
    ollama run llama3.2:3b
    
    
    
    ###vLLM按照步骤
    
    pip install -U "huggingface_hub[cli]"
    
    huggingface-cli login
    
    pip install --upgrade vllm
    
    echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/extras/CUPTI/lib64/' >> ~/.bashrc
    source ~/.bashrc
    
    
```
    vllm serve meta-llama/Llama-3.2-11B-Vision \
        --tokenizer meta-llama/Llama-3.2-11B-Vision-Instruct \
        --tokenizer-mode auto \
        --limit_mm_per_prompt 'image=4' \
        --max_num_batched_tokens 65536 \
        --gpu-memory-utilization 0.95 \
        --max-model-len 65536 \
        --trust-remote-code
```
    
    
    
    
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  API 
    
    
```
    import requests
    import base64
    import json
```
    
    invoke_url = "https://ai.api.nvidia.com/v1/gr/meta/llama-3.2-90b-vision-instruct/chat/completions"
    stream = False
    
    with open("6.jpeg", "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode()
    
    assert len(image_b64) < 180_000, \
        "To upload larger images, use the assets API (see docs)"
    
```
    headers = {
        "Authorization": "Bearer nvapi-xxx-Hnp-vG",
        "Accept": "application/json"
    }
```
    
```
    payload = {
        "model": 'meta/llama-3.2-90b-vision-instruct',
        "messages": [
            {
                "role": "user",
                "content": f'What is in this image? <img src="data:image/png;base64,{image_b64}" />'
            }
        ],
        "max_tokens": 512,
        "temperature": 1.00,
        "top_p": 1.00,
        "stream": stream
    }
```
    
    response = requests.post(invoke_url, headers=headers, json=payload)
    
```
    if response.status_code == 200:
        response_json = response.json()
        image_description = response_json['choices'][0]['message']['content']
        print(image_description)
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
```

###  在线测试 

[ https://build.nvidia.com/meta/llama-3.2-90b-vision-instruct ](<https://build.nvidia.com/meta/llama-3.2-90b-vision-instruct>)

###  prompt 
    
    
    Where is the woman in the black and white striped top in the picture?
    
    
    Where is the man wearing a white shirt, light blue jeans, and white shoes in the picture?
    
    
    Extract the information from the invoice and place the extracted content into a table.
    
    
    Extract the text from the image while maintaining the original format.
    
    
    c视频：
    A woman wearing a red top and blue jeans
    
    d视频：
    A short-haired man wearing blue jeans and a black shirt with green sleeves
    
    
    
    
    
    
    
    
    
    
    
    

Llama 3.2 是Meta公司最新发布的多模态人工智能模型系列，旨在提升大规模语言模型（LLM）的能力，特别是在视觉理解和边缘计算领域。该系列模型于2024年9月25日正式推出，包含多种不同规模的模型，适用于各种应用场景。 

##  **模型概述**

Llama 3.2 系列包括以下几种模型： 

  * **Llama 3.2 90B Vision** ：支持文本和图像输入，适合企业级应用，擅长常识推理、长文本生成和多语言翻译等任务。 


  * **Llama 3.2 11B Vision** ：同样支持文本和图像输入，适合内容创建和对话式人工智能应用，具备图像推理能力。 


  * **Llama 3.2 3B** ：专为低延迟推理和有限计算资源设计，适合文本摘要、分类和语言翻译等任务。 


  * **Llama 3.2 1B** ：最轻量级的模型，非常适合边缘设备和移动应用程序的文本检索和摘要。 


所有模型均支持高达128K个token的上下文长度，这对于需要处理大量信息的任务尤为重要 

。 

##  **多模态功能**

Llama 3.2 的重要特点是其多模态能力。它能够同时处理文本、图像和视频，使得用户可以在同一交互中结合不同类型的内容。这种能力使得模型在图像理解、视觉推理等任务上表现优异，与其他领先的闭源模型（如Claude 3 Haiku）相媲美 

。 

##  **模型架构与训练**

Llama 3.2 基于之前版本（如Llama 3.1）进行了优化，采用了先进的转化器架构。模型训练分为多个阶段： 

  1. **预训练阶段** ：利用大规模的噪声图像-文本对进行初步训练，然后在中等规模的高质量领域数据上进行进一步训练。 


  2. **后期训练阶段** ：通过监督微调、拒绝采样和直接偏好优化等技术进行多轮对齐，以提高模型的响应质量和安全性。 


此外，Llama 3.2 还引入了知识蒸馏技术，使得小型模型能够借助大型模型的输出提升性能，而不是从零开始学习 

。 

##  **应用场景与优化**

Llama 3.2 的设计目标是满足边缘设备和移动应用的需求。它在高通和联发科硬件上进行了优化，使得这些轻量级模型能够在资源有限的环境中高效运行。具体应用场景包括： 

  * 移动人工智能写作助手 


  * 客户服务应用 


  * 图像标题生成 


  * 文档视觉问题解答 


开发者可以利用Meta提供的Llama Stack API进行定制化开发，并通过torchtune进行微调，以适应不同的应用需求。 
