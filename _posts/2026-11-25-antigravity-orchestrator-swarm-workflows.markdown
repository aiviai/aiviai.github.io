---
layout: single
title: "Google Antigravity 实测：双模型做存档、蜂群做风暴，再用脚本审计 Godot"
sidebar:
  nav: docs
date: 2026-11-25 22:30:02 +0800
categories: [AIAgents]
tags: [Antigravity, Gemini 4 Neon, AI编程, Godot, 多Agent]
excerpt: "在一个 Godot 项目里实测 Antigravity 的三种协作方式：Gemini 4 Neon 和 Claude Sonnet 5.5 接力做存档，用蜂群看板追踪风暴模块分工，再把并行代码审计保存为可重跑的脚本。本期没有做 Token 或成本对照。"
description: "在一个 Godot 项目里实测 Antigravity 的三种协作方式：Gemini 4 Neon 和 Claude Sonnet 5.5 接力做存档，用蜂群看板追踪风暴模块分工，再把并行代码审计保存为可重跑的脚本。本期没有做 Token 或成本对照。"
cover_lines: ["Google", "Antigravity"]
cover_subtitle: "双模型接力 · 蜂群与动态工作流"
cover_labels: ["接力", "Swarm", "Workflow"]
cover_caption: ["双模型接力 · 蜂群与动态工作流"]
classes: wide
author_profile: true
toc: true
---

给游戏加存档、给海面上风暴、扫一遍旧代码，这三件事都可以丢给 AI，但没必要用同一种方式来做。这次我在 Antigravity 桌面版里用同一个 Godot 项目试了三遍。最想留下来的反而不是某次对话，而是最后那份审计脚本：第一次跑完再保存，下次可以直接让它按现成的步骤重新检查。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/oz6sPkw6owI" title="AI超元域：Antigravity 双模型接力、Swarm 与 Dynamic Workflows 实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=oz6sPkw6owI)。

---

## Orchestrator：一个会话里，两个模型交接

[▶ 观看对应测试：01:44](https://www.youtube.com/watch?v=oz6sPkw6owI&t=104s)

在桌面版设置的 Models 里，我打开 Orchestrator Settings，把规划模型设成 **Gemini 4 Neon**，执行模型设成 **Claude Sonnet 5.5**，后者的推理级别选了 High。接下来在会话里选择 Orchestrator，没必要等规划写完，再开一个窗口把计划贴给另一个模型。

[Google 的模型文档](https://antigravity.google/docs/models?app=antigravity)把 Gemini 4 Hydrogen 列为默认执行模型，也列了 Claude Sonnet 5.5 这个可选项。上面是我在本地桌面会话里实际选的组合，不是所有账号或环境的默认配置。

[▶ 观看对应测试：02:51](https://www.youtube.com/watch?v=oz6sPkw6owI&t=171s)

第一项任务是给 Godot 项目加存档和读档。我要求它先理清涉及的代码，再实现功能，最后按“存档、改动、读档”的顺序做验证。发任务前我选了 Auto，没有为了少点几下就切到 Turbo。按[官方权限说明](https://antigravity.google/docs/permissions)，Auto 仍保留对高风险命令的审批。

[▶ 观看对应测试：03:15](https://www.youtube.com/watch?v=oz6sPkw6owI&t=195s)

任务跑着的时候，我用 `/btw` 问了一句做到哪了。右侧窗口先回了“规划刚完成”，后来再问，回的是前两步已完成、还剩七步。关掉侧边窗口也能从原位置打开，我还点进后台任务，看到了它正在执行的命令。这个功能适合查进度，不必把问题插进主对话。[官方说明](https://antigravity.google/docs/commands/btw/)也提醒：侧问不是独立的只读沙箱，别把查进度和授权修改混为一谈。

录制里，这次存档任务约 **18 分钟**后显示完成。这个数字只对应这一次；没有同任务、同验收条件的单模型对照，所以不能据此说快多少或省了多少 Token。更直观的收获是，同一条任务里可以分开选负责规划和负责干活的模型。

---

## Swarm：给游戏加风暴，先看看每个人在做什么

[▶ 观看对应测试：06:30](https://www.youtube.com/watch?v=oz6sPkw6owI&t=390s)

风暴系统和存档不一样。天气、海浪、船的操控、下雨和音效，拆开以后有人可以同时开工，但模块之间又需要互相沟通。我把 Gemini 4 Neon 设为 High，用 `/swarm` 发出这条需求。右上角陆续出现了不同的子 Agent，包括监控和验证角色。点进去能看到从协调者接到的指令、分析了哪些文件，以及当前在等什么。

[▶ 观看对应测试：07:36](https://www.youtube.com/watch?v=oz6sPkw6owI&t=456s)

再打开 **Open Swarm**，能看到以协调者为中心的蜂窝图。比如点开负责天气的 Agent，可以翻它在共享看板上的消息；按播放，则能回看任务怎样分下去，成员怎样把消息传回来。比起盯着一条不断变长的主对话，这个视图更容易找出谁卡在哪里、谁在等谁。

这一段主要展示了分工、交流以及主会话的输出，没有在视频里逐项实机验收风暴效果。并行也不等于省额度：[Swarm 官方文档](https://antigravity.google/docs/swarm)将它标为预览，并提醒多个独立 Agent 会比单个会话更快消耗额度。

---

## Dynamic Workflows：让 Godot 代码审计下次还能用

[▶ 观看对应测试：10:27](https://www.youtube.com/watch?v=oz6sPkw6owI&t=627s)

最后一项不像开发风暴功能，它更适合按文件拆开：每个 Agent 检查各自负责的代码，找 Godot 4 常见问题和遗留的 Godot 3 写法，再把发现合到一份报告里。我输入 `/run-workflow` 后，Antigravity 先生成**工作流脚本**，不是一上来就发人。这个时候可以先审脚本，确认检查范围和汇总方式，再让它执行。

跑起来以后，右侧出现了分头查文件的子 Agent。我点开其中一个看它怎样分析代码，最后回到主会话看汇总报告。逐文件检查很适合这样并行；如果怀疑问题出在两个模块的接口上，我还会把相关文件放在同一个检查范围里，不指望每个只看单文件的 Agent 都能发现。

[▶ 观看对应测试：11:40](https://www.youtube.com/watch?v=oz6sPkw6owI&t=700s)

第一次出报告以后，我让它把脚本保存下来。第二次再用 `/run-workflow` 指向刚保存的文件，确认权限后，右侧再次启动多个 Agent。这段演示验证的是**已保存的脚本能重新启动一轮并行检查**，不是两次都得到了完全一样的报告。复用的是检查步骤，不是上一次的答案。

[Google 的 Dynamic Workflows 文档](https://antigravity.google/docs/dynamic-workflows)也把它和 Swarm 分开：脚本适合把分工、顺序和汇总规则写下来；如果干活的 Agent 需要在执行过程中直接协商接口，Swarm 的共享看板更合适。

---

## 我会怎么选这三种方式？

像存档这样，先弄明白项目，再顺着一条主线改和验，我会先用 **Orchestrator**。风暴系统有几块可以一边开发一边协调，我才会开 **Swarm**。迁移检查这类活以后还会做，值得用 **Dynamic Workflows** 留下一份可审查、可重跑的脚本。

我更在意的是任务跑到一半时能不能看懂，跑完以后能不能把方法留下来。三种方式各有用处，但这次并没有拿同一个任务在三种模式里对照跑，也没有证明非得开更多 Agent 才能把活做好。
