---
layout: single
title: "Gemini 4 Carbon 连测九个开发案例：画面有惊喜，真正玩起来呢？"
sidebar:
  nav: docs
date: 2026-11-11 20:16:00 +0800
categories: [LLMs]
tags: [Gemini 4 Carbon, Gemini, Antigravity, AI编程, Unity, Godot 4]
excerpt: "在 Antigravity CLI 中用 Medium 连测 Gemini 4 Carbon：云端城堡和黑洞动画有亮点，播放器时间显示、射箭动作、楼梯碰撞和射击反馈却暴露了问题。九个案例逐项回看，并说明限时 API 价格与测试边界。"
description: "在 Antigravity CLI 中用 Medium 连测 Gemini 4 Carbon：云端城堡和黑洞动画有亮点，播放器时间显示、射箭动作、楼梯碰撞和射击反馈却暴露了问题。九个案例逐项回看，并说明限时 API 价格与测试边界。"
cover_lines: ["Gemini 4", "Carbon"]
cover_subtitle: "九案实测 · 游戏、3D 与 macOS 应用"
cover_labels: ["Gemini 4 Carbon"]
cover_caption: ["九案实测 · 游戏、3D 与 macOS 应用"]
classes: wide
author_profile: true
toc: true
---

昨天刚测完 Claude Fable 5.2，今天我又把这批熟悉的开发题交给了 Gemini 4 Carbon。

这次没有只看生成后的截图。我把程序运行起来，播放音乐、拉弓射箭、拿枪打恐龙，还试着爬上一个三维房间的二楼。结果挺有意思：有些场景第一眼很漂亮，但真正动手操作，问题就藏不住了。

九个案例都在 Antigravity CLI 中完成，推理级别设为 Medium。下面按视频顺序聊，好的地方和翻车的细节都留下。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/vYDfUWHZPN4" title="AI超元域：Gemini 4 Carbon 九个复杂开发案例实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=vYDfUWHZPN4)。

---

## 先把模型和价格说清楚

Google 在 2026 年 11 月 10 日宣布扩大 Gemini 4 Carbon 的开放范围。官方把它定位在复杂、多步骤编程与调试、长程 Agent 任务、网络安全和科学推理等方向，同时也明确说，日常的大多数软件工程和知识工作，Argon 仍是合适的选择。这是厂商的产品定位，不代表下面每个任务都能一次做好。

付费开发者可以通过 Gemini API 使用它；Google AI Ultra 用户也在逐步获得 Antigravity、Gemini 应用等入口的访问权限。公开版 API 的入门价是**每百万输入 token 2 美元、输出 token 10 美元**，优惠到 **2026 年 11 月 30 日**结束，之后是 **4 美元和 20 美元**。别把限时价格当成长期价格。实际一项任务花多少钱，还要看推理和输出用量、返工次数。本次视频没有统计完整账单。[价格与开放说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)

---

## 云端城堡：夜景不错，飞艇还有尾烟

[▶ 观看对应测试：01:09](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=69s)

第一题是像素风格的云端城堡，也是昨天测 Fable 5.2 的题目。运行后，整体风格和昨天很接近，可以切换黎明、傍晚和深夜。到了夜里，建筑上的灯全部亮起来，气氛一下就有了。

我挺喜欢飞艇尾部拖着烟的细节，缩小场景还能看到下方的云在飘。不过没看多久，电脑就开始发烫，风扇声也明显起来。画面做出来了，运行负担却值得单独检查。

<!-- 截图位置：云端城堡实测画面 -->

---

## macOS 音乐播放器：能听歌，却看不到时间

[▶ 观看对应测试：02:16](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=136s)

接下来做一个 Apple Music 风格的原生 macOS 播放器。第一版没有演示音乐，我又让它补了一些，再用 Xcode 打开运行。

界面能跟随系统切换明暗主题，歌曲、专辑、歌手、导入音乐和新建播放列表的入口都有。播放和迷你播放器也能用，乍看挺像样。

偏偏歌曲时间被遮住了。我把窗口拖大，它还是没显示出来。这类小问题很影响日常使用：能运行只是第一步，界面上的关键信息也得让人看得见。

<!-- 截图位置：macOS 音乐播放器实测画面 -->

---

## Unity 射箭手：动作有了，细节没跟上

[▶ 观看对应测试：03:46](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=226s)

同样的角色题，我之前用 Opus 5.5 做过。这次 Carbon 交出的射箭手，远看还可以，放大后眼球和嘴部却显得突出，走路也有点僵硬。

拉弓时问题更明显：弓身出现变形，手指还穿进了弓里。动作按钮并不等于动作已经做好，角色、道具和姿态之间要配合起来。在这次具体案例中，我更喜欢之前 Opus 5.5 的结果。

<!-- 截图位置：Unity 射箭手实测画面 -->

---

