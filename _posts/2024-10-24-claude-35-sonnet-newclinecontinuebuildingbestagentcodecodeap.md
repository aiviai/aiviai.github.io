---
layout: single
title: "Claude-3.5-sonnet new+Cline+Continue打造最强编程智能体！玩转全自动编程,发各种复杂应用，轻松修改代码、优化代码、添加注,小白也能开发各种app！#claude"
sidebar:
  nav: "docs"
date: 2024-10-24 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM]
tags: [AI, Claude, GPT, LLM, Ollama]
classes: wide
author_profile: true
---


#  Claude-3.5-sonnet new+Cline+Continue打造最强编程智能体！玩转全自动编程,发各种复杂应用，轻松修改代码、优化代码、添加注,小白也能开发各种app！#claude 

###  🚀知识库截止2024年4月 

###  🚀上下文窗口 200k 

###  🚀最大输出 8192 tokens 

###  🚀每百万token输入/输出价格 $3.00 / $15.00 

###  continue插件链接： [ https://marketplace.visualstudio.com/items?itemName=Continue.continue ](<https://marketplace.visualstudio.com/items?itemName=Continue.continue>)

###  Cline插件链接： [ https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev ](<https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev>)

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  **API model name**

* * *
    
    
    claude-3-5-sonnet-20241022
    claude-3-5-sonnet-latest

###  prompt 
    
    
    # ChatGPT风格的聊天机器人开发需求
    
    ## 项目概述
    使用Blazor WebApp开发类似ChatGPT的聊天应用,具备现代化UI界面,支持本地Ollama模型接入,并可保存聊天历史。
    
    ## 核心功能要求
    
```
    ### 界面设计
    - 参考ChatGPT的现代简约风格
    - 支持深色/浅色主题切换
    - 左侧对话列表,右侧聊天窗口
    - 流式回复动画效果
```
    
```
    ### 数据存储
    - 使用SQLite保存聊天记录
    - 存储内容：对话列表、消息内容、发送时间
    - 支持查看历史对话
```
    
```
    ### AI对接
    - 接入本地Ollama API接口
    - 支持流式输出
    - 实现基础的对话功能
```
    
```
    ### 必要功能
    - 新建对话
    - 查看历史对话
    - 删除对话
    - 重命名对话
    - 消息发送与接收
```
    
```
    ## 技术要求
    - 框架：Blazor WebApp
    - 数据库：SQLite
    - API：Ollama本地接口
    - UI组件：任选主流组件库
```
    
    ## 数据结构
    
```
    ### 对话表
    - ID
    - 标题
    - 创建时间
```
    
```
    ### 消息表
    - ID
    - 对话ID
    - 角色(用户/AI)
    - 内容
    - 发送时间
```
