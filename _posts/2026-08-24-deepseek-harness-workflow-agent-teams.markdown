---
layout: single
title: "DeepSeek Harness 进阶实测：4 个子任务审计、9 个 Agent 协作与插件开发"
date: 2026-08-24 22:38:58 +0800
categories: AIAgents
tags: [DeepSeek, Harness, Workflow, AgentTeams, 插件]
cover_lines: ["DeepSeek", "Harness"]
cover_subtitle: "九个智能体协作与插件开发"
classes: wide
author_profile: true
sidebar:
  nav: "docs"
excerpt: "用 Workflow 拆分四项只读审计，再由九个 Agent 协作评审并尝试插件开发。展示结构化汇总与执行轨迹，25 条原始问题不等于已验证漏洞，也未测得效率倍增。"
---

大家好，我是 AI 超元域。

上一期介绍了 DeepSeek Harness 的 Web UI、模型接入和基础开发流程。这次继续往下走，重点测试三件事：用 Workflow 拆分代码审计，用 Agent Teams 组织多角色评审，以及通过 Skill 开发自己的插件。

最具体的结果是：Workflow 一轮派生了 4 个子任务，汇总 25 条原始问题；Agent Teams 的另一轮代码评审共有 9 个 Agent 参与。这些数字反映本次任务规模，不代表 25 个问题都已独立确认，也不意味着 Agent 数量越多，效率就按比例提升。

本文依据 2026 年 8 月 24 日公开视频简介、章节及与本期案例匹配的保存版校正字幕整理。未取得此次直接导出的 YouTube 字幕；下文记录拍摄时的体验，并非重新运行测试。官方仓库于 2026 年 10 月 24 日补核，当前文档不能替代历史版本说明。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 1.5em 0; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/-sX1Ks47AqA" title="AI超元域：DeepSeek Harness Workflow、Agent Teams 与插件实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

