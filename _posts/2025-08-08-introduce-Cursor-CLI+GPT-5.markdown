---
layout: single
title: "🚀Cursor CLI+GPT-5保姆级教程+编程能力测评！Cursor CLI零成本免费使用GPT-5！Claude Code的劲敌来了！从安装到实战演示，轻松开发AI智能体，颠覆传统开发效率翻倍！"
sidebar:
  nav: "docs"
date: 2025-08-08 00:00:00 +0800
categories: AIAgents
tags: [Cursor CLI, Claude, GPT-5, Cursor, OpenAI, AutoGen, Claude Code, Vibe Coding, MCP Server, AIGC, Context7]
classes: wide
author_profile: true
---

就在 2025 年 8 月 7 日，人工智能迎来了又一个里程碑：OpenAI 正式发布 GPT-5，同时 Cursor 推出全新的 CLI（命令行界面）体验。这一次，它们将如何帮你搞定写作、编码、生产力三合一？
Cursor CLI 是一个强大的命令行工具，让您可以直接在终端中与AI助手交互来编写、审查和修改代码。它提供了两种主要使用模式：

- **交互模式**：适合实时编码和对话
- **非交互模式（Print模式）**：适合脚本、CI/CD管道和自动化场景


> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1tzt1zhE9u/)
- [👉👉👉 通过YouTube观看](https://youtu.be/KE1gD-02BUk)
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



## 二、安装与配置

### 1. 基础安装

```bash
# 一键安装
curl https://cursor.com/install -fsS | bash

# 验证安装
cursor-agent --version

```

### 2. 配置环境变量

根据您的Shell类型配置：

```bash
# Bash用户
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Zsh用户
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

```

### 3. 更新CLI

```bash
cursor-agent update
# 或
cursor-agent upgrade

```

## 三、认证方式

### 1. 浏览器认证（推荐）

```bash
# 登录
cursor-agent login

# 查看认证状态
cursor-agent status

# 登出
cursor-agent logout

```

### 2. API密钥认证

适用于CI/CD环境：

```bash
# 方式1：环境变量
export CURSOR_API_KEY=your_api_key_here
cursor-agent "你的提示词"

# 方式2：命令行参数
cursor-agent --api-key your_api_key_here "你的提示词"

```

## 四、使用模式详解

### 1. 交互模式（默认）

启动交互式会话：

```bash
cursor-agent

```

在交互模式中，您可以：

- 实时与AI对话
- 使用斜杠命令控制会话
- 查看和编辑代码
- 保存会话历史

### 2. 非交互模式（Print模式）

适合自动化场景：

```bash
# 基础使用
cursor-agent -p "查找并修复性能问题"

# 指定模型
cursor-agent -p "审查代码安全性" --model "gpt-5"

# 包含git差异进行代码审查
cursor-agent --with-diffs -p "审查这些更改的安全问题"

# 控制输出格式
cursor-agent -p "分析代码" --output-format json
cursor-agent -p "生成文档" --output-format text
cursor-agent -p "实时处理" --output-format stream-json

```

## 五、斜杠命令参考

在交互模式中可用的快捷命令：

| 命令 | 功能 |
| --- | --- |
| `/model <model>` | 切换AI模型 |
| `/auto-run [on/off/status]` | 控制自动运行 |
| `/new-chat` | 开始新会话 |
| `/vim` | 切换Vim键位 |
| `/help [command]` | 显示帮助 |
| `/feedback <message>` | 发送反馈 |
| `/resume <chat>` | 恢复之前的会话 |
| `/copy-req-id` | 复制请求ID |
| `/logout` | 登出 |
| `/quit` | 退出 |

## 六、高级功能

### 1. 会话管理

```bash
# 列出所有历史会话
cursor-agent ls

# 恢复最近的会话
cursor-agent resume

# 恢复特定会话
cursor-agent --resume [thread-id]

# 在交互模式中恢复
/resume <chat-folder-name>

```

### 2. 模型选择

```bash
# 使用特定模型
cursor-agent -m sonnet-4 "优化这段代码"
cursor-agent --model gpt-5 "解释这个算法"
cursor-agent --model sonnet-4-thinking "深度分析架构"

```

### 3. 项目规则配置

Cursor CLI会自动加载项目中的规则文件：

- 从 `.cursor/rules` 目录加载项目特定规则
- 规则会根据文件类型和项目部分自动应用
- 可以自定义AI助手的行为

### 4. MCP（Model Context Protocol）集成

CLI会读取 `mcp.json` 配置文件，启用与IDE相同的MCP服务器和工具。

## 七、实际使用场景

### 场景1：日常开发辅助

```bash
# 启动交互式编码会话
cursor-agent

# 在会话中：
> 帮我实现一个用户认证系统
> /model gpt-5  # 切换到更强大的模型
> 添加JWT令牌支持
> /new-chat  # 开始新任务

```

### 场景2：代码审查自动化

```bash
# Git提交前自动审查
cursor-agent --with-diffs -p "审查代码变更，关注：
1. 安全漏洞
2. 性能问题
3. 代码规范" --output-format text

```

### 场景3：CI/CD集成

```bash
#!/bin/bash
# CI脚本示例

export CURSOR_API_KEY=$CI_CURSOR_KEY

# 自动化测试生成
cursor-agent -p "为新添加的函数生成单元测试" \
  --model sonnet-4 \
  --output-format json > tests.json

# 文档生成
cursor-agent -p "生成API文档" \
  --output-format text > api-docs.md

```

### 场景4：批量代码重构

```bash
# 重构脚本
for file in src/*.js; do
  cursor-agent -p "将$file中的回调函数重构为async/await" \
    --model gpt-5 \
    --output-format text > "${file}.refactored"
done

```

### 场景5：技术债务分析

```bash
# 定期技术债务报告
cursor-agent -p "分析项目中的技术债务：
- 识别重复代码
- 找出过时的依赖
- 检测潜在的性能瓶颈
- 评估代码复杂度" \
  --model sonnet-4-thinking \
  --output-format json | jq '.issues' > tech-debt-report.json

```

### 场景6：快速原型开发

```bash
# 交互式原型开发
cursor-agent
> 创建一个REST API服务器框架，使用Express
> 添加用户CRUD操作
> 集成MongoDB
> /auto-run on  # 自动执行生成的代码
> 添加认证中间件

```

### 场景7：代码学习和理解

```bash
# 理解复杂代码库
cursor-agent -p "解释这个项目的架构和主要组件" \
  --force  # 强制执行命令

# 恢复学习会话
cursor-agent resume
> 继续解释数据流是如何工作的

```

### 场景8：安全审计

```bash
# 安全扫描脚本
cursor-agent -p "执行安全审计：
- SQL注入漏洞
- XSS攻击向量
- 不安全的依赖
- 硬编码的凭据" \
  --model gpt-5 \
  --with-diffs \
  --output-format json > security-audit.json

```

## 八、最佳实践

1. **选择合适的模型**：
    - `sonnet-4`：日常编码任务
    - `gpt-5`：复杂问题解决
    - `sonnet-4-thinking`：深度分析和架构设计
2. **利用会话历史**：
    - 使用 `cursor-agent ls` 查看历史
    - 用 `resume` 继续之前的工作
3. **自动化集成**：
    - 在CI/CD中使用API密钥认证
    - 选择合适的输出格式（json用于解析，text用于报告）
4. **项目定制**：
    - 在 `.cursor/rules` 中定义项目规则
    - 配置 `mcp.json` 以集成工具
5. **安全考虑**：
    - 生产环境使用环境变量存储API密钥
    - 定期轮换API密钥
    - 审查AI生成的代码

## 九、故障排除

1. **路径问题**：确保 `~/.local/bin` 在PATH中
2. **认证失败**：使用 `cursor-agent status` 检查状态
3. **模型不可用**：检查订阅计划和模型权限
4. **会话丢失**：使用 `cursor-agent ls` 找回历史会话

Cursor CLI是一个强大的工具，能够显著提升开发效率。通过合理使用交互模式和自动化功能，可以将AI助手无缝集成到您的开发工作流程中。

# Cursor CLI 完整命令参考（中文版）

## 一、主要命令

### 基础命令

| 命令 | 中文说明 | 使用示例 |
| --- | --- | --- |
| `cursor-agent` | 启动交互式会话 | `cursor-agent` |
| `cursor-agent login` | 通过浏览器登录认证 | `cursor-agent login` |
| `cursor-agent logout` | 登出并清除认证信息 | `cursor-agent logout` |
| `cursor-agent status` | 查看当前认证状态 | `cursor-agent status` |
| `cursor-agent update` | 更新到最新版本 | `cursor-agent update` |
| `cursor-agent upgrade` | 升级到最新版本（同update） | `cursor-agent upgrade` |
| `cursor-agent ls` | 列出所有历史会话 | `cursor-agent ls` |
| `cursor-agent resume` | 恢复最近的会话 | `cursor-agent resume` |
| `cursor-agent help [command]` | 显示帮助信息 | `cursor-agent help login` |

## 二、命令行参数

### 通用参数

| 参数 | 中文说明 | 使用示例 |
| --- | --- | --- |
| `-V, --version` | 显示版本号 | `cursor-agent --version` |
| `-h, --help` | 显示帮助信息 | `cursor-agent --help` |
| `-a, --api-key <key>` | 指定API密钥进行认证 | `cursor-agent --api-key YOUR_KEY "提示词"` |
| `-m, --model <model>` | 指定使用的AI模型 | `cursor-agent -m gpt-5 "编写代码"` |
| `-f, --force` | 强制允许命令执行 | `cursor-agent -f "执行任务"` |
| `--fullscreen` | 启用全屏模式 | `cursor-agent --fullscreen` |

### 非交互模式参数

| 参数 | 中文说明 | 使用示例 |
| --- | --- | --- |
| `-p, --print` | 启用非交互模式（打印到控制台） | `cursor-agent -p "查找bug"` |
| `--output-format <format>` | 设置输出格式（仅配合-p使用） | `cursor-agent -p "分析代码" --output-format json` |
| `--with-diffs` | 包含git差异信息 | `cursor-agent --with-diffs -p "审查变更"` |

### 输出格式选项

| 格式 | 中文说明 | 适用场景 |
| --- | --- | --- |
| `text` | 纯文本输出 | 人类阅读、报告生成 |
| `json` | JSON格式输出 | 程序解析、自动化处理 |
| `stream-json` | 流式JSON输出（默认） | 实时处理、进度显示 |

### 会话管理参数

| 参数 | 中文说明 | 使用示例 |
| --- | --- | --- |
| `--resume [chatId]` | 恢复指定的会话 | `cursor-agent --resume abc123` |
| `prompt` | 初始提示词（位置参数） | `cursor-agent "优化这段代码"` |

## 三、交互模式斜杠命令

在交互式会话中可用的命令：

| 命令 | 中文说明 | 使用示例 |
| --- | --- | --- |
| `/model <model>` | 切换或列出可用模型 | `/model gpt-5` |
| `/auto-run [state]` | 切换自动运行状态 | `/auto-run on` |
| `/new-chat` | 开始新的聊天会话 | `/new-chat` |
| `/vim` | 切换Vim键位模式 | `/vim` |
| `/help [command]` | 显示命令帮助 | `/help model` |
| `/feedback <message>` | 向开发团队发送反馈 | `/feedback 建议添加新功能` |
| `/resume <chat>` | 按文件夹名恢复会话 | `/resume project-chat` |
| `/copy-req-id` | 复制最后的请求ID | `/copy-req-id` |
| `/logout` | 从Cursor登出 | `/logout` |
| `/quit` | 退出当前会话 | `/quit` |

### 自动运行状态选项

| 选项 | 中文说明 |
| --- | --- |
| `on` | 开启自动运行 |
| `off` | 关闭自动运行 |
| `status` | 查看当前状态 |
| 无参数 | 切换开关状态 |

## 四、可用模型列表

| 模型名称 | 中文说明 | 适用场景 |
| --- | --- | --- |
| `sonnet-4` | Claude Sonnet 4模型 | 日常编码、代码生成 |
| `sonnet-4-thinking` | Claude Sonnet 4思考模型 | 深度分析、架构设计 |
| `gpt-5` | GPT-5模型 | 复杂问题、高级任务 |

## 五、环境变量

| 环境变量 | 中文说明 | 设置示例 |
| --- | --- | --- |
| `CURSOR_API_KEY` | API密钥环境变量 | `export CURSOR_API_KEY=your_key` |
| `PATH` | 系统路径（需包含~/.local/bin） | `export PATH="$HOME/.local/bin:$PATH"` |

## 六、特殊配置文件

| 文件/目录 | 中文说明 | 作用 |
| --- | --- | --- |
| `.cursor/rules` | 项目规则目录 | 定义项目特定的AI行为规则 |
| `mcp.json` | MCP配置文件 | 配置模型上下文协议服务器和工具 |

## 七、常用命令组合示例

### 1. 基础使用

```bash
# 简单交互
cursor-agent

# 带初始提示的交互
cursor-agent "帮我优化这个函数"

# 指定模型的交互
cursor-agent -m gpt-5

```

### 2. 非交互自动化

```bash
# 生成代码并输出为文本
cursor-agent -p "实现快速排序算法" --output-format text

# 代码审查并输出JSON
cursor-agent --with-diffs -p "审查安全问题" --output-format json

# 使用API密钥的自动化
cursor-agent --api-key YOUR_KEY -p "生成测试用例"

```

### 3. 会话管理

```bash
# 查看所有会话
cursor-agent ls

# 恢复最近会话
cursor-agent resume

# 恢复特定会话
cursor-agent --resume chat_id_123

```

### 4. 高级组合

```bash
# 全屏模式 + 特定模型 + 强制执行
cursor-agent --fullscreen -m sonnet-4-thinking -f

# API密钥 + 打印模式 + JSON输出 + Git差异
cursor-agent -a YOUR_KEY -p "代码评审" --with-diffs --output-format json

```

## 八、退出和帮助

| 操作 | 命令 | 说明 |
| --- | --- | --- |
| 退出交互模式 | `/quit` 或 `Ctrl+C` | 结束当前会话 |
| 查看主帮助 | `cursor-agent --help` | 显示所有可用命令 |
| 查看命令帮助 | `cursor-agent help [cmd]` | 显示特定命令的帮助 |
| 交互中查看帮助 | `/help` | 显示交互模式命令 |

## 九、故障排查命令

```bash
# 检查版本
cursor-agent --version

# 检查认证状态
cursor-agent status

# 重新登录
cursor-agent logout && cursor-agent login

# 强制更新
cursor-agent update

# 测试API连接
cursor-agent --api-key YOUR_KEY -p "测试" --output-format text

```