---
layout: single
title: "🚀OpenClaw高级使用经验分享！2026年最强生产力！五分钟打造多Agent协作编程开发团队！模型容灾机制深度配置+云端Gateway操控本地macOS！2026年AI智能体终极形态！只需一条指令"
sidebar:
  nav: "docs"
date: 2026-02-09 00:00:00 +0800
categories: AIAgents
tags: [OpenClaw, Clawdbot, Clawd, moltbook, MoltBot, AI智能体, AI编程, spec-driven, OpenClaw]
classes: wide
author_profile: true
---

OpenClaw是一款基于开源架构的AI智能体平台，被誉为2026年最具突破性的AI Agent系统。它以强大的多模型调度能力为核心，支持Anthropic、OpenAI、Google等主流AI模型的自动容灾切换，确保服务永不中断。OpenClaw内置智能记忆检索系统，通过Embedding模型实现混合搜索，让Agent在持续使用中不断积累经验、越用越聪明。其最大亮点在于多Agent协作机制——支持线性流水线、依赖图并行、多Agent辩论三种协作模式，可组建由编码、测试、文档、审查等专职AI成员构成的虚拟开发团队，一条指令即可交付生产级代码。此外，OpenClaw还支持云端与本地设备通过SSH反向隧道配对，实现远程操控浏览器、执行命令等跨端能力。用户只需下达指令，OpenClaw便能自主完成从开发到交付的全流程工作，堪称AI Agent的终极形态。

> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1dqffBMEcg/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/pvlPkUauHis)
> - [👉👉👉 Subagents视频](https://youtu.be/GjlkRcNNONo)
> - [👉👉👉 Gemini CLI视频](https://youtu.be/v41xKxZmygU)
> - [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
> - [👉👉👉 SuperClaude视频](https://youtu.be/bMO13RNjvBk)
> - [👉👉👉 Claudia视频](https://youtu.be/WIwW7V56wxE)
> - [👉👉👉 Task Master视频](https://youtu.be/6dhOUJ_vnIY)
> - [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
> - [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
> - [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
> - [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
> - [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
> - 👉👉👉 我的微信：stoeng
> - 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


# **Team Tasks** skill:

[https://github.com/win4r/team-tasks](https://github.com/win4r/team-tasks)

# 模型容灾机制

**文件路径：/home/ubuntu/.openclaw/openclaw.json**

```markdown
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-opus-4-6",
        "fallbacks": [
          "openai-codex/gpt-5.3-codex",
          "google-antigravity/claude-opus-4-6-thinking"
        ]
      }
    },
    "list": [
      {
        "id": "main",
        "default": true,
        "model": {
          "primary": "anthropic/claude-opus-4-6",
          "fallbacks": [
            "openai-codex/gpt-5.3-codex",
            "google-antigravity/claude-opus-4-6-thinking"
          ]
        }
      }
    ]
  }
}

```

**多认证 Profile + Token 轮换**

```markdown
{
  "auth": {
    "profiles": {
      "openai-codex:default": {
        "provider": "openai-codex",
        "mode": "oauth"
      },
      "anthropic:default": {
        "provider": "anthropic",
        "mode": "token"
      },
      "anthropic:manual": {
        "provider": "anthropic",
        "mode": "token"
      },
      "google-antigravity:mail1@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth",
        "email": "mail1@gmail.com"
      },
      "google-antigravity:mail2@gmail.com": {
        "provider": "google-antigravity",
        "mode": "oauth"
      }
    },
    "order": {
      "anthropic": [
        "anthropic:default",
        "anthropic:manual"
      ],
      "google-antigravity": [
        "google-antigravity:mail1@gmail.com",
        "google-antigravity:mail2@gmail.com"
      ]
    }
  }
}

```

# memory_search配置

**文件路径：/home/ubuntu/.openclaw/openclaw.json**

```markdown
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "sources": ["memory", "sessions"],
        "experimental": {
          "sessionMemory": true
        },
        "provider": "gemini",
        "remote": {
          "apiKey": "AIzaSy**************************"
        },
        "fallback": "gemini",
        "model": "gemini-embedding-001",
        "query": {
          "hybrid": {
            "enabled": true,
            "vectorWeight": 0.7,
            "textWeight": 0.3
          }
        }
      }
    }
  }
}

```

# 云端 OpenClaw 与本地 macOS 通过 Node 配对步骤

## 架构概览

```
┌─────────────────────────┐       SSH 反向隧道        ┌─────────────────────────┐
│  云端 AWS (Ubuntu)       │ ◄────────────────────── │  本地 macOS (MacBook)    │
│                         │      端口 18790           │                         │
│  OpenClaw Gateway       │                          │  OpenClaw Node          │
│  监听: 127.0.0.1:18789  │                          │  连接: localhost:18790   │
│  公网 IP: xx.xx.xx.xx   │                          │  NAT 内网（无公网 IP）    │
└─────────────────────────┘                          └─────────────────────────┘
```

**核心思路**：Mac 在 NAT 内网无公网 IP，无法被 AWS 主动连接。解决方案是 Mac 主动通过 SSH 隧道连到 AWS，在 AWS 本地开一个端口（18790），将流量转发到 Mac 上的 Node 服务。

---

## 前置条件

| 项目 | 要求 |
| --- | --- |
| AWS 服务器 | OpenClaw Gateway 已安装并运行 |
| macOS | Node.js ≥ 22, npm |
| SSH | Mac 能 SSH 到 AWS（公钥已添加到 `~/.ssh/authorized_keys`） |
| 网络 | Mac 有互联网访问（不需要公网 IP） |

---

## 步骤 1：Mac 安装 OpenClaw

```bash
npm install -g openclaw
```

验证安装：

```bash
openclaw --version
```

---

## 步骤 2：获取 Gateway Token

在 AWS 上查看配置文件中的 Gateway Token：

```bash
cat ~/.openclaw/openclaw.json | grep -A2 '"auth"'
```

找到 `gateway.auth.token` 的值，后续步骤需要用到。

也可以通过 OpenClaw 工具获取：

```bash
openclaw gateway config | grep token
```

---

## 步骤 3：建立 SSH 反向隧道

在 **Mac 终端**执行：

```bash
ssh -N -L 18790:127.0.0.1:18789 ubuntu@<AWS公网IP>
```

| 参数 | 说明 |
| --- | --- |
| `-N` | 不执行远程命令，只做端口转发 |
| `-L 18790:127.0.0.1:18789` | Mac 本地 18790 → AWS 的 127.0.0.1:18789（Gateway） |
| `ubuntu@<IP>` | AWS 服务器 SSH 地址 |

⚠️ **首次连接**需要确认 SSH 指纹（输入 `yes`）。

验证隧道是否通：

```bash
curl -s <http://localhost:18790/health>
```

如果返回内容，说明隧道已通。

---

## 步骤 4：启动 Node 服务

在 **Mac 另一个终端**执行：

```bash
OPENCLAW_GATEWAY_TOKEN="<你的Gateway Token>" \\
  openclaw node run \\
  --host 127.0.0.1 \\
  --port 18790 \\
  --display-name "Master-Mac"
```

| 参数 | 说明 |
| --- | --- |
| `OPENCLAW_GATEWAY_TOKEN` | Gateway 认证令牌 |
| `--host 127.0.0.1` | 连接到本地（通过 SSH 隧道转发） |
| `--port 18790` | SSH 隧道的本地端口 |
| `--display-name` | Node 的显示名称（方便识别） |

启动后会看到类似输出：

```
🔗 Connecting to gateway at ws://127.0.0.1:18790 ...
✅ Connected! Waiting for pairing approval...
```

---

## 步骤 5：AWS 端批准配对

在 **AWS 终端**或通过 OpenClaw Agent 执行：

```bash
# 查看待批准的 Node
openclaw node pending

# 批准配对（使用 Node ID 或名称）
openclaw node approve <node-id>
```

或者通过 Agent 工具：

```python
# 查看待配对
nodes(action="pending")

# 批准
nodes(action="approve", node="Master-Mac")
```

批准后 Mac 终端会显示：

```
✅ Paired successfully! Node is now active.
```

---

## 步骤 6：配置执行权限

在 **Mac** 上设置 Node 的执行权限：

```bash
# 通过 OpenClaw 命令设置（推荐）
openclaw node exec-approvals set defaults.security full
```

或者手动创建配置文件 `~/.openclaw/exec-approvals.json`：

```json
{
  "defaults": {
    "security": "full"
  }
}
```

⚠️ **关键**：`defaults.security` 必须设为 `"full"`，否则即使 allowlist 配了 `*` 也会拒绝执行命令。

---

## 步骤 7：验证连接

从 AWS 的 OpenClaw Agent 测试远程执行：

```python
# 查看 Node 状态
nodes(action="status")

# 在 Mac 上执行命令
nodes(action="run", node="Master-Mac", command=["echo", "Hello from Mac!"])

# 查看 Mac 系统信息
nodes(action="run", node="Master-Mac", command=["sw_vers"])
```

---
