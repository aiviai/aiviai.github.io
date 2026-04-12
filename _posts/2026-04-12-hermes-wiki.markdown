---
layout: single
title: "🚀Hermes Agent高级玩法！微信扫码即用+LLM Wiki知识库+Obsidian图谱，AI知识管理终极方案！人人都可以打造自己的数据飞轮！复刻Andrej Karpathy工作流！保姆级教程"
sidebar:
  nav: "docs"
date: 2026-04-12 00:00:00 +0800
categories: LLMs
tags: [Hermes Agent, LLM Wiki, Obsidian, Karpathy, 微信, AI智能体, 知识库, AGI, AIGC]
classes: wide
author_profile: true
---

🔥 本期视频详细演示了Hermes Agent的两大高级功能：**个人微信原生集成**和**LLM Wiki知识库构建**。

📱 首先演示了Hermes Agent连接个人微信的完整流程——扫码登录、配对连接、私聊交互，轻松在微信中调用AI能力。

📚 重点讲解了基于Andrej Karpathy分享的LLM Wiki知识库工作流。通过深入对比传统RAG（无状态碎片检索）与LLM Wiki（有状态知识编辑），揭示了知识复利增长的核心优势。实战演示了：从ArXiv批量摄入论文 → 自动提取结构化知识 → 生成交叉引用的Wiki页面 → 在Obsidian中可视化Graph图谱 → 多Wiki无缝切换与合并。

🏗️ 详细解析了LLM Wiki的三层架构：不可变的原始来源层、Agent驱动的Wiki页面层、人机协同的进化层，真正实现"编译一次，持续更新"的数据飞轮。

---

这个适配器是针对**个人微信账号**的，使用的是腾讯的 **iLink Bot API**。它通过 HTTP 长轮询（long-polling）接收消息，因此**不需要公网端点或 Webhook**。如果你需要企业微信，请使用 WeCom 适配器。

---

## 前置条件

1. 一个个人微信账号
2. Python 包：`aiohttp` 和 `cryptography`
3. `qrcode` 包（可选，用于在终端中显示二维码）

安装依赖：

```bash
pip install aiohttp cryptography
# 可选：用于终端二维码显示
pip install qrcode
```

---

## 设置步骤

### 第一步：运行设置向导

执行以下命令：

```bash
hermes gateway setup
```

在提示中选择 **Weixin**。向导会自动完成以下操作：从 iLink Bot API 请求二维码 → 在终端显示二维码（或提供一个 URL）→ 等待你用微信手机端扫码 → 提示你在手机上确认登录 → 自动将账号凭证保存到 `~/.hermes/weixin/accounts/`。

成功后你会看到类似消息：`微信连接成功，account_id=your-account-id`

向导会自动保存 `account_id`、`token` 和 `base_url`，无需手动配置。

### 第二步：配置环境变量

QR 登录完成后，在 `~/.hermes/.env` 中至少设置 account ID：

```bash
WEIXIN_ACCOUNT_ID=your-account-id

# 可选：访问控制
WEIXIN_DM_POLICY=open
WEIXIN_ALLOWED_USERS=user_id_1,user_id_2

# 可选：定时任务/通知的主频道
WEIXIN_HOME_CHANNEL=chat_id
WEIXIN_HOME_CHANNEL_NAME=Home
```

### 第三步：启动网关

```bash
hermes gateway
```

适配器会恢复已保存的凭证，连接 iLink API，并开始长轮询接收消息。

---

## 主要功能

该适配器支持非常丰富的功能，包括：长轮询传输（无需公网端点）、二维码扫码登录、私聊和群聊消息（可配置访问策略）、媒体支持（图片/视频/文件/语音）、AES-128-ECB 加密的 CDN 媒体传输（自动加解密）、上下文 Token 持久化（重启后保持回复连续性）、Markdown 格式适配（标题/表格/代码块自动转换为微信可读格式）、智能消息分块（4000 字符以内保持单条发送）、输入中提示（"对方正在输入…"）、消息去重（5 分钟滑动窗口）以及自动重试与退避机制。

