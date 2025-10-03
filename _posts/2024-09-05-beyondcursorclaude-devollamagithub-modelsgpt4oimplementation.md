---
layout: single
title: "超越cursor！Claude Dev+ollama+github models调用gpt4o实现全自动化编程开发"
sidebar:
  nav: "docs"
date: 2024-09-05 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, Vision]
tags: [AI, AI-Agents, Claude, GPT, GPT-4, LLM, Mistral, Ollama, Phi-3]
classes: wide
author_profile: true
---


#  超越cursor！Claude Dev+ollama+github models调用gpt4o实现全自动化编程开发 

###  🔥API base url 
    
    
```
    #GitHub Models
    https://models.inference.ai.azure.com
    #Mistral-large-2407
```
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  🔥prompt 
    
    
    请使用 .NET MAUI 创建一个简单的 2D 垂直滚动星际航行游戏，具体要求如下：
    
```
    1. 游戏概览：
       - 玩家控制一个火箭emoji（🚀），可以在屏幕底部水平移动。
       - 障碍物（"🌞", "✨", "🌙" ,"🌟","🪐","👽","🛸","🌏","⭐","🪨","🛰️","☄️","💥"）从屏幕顶部落下。
       - 玩家必须避免与障碍物相撞。
       - 当玩家与障碍物相撞时，游戏结束。
```
    
```
    2. 用户界面：
       - 创建一个 XAML 文件（MainPage.xaml），包含以下元素：
         - 使用 Grid 作为主要布局，分为四行。
         - 在第二行中放置一个名为 "GameArea" 的 AbsoluteLayout，用于游戏内容。
         - 使用 Label 显示玩家的火箭emoji和障碍物emoji。
         - 使用 Label 显示得分。
         - （移动按钮将通过代码动态添加）
```
    
```
    3. 游戏逻辑（MainPage.xaml.cs）：
       - 实现以下功能：
         a. 玩家移动：
            - 添加触摸手势识别，实现拖动玩家移动。
            - 实现加速度计支持，通过倾斜设备控制移动。
            - 添加屏幕上的左右按钮用于移动控制。
         b. 障碍物生成：
            - 在屏幕顶部随机创建和定位障碍物 emoji。
         c. 游戏循环：
            - 使障碍物向下移动。
            - 检测玩家与障碍物之间的碰撞。
            - 更新得分。
            - 逐渐增加游戏速度。
         d. 得分跟踪和显示。
         e. 游戏结束检测和重新开始功能。
```
    
```
    4. 需要实现的关键组件：
       - 定义游戏参数的常量（如玩家大小、移动速度、障碍物大小等）。
       - 使用列表跟踪障碍物。
       - 使用随机数生成器创建和定位障碍物。
       - 使用定时器实现游戏循环。
       - 实现玩家定位、障碍物生成、碰撞检测和得分更新的方法。
```
    
```
    5. 额外功能：
       - 实现适应不同屏幕尺寸的自适应布局。
       - 为游戏事件添加简单的动画或视觉反馈。
```
    
```
    6. 代码结构：
       - 使用 XAML 进行 UI 布局。
       - 在代码后端文件（MainPage.xaml.cs）中实现游戏逻辑。
       - 利用 MAUI 的 AbsoluteLayout 精确定位游戏元素。
       - 使用 MAUI 内置的手势识别器和加速度计 API。
```
    
    请提供完整的 XAML 和 C# 代码来实现这个游戏，确保包含所有必要的命名空间，并为代码添加适当的注释以提高可读性。

###  🔥Claude Dev 

> **🟢Claude Dev** 是一款集成于 Visual Studio Code 的 AI 工具，能够通过自动化任务来辅助开发者。   
>    
>    
>  **🟢** 它基于 Anthropic 的 Claude 模型，能够自动生成代码、编辑文件、执行命令，甚至执行系统操作。   
>    
>  以下是 Claude Dev 的   
>  **主要特点** ： 
> 
>   1. **自动文件管理** ：Claude Dev 能够根据用户指令创建、编辑和删除本地文件。在用户授权后，它可以直接与本地文件系统交互，大大简化代码库的管理。 
> 

>   2. **任务自动化** ：使用“agentic loop”（代理循环）的方式，Claude Dev 能够自主地执行一系列任务。用户只需提供任务描述，Claude Dev 就能根据需求生成完整的应用程序或解决复杂问题。例如，用户可以要求它生成一款带有得分系统的小游戏。 
> 

>   3. **生成单元测试** ：Claude Dev 还能自动为项目生成并集成单元测试，极大提高了开发效率。这对于大规模项目尤其有用，能够确保代码的稳定性和可靠性。 
> 

>   4. **执行命令行指令** ：通过直接在 VS Code 中运行终端命令，开发者可以在不离开编辑器的情况下完成从编写代码到部署的整个流程。   
>    
> 
> 

> 
> **🟢** Claude Dev 是一个强大的开发工具，特别适合需要快速迭代和自动化工作流的现代软件工程。 

🔥 **Claude Dev vs Cursor**

> **🚀Claude Dev属于真正的AI Agent。  
>    
>  🟢   
>  ** 专注于自动化任务和代码生成，尤其在复杂项目管理和代码分析方面表现突出。   
>    
>    
>  **🟢** 主要优势在于能够执行一系列任务，如文件操作、终端命令、递归地搜索和编辑项目文件，以及利用链式思维逐步解决问题。   
>    
>    
>  **🟢支持ollama以及第三方api**   
>    
>    
>    
>    
>  **🚀Cursor不属于真正的AI Agent  
>    
>  **   
>    
>  **🟢Cursor** 可以直接在 IDE 中调用 AI 进行代码编写和调试，适合轻量级项目或者需要频繁人工交互的开发者。   
>    
>  🟠缺点是无法使用ollama等本地模型，使用Claude api的话token消耗惊人。   
>    
>  🟠使用Claude 3.5模型，同等token消耗，效果远不如   
>  **Claude Dev。  
>    
>    
>  ** 🟠 **bug多，对话历史会丢失。  
>    
>    
>  ** 🟠只适合脚本语言等非复杂交互等项目 **  
>    
>  **

###  🔥GitHub Models 

> **🟢GitHub Models** 是一个能够帮助开发者直接在 GitHub 上使用 AI 模型的项目。   
>    
>    
>  **🟢** 用户可以轻松地访问和实验多个生成式 AI 模型，如 Meta 的 LLaMA、GPT-4o、Phi-3 和 Mistral。   
>    
>    
>  **🟢** GitHub 提供了一个模型游乐场（playground），用户可以测试不同的提示、调整参数（如温度），并比较不同模型的输出结果。   
>    
> 
> 
> **🟢** 该平台的核心目的是让开发者从实验到生产都能在熟悉的环境中操作。   
>    
>    
>  **🟢** 用户可以通过 GitHub Codespaces 和 Visual Studio Code 将这些模型集成到自己的项目中，并使用 Azure 的 AI 服务进行部署。Azure 提供了企业级的安全性、可扩展性，确保模型能无缝地从实验环境过渡到生产环境。   
>    
> 
> 
> **🟢** GitHub Models 对所有用户开放，从学生到专业人士都可以使用，并提供了丰富的学习和实验工具。 
