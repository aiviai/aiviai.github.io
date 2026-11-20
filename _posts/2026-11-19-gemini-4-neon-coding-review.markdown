---
layout: single
title: "Gemini 4 Neon 编程实测：重做《清明上河图》，再跑游戏、动画和原生应用"
sidebar:
  nav: docs
date: 2026-11-19
categories: [LLMs]
tags: ["Gemini 4 Neon", "Google Antigravity", "Unity", "Godot 4", "iOS", "macOS", "AI 编程"]
excerpt: "在 Antigravity 把 Gemini 4 Neon 的推理开到最高，实测虹桥复刻、恐龙沙盒、iOS 背单词、智子动画和 macOS 播放器。虹桥用同样提示词对照 GPT-6.2 Astra Ultra 重测，Neon 的水面和船只更有动感，但碰撞和原画细节仍有缺口。"
description: "在 Antigravity 把 Gemini 4 Neon 的推理开到最高，实测虹桥复刻、恐龙沙盒、iOS 背单词、智子动画和 macOS 播放器。虹桥用同样提示词对照 GPT-6.2 Astra Ultra 重测，Neon 的水面和船只更有动感，但碰撞和原画细节仍有缺口。"
cover_lines: ["Gemini 4", "Neon"]
cover_subtitle: "五案实测 · 虹桥复刻、游戏与原生应用"
classes: wide
author_profile: true
toc: true
---

这次用 Gemini 4 Neon 复刻《清明上河图》，桥下的船真的会放倒桅杆。可一切到第一人称，我又能直接从行人身上穿过去。把两个画面放在一起，比只看一张漂亮的全景图更能说明这个模型做到了哪一步。

我在 Antigravity 里把 Neon 的推理设为最高，连跑五道题：Unity 虹桥、Godot 恐龙沙盒、iOS 背单词应用、《三体》智子动画和 macOS 音乐播放器。虹桥还补做了一轮对照：在 Codex 里把 GPT-6.2 Astra 的推理设为 Ultra，用同一份提示词再跑一次。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/u6lZ4zr4D2o" title="AI超元域：Gemini 4 Neon 五项编程实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=u6lZ4zr4D2o)。

---

## Gemini 4 Neon 的价格和上下文

