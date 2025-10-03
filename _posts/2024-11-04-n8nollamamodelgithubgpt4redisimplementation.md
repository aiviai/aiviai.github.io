---
layout: single
title: "n8n整合本地Ollama模型+GitHub免费GPT4接口+Redis内存数据库，轻松实现新闻搜索与科技资讯改写功能"
sidebar:
  nav: "docs"
date: 2024-11-04 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, GPT, GPT-4, LLM, Ollama]
classes: wide
author_profile: true
---


#  n8n整合本地Ollama模型+GitHub免费GPT4接口+Redis内存数据库，轻松实现新闻搜索与科技资讯改写功能 

###  ollama运行aya-expanse 
    
    
    ollama run aya-expanse:8b

###  安装Redis 

Redis是一个开源的内存数据库，也可以持久化到磁盘。 

Redis 基本介绍： 

  1. Redis是一个开源的内存数据库，也可以持久化到磁盘 


  2. 支持多种数据结构： 
```
     * 字符串(String) 
     * 列表(List) 
     * 集合(Set) 
     * 有序集合(Sorted Set) 
     * 哈希表(Hash) 
```


  3. 特点： 
```
     * 高性能：所有数据存在内存中，读写速度极快 
     * 原子性：所有操作都是原子性的 
     * 支持发布/订阅机制 
     * 支持主从复制 
     * 可以设置过期时间 
```


    
    
    # 安装 Redis
    brew install redis
    
    # 在启动时自动运行
    brew services restart redis
    
    # 启动 Redis 服务
    brew services start redis
    
    # 验证 Redis 是否正在运行
    redis-cli ping
    
    # 停止服务
    brew services stop redis

###  安装n8n 
    
    
    npx n8n
    
    #http://localhost:5678/home/workflows

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  配置GitHub gpt-4o 
    
    
    pip install litellm
    
    export GITHUB_API_KEY=8hjyterdndsfeth8gg8h89eg89h8tg87r7trgger
    
    litellm --model github/gpt-4o
    
    #http://localhost:4000/
    
    #model id: gpt-4o
    
    

###  prompt 
    
    
    You are an expert tech news writer with extensive experience in technology journalism. Please rewrite the following content into a professional tech news article.
    
    Original content: {{ $json.output }}
    
```
    Requirements:
    1. Use a clear and engaging tech news writing style
    2. Include a compelling headline
    3. Add relevant technical context and industry impact
    4. Structure the article with:
       - Attention-grabbing introduction
       - Key points and technical details
       - Industry implications
       - Expert quotes or analysis (if applicable)
    5. Maintain an objective and professional tone
    6. Length: 400-600 words
```
    
    Please ensure the article follows standard tech journalism best practices and is accessible to a tech-savvy audience.
