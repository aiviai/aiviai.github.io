---
layout: single
title: "OpenHands+Grok"
sidebar:
  nav: "docs"
date: 2024-11-10 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, GPT, GPT-4]
classes: wide
author_profile: true
---


#  OpenHands+Grok 

###  api key申请: [ https://console.x.ai/ ](<https://console.x.ai/>)

###  prompt 

> 1.Explain the function and purpose of this project based on the source code in the GitHub repository.   
>    
>  2.Generate the page like this picture using HTML and CSS.   
>    
>  3.Create a chatbot similar to ChatGPT, mimicking its style and functionality. The chatbot should use OpenAI API, specifically the "gpt-4o" model from OpenAI. It should also have a feature to record conversation history, with the history displayed in a left-hand sidebar. Choose the most suitable UI framework for the interface, and use a lightweight Python framework for the backend.   
> 

###  安装 
    
    
    docker pull docker.all-hands.dev/all-hands-ai/runtime:0.13-nikolaik
    
```
    docker run -it --pull=always \
        -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:0.13-nikolaik \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -p 3000:3000 \
        --add-host host.docker.internal:host-gateway \
        --name openhands-app \
        docker.all-hands.dev/all-hands-ai/openhands:0.13
```
    
    
    

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **
