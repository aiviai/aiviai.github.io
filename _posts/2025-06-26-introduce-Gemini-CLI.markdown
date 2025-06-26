---
layout: single
title: "🚀保姆级教程！Google震撼发布Gemini CLI！100万TOKEN超长上下文远超Claude Code，支持MCP Server扩展，开发者的终极AI！Context7+Task Master轻松开发AI智能体"
sidebar:
  nav: "docs"
date: 2025-06-25 00:00:00 +0800
categories: AIAgents
tags: [Gemini CLI, Claude, Gemini, Cursor, Gemini 2.5 Pro, AI智能体, AI编程, Vibe Coding, MCP Server, Claude Code, Context7]
classes: wide
author_profile: true
---

Google最近推出了Gemini CLI，这是一个基于Gemini 1.5 Pro模型的开源命令行界面工具，将人工智能直接引入开发者的终端环境。这一创新工具代表了开发者生产力的重大进步，将传统命令行从刚性的命令执行器转变为智能的对话伙伴。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV13zKozyEKC/)
- [👉👉👉 通过YouTube观看](https://youtu.be/v41xKxZmygU)
- [👉👉👉 Augment编程插件视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Cursor编程视频](https://youtu.be/6dhOUJ_vnIY)
- [👉👉👉 Claude Code编程视频](https://youtu.be/SK9JBDyHqiI)
- [👉👉👉 Kilo Code编程视频](https://youtu.be/sUCsitU7hmE)
- [👉👉👉 Magnetic UI视频](https://youtu.be/0ubHrQz9PN0)
- [👉👉👉 n8n相关视频](https://youtu.be/nb87POhO6aA)
- [👉👉👉 n8n相关视频](https://youtu.be/hE_CeOUY2h0)
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



**核心功能与架构**

Gemini CLI的核心是Gemini 2.5 Pro，这是一个能够处理多达100万个令牌上下文窗口的多模态基础模型。这个庞大的上下文窗口允许开发者输入大型代码库、文档和文件树，进行全面的多步骤分析或转换。该工具配备了多个内置功能，包括代码阅读器、命令运行器和内存模块，这些功能可以通过多模态可组合函数（MCPs）进行扩展，这是一个基于Python的接口，用于添加自定义行为。

**多功能开发助手**

虽然Gemini CLI在编程方面表现出色，但它被设计为一个多功能的本地实用工具，可用于广泛的任务，从内容生成和问题解决到深度研究和任务管理。该工具允许用户使用自然语言进行提示，消除了输入冗长复杂命令或不断查阅文档的需要。开发者可以通过自然语言命令执行复杂任务，如代码重构、文档生成、执行shell命令、运行脚本和编辑文件。

**免费访问与使用限制**

任何拥有个人Google账户的用户都可以免费访问Gemini 1.5 Pro，限制为每分钟60次请求和每天1000次请求。这个慷慨的额度确保个人开发者在开发工作中很少遇到使用限制。对于需要更高限制或特定模型的专业开发者，Google提供与Google AI Studio和Vertex AI的集成，采用基于使用量的计费方式。

**开源与可扩展性**

该项目完全开源，采用Apache 2.0许可证。这种透明性允许开发者检查代码、了解其功能并验证安全影响。开源特性鼓励社区贡献，包括错误报告、功能建议和代码改进。该工具支持与模型上下文协议（MCP）和捆绑扩展的内置集成，允许开发者为特定工作流定制提示和说明。

**开发生态系统集成**

Gemini CLI与Google的AI编程助手Gemini Code Assist共享相同的技术。这种集成在不同的开发环境中提供了一致性，无论是在终端还是在VS Code中工作。该工具可以通过Google搜索为提示提供基础，获取网页并为模型提供实时的外部上下文。

**跨平台兼容性**

Gemini CLI使用TypeScript编写，可在所有平台上运行，包括Windows、macOS和Linux。通过npm进行安装非常简单，使得开发者无论使用何种操作系统都能轻松访问。

Gemini CLI代表了开发者工具的范式转变，人工智能成为命令行体验的组成部分，在保持开发者重视的终端效率和可移植性的同时提高了生产力。

## 基础操作：

- **添加上下文**：使用 @ 指定文件作为上下文（例如：@src/myFile.ts）来定位特定文件或文件夹
- **Shell 模式**：通过 ! 执行shell命令（例如：!npm run start）或使用自然语言（例如：启动服务器）

## 命令列表：

- `/help` - 显示 gemini-cli 的帮助信息
- `/docs` - 在浏览器中打开完整的 Gemini CLI 文档
- `/clear` - 清除屏幕和对话历史
- `/theme` - 更改主题
- `/auth` - 更改认证方法
- `/editor` - 设置外部编辑器偏好
- `/stats` - 检查会话统计信息
- `/mcp` - 列出已配置的 MCP 服务器和工具
- `/memory` - 管理内存。用法：/memory <show|refresh|add> [用于添加的文本]
- `/tools` - 列出可用的 Gemini CLI 工具
- `/about` - 显示版本信息
- `/bug` - 提交错误报告
- `/chat` - 管理对话历史。用法：/chat <list|save|resume> [标签]
- `/quit` - 退出命令行界面
- `/compress` - 通过将上下文替换为摘要来压缩上下文
- `!` - shell 命令

## 键盘快捷键：

- **Enter** - 发送消息
- **Shift+Enter** - 换行
- **Up/Down** - 在提示历史中循环
- **Alt+Left/Right** - 在输入中按单词跳转
- **Esc** - 取消操作
- **Ctrl+C** - 退出应用程序

## MCP Server配置命令

`mkdir -p ~/.gemini`

`cd ~/.gemini`

`nano settings.json`

配置文件(context7为例)

```json
{
  "theme": "Default",
  "selectedAuthType": "oauth-personal",
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-"
        "OPENAI_API_KEY": "sk-proj-"
        "GOOGLE_API_KEY": "sk-proj-"
      }
    }
  }

```

## GEMINI.md配置示例

```bash
# AutoGen AI智能体开发项目

## 项目概述
使用 AutoGen 0.4 最新版本开发AI智能体，Python 3.11，venv虚拟环境。

## 环境配置

### Python环境
- Python版本：3.11
- 虚拟环境：使用venv
- 包管理：pip + requirements.txt

### 安装步骤

# 创建虚拟环境
python3.11 -m venv .venv

# 激活环境
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# 安装AutoGen
pip install -U "autogen-agentchat" "autogen-ext[openai]"


## 编程规范

### 导入约定

import asyncio
from autogen_agentchat.agents import AssistantAgent, UserProxyAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_ext.models.openai import OpenAIChatCompletionClient


### 代码风格
- 所有操作使用 async/await（AutoGen 0.4是异步架构）
- 使用类型提示
- 函数和类添加中文注释
- 错误处理要完善

### 基本模式

async def main():
    # 创建模型客户端
    model_client = OpenAIChatCompletionClient(model="gpt-4o")
    
    # 创建智能体
    agent = AssistantAgent("助手", model_client=model_client)
    
    # 运行任务
    result = await agent.run(task="你的任务")
    
    # 关闭连接
    await model_client.close()


## 项目结构

项目目录/
├── .venv/           # 虚拟环境（不提交到git）
├── .env             # 环境变量（不提交到git）
├── requirements.txt # 依赖包
├── agents/          # 智能体实现
├── main.py          # 主程序入口
└── GEMINI.md        # 本配置文件


## 环境变量设置

# .env 文件
OPENAI_API_KEY=你的API密钥
MODEL_NAME=gpt-4o


## 开发要点

### 智能体类型
- **AssistantAgent**: LLM驱动的助手智能体
- **CodeExecutorAgent**: 代码执行智能体

### 团队模式
- **RoundRobinGroupChat**: 轮询组聊天
- 支持多智能体协作

### 最佳实践
- 先单独测试智能体，再组合成团队
- 使用async/await处理所有操作
- 正确关闭模型客户端连接
- 环境变量管理敏感信息
- 虚拟环境不提交到版本控制

## 文档和资源获取

### MCP服务器配置
始终使用 **context7 MCP server** 搜索AutoGen最新文档和代码规范：
- 优先查询AutoGen 0.4官方文档
- 获取最新的API参考和最佳实践
- 查找代码示例和模式
- 验证版本兼容性和新特性

### 搜索策略
当需要AutoGen相关信息时：
1. 首先使用context7搜索官方文档
2. 重点关注0.4版本的变更和新特性
3. 获取异步编程模式的最新示例
4. 查找多智能体协作的最佳实践

## 注意事项
- AutoGen 0.4与0.2版本完全不同，使用新的异步架构
- AgentChat适合快速原型开发
- 需要Python 3.11
- 所有示例代码使用中文注释
- 遇到问题时优先通过context7搜索最新解决方案
```

# Gemini CLI 高级用法指南

## 安装与认证

### 快速安装

```bash
# 直接运行（推荐）
npx https://github.com/google-gemini/gemini-cli

# 或全局安装
npm install -g @google/gemini-cli

```

### 高级认证配置

```bash
# 使用 API 密钥（适用于企业用户）
export GEMINI_API_KEY="your_api_key_here"

# Google Workspace 账户认证
gemini auth --workspace

# 检查认证状态
gemini auth status

```

## 核心高级功能

### 1. 大型代码库分析

### 项目架构分析

```bash
cd your-large-project/
gemini

# 在 Gemini CLI 中执行：
> 分析这个项目的整体架构，包括：
  - 主要模块和它们的职责
  - 数据流向和依赖关系
  - 设计模式的使用
  - 潜在的架构问题

```

### 跨文件代码重构

```bash
> 重构整个项目以支持新的数据库抽象层：
  1. 识别所有数据库相关的代码
  2. 创建统一的数据访问接口
  3. 生成迁移计划和时间表

```

### 技术债务评估

```bash
> 评估这个代码库的技术债务：
  - 代码重复度分析
  - 过时依赖识别
  - 性能瓶颈检测
  - 安全漏洞扫描

```

### 2. 多模态应用开发

### 从设计稿生成应用

```bash
# 上传设计图片后
> 基于这个 UI 设计稿创建一个 React 应用：
  - 实现像素级完美的 UI 组件
  - 添加响应式设计
  - 集成状态管理
  - 包含基本的交互逻辑

```

### PDF 文档转代码

```bash
> 分析这个 API 规范文档并生成：
  - 完整的 TypeScript 接口定义
  - API 客户端封装类
  - 单元测试用例
  - 使用示例和文档

```

### 3. 运营自动化

### Git 工作流自动化

```bash
> 自动化我们的 Git 工作流：
  1. 分析最近的提交模式
  2. 创建智能的分支命名约定
  3. 生成自动化的代码审查清单
  4. 设置冲突解决策略

```

### CI/CD 流程优化

```bash
> 优化我们的 CI/CD 流程：
  - 分析构建时间瓶颈
  - 建议并行化策略
  - 创建智能测试选择
  - 设计故障恢复机制

```

## MCP 服务器集成

### 1. 自定义 MCP 服务器配置

### 数据库操作服务器

```json
{
  "servers": {
    "database": {
      "command": "node",
      "args": ["./mcp-servers/database-server.js"],
      "env": {
        "DB_CONNECTION_STRING": "postgresql://..."
      }
    }
  }
}

```

```bash
> 通过数据库 MCP 服务器：
  - 查询用户行为分析数据
  - 生成数据模型优化建议
  - 创建自动化数据清理脚本

```

### 媒体生成服务器集成

```bash
> 使用 Imagen/Veo 服务器创建：
  - 产品演示视频脚本
  - 营销素材设计方案
  - 用户界面图标集合
  - 品牌一致性检查

```

### 2. 企业工具集成

### Slack 集成自动化

```bash
> 创建 Slack 机器人来：
  - 自动总结每日站会内容
  - 监控生产环境告警
  - 生成代码审查通知
  - 跟踪项目里程碑进度

```

### Google Workspace 集成

```bash
> 自动化 Google Workspace 工作流：
  - 从会议记录生成行动项
  - 创建项目状态报告
  - 同步日历和项目时间线
  - 生成团队绩效分析

```

## 高级项目管理

### 1. 智能项目分析

### 团队贡献可视化

```bash
> 创建展示最近 7 天 git 历史的报告：
  - 按功能模块分组提交
  - 分析团队成员贡献模式
  - 识别协作瓶颈
  - 生成工作负载平衡建议

```

### 实时监控仪表板

```bash
> 创建全屏监控应用显示：
  - GitHub Issues 互动热力图
  - 实时构建状态
  - 代码质量趋势
  - 用户反馈聚合

```

### 2. 文档和流程自动化

### 智能文档生成

```bash
> 自动生成项目文档：
  - API 参考文档（从代码注释）
  - 部署指南（从配置文件）
  - 故障排除手册（从日志分析）
  - 用户手册（从功能规范）

```

### 合规性检查自动化

```bash
> 实施合规性检查流程：
  - GDPR 数据处理审计
  - 安全漏洞扫描报告
  - 代码许可证合规检查
  - 访问权限审查

```

## 高级开发工作流

### 1. 代码质量提升

### 智能代码审查

```bash
> 执行深度代码审查：
  - 架构一致性检查
  - 性能影响分析
  - 安全最佳实践验证
  - 可维护性评估

```

### 自动化重构建议

```bash
> 分析代码并提供重构建议：
  - 设计模式优化机会
  - 代码重复消除
  - 函数复杂度简化
  - 依赖关系优化

```

### 2. 技术迁移与升级

### 版本升级策略

```bash
> 制定 Python 3.12 升级计划：
  1. 兼容性风险评估
  2. 依赖库升级路径
  3. 测试策略制定
  4. 渐进式迁移方案

```

### 框架迁移指导

```bash
> 协助从 Flask 迁移到 FastAPI：
  - 路由转换策略
  - 中间件适配方案
  - 数据验证迁移
  - 性能优化机会

```

## 企业级部署配置

### 1. 批量处理与自动化

### 文件处理自动化

```bash
> 批量处理项目文件：
  - 将所有图片转换为 WebP 格式
  - 根据 EXIF 数据重组织照片
  - 压缩和优化视频文件
  - 生成缩略图和预览

```

### 数据整理自动化

```bash
> 智能整理财务文档：
  - 按月份分类 PDF 发票
  - 提取关键财务数据
  - 生成支出分析报告
  - 创建税务准备清单

```

### 2. 高级配置管理

### 环境配置优化

```bash
# 企业级配置文件
export GEMINI_MODEL="gemini-2.5-pro"
export GEMINI_TEMPERATURE="0.3"
export GEMINI_MAX_TOKENS="8192"
export MCP_SERVER_TIMEOUT="30000"

```

### 团队协作配置

```bash
# 团队共享配置
gemini config set --team \
  --project-context="/path/to/project" \
  --coding-standards="/path/to/standards.json" \
  --review-templates="/path/to/templates"

```

## 性能优化与监控

### 1. 使用量管理

```bash
# 监控 API 使用情况
gemini usage --detailed
gemini quota --check

# 优化请求策略
gemini config set --batch-size=5 --parallel-requests=3

```

### 2. 本地缓存配置

```bash
# 启用智能缓存
gemini config set --cache-enabled=true --cache-ttl=3600
gemini cache clean --older-than=7d

```

## 最佳实践建议

### 1. 安全考虑

- 使用环境变量管理敏感信息
- 定期轮换 API 密钥
- 实施访问权限控制
- 启用审计日志记录

### 2. 性能优化

- 合理使用批处理功能
- 实施智能缓存策略
- 监控 token 使用效率
- 优化提示词长度

### 3. 团队协作

- 建立统一的配置标准
- 共享常用的提示词模板
- 实施代码审查流程
- 定期培训团队成员

通过这些高级用法，Gemini CLI 可以成为企业开发团队的强大生产力工具，显著提升开发效率和代码质量。

