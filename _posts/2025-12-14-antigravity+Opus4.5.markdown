---
layout: single
title: "🚀Claude Code被封号？用谷歌Antigravity+Claude Opus 4.5轻松替代！实测项目重构+全栈开发效果惊艳！Opus 4.5 才是编程真神？Antigravity保姆级教程"
sidebar:
  nav: "docs"
date: 2025-12-14 00:00:00 +0800
categories: LLMs
tags: [ Claude Opus 4.5, Antigravity IDE , Antigravity, Claude Code, AutoGen, AI智能体, Vibe Coding, AGI, AIGC]
classes: wide
author_profile: true
---


最近在AI编程圈子里，有个话题被反复提起：Claude Code封号。

不少开发者跟我吐槽过类似的经历——花钱订阅了Claude官方账号，满心欢喜地打开Claude Code准备大干一场，结果用不到一天，账号就被封了。客服也联系不上，申诉也没用，钱打了水漂不说，项目进度也被耽误。

说实话，这种体验确实挺糟心的。

不过最近我发现了一个还不错的替代方案，想跟大家聊聊。谷歌发布的AI编程助手Antigravity，前段时间悄悄加入了对Claude Opus 4.5的支持。这对于那些想用Opus 4.5但又被封号问题困扰的朋友来说，算是个好消息。


> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1rb2tBFEZi/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/vz0-W3BwFQU)
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



---

## 先说说Antigravity是什么

Antigravity是谷歌推出的一款AI编程工具，目前已经全面支持macOS、Windows和Linux三大系统。它最大的特点是支持多智能体异步工作，简单说就是可以让多个AI同时干活，一个负责前端，一个负责后端，互不干扰。

这个功能在实际开发中其实挺实用的。比如你在做一个全栈项目，以前可能要等前端写完再写后端，或者来回切换。现在可以让两个智能体同时推进，效率确实能提升不少。

安装过程没什么好说的，去官网根据自己的系统下载安装包，一路下一步就行。

---

## 配置这块稍微花点心思

安装完之后，我建议先花几分钟做一些基础配置，后面用起来会顺手很多。

首先是规则文件。点击右上角的三个点，再点自定义，找到规则设置。这里可以设置全局规则，告诉AI你的技术栈是什么、用什么版本、有哪些代码规范之类的。

我自己的配置大概是这样：Python部分写清楚用的是3.11版本，虚拟环境用venv创建，代码风格遵循PEP8规范。前端部分写的是Next.js 14版本，样式用Tailwind CSS，后端数据库用Supabase。

这些规则设置好之后，AI在写代码的时候就会自动遵循，不用每次都在提示词里重复说明。

另一个值得配置的是MCP（Model Context Protocol）。如果你用Supabase做后端，强烈建议把Supabase的MCP装上。装好之后，AI可以直接通过MCP操作你的数据库，创建表、设置权限这些活儿都能自动完成，省去了很多手动操作。

配置MCP需要填入Supabase的access token。登录Supabase后台，点右上角头像进入账户设置，找到access tokens，生成一个新的token复制过来就行。过期时间可以设成不过期，省得以后还要换。

顺便说一句Supabase这个东西。如果你还没用过，可以把它理解成做APP或者网站的后端全家桶。数据库、用户登录、文件存储、实时更新这些功能它都打包好了，不用自己从零搭建。特别适合做MVP或者快速验证想法的场景。

---

## 实际效果怎么样？跑两个案例看看

光说不练假把式，我用两个案例测试了一下Antigravity配合Claude Opus 4.5的实际表现。

**第一个案例：智能体框架重构**

这个测试题是把微软智能体框架写的代码，重构成谷歌ADK智能体框架。同时还要求把大模型接口换成Mistral AI的，模型用Mistral Large 3。

说实话，这个任务不算简单。涉及到两个不同框架的语法转换，还要换模型接口，保持原有功能逻辑不变，最后还得加上谷歌ADK的UI界面。

我把提示词发过去之后，AI先花了一点时间阅读谷歌ADK的官方文档，然后开始动手。整个过程比我预想的要快，它自动创建了虚拟环境，安装了项目依赖，生成了重构后的代码。

跑起来测试了一下，输入"规划三天的尼泊尔旅行计划"，输出结果分三部分：旅行规划、当地特色活动、还有当地常用语。这个执行逻辑跟原来微软框架版本的智能体基本一致，说明重构是成功的。

值得一提的是，同样这道题我之前在Codex里用GPT5.2测试过，没跑通。Opus 4.5在这个任务上的表现确实更好一些。

**第二个案例：从零开发宠物领养平台**

第二个测试更复杂一点，让AI从零开发一个宠物领养平台的MVP。

这次我用了Antigravity的planning模式。先让Claude Sonnet 4.5制定开发计划，等计划确定之后，再切换到Claude Opus 4.5执行。这种组合用法挺聪明的，规划阶段用便宜一点的模型，执行阶段再上主力。

整个开发过程大概花了十分钟左右。AI先初始化了Next.js项目，然后创建数据库schema，接着一步步实现各个功能模块。

