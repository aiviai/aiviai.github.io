---
layout: single
title: "DeepSeek V4 Pro 0813 编程实测：5.36 元 API 消耗背后的七项任务与完成度"
date: 2026-08-13 16:37:02 +0800
categories: LLMs
tags: [DeepSeek, ClaudeCode, Godot, SwiftUI, AI编程]
cover_lines: ["DeepSeek", "V4 Pro 0813"]
cover_subtitle: "七项编程 · 5.36 元 API 消耗"
classes: wide
author_profile: true
sidebar:
  nav: "docs"
excerpt: "以 5.36 元 API 消耗完成七项测试，检查可探索飞船、Godot 战斗和 SwiftUI 播放器。复杂原型可操作，SVG 星环关系仍出错，调用账单也不包含返工与维护成本。"
---

大家好，我是 AI 超元域。

这期我把 DeepSeek V4 Pro 0813 接入 Claude Code，继续用动画、3D 场景、游戏和原生应用测试它的开发能力。最值得关注的结果是，整轮测试记录的 API 消耗为 5.36 元，而且几个复杂项目已经能实际操作。不过，SVG 的空间关系仍然出错，各个任务的表现也并不一致。

本文整理自 2026 年 8 月 13 日的视频与匹配本期模型、案例和时间顺序的校正讲稿。本次未重新取得 YouTube 字幕导出，也没有重新运行项目。文中的耗时、效果和费用都是当时的测试记录，不代表统一基准或今天的服务报价。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 1.5em 0; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/cDZDDHIfW-Q" title="AI超元域：DeepSeek V4 Pro 0813 编程实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=cDZDDHIfW-Q)。

## 先说清楚版本、任务数量和费用口径

