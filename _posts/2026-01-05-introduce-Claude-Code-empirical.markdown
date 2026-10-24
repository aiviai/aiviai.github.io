---
layout: single
title: "🚀Claude Code创始人Boris亲自揭秘：他的设置竟然如此简单！开箱即用才是最强工作流，复利工程思维让效率翻倍！Opus 4.5计划模式+iTerm2+斜杠命令+GitHub Actions"
sidebar:
  nav: "docs"
date: 2026-01-05 00:00:00 +0800
categories: AIAgents
permalink: /llms/introduce-Claude-Code-empirical
tags: [Claude Sonnet 4.5,Claude Code , Plugins, Claude Code 2.0, Vibe Coding, AI智能体, TDD, AGI, AIGC]
classes: wide
author_profile: true
---

最近看到 Anthropic 的 Boris Cherny 分享了他自己日常怎么用 Claude Code。这个名字可能很多人还不太熟，但 Boris 就是 Claude Code 的主要创建者——简单说，Claude Code 是 Anthropic 把 Claude AI 深度集成到终端和代码工作流里的工具，能直接读写文件、跑命令、甚至自己测试代码。

这条线程一发出来，点赞几万，转发几千，大家都在问：“你自己是怎么用的啊？” Boris 很爽快地就把自己的配置和习惯全抖出来了。说实话，看完以后我有点震撼——不是因为他用了什么黑科技，而是他把一个本来就很强的工具，用得特别“接地气”又高效。很多技巧其实我们普通程序员也能抄作业。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV15JibBfE8g/)
- [👉👉👉 通过YouTube观看](https://youtu.be/Xm-n4m7IaZk)
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




今天这篇文章，我就把 Boris 的分享拆开讲讲，顺便聊聊我的理解和感受。希望看完你也能有所收获，哪怕你现在还在用 Copilot 或者 Cursor，也能找到一些可以迁移的想法。

### 先说整体感觉：简单，但极致

Boris 一开头就说，他的配置其实“vanilla”（原味）得让人惊讶。没搞一大堆自定义，没魔改源码，就是老老实实把 Claude Code 的功能用到位。为什么？因为这个工具本身设计得就很灵活，每个人可以用出完全不同的风格。他团队里每个人用法都不一样，这点特别好——AI 助手不是要取代你，而是让你把自己的习惯放大。

我个人觉得，这才是未来编程的正确打开方式：AI 不是万能的“代码生成器”，而是像一个超级靠谱的搭档。你得花时间教它、调它，让它越来越懂你。

### 1. 多开，并行干活

Boris 在终端里同时跑 5 个 Claude 实例，每个 tab 编号 1-5，还开了系统通知，哪个需要输入就弹一下。他还会再开 5-10 个 web 版的 [Claude.ai/code，甚至用手机](http://claude.ai/code%EF%BC%8C%E7%94%9A%E8%87%B3%E7%94%A8%E6%89%8B%E6%9C%BA) App 开几个，早上通勤时扔个任务，回来继续。

这听起来有点夸张，但想想看：我们写代码的时候，是不是经常同时在想好几件事？一个在 debug，一个在重构，一个在写新功能。以前我们只能切 tab 切窗口，现在直接让 AI 并行处理不同的子任务，效率直接起飞。

我自己试过类似的操作，虽然没到他 5+5 的规模，但开 3 个确实舒服多了。一个负责写代码，一个负责 review，一个负责查文档。关键是，Claude 的上下文足够长，能记住之前聊过的内容，切换成本很低。

### 2. 模型选择：大模型 + thinking 模式

Boris 所有任务都用 Opus 4.5（应该是最新的 Claude Opus 版本）+ thinking 模式。虽然它更大更慢，但他觉得实际更快——因为不用反复纠正，工具调用也更准。

这点很多人有争议，小模型快是大实话。但 Boris 的逻辑我很认同：如果你要的是“一次搞定”，大模型的成功率高到能省掉后面好几轮来回。尤其写复杂逻辑或者需要深思熟虑的功能时，小模型容易翻车。

我自己现在也偏向大模型写核心代码，小模型用来快速原型或者简单修复。Boris 的选择本质上是“质量优先”，而不是“速度优先”。

### 3. 团队共享文档：活的“知识库”

他们团队把 Claude Code 的使用文档直接 check in 到 git 里，大家一起维护。每次发现 Claude 做错了，就加一条规则进去，下次就不会再犯。

这其实是一个“复合工程知识”的过程。文档不是死的，而是随着项目演进不断迭代。Boris 甚至在 code review 时直接 @ Claude，让它帮着更新文档。

这让我想到，我们很多团队用 Notion 或者 Confluence 写规范，但很少有人把 AI 的“行为规范”也当成代码一样管理。结果就是每个人用 AI 的风格都不一样，产出质量参差不齐。如果像 Boris 这样，把“教 AI 的经验”也版本化，那整个团队的效率会集体提升。

### 4. Plan 模式是王道

Boris 大部分会话都从 Plan 模式开始（shift+tab 两次）。先和 Claude 把整个 PR 的计划聊透了，满意后再切到 auto-accept 模式，让它直接改代码。通常一个好计划就能让 Claude 一把过。

这点太重要了！很多人用 AI 写代码，直接扔一句“帮我实现 XX 功能”，结果出来一堆需要大改的东西。Boris 的做法本质是把“架构设计”先做好，再执行。AI 的执行能力已经很强了，瓶颈往往在规划阶段。

我现在也强制自己先 plan，尤其是中大型功能。计划写得好，后面的修改基本就是“确认”而不是“重写”。

### 5. Slash commands 和 subagents：自动化常用流程

Boris 把每天重复的操作都做成 slash commands，比如 /commit-push-pr，会自动收集 git status、生成 commit message、推代码、开 PR。全程几乎不用手动输入。

还有 subagents，比如 code-simplifier 在写完后自动简化代码，verify-app 负责端到端测试。

这其实是在把自己的“肌肉记忆”教给 AI。程序员每天做的事 80% 是重复的，把这些重复的封装成命令或者子代理，AI 就能自己完成大半流程，你只管做高层决策。

### 6. 权限管理和工具集成

他不用 --dangerously-skip-permissions，而是用 /permissions 预授权常用命令。团队还共享了 Slack、BigQuery、Sentry 等工具的集成配置，Claude 可以自己去查日志、发消息、跑查询。

这点体现了成熟的工程思维：安全第一，但又不能让权限提示打断节奏。把常用工具接进来后，AI 就不再是“只写代码”的工具，而是能完整参与整个开发循环。

### 7. 长任务和验证：最关键的一环

对于长时间运行的任务，Boris 会让 Claude 自己验证结果，或者用 hook 自动验证。还有个有趣的 ralph-wiggum plugin（估计是让 AI 在后台自己跑）。

但他反复强调的最重要一点是：**给 Claude 一个验证自己的方式**。比如用 Chrome extension 自动测试 UI，直到功能正常、体验良好。

这句话我反复看了好几遍。AI 写代码再好，如果没有反馈循环，就很容易出现“看起来对但实际错”的情况。有了验证，质量能提升 2-3 倍。

这其实是所有 AI 编码工具的命门：闭环反馈。测试、CI、甚至手动跑一遍，都是在给 AI 提供反馈。Boris 把这点做到极致，甚至让 AI 自己开浏览器测试。

### 写在最后：AI 时代，程序员的核心竞争力是什么？

看完 Boris 的分享，我最大的感受是：真正会用 AI 的人，不是让 AI 代替自己写代码，而是把 AI 变成自己工作流的延伸。计划、验证、迭代、团队共享，这些原本就属于优秀程序员的习惯，现在通过 AI 被放大了。

Claude Code 只是一个工具，真正厉害的是 Boris 背后那一套方法论。无论你是用 Claude、Gemini、还是 Cursor，只要把这些思路学过去，效率都会上一个台阶。

如果你还没试过 Claude Code，建议去官网看看（[code.claude.com](http://code.claude.com/)）。它现在已经很成熟了，很多功能都是开箱即用。

---

## 🚀自定义斜杠命令

### 步骤 1：创建用户级命令目录

```markdown
mkdir -p ~/.claude/commands
```

### 步骤 2：创建命令文件

```markdown
nano  ~/.claude/commands/commit-push-pr.md
```

### 步骤 3：编写命令内容

将以下内容写入 `~/.claude/commands/commit-push-pr.md`：

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git commit:*), Bash(git push:*), Bash(git branch:*), Bash(git log:*), Bash(gh pr create:*), Bash(git rev-parse:*)
description: Commit, push, and open a PR
---

## Context

- Current git status: !`git status`
- Current branch: !`git branch --show-current 2>/dev/null || echo "No branch yet"`
- Has commits: !`git rev-parse HEAD >/dev/null 2>&1 && echo "yes" || echo "no"`

## Your task

1. First check if this is a new repository (no commits yet)
2. Stage all changes with `git add -A`
3. If there are no previous commits, create an initial commit
4. If there are previous commits:
   - Run `git diff HEAD` to see the changes
   - Create a descriptive commit message based on the diff
5. Commit the changes
6. Push the branch to origin (use `git push -u origin <branch>` for first push)
7. Create a pull request using `gh pr create` with:
   - A clear title summarizing the changes
   - A detailed description of what was changed and why

Handle edge cases gracefully:
- New repo with no commits: create initial commit first
- No remote configured: inform the user
- Branch doesn't exist on remote: use `git push -u origin <branch>`
```

### git-init命令创建方式

```markdown

nano ~/.claude/commands/git-init.md

---
allowed-tools: Bash(git init:*), Bash(git remote:*), Bash(git add:*), Bash(git commit:*), Bash(ls:*), Bash(cat:*)
argument-hint: [remote-url]
description: Initialize a git repository and optionally add remote
---

## Your task

1. Initialize a new git repository with `git init`
2. If a remote URL is provided ($ARGUMENTS), add it as origin: `git remote add origin <url>`
3. Create an initial commit if there are files to commit:
   - Stage all files with `git add -A`
   - Create initial commit with message "Initial commit"
4. Report what was done
```
