---
layout: single
title: "🚀3分钟复刻Manus智能体！AutoGen+MCP Server+Cline构建最强AI智能体，支持ollama！轻松实现网络搜索+文件操作的AI Agent！不花一分钱也能拥有强大AI智能体！#ai"
sidebar:
  nav: "docs"
date: 2025-03-06 00:00:00 +0800
categories: AIAgents
tags: [AutoGen, MCP Server , Cline, Manus, AI智能体, AIAgents, AI]
classes: wide
author_profile: true
---

3分钟复刻Manus智能体！AutoGen+MCP Server+Cline构建最强AI智能体，支持ollama！轻松实现网络搜索+文件操作的AI Agent！不花一分钱也能拥有强大AI智能体

Manus是中国科技团队最近推出的AI智能体系统，但是这个智能体并不开源。

而且很多小伙伴都没有体验到Manus。

所以我们将使用开源方案来复刻Manus。

### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1gPXXYiETE/)
- [👉👉👉 通过YouTube观看](https://youtu.be/szTXELuaJos)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

## 🔥 MCP Server相关视频：
1️⃣ https://youtu.be/RxR3x_Uyq4c
2️⃣ https://youtu.be/jsd8TpzicRQ
3️⃣ https://youtu.be/kFwE4hHbkT0
4️⃣ https://youtu.be/7BFMY0yuRAY

## 🔥 AutoGen相关视频：
1️⃣ https://youtu.be/IrTEDPnEVvU


使用AutoGen+MCP Server打造超越Manus的智能体具有以下优势:

1. 开放性:AutoGen是开源框架,允许更灵活的定制和扩展。
2. 模块化架构:AutoGen采用分层设计,便于开发者根据需求选择合适的抽象层级。
3. 多代理协作:AutoGen专门设计用于构建多代理AI应用,支持复杂的代理间交互。
4. 代码生成与执行:AutoGen强调代码生成和执行能力,增强了代理的表达能力和适应性。
5. 人机协作:支持人类干预模式,可在自主工作流程中融入人类反馈。
6. MCP集成:结合Model Control Protocol,可实现更精细的模型控制和上下文管理。
7. 跨平台支持:AutoGen支持多种编程语言和运行环境,增强了部署灵活性。

通过结合AutoGen的强大框架和MCP的精细控制,开发者有潜力创建出在自主性、适应性和协作能力上超越Manus的智能体系统。

### 安装

```bash

python3 -m venv venv
source venv/bin/activate

pip install "autogen-ext[openai,mcp]" autogen-agentchat mcp-server-fetch -U

pip install "autogen-ext[openai]"
pip install autogen-agentchat
pip install mcp-server-fetch autogen-ext[mcp]
pip install mcp-server-fetch
pip install -U "autogen-ext[mcp]"

ollama run phi4-mini
```

### 代码

```bash
# 代码1
import asyncio
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_core import CancellationToken
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools

async def main():
    # Setup the MCP fetch server parameters
    fetch_mcp_server = StdioServerParams(command="node", args=["mcp-server-fetch"])
    
    # Get the fetch tool from the MCP server
    tools = await mcp_server_tools(fetch_mcp_server)
    
    # Create fetch agent with the MCP fetch tool
    fetch_agent = AssistantAgent(
        name="content_fetcher",
        model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
        tools=tools,  # The MCP fetch tool will be included here
        system_message="你是一个网页内容获取助手。使用fetch工具获取网页内容。"
    )
    
    # Create rewriter Agent (unchanged)
    rewriter_agent = AssistantAgent(
        name="content_rewriter",
        model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
        system_message="""你是一个内容改写专家。将提供给你的网页内容改写为科技资讯风格的文章。
        科技资讯风格特点：
        1. 标题简洁醒目
        2. 开头直接点明主题
        3. 内容客观准确但生动有趣
        4. 使用专业术语但解释清晰
        5. 段落简短，重点突出
        
        当你完成改写后，回复TERMINATE。"""
    )
    
    # Set up termination condition and team (unchanged)
    termination = TextMentionTermination("TERMINATE")
    team = RoundRobinGroupChat([fetch_agent, rewriter_agent], termination_condition=termination)
    
    # Run the workflow (unchanged)
    result = await team.run(
        task="获取https://www.aivi.fyi/llms/introduce-Claude-3.7-Sonnet的内容，然后将其改写为科技资讯风格的文章",
        cancellation_token=CancellationToken()
    )
    
    print("\n最终改写结果：\n")
    print(result.messages[-1].content)
    return result

# This is the correct way to run async code in a Python script
if __name__ == "__main__":
    asyncio.run(main())
    
    
    
 # 代码2
import asyncio
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_core import CancellationToken
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools
from autogen_agentchat.ui import Console

async def main():
    # Setup the MCP fetch server parameters
    fetch_mcp_server = StdioServerParams(command="uvx", args=["mcp-server-fetch"])
    
    # Get the fetch tool from the MCP server
    tools = await mcp_server_tools(fetch_mcp_server)
    
    # Create fetch agent with the MCP fetch tool
    fetch_agent = AssistantAgent(
        name="content_fetcher",
        model_client=OpenAIChatCompletionClient(model="gpt-4o"),
        tools=tools,
        system_message="你是一个网页内容获取助手。使用fetch工具获取网页内容。"
    )
    
    # Create rewriter Agent
    rewriter_agent = AssistantAgent(
        name="content_rewriter",
        model_client=OpenAIChatCompletionClient(model="gpt-4o"),
        system_message="""你是一个内容改写专家。将提供给你的网页内容改写为科技资讯风格的文章。
        科技资讯风格特点：
        1. 标题简洁醒目
        2. 开头直接点明主题
        3. 内容客观准确但生动有趣
        4. 使用专业术语但解释清晰
        5. 段落简短，重点突出
        
        当你完成改写后，回复TERMINATE。"""
    )
    
    # Set up termination condition and team
    termination = TextMentionTermination("TERMINATE")
    team = RoundRobinGroupChat([fetch_agent, rewriter_agent], termination_condition=termination)
    
    task = "获取https://www.aivi.fyi/llms/introduce-Claude-3.7-Sonnet的内容，然后将其改写为科技资讯风格的文章"
    
    # 显示对话过程
    stream = team.run_stream(task=task, cancellation_token=CancellationToken())
    await Console(stream)
    
    # 获取最终结果（使用单独的run调用）
    result = await team.run(task=task, cancellation_token=CancellationToken())
    
    print("\n最终改写结果：\n")
    print(result.messages[-1].content)
    
    return result

# 在Python脚本中运行异步代码的正确方式
if __name__ == "__main__":
    asyncio.run(main())
    
    
    
# 代码3
import asyncio
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_core import CancellationToken
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools
from datetime import datetime

async def main():

    # 设置MCP fetch服务器参数
    # 这个服务器用于获取网页内容
    fetch_mcp_server = StdioServerParams(command="uvx", args=["mcp-server-fetch"])

    # 设置MCP文件系统服务器参数
    # 这个服务器用于写入本地文件
    write_mcp_server = StdioServerParams(command="npx", args=["-y", "@modelcontextprotocol/server-filesystem", "/Users/charlesqin/Code-Project/test-autogen"])
    
    # 从MCP服务器获取fetch工具
    tools_fetch = await mcp_server_tools(fetch_mcp_server)

    # 从MCP服务器获取filesystem工具
    tools_write = await mcp_server_tools(write_mcp_server)
    
    # 创建内容获取代理
    # 这个代理负责获取网页内容
    fetch_agent = AssistantAgent(
        name="content_fetcher",
        model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
        tools=tools_fetch,
        system_message="你是一个网页内容获取助手。使用fetch工具获取网页内容。获取成功后请传递给content_rewriter。"
    )
    
    # 创建内容改写代理
    # 这个代理负责将网页内容改写为科技资讯风格
    # 注意：不再在完成时添加TERMINATE，而是将内容传递给下一个代理    
    rewriter_agent = AssistantAgent(
        name="content_rewriter",
        model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
        system_message="""你是一个内容改写专家。将提供给你的网页内容改写为科技资讯风格的文章。
        科技资讯风格特点：
        1. 标题简洁醒目
        2. 开头直接点明主题
        3. 内容客观准确但生动有趣
        4. 使用专业术语但解释清晰
        5. 段落简短，重点突出
        
        当你完成改写后，请将内容传递给content_writer代理，让它将你的改写内容写入到文件中。"""
    )
    
    # 获取当前日期并格式化为YYYY-MM-DD
    current_date = datetime.now().strftime('%Y-%m-%d')

    # 创建文件写入代理
    # 这个代理负责将改写后的内容写入本地文件
    # 注意：这个代理会在完成任务后添加TERMINATE来结束对话
    write_agent = AssistantAgent(
        name="content_writer",
        model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
        tools=tools_write,
        system_message="""你是一个文件助手。使用filesystem工具将content_rewriter提供的内容写入txt文件，文件以日期命名（格式为{current_date}.txt）。
        当你成功将文件写入后，回复"TERMINATE"以结束对话。"""
    )
    
    # 设置终止条件和团队
    # 当任何代理回复TERMINATE时，对话将结束
    termination = TextMentionTermination("TERMINATE")
    team = RoundRobinGroupChat([fetch_agent, rewriter_agent, write_agent], termination_condition=termination)
    
    task = "获取https://www.aivi.fyi/llms/introduce-Claude-3.7-Sonnet的内容，然后将其改写为科技资讯风格的文章，然后将改写的文章写入本地txt文件"
    
    # 只执行一次任务，使用run方法
    result = await team.run(task=task, cancellation_token=CancellationToken())
    
    # 遍历并打印所有消息，以显示整个过程
    print("\n整个对话过程：\n")
    print("-" * 60)
    
    for i, msg in enumerate(result.messages):
        # 判断消息的类型并相应地打印
        if hasattr(msg, 'source') and hasattr(msg, 'content'):
            print(f"\n---------- {msg.source} ----------")
            print(msg.content)
        elif hasattr(msg, 'source') and hasattr(msg, 'content') and isinstance(msg.content, list):
            print(f"\n---------- {msg.source} (工具调用) ----------")
            for item in msg.content:
                print(item)
        else:
            print(f"\n[消息 {i+1}] (类型: {type(msg).__name__})")
            print(msg)
        
        print("-" * 60)
    
    # 打印最终改写结果
    print("\n最终改写结果：\n")
    final_message = result.messages[-1]
    if hasattr(final_message, 'content'):
        print(final_message.content)
    
    return result

# 在Python脚本中运行异步代码的正确方式
if __name__ == "__main__":
    asyncio.run(main())
    
```

