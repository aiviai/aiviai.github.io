---
layout: single
title: "🚀开源界的Claude Code来了！生产力核弹opencode深度使用体验，支持Antigravity IDE！结合OpenSpec规格驱动开发！LSP完整支持，Token消耗一目了然，程序员福音！"
sidebar:
  nav: "docs"
date: 2026-01-07 00:00:00 +0800
categories: LLMs
tags: [OpenCode, Claude Code, Plugins, Oh My OpenCode, Vibe Coding, AI智能体, TDD, AGI, AIGC]
classes: wide
author_profile: true
---


最近有不少朋友让我介绍一下 OpenCode 这款 AI 编程工具。确实，OpenCode 近期非常火，前两天还登上了 GitHub Trending。通过这几天的深度使用，我发现 OpenCode 可以在一定程度上取代 Claude Code，尤其是对于那些无法解决 Claude Code 封号问题的用户来说，OpenCode 是一个非常不错的替代方案。


> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1saimBYEXE/)
- [👉👉👉 通过YouTube观看](https://youtu.be/_h2MGwJO1Yc)
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



## 为什么选择 OpenCode？

在正式介绍之前，先说说我的实际测试结果：我使用 OpenCode 为一个已有的原生 iOS 背单词应用新增了判断题功能，整个过程中新增的功能完全没有任何错误，而且可以通过测试。这让我对 OpenCode 的实际能力有了比较直观的认识。

OpenCode 使用起来和 Claude Code 非常像，无论是它内置的这些命令还是使用方式，跟 Claude Code 相比在使用体验和易用程度上感觉区别并不是非常大。

相比 Claude Code，OpenCode 有几个明显的优势：

**完全开源**：OpenCode 采用 MIT 许可证，这意味着你可以自由地使用、修改和分发代码，不用担心闭源带来的各种限制。

**免费模型支持**：OpenCode 内置的 API 可以让我们免费使用 GLM-4.7 模型、MiniMax M2.1 这两款国产模型，还可以免费使用 xAI 的 Grok Code。

**多模型自由切换**：相比 Claude Code 只能使用 Anthropic 的模型，OpenCode 支持更多的 API 提供商以及大模型，你可以通过自己的 Claude 账号进行登录，或者使用自己的 Claude API、OpenAI API 等。

**强大的插件系统**：OpenCode 具有强大的插件系统，可以扩展更多功能。

**精致的 TUI 界面**：OpenCode 具备精致的 TUI 界面，从而解决了 Claude Code 长期存在的闪烁问题。

**完整的 LSP 支持**：OpenCode 能完整地支持 LSP，而 Claude Code 虽然官方已经支持了 LSP，但到目前为止还是存在很多 bug，官方至今还没有修复。

**多智能体系统**：OpenCode 还可以实现多智能体系统，为复杂任务提供更好的支持。

## 安装方式

想使用 OpenCode 非常简单，官方仓库给出了多种安装方式。对于 macOS 用户和 Linux 用户，可以直接使用 Homebrew 进行安装。而且它还为 macOS 提供了桌面版的安装包。

如果你习惯在编辑器中使用，OpenCode 还提供了 VS Code 插件。这样就方便我们在 VS Code、Cursor 或者谷歌的 Antigravity 中进行使用。

## 实测一：使用 MiniMax M2.1 添加判断题功能

下面进入实际测试环节。我这里打开的是一个 iOS 的原生背单词应用，目前这个应用的练习功能只有选择题、填空题、听力题，我们要让 OpenCode 为它新增一个判断题的功能。

首先，我们用斜杠命令加 model 来选择模型，这里我选择它自带的 MiniMax M2.1 模型。

### 项目分析

在添加功能之前，我们可以先测试一下让它分析项目。输入一个最简单的提示词，让它分析这个项目是如何实现单词发音的。在右侧我们可以看到它启用了 LSP 对代码进行搜索和分析。可以看到它的运行速度非常快，很快就输出了对这个代码的分析，而且这里输出了用于单词发音的代码，还给出了详细的解释。

想开启 LSP 功能的话，我们只需要在项目的根路径创建一个 opencode.json 文件。因为我这个项目是 Swift 开发的，所以在扩展这里就写了 swift。

### 初始化 AGENTS.md

在 OpenCode 中，我们用斜杠命令加 init 让它来初始化一个 AGENTS.md 文件。这个文件类似于 Claude Code 中的 CLAUDE.md 文件，在里面会包含构建命令、项目结构以及约定等内容。

当我们需要用 OpenCode 对已有的项目进行改动或者二次开发的时候，我们就要用 /init 命令让它先生成 AGENTS.md 这个文件。生成的文件包含构建项目运行项目的命令、代码风格指导，还包含项目的结构信息。

### 实现判断题功能

当 AGENTS.md 文件生成完成之后，我们就可以让它来添加功能了。在添加功能之前我们还是用斜杠命令加 new 新开一个 session，这个功能就类似于我们在 Claude Code 中使用斜杠命令加 clear 来清空上下文并且创建一个新的 session。

目前这个模式是构建模式，然后我们输入提示词让它为练习功能新增一个判断题的选项。OpenCode 开始执行任务，创建文件、分析代码、编写新功能。在执行过程中它检查到错误，然后开始自动修复。很快就提示构建成功，判断题已经完成。

我们打开应用验证一下，点击练习，这里确实出现了判断题的选项。点击开始进行测试，成功完成了十道判断题，而且还给出了用时和正确率，错题也可以复习。整个效果实现得非常不错，而且整个过程我们使用的是免费的 MiniMax M2.1 模型。

## 使用 Claude 账号登录

OpenCode 支持通过我们自己的 Claude 账号来登录。在 OpenCode 中用斜杠命令输入 /connect，然后选择 Anthropic，再选择 Claude Pro Max。它会给出一个链接，我们复制这个链接粘贴到浏览器中，完成验证流程，获取验证码后粘贴回 OpenCode 即可。

完成验证后，我们就可以选择模型了，这里我选择最强的 Claude Opus 4.5。这样我们就可以在 OpenCode 中使用最强的 Claude Opus 4.5 进行开发了。

## 实测二：结合 OpenSpec 添加多选题功能

下面我们加大难度，在 OpenCode 中使用 OpenSpec 这个规格驱动开发工作流，在当前已有的项目上继续新增功能。

OpenSpec 是一个开源的规格驱动开发工作流工具，非常适合我们在老项目上进行二次开发和迭代。它的核心理念是将开发过程分解为：提案创建、审查、实现、归档这几个阶段，让 AI 辅助开发更加有序可控。

### 安装 OpenSpec

首先打开一个终端命令行来安装 OpenSpec，直接执行官方给出的安装命令即可。安装完成后用命令校验一下版本号，确认安装成功。

然后执行命令来初始化 OpenSpec，在安装选项中找到 OpenCode 并选中，这样 OpenSpec 就安装成功了。安装完成后需要重启一下 OpenCode。

### 使用 OpenSpec 工作流

按照 OpenSpec 给出的步骤，首先让它完善 PROJECT.md 这个文件。复制官方给出的提示词，粘贴到 OpenCode 中运行。

运行完成后，我们就可以输入让它为我们实现的功能。这次我们要让它在这个背单词的 App 上新增一个多选题的功能。

输入英文提示词，让它在背单词的 App 上新增多选题模式，并请为这个功能创建 OpenSpec 变更提案。因为使用 Claude Opus 4.5，使用英文提示词效果会更好。

很快这个提案就创建完成了，我们可以展开来详细查看它为我们生成的这些任务。

### 执行任务

在 OpenCode 中使用 OpenSpec 命令执行任务。可以看到它生成了计划，开始执行。在右侧我们可以实时查看 Token 消耗。代码编写完成后，提示构建成功，然后开始运行测试。在右侧任务列表这里可以看到它正在写单元测试。

测试完成，任务也都运行完成。在右侧可以看到 Token 消耗，还可以看到它更新了哪些文件。

### 归档变更

当这些任务完成之后，我们用 OpenSpec 命令让它进行归档。归档成功后，在编辑器中生成变更记录并提交。

### 验证结果

打开背单词的 App 看一下是否实现了多选题的练习。点击练习，可以看到这里确实有了多选题选项。点击进入，开始测试，成功完成了十个多选题。

## 使用体验总结

通过测试可以发现，OpenCode 几乎不需要任何学习成本。如果你习惯使用 Codex 或者 Claude Code，那么也能一分钟之内就能上手使用 OpenCode。

在 OpenCode 中，Token 消耗、任务执行以及文件更改我们都能一目了然，而且它还支持完整的 LSP 功能。相比 Claude Code，OpenCode 在透明度和可控性方面做得更好。

OpenCode 与 OpenSpec 的结合使用，为 AI 辅助开发提供了一个更加结构化、可追踪的工作流程。特别是对于老项目的二次开发和迭代，这种规格驱动的方式能够让开发过程更加有序，减少 AI 生成代码的不确定性。

对于想要尝试 AI 编程工具但又担心 Claude Code 封号问题的开发者来说，OpenCode 确实是一个值得考虑的替代方案。它不仅免费提供多款模型的使用，还支持接入自己的 API 和订阅，灵活性很高。

当然，工具只是辅助，最终的开发效果还是取决于你的提示词质量和对项目的理解。建议大家可以先从简单的任务开始尝试，逐步熟悉 OpenCode 的使用方式和各种功能，再逐渐挑战更复杂的开发任务。
