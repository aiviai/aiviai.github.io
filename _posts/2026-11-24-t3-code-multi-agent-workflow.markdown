---
layout: single
title: "T3 Code 实测：一条指令开四个线程，还能用手机派活"
sidebar:
  nav: docs
date: 2026-11-24 22:09:12 +0800
categories: [AIAgents]
tags: [T3 Code, AI编程, Codex, Claude Code, Antigravity, Git worktree]
excerpt: "用 T3 Code 实测同会话交叉审查、四个 Git worktree 并行开发、手机派活和远程 Mac mini 调度。最后演示三 Agent 审查工作流如何启动，录制中未等待它跑到最终合并。"
description: "用 T3 Code 实测同会话交叉审查、四个 Git worktree 并行开发、手机派活和远程 Mac mini 调度。最后演示三 Agent 审查工作流如何启动，录制中未等待它跑到最终合并。"
cover_lines: ["T3 Code"]
cover_subtitle: "四线程并行 · 手机远程派活"
cover_labels: ["T3 Code"]
cover_caption: ["四线程并行 · 手机远程派活"]
classes: wide
author_profile: true
toc: true
---

这次我想试一件很具体的事：让 Antigravity 先改代码，接着在同一个会话里换 Codex 审查。平时做这两步，我得在不同的工具之间来回切，还要告诉后一个 Agent 前面改了什么。在 T3 Code 里，我直接切换了助手和模型，再让它检查刚才那批改动。

同一个界面还能做两件不同的事：把一条指令分给四个 Agent，让它们各自在独立的工作区改；或者从手机发任务，回到电脑上继续看进度。下面按这期演示的顺序，看这些功能各自解决什么问题。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/efw7W3A6N6E" title="AI超元域：T3 Code 并行开发、远程派活与工作流实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=efw7W3A6N6E)。

---

## 安装以后，先把常用助手留在模型菜单里

