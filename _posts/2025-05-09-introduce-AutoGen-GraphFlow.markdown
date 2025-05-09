---
layout: single
title: "🚀颠覆传统AI智能体！AutoGen革命性创新GraphFlow技术！让AI团队自动协作！5分钟实现实现智能体工作流自动化！AutoGen GraphFlow保姆级实战教程！支持Qwen3与ollama"
sidebar:
  nav: "docs"
date: 2025-05-09 00:00:00 +0800
categories: AIAgents
tags: [AutoGen, GraphFlow, AI智能体 , AI Agents, 工作流, AIAgents, Gemini, Qwen3, 智能体]
classes: wide
author_profile: true
---

在AI智能体领域，微软的AutoGen团队近期推出了一项引人注目的新特性--GraphFlow。这一创新组件为AI多代理系统带来了高度灵活且并发友好的工作流编排能力，极大提升了团队协作的效率和可控性。

**什么是GraphFlow？**

GraphFlow是AutoGen AgentChat API中的一款全新团队类，可以将AI代理的协作流程抽象为有向图。与传统的线性或简单分组聊天不同，GraphFlow允许开发者以图结构精准控制每个代理的任务分发、并行处理和结果汇总过程。这意味着，复杂的团队协作场景，如多轮编辑、意见融合、并行审核等，都可以通过图结构灵活实现。

**核心优势与应用场景**

- 并发执行：GraphFlow支持多个代理同时处理任务，大幅缩短整体流程时间。
- 灵活编排：通过自定义有向图，开发者可以自由设计任务的分支、合并与依赖关系，满足各种复杂协作需求。
- 可视化与可控性：图结构让整体流程一目了然，便于调试和优化。

在实际应用中，GraphFlow非常适合需要多角色协同的场景。例如，内容生成流程可以让“写手”代理先起草文本，然后并行分发给“语法编辑”和“风格编辑”，最后由“终审”代理整合所有修改，输出高质量成品。这种“扇出-汇合”模式不仅提升了效率，也保证了内容的多维度优化。

上手GraphFlow非常简单。开发者只需定义各个代理节点及其职责，通过DiGraphBuilder构建流程图，再用GraphFlow类运行任务即可。

### 🔥AutoGen安装

```python
pip install -U "autogen-agentchat" "autogen-ext[openai]" "autogen-ext[ollama]" "autogen-ext[mcp]" 

export OPENAI_API_KEY=sk-proj-xxx

export GEMINI_API_KEY=sk-proj-xxx
```

### 🔥顺序工作流

```python
# 导入必要的库
import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import DiGraphBuilder, GraphFlow
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.models.ollama import OllamaChatCompletionClient
from autogen_core.models import ModelFamily,ModelInfo

async def main():
    # 创建OpenAI模型客户端
    model_client = OpenAIChatCompletionClient(model="gpt-4.1-nano")

    # 创建Gemini模型客户端
    gemini_client = OpenAIChatCompletionClient(
    model="gemini-2.0-flash-lite",
    model_info=ModelInfo(vision=True, function_calling=True, json_output=True, family="unknown", structured_output=True)
    # api_key="GEMINI_API_KEY",
)
    # 创建ollama模型客户端
    ollama_client = OllamaChatCompletionClient(
        model="qwen3:14b",
        # model="phi4-mini:latest",
        # model="llama3.1",
        model_info = {
            "vision": False,
            "function_calling": True,
            "json_output": True,
            "family": ModelFamily.UNKNOWN, # ModelFamily 需要从 autogen_core.models 导入
            "structured_output": True,
        },
    )

    # 🔥AI超元域频道原创视频
    # 创建代理
    # 翻译器代理 - 负责将文本从英文翻译为中文
    translator = AssistantAgent(
        "translator",
        model_client=ollama_client,
        system_message="你是一位专业的英文到中文翻译专家。你的任务是将用户提供的英文文本准确翻译成中文，保持原文的语气和风格。"
    )

    # 校对者代理 - 负责检查翻译质量并进行修改
    proofreader = AssistantAgent(
        "proofreader",
        model_client=gemini_client,
        system_message="你是一位中文校对专家。你的任务是检查翻译文本的准确性和流畅度，确保没有错误并提出修改建议。"
    )

    # 格式化代理 - 负责最终输出格式的调整
    formatter = AssistantAgent(
        "formatter",
        model_client=model_client,
        system_message="你是一位文档格式专家。你的任务是根据翻译后的文本进行最终格式调整，确保段落分明，标点符号正确，并保持一致的风格。"
    )

    # 构建执行图
    builder = DiGraphBuilder()

    # 添加节点
    builder.add_node(translator).add_node(proofreader).add_node(formatter)

    # 添加边（定义执行顺序）
    builder.add_edge(translator, proofreader)
    builder.add_edge(proofreader, formatter)

    # 构建和验证图
    graph = builder.build()

    # 创建GraphFlow
    flow = GraphFlow(
        participants=builder.get_participants(),
        graph=graph
    )

    # 运行工作流
    result = await flow.run(
        task="Translate the following text to Chinese: 'Artificial intelligence is transforming the way we work and live. It offers new opportunities and challenges that we must navigate carefully.'")

    # 打印结果
    for message in result.messages:
        print(f"{message.source}: {message.content}")

if __name__ == "__main__":
    asyncio.run(main())
```

