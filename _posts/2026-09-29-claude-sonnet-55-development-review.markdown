---
layout: single
title: "Claude Sonnet 5.5 实测：81 分钟音乐播放器、原生 App、Godot 游戏与桌面操作"
date: 2026-09-29 17:07:48 +0800
categories: LLMs
tags: [Claude, Sonnet 5.5, Claude Code, AI编程, Godot, Computer Use]
cover_lines: ["Claude", "Sonnet 5.5"]
cover_subtitle: "开发实测 · App、游戏与桌面"
classes: wide
author_profile: true
sidebar:
  nav: "docs"
excerpt: "记录 Sonnet 5.5 的 81 分钟播放器、iOS 学习流程、Godot 飞行游戏和桌面下棋。核心交互可操作，但原型运行、完整对局与生产验收不能混为一谈。"
---

大家好，我是 AI 超元域。

这次测试 Sonnet 5.5，我把任务从网页动画一路推进到原生应用和桌面操作：让它为频道制作短片、开发背单词 App 和音乐播放器，再用 Godot 做攻击机游戏，最后直接操控 macOS 自带的国际象棋。

最值得关注的结果，是这些作品已经有了能实际体验的功能。音乐播放器可以播放歌曲，背单词应用能完成学习与听力测试，桌面下棋也能连续走出多步。不过，一款 MVP 跑起来与正式产品通过验收，仍然是两个阶段。

本文根据本期公开简介、章节与匹配的已保存校正字幕整理。未取得 YouTube 直接导出的完整字幕，以下操作结果和耗时按本期记录说明，未独立复跑。官方资料补充核验于 2026 年 10 月 24 日。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 1.5em 0; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/EN-Bq4AqXxg" title="AI超元域：Claude Sonnet 5.5 多场景开发实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=EN-Bq4AqXxg)。

## 测试设置与价格：先把比较范围说清楚

本期在 Claude 网页版将推理级别设为 medium，在 Claude Code 中处理较复杂的开发任务时设为 xhigh；最后的桌面国际象棋测试又使用 medium。这些任务并非完全相同配置下的统一基准。

