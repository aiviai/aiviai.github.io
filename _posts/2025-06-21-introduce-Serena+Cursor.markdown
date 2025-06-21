---
layout: single
title: "🚀Cursor+Serena最佳组合告别AI编程工具短板！支持Claude Code、windsurf、Cline！让AI编程不再是简单读取代码而是智能分析依赖关系，让复杂开源项目二次开发效率提升十倍"
sidebar:
  nav: "docs"
date: 2025-06-21 00:00:00 +0800
categories: AIAgents
tags: [Cursor, Augment, Context7, AI智能体, AI编程, Vibe Coding, MCP Server, Vibe Coding, 开源项目]
classes: wide
author_profile: true
---

还在手动搜索代码定义？还在为跨文件重构愁白了头？还在对着AI聊天框一遍遍地复制粘贴代码片段？

你有没有想过，如果你的AI能像一位资深开发者一样，直接打开你的项目，**秒懂代码的上下文**，还能**自己找引用、写新功能、甚至跑测试**？

今天，就给大家介绍一个颠覆性的开源项目，它能将这个梦想变为现实！

它就是——**serena**！一个给大型语言模型（LLM）装上“IDE大脑”的超级工具包！

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1ngMhzxETY/)
- [👉👉👉 通过YouTube观看](https://youtu.be/DZ-gLebVnmg)
- [👉👉👉 Augment编程插件视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Cursor编程视频](https://youtu.be/6dhOUJ_vnIY)
- [👉👉👉 Claude Code编程视频](https://youtu.be/SK9JBDyHqiI)
- [👉👉👉 Kilo Code编程视频](https://youtu.be/sUCsitU7hmE)
- [👉👉👉 Magnetic UI视频](https://youtu.be/0ubHrQz9PN0)
- [👉👉👉 n8n相关视频](https://youtu.be/nb87POhO6aA)
- [👉👉👉 n8n相关视频](https://youtu.be/hE_CeOUY2h0)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  
6. [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  



👇👇👇

### 🤖 **什么是Serena？你的新晋AI编程搭档！**

简单来说，**Serena 是一个开源的编码代理工具包**。

把它想象成一个“超级插件”，可以无缝接入你正在使用的任何LLM（无论是高大上的GPT-4、Claude 3，还是本地部署的免费模型）。

接入后，你的AI就不再是一个只会聊天的“文本生成器”，而是**华丽变身**为一名功能齐全的**编码代理（Coding Agent）**，能直接在你的真实代码库上干活！

(这是一个示意图，你可以替换成更生动的图片)

它的核心魔法在于，它不像普通工具那样只能“看懂”文本，而是利用语言服务器协议（LSP），像你的IDE（比如VS Code）一样，**从“符号”层面真正理解代码的结构和关系**。

这意味着，它知道哪个函数调用了哪个函数，哪个变量在哪里被定义，代码的依赖关系是怎样的。这简直是降维打击！🤯

### 🚀 **酷！那它到底能帮我做什么？**

Serena的能力远超你的想象，它几乎可以包揽软件开发的全流程！

- **✨ 自主完成开发任务：** 从需求分析、设计方案，到动手写码、重构代码，再到最后的测试和Git提交，Serena可以让AI“一条龙”搞定！真正实现“你提需求，AI打工”。
- **🧠 "IDE"级代码导航：** 告别 `Ctrl+F`！想找一个函数的定义或所有引用？一句话的事儿！Serena能像闪电一样在大型复杂项目中精准定位，效率MAX！
- **✍️ 精准“手术刀式”代码编辑：** 它不是粗暴地替换整个文件，而是能进行“微操”，比如“在某某函数前插入一段逻辑”、“把这个类的实现体换掉”。修改代码，稳、准、狠！
- **🛠️ 全能工具箱：** 读写文件、执行代码、查看日志、运行终端命令……只有你想不到，没有它做不到。它为AI提供了与整个开发环境交互的全套能力。

### 🎮 **小白也能上手？怎么开始玩？**

必须的！Serena非常贴心地提供了两种主流的“食用”方式：

1. **💻 变身MCP服务器（推荐）：** 你可以在本地把Serena跑起来，作为一个“模型上下文协议”服务器。然后，在你最爱的开发工具里（比如 **VS Code、Cursor、IntelliJ** 等）通过一个简单的插件连接上它。这样，你就能在熟悉的IDE里，让AI直接调用Serena的超能力，完全免费！
2. **🤖 集成Agno框架：** 对于喜欢折腾的玩家，可以通过Serena提供的Agno代理框架。这个框架非常灵活，可以让你把市面上几乎所有的LLM都变成一个强大的编码代理。

**简单四步，即刻体验：**

1. **Clone项目**：从GitHub把`oraios/serena`代码拉到本地。
2. **配环境**：安装一下项目依赖。
3. **写配置**：复制一份配置文件模板，改成你的项目路径。
4. **启动！**：运行启动命令，开始享受~

具体的命令可以去它的GitHub仓库看哦，文档写得很清楚！

### 🌟 **高能进阶：解锁10倍程序员的秘密武器！**

如果你以为Serena就这点能耐，那可就小看它了！对于追求极致效率的“Power User”来说，Serena的这些高级用法，能让你直接起飞！

- **🧰 终极工具组合拳：** Serena提供了一大堆精细化的工具，比如`find_symbol` (找符号)、`get_document_overview` (看大纲)、`execute_shell_command` (执行命令)……你可以像指挥官一样，引导AI组合调用这些工具，去完成极其复杂的任务。
- **🧩 自定义你的专属AI代理：** Serena的工具和框架是解耦的。这意味着什么？你可以把它强大的工具集，集成到任何你自己的自动化流程或AI框架里，打造一个完全属于你的、独一无二的编码机器人！
- **🏗️ 大型项目重构利器：** 想象一下这个场景：你要把项目里所有废弃的旧API，全部换成新版API。手动改？累死！用Serena？写个脚本，让AI自己去**分析、查找、替换、测试**，你只需要泡杯咖啡，坐等结果。优雅，永不过时！

### **写在最后**

在AI浪潮席卷全球的今天，`oraios/serena`的出现，无疑为开发者们打开了一扇新的大门。

它不再满足于让AI成为一个“辅助”，而是致力于将其提升为真正的“合作伙伴”。通过赋予AI深度理解和操作代码的能力，它正在重新定义我们与软件开发的关系。

**心动不如行动！**

无论你是想让日常编码更轻松，还是想探索AI驱动软件开发的未来，Serena都绝对值得一试！

项目地址：

https://github.com/oraios/serena

### 🚀环境准备(uv包管理器安装命令)

```bash
 # Windows 安装方式
 # 使用PowerShell（管理员权限）
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS 安装方式
# 一键安装脚本
curl -LsSf https://astral.sh/uv/install.sh | sh

# 使用Homebrew包管理器
brew install uv
```

### 🚀Cursor配置方式

```bash
{
    "mcpServers": {
        "serena": {
            "command": "uvx",
            "args": ["--from", "git+https://github.com/oraios/serena", "serena-mcp-server"]
        }
    }
}
```

### 🚀Claude Code配置方式

```bash

# 使用正确的配置添加 Serena
claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant

# 启动 Claude Code 并检查 MCP 状态
claude

# 检查 MCP 状态
/mcp

```

### 🚀使用方式

```json

✅ 请激活项目：/Users/user/Desktop/magentic-ui

✅ 分析这个项目的执行流程

✅ 对项目进行深度技术分析

✅ 每次修改后请运行相关测试，确保没有破坏现有功能

✅ 请运行代码质量检查工具，检查有哪些需要改进的地方

✅ 如果为项目增加用户认证功能，需要修改哪些文件

✅ 帮我在这个React项目中添加一个新的组件

✅ 找出所有调用 process_data 函数的地方

✅ 帮我修复这个Python脚本的bug

✅ 重构这段代码使其更清晰

✅ 给我这个项目的整体结构概览

✅ 帮我找到处理用户认证的相关代码

✅ 请分析 src/main.py 文件的主要功能和结构

✅ 我需要在用户类中添加一个密码重置功能，请帮我实现

✅ 登录功能有bug，用户输入错误密码时没有正确的错误提示，请帮我修复

✅ 请帮我重构 utils.py 中的数据处理函数，让它更模块化

✅ 为新添加的密码重置功能编写单元测试

✅ 请运行项目的测试套件，看看有没有失败的测试

✅ 我想在我的Flask应用中添加一个API端点来获取用户统计信息

✅ 我的应用在处理大文件时会崩溃，请帮我找出原因

✅ 我的数据处理模块变得很复杂，请帮我重构
```

### 🚀高级使用技巧

🔥工作流管理

```json
# 开始一个复杂任务时
请为这个重构任务创建一个详细的计划，并保存为记忆

# 任务进行中
请检查一下我们是否还在正确的轨道上

# 准备切换对话时
请创建一个总结，包含当前进度和下一步计划，保存为记忆以便新对话继续
```

🔥项目记忆管理

```json
# 查看现有记忆
显示所有项目记忆

# 读取特定记忆
读取关于数据库设计的记忆

# 更新记忆
请更新API设计记忆，包含我们刚讨论的新端点

```

🔥多步骤任务

```json
我需要实现一个完整的用户管理系统，包括：
1. 用户注册和登录
2. 密码重置功能  
3. 用户资料管理
4. 权限控制
5. 相应的测试

请分步骤帮我实现，每完成一个功能就让我确认后再继续下一个
```

### 🚀最佳实践

1.  `请先检查git状态，确保没有未提交的更改`
2. `修改login_user函数，增加密码强度验证，要求至少8位包含数字和字母`
3. `请先分析现有代码，然后制定实现计划，最后再开始编码`
4. `每次修改后请运行相关测试，确保没有破坏现有功能`

### 🚀故障排除

🔥工具无法使用

```json
# 检查工具状态
请列出当前可用的工具

# 重启语言服务器
请重启语言服务器
```

🔥项目无法识别

```json
# 手动指定项目路径
请切换到项目目录：/path/to/your/project

# 重新执行入门分析
请重新执行项目入门分析
```

🔥编辑出现问题

```json
# 检查文件状态
请显示当前文件的git状态

# 恢复更改
如果出现问题，可以使用git恢复文件
```