---

## 访问策略

**私聊策略（DM Policy）** 默认为 `open`（任何人可以私聊机器人），可设为 `allowlist`（仅白名单用户）、`disabled`（忽略所有私聊）或 `pairing`（配对模式）。

**群聊策略（Group Policy）** 默认为 `disabled`（忽略所有群消息，这是有意为之，因为个人微信可能在很多群中）。可设为 `open` 或 `allowlist`。

---

## 常见问题排查

- **启动失败提示缺少 aiohttp/cryptography**：执行 `pip install aiohttp cryptography`
- **提示缺少 WEIXIN_TOKEN**：重新运行 `hermes gateway setup` 完成扫码登录
- **会话过期（errcode=-14）**：重新运行 `hermes gateway setup` 扫描新二维码
- **机器人不回复私聊**：检查 `WEIXIN_DM_POLICY` 是否设为 `allowlist` 且发送者不在白名单中
- **机器人不回复群消息**：群策略默认为 `disabled`，需要设置 `WEIXIN_GROUP_POLICY=open` 或 `allowlist`
- **终端二维码无法显示**：安装 `pip install qrcode`，或使用终端上方打印的 URL 链接

整个流程非常简洁：安装依赖 → 运行 `hermes gateway setup` 扫码 → 配置环境变量 → 启动 `hermes gateway`，就可以让 Hermes Agent 通过你的个人微信收发消息了。

# Hermes Agent LLM Wiki 深度分析

> 分析日期: 2026-04-11
> 数据来源: GitHub PR #5100/#5635、Karpathy Gist、Hermes Agent 官方文档、SkillsLLM

---

## 1. 概述

LLM Wiki 是 Andrej Karpathy 于 2026 年 4 月 4 日提出的一种**持久化知识编译模式**，旨在用 LLM 增量构建和维护一个**结构化的 Markdown 知识库**，取代传统 RAG（检索增强生成）每次查询都从头发现知识的低效方式。

Hermes Agent（Nous Research 开发的自改进 AI Agent）在 PR #5100 中首次引入 LLM Wiki 作为内置 Skill，并在 PR #5635 中正式合并，成为**第一个使用全新 Skill Config 接口的技能**。

### 核心差异：LLM Wiki vs 传统 RAG

| 维度 | 传统 RAG | LLM Wiki |
| --- | --- | --- |
| 知识发现 | 每次查询重新检索 | 编译一次，持续更新 |
| 检索单元 | 原始文档片段 | 结构化 Wiki 页面 |
| 交叉引用 | 无 | 预先构建 |
| 矛盾检测 | 查询时可能发现 | 摄入时主动标记 |
| 知识积累 | 无累积效应 | 每个源使 Wiki 更丰富 |

---

## 2. 三层架构 (Three-Layer Architecture)

### 2.1 原始来源层 (Raw Sources) — 不可变

- 存放文章、论文、图片、数据文件等原始材料
- **不可变 (Immutable)** — LLM 只读不改
- 这是事实的源头 (Source of Truth)
- 建议通过 `chmod -R a-w raw/` 强制文件系统级不可变
- 位置：`~/wiki/raw/`

### 2.2 Wiki 页面层 (Wiki Pages) — Agent 拥有

- LLM 完全拥有和维护的 Markdown 文件目录
- 包含：摘要页面、实体页面、概念页面、比较页面、综述、综合分析
- LLM 创建页面、更新内容、维护交叉引用、保持一致性
- 人类阅读，LLM 编写
- 使用 YAML frontmatter 进行搜索和过滤
- 使用 `[[wikilink]]` 进行交叉引用
- 位置：`~/wiki/wiki/`

### 2.3 Schema 配置层 (Schema Config) — 协同进化