播放器无法加载时，可以[在 YouTube 观看完整视频](https://www.youtube.com/watch?v=-sX1Ks47AqA)。

## 开场的视觉案例说明了什么

[00:33](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=33s)展示了手写笔记 OCR 和房屋平面图转 3D 可探索页面。保存的讲解把所用模型称为 DeepSeek V4 Flash Vision，演示包括按原有格式提取笔记，以及用前端技术制作可探索空间。

这里要区分输入理解与最终交付：平面图经过代码开发形成了一个前端项目，不应直接理解成模型原生输出了专业建筑模型。视频也没有提供尺寸精度、OCR 字符错误率或完整图纸一致性检测，因此这部分是应用展示，不是定量评测。

## Workflow：先定义任务，再并行汇总

本期 Workflow 的用法很直接：在当时的标准模式中，选定代码仓库，让 Harness 对当前项目进行并行、只读的发布前审计。

[02:30 的任务](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=150s)明确分成 4 个方向：模块边界与依赖方向、错误处理、测试覆盖、输入验证。要求中还指定必须使用 Workflow、禁止修改文件，每个 SubAgent 返回结构化结果。

这几项约束值得保留。任务如果只写“帮我检查代码”，最终报告很容易散落成一批重复观点。先指定检查方向与统一返回格式，主 Agent 才更容易把不同角度的结果合在一起。

执行时，我可以点进子任务，查看读取了什么文件、执行了什么命令、当前是否完成。完成的任务返回 JSON，主 Agent 再汇总。最终记录显示 4 个 SubAgent 全部成功结束，共收集 25 条原始问题，并按严重程度列出代码位置、证据要点和修复建议。

这个结果的价值在于可继续核查。原始问题还需要去重、确认影响范围与复现条件，不能直接当作已验证漏洞数量。视频没有逐条验证全部 25 项，也没有展示全部修复后的回归测试。

## 动态生成的工作流，应该看哪些部分

在[05:20](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=320s)之后，我让 Harness 展示刚才构建的工作流代码。讲解记录中可以确认，它使用 JavaScript，包含工作流标识、阶段声明、跳过文件的约定、返回格式、项目路径参数和四个子任务的职责。

对于这种动态编排，我建议先检查三个地方：

1. 每个任务是否真正独立，是否会重复扫描同一片代码。
2. 输入范围和禁止修改的约束是否清楚。
3. 最终输出是否保留证据，而不只是评分或结论。

这是根据本期流程给出的使用建议，并非额外完成的一轮测试。尤其是“只读”不能只靠一句提示词保证；在重要项目里，还应配合实际权限和最终 diff 检查。

## Agent Teams：多角色、多轮协作

[06:55](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=415s)开始，视频转向 Agent Teams。与前面的独立子任务汇总相比，这次演示强调成员之间可以发送消息，围绕任务看板持续推进，最后由主审统一输出报告。

[07:43](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=463s)，我直接用自然语言要求对当前代码库进行 code review。它没有立刻机械地凑出一组成员，而是先阅读项目结构。讲解中识别到的组成包括 iOS 应用、Chrome 扩展、Supabase 后端和脚本。

随后团队方案分成一个侦查 Agent、7 个专业评审 Agent，以及一个主审 Agent。界面中看到的“7 个成员”指并行专业评审成员；[10:10 的总结](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=610s)所说“共 9 个 Agent”，则包含侦查和主审。这两个数字并不矛盾。

专业成员接收上下文简报并读取代码，完成后返回各自报告。最终主审给出统一文档，包含团队构成、核心结论和问题优先级。本期没有逐项展开该报告，也没有公开一套与单 Agent 同题同预算的对照，所以不能把这次体验写成严格的效率倍增证明。

## 两种模式怎样选

结合这次演示，我会把选择依据放在任务依赖上：

- 几个相互独立的检查方向，结束后统一汇总，优先考虑 Workflow。
- 需要持续交流、补充上下文和多轮推进的评审，才考虑团队式组织。
- 最终只需要一个明确的小修改时，不必为了使用多 Agent 而增加协调成本。

无论哪一种，重要的都是最终证据能否汇总到一个可读、可验证的结果中。多一个 Agent 就可能多一份上下文、重复阅读和协调开销。本期没有记录完整成本，因此不提供未经测量的节省比例。

## 用 Skill 创建定时任务与 Pi Review 插件

[10:45](https://www.youtube.com/watch?v=-sX1Ks47AqA&t=645s)之后，我介绍自己制作的 [DeepSeek Harness Plugin Creator](https://github.com/win4r/deepseek-harness-plugin-creator)。本期做法是让 Agent 阅读项目说明并安装 Skill，再用自然语言描述要创建的插件。

第一个例子是定时任务插件。讲解展示了生成完成及其说明文档，但没有记录长时间运行、进程重启或错过执行时刻后的行为。因此，这个案例能证明生成流程，不足以证明长期调度的可靠性。

第二个例子是调用 Pi Agent 做 code review 的插件。我将前面平面图生成的 3D 项目交给它审查，记录中出现“Pi 审查通过”，并给出结论与验证方式。不过，单次审查通过也不能等同于项目不存在缺陷。

2026 年 10 月 24 日补核时，Skill 仓库已强调对目标 Harness 契约和版本进行核对，再生成、验证插件。现在使用时应阅读当前说明，不要把拍摄时的安装状态和后来更新后的实现混用。

## 这次值得保留的经验

[DeepSeek 官方仓库](https://github.com/deepseek-ai/deepseek-harness)将 Harness 定位为插件化的开源 Agent Harness，并提示仍处于快速迭代的 developer preview，可能发生兼容性变化。因此本文不凭记忆补写安装命令、配置键或实验功能开关。

本期最值得复用的顺序是：先做有范围的只读任务，观察执行过程，要求结构化证据，再决定是否扩大协作规模或封装插件。已经明确展示的成功结果值得记录，但没有测过的失败恢复、成本和安全边界，也应该留在结论里。

- [本期视频与章节](https://www.youtube.com/watch?v=-sX1Ks47AqA)
- [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness)
- [本期插件开发 Skill](https://github.com/win4r/deepseek-harness-plugin-creator)
