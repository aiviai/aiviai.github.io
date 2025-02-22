---
layout: single
title: "🚀用MCP为AutoGen开挂接入各种工具和框架！Cline零代码开发MCP Server实现接入LangFlow进行文档问答"
sidebar:
  nav: "docs"
date: 2025-02-22 00:00:00 +0800
categories: AIAgents
tags: [AI智能体, Cline, vs code, 编程开发, AI编程, AutoGen, MCP Server, MCP, LangFlow]
classes: wide
author_profile: true
---

AutoGen v0.4引入了对Model Context Protocol (MCP) server的支持，这是一项重要的新功能，为AI代理提供了更强大和灵活的工具使用能力。

### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1gdPMeGEgu/)
- [👉👉👉 通过YouTube观看](https://youtu.be/RxR3x_Uyq4c)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


### 🚀🚀🚀我发布的Cline相关视频：
- ✅ [Cline视频 1](https://youtu.be/kFwE4hHbkT0)
- ✅ [Cline视频 1](https://youtu.be/Sag2p28WYnQ)
- ✅ [Cline视频 1](https://youtu.be/7BFMY0yuRAY)
- ✅ [Cline视频 2](https://youtu.be/MRRFyl5d958)
- ✅ [Cline视频 3](https://youtu.be/RtBL5dNw1NY)
- ✅ [Cline视频 4](https://youtu.be/TsTR-b-ZCQo)
- ✅ [Cline视频 5](https://youtu.be/7Y8Q5IcOey8)
- ✅ [Cline视频 6](https://youtu.be/n18L9VFhNDo)
- ✅ [Cline视频 7](https://youtu.be/Us6LQzKmgfs)



## MCP Server支持

AutoGen v0.4通过`autogen_ext.tools.mcp`模块提供了对MCP server的支持。这允许用户将MCP兼容的工具集成到AutoGen代理中，主要通过以下两种方式：

1. **Server-Sent Events (SSE)**: 通过`SseMcpToolAdapter`类，可以包装基于HTTP和SSE的MCP工具。
2. **标准输入/输出 (STDIO)**: 使用`StdioMcpToolAdapter`类，可以包装基于命令行的MCP工具。

## 集成方法

AutoGen提供了便捷的方法来集成MCP工具：

1. 使用`mcp_server_tools`函数可以连接到MCP server并返回所有可用工具的适配器。
2. 这些适配器可以直接分配给AutoGen代理的工具列表，使代理能够使用这些工具。

## 优势

支持MCP server为AutoGen带来了以下优势：

1. **标准化接口**: MCP被描述为"AI工具的USB"，提供了一种标准化的方式让AI代理发现和使用不同的功能。
2. **灵活性**: 用户可以轻松地将各种MCP兼容工具集成到他们的AutoGen工作流中，包括远程服务、云端工具和Web API。
3. **可扩展性**: 通过简单的配置，可以添加新的MCP server来扩展代理的能力。
4. **动态工具使用**: AutoGen实现了基于字典的灵活方法，使得发现和使用工具变得简单。
5. **跨语言支持**: 这种集成支持不同编程语言构建的代理之间的互操作性。
6. **模块化和可扩展**: 用户可以轻松定制系统，使用可插拔的组件，包括自定义代理、工具、内存和模型。

通过支持MCP server，AutoGen大大增强了其生态系统的开放性和可扩展性，使开发者能够更容易地集成各种工具和服务，从而创建更强大、更灵活的AI代理系统。

### 🔥LangFlow安装以及Cline提示词

```bash
# 安装命令
python -m pip install langflow

# 运行
python -m langflow run

## 提示词
show me some examples about Self-Consistency Prompt 

## Cline提示词

请为我开发一个用于文档问答系统的MCP Tool，
要求实现用户能够输入要检索的提示词，然后进行检索，最后获取到检索到结果。
下面是文档问答系统的API交互方式：

### 请求内容如下，其中input_value的值就是用于检索的提示词：
curl -X POST \
    "http://127.0.0.1:7860/api/v1/run/a8e187bd-44e7-4984-9218-42f63946760b?stream=false" \
    -H 'Content-Type: application/json'\
    -d '{"input_value": "show me some examples about Self-Consistency Prompt ",
    "output_type": "chat",
    "input_type": "chat",
    "tweaks": {
  "ChatInput-Jrzyb": {},
  "ChatOutput-rzoZb": {},
  "ParseData-hzL7Q": {},
  "File-2Teuj": {},
  "Prompt-ktajI": {},
  "MistralModel-aLZcw": {}
}}'
### 响应内容如下，其中text的值就是检索到的结果：
{"session_id":"a8e187bd-44e7-4984-9218-42f63946760b","outputs":[{"inputs":{"input_value":"show me some examples about Self-Consistency Prompt "},"outputs":[{"results":{"message":{"text_key":"text","data":{"timestamp":"2025-02-22T08:22:24+00:00","sender":"Machine","sender_name":"AI","session_id":"a8e187bd-44e7-4984-9218-42f63946760b","text":"Sure, here are some examples of the Self-Consistency Prompt technique from the document:\n\n1. **Text Generation:**\n   - Task: Generate a product review\n   - Instructions: The review should be consistent with the product information provided in the input\n   - Prompt formula: \"Generate a product review that is consistent with the following product information [insert product information]\"\n\n2. **Text Summarization:**\n   - Task: Summarize a news article\n   - Instructions: The summary should be consistent with the information provided in the article\n   - Prompt formula: \"Summarize the following news article in a way that is consistent with the information provided [insert news article]\"\n\n3. **Text Completion:**\n   - Task: Complete a sentence\n   - Instructions: The completion should be consistent with the context provided in the input\n   - Prompt formula: \"Complete the following sentence in a way that is consistent with the context provided [insert sentence]\"\n\n4. **Fact-checking:**\n   - Task: Check for consistency in a given news article\n   - Input text: \"The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n   - Prompt formula: \"Please ensure the following text is self-consistent: The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n5. **Data validation:**\n   - Task: Check for consistency in a given data set\n   - Input text: \"The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n   - Prompt formula: \"Please ensure the following text is self-consistent: The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\nIn each of these examples, the Self-Consistency Prompt technique is used to ensure that the output generated by the model is consistent with the input provided. This helps to maintain accuracy and relevance in the generated text.","files":[],"error":false,"edit":false,"properties":{"text_color":"","background_color":"","edited":false,"source":{"id":"MistralModel-aLZcw","display_name":"MistralAI","source":"mistral-large-latest"},"icon":"MistralAI","allow_markdown":false,"positive_feedback":null,"state":"complete","targets":[]},"category":"message","content_blocks":[],"id":"876f9dd0-fa96-4ba3-81cc-43e7d2a65cec","flow_id":"a8e187bd-44e7-4984-9218-42f63946760b"},"default_value":"","text":"Sure, here are some examples of the Self-Consistency Prompt technique from the document:\n\n1. **Text Generation:**\n   - Task: Generate a product review\n   - Instructions: The review should be consistent with the product information provided in the input\n   - Prompt formula: \"Generate a product review that is consistent with the following product information [insert product information]\"\n\n2. **Text Summarization:**\n   - Task: Summarize a news article\n   - Instructions: The summary should be consistent with the information provided in the article\n   - Prompt formula: \"Summarize the following news article in a way that is consistent with the information provided [insert news article]\"\n\n3. **Text Completion:**\n   - Task: Complete a sentence\n   - Instructions: The completion should be consistent with the context provided in the input\n   - Prompt formula: \"Complete the following sentence in a way that is consistent with the context provided [insert sentence]\"\n\n4. **Fact-checking:**\n   - Task: Check for consistency in a given news article\n   - Input text: \"The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n   - Prompt formula: \"Please ensure the following text is self-consistent: The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n5. **Data validation:**\n   - Task: Check for consistency in a given data set\n   - Input text: \"The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n   - Prompt formula: \"Please ensure the following text is self-consistent: The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\nIn each of these examples, the Self-Consistency Prompt technique is used to ensure that the output generated by the model is consistent with the input provided. This helps to maintain accuracy and relevance in the generated text.","sender":"Machine","sender_name":"AI","files":[],"session_id":"a8e187bd-44e7-4984-9218-42f63946760b","timestamp":"2025-02-22T08:22:24+00:00","flow_id":"a8e187bd-44e7-4984-9218-42f63946760b","error":false,"edit":false,"properties":{"text_color":"","background_color":"","edited":false,"source":{"id":"MistralModel-aLZcw","display_name":"MistralAI","source":"mistral-large-latest"},"icon":"MistralAI","allow_markdown":false,"positive_feedback":null,"state":"complete","targets":[]},"category":"message","content_blocks":[]}},"artifacts":{"message":"Sure, here are some examples of the Self-Consistency Prompt technique from the document:\n\n1. **Text Generation:**\n\n   - Task: Generate a product review\n\n   - Instructions: The review should be consistent with the product information provided in the input\n\n   - Prompt formula: \"Generate a product review that is consistent with the following product information [insert product information]\"\n\n2. **Text Summarization:**\n\n   - Task: Summarize a news article\n\n   - Instructions: The summary should be consistent with the information provided in the article\n\n   - Prompt formula: \"Summarize the following news article in a way that is consistent with the information provided [insert news article]\"\n\n3. **Text Completion:**\n\n   - Task: Complete a sentence\n\n   - Instructions: The completion should be consistent with the context provided in the input\n\n   - Prompt formula: \"Complete the following sentence in a way that is consistent with the context provided [insert sentence]\"\n\n4. **Fact-checking:**\n\n   - Task: Check for consistency in a given news article\n\n   - Input text: \"The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n   - Prompt formula: \"Please ensure the following text is self-consistent: The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n5. **Data validation:**\n\n   - Task: Check for consistency in a given data set\n\n   - Input text: \"The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\n   - Prompt formula: \"Please ensure the following text is self-consistent: The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\nIn each of these examples, the Self-Consistency Prompt technique is used to ensure that the output generated by the model is consistent with the input provided. This helps to maintain accuracy and relevance in the generated text.","sender":"Machine","sender_name":"AI","files":[],"type":"object"},"outputs":{"message":{"message":{"timestamp":"2025-02-22T08:22:24","sender":"Machine","sender_name":"AI","session_id":"a8e187bd-44e7-4984-9218-42f63946760b","text":"Sure, here are some examples of the Self-Consistency Prompt technique from the document:\n\n1. **Text Generation:**\n   - Task: Generate a product review\n   - Instructions: The review should be consistent with the product information provided in the input\n   - Prompt formula: \"Generate a product review that is consistent with the following product information [insert product information]\"\n\n2. **Text Summarization:**\n   - Task: Summarize a news article\n   - Instructions: The summary should be consistent with the information provided in the article\n   - Prompt formula: \"Summarize the following news article in a way that is consistent with the information provided [insert news article]\"\n\n3. **Text Completion:**\n   - Task: Complete a sentence\n   - Instructions: The completion should be consistent with the context provided in the input\n   - Prompt formula: \"Complete the following sentence in a way that is consistent with the context provided [insert sentence]\"\n\n4. **Fact-checking:**\n   - Task: Check for consistency in a given news article\n   - Input text: \"The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n   - Prompt formula: \"Please ensure the following text is self-consistent: The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n5. **Data validation:**\n   - Task: Check for consistency in a given data set\n   - Input text: \"The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n   - Prompt formula: \"Please ensure the following text is self-consistent: The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\nIn each of these examples, the Self-Consistency Prompt technique is used to ensure that the output generated by the model is consistent with the input provided. This helps to maintain accuracy and relevance in the generated text.","files":[],"error":false,"edit":false,"properties":{"text_color":"","background_color":"","edited":false,"source":{"id":"MistralModel-aLZcw","display_name":"MistralAI","source":"mistral-large-latest"},"icon":"MistralAI","allow_markdown":false,"positive_feedback":null,"state":"complete","targets":[]},"category":"message","content_blocks":[],"id":"876f9dd0-fa96-4ba3-81cc-43e7d2a65cec","flow_id":"a8e187bd-44e7-4984-9218-42f63946760b"},"type":"message"}},"logs":{"message":[]},"messages":[{"message":"Sure, here are some examples of the Self-Consistency Prompt technique from the document:\n\n1. **Text Generation:**\n\n   - Task: Generate a product review\n\n   - Instructions: The review should be consistent with the product information provided in the input\n\n   - Prompt formula: \"Generate a product review that is consistent with the following product information [insert product information]\"\n\n2. **Text Summarization:**\n\n   - Task: Summarize a news article\n\n   - Instructions: The summary should be consistent with the information provided in the article\n\n   - Prompt formula: \"Summarize the following news article in a way that is consistent with the information provided [insert news article]\"\n\n3. **Text Completion:**\n\n   - Task: Complete a sentence\n\n   - Instructions: The completion should be consistent with the context provided in the input\n\n   - Prompt formula: \"Complete the following sentence in a way that is consistent with the context provided [insert sentence]\"\n\n4. **Fact-checking:**\n\n   - Task: Check for consistency in a given news article\n\n   - Input text: \"The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n   - Prompt formula: \"Please ensure the following text is self-consistent: The article states that the population of the city is 5 million, but later on, it says that the population is 7 million.\"\n\n5. **Data validation:**\n\n   - Task: Check for consistency in a given data set\n\n   - Input text: \"The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\n   - Prompt formula: \"Please ensure the following text is self-consistent: The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees.\"\n\nIn each of these examples, the Self-Consistency Prompt technique is used to ensure that the output generated by the model is consistent with the input provided. This helps to maintain accuracy and relevance in the generated text.","sender":"Machine","sender_name":"AI","session_id":"a8e187bd-44e7-4984-9218-42f63946760b","stream_url":null,"component_id":"ChatOutput-rzoZb","files":[],"type":"message"}],"timedelta":null,"duration":null,"component_display_name":"Chat Output","component_id":"ChatOutput-rzoZb","used_frozen_result":false}]}]}%                                                                                               charlesqin@charless-MacBook-Pro ~ % 
```

### 🔥AutoGen安装以及代码

```bash

export OPENAI_API_KEY=sk-proj-xxxxxxxxxx

pip install -U "autogen-agentchat" "autogen-ext[openai]" "autogen-ext[mcp]" "mcp-server-fetch" "autogen-ext[http-tool]"

### 示例1 - 使用uvx命令调用pip安装的mcp server

import asyncio

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools

async def main() -> None:
    # Get the fetch tool from mcp-server-fetch.
    fetch_mcp_server = StdioServerParams(command="uvx", args=["mcp-server-fetch"])
    tools = await mcp_server_tools(fetch_mcp_server)

    # Create an agent that can use the fetch tool.
    model_client = OpenAIChatCompletionClient(model="gpt-4o")
    agent = AssistantAgent(name="fetcher", model_client=model_client, tools=tools, reflect_on_tool_use=True)  # type: ignore

    # Let the agent fetch the content of a URL and summarize it.
    result = await agent.run(task="Summarize the content of https://en.wikipedia.org/wiki/Seattle")
    print(result.messages[-1].content)

asyncio.run(main())

### 示例2 - 使用node命令直接调用已安装mcp server

import asyncio

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools

async def main() -> None:
    # Get the fetch tool from mcp-server-fetch.
    fetch_mcp_server = StdioServerParams(command="node", args=["/Users/charlesqin/Documents/Cline/MCP/browser-use/build/index.js"])
    tools = await mcp_server_tools(fetch_mcp_server)

    # Create an agent that can use the fetch tool.
    model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")
    agent = AssistantAgent(name="fetcher", model_client=model_client, tools=tools, reflect_on_tool_use=True)  # type: ignore

    # Let the agent fetch the content of a URL and summarize it.
    result = await agent.run(task="show me some examples about Self-Consistency Prompt ")
    print(result.messages[-1].content)

asyncio.run(main())
```