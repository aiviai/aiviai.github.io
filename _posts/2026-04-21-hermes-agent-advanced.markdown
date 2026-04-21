---
layout: single
title: "🚀Hermes Agent高级玩法之三大隐藏技能全公开！Ollama云端免费模型+Open WebUI美化界面+主副模型省Token配置，稳定性碾压小龙虾，一键部署免费云端模型完整教程，小白3分钟上手"
sidebar:
  nav: "docs"
date: 2026-04-21 00:00:00 +0800
categories: LLMs
tags: [Hermes Agent, Ollama, Open WebUI, MiniMax, Gemini, 省Token, AI智能体, 免费模型, AGI, AIGC]
classes: wide
author_profile: true
---

🔥 本期内容全面公开 Hermes Agent 的三大进阶玩法：**Ollama 一键集成免费云端模型**、**Open WebUI 美化交互界面**、**主副模型分工省 Token 配置**。从零基础小白到高级玩家，都能找到适合自己的方案。

💡 方案一适合想要**零配置、零成本**快速上手的新手；方案二解决了聊天软件中使用 Hermes 的各种痛点，带来**媲美 ChatGPT 的交互体验**；方案三则是高阶省钱技巧——用**主副模型分工**策略大幅降低 Token 消耗。

---

## 一、方案一：Ollama 一键集成 Hermes Agent（免费云端模型）

### 1.1 适用场景

- 想在 Hermes Agent 中使用 **免费模型**
- 想在本地部署 **开源模型**
- 想要 **一键部署配置**，无需复杂手动安装

### 1.2 核心优势

Ollama **已内置 Hermes Agent**，所以不需要单独部署 Hermes，只需要：

1. 下载安装 Ollama
2. 执行一条命令
3. 傻瓜化完成 Hermes 的配置与运行

### 1.3 操作步骤

**Step 1：下载并安装 Ollama**

- 前往 Ollama 官方网站
- 根据自己的操作系统选择对应版本下载
- 安装完成后打开 Ollama

**Step 2：查看集成项**

打开 Ollama 后可以看到已集成：

- OpenClaw
- Claude Code
- Codex
- **Hermes Agent**

**Step 3：复制启动命令并在终端执行**

在 Ollama 界面复制 Hermes 的启动命令，回到终端运行，进入模型选项界面。

**Step 4：选择模型**

推荐模型列表中，**前几个模型后缀带 `Cloud`**，表示可通过 Ollama 云端使用（**不占用本地资源**）。

演示中选择的是：`MiniMax M2.7`

**Step 5：登录账号**

- 浏览器会弹出登录页面
- 随便登录一个账号
- 点击"连接"按钮
- 提示"设备连接成功"

**Step 6：完成 Gateway 刷新与 App 连接**

- 返回终端点击"继续"
- Hermes Agent Gateway 开始刷新
- 选择需要连接的 App（上期视频演示过连接到微信）
- 跳过可进入 Hermes Agent 终端聊天界面

**Step 7：验证模型**

提问"你是什么模型"，返回：**MiniMax M2.7 云端版本** ✅

### 1.4 Ollama 方案总结

| 特性 | 说明 |
|------|------|
| ✅ 部署方式 | 一条命令完成全部配置 |
| ✅ 费用 | 免费使用云端模型额度 |
| ✅ 资源占用 | 零本地资源占用 |
| ✅ 上手难度 | 适合新手小白快速上手 |

---

## 二、方案二：Open WebUI + Hermes Agent（最佳交互体验）

### 2.1 为什么不推荐在聊天软件中使用 Hermes Agent

直接在聊天软件中使用 Hermes Agent 存在以下局限：

1. 当 Hermes Agent 直接运行在电脑上时，再去用聊天工具访问显得**比较麻烦**
2. 很多聊天工具**不支持 Markdown 格式解析**
3. 单窗口下会产生非常多轮对话，**难以管理历史**

