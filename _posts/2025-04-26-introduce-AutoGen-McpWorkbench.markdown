---
layout: single  
title: "🚀AutoGen重大更新！新增McpWorkbench完美支持MCP Server！支持将Agent和Team封装为工具！开启模块化智能体编程！实战教程：从零开始构建旅游规划智能体和进销存智能客服系统"  
sidebar:
  nav: "docs"
date: 2025-04-26 10:00:00 +0800  
categories: AIAgents  
tags: [MCP, MCP Server, AutoGen, McpWorkbench, AIAgents, AI智能体]  
classes: wide  

author_profile: true  
---

在AutoGen框架中，"Agent and Team as Tools"是一项创新功能，它允许将现有的智能体(Agent)和团队(Team)作为工具供其他智能体调用。根据我搜索到的信息，这一功能具有显著的优势和应用场景。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1BFLozCEHx/)
- [👉👉👉 通过YouTube观看](https://youtu.be/1ZxzPpa5Ysc)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  


## 创新优势

### 1. 模块化和可重用性

AutoGen v0.4采用了模块化和可扩展的设计，让用户能够通过可插拔组件轻松定制系统，包括自定义智能体、工具、记忆和模型。 当智能体或团队被作为工具使用时，这种模块化设计发挥了重要作用，使开发者能够：

- 构建更复杂的智能体架构，其中专业化的智能体可以作为工具被其他智能体调用
- 重用已经训练好的智能体和团队，避免重复工作
- 创建层次化的智能体结构，实现功能的封装和抽象

### 2. 功能封装和专业化

通过将Agent或Team作为工具，开发者可以：

- 将复杂的多步骤任务封装为单个工具调用
- 创建专注于特定领域任务的"专家"智能体，作为工具被其他智能体调用
- 隐藏复杂的实现细节，提供简单明确的接口

### 3. 扩展性和灵活性

AutoGen的设计支持可扩展和分布式的智能体网络，这些网络可以无缝地跨组织边界运行。 "Agent and Team as Tools"功能增强了这种扩展性：

- 允许智能体通过调用其他智能体作为工具来访问新功能
- 支持动态工作流程，智能体可以根据任务需求动态选择和调用其他智能体
- 促进了分布式系统的构建，其中不同的智能体可能运行在不同的环境或服务器上

### 4. 内部处理与抽象

在某些情况下，将工具使用隐藏在单个智能体内部是可取的，即工具调用和工具响应消息对智能体外部保持不可见，智能体以"内部独白"的形式向外部响应。 这一特性使得：

- 智能体可以在内部使用其他智能体作为工具，但外部只看到最终结果
- 创建类似OpenAI Assistant的智能体，它在内部执行内置工具
- 减少通信开销，提高效率

## 使用场景

### 1. 复杂任务分解与解决

当面对复杂任务时，"Agent and Team as Tools"功能允许：

- 创建专门的问题解决团队，作为工具被调用
- 将大型任务分解为子任务，并由专业智能体处理
- 结合不同专业领域的智能体协作解决跨领域问题

### 2. 工作流自动化

AutoGen Studio允许用户从预定义智能体库中选择并将它们组合成团队(工作流)，能够在几分钟内解决任务。用户可以使用基础模型、提示、技能(特定任务的Python函数)和工作流自定义智能体和智能体团队。 这种方法支持：

- 创建可重用的工作流程，作为工具在更大的系统中调用
- 开发业务流程自动化解决方案
- 构建能够处理日常任务的自动化助手

### 3. 多样化能力组合

通过将不同能力的Agent组合作为工具：

- 开发能够访问Web、执行代码和处理文件的综合智能体
- 构建具有多模态交互能力的系统
- 创建能够结合不同大语言模型优势的解决方案

### 4. 研究与实验

AutoGen提供了一个用于构建可扩展多智能体AI系统的事件驱动编程框架，适用于多智能体协作研究和分布式多语言应用程序的智能体。 这对研究人员来说特别有价值，可以：

- 实验不同的智能体架构和交互模式
- 研究智能体协作和决策过程
- 开发和测试新型智能体系统

## 实际应用示例

1. **代码开发辅助系统**：一个主智能体可以根据需要调用专门的代码生成团队、测试团队和优化团队作为工具。
2. **市场研究自动化**：开发者可以利用具有Web浏览能力的智能体团队或使用Web搜索API工具的智能体来解决任务。
3. **个人助理系统**：主助理可以根据用户请求调用不同的专家智能体，如旅行规划者、文档生成器或数据分析师。
4. **教育和培训应用**：可以设计具有不同教学方法和专业知识的多个智能体，根据学习者的需求作为工具被调用。

通过"Agent and Team as Tools"功能，AutoGen提供了一个强大而灵活的框架，使开发者能够构建复杂、可扩展且高效的多智能体系统，这些系统可以适应各种应用场景和需求。

### AutoGen中的Workbench功能详解

AutoGen中的`Workbench`（特别是`McpWorkbench`）是一个创新且强大的功能，它大大增强了AI智能体与外部工具和数据源的交互能力。以下是对其创新优势、作用和使用场景的详细解析。

## 一、创新优势

### 1. 统一工具管理与会话共享

在AutoGen框架中，`Workbench`作为工具集合的抽象，其最大的创新优势在于提供了统一的工具管理机制。单个自定义工具可以是Python函数或BaseTool的子类，而Workbench则是共享状态和资源的工具集合。 这种设计允许多个工具共享同一个会话或连接，大大提高了效率。

### 2. 标准化的接口协议

`McpWorkbench`特别地实现了对Model Context Protocol (MCP)的支持，这是一个开放标准，MCP是一个客户端-服务器架构，它在AI智能体（宿主）和各种服务（如Git、Slack、Drive和API）之间创建了标准化接口。 通过这种标准化接口，不同来源的工具可以被统一地访问和使用。

### 3. 高度抽象和简化

`McpWorkbench`极大地简化了与外部工具和服务的集成过程。将MCP工具与AutoGen集成非常简单直接。关键组件是`mcp_server_tools`函数，它在智能体和MCP服务器之间架起了桥梁。 这种抽象使开发者能够在几行代码内完成原本可能需要大量自定义代码的集成工作。

### 4. 资源生命周期管理

`McpWorkbench`支持上下文管理协议（使用`async with`语法），这意味着它能够自动管理资源的生命周期。创建一个MCP workbench，它为mcp服务器提供会话。 这有助于确保连接在不再需要时被正确关闭，避免资源泄漏。

### 5. 跨模型兼容性

`McpWorkbench`的一个重要优势是它能够与任何支持工具调用的大型语言模型一起工作，不仅限于特定供应商的模型。AutoGen支持将MCP服务器包装为工具，供任何智能体使用，包括OpenAI、Anthropic以及本地模型如Ollama、LMStudio。 这提供了极大的灵活性和互操作性。

## 二、主要作用

### 1. 工具集成与管理

`McpWorkbench`的主要作用是简化AI智能体对外部工具和服务的访问。它负责：

- 管理与MCP服务器的连接
- 发现可用的工具
- 提供工具的元数据和功能描述
- 将工具调用转发到适当的服务器
- 处理工具调用的结果并返回给智能体

### 2. 会话管理

`McpWorkbench`负责管理与MCP服务器的会话，包括：

- 创建和维护连接
- 处理身份验证和授权
- 确保会话的正确关闭
- 支持会话重用，提高效率

### 3. 工具状态共享

作为工具集合，`McpWorkbench`允许多个工具共享状态和资源，例如：

- 共享连接和会话
- 共享身份验证令牌
- 共享配置参数
- 在工具之间传递上下文

### 4. 异步操作

`McpWorkbench`支持异步操作，这使得它能够高效地处理可能需要时间的工具调用，而不会阻塞主线程。这对于需要网络请求或其他I/O操作的工具尤为重要。

## 三、使用场景

### 1. 网页内容获取与分析

`McpWorkbench`可用于创建能够获取和分析网页内容的智能体。让智能体获取URL的内容并总结它。 这对于信息聚合、研究和内容总结非常有用。

### 2. 文件系统操作

通过连接到文件系统MCP服务器，`McpWorkbench`可以让智能体进行文件和目录操作：

- 读取和写入文件
- 创建和删除目录
- 列出文件和目录内容
- 重命名和移动文件

这在文档管理、代码生成和数据处理场景中非常有用。

### 3. 企业系统集成

`McpWorkbench`为智能体提供了连接企业系统的能力，如：

- 电子邮件系统
- 文档管理系统
- 客户关系管理(CRM)系统
- 项目管理工具
- 协作平台（如Slack、Microsoft Teams）

这使得智能体可以自动化工作流程并减少重复性任务。

### 4. 数据库访问

智能体可以通过`McpWorkbench`访问各种数据库，执行操作如：

- 查询数据
- 插入和更新记录
- 分析数据库内容
- 生成报告

这对于数据分析、报告生成和数据探索场景尤为有用。

### 5. 专业化搜索和信息检索

`McpWorkbench`可以连接到特定领域的搜索引擎和信息源，使智能体能够：

- 执行专业化搜索
- 过滤和排序结果
- 提取和整合来自多个来源的信息
- 根据特定标准分析信息

这在市场研究、学术研究和专家系统中特别有价值。

### 6. API访问和集成

`McpWorkbench`简化了智能体对各种API的访问，包括：

- 社交媒体API
- 支付处理API
- 地图和地理定位服务
- 天气和气候数据
- 金融市场数据

这使得智能体可以创建丰富的、数据驱动的应用程序。

### 🔥AutoGen环境配置

```bash
python3 -m venv .venv

source .venv/bin/activate

pip install -U "autogen-agentchat" "autogen-ext[openai]" "autogen-ext[ollama]"

export OPENAI_API_KEY="sk-proj-xxxxxx"

pip install mcp-server-fetch

pip install mcp-server-sqlite
```

### 🔥代码

### 最简单的示例

```bash
import asyncio
import os
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

async def main() -> None:
    # 定义模型客户端
    # API密钥预期在环境变量OPENAI_API_KEY中
    model_client = OpenAIChatCompletionClient(
        model="gpt-4o-mini",
        # API密钥将从OPENAI_API_KEY环境变量中自动加载
    )

    # 创建一个助手代理
    agent = AssistantAgent(
        name="assistant",
        model_client=model_client,
        system_message="你是一个乐于助人的助手。"
    )

    # 让代理执行一个简单的任务
    response = await agent.run(task="用python实现斐波那契数列")
    print(response)

    # 关闭与模型客户端的连接
    await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())
```

### 🔥旅行计划制定的agent代码

```bash
import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.tools import AgentTool
from autogen_core import CancellationToken

async def main() -> None:
    """
    旅游规划系统，使用工具化的专家代理实现
    
    本脚本使用autogen_agentchat.tools将专家代理实现为工具:
    1. 旅行规划专家 - 提供整体旅行计划
    2. 当地活动专家 - 提供当地特色活动和地点建议
    3. 语言沟通专家 - 提供目的地语言和沟通技巧
    
    这些专家工具由一个总结代理协调，生成最终的旅行计划
    """
    # 创建OpenAI模型客户端
    model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")
    
    try:
        # 创建专家代理
        # 1. 旅行规划专家
        planner_agent = AssistantAgent(
            name="planner_agent",
            model_client=model_client,
            description="旅行规划专家，可以根据用户需求制定旅行计划。",
            system_message="""你是一位专业的旅行规划专家，能够根据用户的需求提供详细的旅行计划建议。
你的职责是：
1. 分析用户的旅行目的地和时间安排
2. 提供合理的行程安排，包括景点、住宿和交通方案
3. 考虑季节性因素和当地特色
4. 提供预算建议

请提供专业、详细且实用的旅行计划建议。"""
        )
        
        # 2. 当地活动专家
        local_agent = AssistantAgent(
            name="local_agent",
            model_client=model_client,
            description="当地活动专家，可以推荐特色活动和地点。",
            system_message="""你是一位当地活动和景点专家，精通世界各地的特色体验和隐藏景点。
你的职责是：
1. 推荐目的地的特色活动和体验
2. 提供非旅游路线上的隐藏景点
3. 推荐当地美食和文化体验
4. 提供与当地人互动的机会

请提供真实、有趣且独特的当地体验建议，帮助旅行者深入了解目的地文化。"""
        )
        
        # 3. 语言沟通专家
        language_agent = AssistantAgent(
            name="language_agent",
            model_client=model_client,
            description="语言沟通专家，提供目的地语言和沟通技巧。",
            system_message="""你是一位语言和沟通专家，精通世界各地的语言和文化差异。
你的职责是：
1. 提供目的地的语言基本信息
2. 教授实用的当地语言短语和表达
3. 解释文化差异和沟通禁忌
4. 提供语言障碍的解决方案

请提供实用、准确的语言和沟通建议，帮助旅行者顺利与当地人交流。"""
        )
        
        # 将专家代理转换为工具
        planner_tool = AgentTool(agent=planner_agent)
        local_tool = AgentTool(agent=local_agent)
        language_tool = AgentTool(agent=language_agent)
        
        # 创建旅行总结代理，使用上述三个专家工具
        travel_summary_agent = AssistantAgent(
            name="travel_summary_agent",
            model_client=model_client,
            description="旅行总结专家，整合各方面建议生成完整旅行计划。",
            system_message="""你是一位旅行总结专家，负责整合各专家的建议，创建全面的旅行计划。
你可以使用以下工具获取专业建议：
1. planner_tool - 获取详细的旅行计划建议
2. local_tool - 获取当地特色活动和景点建议
3. language_tool - 获取语言和沟通技巧建议

你的职责是：
1. 理解用户的旅行需求
2. 咨询各专家获取专业建议
3. 整合所有建议，创建一个连贯、全面的旅行计划
4. 确保计划包含行程安排、特色活动和语言技巧

你的最终回复必须是一个完整的旅行计划。当计划完成并整合了所有专家建议后，请以"计划已完成"结束。""",

            tools=[planner_tool, local_tool, language_tool],
        )
        
        # 运行旅行规划系统
        print("启动旅行规划系统...\n")
        
        # 用户查询示例
        travel_query = "请为我规划一个去尼泊尔的3天旅行计划，包括必去景点、当地特色活动和语言沟通技巧。"
        print(f"用户查询: {travel_query}\n")

        # 🔥 AI超元域平台原创视频
        # 使用旅行总结代理处理查询
        await Console(travel_summary_agent.run_stream(
            task=travel_query, 
            cancellation_token=CancellationToken()
        ))
        
    finally:
        # 关闭模型客户端
        await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())

```

### 🔥文章抓取并改写博客的agent代码

```bash
import asyncio
import json
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import McpWorkbench, StdioServerParams

async def main() -> None:
    """
    实现两个agent轮询交互的脚本:
    1. 研究员agent使用workbench调用MCP fetch服务器获取URL内容
    2. 作家agent将内容改写为科技资讯风格的博客文章
    """
    # 🔥 AI超元域平台原创视频
    # 创建MCP服务器参数
    server_params = StdioServerParams(
        command="python",
        args=["-m", "mcp_server_fetch"],
        read_timeout_seconds=60,
    )

    # 🔥 AI超元域平台原创视频
    # 创建OpenAI模型客户端
    model_client = OpenAIChatCompletionClient(
        model="gpt-4o-mini",  # 使用功能更强大的模型以获得更好的结果
        # API密钥将从环境变量OPENAI_API_KEY自动加载
    )

    try:
        print("启动MCP Workbench与fetch服务器...")
        # 使用异步上下文管理器管理McpWorkbench的生命周期
        async with McpWorkbench(server_params=server_params) as workbench:
            # 定义使用MCP fetch工具获取网页内容的函数
            async def fetch_web_content(url: str, max_length: int = 5000) -> str:
                """使用MCP fetch工具获取URL内容"""
                print(f"获取URL内容: {url}")
                result = await workbench.call_tool(
                    "fetch", 
                    {
                        "url": url,
                        "max_length": max_length,
                        "start_index": 0,
                    }
                )
                return str(result.result)

            # 创建研究员agent，负责获取和分析网页内容
            researcher = AssistantAgent(
                name="Researcher",  
                system_message="""你是一位网络研究员，负责获取和分析网页内容。
你的任务是使用fetch_web_content工具获取指定URL的内容，然后对内容进行初步分析和整理。
提取最重要的信息，并将其组织成结构化的形式，以便作家可以将其改写为博客文章。
确保包含所有关键信息，如技术细节、特点、优势等。

当你完成分析后，请将结果提供给科技作家，让他将其改写为科技资讯风格的博客文章。""",
                model_client=model_client,
                tools=[fetch_web_content],
            )

            # 创建作家agent，负责将内容改写为科技资讯风格的博客文章
            writer = AssistantAgent(
                name="TechWriter",  
                system_message="""你是一位专业的科技博客作家，擅长将技术内容转化为引人入胜的科技资讯文章。
你的任务是将研究员提供的内容改写为一篇科技资讯风格的博客文章。
文章应该具有以下特点：
1. 引人入胜的标题和开头，吸引读者注意
2. 清晰的结构和流畅的叙述
3. 技术内容准确但表达通俗易懂
4. 突出技术的创新点和实际应用价值
5. 适当使用小标题、列表等格式增强可读性
6. 结尾部分提供前景展望或总结观点

保持专业但不晦涩，确保非技术读者也能理解文章的主要内容。

当你完成博客文章后，请说"TERMINATE"以结束对话。""",
                model_client=model_client,
            )

            # 创建终止条件
            termination = TextMentionTermination("TERMINATE")

            # 创建RoundRobinGroupChat团队
            team = RoundRobinGroupChat(
                participants=[researcher, writer],
                termination_condition=termination,
            )

            # 🔥 AI超元域平台原创视频
            # 启动对话
            url = "https://www.aivi.fyi/llms/deploy-InternVL3"
            initial_task = f"""请Researcher获取并分析这个URL的内容: {url}，然后TechWriter将其改写为一篇科技资讯风格的博客文章。"""
            
            print("\n开始代理之间的对话...")
            # 使用Console UI显示对话过程
            await Console(team.run_stream(task=initial_task))
    
    finally:
        # 关闭模型客户端资源
        await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())

```

### 🔥进销存智能客服系统agent代码

```bash
import asyncio
import json
import os
import sqlite3
from autogen_agentchat.agents import AssistantAgent, UserProxyAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import McpWorkbench, StdioServerParams
from autogen_core import CancellationToken

# 首先，让我们直接检查数据库内容，确保数据已正确生成
def check_database(db_path):
    """检查数据库内容，确保数据已正确生成"""
    if not os.path.exists(db_path):
        return False, "数据库文件不存在"
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # 检查表是否存在
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        table_names = [table[0] for table in tables]
        required_tables = ['products', 'inventory', 'orders', 'order_items', 'customers', 'shipping']
        
        for table in required_tables:
            if table not in table_names:
                return False, f"缺少表: {table}"
        
        # 检查数据是否存在
        data_counts = {}
        for table in required_tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            data_counts[table] = count
            if count == 0:
                return False, f"表 {table} 中没有数据"
        
        conn.close()
        return True, f"数据库检查通过，数据统计: {data_counts}"
    
    except Exception as e:
        return False, f"数据库检查失败: {str(e)}"

async def main() -> None:
    """
     🔥 AI超元域平台原创视频
    智能客服系统，使用AutoGen和SQLite MCP Server查询进销存数据库
    功能：
    1. 查询订单状态、库存、物流信息等
    2. 回答客户问题
    
    注意：此脚本假设数据库已经存在，请先运行generate_inventory_data.py创建数据库
    """
    # 数据库文件路径
    db_path = os.path.join(os.getcwd(), "inventory.db")
    
    # 检查数据库是否存在和内容是否正确
    db_ok, db_message = check_database(db_path)
    if not db_ok:
        print(f"错误：{db_message}")
        print("请先运行 python generate_inventory_data.py 创建数据库和示例数据。")
        return
    else:
        print(f"数据库检查: {db_message}")
    
    # 创建MCP服务器参数 - 使用SQLite MCP Server
    # 使用正确的命令来启动SQLite MCP Server
    sqlite_server_params = StdioServerParams(
        command="/Users/charlesqin/Desktop/test-autogen/.venv/bin/mcp-server-sqlite",
        args=["--db-path", db_path],
        read_timeout_seconds=60,
    )
    # 🔥 AI超元域平台原创视频
    # 创建OpenAI模型客户端
    model_client = OpenAIChatCompletionClient(
        model="gpt-4o-mini",  # 使用功能更强大的模型以获得更好的结果
        # API密钥将从环境变量OPENAI_API_KEY自动加载
    )

    try:
        print(f"启动SQLite MCP Server... (数据库路径: {db_path})")
        
        # 使用McpWorkbench来与MCP服务器交互
        async with McpWorkbench(server_params=sqlite_server_params) as workbench:
            # 列出可用的工具
            tools = await workbench.list_tools()
            tool_names = [tool["name"] for tool in tools]
            print(f"已加载SQLite MCP工具: {json.dumps(tool_names, indent=2, ensure_ascii=False)}")
            
            # 创建数据库查询代理，负责数据库操作
            db_agent = AssistantAgent(
                name="DBAgent",
                system_message="""你是一位数据库查询专家，负责查询进销存系统的SQLite数据库。
你的任务是根据客服代表的请求，查询并提供准确的数据库信息。

数据库包含以下表：
1. products(id, name, description, price, category) - 产品信息
2. inventory(product_id, quantity, warehouse_id, last_updated) - 库存信息
3. orders(id, customer_id, order_date, status, total_amount) - 订单信息
4. order_items(order_id, product_id, quantity, unit_price) - 订单项信息
5. customers(id, name, email, phone, address) - 客户信息
6. shipping(id, order_id, carrier, tracking_number, status, estimated_delivery) - 物流信息

请使用SQL查询语言查询数据，并以清晰、专业的方式提供结果。
重要：不要主动发起对话，只回答客服代表的具体查询请求。
如果客服代表请求查询订单状态，你应该查询orders表和shipping表。
如果客服代表请求查询产品库存，你应该查询products表和inventory表。""",
                model_client=model_client,
                workbench=workbench,  # 使用workbench而不是tools
            )
            
            # 创建客服代理，负责回答客户问题
            customer_service = AssistantAgent(
                name="CustomerService",
                system_message="""你是一位专业的客服代表，负责回答客户关于订单、产品和物流的问题。
你的任务是：
1. 理解客户的问题
2. 向数据库代理请求相关信息（提供明确的SQL查询需求）
3. 以友好、专业的方式回答客户问题
4. 提供有用的建议和解决方案

当系统启动时，你应该简短地介绍自己和系统功能，然后等待客户的问题。
不要与数据库代理进行无意义的对话，只有在需要查询数据时才向其发送请求。

例如，如果客户询问订单状态，你应该请求DBAgent查询相关订单信息，例如：
"请查询订单#3的状态和物流信息，使用SQL: SELECT o.id, o.status, s.carrier, s.tracking_number, s.estimated_delivery FROM orders o JOIN shipping s ON o.id = s.order_id WHERE o.id = 3"

你应该使用清晰、礼貌的语言，并确保提供准确的信息。如果你不知道答案，应该诚实地承认并承诺进一步调查。
当完成对话时，请说"CONVERSATION_COMPLETE"。""",
                model_client=model_client,
            )
            
            # 创建终止条件
            termination = TextMentionTermination("CONVERSATION_COMPLETE")
    
            # 创建RoundRobinGroupChat团队
            team = RoundRobinGroupChat(
                participants=[customer_service, db_agent],
                termination_condition=termination,
            )
            # 🔥 AI超元域平台原创视频
            # 测试查询
            print("\n开始测试智能客服系统...")
            
            # 客户查询示例
            customer_queries = [
                # "我想查询一下订单#3的状态和预计送达时间",
                "我需要知道你们有哪些类别的产品，以及每个类别的库存情况",
                # "我的订单#2显示已发货，但我还没收到，能帮我查一下物流信息吗？",
                # "我想修改我的订单#4，能帮我取消吗？",
                # "你们的库存中哪些产品数量不足5件了？"
            ]
            
            # 只运行一个查询示例进行测试
            query = customer_queries[0]
            print(f"\n--- 测试查询 ---\n{query}")
            
            # 直接运行团队对话，使用客户查询作为初始任务
            await Console(team.run_stream(task=query, cancellation_token=CancellationToken()))
    
    finally:
        # 关闭模型客户端资源
        await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())

```