## Godot 侏罗纪沙盒：能挖坑，地图却走到了头

[▶ 观看对应测试：05:00](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=300s)

这题使用 Godot 4，做一个侏罗纪背景、类似《我的世界》的沙盒。地面和树木的视觉效果比较简陋，但射击恐龙、加特林的转动和音效还算可以，方块也能打碎，甚至能拿枪挖坑。

我继续往外走，想看看世界会不会接着加载，结果走到了地图边界。这里的问题很具体：基础玩法有了，但这份交付没有实现我期待的无限探索，不能只看开场画面就给它打高分。

<!-- 截图位置：Godot 侏罗纪沙盒实测画面 -->

---

## 平面图变三维房间：楼梯卡住了

[▶ 观看对应测试：06:09](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=369s)

我提供室内平面图，让它还原成可探索的 3D 房间。俯视和进入房间后的整体效果还可以，不过地板、家具、墙体的颜色太接近，看起来有些混在一起。

真正打断体验的是楼梯。走到一半，角色就上不去了，还会掉下来。既然任务是“可探索”，二楼就不能只是摆在那里。运行过程中电脑也再次发热，后续除了修碰撞，还应该检查渲染开销。

<!-- 截图位置：平面图变三维房间实测画面 -->

---

## 圣家堂：轮廓有了，彩窗少了点意思

[▶ 观看对应测试：07:10](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=430s)

圣家堂也是昨天用 Fable 5.2 测过的案例。Carbon 这次的外观比较简略，进入内部后，彩色玻璃和光影的表现也没有昨天那版打动我。

这不是建筑精度测量，而是同一题目下的视觉感受。对这类建筑演示来说，轮廓像不像只是一部分，室内的光和材质才会决定走进去之后有没有气氛。

<!-- 截图位置：圣家堂实测画面 -->

---

## 射击游戏：枪能打，目标却不倒

[▶ 观看对应测试：07:50](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=470s)

这次提示词的目标是“3A 级别”射击游戏，不过那是需求，不是成品已经达到的标准。

实际运行时，枪的外观比较简单。更关键的是，对着画面中不动的角色连续射击，对方却没有被打倒。视频没有进一步定位是命中判定还是伤害逻辑的问题，但这段操作已经说明，核心战斗流程仍需要排查，不能只把场景搭起来就算完成。

<!-- 截图位置：射击游戏实测画面 -->

---

## 《极光号》飞船：外面能看，里面还很粗

[▶ 观看对应测试：08:29](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=509s)

我让它复刻小说《极光号》中的宇宙飞船。外部效果还可以，也能点击左侧不同位置查看细节。

进入内部之后，建筑和房子就显得简陋了。探索不到一分钟，电脑又开始明显发热。这个案例给我的感觉是，它能先搭出一个可浏览的结构，但内部细节和运行体验还需要继续打磨。

<!-- 截图位置：《极光号》飞船实测画面 -->

---

## 黑洞吞噬恒星：终于有一段让我看得过瘾

[▶ 观看对应测试：09:11](https://www.youtube.com/watch?v=vYDfUWHZPN4&t=551s)

最后是模拟超大质量黑洞吞噬恒星的动画。我把速度调到两倍，能看到恒星被撕裂，物质逐渐围绕黑洞形成吸积盘，整个过程挺震撼。

这是九题里我比较满意的一题，至少视觉叙事是连贯的。不过，它是一个演示动画，我没有核验背后的物理方程和数值精度，不能把画面漂亮当成科学模拟准确。运行时的发热和风扇声也依然存在。

<!-- 截图位置：黑洞吞噬恒星实测画面 -->

---

## 我会怎么用它？

测完这九题，我对 Carbon 的印象有点分裂：云端城堡和黑洞动画确实有亮点，但一碰到播放器布局、角色动作、楼梯碰撞、射击反馈这些细节，返工清单就开始变长。

如果只是快速搭一个视觉原型，它值得试；如果准备把生成结果直接交给别人使用，我会先沿着完整操作流程走一遍。尤其是那些“截图上看不出来”的地方，得真的点、真的走、真的玩。

也把边界说清楚：这轮是我在 Antigravity CLI、Medium 设置下的九个案例，不是多轮重复、统一预算的模型榜单。它没有测试网络安全或科学研究，也不能据此否定那些能力。几次发热是我的使用体感，没有记录帧率、功耗或做性能剖析，暂时不能直接归因到某一段代码，更不能说模型推理是在我的电脑上运行。

对我来说，这次最值得记住的不是谁又赢了谁，而是：**生成完成之后，别急着关掉窗口，先把它用一遍。**

本文根据本期视频说明、章节与对应字幕整理稿改写，实测描述保留录制时的观察；未另外复跑工程。模型信息与价格于 2026 年 11 月 11 日核对，后续以[Google 官方说明](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)为准。