最终跑起来的效果还是让我挺惊喜的。首页设计得挺现代的，有导航栏、领养步骤说明、宠物展示区。登录功能支持邮箱注册、谷歌登录和GitHub登录。用户可以发布宠物领养信息，上传照片，填写品种、年龄、性格这些详细信息。

中间遇到了一个小bug，上传的宠物图片没有正确显示。我把浏览器里的元素内容复制给AI，它很快定位到是Supabase存储权限的问题，一次就修好了。

整体来说，这个MVP的完成度比我用GPT5.2做的那版要高不少。UI更精致，功能也更完整。

---

## 额度够用吗？

用AI编程工具，大家最关心的问题之一就是额度。毕竟写代码是个消耗token的大户，动不动就要处理几百上千行代码。

我用的是Antigravity的Pro账户。在完成上面两个案例之后——一个是框架重构，一个是完整的全栈项目开发——我又新开了一个窗口测试Claude Opus 4.5还能不能用。

结果是完全正常，没有任何限制提示。

这个结果让我还挺意外的。要知道那个宠物领养平台生成了相当多的代码，README文件、数据库迁移脚本、前端组件、API接口，加起来代码量不小。但Opus 4.5的额度似乎还很充裕。

当然，我没有做极限压力测试，不知道连续高强度使用一整天会不会触发限制。但至少从目前的使用体验来看，Pro账户的额度应付日常开发是够用的。

---

## 一些使用建议

用了一段时间之后，总结几点使用建议：

对于简单任务，比如改个bug、写个小功能，可以直接用fast模式，选择Gemini 3 Pro这种轻量级模型就够了，没必要每次都上Opus 4.5。

对于复杂项目，建议用planning模式，先让AI制定计划再执行。而且可以组合使用不同模型，规划阶段用Sonnet，执行阶段用Opus。

规则文件一定要好好写。花十分钟把技术栈、代码规范、项目结构这些东西写清楚，后面能省很多沟通成本。

MCP能装就装。特别是Supabase的MCP，让AI直接操作数据库这个功能真的很方便，省去了很多手动配置的麻烦。

---

## 最后

Antigravity加上Claude Opus 4.5这个组合，确实可以在一定程度上替代Claude Code。对于那些被封号问题困扰的开发者来说，这是目前我找到的比较靠谱的替代方案。

当然，它也不是完美的。比如有些操作还是需要手动完成，比如设置环境变量之类的。但整体体验已经相当不错了，值得一试。

如果你也在找Claude Code的替代品，可以试试看。


### 🚀智能体转换

可以测试AI的**信息检索与文档理解能力、代码理解与分析能力、跨框架迁移/重构能力、API集成能力、多任务协调能力等。所以这个题目也是比较有代表性的。**

https://docs.mistral.ai/models/mistral-large-3-25-12

https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/examples/travel-planning.html

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

### 🚀MVVM->MV + @Observable模式

```python
请在保留现有功能的前提下，将我接下来提供的项目从MVVM架构重构为MV + @Observable模式模式，
目标平台为 iOS 17+，使用 Observation 框架。

```

### 🚀宠物领养平台

> ***这个项目可以综合测试 AI 的全栈开发能力**，包括：**技术栈整合**（Next.js + Tailwind + Supabase）、**系统架构设计**、**数据库建模**、**前端 UI 实现**、**认证与安全**、**复杂业务逻辑处理**、以及**代码质量把控**。*
> 

```python
# 项目：宠物领养平台

## 🎯 项目概述
开发一个现代化的宠物领养平台MVP，连接待领养宠物与潜在领养者，提供流畅的领养申请流程。

## 🛠️ 技术栈
- **前端框架**: Next.js 14+ (App Router)
- **样式方案**: Tailwind CSS 3.x
- **后端/数据库**: Supabase (PostgreSQL + Auth + Storage + Realtime)

## 📦 核心功能需求

### 用户系统
- 用户注册/登录（Google/GitHub OAuth）
- 用户角色：普通用户、宠物发布者、管理员
- 个人资料管理

### 宠物展示
- 宠物列表页（支持筛选：种类、年龄、性别、地区）
- 宠物详情页（照片轮播、详细信息、领养须知）
- 搜索功能

### 领养流程
- 在线提交领养申请表
- 申请状态追踪
- 申请审核系统（发布者端）

### 宠物发布
- 发布待领养宠物信息
- 上传宠物照片（多图）
- 管理已发布宠物

### 其他功能
- 收藏/关注宠物
- 消息通知系统
- 领养成功案例展示

## 🗄️ 数据库设计 (Supabase)

### 表结构
1. **users** - 用户扩展信息
2. **pets** - 宠物信息
3. **adoption_applications** - 领养申请
4. **favorites** - 收藏记录
5. **messages** - 站内消息

### Row Level Security (RLS)
- 确保用户只能访问授权数据
- 发布者只能管理自己的宠物
- 申请者只能查看自己的申请

## 🎨 UI/UX 要求
- 响应式设计（移动端优先）
- 现代简洁的视觉风格
- 使用温暖、友好的配色方案
- 流畅的动画过渡效果
- 暗色模式支持

```
