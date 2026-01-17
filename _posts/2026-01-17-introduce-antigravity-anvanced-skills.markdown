---
layout: single
title: "🚀Agent Skills决策树高级技巧！让Antigravity和Claude Code减少80%手动干预，AI编程助手终于能自主决策了！Codex CLI+Gemini CLI实现智能化代码审查"
sidebar:
  nav: "docs"
date: 2026-01-17 00:00:00 +0800
categories: LLMs
tags:
  - Claude Opus 4.5
  - Antigravity IDE
  - Antigravity
  - Claude Code
  - Agent Skills
  - AI智能体
  - Vibe Coding
  - AGI
  - Skills
classes: wide
author_profile: true
---

上期视频为大家演示了Agent Skills的基础用法，很多朋友私信问我：有没有更高级的玩法能进一步提升开发效率？答案是肯定的，而且效果相当不错。本期我将分享Agent Skills生态中被开发者称为"灵魂技术"的核心技巧——决策树。

## 什么是Agent Skills中的决策树？

首先需要澄清的是，这里说的决策树不是机器学习里那个需要训练数据的算法，而是一种在SKILL.md文件中嵌入结构化if-else决策逻辑的技术方案。

根据Anthropic官方文档的定义，Agent Skills是通过Markdown文件教会AI Agent如何完成特定任务的能力包。每个Skill本质上是一个包含SKILL.md文件的文件夹，通过YAML元数据和详细的指令说明，让AI智能体获得特定领域的专业能力。

决策树优化则是在这个基础上更进一步：通过显式定义条件分支、优先级排序和异常处理逻辑，让Antigravity、Claude Code、Codex CLI等AI编程助手能够自主判断、自主选择最佳方案，从而减少50%到80%的手动干预。




> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1KErQB4Esx/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/Qydk2wlh4YI)
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






## 为什么需要决策树？

相信大家在使用AI编程助手时都遇到过这样的情况：明明应该自动化完成的工作流，AI却频繁询问"下一步该怎么做？"这种人机问答模式不仅打断工作节奏，还消耗了大量不必要的时间。

决策树就是解决这个问题的终极方案。它的核心思想是：通过层层的条件判断，从根节点到叶节点逐步筛选，最终得出确定性的决策结果。

举个最简单的例子来帮助理解：假设我们根据天气预报决定是否带伞。如果预报有雨，再判断是否大雨——大雨带大伞，小雨带折叠伞；如果没雨，根据外出时间决定是否带外套。这就是一个典型的决策树结构。

## 实战案例：智能代码审查路由器

为了展示决策树的实际效果，我开发了一个名为code-review-router的Agent Skill。这个Skill能让Antigravity智能判断代码变更的类型和复杂度，然后自动路由到最适合的代码审查工具。

### 为什么要做工具路由？

在日常项目开发中，我们经常使用Codex CLI或Gemini CLI对代码进行审查。但两者各有特点：

- **Codex CLI**：审查深度高，但速度较慢，适合复杂变更和后端技术栈
- **Gemini CLI**：响应速度快，适合前端代码和简单变更

如果所有审查任务都让Antigravity内置模型处理，Token消耗会非常可观。通过将部分任务分配给Gemini CLI或Codex CLI，不仅能让审查更加专业，还能大幅节省Antigravity的用量。

### 决策树的执行流程

这个代码审查Skill的完整决策流程如下：

**第一步：环境检查**
首先判断当前目录是否为Git仓库，如果不是则执行git init初始化。

**第二步：工具可用性检测**
检查Gemini CLI和Codex CLI是否已安装。如果都不可用，自动安装；如果只有一个可用，直接使用该工具；两者都可用则进入下一步。

**第三步：分析Git diff**
获取代码变更内容，判断是否有实际变更。没有变更则直接结束，无需审查。

**第四步：复杂度评分**
这是决策树的核心环节。系统会根据多个维度对代码变更进行评分（满分10分）：
- 变更文件数量
- 代码行数
- 是否涉及数据库迁移
- 是否修改API服务层
- 是否跨多个顶级目录
- 是否包含复杂的TypeScript泛型

**第五步：路由决策**
根据评分结果和硬性规则进行工具选择：

硬性规则优先匹配Codex的情况：
- 包含敏感文件（如密钥、配置文件）
- 文件数超过20个
- 代码行数超过500行
- 数据库迁移或API服务层修改
- 跨越3个以上顶级目录

硬性规则优先匹配Gemini的情况：
- 纯前端代码（JS/CSS/HTML）
- Python生态项目
- 纯文档变更

如果没有命中硬性规则，则根据复杂度评分决策：评分≥6分使用Codex进行深度分析，评分<6分使用Gemini进行快速审查。

**第六步：执行与容错**
执行代码审查后，系统会判断是否成功。如果主工具执行失败（比如网络问题），自动切换到备选工具重试。

### 实际演示效果

在演示中，我让Antigravity为一个Chrome扩展项目新增功能，然后调用代码审查Skill。系统检测到9个文件变更，复杂度评分为3分（满分10分），判定为"纯前端JS更改、复杂度低、无敏感代码、无数据库或API更改"，于是选择Gemini CLI进行审查。

为了测试容错机制，我在Gemini CLI开始执行时故意断开网络。系统立即检测到错误，自动提示"Gemini CLI遇到错误，现在使用Codex CLI作为备选方案"，随后Codex成功完成了审查并输出报告，包括性能问题、安全问题和修复建议。

整个过程中，AI完全自主完成了工具选择和故障切换，无需任何人工干预。

## 如何配置斜杠命令快速调用

为了提高使用效率，可以将Skill配置为斜杠命令。在Antigravity中点击右上角菜单，选择"自定义"→"Workflow"→"Workspace"，新建一个名为"review"的工作流。

在描述中填写"代码审查，遵循团队标准"，在内容中使用@符号引用代码审查Skill，设置好审查规则后保存。之后只需在输入框输入"/review"就能一键调用。

## 决策树Skill的核心优势

通过这个实战案例，我们可以总结出决策树方案的几大优势：

**1. 真正的自主决策**
AI不再频繁询问"下一步怎么做"，而是根据预设的决策逻辑自主判断和执行。

**2. 专业化的任务分发**
不同复杂度的任务分配给最适合的工具处理，审查质量更高。

**3. 显著的成本节省**
将简单任务分流到免费或低成本的CLI工具，大幅降低主平台的Token消耗。

**4. 完善的容错机制**
主工具失败时自动切换备选方案，确保任务能够完成。

**5. 跨平台兼容**
同一套Skill不仅适用于Antigravity，还能在Claude Code、Codex CLI等任何支持Agent Skills标准的工具中使用。

## 写在最后

Agent Skills的决策树优化是目前社区公认最强大的高级技巧。它将AI编程助手从"问答机器"升级为真正具备自主决策能力的智能助手。除了代码审查，这套方案还可以应用于自动化测试、文档生成、部署流程等各种场景。

如果你也厌倦了反复确认"是否继续"，不妨尝试为你的常用工作流构建决策树Skill。一次投入，持续受益。

本期视频所用的代码审查Skill完整代码和流程图已放在视频描述栏，欢迎大家下载使用和改进。


### 🔥使用 @ 语法直接引用文件

```markdown
---
name: review
description: Code review following team standards
---

# Code Review Workflow

Apply all guidelines from @.agent/skills/code-review/SKILL.md to the target files.

## Scope
- Review files specified by user, or staged changes if none specified

## Output
- Create artifact with findings organized by severity
```


[🔥skills文件：](https://github.com/win4r/agent-skills-code-review-router)
