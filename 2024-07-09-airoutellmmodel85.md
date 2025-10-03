---
layout: single
title: "【AI革命】RouteLLM：让大语言模型降本85%的神奇技术！"
sidebar:
  nav: "docs"
date: 2024-07-09 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, GPT, GPT-4, LLM, Mistral, Ollama]
classes: wide
author_profile: true
---


#  【AI革命】RouteLLM：让大语言模型降本85%的神奇技术！ 
    
    
    pip install "routellm[serve,eval]"
    
    
    
    export OPENAI_API_KEY="sk-proj-wDPaUDu1I"
    export ANYSCALE_API_KEY="secret_r4jh"
    
    
    #test question
    #what is the square root of 1787569?
    
    
    
    
    import os
    from routellm.controller import Controller
    
```
    os.environ["OPENAI_API_KEY"] = "sk-proj-wDPaUDu1Iimxi8SG3BfwT3B5M"
    # Replace with your model provider, we use Anyscale's Mixtral here.
    os.environ["ANYSCALE_API_KEY"] = "esecret_r4jhxj9jx75mewwt3"
```
    
```
    client = Controller(
      routers=["mf"],
      strong_model="gpt-4-1106-preview",
      weak_model="anyscale/mistralai/Mixtral-8x7B-Instruct-v0.1",
    )
```
    
```
    response = client.chat.completions.create(
      # This tells RouteLLM to use the MF router with a cost threshold of 0.11593
      model="router-mf-0.11593",
      messages=[
        {"role": "user", "content": "Hello!"}
      ]
    )
```
    

###  ollama 
    
    
    import os
    from routellm.controller import Controller
    
    # 设置 OpenAI API 密钥
    
    
```
    client = Controller(
      routers=["mf"],
      strong_model="gpt-4-1106-preview",
      weak_model="ollama_chat/gemma2",
    )
```
    
    
```
    response = client.chat.completions.create(
      model="router-mf-0.11593",
      messages=[
        {"role": "user", "content": "Hello!"}
      ]
    )
```
    
    print(response.choices[0].message.content)
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  stream 
    
    
    import os
    from routellm.controller import Controller
    
```
    client = Controller(
      routers=["mf"],
      strong_model="gpt-4-1106-preview",
      weak_model="ollama_chat/gemma2",
    )
```
    
```
    # 创建流式响应
    stream = client.chat.completions.create(
      model="router-mf-0.11593",
      messages=[
        {"role": "user", "content": "who are you?"}
      ],
      stream=True  # 启用流式输出
    )
```
    
```
    # 遍历流并打印每个部分的内容
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end='', flush=True)
```
    
    # 打印换行符，使下一个提示符出现在新行
    print()

### 