### 🔥并行工作流

```python
"""
AutoGen v0.5.6 GraphFlow - Parallel Flow with Join 示例

这个示例展示了如何使用AutoGen v0.5.6的GraphFlow功能创建并执行一个包含并行处理和合并节点的工作流。
在这个示例中，我们将创建以下工作流：
1. 一个编写人员(writer)负责起草一个短文段
2. 两个编辑同时工作：一个负责语法(editor_grammar)，一个负责风格(editor_style)
3. 最后一个终审编辑(final_reviewer)将两个编辑的结果进行整合

GraphFlow 是AutoGen v0.5.6新增的一个实验性功能，它允许你通过有向图来控制多个代理之间的工作流程。
"""

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import DiGraphBuilder, GraphFlow
from autogen_ext.models.openai import OpenAIChatCompletionClient

# 🔥AI超元域频道原创视频
# 创建一个OpenAI模型客户端
client = OpenAIChatCompletionClient(model="gpt-4.1-nano")

# 创建写作代理
writer = AssistantAgent(
    name="writer",  # 代理名称
    model_client=client,  # 使用的模型客户端
    system_message="你是一名专业的写作者，请根据用户的要求，起草一个关于指定主题的简短文案。"
)

# 创建语法编辑代理
editor_grammar = AssistantAgent(
    name="editor_grammar",
    model_client=client,
    system_message="你是一名语法专家，负责检查文本的语法错误，并提供修正建议。只关注语法方面，不要改变内容和风格。"
)

# 创建风格编辑代理
editor_style = AssistantAgent(
    name="editor_style",
    model_client=client,
    system_message="你是一名文体风格专家，负责优化文本的表达方式、词语选择和整体风格。不要关注语法问题，专注于让文本更加生动有力。"
)

# 创建终审编辑代理
final_reviewer = AssistantAgent(
    name="final_reviewer",
    model_client=client,
    system_message="你是终审编辑，负责将语法编辑和风格编辑的结果整合，制作最终版本。综合考虑语法正确性和表达效果。"
)

# 构建工作流图
# DiGraphBuilder 是一个流畅的API，用于构建有向图
builder = DiGraphBuilder()

# 添加所有节点
builder.add_node(writer).add_node(editor_grammar).add_node(editor_style).add_node(final_reviewer)

# 添加从writer到两个编辑的边（并行展开）
builder.add_edge(writer, editor_grammar)  # writer完成后，editor_grammar开始工作
builder.add_edge(writer, editor_style)  # writer完成后，editor_style也开始工作

# 添加从两个编辑到终审编辑的边（合并节点）
builder.add_edge(editor_grammar, final_reviewer)  # editor_grammar完成后，结果传递给final_reviewer
builder.add_edge(editor_style, final_reviewer)  # editor_style完成后，结果也传递给final_reviewer

# 构建并验证图
graph = builder.build()

# 创建GraphFlow实例
# participants参数指定参与工作流的所有代理
# graph参数指定工作流的执行图
flow = GraphFlow(
    participants=builder.get_participants(),  # 自动获取图中的所有参与者
    graph=graph,  # 指定执行图
)

# 异步运行工作流
import asyncio

async def main():
    # 运行工作流并获取流式输出
    # run_stream方法会返回一个可以异步迭代的事件流
    stream = flow.run_stream(task="请写一段关于人工智能发展历史的短文。")

    # 显示每个步骤的输出
    async for event in stream:
        # 检查event是否是TaskResult对象（最终结果）
        if hasattr(event, 'source'):
            # 如果是消息对象，直接打印source和content
            print(f"========== {event.source} ==========")
            print(event.content)
            print("\n")
        else:
            # 如果是TaskResult对象，打印结果信息
            print("========== 任务完成 ==========")
            print(f"停止原因: {event.stop_reason}")
            print(f"消息数量: {len(event.messages)}")
            print("\n")

# 在脚本中运行时，使用asyncio.run()执行主函数
if __name__ == "__main__":
    asyncio.run(main())

"""
图的执行过程说明：
1. 用户发送任务请求
2. writer代理首先执行，生成初始文段
3. writer完成后，editor_grammar和editor_style同时开始工作（并行执行）
4. 当两个编辑都完成工作后，final_reviewer开始整合他们的修改
5. final_reviewer完成后，工作流结束，返回最终结果

GraphFlow的主要优势:
- 精确控制代理之间的执行顺序
- 支持并行执行多个代理
- 支持条件分支和循环
- 可以过滤每个代理接收的消息，优化上下文管理
"""
```

### 🔥旅行规划智能体

