---
layout: single
title: "ego lite 实测：让 WorkBuddy 查资料，我继续看论文"
sidebar:
  nav: docs
date: 2026-11-16
categories: [AIAgents]
tags: [ego lite, WorkBuddy, 浏览器自动化, AI Agent]
excerpt: "把 ego lite 接入 WorkBuddy，实际检查 Chrome 登录复用、独立 Space、GitHub 项目研究、Hugging Face 模型筛选和双标签页对比。最直接的变化是少打断日常浏览；批处理的速度与 token 节省还没有做定量测试。"
description: "把 ego lite 接入 WorkBuddy，实际检查 Chrome 登录复用、独立 Space、GitHub 项目研究、Hugging Face 模型筛选和双标签页对比。最直接的变化是少打断日常浏览；批处理的速度与 token 节省还没有做定量测试。"
cover_lines: ["ego lite", "WorkBuddy"]
cover_subtitle: "登录复用 · 独立工作区 · 网页研究"
cover_labels: ["ego lite × WorkBuddy"]
cover_caption: ["登录复用 · 独立工作区 · 网页研究"]
classes: wide
author_profile: true
toc: true
---

我经常要查 GitHub 开源项目，也会去 Hugging Face 看最近有哪些模型值得试。把这些资料搜集工作交给 Agent，确实能少做不少重复操作。不过，当它开始操作浏览器时，我自己正在看的页面怎么办？

这次我把 ego lite 接入了 WorkBuddy，想试的就是这个问题：让它在自己的 Space 里查项目、翻 Issues 和 PR，我能不能继续看论文，而不是坐在旁边等它把浏览器还给我。

整套流程跑下来，最直观的变化是少了打断。导入 Chrome 数据后，我测试的 GitHub 和邮箱也都保留了登录状态。下面按操作顺序，聊聊这次具体做了什么，以及哪些结论还不能下得太早。

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/2RH73xU6O7M" title="AI超元域：ego lite 接入 WorkBuddy，登录复用与独立 Space 实测" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

