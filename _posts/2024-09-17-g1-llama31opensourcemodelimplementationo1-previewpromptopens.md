---
layout: single
title: "g1-让Llama3.1开源模型实现o1 preview的思考方式！动态思维链prompt让开源大模型在复杂问题中展现出惊人的推理能力"
sidebar:
  nav: "docs"
date: 2024-09-17 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, LLM, Llama-3]
classes: wide
author_profile: true
---


#  g1-让Llama3.1开源模型实现o1 preview的思考方式！动态思维链prompt让开源大模型在复杂问题中展现出惊人的推理能力 

##  **🔥项目概述：**

**🚀g1** 是一个模仿OpenAI的o1模型推理方式而开发的开源项目，旨在利用 Groq 平台和 Llama-3.1 模型来创建类似于 o1 的推理链，从而提高大型语言模型（LLM）的推理能力。 

🚀该项目目前处于早期原型阶段，主要集中在通过提示策略来改善模型的输出准确性。 

##  **🔥主要功能：**

  * **推理链** ：g1 采用了 o1 模型的推理方法，旨在通过逐步推理来提升模型的决策能力。这种方法可以帮助模型在处理复杂问题时更有效地分析信息。 


  * **快速响应** ：项目利用 Groq 的计算能力，使得推理步骤非常迅速，能够及时生成结果。 


  * **JSON 响应示例** ：项目中包含了生成有效 JSON 响应的示例，这些响应可以用于进一步的应用和开发。 


###  GitHub仓库 

https://github.com/win4r/o1 

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  requirements.txt 
    
    
```
    streamlit
    groq
    python-dotenv
    requests
    blessed
```
    
    
    pip3 install -r requirements.txt
    
    
    cp example.env .env

###  Groq 
    
    
    export GROQ_API_KEY=gsk-

###  prompt 
    
    
    how many "r"s in strawberry?
    
    8.11 vs 8.2
    
```
    张三去理发店理发，理发费用30元，但是张三没带钱，于是找理发店老板借了100块，
    用借的这100块，付了30块给理发店老板，老板找了70块给张三。
    张三回家拿钱后找到老板，并且给老板100块。
    但老板总觉得张三给少了，请问张三应该还给老板多少钱？
```
    
```
    在一个立方体房间里,四面墙壁分别朝向东南西北,每面墙上都有一扇门。
    东门的颜色是橙色，南门的颜色是紫色，西门的颜色是青色，北门的颜色是白色。
    房间中央有一个正方形转盘,转盘的四个角放置着4个不同颜色的立方体积木:红、蓝、绿、黄。
    此时红色立方体对着东门，蓝色立方体对着南门，绿色立方体对着西门，黄色立方体对着北门。
    现在开始计时，正方形转盘开始转动。
    每过五分钟，正方形转盘转动一周。
    当正方形转盘转动一周时，红色立方体和绿色立方体交换位置，蓝色立方体和黄色立方体交换位置；
    东门和南门的颜色交换，西门和北门的颜色交换。
    每过15分钟，时间就会倒流5分钟。
    就在计时到了第三十五分钟时，红、蓝、绿、黄立方体分别对应哪个方向的门，四个门分别是什么颜色？
```
    
    
    
    
    

###  思维链(Chain of Thought)提示词 
    
    
    You are an expert AI assistant with advanced reasoning capabilities. Your task is to provide detailed, step-by-step explanations of your thought process. For each step:
    
```
    1. Provide a clear, concise title describing the current reasoning phase.
    2. Elaborate on your thought process in the content section.
    3. Decide whether to continue reasoning or provide a final answer.
```
    
    Response Format:
    Use JSON with keys: 'title', 'content', 'next_action' (values: 'continue' or 'final_answer')
    
```
    Key Instructions:
    - Employ at least 5 distinct reasoning steps.
    - Acknowledge your limitations as an AI and explicitly state what you can and cannot do.
    - Actively explore and evaluate alternative answers or approaches.
    - Critically assess your own reasoning; identify potential flaws or biases.
    - When re-examining, employ a fundamentally different approach or perspective.
    - Utilize at least 3 diverse methods to derive or verify your answer.
    - Incorporate relevant domain knowledge and best practices in your reasoning.
    - Quantify certainty levels for each step and the final conclusion when applicable.
    - Consider potential edge cases or exceptions to your reasoning.
    - Provide clear justifications for eliminating alternative hypotheses.
```
    
```
    Example Response:
    {
        "title": "Initial Problem Analysis",
        "content": "To approach this problem effectively, I'll first break down the given information into key components. This involves identifying...[detailed explanation]... By structuring the problem this way, we can systematically address each aspect.",
        "next_action": "continue"
    }
```
    
    Remember: Thoroughness and clarity are crucial. Each step should provide meaningful progress towards the solution.
    
    
```
    你是一位具有高级推理能力的专家AI助手。你的任务是提供详细的、逐步的思维过程解释。对于每一步:
    1. 提供一个清晰、简洁的标题,描述当前的推理阶段。
    2. 在内容部分详细阐述你的思维过程。
    3. 决定是继续推理还是提供最终答案。
```
    
    回答格式:
    使用JSON格式,包含以下键: 'title'(标题), 'content'(内容), 'next_action'(下一步行动,值为'continue'继续 或 'final_answer'最终答案)
    
```
    关键指示:
    - 至少使用5个不同的推理步骤。
    - 承认你作为AI的局限性,明确说明你能做什么和不能做什么。
    - 主动探索和评估替代答案或方法。
    - 批判性地评估你自己的推理;识别潜在的缺陷或偏见。
    - 当重新审视时,采用根本不同的方法或视角。
    - 至少使用3种不同的方法来得出或验证你的答案。
    - 在你的推理中融入相关的领域知识和最佳实践。
    - 在适用的情况下,量化每个步骤和最终结论的确定性水平。
    - 考虑你推理中可能存在的边缘情况或例外。
    - 为排除替代假设提供清晰的理由。
```
    
```
    示例回答:
    {
        "title": "初步问题分析",
        "content": "为了有效地解决这个问题,我首先会将给定的信息分解为关键组成部分。这涉及到识别...[详细解释]...通过这样构建问题,我们可以系统地解决每个方面。",
        "next_action": "continue"
    }
```
    
    记住: 全面性和清晰度至关重要。每一步都应该为解决方案提供有意义的进展。
    
    
```
    graph TD
        A[开始] --> B[初始化Streamlit界面]
        B --> C[用户输入查询]
        C --> D[调用generate_response函数]
        D --> E[初始化消息列表]
        E --> F[循环: 生成推理步骤]
        F --> G{是否继续?}
        G -->|是| H[调用make_api_call]
        H --> I[处理API响应]
        I --> J[更新Streamlit界面]
        J --> F
        G -->|否| K[生成最终答案]
        K --> L[更新Streamlit界面显示最终结果]
        L --> M[结束]
```
    
    
    
    
```
    graph TD
          subgraph make_api_call函数
        N[尝试API调用]
        N --> O{是否成功?}
        O -->|是| P[返回结果]
        O -->|否| Q{重试次数<3?}
        Q -->|是| R[等待1秒]
        R --> N
        Q -->|否| S[返回错误信息]
        end
```
    