[Anthropic 官方发布页](https://www.anthropic.com/claude-sonnet-5-5)给出的标准价格是每百万输入 tokens 2 美元、输出 tokens 10 美元。官方 Terminal-Bench 4.0 表格中，Sonnet 5.5 为 70.6%，Opus 5.5 为 66.4%；但官方也明确指出，Opus 5.5 在复杂、开放式、需要持续判断的工作中仍然更强。单项分数不能推导成全任务排名，token 单价也不等于完成一个项目的总成本。

所以，下面重点看我这轮具体做出了什么，不把视频中的主观比较扩写成“全面超越”或“史上最便宜”的结论。

## 从黑洞动画到频道短片：检查完整的动态过程

[黑洞吞噬恒星：01:37](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=97s)

第一个任务要求模拟超大质量黑洞吞噬恒星。播放后，能看到恒星被拉伸、物质进入吸积盘以及黑洞逐渐显现的过程。它完成了具有阶段变化的演示动画，而不是只生成一张静态示意图。

这里评价的是视觉表达和流程呈现，没有对物理方程、尺度或模拟精度做验证，不能当作科研仿真。

[15 秒频道宣传片：02:30](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=150s)

接下来的要求是根据我的频道制作一段 15 秒介绍视频。工具环境交付了 MP4 文件，播放时能同时体验动画和声音效果。15 秒是任务要求，本次整理没有对文件时长、分辨率和帧率重新测量。

这类成果说明编程模型能够在工具环境中组织并交付视频作品，不意味着 Sonnet 5.5 本身是原生视频生成模型。实际制作链路和每个素材的来源，也不应从最终 MP4 反向猜测。

[破茧成蝶：03:25](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=205s)

破茧成蝶案例进一步考察连续叙事。按本期展示，毛毛虫的体型与颜色会变化，画面和音效一起呈现完整过程。我对细节和整体观感的评价较好，但这仍是动画作品的体验，不是对生物学准确性的系统审查。

## 原生 iOS 背单词应用：从引导页走到测试结果

[背单词 App：04:39](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=279s)

这个任务在 Claude Code 中完成，提示词沿用了此前 Opus 5.5 的同类测试。启动模拟器后，我依次体验了引导页、每日目标设置和正式学习流程。

这一项有几处比“界面好看”更重要的结果：

- 单词可以自动发音，翻转卡片后显示中文解释。
- 例句可以播放，还能打开单词详情。
- 学习过程支持认识与不认识的选择，并显示完成状态。
- 听力测试可以选择题量；故意选错后，界面会提示错误。
- 测试结束后显示正确率、耗时和错误单词，进度页还展示成就与徽章。

这些步骤说明学习、练习和结果反馈之间已经衔接起来。视频里的 59 秒、36 秒是局部学习或测试界面的计时，并非模型开发耗时。正式产品还需要检查数据持久化、词库质量、无障碍和异常路径，本期没有覆盖这些完整验收项目。

## 原生 macOS 音乐播放器：81 分钟交付可播放 MVP

[音乐播放器：07:06](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=426s)

我要求 Sonnet 5.5 开发一款 Apple Music 风格的音乐播放器。按当期记录，Claude Code 用了 1 小时 21 分钟完成开发。

运行后可以看到侧边栏、主页、歌单、专辑和歌手入口。实际点击歌曲可以播放，右下角可以调节音量，也能进入歌曲列表与专辑。测试音乐由 Claude Code 合成，这是当期讲解记录的素材来源，不应进一步推断成模型原生音乐生成能力。

我把它称为可用的 MVP，原因很具体：它不只是播放器外观，确实能发出声音并完成基本浏览。不过，这不能证明它已经接入 Apple Music 服务、获得音乐授权，或实现完整商业播放器的所有功能。

## Godot 攻击机游戏：实际切换地图并发射导弹

[Godot 游戏：08:07](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=487s)

这一项明确采用 Godot 游戏引擎，而不是 Three.js 网页场景。任务是制作 A-10 攻击机对地打击游戏。

试玩时可以选择不同地图、加载导弹、控制飞机并发射导弹，过程中也出现被命中的反馈；随后切换另一种地形继续测试。这个案例的意义是，模型把需求落实到了游戏引擎中的交互流程。

本期没有长时间压力测试、帧率统计或跨设备比较。因此可以说这段试玩流程能够运行，不能据此补写“性能稳定”“没有 bug”或“已达到商业游戏标准”。

## 摩艾石像与《极光》飞船：空间结构和过程表达

[摩艾石像建造与搬运：09:02](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=542s)

摩艾石像动画依次展示雕刻、竖立、绳索牵引、缓坡运输和安放头饰等过程，还允许切换角度、缩放查看细节。我关注的是这些步骤能否连贯呈现，以及空间关系是否容易理解。动画中的方案不等于已经得到考古验证的唯一历史过程。

[《极光》宇宙飞船探索：11:11](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=671s)

飞船案例要求用适合的前端技术还原小说中的场景。除了外部结构、尾焰和音效，还可以进入内部舱室探索；房门会自动打开，场景中有打印零件的设备、舷窗和参数显示器。

这种从外观进入内部空间的体验，比单一模型展示更有层次。至于和小说设定是否完全一致，本次没有逐段对照原著，因此保留为我的场景体验评价。

[Claude Design 手机原型：12:56](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=776s)

宇宙探索应用原型展示了标签切换、天体详情和收藏等界面。这里交付的是手机应用原型，不能与前面已经在模拟器运行的原生 iOS 应用混为一谈。

## 桌面国际象棋：约 2 分半走了 11 步，但没有下完整局

[Computer Use：13:29](https://www.youtube.com/watch?v=EN-Bq4AqXxg&t=809s)

最后我打开 macOS 自带的国际象棋应用，让 Claude Code 直接操作桌面界面，推理级别设为 medium。按本期记录，约 2 分 30 秒时已经走了 11 步，随后主动结束测试。

这个结果支持的是：在本次环境中，模型能够连续识别和操作桌面棋盘，操作节奏给我的感觉更快。它没有完整对局结果，不能写成赢棋，也不能据此评价棋力或通用桌面自动化成功率。

## 总结：可交互成果很丰富，验收仍要一项项做

这轮 Sonnet 5.5 的表现让我印象较深：视频和动画能交付，原生应用有实际功能，Godot 游戏能试玩，桌面任务也能连续执行。尤其是背单词应用和音乐播放器，已经能通过一系列真实点击检查功能之间的联系。

如果把这些能力用于自己的项目，我会把验收拆成三个层次：先确认文件能打开、程序能运行，再逐项检查关键交互，最后补齐数据、性能与长时间使用的测试。模型完成第一版的能力值得关注，但省下来的开发时间，不应该变成省略验收的理由。

## 资料来源

- [本期 YouTube 视频及公开章节](https://www.youtube.com/watch?v=EN-Bq4AqXxg)
- [Anthropic：Introducing Claude Sonnet 5.5](https://www.anthropic.com/claude-sonnet-5-5)，官方信息核验于 2026 年 10 月 24 日。
