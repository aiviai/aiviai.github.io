---
layout: single
title: "🚀🚀OpenClaw/Moltbot自动进化技巧分享！打造全自动智能超级助手，彻底解放双手，让AI越用越聪明！能自动学习避坑！OpenClaw自动操控Claude Code，全程零干预实现规格驱动开发"
sidebar:
  nav: "docs"
date: 2026-01-31 00:00:00 +0800
categories: AIAgents
tags: [Claude Code, Clawdbot, Clawd, Vibe Coding, MoltBot, AI智能体, AI编程, spec-driven, OpenClaw]
classes: wide
author_profile: true
---



今天为大家分享一下OpenClaw这个项目的真实使用场景和使用技巧。

先说一下这个项目的更名历程，前几天这个项目还叫ClawdBot，然后改名成了MoltBot，昨天又从MoltBot改成了OpenClaw。所以本文我们就按照最新的名字OpenClaw来称呼它。

通过我这几天的深度使用，最大的感受就是——**OpenClaw更像是一个超级助理**。它并不是单单给Claude Code加了个即时通讯软件这么简单，因为OpenClaw它具有持久的记忆与定时任务功能，而且还能通过Home Assistant来控制智能家居。更厉害的是，它还可以实现边执行任务边学习，能够记住之前踩的坑以及遇到的问题，并且能够将经验同步更新到对应的Skill中。


