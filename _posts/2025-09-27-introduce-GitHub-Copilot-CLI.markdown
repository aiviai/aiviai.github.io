---
layout: single
title: "🚀重磅发布！GitHub官方神器GitHub Copilot CLI保姆级教程！一条prompt自动创建项目并推送到GitHub仓库，自动创建pr，免费支持GPT-5和Claude Sonnet 4"
sidebar:
  nav: "docs"
date: 2025-09-27 00:00:00 +0800
categories: AIAgents
tags: [GPT-5, Copilot CLI, GitHUb Copilot CLI, Claude 4, Vibe Coding, AI智能体, AI编程, Context7, MCP Server, AIGC]
classes: wide
author_profile: true
---


GitHub Copilot CLI 是 GitHub 推出的命令行 AI 编程助手，目前处于公开预览阶段。它将 GitHub Copilot 的强大 AI 能力直接带入终端，让开发者无需离开命令行环境即可获得智能编程辅助。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1WDp2z5Ezs/)
- [👉👉👉 通过YouTube观看](https://youtu.be/JHNdpjjrphA)
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
> 
🔥AI智能体相关视频
- [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
- [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
- [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  
- [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  



### 主要特性

- **终端原生开发**: 直接在命令行中与 Copilot 编程代理协作，无需上下文切换
- **GitHub 深度集成**: 使用自然语言访问仓库、问题和拉取请求，使用现有 GitHub 账户认证
- **代理能力**: 构建、编辑、调试和重构代码，AI 协作者可以规划和执行复杂任务
- **MCP 扩展性**: 默认集成 GitHub 的 MCP 服务器，支持自定义 MCP 服务器扩展功能
- **完全控制**: 在执行前预览每个操作，没有明确批准不会执行任何操作

## 系统要求

### 支持的操作系统

- **Linux** ✅
- **macOS** ✅
- **Windows** (实验性支持，推荐使用 PowerShell v6+)

### 软件依赖

- Node.js v22 或更高版本
- npm v10 或更高版本
- (Windows 用户) PowerShell v6 或更高版本
- 活跃的 Copilot 订阅 (Pro, Pro+, Business 或 Enterprise)

### 🚀环境配置

**✅macOS版本**

```bash

# 安装nvm（你的命令是正确的）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 重新加载shell配置
source ~/.zshrc

# 如果使用bash而不是zsh，则使用：
# source ~/.bashrc

# 安装Node.js 22
nvm install 22

nvm use 22

# 验证版本
node --version

# 设为默认版本
nvm alias default 22

```

**✅windows版本**

```bash

# **下载安装包，**访问：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

# 查看可安装的Node.js版本
nvm list available

# 安装Node.js 22
nvm install 22.20.0

# 使用Node.js 22
nvm use 22.20.0

# 查看已安装版本
nvm list
```

### 订阅要求

- 需要有效的 GitHub Copilot 订阅
- 如果通过组织或企业使用 Copilot，管理员必须在设置中启用 Copilot CLI

## 安装指南

### 方法一：全局 npm 安装 (推荐)

```bash
npm install -g @github/copilot

```

### 方法二：GitHub CLI 扩展安装

```bash
# 安装 GitHub CLI (如果尚未安装)
# Windows (Winget):
winget install --id GitHub.cli

# macOS (Homebrew):
brew install gh

# 安装 Copilot CLI 扩展
gh extension install github/gh-copilot

```

## 初始设置

### 1. 启动 Copilot CLI

```bash
copilot

```

首次启动会显示动画横幅。如需再次查看横幅，使用：

```bash
copilot --banner

```

### 2. 身份验证

如果未登录 GitHub，会提示使用 `/login` 命令：

```bash
/login

```

按屏幕指示完成身份验证。

### 3. 信任目录

首次在某个目录启动时，需要确认信任该目录及其子目录中的文件。可以选择：

- 仅当前会话信任
- 当前及未来会话信任

## 使用方式

### 交互式模式 (默认)

在包含代码的文件夹中启动：

```bash
copilot

```

### 编程式模式 (单次命令)

```bash
copilot -p "你的提示" --allow-all-tools

```

### 模型选择

- 默认：Claude Sonnet 4
- 切换到 GPT-5：

```bash
COPILOT_MODEL=gpt-5 copilot
# Windows:
set COPILOT_MODEL=gpt-5
copilot

```

## 实用功能

### 本地任务示例

### 代码修改

```
将 H1 标题的背景颜色改为深蓝色

```

### 文件分析

```
显示 CHANGELOG.md 文件的最后 5 次更改

```

### Git 操作

```
提交这个仓库的更改
回滚最后一次提交，保留未暂存的更改

```

### 项目创建

```
使用 create-next-app 和 tailwind CSS 创建一个 Next.js 应用
应用应该是一个使用 GitHub API 数据的仪表板

```

### GitHub 集成任务

### 拉取请求管理

```
列出我的开放 PR
合并 octo-org/octo-repo 中我创建的所有开放 PR
关闭 octo-org/octo-repo 的 PR #11

```

### 问题处理

```
我被分配了这个问题：https://github.com/octo-org/octo-repo/issues/1234
在合适命名的分支中开始处理

```

### 创建 PR

```
在这个仓库的根目录添加一个名为 user-info.js 的 Node 脚本
输出运行脚本的用户信息，创建 PR 将此文件添加到 GitHub 仓库

```

## 安全考虑

### 信任目录

- 仅在信任的目录中启动 Copilot CLI
- 避免从主目录启动
- 不要在包含敏感数据的目录中使用

### 工具授权选项

```bash
# 允许所有工具 (谨慎使用)
--allow-all-tools

# 拒绝特定工具
--deny-tool 'shell(rm)'

# 允许特定工具
--allow-tool 'write'

```

### 组合使用示例

```bash
copilot --allow-all-tools --deny-tool 'shell(rm)' --deny-tool 'shell(git push)'

```

## 常用斜杠命令

- `/login` - 登录 GitHub 账户
- `/feedback` - 提交反馈
- `/mcp` - 查看 MCP 服务器
- `/help` - 获取帮助

## 使用配额

每次向 Copilot CLI 提交提示都会减少一次月度高级请求配额。

## 别名设置 (GitHub CLI 扩展版)

### Bash/Zsh

```bash
echo 'eval "$(gh copilot alias -- bash)"' >> ~/.bashrc
# 或
echo 'eval "$(gh copilot alias -- zsh)"' >> ~/.zshrc

```

### PowerShell

```powershell
$GH_COPILOT_PROFILE = Join-Path -Path $(Split-Path -Path $PROFILE -Parent) -ChildPath "gh-copilot.ps1"
gh copilot alias -- pwsh | Out-File ( New-Item -Path $GH_COPILOT_PROFILE -Force )
echo ". $GH_COPILOT_PROFILE" >> $PROFILE

```

设置后可以使用简化命令：

- `ghcs` = `gh copilot suggest`
- `ghce` = `gh copilot explain`

## 最佳实践

### 提示编写技巧

- 保持提示简洁明确
- 包含具体的上下文信息
- 明确说明期望的结果
- 提供必要的约束条件

### 安全使用

- 始终检查建议的命令
- 在生产环境中谨慎使用自动批准选项
- 定期更新 CLI 以获取最新功能和修复

### 工作流优化

- 在项目根目录启动以获得最佳上下文
- 结合 Git 工作流使用
- 利用 GitHub 集成功能提高效率

## 故障排除

### 常见问题

- **认证失败**: 检查 GitHub 登录状态和权限
- **命令不执行**: 确认已批准必要的工具使用
- **网络连接**: 参考 GitHub Copilot 网络故障排除指南

### 获取帮助

- 使用 `/feedback` 命令提交反馈
- 访问官方文档: https://docs.github.com/copilot/concepts/agents/about-copilot-cli
- 在项目仓库中提交问题: https://github.com/github/copilot-cli

## 注意事项

- 项目目前处于公开预览阶段，功能可能会发生变化
- 定期更新以获取最新功能
- 始终验证 AI 生成的代码和建议
- 在重要操作前仔细检查建议的命令

## 总结

GitHub Copilot CLI 是一个强大的终端 AI 助手，可以显著提高开发效率。通过自然语言交互，开发者可以快速完成代码编写、调试、Git 操作和 GitHub 集成任务。在使用时要注意安全性，始终检查 AI 建议的操作，并在信任的环境中使用。