### 2.2 Open WebUI 的优势

Hermes Agent **原生支持 Open WebUI**，通过这种方式可以获得以下体验：

- ✅ 像使用 ChatGPT 一样，**每次会话记录保存在左侧侧边栏**
- ✅ 可随时查看之前聊过的内容
- ✅ 真正解析 Markdown 格式
- ✅ 支持 **流式输出**
- ✅ 代码展示在独立代码块中，方便复制
- ✅ 支持 **在线运行代码**（如 Python 冒泡算法）
- ✅ 自动生成相关问题推荐，点击即可继续提问
- ✅ 支持发音、修改、复制、重新生成回答
- ✅ 可以 **搜索对话历史**（示例：搜索"冒泡算法"可快速定位之前的对话）
- ✅ 支持上传文件、截图、引用网页、引用笔记、引用知识库、引用其他对话

### 2.3 完整部署步骤

#### Step 1：安装 Open WebUI

按照 Open WebUI 官方仓库的安装命令进行安装，复制官方给出的安装命令，在终端直接执行即可。

#### Step 2：修改 Hermes Agent 配置文件

用编辑器（Antigravity / 记事本 / VS Code 均可）打开 Hermes Agent 配置文件，**添加两个参数**：

| 参数 | 作用 |
|------|------|
| 启用 API 服务参数 | 为 Hermes Agent 启用 API 服务 |
| API 密码参数 | 为 API 设置访问密码（可自定义） |

保存配置文件即可。

> 💡 **懒人方案**：也可以直接让 Codex / Claude Code 等任何支持操作本地文件的 Agent，用自然语言描述需求（告诉它配置文件位置和要添加的两个参数），自动完成配置。

#### Step 3：重启 Hermes Gateway

在终端执行重启命令，让配置生效。

#### Step 4：启动 Open WebUI

复制 Open WebUI 官方的启动命令，在终端执行启动。

#### Step 5：打开 Open WebUI 界面

浏览器访问：`localhost:8080`

#### Step 6：首次配置连接

1. 点击左下角用户名
2. 点击 **设置**
3. 点击 **管理员设置**
4. 点击 **连接**
5. 点击 **加号**（+）添加连接

配置项填写：

| 字段 | 填写内容 |
|------|---------|
| URL | `http://localhost:8642/v1`（本地 Hermes Agent，端口 `8642`，后缀 `/v1` 表示兼容 OpenAI API 的接口） |
| 认证 | 刚才在配置文件中设置的 API 密码 |

点击 **保存**。

#### Step 7：开始使用

1. 新开一个对话
2. 在模型选择下拉中选中 **Hermes Agent**
3. 直接在对话窗口与 Hermes Agent 交互

**验证测试**：提问"你可以调用哪些 Skill" → 返回 **118 个 Skill** ✅

### 2.4 手机端访问（局域网方案）

可以直接在手机上通过 Open WebUI 与电脑上的 Hermes Agent 交互：

1. 手机浏览器输入：`http://<电脑IP地址>:8080`
2. 登录 Open WebUI 账号
3. 可以设置系统颜色（如浅色模式）
4. 左侧可看到所有对话历史
5. 支持新开对话、流式输出

**手机端效果**：

- 显示效果非常不错
- 支持流式输出
- 支持所有桌面端的高级功能（文件上传、截图、知识库引用等）

### 2.5 公网访问（进阶）

如果需要在 **公网环境** 通过手机访问本机 Hermes Agent：

- 可用 **ngrok** 进行内网穿透
- 也可用其他开源项目进行内网穿透

---

## 三、方案三：主副模型分工（省 Token 核心技巧）

这是最高阶的玩法——通过配置 **MiniMax-CN 主模型 + Gemini 副模型**，让核心对话走高质量模型，辅助任务走免费/低价模型，从而**大幅节省 Token 消耗**。

### 步骤 0：备份配置

