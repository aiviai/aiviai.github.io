---
layout: single
title: "🚀彻底改写Claude Code编程方式！从提示词工程到上下文工程！AI编程能力提升百倍！从需求分析到代码生成全自动化！保姆级实战教程！支持Windows！零基础用Claude Code开发AI智能体"
sidebar:
  nav: "docs"
date: 2025-07-15 00:00:00 +0800
categories: AIAgents
tags: [Context Engineering, Claude, Claude Code, Cursor, Claude4, AI智能体, AI编程, Vibe Coding, MCP Server]
classes: wide
author_profile: true
---

**Context Engineering**是一种为AI编程助手提供全面上下文信息的工程化方法，远超传统的提示工程。它不仅仅是优化提示词的措辞，而是构建一个完整的上下文系统，包括项目规则、代码示例、文档引用、验证流程等。

这种方法通过提供详尽的背景信息、编码规范、架构模式和测试要求，让AI能够理解项目的完整图景，从而生成符合项目标准的高质量代码。Context Engineering解决了大多数AI助手失败的根本原因——缺乏足够的上下文信息，而不是模型能力不足。

它采用PRP（产品需求提示）的方式，将复杂功能分解为可验证的步骤，通过迭代验证循环确保代码质量。这种方法能显著提高AI开发的成功率和代码一致性，是现代AI辅助开发的重要进展。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1a6uCz7EW8/)
- [👉👉👉 通过YouTube观看](https://youtu.be/oEZ7aN7jOEI)
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


上下文工程是一个用于入门“上下文工程”的全面模板——它是一种专门为 AI 编码助手构建上下文的工程方法，目的是让 AI 拥有完成任务所需的全部信息，从而实现端到端的高质量开发。

> 上下文工程的效果比提示工程好 10 倍，比“靠感觉写代码”好 100 倍。
> 

---

## 🚀 快速开始

```bash
# 1. 克隆模板仓库
git clone https://github.com/coleam00/Context-Engineering-Intro.git
cd Context-Engineering-Intro

# 2. 设置项目规则（可选，模板已提供）
# 编辑 CLAUDE.md 添加你项目的专属指南

# 3. 添加示例（强烈推荐）
# 将相关代码示例放入 examples/ 文件夹中

# 4. 创建你的初始功能需求
# 编辑 INITIAL.md，写下你的功能需求说明

# 5. 生成详细的 PRP（产品需求提示）
# 在 Claude Code 中运行：
/generate-prp INITIAL.md

# 6. 执行 PRP 实现功能
# 在 Claude Code 中运行：
/execute-prp PRPs/your-feature-name.md
```

---

## 什么是上下文工程？

上下文工程是相对于传统提示工程的一种范式转变。

### 提示工程 vs 上下文工程

**提示工程：**

- 关注措辞和句式技巧
- 限于“怎么提问”或“怎么描述任务”
- 更像是给 AI 留一张便签

**上下文工程：**

- 提供完整体系化上下文
- 包含文档、示例、规则、开发模式和验证机制
- 更像是为 AI 写了一整本剧本，细节俱全

---

### 为什么上下文工程很重要？

1. **减少 AI 出错**：大多数智能体失败不是模型问题，而是上下文缺失
2. **确保一致性**：AI 会遵循你的项目结构和习惯
3. **支持复杂实现**：通过上下文支持多步骤功能的开发
4. **具备自纠能力**：通过验证闭环机制，AI 能自行发现并修复错误

---

## 模板结构说明

```
context-engineering-intro/
├── .claude/
│   ├── commands/
│   │   ├── generate-prp.md    # 用于生成完整 PRP 的命令定义
│   │   └── execute-prp.md     # 执行 PRP 并构建功能的命令定义
│   └── settings.local.json    # Claude Code 的本地权限设置
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md       # PRP 的基础模板
│   └── EXAMPLE_multi_agent_prp.md  # 多智能体 PRP 示例
├── examples/                  # 关键代码示例目录
├── CLAUDE.md                 # AI 助手的全局规则配置
├── INITIAL.md               # 功能需求的初始模板
├── INITIAL_EXAMPLE.md       # 功能需求示例
└── README.md                # 本文件说明

```

> 本模板暂未涉及上下文工程与 RAG 或工具集成的内容，因为这部分将在后续单独推出 😉
> 

---

## 逐步操作指南

### 1. 设置全局规则（CLAUDE.md）

`CLAUDE.md` 文件定义了整个项目的 AI 协作规则，模板内容包括：

- **项目感知能力**：能理解规划文档、任务清单
- **代码结构约束**：文件大小、模块拆分方式
- **测试要求**：单元测试模式、覆盖率要求
- **编码风格**：语言偏好、格式规范
- **文档规范**：注释格式、文档要求

> 你可以直接使用模板内容，也可以根据项目自定义。
> 

---

### 2. 创建初始功能需求（INITIAL.md）

编辑 `INITIAL.md`，描述你想让 AI 实现的功能：

```markdown
## 功能：
[具体描述你想实现什么功能，清晰明确地写出需求]

## 示例：
[列出 examples/ 文件夹中参考的代码，并说明它们的用途]

## 文档链接：
[加入相关文档、API 说明或 MCP 服务器资源链接]

## 其他注意事项：
[说明任何易错点、特别需求，或 AI 可能忽略的内容]

```

> 可参考 INITIAL_EXAMPLE.md 查看完整示例。
> 

---

### 3. 生成 PRP（产品需求提示）

PRP 是为 AI 编码助手准备的详细“开发蓝图”，包含：

- 全部上下文信息与说明文档
- 有验证机制的实现步骤
- 错误处理机制
- 测试与验证要求

运行命令（在 Claude Code 中）：

```bash
/generate-prp INITIAL.md

```

> 注意：这些斜杠命令定义于 .claude/commands/ 中，你可以查看其实现细节：
> 
> - `.claude/commands/generate-prp.md`：如何分析需求并生成 PRP
> - `.claude/commands/execute-prp.md`：如何从 PRP 实现功能

命令会执行以下操作：

1. 读取功能请求
2. 分析代码库的开发模式
3. 搜索相关文档与约定
4. 在 `PRPs/your-feature-name.md` 中生成完整 PRP

---

### 4. 执行 PRP（构建功能）

PRP 生成后，运行以下命令构建功能：

```bash
/execute-prp PRPs/your-feature-name.md

```

AI 助手将执行：

1. 加载 PRP 中的全部上下文
2. 创建详细的实现计划
3. 按步骤实现各个组件
4. 执行测试并修复错误
5. 确保所有验收标准达成

---

## 如何编写高质量的 INITIAL.md

### 关键字段说明

**功能（FEATURE）**：明确具体

- ❌ “写一个网页爬虫”
- ✅ “构建一个基于 BeautifulSoup 的异步爬虫，抓取电商产品信息，支持速率限制，结果存入 PostgreSQL”

**示例（EXAMPLES）**：利用 `examples/` 文件夹

- 放入相关代码样例
- 指定参考文件与可复用模式
- 说明要模仿哪些结构

**文档（DOCUMENTATION）**：提供参考资源

- API 文档地址
- 使用库的官方指南
- MCP 服务器文档
- 数据库结构说明

**其他考虑（OTHER CONSIDERATIONS）**：重要细节不能漏

- 身份验证机制
- 速率限制或配额
- 性能要求或限制
- 常见的陷阱或注意事项

---

## PRP 工作流

### `/generate-prp` 的执行流程：

1. **调研阶段**
    - 分析代码库结构和常用模式
    - 查找相似实现案例
    - 确定应遵循的惯例
2. **文档收集阶段**
    - 抓取相关 API 文档
    - 包含使用库的文档说明
    - 添加注意事项和小技巧
3. **蓝图生成阶段**
    - 制作实现步骤清单
    - 嵌入验证检查点
    - 添加测试与异常处理要求
4. **质量评估阶段**
    - 给出置信评分（1-10 分）
    - 确保所有必要上下文均被涵盖

---

### `/execute-prp` 的执行流程：

1. **加载上下文**：读取整个 PRP 内容
2. **规划任务**：使用 TodoWrite 生成任务列表
3. **逐步实现**：执行每个组件的开发
4. **验证结果**：运行测试与代码风格检查
5. **持续迭代**：自动修复发现的问题
6. **完成交付**：确保满足所有功能与质量要求

你可以参考 `PRPs/EXAMPLE_multi_agent_prp.md` 查看完整 PRP 示例。

---

## 如何有效使用示例

`examples/` 文件夹对成功至关重要。

AI 编码助手在有代码模式可参考时，表现更出色。

### 示例内容建议

1. **代码结构模式**
    - 模块组织方式
    - 导入规范
    - 类与函数的结构样式
2. **测试用例模式**
    - 测试文件结构
    - mock 使用方法
    - 断言格式
3. **集成模式**
    - API 客户端实现
    - 数据库连接方式
    - 身份认证流程
4. **命令行工具模式**
    - 参数解析方式
    - 输出格式规范
    - 错误处理逻辑

---

### 示例结构参考：

```
examples/
├── README.md           # 说明各示例用途
├── cli.py              # CLI 实现模式
├── agent/              # 智能体架构模式
│   ├── agent.py        # 智能体创建样式
│   ├── tools.py        # 工具实现样式
│   └── providers.py    # 多服务商支持样式
└── tests/              # 测试用例结构
    ├── test_agent.py   # 单元测试样例
    └── conftest.py     # Pytest 配置文件

```

---

## 最佳实践建议

### 1. INITIAL.md 中要说清楚

- 不要假设 AI 知道你的意图
- 写明所有约束和需求
- 多引用示例代码

### 2. 示例越多越好

- 示例越多，结果越稳定
- 展示“应该怎么做”与“不要怎么做”
- 包含错误处理方式

### 3. 使用验证机制

- PRP 中自带测试任务
- AI 会迭代执行直到全部通过
- 确保首次生成就是可用代码

### 4. 善用参考文档

- 引用官方 API 文档
- 加入 MCP 服务器资源链接
- 明确指定文档章节

### 5. 定制 CLAUDE.md

- 加入你的项目规范
- 写明代码风格要求
- 制定 AI 编码标准

---

---

# MCP 服务器构建器 —— 上下文工程的实际应用

本用例展示了如何使用**上下文工程**和**PRP（产品需求提示）流程**来构建可投入生产的模型上下文协议（MCP）服务器。它提供了一个经过验证的模板和工作流程，支持 GitHub OAuth 认证、数据库集成以及 Cloudflare Workers 部署。

> PRP = PRD（产品需求文档）+ 精选代码库知识 + 智能体运行手册 —— 是 AI 能够一次性生成接近可交付代码的最小可行单元。
> 

---

## 🎯 你将学到什么

通过本用例，你将学会如何：

- **使用 PRP 流程** 系统化地构建复杂的 MCP 服务器
- **利用专门的上下文工程** 进行 MCP 开发
- **遵循生产就绪模板中的最佳实践**
- **实现基于 GitHub OAuth 的安全认证与角色权限管理**
- **部署到 Cloudflare Workers**，并实现监控与错误处理

---

## 📋 工作原理：MCP 服务器的 PRP 流程

### 1. 定义你的 MCP 服务器（initial.md）

首先，在 `PRPs/INITIAL.md` 中描述你想构建的 MCP 服务器：

```markdown
## 功能：
我们希望创建一个天气 MCP 服务器，提供实时天气数据，
具备缓存机制与访问频率限制功能。

## 附加功能：
- 集成 OpenWeatherMap API
- 使用 Redis 提升性能
- 用户级速率限制
- 历史天气数据访问
- 地点搜索与自动补全功能

## 其他考虑事项：
- 外部服务的 API 密钥管理
- 对 API 调用失败的错误处理
- 地理坐标输入的合法性验证

```

---

### 2. 生成你的 PRP

使用专门为 MCP 提供的 PRP 命令，生成完整的实现方案：

```bash
/prp-mcp-create INITIAL.md

```

**此命令的作用：**

- 读取功能需求
- 调研已有 MCP 代码库的模式
- 分析认证和数据库集成方式
- 在 `PRPs/your-server-name.md` 中生成完整 PRP
- 包含全部上下文、验证闭环和逐步任务清单

> 注意！PRP 生成后一定要亲自校对！PRP 框架的设计就是让你参与其中，确保上下文的准确性。执行的质量取决于 PRP 的质量。/prp-mcp-create 是你项目成功的起点。
> 

---

### 3. 执行你的 PRP

使用 MCP 专用的执行命令，开始构建服务器：

```bash
/prp-mcp-execute PRPs/your-server-name.md

```

**此命令的作用：**

- 加载完整 PRP 与上下文信息
- 使用 TodoWrite 创建详细的实现计划
- 按照模板实现每个组件
- 执行全面验证（TypeScript、测试、部署）
- 构建一个完整运行的 MCP 服务器

---

## 🏗️ 针对 MCP 的上下文工程

本用例包含为 MCP 服务器开发专门设计的上下文工程组件：

### 专用斜杠命令（Slash Commands）

位于 `.claude/commands/` 中：

- **`/prp-mcp-create`** - 针对 MCP 服务器生成 PRP
- **`/prp-mcp-execute`** - 执行 MCP PRP 并进行完整验证

这些命令是根目录下通用命令的特化版本，专为 MCP 开发而优化。

---

### 专用 PRP 模板

模板文件 `PRPs/templates/prp_mcp_base.md` 包含：

- **MCP 特有模式**：工具注册、身份认证等
- **Cloudflare Workers 配置**：便于部署
- **GitHub OAuth 集成**：完整流程
- **数据库安全措施**：如防 SQL 注入
- **全面验证闭环**：从 TypeScript 到生产环境

---

### AI 文档说明

`PRPs/ai_docs/` 文件夹中包含：

- **`mcp_patterns.md`**：MCP 开发和安全的核心模式
- **`claude_api_usage.md`**：如何集成 Anthropic 的 API 以实现 LLM 功能

---

## 🔧 模板架构

该模板提供了一个完整的、可投入生产的 MCP 服务器：

### 核心组件结构

```
src/
├── index.ts                 # 主认证 MCP 服务器
├── index_sentry.ts         # 集成 Sentry 监控的版本
├── simple-math.ts          # 基础 MCP 示例（无认证）
├── github-handler.ts       # GitHub OAuth 完整实现
├── database.ts             # PostgreSQL 数据库及安全方案
├── utils.ts                # OAuth 工具函数与辅助方法
├── workers-oauth-utils.ts  # HMAC 签名 Cookie 系统
└── tools/                  # 模块化工具注册系统
    └── register-tools.ts   # 工具集中注册模块

```

---

### 示例工具

`examples/` 文件夹展示了 MCP 工具的创建方式：

- **`database-tools.ts`** - 使用最佳实践构建的数据库工具
- **`database-tools-sentry.ts`** - 集成 Sentry 的版本

---

### 关键特性

- **🔐 GitHub OAuth**：基于角色权限的完整认证流程
- **🗄️ 数据库集成**：PostgreSQL，连接池及安全机制
- **🛠️ 模块化工具系统**：职责清晰、易于扩展
- **☁️ Cloudflare Workers**：全球边缘部署，支持 Durable Objects
- **📊 监控能力**：可选的 Sentry 监控集成
- **🧪 测试机制**：从 TypeScript 到部署的全流程验证

---

## 🚀 快速开始

### 先决条件

- 已安装 Node.js 与 npm
- 拥有 Cloudflare 账户（免费版本即可）
- GitHub 账户，用于 OAuth
- PostgreSQL 数据库（本地或托管均可）

---

### 第一步：克隆并设置项目

```bash
# 克隆上下文工程模板
git clone https://github.com/coleam00/Context-Engineering-Intro.git
cd Context-Engineering-Intro/use-cases/mcp-server

# 安装依赖
npm install

# 全局安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

```

---

### 第二步：配置环境变量

```bash
# 创建环境变量文件
cp .dev.vars.example .dev.vars

# 编辑 .dev.vars，填写以下凭据：
# - GitHub OAuth 应用凭证
# - 数据库连接字符串
# - Cookie 加密密钥

```

---

### 第三步：定义 MCP 服务器需求

编辑 `PRPs/INITIAL.md`，填写你的服务器需求：

```markdown
## 功能：
明确描述 MCP 服务器应完成的任务，包括功能性、数据来源和用户交互方式。

## 附加功能：
- 除基本 CRUD 操作外的额外功能
- 外部 API 的集成
- 其他特殊要求

## 其他考虑事项：
- 认证要求
- 性能要求
- 安全措施
- 访问频率限制

```

---

### 第四步：生成并执行 PRP

```bash
# 生成详细的 PRP
/prp-mcp-create INITIAL.md

# 执行 PRP，构建服务器
/prp-mcp-execute PRPs/your-server-name.md

```

---

### 第五步：测试并部署

```bash
# 本地测试
wrangler dev

# 使用 MCP Inspector 进行测试
npx @modelcontextprotocol/inspector@latest
# 连接地址: http://localhost:8792/mcp

# 部署到生产环境
wrangler deploy

```

---

## 🔍 关键文件解读

为了深入理解本用例，建议查看以下文件：

### 上下文工程组件

- **`PRPs/templates/prp_mcp_base.md`** - MCP PRP 模板
- **`.claude/commands/prp-mcp-create.md`** - 生成专用 PRP 的命令说明
- **`.claude/commands/prp-mcp-execute.md`** - 执行 PRP 的命令说明

---

### 实现模式

- **`src/index.ts`** - 完整的 MCP 服务器实现
- **`examples/database-tools.ts`** - 工具的创建与注册模式
- **`src/tools/register-tools.ts`** - 模块化工具注册中心

---

### 配置与部署

- **`wrangler.jsonc`** - Cloudflare Workers 配置文件
- **`.dev.vars.example`** - 环境变量示例模板
- **`CLAUDE.md`** - 实施指南与开发规范

---

## 📈 成功衡量标准

成功应用该流程后，你将实现：

- **快速实现** —— 快速构建 MCP 服务器，最小化重复迭代
- **生产就绪** —— 具备安全认证、监控、错误处理能力
- **可扩展架构** —— 模块清晰、结构解耦、职责分明
- **完整测试体系** —— 从 TypeScript 到生产部署的闭环验证

---