---
layout: single
title: "🚀微信养龙虾：OpenClaw微信插件Clawbot发布！一条命令搞定安装，AI移动办公终极方案！微信接入OpenClaw完整教程！从安装到实战【龙虾教程】"
sidebar:
  nav: "docs"
date: 2026-03-22 00:00:00 +0800
categories: AIAgents
tags: [OpenClaw, Clawdbot, Clawd, clawbot, MoltBot, AI智能体, Claude Code, Agent Teams, OpenClaw]
classes: wide
author_profile: true
---



## macOS 安装与部署OpenClaw

macOS 上 OpenClaw 提供两条路径：**CLI 安装**（终端命令行）和 **macOS App 安装**（图形界面），两者最终都会启动 Gateway 服务。

> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1H8AgzWEEF/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/Smk5nisOZC0)



### 前置条件

根据文档，唯一的硬性依赖是 **Node.js**——推荐 Node 24，最低支持 Node 22.16+。文档推荐 macOS 使用 Homebrew 安装（`brew install node`）或者任意版本管理器（nvm/fnm/asdf 等）。检查版本：

```bash
node --version
```

此外你需要准备一个 **模型 Provider 的 API Key**（Anthropic、OpenAI、Google 等），onboarding 过程中会提示你输入。

### 路径一：CLI 安装（推荐的快速方式）

**第一步：运行安装脚本**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

文档说明该脚本会自动检测 OS、在需要时安装 Node、安装 OpenClaw，并自动启动 onboarding 向导。

如果你只想安装而不立即运行 onboarding：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

**替代安装方法**——如果你自己管理 Node，也可以通过 npm/pnpm 全局安装：

```bash
# npm
npm install -g openclaw@latest
openclaw onboard --install-daemon

# pnpm
pnpm add -g openclaw@latest
pnpm approve-builds -g
openclaw onboard --install-daemon
```

文档特别提到，如果 `sharp` 构建因全局 libvips 导致失败，可以使用：

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest
```

**从源码安装**（适合贡献者）：

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install && pnpm ui:build && pnpm build
pnpm link --global
openclaw onboard --install-daemon
```

**第二步：运行 Onboarding 向导**

```bash
openclaw onboard --install-daemon
```

文档说这个向导大约需要 2 分钟，会引导你选择模型 Provider、设置 API Key、配置 Gateway。`--install-daemon` 标志会将 Gateway 注册为系统守护进程。

**第三步：验证 Gateway 是否运行**

```bash
openclaw gateway status
```

文档说你应该看到 Gateway 正在监听端口 **18789**。

**第四步：打开 Dashboard**

```bash
openclaw dashboard
```

这会在浏览器中打开 Control UI。如果它成功加载，说明一切正常。

**第五步：发送第一条消息**

在 Control UI 的聊天窗口中输入消息，你应该能收到 AI 回复。

**验证安装完整性**的三个命令：

```bash
openclaw --version       # 确认 CLI 可用
openclaw doctor          # 检查配置问题
openclaw gateway status  # 验证 Gateway 运行状态
```

### 路径二：macOS App 安装（图形界面）

文档描述了 macOS App 的 onboarding 流程，共 7 步：

1. **批准 macOS 安全警告**——首次打开会弹出 macOS 的未知开发者提示
2. **允许查找本地网络**——macOS 会请求网络发现权限
3. **欢迎界面与安全须知**——文档强调默认配置下 OpenClaw 是单用户个人 Agent（one trusted operator boundary）。本地 onboarding 现在默认将新配置的 `tools.profile` 设为 `"coding"`，这样新安装会保留文件系统/运行时工具，而不是使用不受限的 `full` profile
4. **选择 Gateway 位置（Local vs Remote）**：
   - **This Mac (Local only)：** onboarding 会在本地配置 auth 并写入凭据
   - **Remote (over SSH/Tailnet)：** onboarding 不配置本地 auth，凭据需存在于远程 Gateway 主机上
   - **Configure later：** 跳过设置
   - 文档提到即使是 loopback 连接，向导现在也会生成 **token**，所以本地 WebSocket 客户端也需要认证
5. **macOS 权限授权**——会请求多项 TCC 权限：Automation (AppleScript)、Notifications、Accessibility、Screen Recording、Microphone、Speech Recognition、Camera、Location
6. **CLI 安装（可选步骤）**——App 可以通过 npm/pnpm 安装全局 `openclaw` CLI，这样终端工作流和 launchd 任务就能开箱即用
7. **Onboarding Chat（专用会话）**——设置完成后，App 打开一个专用的 onboarding 聊天会话，Agent 会自我介绍并引导下一步操作。这个会话与你的正常对话是分开的。

### macOS 上的 PATH 问题排查

文档专门提到了一个常见问题：安装成功但终端找不到 `openclaw` 命令。诊断步骤：

```bash
node -v
npm -v
npm prefix -g
echo "$PATH"
```

如果 `$(npm prefix -g)/bin` 不在 PATH 里，需要在 `~/.zshrc` 或 `~/.bashrc` 中添加：

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

### 环境变量（高级）

文档提到以下环境变量可用于自定义路径：

- `OPENCLAW_HOME` — 内部路径解析的 home 目录
- `OPENCLAW_STATE_DIR` — 覆盖 state 目录
- `OPENCLAW_CONFIG_PATH` — 覆盖配置文件路径

