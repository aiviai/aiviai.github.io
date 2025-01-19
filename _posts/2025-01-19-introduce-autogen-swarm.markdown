---
layout: single
title: "微软最强AI智能体AutoGen史诗级更新！原生支持Magentic-One和Swarm与Teams！引领AI智能体元年！支持ollama本地部署！小白也能轻松掌握AI框架保姆级教程，超详细上手指南"
sidebar:
  nav: "docs"
date: 2025-01-15 00:00:00 +0800
categories: AIAgents
tags: [AIAgents, AutoGen, AI智能体, ollama, Llama3.2, Magentic-One, Swarm, AI]
classes: wide
author_profile: true
---

AutoGen 是一个用于构建代理 AI 应用程序的开源框架，允许开发者创建可以自主行动或与人类协作的多代理 AI 系统。AutoGen 0.4.2 是一个重要的更新版本，它在代理工作流程中提高了代码质量、稳健性、通用性和可扩展性。新的异步、事件驱动的架构使 AutoGen 更具可扩展性和稳健性，从而支持更广泛的代理场景。

### **本篇笔记所对应的视频：**
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1uWwCePEYu/)
- [👉👉👉 通过YouTube观看](https://youtu.be/IrTEDPnEVvU)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

## AutoGen 0.4.2 的新特性和优点

AutoGen 0.4.2 的更新受到微软内外反馈的启发，旨在使 AutoGen 更强大、更易于扩展，并支持更广泛的代理场景。   以下是 0.4.2 版本中的一些主要特性和改进：

**1. 异步消息传递**

代理之间通过异步消息进行通信，支持事件驱动和请求/响应交互模式。  这意味着代理可以独立运行，并在需要时相互发送消息，而无需等待响应。这提高了系统的效率和可扩展性，尤其是在处理大量代理或需要实时响应的场景中。异步通信是构建响应式和可扩展的多代理系统的关键，因为它允许代理独立操作并以更灵活和动态的方式进行交互。与传统的同步通信相比，异步通信能够更好地处理并发性、延迟和故障，使其成为构建复杂、实时 AI 应用程序的理想选择。

**2. 模块化和可扩展性**

用户可以使用可插拔组件轻松定制系统，包括自定义代理、工具、内存和模型。  他们还可以使用事件驱动模式构建主动和长期运行的代理。这种模块化设计允许开发者根据特定需求灵活地组合和扩展 AutoGen 框架，从而构建各种类型的代理 AI 应用程序。

**3. 可观察性和调试**

内置的指标跟踪、消息跟踪和调试工具提供了对代理交互和工作流程的监控和控制，并支持 OpenTelemetry 以实现行业标准的可观察性。  OpenTelemetry 是一组 API、SDK、工具和集成，旨在创建和管理遥测数据，例如跟踪、指标和日志。通过支持 OpenTelemetry，AutoGen 允许开发者收集和分析代理行为数据，从而更好地理解系统性能、识别潜在问题并进行优化。这使得开发者能够更好地理解代理的行为，并更容易地识别和解决潜在问题。

**4. 可扩展性和分布式**

用户可以设计复杂的分布式代理网络，这些网络可以跨组织边界无缝运行。  这使得 AutoGen 能够支持大型、复杂的 AI 应用程序，这些应用程序需要多个代理协同工作以实现共同目标。

**5. 内置和社区扩展**

扩展模块通过用于代理工作流程的高级模型客户端、代理、多代理团队和工具增强了框架的功能。  社区支持允许开源开发人员管理自己的扩展。这为 AutoGen 生态系统带来了更大的灵活性和多样性，并允许开发者根据特定需求定制和扩展框架。

**6. 跨语言支持**

此更新旨在支持使用不同编程语言构建的代理之间的互操作性，目前支持 Python，而 .NET 和其他语言正在开发中。  这使得开发者能够利用不同语言的优势，并更容易地将 AutoGen 集成到现有的系统中。

**7. 完整的类型支持**

接口在构建时强制执行类型检查，从而提高了稳健性并维护了代码质量。  这有助于减少错误和提高代码的可读性，从而使开发过程更加高效。

### 🚀安装AutoGen依赖

```jsx
# 配置环境
python3 -m venv .venv
source .venv/bin/activate

# 下载
!pip install -U "autogen-agentchat" "autogen-ext[openai,magentic-one,azure]" "litellm[proxy]" nest_asyncio pyngrok yfinance google-search-results rich
# AutoGen Studio
pip install -U "autogenstudio"

#启动
autogenstudio ui --port 8081 --host 0.0.0.0

# 停用
deactivate
```

### **LiteLLM & Ollama**

```jsx
curl -fsSL https://ollama.com/install.sh | sh

ollama pull llama3.2:1b

litellm --model ollama/llama3.2:1b
```

### ✅在Colab中使用终端命令行的功能

```python
#安装 colab-xterm 包
#https://pypi.org/project/colab-xterm/
!pip install colab-xterm 

#加载刚才安装的 colab-xterm 扩展
%load_ext colabxterm

#在 Colab 笔记本中打开一个交互式终端窗口
%xterm
```

### ✅AutoGen Studio

```python
!pip install pyngrok

!ngrok authtoken xxxxxxx
```

```python
from pyngrok import ngrok
url = ngrok.connect(8081)
print(url)

#NgrokTunnel: "https://a720-35-232-234-177.ngrok-free.app" -> "http://localhost:8081"
```

### ✅在Colab终端安装ollama并且拉取模型和运行服务

```python
curl https://ollama.ai/install.sh | sh
ollama serve & ollama pull llama3.2
```

### 🚀AutoGen代码-调用ollama本地模型以及第三方API示例

```jsx
!pip install nest_asyncio
```

```python
from google.colab import userdata
api_key=userdata.get('OPENROUTER_API_KEY')
api_key_2=userdata.get('HYPERBOLIC_API_KEY')
api_key_nvidia_nim=userdata.get('NVIDIA_NIM_API_KEY')
```

```python
import nest_asyncio
nest_asyncio.apply()

import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import MaxMessageTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_ext.models.openai import OpenAIChatCompletionClient
from google.colab import userdata
from rich.console import Console
from rich.panel import Panel

console = Console()

# # ollama本地部署
def get_model_client_ollama() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="llama3.2:latest",
        api_key="ollama",
        base_url="http://localhost:11434/v1",
        model_capabilities={
            "json_output": False,
            "vision": False,
            "function_calling": True,
        },
    )

async def main() -> None:

    model_client = get_model_client_ollama()

    agent1 = AssistantAgent("Assistant1", model_client=model_client)
    agent2 = AssistantAgent("Assistant2", model_client=model_client)

    termination = MaxMessageTermination(11)

    team = RoundRobinGroupChat([agent1, agent2], termination_condition=termination)

    stream = team.run_stream(task="Count from 1 to 10, respond one at a time.")
    
    async for message in stream:
        if hasattr(message, 'content'):
            # Print message in panel with source as title
            console.print(Panel(
                message.content,
                title=f"[bold blue]{message.source}[/bold blue]",
                border_style="blue"
            ))
            
            # Print usage statistics if available
            if message.models_usage:
                console.print(f"[dim]Usage - Prompt tokens: {message.models_usage.prompt_tokens}, "
                         f"Completion tokens: {message.models_usage.completion_tokens}[/dim]")
            console.print("―" * 80)  # Separator line
        else:  # TaskResult object
            console.print("\n[bold yellow]Task Result Summary[/bold yellow]")
            console.print(f"Stop Reason: {message.stop_reason}")
            console.print("―" * 80)

asyncio.run(main())
```

# ✅Teams

AutoGen Teams 是一个多智能体协作系统，其主要特点是：

1. 用途：用于需要多个 AI 代理协作完成的复杂任务。
2. 工作方式：
- 多个代理以轮询方式(round-robin)进行交互
- 每个代理都能看到完整上下文
- 代理之间可以相互回应和评价
1. 主要功能：
- 可创建和运行代理团队
- 支持实时观察代理交互过程
- 可以暂停、恢复和终止任务
- 保持对话历史和上下文
1. 使用建议：
- 简单任务建议用单个代理
- 只有在单个代理无法胜任时才考虑使用团队
- 需要更多结构化引导和控制

让复杂任务能够通过多个专业代理的协作来完成，每个代理可以发挥自己的专长并相互补充。

```python
import asyncio

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.base import TaskResult
from autogen_agentchat.conditions import ExternalTermination, TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_core import CancellationToken
from autogen_ext.models.openai import OpenAIChatCompletionClient

# # ollama本地部署
def get_model_client_ollama() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="llama3.2:latest",
        api_key="ollama",
        base_url="http://localhost:11434/v1",
        model_capabilities={
            "json_output": False,
            "vision": False,
            "function_calling": True,
        },
    )

## OpenRouter
def get_model_client_OpenRouter() -> OpenAIChatCompletionClient:  # type: ignore
    "Mimic OpenAI API using Local LLM Server."
    return OpenAIChatCompletionClient(
        model="microsoft/phi-4",
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        model_capabilities={
            "json_output": False,
            "vision": False,
            "function_calling": True,
        },
    )

## Nvidia NIM
def get_model_client_NIM() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="meta/llama-3.3-70b-instruct",
        api_key=api_key_nvidia_nim,
        base_url="https://integrate.api.nvidia.com/v1",
        model_capabilities={
            "json_output": True,
            "vision": False,
            "function_calling": True,
        },
    )

## 其他第三方测试
def get_model_client_other() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="meta-llama/Llama-3.3-70B-Instruct",
        api_key=api_key_2,
        base_url="https://api.hyperbolic.xyz/v1",
        model_capabilities={
            "json_output": False,
            "vision": False,
            "function_calling": True,
        },
    )

# # ollama本地部署
def get_model_client_ollama() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="llama3.2:latest",
        api_key="ollama",
        base_url="http://localhost:11434/v1",
        model_capabilities={
            "json_output": False,
            "vision": False,
            "function_calling": True,
        },
    )

# 创建 OpenAI 模型客户端
model_client = get_model_client_NIM()

# 创建Python开发工程师
Programmer_Agent = AssistantAgent(
    "programmer",
    model_client=model_client,
    system_message="""你是一个专业的Python开发工程师。
请基于需求编写清晰、可维护且符合PEP8规范的Python代码。
代码要包含:
- 清晰的注释和文档字符串
- 适当的错误处理
- 代码性能优化
- 单元测试
""",
)

# 创建代码审计专家
CodeReviewer_Agent = AssistantAgent(
    "code_reviewer",
    model_client=model_client,
    system_message="""你是一位资深的代码审查专家。请对代码进行全面的评审,包括:
- 代码规范性和可读性
- 设计模式的使用
- 性能和效率
- 安全性考虑
- 测试覆盖率
- 潜在问题
当代码符合要求时,回复'同意通过'。""",
)

# 定义终止条件:当评论员同意时停止任务
text_termination = TextMentionTermination("同意通过")

# 创建一个包含主要智能助手和评论员的团队
team = RoundRobinGroupChat([Programmer_Agent, CodeReviewer_Agent], termination_condition=text_termination)

# 示例任务:实现一个文件处理类
task = """
请实现一个文件处理类 FileProcessor,要求:
1. 支持读取、写入和追加文本文件
2. 包含基本的文件统计功能(行数、字符数、单词数)
3. 支持文件加密/解密功能
4. 实现异常处理
5. 编写完整的单元测试
"""

# 在脚本中运行时使用 `asyncio.run(...)`
result = await team.run(task=task)

def print_formatted_result(task_result):
    print("\n" + "="*60)
    print("代码评审过程".center(60))
    print("="*60 + "\n")

    for msg in task_result.messages:
        if msg.source == 'user':
            print("📋 需求描述：")
        elif msg.source == 'primary':
            print("👨‍💻 开发工程师提交：")
        elif msg.source == 'critic':
            print("🔍 代码审查反馈：")

        print("-" * 40)
        print(f"{msg.content}\n")

        if msg.models_usage:
            print(f"Token统计：")
            print(f"· 提示tokens: {msg.models_usage.prompt_tokens}")
            print(f"· 生成tokens: {msg.models_usage.completion_tokens}")
            print(f"· 总计tokens: {msg.models_usage.prompt_tokens + msg.models_usage.completion_tokens}\n")

    print("="*60)
    print("评审结果：".center(60))
    print("="*60)
    print(f"\n{task_result.stop_reason}\n")

print_formatted_result(result)
```

# ✅Selector Group Chat

SelectorGroupChat是AutoGen框架中的一个团队协作组件,其核心功能是:

让多个AI智能体以动态轮流的方式进行任务协作,由模型根据上下文选择最合适的下一个发言者。主要特点包括:

1. 基于模型的说话者选择 - 通过分析对话历史和每个智能体的角色描述来选择下一个最合适的发言者
2. 默认避免同一智能体连续发言(可配置)
3. 支持自定义选择函数覆盖默认的基于模型的选择逻辑
4. 支持配置各参与者的角色和描述信息

工作流程:

- 接收任务后,分析当前对话上下文选择下一个发言者
- 选中的智能体提供响应并广播给其他参与者
- 检查终止条件决定是否继续对话
- 返回对话历史作为任务结果

这种设计适用于需要多个专业智能体协作完成的复杂任务场景。

```python
from typing import Sequence

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import MaxMessageTermination, TextMentionTermination
from autogen_agentchat.messages import AgentEvent, ChatMessage
from autogen_agentchat.teams import SelectorGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

# Note: This example uses mock tools instead of real APIs for demonstration purposes
def search_web_tool(query: str) -> str:
    if "2006-2007" in query:
        return """Here are the total points scored by Miami Heat players in the 2006-2007 season:
        Udonis Haslem: 844 points
        Dwayne Wade: 1397 points
        James Posey: 550 points
        ...
        """
    elif "2007-2008" in query:
        return "The number of total rebounds for Dwayne Wade in the Miami Heat season 2007-2008 is 214."
    elif "2008-2009" in query:
        return "The number of total rebounds for Dwayne Wade in the Miami Heat season 2008-2009 is 398."
    return "No data found."

def percentage_change_tool(start: float, end: float) -> float:
    return ((end - start) / start) * 100
    
model_client = OpenAIChatCompletionClient(model="gpt-4o")

planning_agent = AssistantAgent(
    "PlanningAgent",
    description="An agent for planning tasks, this agent should be the first to engage when given a new task.",
    model_client=model_client,
    system_message="""
    You are a planning agent.
    Your job is to break down complex tasks into smaller, manageable subtasks.
    Your team members are:
        Web search agent: Searches for information
        Data analyst: Performs calculations

    You only plan and delegate tasks - you do not execute them yourself.

    When assigning tasks, use this format:
    1. <agent> : <task>

    After all tasks are complete, summarize the findings and end with "TERMINATE".
    """,
)

web_search_agent = AssistantAgent(
    "WebSearchAgent",
    description="A web search agent.",
    tools=[search_web_tool],
    model_client=model_client,
    system_message="""
    You are a web search agent.
    Your only tool is search_tool - use it to find information.
    You make only one search call at a time.
    Once you have the results, you never do calculations based on them.
    """,
)

data_analyst_agent = AssistantAgent(
    "DataAnalystAgent",
    description="A data analyst agent. Useful for performing calculations.",
    model_client=model_client,
    tools=[percentage_change_tool],
    system_message="""
    You are a data analyst.
    Given the tasks you have been assigned, you should analyze the data and provide results using the tools provided.
    """,
)

text_mention_termination = TextMentionTermination("TERMINATE")
max_messages_termination = MaxMessageTermination(max_messages=25)
termination = text_mention_termination | max_messages_termination

team = SelectorGroupChat(
    [planning_agent, web_search_agent, data_analyst_agent],
    model_client=OpenAIChatCompletionClient(model="gpt-4o-mini"),
    termination_condition=termination,
)

task = "Who was the Miami Heat player with the highest points in the 2006-2007 season, and what was the percentage change in his total rebounds between the 2007-2008 and 2008-2009 seasons?"

# Use asyncio.run(...) if you are running this in a script.
await Console(team.run_stream(task=task))
```

# ✅Magentic-One

- 视频演示 [https://youtu.be/QNZZJvGnk80](https://www.google.com/url?q=https%3A%2F%2Fyoutu.be%2FQNZZJvGnk80)
- Magentic-One是一个通用型多智能体系统，专门用于解决各种领域中涉及网络和文件处理的开放式任务。
- 该系统于2024年11月首次发布，最初基于autogen-core库开发，现已迁移到autogen-agentchat平台，提供了更模块化和易用的接口。
1. 核心架构:系统由一个 Orchestrator(编排器)智能体领导,负责:
- 任务分解和规划
- 指挥其他智能体执行子任务
- 追踪整体进度
- 必要时采取纠正措施
1. 主要组件:
- WebSurfer: 控制浏览器进行网页操作和信息获取
- FileSurfer: 读取和处理本地文件
- Coder: 编写代码和分析信息
- ComputerTerminal: 提供控制台访问以执行代码
1. 工作流程:
- Orchestrator 创建初始计划
- 在 Task Ledger 中记录必要信息
- 在 Progress Ledger 中追踪进度
- 动态分配任务给其他智能体
- 必要时调整计划
1. 技术特点:
- 基于 autogen-agentchat 构建
- 支持多种 LLM 模型(推荐 Orchestrator 使用 GPT-4o)
- 提供容器化和安全措施建议

```python
import nest_asyncio
nest_asyncio.apply()
import asyncio
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import MagenticOneGroupChat
from autogen_agentchat.ui import Console

## OpenRouter
def get_model_client_OpenRouter() -> OpenAIChatCompletionClient:  # type: ignore
    "Mimic OpenAI API using Local LLM Server."
    return OpenAIChatCompletionClient(
        model="openai/gpt-4o-2024-11-20",
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        model_capabilities={
            "json_output": True,
            "vision": True,
            "function_calling": True,
        },
    )

async def main() -> None:
    model_client = get_model_client_OpenRouter()

    assistant = AssistantAgent(
        "Assistant",
        model_client=model_client,
    )
    team = MagenticOneGroupChat([assistant], model_client=model_client)
    await Console(team.run_stream(task="编写一个 Python 脚本，实现提取谷歌搜索结果的前十条的标题和链接"))

asyncio.run(main())
```

# ✅Swarm

Swarm是AutoGen中的一个多智能体协作模式，主要特点是：

1. 允许智能体根据各自能力自主移交任务给其他智能体，而不需要中央协调器
2. 所有智能体共享相同的对话上下文和消息历史
3. 通过HandoffMessage机制实现任务移交，每个智能体可以指定将任务转给哪些其他智能体
4. 适用于需要多个专家智能体协作的复杂任务,比如客服系统(客服 -> 退款专员)或股票研究(分析师 -> 写手)等场景

```python
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import HandoffTermination, TextMentionTermination
from autogen_agentchat.messages import HandoffMessage
from autogen_agentchat.teams import Swarm
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

from serpapi import GoogleSearch
from typing import Any, Dict, List
import os
from datetime import datetime

import yfinance as yf

from google.colab import userdata

from google.colab import userdata
api_key=userdata.get('OPENROUTER_API_KEY')
api_key_2=userdata.get('HYPERBOLIC_API_KEY')
api_key_nvidia_nim=userdata.get('NVIDIA_NIM_API_KEY')

os.environ["SERPAPI_KEY"]=userdata.get('SERPAPI_KEY')

## OpenRouter
def get_model_client_OpenRouter() -> OpenAIChatCompletionClient:  # type: ignore
    "Mimic OpenAI API using Local LLM Server."
    return OpenAIChatCompletionClient(
        model="openai/gpt-4o-2024-11-20",
        api_key=api_key,
        base_url="https://openrouter.ai/api/v1",
        model_capabilities={
            "json_output": True,
            "vision": True,
            "function_calling": True,
        },
    )
    

async def get_stock_data(symbol: str) -> Dict[str, Any]:
    """
    Get real stock market data for a given symbol with improved error handling

    Args:
        symbol: Stock ticker symbol (e.g. 'TSLA')

    Returns:
        Dict containing price, volume, PE ratio and market cap
    """
    try:
        # 创建股票对象
        stock = yf.Ticker(symbol)

        # 获取实时价格数据
        price_info = stock.history(period='1d')
        if not price_info.empty:
            current_price = price_info['Close'].iloc[-1]
        else:
            current_price = None

        # 获取其他信息
        info = stock.info

        return {
            "price": current_price,
            "volume": info.get("regularMarketVolume"),
            "pe_ratio": info.get("forwardPE"),
            "market_cap": info.get("marketCap"),
            "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

    except Exception as e:
        print(f"Error fetching stock data for {symbol}: {str(e)}")
        return {
            "price": None,
            "volume": None,
            "pe_ratio": None,
            "market_cap": None,
            "error": str(e)
        }

async def get_news(query: str) -> List[Dict[str, str]]:
    """Get recent news articles about a company"""
    params = {
        "engine": "google_news",
        "q": query,
        "gl": "us",
        "hl": "en",
        "api_key": os.getenv("SERPAPI_KEY"),
        "num": 3  # 限制结果数量
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()

        news_items = []
        for article in results.get("news_results", []):
            # 获取更多文章细节
            title = article.get("title", "").strip()
            source = article.get("source", {})
            source_name = source.get("name", "")
            authors = source.get("authors", [])
            author_text = f"By {', '.join(authors)}" if authors else ""

            # 提取或构建摘要
            snippet = article.get("snippet", "")
            description = article.get("description", "")
            link_text = article.get("link_text", "")

            # 选择最长的非空内容作为摘要
            summary_candidates = [s for s in [snippet, description, link_text] if s]
            summary = max(summary_candidates, key=len) if summary_candidates else title

            # 格式化日期
            date_str = article.get("date", "")
            try:
                if date_str:
                    date_obj = datetime.strptime(date_str.split(",")[0], "%m/%d/%Y")
                    formatted_date = date_obj.strftime("%Y-%m-%d")
                else:
                    formatted_date = datetime.now().strftime("%Y-%m-%d")
            except:
                formatted_date = date_str

            news_items.append({
                "title": title,
                "date": formatted_date,
                "summary": f"{summary} {author_text}".strip(),
                "source": source_name
            })

        return news_items

    except Exception as e:
        print(f"Error fetching news: {str(e)}")
        return []
        
model_client = get_model_client_OpenRouter()

planner = AssistantAgent(
    "planner",
    model_client=model_client,
    handoffs=["financial_analyst", "news_analyst", "writer"],
    system_message="""你是一名研究规划协调员。
    通过委派给专业智能体来协调市场研究：
    - 金融分析师：负责股票数据分析
    - 新闻分析师：负责新闻收集和分析
    - 撰写员：负责编写最终报告
    始终先发送你的计划，然后再移交给适当的智能体。
    每次只能移交给一个智能体。
    当研究完成时使用 TERMINATE 结束。""",
)

financial_analyst = AssistantAgent(
    "financial_analyst",
    model_client=model_client,
    handoffs=["planner"],
    tools=[get_stock_data],
    system_message="""你是一名金融分析师。
    使用 get_stock_data 工具分析股市数据。
    提供金融指标的深入见解。
    分析完成后务必移交回规划协调员。""",
)

news_analyst = AssistantAgent(
    "news_analyst",
    model_client=model_client,
    handoffs=["planner"],
    tools=[get_news],
    system_message="""你是一名新闻分析师。
    使用 get_news 工具收集和分析相关新闻。
    总结新闻中的关键市场见解。
    分析完成后务必移交回规划协调员。""",
)

writer = AssistantAgent(
    "writer",
    model_client=model_client,
    handoffs=["planner"],
    system_message="""你是一名财经报告撰写员。
    将研究发现编译成清晰简洁的报告。
    撰写完成后务必移交回规划协调员。""",
)

# Define termination condition
text_termination = TextMentionTermination("TERMINATE")
termination = text_termination

research_team = Swarm(
    participants=[planner, financial_analyst, news_analyst, writer], termination_condition=termination
)

task = "为特斯拉(TSLA)股票进行市场研究，并用中文回答"
await Console(research_team.run_stream(task=task))
```

## **✅Travel Planning**

```python
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

## Nvidia NIM
def get_model_client_NIM() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="meta/llama-3.3-70b-instruct",
        api_key=api_key_nvidia_nim,
        base_url="https://integrate.api.nvidia.com/v1",
        model_capabilities={
            "json_output": True,
            "vision": False,
            "function_calling": True,
        },
    )
    
planner_agent = AssistantAgent(
    "planner_agent",
    model_client=get_model_client_NIM(),
    description="一个能够帮助规划行程的智能助手",
    system_message="你是一个能够根据用户需求提供旅行规划建议的智能助手。",
)

local_agent = AssistantAgent(
    "local_agent",
    model_client=get_model_client_NIM(),
    description="一个能够推荐当地活动和景点的在地助手",
    system_message="你是一个能够为用户推荐地道有趣的当地活动和景点的智能助手，可以充分利用所提供的任何背景信息。",
)

language_agent = AssistantAgent(
    "language_agent",
    model_client=get_model_client_NIM(),
    description="一个能够提供目的地语言建议的智能助手",
    system_message="你是一个能够审查旅行计划的智能助手，负责就如何最好地应对目的地的语言或沟通挑战提供重要/关键提示。如果计划中已经包含了语言提示，你可以说明计划是令人满意的，并解释原因。",
)

travel_summary_agent = AssistantAgent(
    "travel_summary_agent",
    model_client=get_model_client_NIM(),
    description="一个能够总结旅行计划的智能助手",
    system_message="你是一个能够整合其他助手的所有建议和意见并提供详细最终旅行计划的智能助手。你必须确保最终计划是完整且连贯的。你的最终回复必须是完整的计划。当计划完整且所有观点都已整合后，你可以回复'TERMINATE'。",
)

termination = TextMentionTermination("TERMINATE")
group_chat = RoundRobinGroupChat(
    [planner_agent, local_agent, language_agent, travel_summary_agent], termination_condition=termination
)
await Console(group_chat.run_stream(task="制定一个泰国三日游计划."))
```