- 一个告诉 LLM Wiki 结构和约定的文档（如 `SCHEMA.md`）
- 定义工作流程：摄入源、回答问题、维护 Wiki
- 将 LLM 从通用聊天机器人变为纪律严明的 Wiki 维护者
- 人类和 LLM 共同演化
- 位置：`~/wiki/SCHEMA.md`

---

## 3. 三大核心操作 (Three Core Operations)

### 3.1 Ingest（摄入）

**流程步骤：**

1. 用户将新源丢入 `raw/` 目录
2. LLM 读取源文档
3. 与用户讨论关键要点
4. 在 Wiki 中写入摘要页面
5. 更新 `index.md`
6. 更新相关实体和概念页面（一次摄入可能触及 10-15 个 Wiki 页面）
7. 追加 `log.md` 条目
8. **重要**：当更新超过 10 个页面时，先询问再批量更新

**Hermes 增强特性：**

- Session 导向：每次会话开始时读取 `index.md` 定位
- Tag 分类法 (Tag Taxonomy)
- 更新策略 (Update Policy)
- 扩展指导 (Scaling Guidance)
- 日志轮转 (Log Rotation)
- 归档工作流 (Archiving Workflow)

### 3.2 Query（查询）

**流程步骤：**

1. 用户提出查询问题
2. LLM 读取 `index.md` 找到相关页面
3. 深入读取相关页面
4. 从已编译知识中综合答案（带引用）
5. 答案可以是多种格式：Markdown 页面、比较表、幻灯片、图表
6. **关键洞察**：好的答案应被归档回 Wiki 作为新页面
7. 探索成果像摄入源一样在知识库中复利增长

### 3.3 Lint（健康检查）

**检查维度（Hermes 实现 8 类检查）：**

1. 孤立页面 (Orphan Pages) — 无入链的页面
2. 死链 (Dead Wikilinks) — 指向不存在页面的链接
3. 矛盾检测 (Contradictions) — 页面间冲突的声明
4. 缺失页面 (Missing Pages) — 被提及但未创建的概念
5. 未链接提及 (Unlinked Mentions) — 提到但未建立链接的实体
6. 不完整元数据 (Incomplete Metadata) — frontmatter 缺失字段
7. 空白段落 (Empty Sections) — 内容不完整的页面
8. 过期索引 (Stale Index) — `index.md` 与实际内容不一致

---

## 4. 导航与索引系统

### 4.1 index.md — 内容导向

- Wiki 中所有内容的目录
- 每个页面含：链接、一行摘要、可选元数据（日期、源数量）
- 按类别组织（实体、概念、来源等）
- LLM 每次摄入时更新
- 查询时 LLM 先读 index 再定位相关页面
- 在中等规模（约 100 个源、数百个页面）下效果很好

### 4.2 log.md — 时间线导向

- 追加式的事件记录
- 格式：`## [YYYY-MM-DD] action | subject`
- 可用 Unix 工具解析：`grep "^## \[" log.md | tail -5`
- 记录：摄入、查询、Lint 操作
- 帮助 LLM 理解最近发生了什么

### 4.3 hot.md — 热缓存（Hermes 增强）

- 约 500 词的会话上下文持久化
- 消除"我们上次聊到哪里了？"的重新解释问题
- 占用不到 0.25% 的上下文窗口
- 每次会话节省 2-3K token 的重新解释

---

## 5. Hermes Agent 集成细节

### 5.1 Skill Config 接口

LLM Wiki 是第一个使用 Hermes 新 Skill Config 接口的技能：

```yaml
# config.yaml
skills:
  config:
    wiki:
      path: ~/wiki  # LLM Wiki 路径
```

**实现组件：**

- `agent/skill_utils.py`: `extract_skill_config_vars()`, `discover_all_skill_config_vars()`, `resolve_skill_config_values()`, `SKILL_CONFIG_PREFIX`
- `agent/skill_commands.py`: `_inject_skill_config()` — 将配置注入技能上下文
- `hermes_cli/config.py`: `get_missing_skill_config_vars()`, `migrate_config()`, `show_config()`

