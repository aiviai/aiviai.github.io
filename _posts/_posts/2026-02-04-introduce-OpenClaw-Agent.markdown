---
layout: single
title: "🚀🚀OpenClaw/Moltbot自动进化技巧分享！打造全自动智能超级助手，彻底解放双手，让AI越用越聪明！能自动学习避坑！OpenClaw自动操控Claude Code，全程零干预实现规格驱动开发"
sidebar:
  nav: "docs"
date: 2026-02-04 00:00:00 +0800
categories: AIAgents
tags: [Claude Code, Clawdbot, Clawd, moltbook, MoltBot, AI智能体, AI编程, spec-driven, OpenClaw]
classes: wide
author_profile: true
---

你有没有遇到过这种情况——

你在工作群里让 AI 助手画一张海报。它画完了，但你切回私聊想让它帮你做深度分析，结果发现它「变傻了」。

不是模型降级了，而是它的上下文窗口里，塞满了刚才群聊产生的工具调用日志、图片编码数据、还有群友发的各种无关消息。

你花大价钱买的顶级推理模型，一半的算力都在「消化垃圾」。

**更要命的是**——你精心调教的 AI 人设，在不同群组里开始「人格分裂」。

这不是模型的问题，是架构的问题。

**而 OpenClaw 的 Multi-Agent 架构，就是为了从根本上解决这个问题而设计的。**


