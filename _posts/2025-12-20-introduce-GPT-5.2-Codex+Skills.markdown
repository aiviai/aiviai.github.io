---
layout: single
title: "🚀开发者必看！Codex新增Agent Skills！GPT-5.2-Codex三大编程任务实测，结果出乎意料！实战开发iOS App，它真的能取代程序员吗？到底是“生产力核弹”还是“又慢又贵”？"
sidebar:
  nav: "docs"
date: 2025-12-20 00:00:00 +0800
categories: LLMs
tags: [GPT-5.2, OpenAI , AI Coding, Vibe Coding, Codex, Skills, AI编程, Codex, AIGC, Opus 4.5]
classes: wide
author_profile: true
---


今天OpenAI悄悄发布了GPT-5.2-Codex，同时在Codex CLI中正式支持了Agent Skills功能。

说"悄悄"是因为这次发布几乎没有大张旗鼓的预热，但对于开发者来说，这是一次相当重要的更新。一方面，GPT-5.2-Codex在代码能力上又往前迈了一步；另一方面，Skills的加入意味着OpenAI终于承认了Anthropic两个月前提出的这套方案确实好用——好用到不得不跟进。

我花了一上午时间在Codex中测试了这个新模型和Skills功能，说说真实感受。


> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1rb2tBFEZi/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/p05Dt9jBouk)
> - [👉👉👉 Subagents视频](https://youtu.be/GjlkRcNNONo)
> - [👉👉👉 Gemini CLI视频](https://youtu.be/v41xKxZmygU)
> - [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
> - [👉👉👉 SuperClaude视频](https://youtu.be/bMO13RNjvBk)
> - [👉👉👉 Claudia视频](https://youtu.be/WIwW7V56wxE)
> - [👉👉👉 Task Master视频](https://youtu.be/6dhOUJ_vnIY)
> - [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
> - [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
> - [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
> - [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
> - [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
> - 👉👉👉 我的微信：stoeng
> - 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。
>
> 🔥AI智能体相关视频
> - [AI智能体视频 1](https://youtu.be/vYm0brFoMwA)
> - [AI智能体视频 2](https://youtu.be/szTXELuaJos)
> - [AI智能体视频 3](https://youtu.be/szTXELuaJos)
> - [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)
> - [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)
> - [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  



## Agent Skills到底是什么？

先聊聊Skills，因为很多人可能还不太了解这个概念。

简单来说，Skills就是把你的专业知识和工作流程打包成一个文件夹，让AI可以随时调用。这个想法最早是Anthropic在10月份提出的，他们管这叫"给员工配工作手册"。

打个比方：你招了一个聪明但没经过培训的新人。每次布置任务，你都要从头讲一遍规范——用什么框架、代码风格怎样、测试覆盖率要达到多少。讲一次还行，天天讲谁受得了？

有了Skills之后，这些规范都写在SKILL.md文件里。AI接到任务会自动翻阅"工作手册"，按照你定好的标准执行。下次再有类似任务，直接说"帮我写测试"就行，不用重复交代那一堆要求。

比起之前的MCP方案，Skills有个很大的优势：省token。启动时只加载技能的名称和简介，真正执行任务时才把完整内容读进来。这种"渐进式披露"的设计让你可以装很多Skills而不用担心上下文爆炸。

OpenAI这次的实现基本照搬了Anthropic的规范——SKILL.md文件放在~/.codex/skills/目录下，格式完全兼容。说白了就是"你设计的方案不错，我拿来用了"。

## 在Codex中配置Skills

配置过程倒是不复杂。

首先确保Codex升级到最新版，然后在配置文件里把skills功能打开：

```toml
[features]
skills = true

```

重启之后用/skills命令就能看到已安装的技能列表。Codex自带了几个基础Skills，比如制作PPT、处理Word文档之类的。

想装更多Skills也简单。Anthropic在GitHub上开源了一批高质量的Skills，直接复制链接到Codex里安装就行。我装了一个前端设计的Skill，让它开发登录页UI，效果确实比裸奔的AI好不少——配色、布局、细节处理都更专业。

还测试了PPT制作Skills。给它一篇介绍Agent Skills的技术文章链接，让它做成10页PPT，要求深色极简风格、中文、面向开发者。等了几分钟，出来的结果相当不错，风格统一，内容提炼也到位。

这就是Skills的价值：把"怎么做好"的经验固化下来，让AI每次都能稳定输出。

## GPT-5.2-Codex的真实编码能力

说完Skills，重点聊聊这个新模型。

按照OpenAI官方的说法，GPT-5.2-Codex主要有几个改进：上下文压缩能力更强，可以处理更长的任务；大规模代码重构和迁移表现更好；Windows环境支持改善；网络安全能力提升；视觉理解能力增强。

在SWE-Bench Pro这个基准测试上，GPT-5.2-Codex拿到了56.4%的成绩，超过了GPT-5.2的55.6%和GPT-5.1的50.8%。听起来提升不大，但这个benchmark本身难度很高，能上56%已经是目前的最好水平。

数字好看归好看，实际用起来怎么样？我设计了三个测试。

**测试一：UI复刻**

准备了一张复杂的后台管理界面截图，让GPT-5.2-Codex照着复刻。

结果花了将近20分钟。

没看错，一个UI复刻任务，19分45秒。同样的任务用Claude Code基本一分钟搞定。

但撇开速度不谈，复刻的效果还可以。表格布局、样式细节、整体配色都还原得不错，基本保持了原图的结构。如果你不赶时间，这个结果是能用的。

**测试二：智能体框架转换**

这个测试稍微复杂一点。我有一段用微软AutoGen框架写的旅游规划智能体代码，不到100行，要求GPT-5.2-Codex把它改写成Google ADK框架的版本，并且加上UI界面。

提示词里让它先读ADK的官方文档，然后进行重构。这种任务考验的是信息检索、代码理解、跨框架迁移等多方面能力。

等了快10分钟，任务完成。打开一看，UI界面有了，基本功能也能跑，但仔细对比发现少了一个"语言专家"智能体——原来的代码里，这个智能体负责提供当地常用语，改写后的版本把这块漏掉了。

不算完美，但考虑到这是全自动的Vibe Coding流程，能做到这个程度已经不错。

**测试三：iOS原生应用开发**

这是最硬的一个测试：开发一个完整的iOS背单词应用。

要求很具体：使用SwiftUI和SwiftData，遵循MVVM架构，实现单词卡片、发音、收藏、进度统计等功能，支持深色浅色模式切换，界面要有首页、练习、进度、设置四个Tab。

因为任务复杂，我用了Codex的计划模式，先让它制定开发计划，确认后再执行。

然后就是漫长的等待。

33分钟后，项目终于完成。第一次运行，报错。修复后再跑，又报错。反复几轮之后，终于能正常打开了。

功能基本都实现了：单词卡片可以翻转，发音能正常播放，收藏和进度记录也有。但界面竟然是英文的，而且让Claude Code分析了一下代码结构，发现2000多行代码全部堆在一个文件里，根本没有按照MVVM架构拆分。

说好的架构规范呢？

## 速度是最大的问题

聊了这么多，该下结论了。

GPT-5.2-Codex的编码能力确实有提升，复杂任务的完成度比之前的版本好。视觉理解能力也不错，看截图写代码这件事它能做得还行。Skills的加入让整个开发流程更可控，特别是团队协作场景下，统一的"工作手册"能保证输出质量。

但速度实在太慢了。

一个简单任务5分钟起步，稍微复杂点的就要10分钟以上，完整项目动辄半小时。对比Claude Code的响应速度，这个差距有点大。而且慢也就算了，质量也没有因为慢而变得更好——2000行代码堆一个文件这种问题，不应该出现在一个花了33分钟的产出里。

OpenAI官方把这个模型定位为处理"长时间运行的软件工程任务"，强调的是context compaction能力，说白了就是让它能记住更多上下文、处理更长的工作流。这个定位本身没问题，但如果每个简单任务都要等这么久，实际开发中很难用起来。

另一个值得关注的点是，OpenAI这次直接采用了Anthropic的Skills规范。从技术角度看，这说明Skills这套方案确实好用，已经成为行业事实标准。对开发者来说也是好消息：你写的Skills可以在Claude和Codex之间通用，不用维护两套配置。

总的来说，GPT-5.2-Codex是一个有明显进步但也有明显短板的更新。如果你的工作流允许把任务丢给AI然后去干别的事，它是个还不错的选择。但如果你需要快速迭代、实时反馈，目前来看Claude Code还是更顺手。

Skills功能倒是值得好好研究一下，不管你用的是哪家的工具，这套"给AI配工作手册"的思路确实能提升产出质量。

## 🚀如何在 Codex 中启用 Skills（官方方式）

Skills 目前是 **Experimental 特性**，需要在 feature flags 里打开。官方给了两条路：

### A) 永久启用（推荐）：写入 `~/.codex/config.toml`

在你的 `~/.codex/config.toml` 加上：

```toml
[features]
skills =true

```

官方配置文档明确写了：`skills` 默认是 `false`，属于 Experimental，需要在 `[features]` 中启用。 [GitHub](https://raw.githubusercontent.com/openai/codex/main/docs/config.md)

> 改完后重启 Codex（重新启动 CLI 会话）即可生效。
> 

---

### B) 单次启用：启动 Codex 时加 `-enable skills`

```bash
codex --enable skills

```

官方 CLI 参考里说明：`--enable <feature>` 会强制打开某个 feature flag（等价于设置 `features.<name>=true`），而且可以重复传多个。

### 启用Skils

```python
# 打开配置文件

nano ~/.codex/config.toml

# 输入如下内容：

[profiles.skill-install]
# 1) 让 Codex 可以在工作区里写文件 + 运行安装命令
sandbox_mode = "workspace-write"

# 2) 关键：不要用 untrusted；用 on-request 让它每次要跑命令时问你
approval_policy = "on-request"

# 3) 关键：允许 workspace-write 沙箱出网（不然 GitHub 拉不下来）
[sandbox_workspace_write]
network_access = true
```

### 安装Skills

```python
codex --sandbox workspace-write --ask-for-approval on-request

$skill-installer linear

$skill-installer https://github.com/anthropics/skills/tree/main/skills/pptx
```

**✅测试**

```python
$pptx 把这篇关于 Agent Skills 的介绍文章做成 10 页的介绍PPT：
- 受众：开发者
- 风格：极简深色
- 语言：中文
- 输出：./skills-gpt-5.2-codex.pptx
内容来源：https://claude.com/blog/skills
```

### 🔥智能体框架转换

> 可以测试AI的**信息检索与文档理解能力、代码理解与分析能力、跨框架迁移/重构能力、API集成能力、多任务协调能力等。所以这个题目也是比较有代表性的。**
> 

```python
请先深度阅读Google ADK的官方文档：https://google.github.io/adk-docs/get-started/

然后将下面关于AutoGen智能体框架编写的旅游规划智能体，重构为Google ADK框架的旅游规划智能体。

并将重构后的智能体中的LLM接口和模型改为mistral AI的api和 Mistral Large 3 模型，mistral api文档：https://docs.mistral.ai/。

要求重构后的智能体功能保持原有智能体的逻辑和功能，并为重构后的智能体加入Google ADK官方的UI操作界面。

API key放入.env中。

### AutoGen智能体代码：

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

model_client = OpenAIChatCompletionClient(model="gpt-4o")

planner_agent = AssistantAgent(
    "planner_agent",
    model_client=model_client,
    description="A helpful assistant that can plan trips.",
    system_message="You are a helpful assistant that can suggest a travel plan for a user based on their request.",
)

local_agent = AssistantAgent(
    "local_agent",
    model_client=model_client,
    description="A local assistant that can suggest local activities or places to visit.",
    system_message="You are a helpful assistant that can suggest authentic and interesting local activities or places to visit for a user and can utilize any context information provided.",
)

language_agent = AssistantAgent(
    "language_agent",
    model_client=model_client,
    description="A helpful assistant that can provide language tips for a given destination.",
    system_message="You are a helpful assistant that can review travel plans, providing feedback on important/critical tips about how best to address language or communication challenges for the given destination. If the plan already includes language tips, you can mention that the plan is satisfactory, with rationale.",
)

travel_summary_agent = AssistantAgent(
    "travel_summary_agent",
    model_client=model_client,
    description="A helpful assistant that can summarize the travel plan.",
    system_message="You are a helpful assistant that can take in all of the suggestions and advice from the other agents and provide a detailed final travel plan. You must ensure that the final plan is integrated and complete. YOUR FINAL RESPONSE MUST BE THE COMPLETE PLAN. When the plan is complete and all perspectives are integrated, you can respond with TERMINATE.",
)

termination = TextMentionTermination("TERMINATE")
group_chat = RoundRobinGroupChat(
    [planner_agent, local_agent, language_agent, travel_summary_agent], termination_condition=termination
)
await Console(group_chat.run_stream(task="Plan a 3 day trip to Nepal."))

await model_client.close()

```

### 🔥背单词应用开发prompt

> 这个题目可以综合测试 AI 在 **Swift/SwiftUI 语言掌握、MVVM 架构设计、复杂动画与手势交互、SwiftData 数据持久化、系统框架集成（语音合成/图表/通知）以及业务逻辑算法（学习统计/出题策略）** 方面的能力。
> 

```python
# iOS 原生背单词应用开发需求

请使用 Swift 和 SwiftUI 创建一个功能完整的 iOS 背单词应用。

## 应用概述
- **应用名称**：LingoLearn
- **目标用户**：英语学习者
- **最低支持版本**：iOS 17.0
- **主要功能**：单词学习、练习测试、学习进度追踪、数据持久化

## 技术要求
- 使用 Swift 5.9+ 和 SwiftUI 框架
- 遵循 MVVM 架构模式
- 使用 SwiftData 进行本地数据持久化
- 使用 AVFoundation 实现单词发音功能
- 支持深色/浅色模式
- 遵循 Apple Human Interface Guidelines
- 使用 Swift Concurrency (async/await) 处理异步操作

## 界面结构

### 主标签栏 (TabView)
- **首页**：单词学习卡片，今日学习目标
- **练习**：各类练习题目入口
- **进度**：学习统计和成就展示
- **设置**：应用配置和个人信息

### 导航结构
- 使用 NavigationStack 实现页面导航
- 顶部显示当前学习进度条
- 支持手势返回

## 核心功能

### 1. 单词学习模块

**单词卡片：**
- 3D 翻转动画效果（正面：单词、音标、发音按钮；背面：释义、例句、词性）
- 左右滑动切换单词（左滑"已掌握"，右滑"需复习"）
- 卡片堆叠视觉效果

**发音功能：**
- 使用 AVSpeechSynthesizer 朗读单词
- 支持语速调节（慢速/正常/快速）
- 点击时有波纹动画

**收藏功能：**
- 星标收藏/取消
- 收藏列表管理

### 2. 练习测试模块

**选择题：**
- 单词选释义 或 释义选单词
- 4个选项，选中后立即显示对错反馈

**填空题：**
- 例句中单词用下划线代替
- 支持提示功能（显示首字母）

**听力题：**
- 播放单词发音，选择对应单词
- 支持重复播放（最多3次）

**通用功能：**
- 顶部答题进度指示
- 每题30秒倒计时
- 练习结束显示成绩单（正确率、用时、错题回顾）
- 错题自动加入复习列表

### 3. 学习进度模块

**每日统计：**
- 今日学习单词数、正确率、学习时长
- 与昨日对比

**图表展示：**
- 使用 Swift Charts 绘制近7天学习曲线
- 支持周/月数据切换

**连续学习：**
- 连续学习天数显示
- 火焰图标动画
- 断签提醒

**词汇量统计：**
- 总词汇量 / 已掌握 / 学习中 / 未学习
- 环形进度图

**成就徽章：**
- 学习天数成就（7/30/100/365天）
- 词汇量成就（100/500/1000/5000词）
- 正确率成就（连续10/50/100题全对）
- 使用 SF Symbols 图标，获得时显示庆祝动画

### 4. 设置模块

**学习设置：**
- 每日目标（10/20/30/50词）
- 学习提醒时间
- 发音语速、自动播放开关

**显示设置：**
- 主题切换（深色/浅色/系统）
- 字体大小（小/中/大）

**数据管理：**
- 学习数据导出
- 清除/重置记录

## 设计要求

**颜色主题：**
- 主色调：温暖的蓝色
- 强调色：清新的绿色
- 支持深色模式适配

**字体规范：**
- 使用系统字体 SF Pro
- 支持 Dynamic Type 动态字体

**间距和尺寸：**
- 按钮最小高度 44pt
- 卡片圆角 16pt
- 合理的页面边距和组件间距

**动画效果：**
- 弹性动画 (.spring())
- 卡片翻转 rotation3DEffect
- 点击反馈 scaleEffect
- Haptic Feedback 触觉反馈

**加载状态：**
- ProgressView 加载指示
- redacted 骨架屏效果
- 空状态友好提示

## 本地通知
- 每日固定时间学习提醒
- 连续学习即将断签提醒

## 初始数据
请包含至少 200 个常用英语单词（基础100 + 进阶50 + 高级50），每个单词包含音标、词性、释义、例句。

## 性能优化
- LazyVStack 懒加载
- 避免主线程数据库操作
- 合理使用 @StateObject 和 @ObservedObject

## 无障碍支持
- 添加 accessibilityLabel
- 支持 VoiceOver
- 支持动态字体
- 颜色对比度符合标准

## 交付要求
提供完整可运行的 Xcode 项目，包含所有源代码和资源文件，应用能在模拟器和真机正常运行，所有核心功能完整可用。
```
