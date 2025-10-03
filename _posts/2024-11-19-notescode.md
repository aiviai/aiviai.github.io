---
layout: single
title: "端脑云笔记代码"
sidebar:
  nav: "docs"
date: 2024-11-19 00:00:00 +0800
categories: [AI-Agents, LLM]
tags: [AI, AI-Agents, AutoGen, LLM, Llama-3, Qwen]
classes: wide
author_profile: true
---


#  端脑云笔记代码 

###  邀请链接 

[ https://cephalon.cloud/#/share/register-landing?id=rjFrw9 ](<https://cephalon.cloud/#/share/register-landing?id=rjFrw9>)

###  接口示例 
    
    
```
    curl --request POST 'https://cephalon.cloud/user-center/v1/model/chat/completions' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJbmZvIjoiYXBpOjE4NTUwMzg0MjE2MTY3NTQ2ODgiLCJleHAiOjE3NjM0NDg1OTd9.POWZI5rv8bu6_aM-2CHfUhRxJP6nZRIoaF66ci_BTAc' \
    --header 'Accept: */*' \
    --header 'Connection: keep-alive' \
    --data-raw '{
    "model": "Llama-3.1-70B-Instruct",
    "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "Hello!"
    }
    ],
    "stream": true
     }'
```
    

###  autogen代码 
    
    
    !pip install autogen-agentchat~=0.2
    
```
    import os
    from autogen import AssistantAgent, UserProxyAgent
    from google.colab import userdata
```
    
```
    # 从Google Colab的userdata中获取API key
    # 需要在Colab中预先设置CEPHALON_API_KEY
    try:
        API_KEY = userdata.get('CEPHALON_API_KEY')
        if not API_KEY:
            raise ValueError("CEPHALON_API_KEY未在Colab中设置")
    except Exception as e:
        raise ValueError("无法从Colab获取API key。请确保代码在Colab环境中运行，并且已设置CEPHALON_API_KEY") from e
```
    
```
    # LLM配置
    # config_list: 包含模型配置的列表
    # model: 使用的模型名称
    # api_key: 从Colab userdata获取的API密钥
    # base_url: API服务器地址
    llm_config = {
        "config_list": [{
            "model": "Llama-3.1-70B-Instruct",  # 使用Llama 3.1 70B指令模型
            "api_key": API_KEY,                  # 从Colab userdata获取的API key
            "base_url": "https://cephalon.cloud/user-center/v1/model"  # API端点
        }]
    }
```
    
```
    # 创建Assistant代理
    # AssistantAgent: 能够回答问题和执行任务的AI助手
    assistant = AssistantAgent("assistant", llm_config=llm_config)
```
    
```
    # 创建UserProxy代理
    # UserProxyAgent: 代表用户与Assistant交互的代理
    # code_execution_config=False 表示禁用代码执行功能
    user_proxy = UserProxyAgent("user_proxy", code_execution_config=False)
```
    
```
    # 启动对话
    # 向助手提出数学问题：计算179424673是第几个质数
    user_proxy.initiate_chat(
        assistant,
        message="计算179424673是第几个质数.",
    )
```
    
    
    #-----------------------------
    
```
    import os
    from autogen import ConversableAgent
    from google.colab import userdata
```
    
    API_KEY = userdata.get('CEPHALON_API_KEY')
    
```
    # 为技术专家配置Llama模型
    llm_config_expert = {
        "config_list": [
            {
                "model": "Llama-3.1-70B-Instruct",  # 技术专家使用Llama模型
                "api_key": API_KEY,
                "base_url": "https://cephalon.cloud/user-center/v1/model"
            }
        ]
    }
```
    
```
    # 为企业顾问配置Qwen模型
    llm_config_consultant = {
        "config_list": [
            {
                "model": "Qwen2.5-72B-Instruct-AWQ",  # 企业顾问使用Qwen模型
                "api_key": API_KEY,
                "base_url": "https://cephalon.cloud/user-center/v1/model"
            }
        ]
    }
```
    
    
```
    # 创建技术专家代理
    expert = ConversableAgent(
        name="expert",
        system_message="你是一位人工智能技术专家，专注于大语言模型的技术实现和部署架构。你擅长解释技术细节，并能提供具体的实施建议。",
        llm_config=llm_config_expert,
        human_input_mode="NEVER",
    )
```
    
```
    # 创建企业顾问代理
    consultant = ConversableAgent(
        name="consultant",
        system_message="你是一位企业数字化转型顾问，擅长分析大语言模型在不同行业的应用场景和商业价值。你关注ROI和实际落地效果。",
        llm_config=llm_config_consultant,
        human_input_mode="NEVER",
    )
```
    
    
```
    # 启动对话
    result = consultant.initiate_chat(
        expert,
        message="作为技术专家，你认为大语言模型在企业环境中最具潜力的三个应用场景是什么？请从技术可行性和落地难度的角度进行分析。",
        max_turns=4  # 增加对话轮次以便更深入讨论
    )
```
    
    
```
    #---------------------
    import os
    from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager
    from google.colab import userdata
```
    
```
    # 从Google Colab的userdata中获取API key
    try:
        API_KEY = userdata.get('CEPHALON_API_KEY')
        if not API_KEY:
            raise ValueError("CEPHALON_API_KEY未在Colab中设置")
    except Exception as e:
        raise ValueError("无法从Colab获取API key。请确保代码在Colab环境中运行，并且已设置CEPHALON_API_KEY") from e
```
    
```
    # LLM配置
    llm_config = {
        "config_list": [{
            "model": "Llama-3.1-70B-Instruct",  # 使用Llama 3.1 70B指令模型
            "api_key": API_KEY,                  # 从Colab userdata获取的API key
            "base_url": "https://cephalon.cloud/user-center/v1/model"  # API端点
        }]
    }
```
    
```
    # 创建用户代理
    user_proxy = UserProxyAgent(
        name="企业决策者",
        system_message="作为企业决策者，关注大模型在企业中的实际应用价值和落地可能性。",
        code_execution_config={
            "last_n_messages": 2,
            "work_dir": "enterprise_chat",
            "use_docker": False,
        },
        human_input_mode="TERMINATE"
    )
```
    
```
    # 创建技术专家代理
    tech_expert = AssistantAgent(
        name="技术专家",
        system_message="作为AI技术专家，专注于大模型技术实现、部署架构和性能优化等技术细节。",
        llm_config=llm_config,
    )
```
    
```
    # 创建商业分析师代理
    business_analyst = AssistantAgent(
        name="商业分析师",
        system_message="作为商业分析师，关注大模型应用的商业价值、投资回报和市场机会。",
        llm_config=llm_config,
    )
```
    
```
    # 创建风控专家代理
    risk_expert = AssistantAgent(
        name="风控专家",
        system_message="作为风控专家，关注大模型应用中的数据安全、隐私保护和合规风险。",
        llm_config=llm_config,
    )
```
    
```
    # 创建群聊
    groupchat = GroupChat(
        agents=[user_proxy, tech_expert, business_analyst, risk_expert],
        messages=[],
        max_round=4
    )
```
    
    # 创建群聊管理器
    manager = GroupChatManager(groupchat=groupchat, llm_config=llm_config)
    
```
    # 启动讨论
    discussion_topic = """
    我们正在考虑在企业中部署大模型应用，需要讨论以下几个方面：
    1. 技术架构选型（自建还是使用API服务）
    2. 应用场景识别和优先级排序
    3. 数据安全和隐私保护方案
    4. 投资预算和ROI分析
    请各位专家从各自专业角度进行分析和建议。
    """
```
    
```
    user_proxy.initiate_chat(
        manager,
        message=discussion_topic
    )
    # 输入exit可终止对话
```
    
    
    
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

# 

## 
