---
layout: single  
title: "🚀端脑云平台DeepSeek R1模型API+AutoGen轻松打造PRD生成智能体工作流"  
sidebar:
  nav: "docs"
date: 2025-06-09 10:00:00 +0800  
categories: AIAgents  
tags: [AUtoGen, DeepSeek, AutoGen, DeepSeek R1, AIAgents, AI智能体]  
classes: wide  

author_profile: true  
---


### 安装autogen

```markdown
pip install -U "autogen-agentchat" "autogen-ext[openai]"

```

### 完整代码

```markdown
import asyncio
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_core.models import ModelFamily
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.ui import Console

async def main():
    # 配置模型客户端
    model_client = OpenAIChatCompletionClient(
        model="DeepSeek-R1",
        base_url="https://cephalon.cloud/user-center/v1/model",
        api_key="你的api",
        model_info={
            "vision": False,
            "function_calling": False,
            "json_output": False,
            "family": ModelFamily.UNKNOWN,
            "structured_output": False,
        },
        timeout=60,
        max_retries=3,
    )

    # 创建三个专业智能体
    prd_writer = AssistantAgent(
        name="prd_writer",
        model_client=model_client,
        system_message="""你是产品需求分析师。根据用户需求生成完整的PRD文档，包括：
- 项目概述和目标
- 功能需求列表
- 技术架构建议
- 用户界面要求
输出专业的markdown格式PRD文档。"""
    )

    task_manager = AssistantAgent(
        name="task_manager",
        model_client=model_client,
        system_message="""你是项目经理。将PRD文档拆解为具体的开发子任务：
- 任务名称和描述
- 预估工作量（人天）
- 优先级（高/中/低）
- 技能要求（前端/后端/全栈等）
- 任务依赖关系
输出结构化的任务列表。"""
    )

    reviewer = AssistantAgent(
        name="reviewer",
        model_client=model_client,
        system_message="""你是质量审核专家。审核PRD文档和任务拆解的完整性、合理性，提供改进建议。
最后输出 'COMPLETE' 表示工作流结束。"""
    )

    # 创建工作流团队
    termination = TextMentionTermination("COMPLETE")
    team = RoundRobinGroupChat([prd_writer, task_manager, reviewer], termination_condition=termination)

    # 用户需求
    user_requirement = input("请输入您的开发需求: ")

    task_prompt = f"""
用户开发需求：{user_requirement}

请按顺序完成：
1. PRD_WRITER: 生成完整PRD文档
2. TASK_MANAGER: 拆解为开发子任务  
3. REVIEWER: 审核并确认完成
"""

    # 运行工作流
    print("🚀 开始生成PRD和拆解任务...")
    await Console(team.run_stream(task=task_prompt))

if __name__ == "__main__":
    asyncio.run(main())
```