Google 在 2026 年 11 月 18 日公布了 [Gemini 4 Neon](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/)。[Gemini API 标准价格](https://aistudio.google.com/docs/pricing#gemini-4-neon)按每百万 token 计：普通输入 3 美元，缓存输入 0.15 美元，输出 15 美元，输出计费包含推理 token。标准 API 没有免费档。本次用的是 Antigravity，视频未展示实际 API 账单，不能拿单价倒推这五个项目的实际费用。

还有个容易混淆的数字：Google 公布的模型上下文是 **100 万 token**，但 [Antigravity 的模型文档](https://antigravity.google/docs/models)列的是 **最高 512K token**。Antigravity 的最高推理档叫 Extra，适用套餐以官方文档为准。Google 披露了多项基准成绩，下面讲的则是我实际打开工程后看到的结果，两者不混在一起比较。

---

## Unity 虹桥：远看像原画，走近就能挑出问题

[▶ 观看对应测试：01:00](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=60s)

这道题不是随便搭一座宋朝的桥，而是尽量还原《清明上河图》里虹桥那一段的构图、人物和船只。Neon 迭代了几轮，我才在 Unity 里打开成品。先看全景，配色和两岸的布局比较接近原画，树叶在动，天上有鸟，桥上也有撑伞的摊位和棚子。船过桥放倒桅杆，是我觉得最值得看的细节。

[▶ 观看对应测试：02:17](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=137s)

切到第一人称，问题就更明显了。人物有服饰和五官，但走过去会穿模。水面效果我喜欢，桥下类似码头的位置也做出来了；反过来，虹桥结构和那座像脚手架的建筑不够贴近原画，连十千脚店的招牌都成了镜像。只看风格，可能给它很高的分；按画里的位置逐一对照，就会发现不少还要返工的地方。

[▶ 观看对应测试：04:22](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=262s)

同一份提示词交给 GPT-6.2 Astra，我在 Codex 把推理调到 Ultra 重做。相比前一轮，画面有进步，但这次看到的人物像从原画裁下来的平面图，没有动作；船停在河道上，也没演出过桥。Neon 在船只、水面和整体构图上更合我的预期。至于桥的结构和脚手架细节，我还是更喜欢此前 [Claude Fable 5.2 的复刻](https://www.aivi.fyi/llms/claude-fable-52-unity-qingming-review)。这是同题作品的对照，两边用的开发工具和推理档不同，不是统一环境里反复跑出的模型排名。

---

## Godot 恐龙沙盒：能飞、能打，也能挖出坑

[▶ 观看对应测试：06:04](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=364s)

第二道题是做一个类似《我的世界》的恐龙沙盒，要求能探索、建造、飞行，还能射击恐龙。第一版没有做到持续探索，飞行也得补。我让它修探索、加飞行，再把恐龙做得更像样。提示词里已经写清楚的事，还是要把工程跑起来逐项看。

[▶ 观看对应测试：06:49](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=409s)

改完后的版本里，我试了射击、飞行和地形破坏，朝地面射击能打出一个坑。飞到空中能遇到翼龙，下水也能看到生物；继续往外探索，还看到了昼夜变化。草地、树木和恐龙的观感，比我前一轮用 Astra 做的版本更好。不过试玩里仍有卡住的时候，手雷也没有按要求点燃树木。视频能确认的是这段试玩可以继续走，不是我已经把整个地图、建造系统和长期稳定性都验收了。

---

## iOS 背单词：学习流程跑通了，界面还是英文

[▶ 观看对应测试：09:11](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=551s)

在 iOS 模拟器里，我走了一遍从引导设置到开始学习的流程。单词和例句都能发音，卡片可以翻转，还能进词典详情、收藏单词、标记认不认识。做完一组之后能看到学习进度，再进入听力练习答题，结果也会反映在进度页面里。

这项给我印象不错，因为不是只把界面画出来，点几个不同入口也能接着往下用。比较明显的遗漏是没有按要求做成中文 UI。这里测的是模拟器上的这些路径，视频没有展示真机兼容、长期复习数据或上架测试。

---

## 智子工程：科幻画面有了，性能还得量

[▶ 观看对应测试：11:01](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=661s)

我让 Neon 用前端技术演出《三体》的智子工程。成品把质子展开、包围三体星、电路蚀刻、折叠和飞向太阳系连到了一起，蚀刻的部分还能放大看。就这一段的画面和动作衔接，我觉得比前一轮 Astra 的版本更完整，部分画面也接近之前看到的 Fable 5.2 效果。这是科幻演绎，不是对高维物理的仿真。

动画播到后面，我注意到电脑发热。不过视频里没有给出帧率、功耗或 GPU 占用数据，所以只能说这次运行有发热，不能仅凭体感断定瓶颈来自哪里。想把它做成能长时间开的网页，下一步我会先测性能，再考虑添特效。

---

## macOS 音乐播放器：不带示例曲，导入后能正常听

[▶ 观看对应测试：12:21](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=741s)

最后是 macOS 原生音乐播放器。第一次打开没有示例音乐，我就自己导入几首，检查歌曲列表、播放和音量。几首音乐能正常播，刚加的歌曲能在列表里找到，也能切换成迷你播放器。整体风格让我想到 Apple Music。

这轮没有碰到影响播放的明显问题，但我测的是本地导入和基本操作，视频没有展示音频格式兼容、长时间播放或大曲库测试。相比一个看起来很像播放器的界面，我更看重它真的能把音乐导进来、播出来。

---

## 我会用 Neon 做什么？

[▶ 观看视频小结：13:22](https://www.youtube.com/watch?v=u6lZ4zr4D2o&t=802s)

如果是先把创意做成能玩的游戏、让一个原生应用的流程跑起来，或者做一段能播放的动画，我会把 Neon 放进候选。这轮的沙盒和智子动画比我前一轮 Astra 的版本更合预期；但该修的还是要修：沙盒漏了明确写进提示词的功能，虹桥的碰撞和招牌也不能靠一张全景图蒙混过去。

所以这次留给我的判断是：**Neon 值得拿来做原型，但验收要进游戏、进模拟器，亲手把关键路径跑一遍。** 至于要不要换掉原来的模型，我会先选最常做的两三个任务，用相同验收清单比较返工量。