如果播放器无法加载，可以[前往 YouTube 观看完整视频](https://www.youtube.com/watch?v=2RH73xU6O7M)。

---

## 先认识这几个功能，别把工作区当成账号隔离

[▶ 观看对应测试：01:26](https://www.youtube.com/watch?v=2RH73xU6O7M&t=86s)

ego lite 为 Agent 提供了独立的 Space 工作区。Agent 在里面打开和操作网页，我的个人标签页可以留在原处。它还支持复用导入的浏览器登录环境，通过 Snapshot 和元素引用帮助 Agent 找到页面上的链接、按钮，以及用 Node 批处理串起已经确定的操作步骤。

这里有一个区别值得提前说清楚：**页面分开，不代表账号和权限自动隔离。** 官方 Space 文档明确区分了这两件事。换一个 Space 名字，并不能证明换了登录账号、浏览器 Profile 或网站权限。涉及私有资料、发消息或者修改数据时，仍然要确认当前账号以及任务允许它做什么。[Space 官方说明](https://lite.ego.app/document/en/docs/space)

这次重点是网页研究和使用体验，不是对浏览器的安全性做完整审计，也没有单独测量 Snapshot 带来的性能提升。

---

## 导入 Chrome 后，GitHub 和邮箱都不用再登一次

[▶ 观看对应测试：02:50](https://www.youtube.com/watch?v=2RH73xU6O7M&t=170s)

安装完成后，初始设置里可以导入常用浏览器的数据。我这次导入的是 Chrome，随后进入 ego lite，检查原来已经登录的网站。

先打开 GitHub，账号已经处于登录状态；再进入邮箱，也没有要求我重新登录。这两个检查对应的是我当时的账号和环境，不能据此保证每个网站、每种登录方式都能直接复用。但对于这次工作流来说，少做两遍登录已经很实用。

设置过程中还可以选择标签页横向或纵向排列。这不是自动化能力本身，却关系到你能不能把它当作日常浏览器一起使用。

<!-- 截图位置：浏览器数据导入与登录状态检查 -->

---

## 接入 WorkBuddy：先找到 ego-browser Skill

[▶ 观看对应测试：04:13](https://www.youtube.com/watch?v=2RH73xU6O7M&t=253s)

我在 WorkBuddy 中新建了工作空间，然后从输入框的斜杠菜单里选择 ego-browser Skill，把浏览器任务交给它。

视频中的环境可以直接找到这个 Skill。如果你安装后看不到，官方 WorkBuddy 文档还给出了把已安装 Skill 放到 WorkBuddy 对应目录、再重启应用的方法。具体设置以当前官方说明为准，不要把我这次顺利出现的菜单当成所有环境都会自动配置好的保证。[WorkBuddy 接入说明](https://www.egolite.ai/document/en/docs/workbuddy)

演示使用了较宽的权限设置。这方便连续执行任务，但不是说日常使用必须把所有权限都放开。尤其复用了已登录的网站之后，应当把允许访问的数据和允许执行的动作说清楚。

---

## GitHub Trending：先筛三个项目，再继续翻 Issues 和 PR

[▶ 观看对应测试：04:48](https://www.youtube.com/watch?v=2RH73xU6O7M&t=288s)

第一步，我让 WorkBuddy 打开 GitHub Trending，从热门项目中筛选三个值得进一步研究的 AI 开源项目。

它打开趋势榜，完成筛选后返回结果，还给出了被筛掉的项目。最终的三个候选按不同的研究价值组织，并以卡片形式展示。这里得到的是一份研究起点，不是我已经验证过质量、决定采用的项目清单。

[▶ 观看对应测试：06:04](https://www.youtube.com/watch?v=2RH73xU6O7M&t=364s)

接下来，我让它继续研究其中一个项目：阅读文档、Issues、PR，分析项目价值和社区热度，最后输出报告。

进入它的 Space，可以看到它沿着仓库页面继续查资料，从 Issues 翻页到 PR，再到 Insights。对我来说，能看到它正在研究哪些页面，比只等一个最终答案更有用。视频里翻页看起来很快，不过我没有做统一条件下的耗时对比，因此不会把这次观感写成浏览器速度排名。

[▶ 观看对应测试：09:19](https://www.youtube.com/watch?v=2RH73xU6O7M&t=559s)

任务完成后，WorkBuddy 给出了分析报告，里面有结论、项目介绍和图表。这说明从打开网页、搜集资料到组织报告的流程能够串起来。报告里每一条判断是否可靠，仍然要回到原始项目材料核查，不能因为排版完整就省略复核。

<!-- 截图位置：项目研究工作区与分析报告 -->

---

## 它研究仓库的时候，我继续看论文

[▶ 观看对应测试：07:10](https://www.youtube.com/watch?v=2RH73xU6O7M&t=430s)

这是我这次最想验证的一段。

WorkBuddy 还在独立 Space 里研究仓库时，我切回自己正在看的论文，继续阅读。想看它做到哪一步，再从右上角进入 Agent 的工作区；看完之后，又能回到自己的页面。

这种切换让两个任务各有位置。我不用把正在读的论文页交出去，也不必一直盯着 Agent 翻页。这是这次演示里能直接感受到的改善，但并不意味着并行任务完全不占用电脑资源，或者所有网站都不会互相影响。

[▶ 观看对应测试：08:23](https://www.youtube.com/watch?v=2RH73xU6O7M&t=503s)

我也做了一个简短对照：让 Codex 通过 Chrome 打开 GitHub Trending，同时在 Chrome 里保留那篇论文。这个过程中，页面上出现了“ChatGPT 正在调试这个浏览器”的提示，也多出了执行任务的标签页。

换回本次 ego lite 与 WorkBuddy 的流程，我没有遇到同样位置的调试提示。这种界面上的区别，比笼统说“谁更强”更容易解释我为什么在意独立工作区。它不是 Codex 全部浏览器能力的完整评测，更不能据此推出通用性能结论。

<!-- 截图位置：论文标签页、独立 Space 与 Chrome 对照 -->

---

## Hugging Face：推荐模型，也把限制一起留下

[▶ 观看对应测试：09:51](https://www.youtube.com/watch?v=2RH73xU6O7M&t=591s)

第二轮研究换成 Hugging Face 趋势榜。我这次把任务要求说得更细：保留采集时间和原始顺序，区分基础模型、微调版、量化版与镜像，核查模型卡和权重许可，再面向文本与编程用途，推荐最多五个值得实测的候选。

此外，还要求它给出理由、限制和来源，不确定的地方标为未确认。

WorkBuddy 在 Space 中打开榜单、进入模型卡，最后输出了原始排名和五款候选模型的研究结果。其中的限制并没有全被略掉，例如报告提到了非商用许可和硬件门槛。

我觉得这类结果适合用来决定下一步先研究什么。**筛选出值得实测的模型，不等于已经完成模型实测。** 这次没有把五款模型都下载、运行并做统一基准，所以不能把候选顺序写成性能排行榜。

---

## 两个标签页，比较同一模型的不同版本

[▶ 观看对应测试：11:14](https://www.youtube.com/watch?v=2RH73xU6O7M&t=674s)

有了候选之后，我继续让它研究其中一个模型：同时打开我提供的两个相关模型链接，对比相同点、不同点以及适合的使用场景。

进入工作区，可以看到它打开了两个标签页，分别研究对应页面。完成后，它给出了对比报告和对比图。

这一段展示的是多页面资料对照的流程，没有运行这两个版本，也没有测推理速度、显存占用或回答质量。具体版本身份和报告中的技术判断，要结合原始模型卡继续确认，不能仅凭生成的对比图作选择。

---

## 把重复步骤做成批处理，但节省多少还没量过

[▶ 观看对应测试：12:24](https://www.youtube.com/watch?v=2RH73xU6O7M&t=744s)

最后，我让 WorkBuddy 把刚才获取 Hugging Face 趋势榜、筛选五个候选并输出报告的工作流，整理成可以复用的 Node 批处理。

它完成了这一步。对于已经明确的操作顺序，下次不必重新从零描述流程，是个值得继续尝试的方向。

但本期展示到的是批处理创建完成，没有展示多次重复执行的计时，也没有对照实际 token 账单。少一些工具往返，不等于我已经测出了具体节省比例。后续还需要检查脚本能否稳定重跑，以及网页变化后怎么处理失败。

---

## 最后聊聊我的感受

对我这种经常研究 GitHub 项目和开源模型的人来说，这次最有价值的发现，是可以让 Agent 去处理重复的查找与整理，同时保留自己的浏览节奏。

登录复用减少了开始任务前的准备，独立 Space 则让研究过程不必挤占我正在使用的页面。报告也不是完全不可见的黑盒：想知道它在查什么，可以进去看，再回到自己的工作。

当然，方便不等于不用管理权限，生成完整报告也不等于事实已经全部核对。这次更适合看作一次真实工作流体验。性能、安全边界和批处理的长期稳定性，还需要更有针对性的测试。

本文根据本期视频对应的带时间脚本整理；未据此补造未展示的操作、模型成绩或速度数据。视频发布于 2026 年 11 月 16 日，具体发布时间与时区未确认。

资料参考：[本期完整视频](https://www.youtube.com/watch?v=2RH73xU6O7M) · [ego lite 项目仓库](https://github.com/citrolabs/ego-lite) · [WorkBuddy 官方接入文档](https://www.egolite.ai/document/en/docs/workbuddy) · [Space 官方说明](https://lite.ego.app/document/en/docs/space)
