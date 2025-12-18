---
layout: single
title: "🚀OCR+视觉直接起飞！Gemini 3 Flash深度实测：OCR识别潦草处方、模糊古书全对！前端小项目完美开发！Antigravity实测iOS原生开发暴露真实编码能力！别信跑分信实测！"
sidebar:
  nav: "docs"
date: 2025-12-18 00:00:00 +0800
categories: LLMs
tags: [Gemini 3, Gemini 3 Flash , AI Coding, Vibe Coding, Google, AI智能体, AI编程, Antigravity, Antigravity IDE, Google Antigravity]
classes: wide
author_profile: true
---


*2025年11月18日凌晨，Google 正式发布了最新一代人工智能模型 Gemini 3 Pro，同时推出了对标 Cursor 和 Windsurf 的代理式开发平台 Antigravity IDE。作为 AI 编程领域的重磅更新，这次发布引发了开发者社区的热烈讨论。本文将结合官方数据与实际测试，为大家带来一份客观、全面的使用体验报告。*


> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1BxynBwEF5/)
- [👉👉👉 通过YouTube观看](https://youtu.be/6wuIT0DU1Jk)
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
> 
🔥AI智能体相关视频
- [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
- [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
- [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  
- [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  


谷歌在12月17日凌晨悄悄放出了Gemini 3 Flash，作为Gemini 3系列的"平民版"模型。我花了一上午时间把它里里外外测了个遍，说说真实感受。

## 先聊聊价格

这可能是Gemini 3 Flash最大的卖点。

输入价格每百万Token只要0.5美金，输出3美金。对比一下友商：Gemini 3 Pro是2美金和12美金，GPT-5.2是1.75美金和14美金，Claude Sonnet 4.5更贵，3美金和15美金。

换算成实际使用场景更直观：跑1000个SWE-bench任务，Gemini 3 Flash花费85美金，Claude Sonnet 4.5要450美金；日常开发按每天100次迭代、一个月22个工作日算，前者18.7美金，后者99美金。

便宜是真便宜，问题是便宜的同时能不能打？

## 多模态能力：确实能打

我准备了几个测试，结果让我挺意外的。

**音频转字幕**：把一个完整的视频音频丢给它，让它生成SRT字幕。不到两分钟就输出完了，格式规范，时间轴准确。唯一的错误是把"Claude Opus 4.5"听成了"Claude Opus 3.5"，其他技术名词都识别对了。这个速度和准确率，日常用来做字幕完全够用。

**时钟识别**：这个测试挺有意思。第一张是普通时钟，显示1:50，它秒答正确。第二张我故意找了一张数字被打乱的时钟——2和10的位置互换了，时针指向的位置写着"2"但实际上是10点钟方向。

Gemini 3 Flash的回答让我刮目相看：它先指出这个时钟的数字排列是打乱的，然后分析时针指向数字2、分针指向12，最后给出答案"两点整"。这说明它不是简单地看时针在哪个位置就报数字，而是真的在做推理。之前测过不少多模态模型，这道题能答对的真不多。

**流程图转代码**：给了一张冒泡排序的流程图，让它用代码复刻。输出的Python代码直接能跑，排序结果正确。

## OCR能力：超出预期

这部分测试我下了点狠手。

第一张是繁体古书扫描件，排版复杂，有些字迹模糊，纸张还有破损。结果呢？提取的内容完全正确，繁体字一个没错，连原文的标点符号都保留了。

第二张更过分，找了一张扫描质量很差的图，放大看很多笔画都断了。Gemini 3 Flash照样全部识别正确，连最底部的页码都没漏。

第三张是手写中药处方，那种医生写的潦草字迹，不认识药材名的人根本看不懂写的啥。它居然也全对了。

最后一张是模拟报纸版面，文字做了扭曲效果，排版七拐八绕。依然全部正确提取，没有遗漏。

说实话，这个OCR能力放在现在的多模态模型里属于第一梯队。如果你的工作涉及大量文档数字化、票据识别之类的场景，Gemini 3 Flash值得一试。

## 编码能力：简单项目没问题，复杂项目翻车

前端小项目测试还算顺利。

用p5.js写龙卷风粒子效果，一次通过，鼠标交互正常，视觉效果不错。用Three.js做双摆物理模拟，也是一次成功，物理运动看起来符合真实世界的规律。用Pygame做鸭子冒泡排序动画，逻辑正确，就是那个鸭子画得有点像鸡。

但真正的考验来了——我让它开发一个原生iOS背单词应用。

需求不算特别复杂：用iOS 17、Swift 5.9、SwiftUI、SwiftData、Swift Charts，实现首页学习进度、卡片翻转、练习测试、学习统计这些功能，预置500个单词数据。

我在谷歌的Antigravity编程助手里用Gemini 3 Flash跑这个任务。它倒是很快就生成了一堆代码文件，但Xcode一运行就报错。

把报错信息发回去让它修，修完再跑，还是报错。如此反复，修了五六次，每次都能引入新的错误。最后一次终于编译通过了，结果运行时又崩了。

作为对比，同样的需求我在Claude Code里用Opus 4.5跑了一遍，一次完成，零报错，直接能用。

这个差距说明什么？Gemini 3 Flash在代码量小、逻辑简单的前端项目上表现不错，但一旦项目复杂度上升，涉及多文件协作、框架特性、类型系统这些东西，它就开始力不从心了。

## 关于基准测试的水分

谷歌官方说Gemini 3 Flash在SWE-bench上的得分超过了Gemini 3 Pro，甚至超过了Claude Sonnet 4.5。

但从我的实测来看，这个分数多少有点水分。SWE-bench测的主要是相对独立的代码修复任务，和真实的复杂项目开发还是两回事。基准测试分数高不代表实际干活就一定强，这一点大家心里要有数。

## 怎么用它？

说了这么多，给个实用建议：

**适合的场景**：文档OCR、图像理解、音视频转文字、简单的前端原型、数据可视化小工具。这些场景下Gemini 3 Flash的性价比极高，效果也靠谱。

**不太适合的场景**：复杂的后端项目、需要多文件协作的大型应用、对代码质量要求高的生产环境。这些场景还是老老实实用Claude或者GPT的旗舰模型。

Gemini 3 Flash不是全能选手，但在它擅长的领域确实很能打。知道它的边界在哪，才能把它用好。