DeepSeek 的[8 月 13 日官方公告](https://api-docs.deepseek.com/news/news260813/)确认 V4 Pro 正式版上线，并介绍了 Agent 能力、推理强度和 Responses API 支持。公告还说明，新的峰谷价格要到 8 月 16 日 16:00 UTC 才生效。因此，本期 8 月 13 日记录的费用，不能直接套用后来公布或当前显示的价格重新解释。官方资料于 2026 年 10 月 24 日整理本文时核对。

原视频标题写的是“5 元、5 个复杂项目”，简介写的是“5.36 元、6 个复杂编程项目”，而章节与讲稿实际包含七项开发测试：SVG、古戈尔齿轮、飞船、临安小游戏、Manim、Godot 和 macOS 播放器。本文按七项测试逐一整理，不把不同宣传口径强行合并成一个项目数；费用则采用结尾明确记录的 5.36 元。

[01:18 的接入环节](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=78s)是在 Claude Code 中配置 DeepSeek API。本期实际执行工具、打开文件和运行项目的是这套编程环境，不能把它们全部理解为模型独立自带的能力。讲稿记录使用 1M 上下文配置，但没有给出一套可以复现所有结果的完整参数、提示词和调用日志。

## SVG：鸟画得像，星环的位置却不对

[01:53 的任务](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=113s)要求三种鸟骑自行车，在土星星环上比赛。模型用 Python 生成 SVG，并自动打开结果。

这一轮的优点比较具体：鹈鹕、渡渡鸟和几维鸟具有可辨识的外形，骑车动作也能看出来，背景中还出现了不同的行星。但赛道没有贴合土星，星环与主体之间的空间关系没有正确建立。

与此前 Kimi K3 的同题作品相比，我当时更认可 Kimi 的星环关系和蹬踏动作。这个案例说明，生成了完整动画文件并不等于完成了所有约束。检查这类任务时，除了“有没有动”，还要看主体之间的位置和动作关系。

## 古戈尔齿轮：从分离的零件，进步到能看到啮合

[03:32 的 Three.js 测试](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=212s)耗时约 20 分钟。相比此前 Flash 作品中彼此分离的齿轮，Pro 这次生成的齿轮在视觉上紧密啮合，并增加电机、转速控制和可旋转查看的视角。

我当时认为这一项比 Flash 明显进步，也展示了 Kimi K3 的作品作为比较。但这里验证的是画面与交互，没有逐齿核算真实机械传动。因此，文章把“啮合更像真实机构”保留为视觉观察，不把它升级成机械工程精度认证。

## 《极光》飞船：搜索、核对资料，再生成可探索空间

[05:03 的飞船任务](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=303s)要求先搜索并阅读小说信息，再选择前端技术复现飞船，并支持进入内部探索。

这轮比较有价值的过程是：模型发现搜索结果中的飞船描述互相矛盾，继续调整关键词，尝试寻找更可靠的原文描述。约 27 分钟后，它交付了可旋转、可放大查看的外部模型，也提供了内部舱室入口。

演示中可以查看前方防护结构、载人舱、尾焰，以及带有天空、地面和草地的内部环境。我当时更认可这一版的轮状舱室排列，认为它比所展示的 Kimi K3 作品更符合小说描述。这仍然是本期作品的局部比较，没有对原著所有结构做独立逐项考证，更不能推广成模型整体排名。

## 临安小游戏：约 26 分钟，已经有可玩的流程

[08:03 的小游戏](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=483s)以南宋临安为背景，玩家可以飞行、挥剑，与追击的黑衣人战斗。约 26 分钟后，演示中能够击中敌人，并看到击败敌人后气血增加。

场景中还有路人、小贩和商铺招牌。我当时认为，它在玩法和街巷细节上比对照作品更完整，已达到可以操作的 MVP。这里的 MVP 指视频里这些核心动作形成了可玩的原型，不代表关卡平衡、存档、性能和长期运行都通过验收。

## Manim：四分钟完成二次函数可视化

[09:35 的测试](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=575s)要求显示函数表达式、绘制曲线、标注顶点和零点，并用动画展示绘制过程。

讲稿记录约四分钟完成，随后打开输出视频检查，能够看到表达式、顶点、零点和连续绘制过程。我当时认为它比此前 Flash 的结果更好。这个案例是模型编写并调用 Manim 生成动画，不是 DeepSeek 原生生成视频；本文也不补写未保留下来的具体函数、帧率或渲染设置。

## Godot：约 32 分钟的恐龙坦克射击原型

[10:29 的任务](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=629s)要求在侏罗纪场景中驾驶坦克射击，加入恐龙、UFO 和音效。约 32 分钟后，项目在 Godot 中打开并运行。

测试中能移动坦克、攻击恐龙、击落 UFO；UFO 也会反击，玩家会被消灭。场景还包括火山、树木、石头和飞行的翼龙。这些动作让原型有了基本的战斗循环。

需要保留一个跨期口径差异：本期回顾 Flash 时用了“不能运行”的说法，但 Flash 那期的直接演示记录是游戏可以运行，只是操控和需求完成度很差。因此，更准确的比较是 Pro 在本次游戏的可玩性和细节上明显改善，而不是把前一期改写成完全无法启动。

## SwiftUI 音乐播放器：能播放，也能切换主要页面

[12:32 的最后一项](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=752s)是用 SwiftUI 开发原生 macOS 音乐播放器，视觉参考 Apple Music。

项目在 Xcode 中运行后，可以查看首页、音乐库、专辑、歌手和歌单，并操作迷你播放器与收藏。演示中的音乐可以正常播放，但我也指出合成音乐本身不好听。这里为了避免使用现成歌曲，测试使用了合成音乐；它验证的是播放器功能，不是商业音乐服务接入，也没有证明具备 Apple Music 的曲库授权或完整功能。

## 5.36 元意味着什么

[14:21 的费用环节](https://www.youtube.com/watch?v=cDZDDHIfW-Q&t=861s)记录整轮 API 消耗为 5.36 元。它说明这轮原型开发的模型调用成本很低，但不包含人工验收、开发设备、返工、部署和长期维护成本，也没有按项目公开缓存命中和输入输出 Token 明细。

我的结论是：这次 Pro 的价值主要体现在复杂任务的完成度，尤其是飞船、游戏和原生播放器。SVG 仍有明确错误，视觉满意也不等于工程正确。拿它开发自己的项目时，可以沿用这期的检查方式：先让核心流程运行，再逐项核对需求，最后单独检查错误处理、稳定性和性能，而不要只看生成速度与 API 总价。
