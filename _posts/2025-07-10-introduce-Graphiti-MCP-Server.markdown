---
layout: single
title: "🚀当Cursor和Claude code拥有了记忆！编程能力倍增！Graphiti MCP Server让AI编程助手实现持久超强记忆！时序感知知识图谱让AI实时学习！支持neo4j"
sidebar:
  nav: "docs"
date: 2025-07-10 00:00:00 +0800
categories: AIAgents
tags: [Graphiti, Claude, Claude Code, Cursor, Claude4, AI智能体, AI编程, Vibe Coding, MCP Server, Puppeteer, Context7]
classes: wide
author_profile: true
---


Graphiti 的 MCP Server 是一个实验性的 Model Context Protocol 服务，旨在为支持 MCP 协议的 AI 助手（如 Claude Desktop、Cursor 等）提供结构化的知识图谱接口。它能够将用户的自然语言输入、消息和 JSON 数据存储为“episode”，自动抽取其中的实体及其关系，并构建时序知识图，实现 AI 的长期记忆与推理能力。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1z5G5zpEfo/)
- [👉👉👉 通过YouTube观看](https://youtu.be/oQmJR7G0QlU)
- [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
- [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
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
6. [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  


该服务支持 episode 的添加、查询与删除，提供实体和关系的搜索功能，支持通过语义或关键词进行节点和事实的高效检索，还可以通过 group\_id 实现多用户或多项目的数据隔离。系统还支持清空图谱和重建索引，便于知识更新。

使用者只需配置 Python 环境、Neo4j 图数据库和 API 密钥，即可运行该服务。它可通过 SSE、标准输入或 Docker Compose 启动，并能被 AI 客户端调用各类图谱工具，如添加交互记录、搜索节点与关系等，是构建具备上下文感知能力的 AI 系统的重要基础模块。

### 核心概念

Graphiti 是一个**时间感知知识图谱框架**，与传统的 RAG (检索增强生成) 不同，它能够：

- 持续集成用户交互、结构化和非结构化数据
- 支持增量数据更新
- 进行精确的历史查询
- 无需完全重新计算图谱

## 🛠️ Graphiti-Memory 提供的 MCP 工具

### 1. **Resources (资源工具)**

**功能**: 从内部或外部数据库检索信息

- 返回数据但不执行可操作的计算
- 用于访问存储在知识图谱中的历史信息
- 支持时间感知的查询

### 2. **Tools (工具)**

**功能**: 与可以产生副作用的工具进行信息交换

- 执行计算或通过 API 请求获取数据
- 可以向知识图谱添加新的实体和关系
- 支持实时数据更新

### 3. **Prompts (提示模板)**

**功能**: 用于 LLM-服务器通信的可重用模板和工作流

- 预定义的查询模板
- 标准化的交互模式

## 🏗️ Graphiti-Memory 的自定义实体类型

### Cursor IDE 集成示例

```python
class Requirement(BaseModel):
    """需求实体 - 代表产品或服务必须满足的特定需要、功能或功能"""

    project_name: str = Field(
        ...,
        description='需求所属项目的名称',
    )
    description: str = Field(
        ...,
        description='需求的描述，仅使用上下文中提到的信息',
    )

```

### 其他常见实体类型

- **Preference** (偏好): 用户的编程偏好和标准
- **Procedure** (程序): 编码标准和工作流程
- **Project** (项目): 项目信息和规格
- **Memory** (记忆): 历史交互和学习内容

## 🔧 主要功能特性

### 1. **增量集成**

- 实时添加和更新实体
- 自动建立实体间的关系
- 保持时间戳和版本信息

### 2. **智能检索**

- 在执行操作前查询相关记忆
- 基于上下文的智能推荐
- 跨会话持久化记忆

### 3. **结构化存储**

```json
{
  "action": "add_entity",
  "entity_type": "Requirement",
  "data": {
    "project_name": "Web应用",
    "description": "用户界面必须支持响应式设计"
  }
}

```

## 📋 使用场景

### 在 Cursor IDE 中的应用

1. **配置集成**: Cursor IDE 作为 MCP 客户端连接到 Graphiti MCP 服务器
2. **自定义实体**: 定义项目需求、偏好和程序等实体
3. **实时更新**: 代理自动添加和更新知识图谱中的实体
4. **检索前操作**: 在执行操作前查询存储的偏好和需求

### 实际工作流

```
用户输入 → Cursor代理 → 查询Graphiti → 检索相关记忆 → 执行任务 → 更新知识图谱

```

## 🌟 与传统记忆系统的区别

| 特性 | 传统 RAG | Graphiti-Memory |
| --- | --- | --- |
| 数据集成 | 静态向量化 | 动态知识图谱 |
| 时间感知 | 无 | 支持时间序列 |
| 关系建模 | 有限 | 丰富的实体关系 |
| 增量更新 | 需要重新计算 | 实时增量更新 |

### 🚀Neo4j

[http://localhost:7474/browser/preview/](http://localhost:7474/browser/preview/)

### 🚀部署

- **Python**: 3.10 或更高版本
- **Docker**: 最新版本
- **Docker Compose**: 最新版本
- **Neo4j**: 5.26 或更高版本
- **uv**: Python包管理器（推荐）

```bash

# 安装uv（推荐）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 或使用pip
pip install uv

git clone https://github.com/getzep/graphiti.git

cd graphiti/mcp_server

uv sync

cp .env.example .env

# 配置Neo4j
## 下载
https://neo4j.com/download/

# Instance name
graphiti-db

# Database user
neo4j

# Password
graphiti123!

# 使用pwd命令查看当前路径
pwd

# 使用which uv命令查看uv所在路径
which uv
```

### 🚀MCP Server配置文件

```bash
{
  "mcpServers": {
    "graphiti-memory": {
      "transport": "stdio",
      "command": "/Users/charlesqin/.local/bin/uv",
      "args": [
        "run",
        "--isolated",
        "--directory",
        "/Users/charlesqin/graphiti/mcp_server",
        "--project",
        ".",
        "graphiti_mcp_server.py",
        "--transport",
        "stdio"
      ],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "graphiti123!",
        "OPENAI_API_KEY": "sk-proj--xxxxxxxxxxxxxx",
        "MODEL_NAME": "gpt-4.1-mini"
      }
    }
  }
}
```

### 🚀为Claude Code添加

```bash
claude mcp add-json graphiti-memory '{
  "type": "stdio",
  "command": "/Users/charlesqin/.local/bin/uv",
  "args": [
    "run",
    "--isolated",
    "--directory",
    "/Users/charlesqin/graphiti/mcp_server",
    "--project",
    ".",
    "graphiti_mcp_server.py",
    "--transport",
    "stdio"
  ],
  "env": {
    "NEO4J_URI": "bolt://localhost:7687",
    "NEO4J_USER": "neo4j",
    "NEO4J_PASSWORD": "graphiti123!",
    "OPENAI_API_KEY": "sk-proj--xxxxxxxx",
    "MODEL_NAME": "gpt-4.1-mini"
  }
}'
```

### 🚀SSE方式

```bash
# 命令
cd graphiti/mcp_server/ && uv run graphiti_mcp_server.py --model gpt-4.1-mini --transport sse

# Cursor配置文件

{
  "mcpServers": {
    "graphiti-memory": {
      "transport": "sse",
      "url": "http://localhost:8000/sse"
    }
  }
}

# Claude Code添加MCP命令

claude mcp add --transport sse --scope user graphiti-memory http://localhost:8000/sse

```

### 🚀Cursor Rules

```bash
# 使用Graphiti MCP工具的指令

## 开始任何任务之前

**始终先搜索：** 在开始工作之前，使用search_nodes工具查找相关的偏好设置和程序。

**同时搜索事实：** 使用search_facts工具发现可能与您的任务相关的关系和事实信息。

**按实体类型过滤：** 在节点搜索中指定"Preference"（偏好）或"Procedure"（程序）以获得针对性结果。

**审查所有匹配项：** 仔细检查与当前任务匹配的任何偏好、程序或事实。

## 始终保存新的或更新的信息

**立即捕获需求和偏好：** 当用户表达需求或偏好时，立即使用add_episode存储它。最佳实践是将很长的需求拆分为较短的逻辑块。

**明确标识更新：** 如果某些内容是对现有知识的更新，请明确说明。

**清晰记录程序：** 当您发现用户希望如何完成某些操作时，将其记录为程序。

**记录事实关系：** 当您了解到实体之间的连接时，将这些信息存储为事实。

**明确分类：** 为偏好和程序标注清晰的类别，以便日后更好地检索。

## 工作过程中

**遵循发现的偏好：** 使您的工作与找到的任何偏好保持一致。

**严格按照程序执行：** 如果找到适用于当前任务的程序，请严格按步骤执行。

**应用相关事实：** 使用事实信息来指导您的决策和建议。

**保持一致性：** 与先前识别的偏好、程序和事实保持一致。

## 最佳实践

**建议前先搜索：** 在提出建议之前，始终检查是否存在既定知识。

**结合节点和事实搜索：** 对于复杂任务，同时搜索节点和事实以构建完整图景。

**使用center_node_uuid：** 在探索相关信息时，围绕特定节点进行搜索。

**优先考虑具体匹配：** 更具体的信息优先于一般信息。

**主动识别模式：** 如果您注意到用户行为中的模式，考虑将其存储为偏好或程序。

**重要提醒：** 知识图谱是您的记忆。持续使用它来提供个性化协助，尊重用户既定的程序和事实背景。
```

### 🚀测试

```bash
I'll develop a specification for a React tic-tac-toe application using Chakra UI. Let me first check if there are any existing preferences or procedures related to this task.
```

```bash
请使用 Chakra UI 创建一个移动端优先的语言学习应用 React 组件。

**应用概述：**
- 应用名称：LingoLearn
- 目标用户：语言学习者
- 主要功能：单词学习、练习测试、学习进度追踪

**技术要求：**
- 使用 Chakra UI 组件库
- 移动端优先的响应式设计
- 支持触摸手势和滑动操作
- 适配 iOS 和 Android 设计规范

**界面结构：**
1. 顶部导航栏：显示当前课程、学习进度条
2. 主内容区域：单词卡片、练习题目、学习统计
3. 底部标签栏：首页、练习、进度、设置四个页面

**核心功能：**
1. **单词学习模块**
   - 单词卡片翻转效果（点击显示释义）
   - 发音播放按钮
   - 收藏和标记功能
   - 左右滑动切换单词

2. **练习测试模块**
   - 选择题、填空题、听力题
   - 答题计时器
   - 实时反馈（正确/错误提示）
   - 答题进度指示器

3. **学习进度模块**
   - 每日学习统计图表
   - 学习连续天数
   - 掌握词汇量显示
   - 成就徽章系统

**设计要求：**
- 颜色主题：使用温暖的蓝色和绿色配色
- 字体大小：确保在小屏幕上的可读性
- 按钮尺寸：适合手指触摸（最小44px）
- 交互反馈：点击、滑动都要有视觉反馈
- 加载状态：使用 Skeleton 组件显示加载效果

**响应式要求：**
- 手机端（<768px）：单列布局，全屏显示
- 平板端（768px-1024px）：两列布局，侧边栏导航
- 桌面端（>1024px）：三列布局，更多信息展示

**数据结构：**
请模拟以下数据结构：
- 单词列表：包含单词、释义、发音、例句
- 用户进度：学习天数、完成练习数、掌握词汇
- 练习题目：题目类型、选项、正确答案

**交互细节：**
- 单词卡片支持左右滑动切换
- 练习答题支持拖拽排序
- 长按单词可以显示详细信息
- 下拉刷新获取新内容

**性能要求：**
- 使用 React.memo 优化组件渲染
- 实现虚拟滚动处理大量单词列表
- 图片懒加载
- 本地存储用户学习进度

请创建一个完整的、可交互的应用原型，包含所有主要功能的实现。
```

```bash
# 项目完成后执行
请将当前项目的完整信息存储到Graphiti知识图谱中，包括：

**项目总结存储**
1. 项目基本信息和最终成果
2. 完整的技术栈和架构决策
3. 所有功能模块的实现细节
4. 遇到的问题和解决方案
5. 性能优化措施和效果
6. 代码组织结构和设计模式
7. 开发经验和教训总结
8. 未来改进建议

**存储要求：**
- 创建完整的知识图谱实体和关系
- 确保信息可被后续项目查询和复用
- 建立与相关技术领域的关联
- 记录开发时间线和里程碑

请按照结构化格式系统性地存储所有项目知识。
```

### 🚀bug修复

```bash
1️⃣Bug 描述：
在 <chakra-card__body class="css-8d2jmn"> 中，两个 chakra-text 元素（class 分别为 css-2qivvk 和 css-ye0o5a）发生了视觉重叠。请检查 CSS 布局是否因 position、margin、height 设置错误导致，或父容器未正确分配空间，协助修复为正常非重叠显示。

2️⃣Bug 描述：
页面初始化后，<div class="chakra-stack css-14r43fo"> 内部的文字出现了镜像翻转（水平反转）的显示效果。
推测是由于某个 CSS 样式导致的。

预期行为：
文字应保持正常阅读方向，不应被水平翻转。

请求：
请通过修改 CSS 规则，移除或覆盖导致镜像的样式，以恢复文字的正常方向显示。

```

## 1. 基本使用方式

### 添加个人信息和偏好

```
请帮我记住以下信息：
- 我是一个全栈开发者
- 主要技术栈：TypeScript、React、Node.js、Next.js
- 数据库偏好：PostgreSQL 和 MongoDB
- 样式框架：喜欢使用 Tailwind CSS
- 代码风格：偏好函数式编程，使用 ESLint 和 Prettier

```

### 记录项目信息

```
请记录我当前的项目：
项目名称：电商管理系统
技术栈：Next.js + TypeScript + Prisma + PostgreSQL
部署平台：Vercel
主要功能：商品管理、订单处理、用户认证

```

### 添加学习和工作习惯

```
请记住我的工作习惯：
- 使用 VS Code 插件：Auto Rename Tag、ES7+ React Snippets
- 代码提交习惯：遵循 Conventional Commits 规范
- 测试偏好：Jest + React Testing Library
- 部署流程：GitHub Actions + Vercel 自动部署

```

## 2. 查询和检索信息

### 询问之前记录的信息

```
我之前提到过使用什么数据库吗？

```

```
提醒我一下我当前项目的技术栈是什么？

```

```
我的代码风格偏好是什么？

```

## 3. 项目相关的记忆

### 记录具体需求

```
对于电商项目，请记住这些需求：
- 需要实现购物车功能，支持商品规格选择
- 支付集成：Stripe 和支付宝
- 管理后台需要数据分析图表
- 移动端适配是必需的

```

### 记录解决方案和最佳实践

```
请记住这个解决方案：
问题：Next.js 中图片优化
解决方案：使用 next/image 组件，配置 domains 白名单，设置适当的 sizes 属性
最佳实践：为不同屏幕尺寸提供不同图片规格

```

## 4. 高级用法

### 关联信息查询

```
基于我之前提到的技术偏好，为我的电商项目推荐一个状态管理方案

```

### 个性化建议

```
根据我的编程习惯和项目需求，帮我设计一个合适的文件夹结构

```

### 学习进度跟踪

```
请记录我的学习计划：
本月目标：深入学习 TypeScript 高级类型
已完成：泛型、条件类型
进行中：映射类型和模板字面量类型
下一步：学习 TypeScript 装饰器

```

## 5. 实际工作场景

### 代码审查标准

```
请记住我的代码审查清单：
1. 是否有类型安全问题
2. 组件是否可复用
3. 性能优化：useMemo、useCallback 的合理使用
4. 错误处理是否完善
5. 测试覆盖率是否达标

```

### 项目部署清单

```
记录我的部署前检查清单：
- 环境变量配置检查
- 数据库迁移脚本运行
- 静态资源 CDN 配置
- SSL 证书有效性
- 监控和日志配置

```

## 6. 验证记忆效果

几天后，您可以测试 Graphiti 的记忆能力：

```
我应该使用什么技术栈来开发新项目？

```

```
提醒我一下我的代码风格偏好

```

## 7. 最佳实践建议

1. **结构化记录**：使用清晰的格式记录信息
2. **分类存储**：按技术栈、项目、习惯等分类记录
3. **定期更新**：当偏好或技术栈发生变化时及时更新
4. **具体化描述**：记录具体的解决方案而不是抽象概念