```bash
cp ~/.hermes/config.yaml ~/.hermes/config.yaml.bak-$(date +%Y%m%d-%H%M%S)
```

### 步骤 1：配置环境变量

编辑 `~/.hermes/.env`，确保以下三个 key 存在：

```bash
MINIMAX_CN_API_KEY=<你的 MiniMax 国内 key>
GOOGLE_API_KEY=<你的 Google AI Studio key>
OPENAI_API_KEY=<你的 OpenAI key>
```

### 步骤 2：主模型配置

编辑 `~/.hermes/config.yaml`，将 `model:` 块改为：

```yaml
model:
    api_key: env:MINIMAX_CN_API_KEY
    base_url: https://api.minimaxi.com/anthropic
    default: MiniMax-M2.7
    provider: minimax-cn
```

**要点：**

- `base_url` **不要带 `/v1`**（SDK 自动追加）
- 模型 ID 大小写敏感：`MiniMax-M2.7`
- `provider` 必须是 `minimax-cn`（国内端点）

### 步骤 3：副模型配置（auxiliary）

`auxiliary:` 块保持如下结构，全部走 **Gemini 2.5 Flash**（免费额度大、速度快）：

```yaml
auxiliary:
    approval:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
    compression:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 120
    flush_memories:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
    mcp:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
    session_search:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
    skills_hub:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
    title_generation:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
    vision:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 30
        download_timeout: 30
    web_extract:
        provider: gemini
        model: gemini-2.5-flash
        timeout: 360
```

### 步骤 4：compression 调优

```yaml
compression:
    enabled: true
    protect_last_n: 20
    target_ratio: 0.2
    threshold: 0.5
```

> ⚠️ 不要在这里放 `summary_model` / `summary_provider` / `summary_base_url`，模型选择统一在 `auxiliary.compression` 中配置。

### 步骤 5：custom_providers（可选）

```yaml
custom_providers:
    - api_key: ""
      api_mode: chat_completions
      base_url: https://generativelanguage.googleapis.com/v1beta
      name: google-ai
    - api_key: ""
      api_mode: anthropic_messages
      base_url: https://api.minimaxi.com/anthropic
      name: minimax-custom
```

**要点：**

- `name` 不能与内置 provider 同名
- `api_mode` 必须与 `base_url` 端点格式一致：
  - `/anthropic` → `anthropic_messages`
  - `/v1` → `chat_completions`

### 步骤 6：MCP servers API key

所有 `mcp_servers.*.env` 下的 key 都用 `env:` 前缀引用，**不要写明文**：

```yaml
mcp_servers:
    gbrain:
        command: gbrain
        args: [serve]
        env:
            OPENAI_API_KEY: env:OPENAI_API_KEY
        connect_timeout: 15
        timeout: 30
```

### 步骤 7：验证配置

```bash
# YAML 语法检查
python3 -c "import yaml; yaml.safe_load(open('$HOME/.hermes/config.yaml'))" && echo OK

# 配置诊断
hermes doctor

# 功能测试
hermes chat -q "Say exactly 'pong' and nothing else." -Q
```

期望输出：

```
session_id: ...
pong
```

### 回滚方案

如果配置出现问题，随时可以回滚：

```bash
cp ~/.hermes/config.yaml.bak-<时间戳> ~/.hermes/config.yaml
```

---

## 总结

| 方案 | 适合人群 | 核心优势 | 难度 |
|------|---------|---------|------|
| Ollama 一键集成 | 新手小白 | 零配置、免费模型、3分钟上手 | ⭐ |
| Open WebUI | 日常重度使用 | ChatGPT 级交互体验、多端访问 | ⭐⭐ |
| 主副模型分工 | 高阶玩家 | 大幅省 Token、灵活配置 | ⭐⭐⭐ |

三个方案可以**组合使用**：用 Ollama 快速启动 + Open WebUI 美化界面 + 主副模型分工省钱，打造最强 Hermes Agent 使用体验！
