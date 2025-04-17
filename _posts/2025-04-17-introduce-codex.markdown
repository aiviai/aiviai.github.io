---
layout: single  
title: "🚀OpenAI首发轻量级AI编程智能体-OpenAI Codex CLI，编程能力能否超越cursor？Codex编程智能体实战，打破编程瓶颈，自动化开发，轻松构建3D城市模拟与任务管理系统的实战教程"  
sidebar:
  nav: "docs"
date: 2025-04-17 10:00:00 +0800  
categories: AIAgents  
tags: [cursor, codex, OpenAI, OpenAI Codex CLI, OpenAI Codex, Codex CLI, AI Agent]  
classes: wide  

author_profile: true  
---

OpenAI近日正式发布了Codex CLI，这是一款开源的AI编程助手，专为开发者在本地终端环境中高效编写、修改和运行代码而设计。Codex CLI不仅集成了OpenAI最新的推理模型，还能直接操作本地文件与命令行，实现更智能、更自动化的开发体验。


### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1n55BztEwJ/)
- [👉👉👉 通过YouTube观看](https://youtu.be/Qcyycy4aYgY)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- [👉👉👉 Windsurf注册和下载](https://windsurf.com/refer?referral_code=e0soesze5kyr9o53)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  

## 什么是OpenAI Codex CLI？

Codex CLI是一个轻量级的命令行工具，能够在开发者的本地环境中运行，无需将源代码上传至云端，从而保障了项目的私密性和安全性。它本质上是一个“AI编码代理”，可读取、修改并执行本地代码，帮助开发者更快地构建新功能、修复Bug、理解陌生代码库，甚至自动化重复性任务。

## 主要特性

- **本地执行，安全隐私**
    
    所有代码的读取、编辑和命令执行都在本地完成，敏感项目无需担心数据泄露。
    
- **多模态输入**
    
    除了文本指令，Codex CLI还支持截图、草图等输入方式，AI可据此生成或编辑代码，极大提升了交互的直观性和灵活性。
    
- **三种自动化模式**
    - *Suggest*：默认模式，AI提出修改建议，由用户审核决定是否采纳。
    - *Auto Edit*：自动编辑文件，但执行Shell命令前需用户确认。
    - *Full Auto*：完全自动化，AI可在沙箱环境下自主读写、执行任务，适合批量重构或原型开发。
- **开源透明，社区驱动**
    
    Codex CLI完全开源，托管于GitHub，开发者可以自由贡献代码、提交反馈，共同完善产品。
    
- **支持最新AI模型**
    
    支持OpenAI最新的o3、o4-mini等模型，并计划兼容GPT-4.1等更强大的模型。
    
- **沙箱与网络隔离**
    
    在macOS上采用Apple Seatbelt沙箱，Linux上用Docker，默认禁用网络访问，确保执行安全。
    

## 安装与上手

Codex CLI安装极为便捷，仅需一行命令即可全局安装：

`npm i -g @openai/codex`

配置好OpenAI API密钥后，即可通过`codex`命令进入交互环境，或直接输入自然语言指令让AI帮你完成各类开发任务。例如：

- 解释项目结构：`codex "explain this codebase to me"`
- 修复Lint错误：`codex "fix lint errors"`
- 生成SQL迁移：`codex "generate SQL migrations for adding a users table"`
- 批量重命名文件：`codex "bulk-rename *.jpeg → *.jpg with git mv"`

对于需要全自动化的场景，可以加上`--approval-mode full-auto`参数，让AI自主完成全部流程。

## 场景与优势

Codex CLI非常适合习惯在终端开发的程序员。它不仅能像ChatGPT一样理解自然语言，还能直接执行代码、批量操作文件、自动化测试、重构代码等，极大提升开发效率。与传统AI助手相比，Codex CLI更强调“能动性”，不仅给建议，更能实际落地执行。

此外，Codex CLI对代码安全尤为重视，所有操作都在本地、受控的沙箱目录内进行，适合对隐私和安全有高要求的企业和个人开发者。

## 未来展望

OpenAI将Codex CLI视为迈向“AI软件工程师”愿景的重要一步。虽然目前Codex CLI还无法完全替代人类开发者，但它已能处理大量重复性、结构化的开发任务，为开发者节省宝贵时间。未来，随着AI模型能力提升和社区生态完善，Codex CLI有望成为开发流程中不可或缺的智能助手。

对于追求高效、智能、安全开发体验的程序员来说，Codex CLI无疑是值得尝试的新利器。


## 基本安装与设置

### 🔥Windows用户需要开启WSL，请参考开启教程：
[https://learn.microsoft.com/zh-cn/windows/wsl/install](https://learn.microsoft.com/zh-cn/windows/wsl/install)

### 🔥Nodejs配置

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.14.0".
nvm current # Should print "v22.14.0".

# Verify npm version:
npm -v # Should print "10.9.2".

```

全局安装:

```bash
npm install -g @openai/codex

```

设置 OpenAI API 密钥:

```bash
export OPENAI_API_KEY="your-api-key-here"

```

设置模型

```bash
codex --model gpt-4.1-2025-04-14
```

如果你想让这个模型设置永久生效，可以创建配置文件：

```bash

mkdir -p ~/.codex
echo "model: gpt-4.1-2025-04-14" > ~/.codex/config.yaml

```

这样你每次启动 Codex 时就不需要再指定模型参数了。

## 基本使用方式

### 交互式运行:

```bash
codex

```

### 使用提示作为输入:

```bash
codex "解释这个代码库给我"

```

### 完全自动模式:

```bash
codex --approval-mode full-auto "创建最精美的待办事项应用"

```

## 安全模型与权限

Codex 提供了三种操作模式:

1. **建议模式 (Suggest)** - 默认模式
    - 可以读取仓库中的任何文件
    - 所有文件写入/补丁和所有 shell 命令都需要批准
2. **自动编辑 (Auto Edit)**
    - 可以读取并应用补丁写入文件
    - 所有 shell 命令仍需批准
3. **完全自动 (Full Auto)**
    - 可以读写文件
    - 可以执行 shell 命令
    - 所有操作都在禁用网络的环境中运行，并限制在当前工作目录

## 高级配置

Codex 会查找 `~/.codex/` 目录下的配置文件:

```yaml
# ~/.codex/config.yaml
model: o4-mini # 默认模型
fullAutoErrorMode: ask-user # 或 ignore-and-continue

```

你还可以定义自定义指令:

```yaml
# ~/.codex/instructions.md
- 总是用表情符号回应
- 只有当我明确提到时才使用 git 命令

```

## 记忆与项目文档

Codex 按以下顺序合并 Markdown 指令:

1. `~/.codex/instructions.md` - 个人全局指导
2. 仓库根目录的 `codex.md` - 共享项目注释
3. 当前工作目录的 `codex.md` - 子包特定说明

## 使用技巧

1. **使用版本控制**: 始终在 Git 仓库中使用 Codex，这样你可以随时查看变更并回滚不需要的更改。
2. **从小任务开始**: 先尝试小而明确的任务，熟悉工具的工作方式。
3. **明确指令**: 提供清晰、具体的指令以获得最佳结果。
4. **利用项目文档**: 使用 `codex.md` 文件来提供项目特定的上下文和指导。
5. **使用沙箱保护**: 记住 Codex 首先在沙箱中运行，允许你在应用到实际工作目录之前查看和批准更改。

## 测试案例

### 🔥3D模拟城市

```markdown
# AI超元域频道原创视频

codex --model gpt-4.1-2025-04-14  --approval-mode full-auto "使用 Three.js 创建一个 3D 城市场景，呈现一个繁忙的城市环境，
其中包含摩天大楼、公寓楼和沿街的小商店。加入有行驶的汽车、交通信号灯和人行横道的道路，
为城市注入生机。添加在人行道上行走和过马路的行人，以增强真实感。
包含路灯、长椅和树木等街道元素，打造更具沉浸感的体验。
利用动态光照模拟昼夜循环，并实现基本的相机控制，让用户能够从不同角度探索这个充满活力的城市景观。"
```

### 🔥todo list

```markdown
# AI超元域频道原创视频

codex --model gpt-4.1-2025-04-14  --approval-mode full-auto "创建一个现代化的Todo List应用，具有以下功能：

1. 任务管理功能:
   - 添加新任务
   - 标记任务为完成/未完成
   - 编辑现有任务
   - 删除任务
   - 按优先级分类任务(高、中、低)
   - 任务截止日期设置

2. 分类与过滤:
   - 创建任务分类(如工作、个人、学习等)
   - 按完成状态过滤任务
   - 按截止日期排序
   - 搜索任务功能

3. 用户体验:
   - 响应式设计，适配移动端和桌面端
   - 拖放重新排序任务
   - 深色/浅色主题切换
   - 简洁美观的UI设计

4. 本地存储:
   - 使用localStorage保存任务数据
   - 导入/导出任务列表功能

使用HTML、CSS和JavaScript实现，不依赖任何后端服务。确保代码结构清晰，UI交互流畅，并提供适当的用户反馈。"
```