```bash
from autogen_agentchat.agents import AssistantAgent, MessageFilterAgent, MessageFilterConfig, PerSourceFilter
from autogen_agentchat.teams import DiGraphBuilder, GraphFlow
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient
import asyncio

# 创建模型客户端
model_client = OpenAIChatCompletionClient(model="gpt-4.1-nano")

# 定义各个专业智能体
# 规划师智能体 - 负责初步旅行计划制定
planner_agent = AssistantAgent(
    "planner_agent",
    model_client=model_client,
    description="一个能够规划旅行的助手。",
    system_message="你是一个帮助用户根据其需求规划旅行计划的助手。提供详细的行程安排、景点建议和时间规划。你的工作是创建基础旅行框架。",
)

# 当地专家智能体 - 提供当地活动和景点建议
local_agent = AssistantAgent(
    "local_agent",
    model_client=model_client,
    description="一个能够推荐当地活动或景点的助手。",
    system_message="你是一个能够为用户推荐真实有趣的当地活动或景点的助手。基于规划师提供的基础框架，补充更多当地特色体验、美食和文化活动的详细信息。注重提供当地特色和独特体验。",
)

# 语言专家智能体 - 提供语言和沟通技巧
language_agent = AssistantAgent(
    "language_agent",
    model_client=model_client,
    description="一个能够为特定目的地提供语言技巧的助手。",
    system_message="你是一个能够提供目的地语言和沟通技巧的助手。基于规划师提供的基础框架，添加有关当地语言、常用短语、沟通礼仪和文化差异的建议，帮助旅行者更好地与当地人交流。",
)

# 总结智能体 - 整合各方建议并生成最终计划
travel_summary_agent = AssistantAgent(
    "travel_summary_agent",
    model_client=model_client,
    description="一个能够总结旅行计划的助手。",
    system_message="""你是一个专门整合最终旅行计划的助手。你的任务是：
1. 查看规划师提供的基础行程框架
2. 融合当地专家提供的特色活动和体验建议
3. 纳入语言专家的语言和沟通技巧

你必须创建一个全面而连贯的最终旅行计划，包括：
- 每日行程安排，包含时间、地点和活动
- 特色体验和美食推荐
- 必要的语言和沟通技巧
- 实用的旅行建议

你的输出格式应为：
- 开头：简短介绍
- 中间：按天详细行程（第一天、第二天、第三天）
- 结尾：旅行贴士，包含语言沟通建议

请确保最终计划综合了所有其他智能体的建议，并且格式清晰、内容完整。
当计划完成，在最后一行单独添加'TERMINATE'作为标记。""",
)

# 使用MessageFilterAgent对每个智能体进行包装以控制消息流
# 当地专家只看到用户请求和规划师的最后一条消息
filtered_local_agent = MessageFilterAgent(
    name="local_agent",
    wrapped_agent=local_agent,
    filter=MessageFilterConfig(
        per_source=[
            PerSourceFilter(source="user", position="first", count=1),
            PerSourceFilter(source="planner_agent", position="last", count=1),
        ]
    ),
)

# 语言专家只看到用户请求和规划师的最后一条消息
filtered_language_agent = MessageFilterAgent(
    name="language_agent",
    wrapped_agent=language_agent,
    filter=MessageFilterConfig(
        per_source=[
            PerSourceFilter(source="user", position="first", count=1),
            PerSourceFilter(source="planner_agent", position="last", count=1),
        ]
    ),
)

# 总结智能体需要看到用户的第一条消息、规划师的最后一条消息、当地专家的最后一条消息和语言专家的最后一条消息
# 这里使用明确的名称并确保配置正确
filtered_summary_agent = MessageFilterAgent(
    name="travel_summary_agent",
    wrapped_agent=travel_summary_agent,
    filter=MessageFilterConfig(
        per_source=[
            PerSourceFilter(source="user", position="first", count=1),
            PerSourceFilter(source="planner_agent", position="last", count=1),
            PerSourceFilter(source="local_agent", position="last", count=1),
            PerSourceFilter(source="language_agent", position="last", count=1),
        ],
        default="exclude"  # 明确默认排除其他消息
    ),
)

# 使用DiGraphBuilder构建混合工作流图
builder = DiGraphBuilder()

# 添加所有节点
builder.add_node(planner_agent).add_node(filtered_local_agent).add_node(filtered_language_agent).add_node(filtered_summary_agent)

# 构建执行流程
# 1. 用户请求首先传递给规划师创建基础框架
# 2. 规划师完成后，同时传递给当地专家和语言专家（并行处理）
# 3. 当地专家和语言专家都完成后，各自的结果传递给总结智能体
# 这创建了一个混合顺序+并行的工作流
builder.add_edge(planner_agent, filtered_local_agent)
builder.add_edge(planner_agent, filtered_language_agent)
builder.add_edge(filtered_local_agent, filtered_summary_agent)
builder.add_edge(filtered_language_agent, filtered_summary_agent)

# 构建并验证图
graph = builder.build()

# 创建GraphFlow团队
flow = GraphFlow(
    participants=builder.get_participants(),
    graph=graph,
)

# 运行工作流并格式化输出
async def main():
    # 运行工作流并以友好格式在控制台显示结果
    await Console(flow.run_stream(task="为我规划一个3天的尼泊尔之旅。"))

    # 关闭模型客户端
    await model_client.close()

if __name__ == "__main__":
    asyncio.run(main())
```