[▶ 观看对应测试：02:03](https://www.youtube.com/watch?v=efw7W3A6N6E&t=123s)

[T3 Code](https://t3.codes/) 把不同的编程 Agent 放进同一个界面。按[官方项目说明](https://github.com/pingdotgg/t3code)，它调用你已安装、已登录的编程助手，不另外出售模型额度。装好桌面端后，可以在 Settings → Providers 里检查要接入的工具。这次我配了 Codex、Claude Code、Grok、Antigravity 和 Pi。

如果模型菜单很长，可以先关掉不常用的选项，需要时再打开。比如在 Codex 下，我只留下 GPT-6.1 Sol 和 GPT-6 Astra。先用一个已登录的助手确认能发任务，比一次把所有工具都接进来更容易查出配置问题。

---

## 在项目里用 Gemini 分析代码，再用 Cite 追问

[▶ 观看对应测试：03:10](https://www.youtube.com/watch?v=efw7W3A6N6E&t=190s)

从侧边栏添加项目以后，可以看它在哪台设备上运行，再从输入框选助手、模型和推理级别。我在演示里选了 Antigravity 下的 Gemini 4，将推理级别设为 Medium，让它分析项目的代码质量和性能。发出去后可以在同一个界面看执行状态和运行时间。

[▶ 观看对应测试：04:14](https://www.youtube.com/watch?v=efw7W3A6N6E&t=254s)

相比这次对照的 Orca 界面，我更喜欢 T3 Code 把输出放到统一的 GUI 里。这一点在需要接着改代码时更明显：我选中分析结果里想处理的那段，点 **Cite**，追加让它重点修复的指令，Antigravity 就按引用继续改。我也演示了斜杠命令、用 `@` 引用项目文件和上传附件。这里好用的地方是可以直接指着上一条回复里的某一句继续做，不用把整段分析复制到新会话。修复后的性能没有在这期单独跑基准。

---

## 同一个会话里，换 Codex 审查刚才的改动

[▶ 观看对应测试：05:29](https://www.youtube.com/watch?v=efw7W3A6N6E&t=329s)

Antigravity 改完后，我没有新开窗口，而是切到 Codex 的 GPT-6.1 Sol，让它审查上一轮的代码改动。这次 Codex 拿到了前面的对话上下文，并输出了审查结果。

这个功能适合有先后顺序的任务：一个助手负责改，另一个从不同角度看改动。它能省掉我手动复述上下文的步骤；至于修得对不对，还是要回到 diff 和测试结果。

---

## 一条指令启动四个线程，改动分开看

[▶ 观看对应测试：06:17](https://www.youtube.com/watch?v=efw7W3A6N6E&t=377s)

想对比多个方案时，我用的是另一个入口：选择 **New worktree**，按住 Shift 多选助手和模型，再发同一条任务，让它们分析并优化项目性能。发出后侧边栏出现四个线程，各自收到相同的提示词。

四个线程分别在自己的 Git worktree 里工作。这样一个 Agent 写文件时，不会直接覆盖另一个 Agent 同时改的文件。最后选哪一个方案，还是要分别看 diff、跑同一套测试；如果要把多路改动合进同一条分支，也仍可能出现冲突。这一段证实的是并行派发和工作区隔离，不是四个方案都完成了优化，也没有测出谁快多少。

---

## 手机扫一次码，电脑接着跑

[▶ 观看对应测试：07:42](https://www.youtube.com/watch?v=efw7W3A6N6E&t=462s)

我先在电脑端打开网络访问，再创建配对链接，用手机上的 T3 Code 扫描二维码。连上后，我在手机里选了一个项目和 Antigravity 的 Gemini 4 Neon，发了一个代码审查任务。电脑端收到了同一条任务，手机和电脑上都能看到它正在运行。

如果只是离开桌面一会儿，这已经够用：手机发指令、看进度，真正运行 Agent 的仍是连接的那台电脑。配对二维码和链接不要公开分享；连接方式和网络要求可以先看[官方项目的远程访问说明入口](https://github.com/pingdotgg/t3code#documentation)。

---

## 远程 Mac mini：用那台机器上已经装好的助手

[▶ 观看对应测试：08:55](https://www.youtube.com/watch?v=efw7W3A6N6E&t=535s)

我又通过 Tailscale 接入另一台 Mac mini。远端项目在侧边栏有自己的标识，选中后可用的助手取决于那台机器装了什么。这台 Mac mini 没装 Codex 和 Claude Code，所以我选的是 OpenCode，让它分析项目用了哪些技术栈。

OpenCode 返回了分析结果，两台电脑上的 T3 Code 能看到同一个项目会话。和手机派活相比，这一段想验证的是：**任务可以交给另一台机器的项目和 Agent**，而不是把远端项目拉回当前电脑才开始跑。

---

## Workflows：把改代码、双人审查和人工审批串起来

[▶ 观看对应测试：09:52](https://www.youtube.com/watch?v=efw7W3A6N6E&t=592s)

最后我打开 Labs 里的 Workflows，演示一个构建者加两位审查员的脚本。脚本让 Codex 的 GPT-6 Astra 在独立 worktree 里实现、跑测试并提交；再由 Claude Code 和 Antigravity 分别进行只读审查。按脚本设计，两边都通过后才把合并决定交给人：同意才交给 Codex 合并，不同意就保留分支。

我在视频里启动了流程，并演示了怎么查询运行状态。录制没有等到流程结束，所以这段没有验证双审查是否都通过，也没展示最终合并。Workflows 是需要开启的实验功能，准备试脚本时，先核对当前构建是否支持以及[项目的 Workflows 使用说明](https://github.com/pingdotgg/t3code/blob/main/skills/t3-workflows/SKILL.md)。脚本本身也要先用可丢弃的测试分支走一遍，特别是审查未通过和拒绝合并这两条路径。

---

如果只试一个功能，我会先从**同会话交叉审查**开始，给现有改动加一道检查，不用先搭工作流。需要对比几种实现，再开独立 worktree 同题并行。至于每次都要重复的「构建、测试、审查、等我批准」，才值得写成 Workflows。

本文按本期校正口播字幕和公开视频章节整理。功能是否可用取决于 T3 Code 构建版本、所接入的助手和实际网络环境。
