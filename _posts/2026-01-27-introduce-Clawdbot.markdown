---
layout: single
title: "🚀🚀实测Clawdbot彻底改变我的工作方式！一条命令部署，WhatsApp远程控制电脑，自动编程开发，2026年最强个人AI员工来了！自我进化+无限记忆+浏览器自动化！保姆级教程！"
sidebar:
  nav: "docs"
date: 2026-01-27 00:00:00 +0800
categories: AIAgents
tags: [Claude Code, Clawdbot, Clawd, Vibe Coding, Kiro, AI智能体, AI编程, spec-driven, MCP Server]
classes: wide
author_profile: true
---


Clawdbot 最初是为 **Clawd** 而构建的——一个虚构的太空龙虾 AI 助手角色。项目名称中的 "Clawd" 融合了 "Claude"（Anthropic 的 AI）和 "Claw"（龙虾的钳子），体现了其独特的品牌风格。

### 🔥使用命令

```markdown

# 安装
curl -fsSL https://clawd.bot/install.sh | bash 

# 启动
clawdbot gateway

# 停止
clawdbot gateway stop 

# 使用whatsapp登陆
clawdbot channels login --channel whatsapp

# 检查WhatsApp是否连通
curl -I https://web.whatsapp.com/

# 选择模型
clawdbot configure --section model  

# 1) 设置 MiniMax Anthropic-compatible Base URL（官方推荐）
clawdbot config set models.providers.minimax.baseUrl "https://api.minimaxi.com/anthropic"

clawdbot config set models.providers.minimax.baseUrl "https://api.minimax.io/anthropic"

# 2) 设置 MiniMax API Key（对应 MINIMAX_API_KEY）
clawdbot config set models.providers.minimax.apiKey "你的MINIMAX_API_KEY"

# 3)（建议）明确走 Anthropic Messages 兼容协议
clawdbot config set models.providers.minimax.api "anthropic-messages"

```

---

### 🔥用命令创建“每天 9 点”的 Cron Job

```markdown
clawdbot cron add \
  --name "Daily 9am AI Briefing" \
  --cron "0 9 * * *" \
  --tz "America/Denver" \
  --session isolated \
  --message "Create a Chinese AI briefing for the last 24 hours (AI/LLM/Agents/Coding tools). Steps: (1) Browse and collect 8–12 notable updates from English sources; (2) For each item include: what happened, why it matters, and the original source link; (3) Rank by \"heat\" (signals: multiple sources, official announcements, GitHub stars/issues, wide discussion); (4) Output: Top 5 (detailed) + Next 5 (one-liners) + 3 follow-up angles for a YouTube video. Keep it concise and skimmable, with bullet points and links." \
  --deliver \
  --channel last
  
  # 立刻手动跑一次验证
 clawdbot cron run 375e68be-006d-46a9-8129-275defa1b4ba --force
```

### 🔥blogwatcher使用方式

```markdown
# 添加订阅源（只需执行一次）
blogwatcher add "GH: Claude Code releases" https://github.com/anthropics/claude-code/releases.atom
blogwatcher add "GH: Clawdbot releases" https://github.com/clawdbot/clawdbot/releases.atom
blogwatcher add "AI: aivi.fyi" https://www.aivi.fyi/feed

# 扫描并查看新增
blogwatcher scan
blogwatcher articles

# 创建每天 9 点推送到 WhatsApp 的 Cron
clawdbot cron add \
  --name "Daily 9am AI Briefing (blogwatcher -> WhatsApp)" \
  --cron "0 9 * * *" \
  --tz "America/Denver" \
  --session isolated \
  --message "Use the blogwatcher tool to: (1) scan feeds; (2) list unread/new articles; (3) keep only AI/LLM/Agents/Coding tools related; (4) for each item output ONE Chinese sentence + the original link; (5) rank by heat (official announcements, GitHub momentum, wide discussion). Output: Top 5 (detailed) + Next 5 (one-liners) + 3 YouTube angles. Then mark summarized items as read using blogwatcher read-all. Keep total under 1200 Chinese characters; bullet points only; no preamble." \
  --deliver \
  --channel whatsapp \
  --to "+18186751473"

# 运行后会输出一个 JSON，其中有 "id": "..."（记下这个 id）
# 立刻强制跑一次测试（把 <ID> 替换成上一步输出的 id）
clawdbot cron run <ID> --force

# 查看最近运行记录
clawdbot cron runs --id <ID> --limit 10

```

