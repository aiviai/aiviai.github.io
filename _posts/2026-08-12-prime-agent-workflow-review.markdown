---
layout: single
title: "Prime Agent 实测：动态分工、四个 SubAgent 与长期任务"
date: 2026-08-12 23:32:56 +0800
categories: AIAgents
tags: [PrimeAgent, RLM, Harness, MultiAgent]
cover_lines: ["Prime Agent"]
cover_subtitle: "动态分工 · 四个子任务与长期目标"
classes: wide
author_profile: true
sidebar:
  nav: "docs"
---

大家好，我是 AI 超元域。

这期测试 Prime Agent，我最意外的经历是：原本只是让它并行分析一个项目，它却打开了电脑上的 Orca，在多个终端中启动 Codex，把任务继续分发出去。为了避免额度快速消耗，我随后要求它停止，并关闭这些终端。

这个过程很适合用来理解 Prime Agent 的特点，也提醒我们：当 Agent 能动态组织工具和其他 Agent 时，任务范围、预算和停止方式需要提前说清楚。

本文根据 2026 年 8 月 12 日的视频简介、章节和匹配到的已保存校正字幕整理。此次未取得 YouTube 在线字幕导出，没有重新执行视频中的任务。以下区分当时的演示、项目机制和后续文档核对，避免把“自我改进”写成模型权重被训练更新。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 1.5em 0; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/OQ09v_T81I8" title="AI超元域：Prime Agent 实测：动态分工、四个 SubAgent 与长期任务" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=OQ09v_T81I8)。

## Prime Agent 把哪些东西变成可调整的运行状态

本期介绍的核心包括 Persistent IPython、RLM、Continual Harness、SubAgent、Goal 和 Heartbeat。

用更直观的方式理解：长期任务不必把所有中间材料反复塞进聊天窗口，可以在持久运行环境中保留状态，用代码访问资料、组织工具调用与子任务；重复使用的提示、技能说明、记忆和子 Agent 配置，也可以成为可调整的工作资料。

[官方仓库](https://github.com/PrimeIntellect-ai/prime-agent)在 2026 年 10 月 24 日核对时，仍明确说明了持久 Python 环境、子 Agent、可回顾轨迹的 refine，以及后台会话与长期目标。这是对机制的补充核对，不代表文档当前每个细节都与 8 月拍摄版本完全一致。

尤其要注意，“自我改进”在这里主要指 Harness 的补充状态和工作方式，而非在线修改模型参数。视频讲解也区分了可调整内容与不可变的基础系统提示，不宜将它概括为“Agent 可以无限制改写一切规则”。

## 安装、登录与模型设置：本期演示了什么

[02:58 开始](https://www.youtube.com/watch?v=OQ09v_T81I8&t=178s)展示安装与启动。之后在项目目录中打开终端界面，通过登录入口选择模型提供方。

[03:33 的演示](https://www.youtube.com/watch?v=OQ09v_T81I8&t=213s)使用 ChatGPT/Codex Plus 或 Pro 订阅登录：选择对应提供方后打开浏览器，完成授权，再回到终端使用。这里记录的是当时可用的入口，不应推导为所有套餐、所有地区、未来所有版本都永久兼容。

实际使用前应确认当前版本支持的提供方、授权范围和额度规则。本文也不复制一条未来可能失效的安装命令，最新步骤以项目 README 为准。

## 第一次项目分析：它主动找到了 Orca 与 Codex

[05:11](https://www.youtube.com/watch?v=OQ09v_T81I8&t=311s)的任务是深入分析代码库。我没有在提示中要求它调用外部编程工具，但随后发现，它打开 Orca，并在多个终端内启动 Codex，分发并行分析任务。

这一幕能够证明本次环境中发生了工具编排行为，却不能证明每台电脑上都会自动复现。可用工具、已有安装、权限和任务内容都会影响结果。

我担心多个 Codex 同时运行会用尽额度，因此输入停止要求。演示中 Prime Agent 报告停止任务并关闭终端，返回 Orca 后也看到相应终端被关闭。这里既有执行过程，也有停止后的界面核对，比仅看一句“已停止”更有参考价值。

对于类似工作，建议预先明确：是否允许启动其他编程助手、最多并发多少个任务、哪些目录可以修改，以及什么时候停止。这些是从本次经历得出的使用建议，不是额外完成过的一组测试。

## 第二次审查：明确分成四个 SubAgent

[07:32 的测试](https://www.youtube.com/watch?v=OQ09v_T81I8&t=452s)把分工写得更清楚，分别检查后端框架、前端、测试覆盖和安全问题。

执行中可以看到动态构建的 Python 代码与子任务提示。通过 BTW 询问进度时，系统返回四个 Agent 的执行状态，并在部分报告完成后说明还有哪些工作在继续。最终输出按严重程度组织的项目审查结果。

本期展示了拆分、并行、进度查看和结果汇总这条链路。报告提到的漏洞没有在本文中逐一复现，所以这里不会把 Agent 的审查发现直接写成已经独立确认的安全漏洞。

它与 Dynamic Workflow 的相似之处，是能够围绕任务动态组织子工作。不能因为操作体验相近，就断言两个项目内部实现完全一样。

## Goal：让迁移任务保持明确的验收目标

[09:34](https://www.youtube.com/watch?v=OQ09v_T81I8&t=574s)测试 Goal，要求把项目从 REST API 迁移到 tRPC，并确保测试通过。演示中的代码库较简单，任务完成后给出了验收结果，界面记录的消耗约为 34K Token。

这个数字只属于当时那次任务。它不是大型迁移项目的成本预测，也不能与别的工具随意比较。原视频结尾还明确把与 Codex CLI、Claude Code 执行相同任务的对比留给后续，因此本文不宣称已经完成同题、同条件的 Token 节省评测。

Goal 的实用价值，是让目标和验收条件保持在任务中。真正使用时，仍应自己检查代码差异和测试证据，而不是只接受总结中的“已经完成”。

## Heartbeat：配置成功不等于长期运行已经验证

[10:21](https://www.youtube.com/watch?v=OQ09v_T81I8&t=621s)演示设置心跳任务，每 12 小时检查仓库 Issues 并输出分析报告。界面显示下一次运行时间，随后又查看状态并停止任务，停止后显示没有激活的心跳。

因此，这一段能支持配置、状态查看和停止流程已经演示，不能支持“连续多天稳定运行”或“定时报表已经准时发送”。如果复现长期任务，应继续检查真正触发后的运行记录与输出，而不只看下一次计划时间。

## 使用边界：长期自治仍然需要权限和预算

Prime Agent 的吸引力在于把状态、任务分工与长期执行组合起来。对持续维护代码库、分工审查、重复性研究任务，这种形式值得尝试。

但[官方 README](https://github.com/PrimeIntellect-ai/prime-agent)也提醒，模型生成的 Python 和项目命令以用户权限执行，内部 worker 与 kernel 的进程隔离不等于安全沙箱。建议从可恢复的副本或干净工作区开始，对不可信代码使用外部隔离环境。

这期留给我的重点，是看清 Agent 如何组织工作、如何汇报、如何停下来。至于节省多少 Token、长任务稳定多久、相比其他工具能提高多少效率，还需要更严格的同条件测试。