### 5.2 可配置项

- 通过 `wiki.path` 配置 Wiki 存储路径
- 默认路径：`~/wiki`
- 通过 `hermes config migrate` 扫描并提示配置
- 通过 `hermes config show` 显示所有技能配置

### 5.3 与 Hermes 记忆系统的协作

- Hermes 自身的 MEMORY.md / USER.md 用于短期交互记忆
- LLM Wiki 用于长期领域知识编译
- FTS5 跨会话搜索与 LLM 摘要互补
- Honcho 用户建模提供用户偏好上下文

---

## 6. 使用场景

### 6.1 研究深潜

- 数周/数月阅读论文、文章、报告
- 增量构建综合 Wiki，形成演进论述
- 用 `lint` 发现知识空白并指导下一步阅读

### 6.2 读书笔记

- 按章节归档
- 构建角色页面、主题页面、情节线索页面
- 类似 Tolkien Gateway 级别的个人读书 Wiki

### 6.3 商业/团队知识库

- 摄入 Slack 对话、会议记录、项目文档、客户电话
- LLM 做人类不想做的维护工作
- 通过 Hermes Gateway 跨 15+ 平台自动化

### 6.4 竞争分析与尽职调查

- 长期追踪公司、市场、技术
- 交叉引用多源信息
- 自动标记矛盾与过期信息

### 6.5 个人知识管理

- 追踪目标、健康、心理、自我提升
- 归档日记、文章、播客笔记
- 构建结构化的自我认知画像

---

## 7. Obsidian 集成

- Wiki 目录直接作为 Obsidian Vault 使用
- 使用 Obsidian Graph View 查看知识结构
- Obsidian Web Clipper 快速将网页文章转为 Markdown
- Dataview 插件查询 YAML frontmatter
- Marp 插件直接从 Wiki 内容生成演示文稿
- Wiki 本身是 Git 仓库 — 免费版本历史

---

## 8. 扩展生态

### 8.1 社区实现

- **SwarmVault**: 50+ 格式支持、混合搜索、commit-on-write
- **agent-wiki**: Python 工具包、链接感知移动/合并、PDF 转 Markdown
- **knowledge-pipline**: BFS 推理链、知识图谱、Louvain 社区检测
- **Cortex**: OWL-RL 本体、Oxigraph SPARQL + SQLite FTS5
- **ΩmegaWiki**: 北京大学团队的全生命周期研究平台

### 8.2 CLI 工具

- **qmd**: 本地 Markdown 搜索引擎、BM25/向量混合搜索、LLM 重排
- 支持 CLI 和 MCP Server 两种接入方式

---

## 9. 设计哲学

Karpathy 将此理念追溯到 Vannevar Bush 的 Memex (1945)：

- 个人化、主动策展的知识存储
- 文档间的关联和通道与文档本身同等重要
- Bush 无法解决的部分 — 谁来维护 — LLM 解决了这一问题

> "人类的工作是策展来源、指导分析、提出好问题、思考这一切的意义。LLM 的工作是其他一切。"
> — Andrej Karpathy

---

## 10. 已知局限与解决方案

| 局限 | 解决方案 |
| --- | --- |
| raw/ 不可变仅是口头约定 | `chmod -R a-w raw/` 文件系统强制 |
| log.md 格式漂移 | 宽松正则 + 格式修复指导 |
| search_files 工具名可能不匹配 | 运行时工具名验证 |
| Schema 迁移路径 | Lint 检查 frontmatter 与当前 SCHEMA 一致性 |
| 大规模更新风险 | 10+ 页面阈值，先确认再批量更新 |
| 知识规模增长后的检索效率 | qmd 混合搜索引擎 |
| 持久化错误复合传播 | 矛盾标记 `[!contradiction]` + 定期 Lint |