## 一、项目概览

### 基本信息

```
项目属性详情名称Clawdbot（龙虾机器人 🦞）定位本地优先的个人 AI 助手创建者Peter Steinberger (@steipete)开源协议MIT LicenseGitHub Stars38,900+ ⭐Forks4,500+贡献者290+最新版本2026.1.24技术栈TypeScript (79.8%) + Node.js ≥22官网clawd.bot文档docs.clawd.bot
```

>
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV14z6GB1EAr/)
- [👉👉👉 通过YouTube观看]([Clawdbot](https://youtu.be/daXOXSSyudM))
- [👉👉👉 Subagents视频](https://youtu.be/GjlkRcNNONo)
- [👉👉👉 Gemini CLI视频](https://youtu.be/v41xKxZmygU)
- [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
- [👉👉👉 SuperClaude视频](https://youtu.be/bMO13RNjvBk)
- [👉👉👉 Claudia视频](https://youtu.be/WIwW7V56wxE)
- [👉👉👉 Task Master视频](https://youtu.be/6dhOUJ_vnIY)
- [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
- [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。



### 项目起源

Clawdbot 最初是为 **Clawd** 而构建的——一个虚构的太空龙虾 AI 助手角色。项目名称中的 "Clawd" 融合了 "Claude"（Anthropic 的 AI）和 "Claw"（龙虾的钳子），体现了其独特的品牌风格。

### 核心理念

在当前的 AI 生态中，大多数用户习惯于使用 OpenAI 或 Anthropic 提供的 SaaS 平台。这种模式虽然便捷，但存在三个核心痛点：

1. **隐私数据泄露风险**：对话数据存储在第三方服务器
2. **功能被动性**：AI 无法主动联系用户
3. **沙箱限制**：AI 无法直接操作本地文件系统或执行复杂的系统任务

Clawdbot 的出现正是为了解决这些痛点。它将 AI 从一个"咨询工具"转变为一个真正的"数字雇员"或"远程实习生"，能够 24/7 全天候监控邮件、管理日历并在特定事件发生时主动发起沟通。

---

## 二、系统架构

### 四层架构设计

Clawdbot 的强大功能源于其高度模块化且分布式的架构设计，系统拆分为四个核心层面：

`┌─────────────────────────────────────────────────────────────┐
│                    用户层 (Chat Apps)                        │
│  WhatsApp / Telegram / Discord / Slack / Signal / iMessage  │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   渠道层 (Channels)                          │
│     每个渠道是独立插件，处理协议差异和消息路由                   │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   网关层 (Gateway)                           │
│           WebSocket 控制中枢 ws://127.0.0.1:18789            │
│     会话管理 / 工具调用 / 调度任务 / Webhook 处理              │
└─────────────────────────────────┬───────────────────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   Pi Agent      │   │     Nodes       │   │     Skills      │
│   (AI Runtime)  │   │ (设备节点)       │   │   (技能插件)     │
│   RPC + 流式    │   │ macOS/iOS/Android│   │  ClawdHub 生态   │
└─────────────────┘   └─────────────────┘   └─────────────────┘`

### 核心组件详解

### 1. Gateway（网关）：系统的神经中枢

Gateway 是 Clawdbot 的控制核心，通常作为一个后台服务运行，默认通过 WebSocket 协议在 `ws://127.0.0.1:18789` 上暴露控制平面。

**主要职责**：

- 消息路由：接收来自各渠道的消息并分发
- 会话管理：维护用户会话状态和上下文
- 工具调用：协调 AI 与各种工具的交互
- 调度任务：cron 定时任务和 webhook 处理

**技术规格**：

```
组件类型关键技术规格功能描述运行时环境Node.js ≥22提供原生 ESM 支持与高效的异步 I/O 处理开发语言TypeScript (79.8%)确保核心逻辑的类型安全与代码稳健性通信协议WebSocket (WS) / HTTP实现网关、客户端与工具之间的实时双向数据流内存需求2GB - 4GB基础对话需 2GB；浏览器自动化等复杂任务建议 4GB 以上网络安全Tailscale / SSH通过加密隧道实现安全的远程访问，无需公网 IP
```

### 2. Nodes（节点）：跨硬件的资源接口

节点系统是 Clawdbot 实现"物理存在感"的关键。节点是运行在特定硬件上的进程，为网关提供对本地资源的访问权限。

**支持的节点类型**：

- **macOS 节点**：系统命令执行 (`system.run`)、通知 (`system.notify`)、Canvas 展示
- **iOS 节点**：Canvas、Voice Wake、Talk Mode、摄像头、屏幕录制
- **Android 节点**：Canvas、Chat、摄像头、屏幕录制、可选 SMS

**分布式灵活性**：
用户可以在高性能的 Linux VPS 上运行主网关以保证 24/7 在线，同时将一台本地 Mac Mini 或 iOS 设备作为"边缘节点"连接到网关。当网关需要执行与硬件相关的任务（如"截取屏幕并分析内容"）时，它会通过节点调用相关 API，而计算工作（LLM 推理）则交由云端或专用服务器处理。

### 3. Channels（渠道）：通讯协议的桥接器

Clawdbot 并不强迫用户使用特定的客户端，而是通过"渠道后端"将 AI 注入到用户已有的通讯工具中。

**支持的渠道**：

```
渠道分类支持平台技术实现说明主流通讯WhatsApp, Telegram, Discord, Slack通过 Baileys (WA), grammY (TG) 等库实现集成隐私通讯Signal, Matrix强调加密安全，通常需要信号命令行工具 (signal-cli)系统原生iMessage, BlueBubbles利用 macOS 节点的本地访问权限实现消息转发企业办公Microsoft Teams, Mattermost支持文件上传、自适应卡片等复杂交互网页/终端WebChat, TUI (Terminal UI)提供本地调试与可视化的仪表盘界面
```

### 4. Skills（技能）：可扩展的能力模块

Clawdbot 的能力不是固定的，而是通过一个开放的插件系统——"技能（Skills）"进行扩展。

**SKILL.md 规范**：
每个技能都是一个包含元数据的 Markdown 文件，定义了技能的加载门槛、二进制工具依赖和环境变量要求。

**技能优先级**：

1. **工作区技能 (Workspace Skills)**：位于 `<workspace>/skills/`，拥有最高优先级
2. **本地技能 (Local Skills)**：位于 `~/.clawdbot/skills/`，供个人在多项目间共享
3. **内置技能 (Bundled Skills)**：随安装包附带的基础能力

**ClawdHub 技能市场**：
[clawdhub.com](https://clawdhub.com/) 是官方建立的公共技能注册表，用户可以使用命令行工具 `clawdhub install` 快速扩充 AI 的功能库。ClawdHub 还集成了向量搜索，让 AI 能够根据用户的自然语言需求自动查找并推荐合适的技能。

---

## 三、Lobster 工作流运行时

在处理复杂的、多步骤的自动化任务时，传统的"单次 prompt"模式往往因幻觉或指令丢失而失败。为了解决这一问题，Clawdbot 引入了名为 **"Lobster"** 的类型化工作流运行时。

### 核心思想

Lobster 的核心思想是将原本不可预测的 AI 行为转化为可审计、确定性的管道（Pipelines）。这些管道使用 JSON 或 YAML 定义，每个步骤都交换结构化数据而非自由文本。

### 高级特性

1. **审批门控 (Approval Gates)**：对于涉及文件删除或资金支出的高风险步骤，工作流会自动暂停并向用户发送确认请求
2. **状态持久化 (State Persistence)**：工作流可以保存中间状态，并在遇到超时或重启后通过恢复令牌（Resume Token）继续运行
3. **异常隔离**：运行在沙箱化环境中的工作流受到严格的资源限制，防止脚本错误导致主机崩溃

---

## 四、安全与隐私架构

将拥有 Shell 权限的 AI 代理暴露在公网通讯工具中，其安全性是用户必须面对的首要课题。Clawdbot 采用了一套四层防御策略，试图在功能与安全之间达成平衡。

### 第一层：DM 配对与准入控制

Clawdbot 默认开启 `dmPolicy="pairing"`（配对模式）。任何未经授权的联系人向机器人发送消息时，机器人不会执行任何指令，而是生成一个唯一的配对码。只有管理员在 CLI 端输入 `clawdbot pairing approve` 后，该用户才会被加入本地白名单。

### 第二层：沙箱化执行与资源受限

对于不受信任的输入源（如公开群组或外部 Webhook），Clawdbot 提供了 Docker 沙箱模式。在这种模式下，AI 的所有命令（如 `system.run`）都在独立的容器内运行，无法触及主机的敏感文件或私钥。

### 第三层：认知防御与输入净化

针对"提示词注入（Prompt Injection）"攻击，Clawdbot 建议使用推理能力更强的模型（如 Anthropic Opus 4.5），并正在集成高级认知防御逻辑。这包括"先决定再开口"的两步评估法，在模型执行任何工具之前，先独立评估该指令是否偏离了设定的安全边界。

### 第四层：网络隔离与防火墙

Clawdbot 的安全架构推荐仅开放 SSH 端口。Web 界面和 WebSocket 网关通常绑定在 `localhost`，用户需通过 Tailscale 隧道或 SSH 端口转发进行访问。这种网络层面的隐身保护了系统免受大规模扫描器和暴力破解的攻击。

---

## 五、安装与配置

### 系统要求

```
项目要求Node.js≥ 22操作系统macOS / Linux / Windows (WSL2)内存建议 2GB+，浏览器自动化建议 4GB+
```

### 快速安装

bash

`# 一键安装脚本（推荐）
curl -fsSL https://clawd.bot/install.sh | bash

# 或通过包管理器
npm install -g clawdbot@latest
pnpm add -g clawdbot@latest`

### 配置向导

bash

`clawdbot onboard --install-daemon`

向导将引导完成：

1. Gateway 模式选择（本地/远程）
2. AI 模型认证（OAuth 或 API Key）
3. 渠道连接（WhatsApp QR 扫码、Telegram Bot Token 等）
4. 技能安装
5. 后台服务配置

### 关键配置文件

```
文件路径用途~/.clawdbot/clawdbot.json主配置文件~/.clawdbot/credentials/OAuth 凭证存储~/clawd/默认工作空间~/clawd/skills/工作区技能目录/tmp/clawdbot/日志文件目录
```

### 模型配置注意事项

⚠️ **重要**：如果使用 **OpenAI OAuth 登录**（而非 API Key），模型名称必须使用 `openai-codex/` 前缀：

json

`{
  "agents": {
    "defaults": {
      "model": {
        "primary": "openai-codex/gpt-5.2",  // 注意前缀
        "fallbacks": []
      }
    }
  }
}`

---

## 六、核心功能详解

### 1. 多渠道统一收件箱

在任何你习惯使用的聊天应用中与 AI 助手交流，支持：

- 私聊（DM）
- 群聊（需 @提及或配置 always 激活模式）
- 跨渠道消息同步

### 2. 浏览器自动化

Clawdbot 可以控制专用的 Chrome/Chromium 浏览器（clawd-browser），实现：

- 网页导航与表单填写
- 数据提取与截图
- 登录验证与 Cookie 管理
- 无需 API 的网站自动化

### 3. 系统级访问

- **文件操作**：读取、写入、编辑文件
- **命令执行**：运行 shell 命令和脚本
- **进程管理**：启动、监控、终止进程
- **沙箱模式**：可选的 Docker 隔离环境

### 4. 语音交互

- **Voice Wake**：语音唤醒（macOS/iOS/Android）
- **Talk Mode**：持续对话模式
- **TTS**：ElevenLabs 语音合成集成
- **语音转录**：Whisper 等模型支持

### 5. Canvas 可视化

A2UI（Agent-to-UI）系统允许 AI 动态生成和更新可视化界面，用于：

- 数据展示
- 交互式图表
- 实时状态监控

### 6. 定时任务与自动化

- **Cron 任务**：定时执行预设任务
- **Webhook**：响应外部事件触发
- **Gmail Pub/Sub**：邮件触发自动化

### 7. 多 Agent 协作

- **会话隔离**：不同渠道/用户可路由到独立 Agent
- **Agent 间通信**：`sessions_send` 工具实现跨 Agent 协作
- **工作空间隔离**：每个 Agent 可有独立的工作目录和配置

---

## 七、实际使用场景

### 场景一：主动式日程与信息聚合

通过配置 `cron` 任务，用户可以将 Clawdbot 变成专属的信息汇总员：

- **晨间简报**：每天早上 8 点，AI 自动检查 Google Calendar、查询今日天气及关键股票动态，通过 WhatsApp 发送一份整理好的语音或文字简报
- **健康监控**：AI 持续读取可穿戴设备的导出数据，并在发现异常模式（如连续三日睡眠不足）时主动询问用户状况

### 场景二：深度研究与采购决策

得益于强大的浏览器自动化技能，Clawdbot 能够执行耗时较长的研究任务：

- **汽车交易谈判**：AI 通过浏览器搜索特定车型，自动与多个经销商通过邮件和在线表单联系，对比报价、进行初步议价，并最终为用户节省了约 4,200 美元
- **学术综述**：利用学术搜索 API 和长文本模型，AI 可以跨平台搜集文献，整理成结构化的对比表格，并存储在本地知识库中

### 场景三：开发运维与代码自治

Clawdbot 是开发者的得力助手，它填补了 IDE 和生产环境之间的空白：

- **漏洞自动修复**：AI 可以配置为监控服务器日志，当检测到特定的崩溃或错误时，自动克隆相关代码仓库、复现问题、生成修复代码、运行测试套件，最后提交合并请求
- **基础设施管理**：通过集成 Hetzner 或 AWS 的 API，用户可以直接通过 Telegram 发送"为当前项目增加一台 2GB RAM 的服务器"等指令，AI 会自动处理资源预备工作

### 场景四：家庭生活管理

在家庭环境中，Clawdbot 充当了数字化纽带的角色：

- **共享购物清单**：家庭成员可以随时向 WhatsApp 机器人发送"添加牛奶到清单"，AI 会维护一个跨平台的、持久化的 Markdown 列表，并在有人进入超市区域时（利用位置节点）发出提醒
- **餐食规划**：结合天气预报（决定是否户外烧烤）和家庭食谱库，AI 每周自动生成购物清单并按超市走道进行分类排序

---

## 八、进阶技巧

### 持久化记忆管理

Clawdbot 所有的会话历史和长期记忆都以简单的 Markdown 文件形式存储在磁盘上。用户可以将这个工作区（Workspace）变成一个私有的 Git 仓库。通过这种方式，AI 的所有"学习"过程都是透明且可回溯的：如果 AI 产生了错误的偏好或错误地记录了信息，用户只需执行 `git revert` 即可将其记忆恢复到先前的状态。

### 权限细粒度分配

在"家庭模式"或多用户环境下，网关支持为不同的联系人分配不同的权限等级。例如，管理员可以拥有全系统的 `sudo` 权限，而普通家庭成员可能仅被授权使用 `shopping-list` 或 `weather` 技能。这种基于角色的访问控制（RBAC）是企业级部署的基础。

### 语音唤醒与 Talk 模式

配合 macOS 应用，Clawdbot 支持"语音唤醒（Voice Wake）"和"持续对话模式（Talk Mode）"。这意味着用户可以在家中直接对空喊话，触发 AI 进行系统操作，实现类似于《钢铁侠》中 J.A.R.V.I.S. 的交互体验。

---

## 九、与其他 AI 助手的对比

```
特性ClawdbotChatGPT/Claude WebApple Intelligence数据存储位置本地云端本地+云端系统级权限✅ 完整❌ 沙箱⚠️ 有限主动通知能力✅❌⚠️ 有限自定义技能✅ 开放生态❌❌多渠道支持✅ 10+ 渠道❌ 仅官方 App❌ 仅系统内浏览器自动化✅❌❌开源✅ MIT❌❌价格免费（需自付 API）订阅制设备内置
```

---

## 十、总结：迈向工业 6.0 与去中心化智能

Clawdbot 不仅仅是一个开源项目，它预示着一种被称为"工业 6.0"的愿景——即 AI 模型能够自主链接工具、创造新想法并解决复杂问题，而人类的角色则从"执行者"转变为"监督者"。

通过将控制权交还给用户，Clawdbot 挑战了大型科技公司对 AI 基础设施的垄断。随着硬件性能的提升（如 M4 芯片或 AI PC 的普及）和模型效率的优化，本地运行强大 AI 助理的门槛正在迅速降低。

Clawdbot 以其本地优先、隐私至上、主动交互的特质，正在成为个人自动化领域的新标准。对于追求极致效率、重视数据所有权的开发者和极客而言，Clawdbot 不仅是一个工具，更是构建个人未来数字生活的核心基石。