---

## Windows 安装与部署

文档明确推荐 Windows 用户通过 **WSL2 (Ubuntu)** 安装 OpenClaw。原文说明：CLI + Gateway 在 Linux 环境中运行能保持运行时一致性，且工具兼容性更好（Node/Bun/pnpm、Linux 二进制文件、skills）。原生 Windows 安装被描述为"可能更棘手"。文档还指出目前**没有 Windows companion app**，欢迎社区贡献。

### 方法一：WSL2 安装（推荐）

#### 第一步：安装 WSL2 + Ubuntu

在 **管理员 PowerShell** 中运行：

```powershell
wsl --install
```

或者显式选择发行版：

```powershell
wsl --list --online
wsl --install -d Ubuntu-24.04
```

如果 Windows 要求重启则重启。

#### 第二步：启用 systemd（Gateway 安装必需）

在 WSL 终端中：

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

然后在 PowerShell 中关闭 WSL：

```powershell
wsl --shutdown
```

重新打开 Ubuntu，验证 systemd 是否正常：

```bash
systemctl --user status
```

#### 第三步：在 WSL 内安装 OpenClaw

文档给出了两种方式。

**方式 A：使用安装脚本**（与 macOS/Linux 相同）：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**方式 B：从源码构建**：

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build   # 首次运行会自动安装 UI 依赖
pnpm build
openclaw onboard
```

#### 第四步：安装 Gateway 服务

在 WSL2 内运行以下任一命令：

```bash
openclaw onboard --install-daemon
# 或
openclaw gateway install
# 或
openclaw configure
# （选择 "Gateway service" 选项）
```

修复/迁移问题用：

```bash
openclaw doctor
```

### 方法二：原生 Windows（PowerShell）

文档提供了原生 Windows 安装脚本，但明确标注 WSL2 更稳定：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

不运行 onboarding 的版本：

```powershell
& ([scriptblock]::Create((iwr -useb https://openclaw.ai/install.ps1))) -NoOnboard
```

### 高级：暴露 WSL 服务到局域网（portproxy）

文档说 WSL 有自己的虚拟网络。如果需要从其他机器访问 WSL 内的服务（如 Gateway），需要做端口转发。WSL IP 每次重启后会变化，所以可能需要刷新转发规则。

在 **管理员 PowerShell** 中：

```powershell
$Distro = "Ubuntu-24.04"
$ListenPort = 2222
$TargetPort = 22

$WslIp = (wsl -d $Distro -- hostname -I).Trim().Split(" ")[0]
if (-not $WslIp) { throw "WSL IP not found." }

netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=$ListenPort `
  connectaddress=$WslIp connectport=$TargetPort
```

一次性防火墙规则：

```powershell
New-NetFirewallRule -DisplayName "WSL SSH $ListenPort" -Direction Inbound `
  -Protocol TCP -LocalPort $ListenPort -Action Allow
```

WSL 重启后刷新 portproxy：

```powershell
netsh interface portproxy delete v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 | Out-Null
netsh interface portproxy add v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 `
  connectaddress=$WslIp connectport=$TargetPort | Out-Null
```

文档的注意事项：从其他机器 SSH 访问时目标是 **Windows 主机 IP**（如 `ssh user@windows-host -p 2222`）。远程节点指向的 Gateway URL 不能是 `127.0.0.1`，需使用 `openclaw status --all` 确认可达地址。使用 `listenaddress=0.0.0.0` 允许局域网访问，`127.0.0.1` 仅本机。文档建议如果需要自动化，可注册 Scheduled Task 在登录时运行刷新步骤。

---

## 两平台对比总结

| 维度 | macOS | Windows |
|---|---|---|
| **推荐安装方式** | 安装脚本 (`curl`) 或 macOS App | WSL2 + 安装脚本 (`curl`) |
| **原生支持** | 完整原生 + companion app | 原生 PowerShell 脚本可用但不推荐 |
| **Node 要求** | Node 24（推荐）/ Node 22.16+ | 同左（WSL 内） |
| **Gateway 守护进程** | launchd（macOS App 自动管理） | systemd（WSL2 内，需手动启用） |
| **Companion App** | 有（含 Menu Bar、Voice Wake 等） | 暂无 |
| **额外步骤** | 无 | 需先安装 WSL2 + 启用 systemd |


---


<img src="https://private-user-images.githubusercontent.com/42172631/313519233-7568cf78-c8ba-4182-aa96-d524d903f2bc.jpeg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzM3NDQ3NTgsIm5iZiI6MTc3Mzc0NDQ1OCwicGF0aCI6Ii80MjE3MjYzMS8zMTM1MTkyMzMtNzU2OGNmNzgtYzhiYS00MTgyLWFhOTYtZDUyNGQ5MDNmMmJjLmpwZWc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMxN1QxMDQ3MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMzFlN2UwZmEyYmI1MThlOGVhOTQ0ZmJjOGMwYWFhYmRiZmUwNjdlM2M4ODM5ZDM2YzBkYWFmM2JmZmYwMzkwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7BRSFAaGC9AmP1X2nE6nOfGQo-ZgmdHbhP1iETXFJRQ" width="214.8" height="291" style="max-width: 100%; height: auto; max-height: 291px;">


