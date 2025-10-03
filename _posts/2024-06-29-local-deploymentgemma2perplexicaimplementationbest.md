---
layout: single
title: "本地部署Gemma2+perplexica实现最强文献检索功能"
sidebar:
  nav: "docs"
date: 2024-06-29 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG]
tags: [AI, LLM, Ollama]
classes: wide
author_profile: true
---


#  本地部署Gemma2+perplexica实现最强文献检索功能 

###  ollama运行gemma2 
    
    
    ollama run gemma2:latest
    
    ollama run gemma2:27b

###  谷歌AI studio [ https://aistudio.google.com/app/ ](<https://aistudio.google.com/app/>)

###  测试逻辑推理能力题目与解析 
    
    
    1. 时间推理题：
       如果今天是星期二，72小时后是星期几？
    
    2. 条件逻辑题：
       如果所有的A都是B，所有的B都是C，那么所有的A都是C吗？为什么？
    
    3. 序列推理题：
       在序列2, 6, 12, 20, 30中找出规律，并给出下一个数。
    
    4. 空间推理题：
       一个立方体的每个面都涂上了颜色。如果将此立方体切成27个相同的小立方体，最多有多少个小立方体的表面没有颜色？
    
    5. 概率推理题：
       一个袋子里有3个红球，4个蓝球和5个绿球。随机抽取两个球，抽到相同颜色的概率是多少？
    
```
    6.算法题:
    	题目：最长回文子序列
    	给定一个字符串 s，找到其中最长的回文子序列，并返回该序列的长度。
    	注意：子序列不同于子串。子序列可以通过删除一些字符而不改变剩余字符的相对位置得到。
    	例如：
    	输入: "bbbab"
    	输出: 4
    	解释: 一个可能的最长回文子序列为 "bbbb"。
    	要求：
```
    	
    	实现一个函数，接受一个字符串作为输入，返回最长回文子序列的长度。
    	尝试设计一个时间复杂度为 O(n^2) 和空间复杂度为 O(n^2) 的解法，其中 n 是字符串的长度。
    

###  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

## 

###  perplexica配置 

###  config.toml 
    
    
```
    [GENERAL]
    PORT = 3001 # Port to run the server on
    SIMILARITY_MEASURE = "cosine" # "cosine" or "dot"
```
    
```
    [API_KEYS]
    OPENAI = "" # OpenAI API key - sk-1234567890abcdef1234567890abcdef
    GROQ = "" # Groq API key - gsk_1234567890abcdef1234567890abcdef
```
    
```
    [API_ENDPOINTS]
    SEARXNG = "http://localhost:4000" # SearxNG API URL  http://localhost:4000/
    OLLAMA = "http://host.docker.internal:11434" # Ollama API URL - http://host.docker.internal:11434
```

###  command 
    
    
    git clone https://github.com/ItzCrazyKns/Perplexica.git
    
    cd Perplexica     
    
    ###按照config.toml的内容配置好再执行下面的命令
    
    docker compose up -d   
    

###  Perplexica访问 [ http://localhost:3000/ ](<http://localhost:3000/>)

###  SearXNG [ http://localhost:4000/ ](<http://localhost:4000/>)

###  settings 

[ ![Image](%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2Gemma2+perplexica%E5%AE%9E%E7%8E%B0%E6%9C%80%E5%BC%BA%E6%96%87%E7%8C%AE%E6%A3%80%E7%B4%A2%E5%8A%9F%E8%83%BD%20480edca338954ff883edc141c5fc20da/Untitled.png) ](<%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2Gemma2+perplexica%E5%AE%9E%E7%8E%B0%E6%9C%80%E5%BC%BA%E6%96%87%E7%8C%AE%E6%A3%80%E7%B4%A2%E5%8A%9F%E8%83%BD%20480edca338954ff883edc141c5fc20da/Untitled.png>)
