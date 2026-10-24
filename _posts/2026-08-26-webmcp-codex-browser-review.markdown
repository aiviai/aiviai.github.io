---
layout: single
title: "WebMCP 与 Codex 浏览器实测：从论文笔记到网站工具调用"
date: 2026-08-26 23:24:54 +0800
categories: AIAgents
tags: [WebMCP, Codex, ChatGPT, 浏览器自动化]
classes: wide
author_profile: true
sidebar:
  nav: "docs"
---

大家好，我是 AI 超元域。

这期我把 Codex 放进浏览器侧边栏，连续测试了论文分析、图片理解、选中文本翻译、Notion 笔记，以及多个标签页共同参与的问答。随后切换到 Codex 内置浏览器，测试网站直接提供工具的 WebMCP Demo。

这两段体验容易被混在一起。侧边栏解决的是浏览网页时怎样使用 AI；WebMCP 则进一步涉及网站怎样把自己的操作能力交给 Agent。下面分别看它们实际完成了什么。

本文回顾 2026 年 8 月 26 日的视频，依据公开视频简介、章节和与本期内容匹配的保存版校正字幕整理。该字幕不是此次直接从 YouTube 导出的逐字稿。界面与模型选项按拍摄时记录；文末官方资料于 2026 年 10 月 24 日补核，不将后来变化倒写成当时功能。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 1.5em 0; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/Wl9tcoVuLjA" title="AI超元域：WebMCP 与 Codex 浏览器实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

播放器无法加载时，可以[在 YouTube 观看完整视频](https://www.youtube.com/watch?v=Wl9tcoVuLjA)。

## 先把浏览器侧边栏用起来

[02:01 的安装演示](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=121s)从桌面应用的 Computer Use 设置进入，开启 Chrome 支持，再通过浏览器扩展图标打开侧边栏。这是拍摄时的界面路径，今天安装时应以应用当前设置和官方说明为准。

侧边栏里可以直接和 Codex 交互，也可以使用已经连接的插件。本期界面选择的是 GPT-5.6，展示了 Medium 推理级别和标准、Fast 速度选项。视频没有记录同一任务在两档速度下的完整计时，因此不能把界面的速度选项当成本期测出的性能提升。

实际使用中，最直接的好处是上下文不必来回搬运。正在读的论文、选中的摘要、需要解释的图片，都可以沿着当前问题继续讨论。

## 论文分析、图像理解与 Notion 写入

[03:19](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=199s)开始，我打开一篇 arXiv 论文，要求分析它的核心概念、试图解决的问题和实验结果。接着又取论文中的图片继续追问。保存的讲解记录表明，它输出了较详细的文本分析。

这里能确认的是分析流程打通了，不能据此断言论文中的全部结论都被正确复核。要用于正式研究，仍需回看原文、图注与实验设置，而不能只看总结是否流畅。

[04:13](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=253s)之后，我先选取摘要并翻译成中文，再选择 Notion 插件，让它把前面的分析整理成中文笔记。工具提示保存并验证成功后，我实际打开了 Notion，看到新建的笔记。

这个验证动作很重要：任务成功不只看对话中的“已完成”，还要检查目的地是否真的出现内容。与此同时，这次 Notion 写入属于连接插件的调用，不应该拿来证明 Notion 网站已经支持 WebMCP。

## 多标签页如何参与同一个任务

[05:15](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=315s)的测试又加入了论文对应的 GitHub 页面。我打开新的标签页，在原来的侧边栏会话里选中该页，再让它给出项目的安装方式。

它随后输出了安装说明。本例说明可以把论文与项目页面放进同一轮上下文来分析，但视频并没有继续在干净环境里安装并运行该项目。所以这里的结果是“生成安装说明”，不是“安装验证通过”。

这一区别适用于很多浏览器任务：读取页面、归纳步骤、实际执行步骤，是三个不同的完成层级。

## WebMCP Demo：网站暴露 10 个工具

[06:08](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=368s)开始切换到站点工具测试。我在 Codex 内置浏览器打开笔记 Demo，先询问当前站点有哪些可调用工具。

它列出了 10 个，包括列出或搜索文档、读取文档、在编辑器中打开文档，以及创建、重命名、更新等操作。记录里明确区分了其中的只读工具与写入工具。

随后我要求写一篇 WebMCP 使用笔记，并存到当前网站中。笔记创建后，我继续询问使用了什么工具，它返回了创建文档的工具及参数说明。接着要求为笔记加入更多 emoji，它使用更新文档工具修改了内容。这一段可以从[07:14](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=434s)直接观看。

这里的重点是任务与站点能力之间的对应关系更清楚：创建文档对应创建工具，修改文档对应更新工具。不必每次都让 Agent 从界面位置推断应该点哪里。不过，工具是否可靠、参数是否正确、修改是否符合要求，仍需检查结果。

## 贺卡生成：让编辑动作变得明确

[08:52](https://www.youtube.com/watch?v=Wl9tcoVuLjA&t=532s)的另一个 Demo 用来设计贺卡。我让它制作 WebMCP 宣传主题的作品。完成后再追问调用过程，返回的动作包括重置空白卡片、设置尺寸、调整背景色和强调色。

本次讲解对生成速度和视觉效果评价较好，但没有录制一套与普通点击自动化严格配对的耗时实验。因此，更稳妥的结论是：在这个 Demo 中，Agent 可以通过明确的编辑工具完成作品；“普遍快多少、准确率高多少”仍需要额外测量。

## 支持范围与安全边界

先澄清一个容易从视频标题产生的误解：WebMCP 不宜概括为 OpenAI 独创的封闭协议。补核的[官方 Site tools 文档](https://learn.chatgpt.com/docs/webmcp)将它描述为对 WebMCP 提议标准的实现。网站工具与传统 MCP 连接也有区别，前者依附当前网页，后者可以连接独立服务。

拍摄时，本期 WebMCP 演示使用的是 Codex 内置浏览器，不是已经装好侧边栏扩展的 Chrome。不能因为扩展能处理网页，就推定该浏览器已经支持所有 WebMCP 接口。

截至补核时，官方文档仍明确存在支持范围限制，例如不支持 HTML 表单属性声明的工具，以及 iframe 内注册的工具。站点提供的名称、描述和结果也不是天然可信，调用仍要经过安全审查。以上是补核日期的文档状态，后续可能变化。

对网站开发者而言，我更看重的方向是先为少量明确动作提供工具，同时保留正常的人类界面。对用户而言，最实用的顺序是先问清楚当前页面提供什么，再完成任务，最后回到页面核对结果。

## 本期结论与资料

这次侧边栏体验完成了论文理解、摘要翻译、Notion 笔记和多标签页分析；WebMCP Demo 则完成了笔记创建、更新与贺卡设计。二者组合起来，让浏览器中的 AI 工作流更连贯，但并不意味着所有网站都已经拥有工具接口，也不意味着复杂任务从此无需人工验收。

- [本期视频与章节](https://www.youtube.com/watch?v=Wl9tcoVuLjA)
- [OpenAI Site tools 官方文档](https://learn.chatgpt.com/docs/webmcp)，补核于 2026 年 10 月 24 日。
