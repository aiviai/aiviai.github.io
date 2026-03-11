---
layout: single
title: "🚀OpenClaw高级玩法之工作区优化+三大Agent深度解析！保姆级教程让你学会Persistent Agent、Sub-Agent和ACP Agent的正确打开方式！90%的用户都不知道的进阶技巧"
sidebar:
  nav: "docs"
date: 2026-03-12 00:00:00 +0800
categories: AIAgents
tags: [OpenClaw, Clawdbot, Clawd, moltbook, MoltBot, AI智能体, Claude Code, Agent Teams, OpenClaw]
classes: wide
author_profile: true
---


### ACPX链接

[https://github.com/openclaw/acpx](https://github.com/openclaw/acpx)

## 1 ACP 概述

ACP（Agent Client Protocol）让 OpenClaw 通过结构化的 stdio JSON-RPC 协议调用外部编码代理（Claude Code、Codex、Gemini CLI、OpenCode、Pi），替代传统的 PTY 终端刮取方式。

> ⚡ **核心要点**：ACP 协议层本身消耗 **零 Token**。只有编码代理内部的 LLM 调用才消耗 Token。ACP 会话是非交互式的（无 TTY），权限模式必须预先配置。
> 

---

## 2 前置配置

### 2.1 安装 acpx 插件

```
openclaw plugins install @openclaw/acpx
openclaw config set plugins.entries.acpx.enabled true
```

### 2.2 核心 ACP 配置

```json
{
  "acp": {
    "enabled": true,
    "dispatch": { "enabled": true },
    "backend": "acpx",
    "defaultAgent": "claude",
    "allowedAgents": ["claude", "codex", "pi", "opencode", "gemini"],
    "maxConcurrentSessions": 8
  }
}
```

### 2.3 权限配置

```
openclaw config set plugins.entries.acpx.config.permissionMode approve-all
openclaw config set plugins.entries.acpx.config.nonInteractivePermissions fail
```

### 2.4 重启并验证

```
openclaw restart
/acp doctor
```

### [🔥优化AGENTS.md](http://🔥优化AGENTS.md) skil用法

**https://github.com/win4r/openclaw-workspace**

```markdown
  - "帮我审计一下 AGENTS.md 的 token 用量"                                      
  - "MEMORY.md 太大了，帮我清理"                                                
  - "新建一个工作区"                                                            
  - "把最近的日志精炼进 MEMORY.md"                                              
```

### 🚀Sub-Agents铁律

```markdown
## Sub-Agent 编排规则

### 模型选择策略

根据任务复杂度自动选择模型，优化成本与质量的平衡：

| 级别 | 适用场景 | 模型 | Thinking |
|------|---------|------|----------|
| 简单 | 天气、日历、状态检查、单项数据获取 | minimax-portal/MiniMax-M2.1 | off |
| 中等 | 搜索总结、文档摘要、内容起草、多步信息整理 | openai-codex/gpt-5.2 | low |
| 复杂 | 代码审查、架构分析、安全审计、多维度对比决策 | openai-codex/gpt-5.2 | high |

原则：
- 默认从最便宜的模型开始，只在任务明确需要更强推理时升级
- 不确定时选中等
- 永远不要给 Sub-Agent 分配主 Agent 的 Opus 模型

### 常用工作流

**每日简报** — 当用户说"每日简报"或在早晨心跳时：
1. 并行 spawn 4 个 Sub-Agent（级别：简单）：
   - 天气：上海未来 24 小时
   - 日历：今天的会议和待办
   - 邮件：未读紧急邮件摘要
   - 新闻：AI / Agent 领域最新动态（最多 5 条）
2. 全部完成后汇总成结构化简报
3. 通过当前频道发送

**技术调研** — 当用户要求调研多个主题时：
1. 每个主题 spawn 一个 Sub-Agent（级别：中等）
2. 每个 Sub-Agent 搜索 3-5 篇最新文章，总结关键观点，300 字以内
3. 全部完成后汇总对比

**代码审查** — 当用户说"审查代码"或"review"时：
1. spawn 一个 Sub-Agent（级别：复杂），超时 5 分钟
2. 检查项：安全漏洞、类型安全、错误处理、架构合理性
3. 返回：问题列表 + 严重度 + 修复建议

**批量文档处理** — 当用户需要处理多个文档时：
1. 每个文档 spawn 一个 Sub-Agent（级别：根据文档复杂度判断）
2. 提取关键信息，返回结构化 JSON
3. 全部完成后汇总对比

### 通用约束

- 并行 Sub-Agent 不超过 5 个，避免速率限制
- 每个 Sub-Agent 的 task prompt 必须自包含所有必要上下文（Sub-Agent 看不到 SOUL.md 和 USER.md）
- 简单任务超时 60 秒，中等任务超时 180 秒，复杂任务超时 600 秒
- 完成后默认 cleanup: "delete"，除非用户要求保留日志
```

```

### 用法

> 
> 
> 
> 🚀把这段放入 AGENTS.md 后，你日常只需要说：
> 
> 1️⃣每日简报
> 
> 2️⃣帮我调研 LangGraph、CrewAI 和 Google ADK 的最新进展
> 
> 3️⃣审查一下 /workspace/src/auth 目录的代码
> 

### 🚀自然语言调用

```markdown
有效的自然语言触发方式
在后台用 Sub-Agent 审查这个 PR：https://github.com/CortexReach/memory-lancedb-pro/pull/142
检查安全、类型安全、错误处理、边界情况。用 GPT-5.2 开 high thinking。
派一个子任务去审查 PR #142，用 GPT-5.2 高推理模式，完成后告诉我结果。
spawn 一个 subagent 帮我审查这个 PR：https://github.com/CortexReach/memory-lancedb-pro/pull/142

```
