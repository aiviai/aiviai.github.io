---
layout: single  
title: "🚀Opus 4.5+Claude for Chrome彻底改写浏览器自动化！效果碾压ChatGPT Atlas，一个插件取代整个浏览器！让AI自动操作网页、填表格、生成图像，效率倍增！"  
sidebar:
  nav: "docs"
date: 2025-11-25 10:00:00 +0800  
categories: AIAgents
tags: [Claude, Opus 4.5, Anthropic, Claude for Chrome, ChatGPT Atlas, AI浏览器, AI, 浏览器自动化, AIGC, AGI]
classes: wide  

author_profile: true  
---

Anthropic在11月25日正式发布了Claude Opus 4.5模型，同时推出了Claude for Chrome浏览器扩展插件。这款插件此前处于小范围测试阶段，现已向所有Max用户开放。与OpenAI选择开发独立的Atlas浏览器不同，Anthropic走了另一条路——直接为现有的Chrome浏览器提供扩展插件。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1HHULBPEVr/)
- [👉👉👉 通过YouTube观看](https://youtu.be/i1WotgP_VSI)
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


这篇文章将结合官方信息和实际测试，聊聊这款插件的真实表现。

## 先说说Opus 4.5这款模型

根据Anthropic官方公布的信息，Opus 4.5拥有200K的上下文窗口，在执行相同任务时比此前的模型节省约76%的Token消耗。定价方面，输入为每百万Token 5美元，输出为每百万Token 25美元，相比上一代Opus 4.1的15美元和75美元有了明显下降。

在编码能力的评测中，Opus 4.5在SWE-bench Verified基准测试上达到了80.9%的准确率，这是目前首个突破80%的模型。作为对比，OpenAI的GPT-5.1-Codex-Max为77.9%，Google的Gemini 3 Pro为76.2%。

知识库截止日期是2025年5月底，这在目前的主流模型中算是比较新的。

## Chrome插件长什么样

安装完成后，点击Chrome工具栏的图标就能唤出侧边栏。界面设计比较简洁，顶部可以切换模型（支持Opus 4.5、Sonnet 4.5和Haiku 4.5），中间是对话区域，底部是输入框。

输入框旁边有两个选项：一个是执行任务前先询问用户确认，另一个是全自动执行。如果选择全自动模式，Claude会在不打扰你的情况下完成整个操作流程。

此外，插件还支持截图和上传图像功能，方便处理视觉相关的任务。

## 实际测试：基础功能

**网页总结**：在Anthropic官方的Opus 4.5介绍页面测试总结功能，插件能够快速提取文章的核心亮点，包括定价、性能提升、技术评估等方面的信息，整体表现比较准确。

**图像识别**：让插件解读网页上的一张性能对比柱状图，它准确识别出了图表类型、各个模型的排名数据，并给出了简要分析。这说明插件能够直接获取并理解当前网页上的图像内容。

**选中文本翻译**：用鼠标选中一段英文内容后，让插件翻译成中文。它通过截图的方式捕获了选中的内容，并完成了翻译。这个功能在日常浏览英文网站时会比较实用。

## 实际测试：浏览器自动化

这部分是Claude for Chrome的核心卖点。

**自动发帖**：测试让插件改写一篇文章并发布到X平台。它首先生成了改写后的内容并询问是否发布，确认后自动打开X，定位到输入框，输入内容和标签，最后自动点击发布按钮完成整个流程。整个过程比较流畅，操作速度也还可以。

**跨平台AI对话**：这是个比较有意思的测试——让Claude通过插件操控浏览器，与ChatGPT进行多轮对话。测试中设定的话题是关于载人飞往半人马座阿尔法星的可能性。插件成功打开ChatGPT，输入问题，等待回答后继续追问，前后进行了三轮对话，最后还给出了讨论总结。某种程度上，这模拟了一个多Agent协作的场景。

**自动下棋**：在国际象棋网站上测试全自动对弈。插件能够正确识别棋盘，选择棋子并移动到合适的位置。从测试效果来看，棋子选择和移动的准确性都比较高。

**操作Google AI Studio**：让插件打开Google AI Studio，自主构思并开发一个小游戏。它输入了一个记忆配对卡片游戏的提示词，等AI Studio生成代码后还尝试进行交互测试。不过这个测试中遇到了问题——生成的游戏出现了内存泄露，导致电脑温度飙升，不得不中止。

**跨标签页数据抓取**：让插件搜索特斯拉股票信息，提取特定字段后填入Google表格。插件新开标签页进行搜索，进入Google Finance获取数据，然后切换到表格标签页完成填写。整个过程中它能够在多个Tab页之间协调操作。不过有个小问题，日期被错误地写成了2024年而非2025年。

**操作Gemini生图**：让插件打开Gemini，选择图像生成模型，输入提示词生成一张素描风格的猫咪图片，然后对生成结果进行评价。插件完成了整个流程，还主动点击图像进行放大查看，最后给出了详细的评分和分析。

## 一些观察

从测试来看，Claude for Chrome在浏览器自动化方面确实具备了相当的能力。它能够处理网页内容、操作表单、在多个标签页之间切换、与不同的网页应用交互。

相比需要单独安装的Atlas浏览器，Chrome插件的形式对用户来说更加便捷——不需要离开熟悉的浏览器环境，也不用重新适应新的操作习惯。

当然，测试中也暴露了一些问题：日期识别出错、操作AI Studio时遇到生成内容的bug等。这些情况提醒我们，目前的浏览器自动化技术还不能做到完全可靠，在涉及重要操作时仍然需要人工确认和监督。

总的来说，Claude for Chrome为日常的网页浏览和简单的自动化任务提供了一个不错的选择。至于它是否能完全取代其他方案，可能还需要更多场景的验证。

---

