---
layout: single  
title: "Llama-3.3–70B震撼登场！70b参数128k上下文性能接近gpt4！最强开源大模型，支持简体中文和繁体中文！Cline+Aider实现全自动编程！AutoGen实现最强AI智能体！"  
sidebar:
  nav: "docs"
date: 2024-12-09 10:00:00 +0800  
categories: LLMs
tags: [Llama 3.3, Meta, Open Source, Language Model]
classes: wide  

author_profile: true  
---


Meta于2024年12月6日正式发布了新一代开源大型语言模型Llama 3.3。该模型在仅有700亿参数的情况下，实现了与此前4050亿参数模型相当的性能，标志着自然语言处理领域的重大突破。 

### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/uFAO2FG)
- [👉👉👉 通过YouTube观看](https://youtu.be/MRRFyl5d958)

## 技术创新与架构优化

Llama 3.3采用了优化的Transformer架构，结合了监督微调（SFT）和基于人类反馈的强化学习（RLHF）技术，使模型更符合人类偏好。此外，模型引入了分组查询注意力（GQA）机制，提升了推理阶段的性能和可扩展性。值得一提的是，Llama 3.3支持长达128K的上下文长度，约等于400页文本，在处理长文本时表现出色。

## 多语言支持与应用场景

Llama 3.3具备强大的多语言处理能力，支持包括英语、德语、法语、意大利语、葡萄牙语、印地语、西班牙语和泰语在内的八种语言。这使其在全球范围内的应用更具广泛性。同时，模型能够生成结构化的推理过程和精确的JSON格式响应，适用于多种自然语言生成任务。 

## 部署成本与社区反馈

与之前的模型相比，Llama 3.3显著降低了部署成本。在Meta合作的平台中，Llama 3.3的使用费用仅为Llama 3.1 405B的十分之一至四分之一。目前，模型权重已在官网和Hugging Face上开放下载，开发者可以根据Llama 3.3社区许可协议进行使用。 

## 使用指南与实践

开发者可以通过Ollama等工具运行Llama 3.3模型。以下是使用Ollama运行Llama 3.3的示例代码：


```bash
ollama run llama3.3
```

### 算法测试题

- [x] 講個故事吧
- [x] how many 'r's in strawberrrry?
- [x] 用 python 实现计算 179424673 是第几个质数？
- [x] 三位传教士和三位食人族需要过河。
  他们有一艘船，每次最多可以载两人。
  如果在任何时候，食人族的数量超过了传教士的数量（无论是在河的哪一侧），食人族就会吃掉传教士。
  如何让所有六个人安全过河？请提供分步骤的解决方案，并用 ASCII 图示展示解决方案。


### AutoGen调用Llama3.3代码

```python
You are an expert AI assistant tasked with providing thorough, step-by-step reasoning for complex problems or questions. Follow these guidelines:

1. For each step in your reasoning process:
   - Provide a clear, descriptive title
   - Explain your thought process in detail
   - Use markdown formatting for better readability

2. Use at least 3 different methods or approaches to analyze the problem

3. Include exploration of alternative answers and potential errors in your reasoning

4. Be aware of your limitations as a language model and explicitly state what you can and cannot do

5. When re-examining your reasoning, use a genuinely different approach

6. Apply best practices in problem-solving and critical thinking

7. Conclude with a final answer only when you've exhausted your analysis

8. Structure your response as follows:

```` ``json
{
  "step": 1,
  "title": "Identifying Key Information",
  "content": "## Identifying Key Information\n\nTo begin solving this problem, we need to carefully examine the given information and identify the crucial elements that will guide our solution process. This involves...",
  "next_action": "continue"
}
```` ``

9. For the final step, use "next_action": "final_answer" and include your conclusion

10. Strive for clarity, thoroughness, and intellectual honesty in your analysis

How many 'r's in strawberrrry?
aider
python -m pip install -U aider-chat


export OPENROUTER_API_KEY=<key> # Mac/Linux
setx   OPENROUTER_API_KEY <key> # Windows, restart shell after setx

aider --model openrouter/meta-llama/llama-3.3-70b-instruct


autogen
#这是一个多代理（multi-agent）协作聊天系统示例，它通过多个角色（分析专家、解决方案专家和整合专家）对输入问题进行处理和回答。
#代码的核心逻辑是使用GroupChat和GroupChatManager将多个助手机器人（AssistantAgent）协调起来，以分步骤解决问题并最终生成一个整合后的报告。


# 导入必要的库
import os
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager, config_list_from_json
import openai
from google.colab import userdata


# 设置LLM API密钥
#
# os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')
# openai.api_key = os.getenv("OPENAI_API_KEY")

# LLM模型配置
# model: 使用的GPT模型
# temperature: 控制输出的随机性，越高越随机，越低越确定
# llm_config = {
#     "model": "gpt-4o-mini",
#     "api_key": os.getenv("OPENAI_API_KEY"),
#     "temperature": 0.7,
# }

os.environ["OPENROUTER_API_KEY"] = userdata.get('OPENROUTER_API_KEY')



llm_config = {
    "config_list": [
        {
            "model": "meta-llama/llama-3.3-70b-instruct",
            "base_url":"https://openrouter.ai/api/v1",
            "api_key":os.getenv("OPENROUTER_API_KEY"),
        }
    ]
}


def process_question(question):
    """
    使用GroupChat处理问题的主要函数
    参数:
        question: 需要分析和解决的问题
    返回:
        处理后的最终回答或错误信息
    """

    try:
        # 创建用户代理
        # 作为用户与其他AI代理交互的桥梁
        # human_input_mode="NEVER"表示不需要人类干预
        user_proxy = UserProxyAgent(
            name="user_proxy",
            system_message="A proxy for the user to communicate with the group chat.",
            human_input_mode="NEVER"
        )

        # 创建分析专家代理
        # 负责问题分析，识别关键组件和挑战
        analyst = AssistantAgent(
            name="analyst",
            system_message="""You are an analysis expert. Your task is ONLY to:
            1. Analyze the given problem thoroughly
            2. Identify key components and challenges
            3. Provide a structured analysis
            4. End your analysis with clear conclusions
            DO NOT propose solutions - that is the Solution Explorer's job.""",
            llm_config=llm_config
        )

        # 创建解决方案专家代理
        # 基于分析结果提出具体解决方案
        solution_explorer = AssistantAgent(
            name="solution_explorer",
            system_message="""You are a solution architect. Your task is ONLY to:
            1. Review the analyst's analysis
            2. Propose concrete solutions
            3. Provide implementation steps
            4. End with clear recommendations
            Focus ONLY on solutions, the analysis has already been done.""",
            llm_config=llm_config
        )

        # 创建技术文档撰写代理
        # 负责整合分析和解决方案，生成最终报告
        integrator = AssistantAgent(
            name="integrator",
            system_message="""You are a technical writer. Your task is to:
            1. Review both the analysis and solutions provided
            2. Create a comprehensive final report
            3. Ensure all sections are properly integrated
            4. End with actionable conclusions""",
            llm_config=llm_config
        )

        # 创建群聊，将所有代理加入其中
        # max_round=4确保每个代理都有机会发言
        groupchat = GroupChat(
            agents=[user_proxy, analyst, solution_explorer, integrator],
            messages=[],
            max_round=4  # 增加轮数以确保每个agent都有机会发言
        )

        # 创建群聊管理器，控制对话流程
        manager = GroupChatManager(groupchat=groupchat, llm_config=llm_config)

        # 构建初始问题消息
        # 定义明确的处理流程和每个代理的任务
        initial_message = f"""
        Please help analyze and provide solutions for: {question}

        Follow this EXACT process:
        1. First, Analyst will ONLY provide analysis
        2. Then, Solution Explorer will ONLY provide solutions based on the analysis
        3. Finally, Integrator will create the final report

        Each agent must wait for the previous agent to complete their task before starting.
        Analyst: Start by providing ONLY the analysis.
        """

        # 发起对话
        chat_result = user_proxy.initiate_chat(
            manager,
            message=initial_message
        )

        # 从对话历史中获取最终结果
        # 返回最后一条有效消息
        final_messages = chat_result.chat_history
        if final_messages:
            for msg in reversed(final_messages):
                if msg.get('content'):
                    return msg['content']

        return "No valid response generated"

    except Exception as e:
        return f"Error in processing: {str(e)}"

def main():
    # 设置日志
    import logging
    logging.basicConfig(level=logging.INFO)

    # 示例问题
    question = "How to implement a secure authentication system?"
    print("\nProcessing question:", question)
    print("\nGenerating response...\n")

    # 处理问题并输出结果
    try:
        response = process_question(question)
        print("\nFinal Response:")
        print(response)
    except Exception as e:
        print(f"Error occurred: {str(e)}")

# 程序入口点
if __name__ == "__main__":
    main()
```