>
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV17B61BxE3h/)
- [👉👉👉 通过YouTube观看](https://youtu.be/c5LKNO4YptM)
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




## 关于安全性，完全不用担心

大家可能担心OpenClaw的安全问题，这个担心是完全没必要的。

通过我这几天高强度的测试，让OpenClaw执行各种敏感操作，比如说让它来执行`rm -rf /`这条命令，然后OpenClaw它能准确识别到执行这条命令会将系统根目录下的所有文件全部删除，等同于自毁服务器，所以它直接拒绝执行。

还有就是我让它显示存储API Key的配置文件里的内容，然后OpenClaw它能很智能地知道这个文件里的内容是敏感内容，不能透露给我们。然后我让它直接将这个文件发送给我，它也不会直接将文件发送给我，而是只发给我配置结构，并不会将这些API Key等敏感内容发送给我。

所以自媒体上那些说OpenClaw删除了他们的数据或者删除了他们文件的说法，我感觉都是为了流量故意编造的一些引人转发的话题。

## 我用OpenClaw实现了什么？

我用OpenClaw实现了**自动发X Post**的功能，而且还实现了**每天早上8点准时为我生成与AI相关的英文播客**。当它生成好英文播客，就会自动推送给我这个音频文件，然后我只需要点击播放就可以了。像这样的话，我们每天早上就可以听OpenClaw为我们生成的与AI相关的英文播客来练习英语听力。

我甚至还实现了**让OpenClaw操控Claude Code**，通过SpecKit实现规格驱动开发。也就是整个操作流程都由OpenClaw来操控，Claude Code通过SpecKit实现规格驱动开发，整个过程都不需要我们手动去干预。

当OpenClaw完成整个操作流程之后，它就会学习到这些操作技巧和操作经验，并且我们可以让它将学习到的经验直接写入到对应的Skill中。这样的话，它下次再帮我们去操作Claude Code，就能够读取Skill中积累的这些经验和技巧。

通过不断迭代对应的Skill以及OpenClaw的记忆，所以OpenClaw它更像一个**能够自动进化的AI智能体**，越用越聪明。

## 为什么我选择GPT-5.2模型

为了让OpenClaw更聪明，我这里使用了GPT-5.2模型。因为通过我这几天的测试，发现使用GPT-5.2可以完成更加复杂的任务。之所以没有用Claude模型，是因为我怕被Claude给封号。

## 三大核心Skill详解

为了让OpenClaw能够自动生成播客、能够为我发X Post、还有能够为我调用Claude Code通过SpecKit实现规格驱动开发，为了实现这些功能，每一个功能我都写了一个Skill来实现对应的场景：

**第一个Skill**是用来在Claude Code或者在OpenClaw中实现自动发布X Post的。

**第二个Skill**是用来生成每日英文播客的。大家也可以将这个Skill改成让它生成中文播客，因为我是为了练习英语听力，所以默认让它生成英文播客。这个Skill的功能就是它能将任何一个链接里的文章内容来生成播客风格的MP3。

**第三个Skill**就是在OpenClaw中来调用Claude Code，用SpecKit或者OpenSpec实现真正的规格驱动开发。

## 播客生成实战演示

我们可以在OpenClaw中来测试一下这个能够自动生成播客的Skill。比如说我们随便找一篇科技文章，直接复制这个文章的链接，再回到我们的聊天软件，就可以直接输入提示词：

> "将这篇文章通过播客Skill生成英文播客"

然后直接发送，它就很快为我们生成了这个播客。这样的话，我们就实现了在OpenClaw中为我们生成播客。

然后我们还可以将它设置成定时任务，让它每天早上七点自动生成一篇播客推送给我。它会从指定的RSS里选一篇文章来生成英文播客并且推送给我。

## 操控Claude Code实现规格驱动开发

下面我们测试一下使用Claude Code这个Skill，让OpenClaw直接操控Claude Code，通过SpecKit或者OpenSpec这两个规格驱动开发的工作流，在Claude Code中实现真正的规格驱动开发。

我输入的提示词是：

> "调用Claude Code，使用OpenSpec开发一个X风格的私人日记的Web应用，要求具有简单的发送输入框、无限滚动时间线、情绪标签、图片上传、日历快速跳转、去年今日回顾的功能"

然后直接发送，看一下它能否通过这个Skill来调用Claude Code为我们完成这个项目的开发。

## Skill迭代的核心方法论

让我来分享一下我是如何在OpenClaw中通过不断试错、不断迭代，最后完善了这个调用Claude Code的Skill。

首先最简单的方式是我将Claude Code的官方文档发送给了OpenClaw，然后告诉它让它深度阅读Claude Code的官方文档，然后创建一个OpenClaw可以调用的Skill。紧接着它就阅读了文档并且很快开发好了能够调用Claude Code的这个Skill。

在测试过程中遇到报错，我将报错发送给它让它去修复，经过几轮迭代它就修复了。然后我告诉它让它通过Claude Code使用SpecKit的完整步骤和技巧，更新到Claude Code的Skill中。紧接着它就更新了这个Skill。

**核心流程就是：**

我们来提出需求 → 让OpenClaw来执行 → 观察和测试是否会报错 → 如果报错就进行调试 → 最后将报错踩的这些坑和总结的这些经验编写为Skill → 将Skill推送到GitHub → 再重复测试这个Skill → 再进行观察和调试 → 再不断更新这个Skill → 再推送再重复测试

通过这个循环让OpenClaw持续迭代对应的Skill，最后得到一个非常完善且非常高效的Skill。

## 让AI记住经验，越用越聪明

每当OpenClaw完成一个复杂任务后，我都会让它将学习到的经验存储到记忆文件里，同时更新到对应的Skill中。这样的话：

1. 它的记忆库会不断积累使用技巧
2. 对应的Skill会不断完善
3. 下次执行类似任务时就能直接读取这些经验

当对应的Skill迭代到一定程度的时候，OpenClaw就可以通过对应的Skill来轻松完成我们交给它的任务。

## 最终效果展示

运行之后我们就看到了它调用Claude Code使用OpenSpec为我们开发了这个X风格的私人日记应用。而且还自动生成了一些测试数据，我们可以随便输入内容测试，选择情绪标签，点击记录就发送成功了。

像这样的话，这个项目就完全是OpenClaw通过Claude Code这个Skill，用OpenSpec规格驱动开发来完成的项目开发。

---

**总结一下**，OpenClaw不仅仅是一个即时通讯机器人，它是一个能够：
- 跨平台使用（WhatsApp、Telegram、Slack、Discord等）
- 持久记忆并不断学习
- 通过Skill系统无限扩展能力
- 安全可靠地执行各种任务
- 越用越聪明的AI超级助理

项目地址：https://github.com/moltbot/moltbot

如果你也想拥有这样一个能够自动进化的AI智能体，强烈推荐去试试OpenClaw。

本期分享就到这里，欢迎大家点赞关注和转发，谢谢大家观看！