>
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV17B61BxE3h/)
- [👉👉👉 通过YouTube观看](https://youtu.be/masJoPqT-6A)
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


### Antigravity命令

```markdown

openclaw plugins enable google-antigravity-auth

openclaw models auth login --provider google-antigravity --set-default

```

# **Moltbook Agent 配置**

## **1. Agent 定义 (`agents.list`)**

```json
{
  "id": "moltbook",
  "name": "Moltbook Agent",
  "workspace": "/home/ubuntu/clawd-moltbook",
  "model": {
    "primary": "google-antigravity/gemini-3-flash"
  },
  "identity": {
    "name": "Moltbook",
    "emoji": "📚"
  }
}

```

## **2. 群组绑定 (`bindings`)**

```json
{
  "agentId": "moltbook",
  "match": {
    "channel": "telegram",
    "peer": {
      "kind": "group",
      "id": "-5179044854"
    }
  }
}

```





## 01 先说说没用 OpenClaw Multi-Agent 之前有多痛

我总结了七个真实踩过的坑。如果你也在用 AI Bot，大概率中过招。

**🔴 痛点一：上下文窗口被严重污染**

你在 A 群让 AI 生成了一张图。生成过程中产生的 tool call 输出、轮询日志、base64 图片数据——这些全部留在了 session 里。

然后你在 B 群想做一个深度技术分析。模型的上下文窗口里，有一大半是 A 群的「残留物」。

你以为模型在 100% 专注地处理你的问题，实际上它只用了 40% 的注意力——剩下的都被垃圾信息占了。

**🔴 痛点二：成本完全失控**

画一张图需要最强的推理模型吗？不需要。写一篇文章需要最强的推理模型吗？也不需要。

但如果你只有一个 Agent，所有任务都会用同一个模型。20 轮头脑风暴、5 张图片生成、3 篇文章——全部在烧最贵的 token。

一个月下来你会发现：**80% 的费用花在了 20% 的低价值任务上。**

**🔴 痛点三：System Prompt 变成一锅粥**

私聊场景：「像朋友一样聊天，可以开玩笑。」

图片生成场景：「禁止闲聊，收到请求立即执行。」

代码开发场景：「先规划后执行，必须说明修改理由。」

这三条指令全塞在同一个 System Prompt 里，模型该听哪条？答案是——哪条都执行得不彻底。

**🔴 痛点四：记忆互相串台**

你在一个群里聊了 30 轮项目技术选型。这些对话全部写进了 AI 的记忆。下次你在另一个完全无关的场景里提问，模型可能莫名其妙地把那个项目方案带进来——因为在它的记忆系统里，「都是你说过的话」，它分不清场景。

**🔴 痛点五：故障互相传染**

某个群里有人发了一条触发异常的消息，Agent 进入了异常状态。如果只有一个 Agent，这个故障会直接影响你在所有场景中的使用。

**🔴 痛点六：工具权限无法隔离**

图片生成只需要「执行脚本」和「发送消息」两个权限。但它和主 Agent 共用一套工具配置，意味着群聊里任何人的任何一条消息，理论上都能触发高权限操作。

**🔴 痛点七：无法为不同任务选最合适的模型**

深度推理需要 Opus，图片生成 Gemini 更擅长，日常写作 Flash 级别就够了。但单 Agent 只能选一个。

**以上所有痛点，OpenClaw 用一套 Multi-Agent 架构全部解决了。**

---

## 02 OpenClaw 的解决方案：一个入口，多个大脑

OpenClaw 是一个开源的 AI Bot 框架，它最核心的能力之一就是 **Multi-Agent 架构**——你可以在一个 Bot 里创建多个完全独立的 Agent，每个 Agent 绑定到不同的群组。

核心思路是这样的：

> 用户看到的还是同一个 AI 助手——头像、名字、入口都不变。
> 
> 
> 但在后台，OpenClaw 的 Gateway 会根据消息来源（哪个群组、是私聊还是群聊）**自动路由**到对应的 Agent。
> 
> 每个 Agent 有自己的模型、指令、会话、记忆。互不干扰。
> 

打个比方：**就像一个公司的前台，外面看是同一个公司，但你找法务和找设计是不同的人来对接你。**

这是我用 OpenClaw 搭建的实际配置——

| Agent | 用途 | 模型 | 绑定群组 |
| --- | --- | --- | --- |
| 🦞 主助手 | 私聊深度推理 | Claude Opus Thinking | 私聊 + 默认 |
| 🍌 图像生成 | AI 绘图 | Gemini 3 Pro | 图片群 |
| 🧠 头脑风暴 | 项目规划 | Claude Sonnet Thinking | 策划群 |
| 💻 代码开发 | 编程任务 | Claude Sonnet Thinking | 开发群 |
| ✍️ 文章写手 | 公众号写作 | Gemini Flash | 写作群 |

五个 Agent，五种模型配置，五套独立指令。**用户体验零变化**——还是在对应的群里发消息就行。但后台的架构完全不同了。

---

## 03 OpenClaw Multi-Agent 的七大优势

### ✅ 优势一：上下文窗口永远纯净

这是 OpenClaw Multi-Agent 最直观的价值。

图片群里生成了 10 张图，策划群里头脑风暴了 30 轮，写作群里输出了 3000 字文章。

**这些内容一个字都不会出现在主助手的上下文里。**

你的 Opus Thinking 模型，每一个 token 都在处理真正重要的问题。零噪音、零污染。

同样的模型、同样的价格，**你得到了远比以前更高质量的回答。**

### ✅ 优势二：成本精细控制

OpenClaw 支持为每个 Agent 配置不同的模型。这意味着你可以精确地把预算分配到最需要的地方：

| 任务 | OpenClaw 配置 | 相对成本 |
| --- | --- | --- |
| 深度推理 | Claude Opus Thinking | $$$$$ |
| 代码开发 | Claude Sonnet Thinking | $$$ |
| 图片生成 | Gemini 3 Pro | $$ |
| 日常写作 | Gemini Flash | $ |

实际测算下来，**同样的使用频率，OpenClaw 多 Agent 方案的总成本大约是单 Agent 方案的 30%–50%。**

### ✅ 优势三：Prompt 极度专注

在 OpenClaw 里，每个 Agent 都有自己独立的 `systemPrompt`。

我的图像生成 Agent 的指令只有四步：生成 → 等待 → 发送 → 确认。

就这么简单。没有多余的人格设定、聊天许可或其他工具描述。**模型只需要做一件事，所以它做得非常好。**

OpenClaw 让你可以为每个场景写最精简、最专注的 Prompt，而不是把所有指令堆成一座山。

### ✅ 优势四：安全边界清晰

OpenClaw 的每个 Agent 可以独立配置工具权限。

图像生成 Agent 只开放 `exec` 和 `message`。代码开发 Agent 开放 `read`、`write`、`bash`。文章写手 Agent 只需要文本输出。

**群聊里任何消息都不可能触发它不该有的权限。** 这在多人场景中至关重要。

### ✅ 优势五：故障完全隔离

图像生成 Agent 崩溃了？主助手照常工作。某个群的 session 损坏了？只影响那一个 Agent。

OpenClaw 的每个 Agent 都是独立的沙盒。**就像微服务架构对比单体应用——故障边界越清晰，系统整体可靠性越高。**

### ✅ 优势六：记忆物理隔离

这是 OpenClaw 架构中最容易被忽视但极其关键的设计。

OpenClaw 的记忆隔离覆盖**六个层面**——

1. **Markdown 记忆源文件** — 每个 Agent 独立的 MEMORY.md
2. **SQLite 向量索引** — 按 agentId 独立的 .sqlite 数据库
3. **Session 会话日志** — agents/{agentId}/sessions/ 完全分离
4. **QMD 引擎** — 按 agentId 的 XDG 目录隔离
5. **memory_search 工具** — 运行时只检索自己的索引
6. **上下文压缩前刷写** — 只写入自己的工作空间

头脑风暴 Agent 记住的项目方案，**绝对不会**泄露到主助手的私聊记忆里。

**这不是逻辑隔离，是物理隔离——不同 Agent 的记忆存储在不同的数据库文件里。**

### ✅ 优势七：可独立演进

下周出了更强的图像模型？在 OpenClaw 里只需要改图像 Agent 的 model 字段，其他 Agent 完全不动。

想给头脑风暴 Agent 换一套方法论？只改它的 systemPrompt。

**每个 Agent 可以独立升级、独立调试、独立回滚。** 不需要担心改了一个地方影响所有场景。

---

## 04 OpenClaw 实操技巧

### 技巧一：从最高频的场景开始拆分

不要一上来就设计 10 个 Agent。

先用 OpenClaw 的默认单 Agent 跑通所有基本功能。然后观察：哪个群聊用得最多？哪种任务和主助手差异最大？

**先把那个场景拆出来，创建你的第一个专属 Agent。**

### 技巧二：模型选型的黄金法则

问自己一个问题：**这个任务需要「思考」还是「执行」？**

需要深度思考 → 强模型（Opus / Sonnet Thinking）

只需要执行 → 快模型（Gemini Flash / Pro）

OpenClaw 支持在同一个 Bot 里混用 Claude、Gemini、GPT 等不同厂商的模型，充分利用各家的长处。

### 技巧三：Workspace 共享还是独立？

OpenClaw 支持为每个 Agent 配置独立的 Workspace 目录。

大多数情况下共享就够了——Agent 们可以读取同一份配置、同一套 Skill 脚本。

**但如果某个 Agent 会大量创建和修改文件**（比如写作 Agent），建议给它独立 Workspace，避免文件操作干扰其他 Agent。

我的配置是：4 个 Agent 共享 `/home/ubuntu/clawd`，唯独公众号写手用独立的 `/home/ubuntu/clawd-wechat-writer`。

### 技巧四：System Prompt 单一职责

OpenClaw 的每个 Agent 都有独立的 `systemPrompt` 字段。充分利用这一点——

**每个 Prompt 只描述一件事。** 越短越好，越聚焦越好。

如果你的 Prompt 超过了 500 字，大概率是你试图让这个 Agent 做太多事了。考虑是不是该再拆一个 Agent。

### 技巧五：渐进式扩展

推荐路径——

**阶段一**：OpenClaw 默认配置，单 Agent 跑通。

**阶段二**：拆出第一个专属 Agent，观察效果。

**阶段三**：根据需要逐步添加，每次只加一个。

**3–5 个 Agent 足以覆盖绝大多数人的日常需求。** 不要贪多。

---

## 05 一张图看懂 OpenClaw Multi-Agent 架构

```
            用户消息
               │
               ▼
      ┌─────────────────┐
      │ OpenClaw Gateway │  ← 单进程，统一入口
      └────────┬────────┘
               │
        Agent Router
        （群组 → Agent 映射）
               │
     ┌────┬────┼────┬────┐
     ▼    ▼    ▼    ▼    ▼
    🦞   🍌   🧠   💻   ✍️
   主助手 图像  风暴  代码  写手
   Opus  Gem.  Son.  Son.  Flash
    │    │    │    │    │
    ▼    ▼    ▼    ▼    ▼
   独立  独立  独立  独立  独立
   记忆  记忆  记忆  记忆  记忆

```

用户看到的是一个入口。OpenClaw 后台运行的是五个完全隔离的专家。

**每个专家有自己的大脑（模型）、自己的性格（Prompt）、自己的笔记本（记忆）、自己的工具箱（权限）。**

---

## 写在最后

单 Agent 模式就像创业初期的「一人公司」——什么都自己干，灵活但不可持续。

OpenClaw 的 Multi-Agent 模式就像「组建专家团队」——每个人有明确的分工，效率和质量都会大幅提升。

**你不需要一个无所不能的 AI，你需要一个各司其职的 AI 团队。OpenClaw 让这件事变得很简单。**

如果你也在用 OpenClaw，或者准备试试 Multi-Agent 方案，欢迎在评论区分享你的 Agent 配置。

我很好奇大家的分工设计。👇

---

*觉得有用的话，点个「在看」，让更多人看到这篇文章。*
