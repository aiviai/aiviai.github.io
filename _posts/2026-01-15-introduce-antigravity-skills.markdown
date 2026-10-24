---
layout: single
title: "🚀2026年Skills元年正式开启！谷歌Antigravity支持Agent Skills，彻底改写传统AI编程！保姆级教程从安装到创建到调用！UI UX Pro Max Skills实测效果超预期"
sidebar:
  nav: "docs"
date: 2026-01-15 00:00:00 +0800
categories: AIAgents
permalink: /llms/introduce-antigravity-skills
tags:
  - Claude Opus 4.5
  - Antigravity IDE
  - Antigravity
  - Claude Code
  - Agent Skills
  - AI智能体
  - Vibe Coding
  - AGI
  - Skills
classes: wide
author_profile: true
---

## 一、什么是 Agent Skills？

Agent Skills 是一种由 Anthropic 最初开发并作为**开放标准**发布的智能体能力扩展格式。它的核心理念是：智能体虽然越来越强大，但往往缺乏完成实际工作所需的**领域上下文和程序化知识**。Skills 通过让智能体按需加载特定于公司、团队、用户的知识来解决这个问题。

从技术角度看，一个 Skill 就是一个包含 `SKILL.md` 文件的文件夹，内含元数据（名称、描述）和 Markdown 格式的指令，告诉智能体如何执行特定任务。Skills 还可以捆绑脚本、模板和参考材料。

> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1FQkwByEAY/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/KD2D59_XGd8)
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

---

## 二、如何在 Antigravity IDE 中使用 Skills

### 1. Skills 的存放位置

根据 Antigravity 官方文档，支持两种类型的 Skills：

| 位置 | 作用范围 | 适用场景 |
|------|----------|----------|
| `<workspace-root>/.agent/skills/<skill-folder>/` | 工作区级别 | 项目特定的工作流，如团队部署流程、测试规范 |
| `~/.gemini/antigravity/skills/<skill-folder>/` | 全局级别 | 跨项目的个人工具或通用工具 |

### 2. 创建一个 Skill

创建 Skill 的基本步骤：

```
.agent/skills/
└─── my-skill/
     └─── SKILL.md
```

每个 Skill 必须有一个带 YAML frontmatter 的 `SKILL.md` 文件：

```markdown
---
name: my-skill
description: Helps with a specific task. Use when you need to do X or Y.
---
# My Skill

Detailed instructions for the agent go here.

## When to use this skill
- Use this when...
- This is helpful for...

## How to use it
Step-by-step guidance, conventions, and patterns the agent should follow.
```

### 3. Frontmatter 字段规范

**注意**：Agent Skills 开放标准与 Antigravity 实现在 `name` 字段上存在差异：

| 字段 | Agent Skills 标准 | Antigravity 实现 | 说明 |
|------|------------------|------------------|------|
| `name` | **必需** | 可选 | 1-64字符，小写字母、数字和连字符。Antigravity 允许省略，默认使用文件夹名 |
| `description` | **必需** | **必需** | 描述技能功能和触发场景，最多1024字符 |
| `license` | 可选 | 可选 | 许可证信息 |
| `compatibility` | 可选 | 可选 | 环境要求说明，最多500字符 |
| `metadata` | 可选 | 可选 | 自定义键值对，用于存储额外属性 |
| `allowed-tools` | 可选（实验性） | 可选（实验性） | 预授权工具列表，各平台支持程度不同 |

**关于 description 的撰写建议**：
- 使用第三人称描述
- 包含帮助智能体识别任务的关键词
- 好的示例：`"Generates unit tests for Python code using pytest conventions."`
- 差的示例：`"Helps with tests."`

### 4. Skill 文件夹结构

虽然 `SKILL.md` 是唯一必需的文件，但可以包含额外资源：

```
.agent/skills/my-skill/
├─── SKILL.md          # 主指令文件（必需）
├─── scripts/          # 辅助脚本（可选）
├─── examples/         # 参考实现（可选）
└─── resources/        # 模板和其他资源（可选）
```

根据 Agent Skills 规范，推荐的目录结构是 `scripts/`、`references/`、`assets/`，但 Antigravity 文档中使用的是 `scripts/`、`examples/`、`resources/`，两者兼容。

### 5. 智能体如何使用 Skills —— 渐进式披露模式

Skills 采用**渐进式披露**（Progressive Disclosure）模式来高效管理上下文窗口：

| 阶段 | 动作 | 上下文消耗 |
|------|------|------------|
| 发现 | 对话开始时，智能体加载所有可用 Skills 的名称和描述 | 约 100 tokens |
| 激活 | 如果某个 Skill 与任务相关，智能体读取完整的 SKILL.md 内容 | 建议 < 5000 tokens |
| 执行 | 智能体按照指令执行，按需加载引用的文件或执行捆绑的代码 | 按需加载 |

**关于自动触发与显式调用**：

- 在 Antigravity 中，智能体会根据任务描述和 Skill 的 description 自动判断是否激活相关 Skill
- 如果你想确保使用某个 Skill，可以在对话中提及它的名称
- 部分其他平台（如 OpenAI Codex）也提供通过界面或命令显式选择 Skill 的方式

### 6. 最佳实践

| 原则 | 说明 |
|------|------|
| 保持专注 | 每个 Skill 只做一件事，避免"万能型" Skill |
| 清晰描述 | description 是智能体判断是否使用 Skill 的关键，要具体说明功能和适用场景 |
| 脚本作为黑盒 | 如果 Skill 包含脚本，建议智能体先用 --help 运行而非阅读全部源码 |
| 包含决策树 | 对于复杂 Skill，添加帮助智能体根据情况选择正确方法的章节 |
| 控制大小 | 主 SKILL.md 建议控制在 500 行以内，详细参考材料放入单独文件 |

### 7. 实战示例：代码审查 Skill

```markdown
---
name: code-review
description: Reviews code changes for bugs, style issues, and best practices. Use when reviewing PRs or checking code quality.
---
# Code Review Skill

When reviewing code, follow these steps:

## Review checklist
1. **Correctness**: Does the code do what it's supposed to?
2. **Edge cases**: Are error conditions handled?
3. **Style**: Does it follow project conventions?
4. **Performance**: Are there obvious inefficiencies?

## How to provide feedback
- Be specific about what needs to change
- Explain why, not just what
- Suggest alternatives when possible
```

---

## 三、Agent Skills 的生态采纳

Agent Skills 已被众多主流 AI 开发工具采纳，包括：

| 平台 | 说明 |
|------|------|
| GitHub Copilot | 包含 VS Code 指南 |
| OpenAI Codex | 支持显式选择 Skill |
| Cursor | IDE 集成支持 |
| VS Code | 通过扩展支持 |
| Claude Code | Anthropic 官方产品 |
| Gemini CLI | Google 命令行工具 |
| OpenCode、Amp、Goose、Factory、Letta | 各有文档提及兼容结构 |

这意味着：**一次编写，多处部署**。为一个平台创建的 Skill 可以在所有兼容平台上运行。

---

## 四、Antigravity IDE 支持 Agent Skills 的重大意义

### 1. 从"通用智能"到"专业能力"的跨越

传统 AI 助手依赖预训练知识，而 Skills 允许智能体**按需获取领域专业知识**：

- 法律审查流程、数据分析管道、财务审计规范等专业知识可以被封装为 Skill
- 智能体从"什么都知道一点"变成"需要时成为专家"

### 2. 知识的可管理性与可审计性

Skills 以文件形式存在，带来了传统提示词无法实现的优势：

- **版本控制**：可以用 Git 追踪知识的演变
- **可审计**：团队可以审查智能体遵循的具体指令
- **可复现**：相同的 Skill 产生一致的行为模式

### 3. 组织知识的标准化捕获

对于企业而言，Skills 提供了一种**将隐性知识转化为显性资产**的方式：

- 资深员工的经验可以编码为 Skills
- 新员工通过智能体即可访问组织最佳实践
- 知识不再随人员流动而流失

---

## 五、Agent Skills 的重大技术进步

### 1. 开放标准带来的互操作性

Agent Skills 格式由 Anthropic 开发并作为开放标准发布，被广泛采纳。这实现了：

- **一次编写，多处部署**：为一个平台创建的 Skill 可以跨平台使用
- **生态协作**：不同厂商的工具可以共享同一套 Skills
- **避免锁定**：用户投资的知识资产不会被绑定在单一平台

### 2. 上下文效率的革命性提升

渐进式披露模式是对上下文窗口的**智能管理**，解决了 AI 开发工具面临的核心挑战——如何在有限的上下文窗口中塞入足够的信息：

- 启动时只加载约 100 tokens 的元数据
- 激活时加载完整指令（建议 < 5000 tokens）
- 资源文件按需加载

### 3. 从"工具调用"到"能力扩展"的范式转换

与 MCP（Model Context Protocol）等工具协议相比，Skills 提供的是更高层次的抽象：

- **MCP** 告诉智能体"你可以执行这个操作"（提供工具）
- **Skills** 告诉智能体"在这种情况下，按照这个流程，使用这些工具"（提供使用工具的流程化知识）

两者是**互补而非替代**的关系：MCP 扩展智能体能做什么，Skills 指导智能体如何做。

### 4. 代理自主性的新水平

Skills 的设计让智能体能够**自主判断何时需要额外能力**：

- 无需用户显式指定使用哪个 Skill（但可以显式指定以提高确定性）
- 智能体根据任务描述自动匹配最相关的 Skill
- 实现了能力的动态发现与应用

---

## 六、总结

Antigravity IDE 对 Agent Skills 的支持标志着 AI 辅助开发从"对话式助手"向"可定制专业代理"的重要演进。

Skills 的核心价值在于三点：

1. **知识外置化**：将领域知识从模型权重中解耦，变成可编辑、可版本控制的文件
2. **上下文高效化**：通过渐进式披露，在有限窗口中最大化有效信息密度
3. **能力生态化**：通过开放标准，实现跨平台的知识共享与复用

这种架构的深远意义在于：它将 AI 的能力边界从模型本身的训练数据，扩展到了人类可以随时注入的任何领域知识。这是迈向真正"可编程智能"的关键一步。

---

**信息来源**：

- Antigravity 官方文档：`antigravity.google/docs/skills`
- Agent Skills 开放标准：`agentskills.io`

## 七、高级用法

### 基础

1. **专注单一任务 + 清晰触发描述**（最佳实践核心）：避免"万能技能"，每个技能只解决一类问题（如"代码审查"或"议事录清书"）。Description 写明"何时用"：例如 "当用户要求代码审查时，使用此技能检查安全规则和命名规范"。优势：Agent 自动判断加载，减少上下文污染。

2. **包含决策树 + 脚本自动化**（处理复杂场景）：在 SKILL.md 添加决策分支：如"如果代码涉及数据库，先检查 SQL 注入风险"。嵌入脚本（Python/Bash）：处理确定性任务（如数据验证、Git 操作）。示例：代码审查技能 → Agent 先运行 --help 检查脚本，再执行。用户称"这终于不用像原始人一样重复造轮子"。

3. **团队知识资产化 + 暗黙知固化**（企业级高级用法）：将"贝特兰经验"（调查技巧、发布流程）写成技能，Git 管理共享。全局技能：公司规范（如安全规则）放全局路径，所有 Agent 自动继承。非工程师场景：内容创作（自定义文体）、竞品研究（固定调查项）、日报/周报（社内模板）。

4. **与 Antigravity 原生功能组合**（发挥平台优势）：结合 Browser Subagent：技能中嵌入浏览器操作（如自动测试网页）。多 Agent 并行（Agent Manager）：一个技能管代码，一个管测试，Inbox 统一审批。Artifacts 验证：技能输出带截图/录屏，便于审核。

5. **跨工具迁移 + 开源技能市场**（生态高级玩法）：开放标准：技能可迁移到 Claude、Cursor、VS Code 等。开源资源：Anthropic 官方技能库、Skillsmp 市场。用户建议：AI 直接生成技能（如"按文档创建代码审查技能"）。

### 高级

1. **链式技能调用（Skill Chaining）**：在一个技能的 SKILL.md 末尾明确写出"下一步推荐技能"，Agent 会自动建议或直接调用后续技能。例如代码生成技能结束后自动触发"代码审查技能" + "单元测试技能"。用这种方式把一个复杂项目拆成 5-6 个技能链，整体完成时间缩短 60%，避免一次性提示过长。

2. **条件触发 + 动态参数注入**：在 description 中使用占位符（如 {% raw %}{language}{% endraw %}、{% raw %}{project_type}{% endraw %}），Agent 会根据上下文动态填充触发条件。技巧：结合 YAML 元数据写多条 description 变体。这让同一个技能能适配前端/后端/数据管道等多种场景，无需复制多份。

3. **嵌入外部工具调用脚本（Tool Use Integration）**：技能里直接写 Python 脚本调用 Google Cloud API、GitHub API 或第三方服务（如 SerpAPI 搜索）。Agent 会自动请求权限执行。经验：警告，必须在技能开头声明所需权限，否则 Agent 会拒绝执行；实战中用于自动化竞品监控，省去手动复制粘贴。

4. **技能版本管理 + Git 集成**：把整个 .agent/skills 目录放入 Git 仓库，用分支管理不同版本。技巧：SKILL.md 顶部加 version 字段，Agent 会提示"检测到新版本，是否升级？"。团队协作神器，避免"每个人技能不一致"导致输出偏差。

5. **多语言/多模态技能**：一个技能文件夹里同时放 SKILL.zh.md 和 SKILL.en.md，Agent 根据用户语言自动加载对应版本。进阶：加入图像/音频示例（Artifacts），用于视觉设计或语音转写场景。非英语用户福利巨大，用此打造"中文专属写作技能"，风格一致性极高。

6. **懒加载 + 分层设计（Progressive Loading）**：把技能拆成 core.md（始终加载，轻量描述）和 advanced/ 子文件夹（按需加载详细脚本）。技巧：核心部分只放触发条件和简要步骤，复杂逻辑放子文件。经验：有效防止上下文窗口爆炸，大型项目（>10k tokens）也能流畅运行。

7. **安全审计技能（Self-Audit Pattern）**：创建一个专用"安全审查"技能，所有其他技能输出前强制经过它检查（通过链式调用）。包含常见漏洞清单和自动化扫描脚本。在生产环境必备，曾发现多个潜在数据泄露风险，"宁可慢一点，也不要出事"。

8. **多 Agent 协作技能编排**：使用 Agent Manager 时，为每个子 Agent 分配专属技能集（不同全局子目录）。技巧：主 Agent 的技能里写"分配任务给 Tester Agent / Writer Agent"。并行处理复杂任务（如同时写代码 + 写文档 + 画图），效率翻倍，但需要精心设计 Inbox 审批流。

9. **自适应/自我优化技能（Meta-Skills）**：创建一个"技能优化师"技能：输入现有技能 + 项目反馈，Agent 自动生成改进版 SKILL.md。技巧：让 Agent 先分析过去 10 次对话日志，再重写 description。用了一周后，技能触发准确率从 70% 提升到 95%，堪称"技能的技能"。

10. **技能市场化与社区复用**：把优秀技能打包上传到 Skillsmp 或 GitHub 开源市场，加上详细 README 和演示视频。技巧：用标准化模板（name、tags、preview 示例），便于他人一键导入。一些用户已开始小范围变现（付费技能包），社区反馈"最好的技能往往来自真实项目痛点"。

### 总结

- **调试第一原则**：任何技能不理想时，先让 Agent "解释你为什么没触发这个技能"，然后针对性优化 description。
- **从简单开始**：新手别急着写复杂脚本，先用纯 Markdown 固化最佳实践，逐步加脚本。
- **性能监控**：开启 Antigravity 的日志模式，观察技能加载次数和 token 消耗，定期精简低频技能。
- **风险控制**：所有含脚本技能，先在沙箱项目测试 3-5 次，再推到生产。
- **未来趋势**：估计 2026 下半年会出"技能商店"官方支持，建议现在就开始积累个人技能库。

## 🚀 UI UX Pro Max 官方 CLI 工具一键安装

```bash
npm install -g uipro-cli
cd /path/to/your/project
uipro init --ai claude    # 或 cursor、windsurf、copilot、all 等
```

### ⚡️ Prompt 示例

```
/ui-ux-pro-max Build a React Native e-commerce app UI with product listings, cart, and checkout flow
```

```
/ui-ux-pro-max Build a complete Todo List app using SwiftUI with:

- Add new tasks with title and optional due date
- Mark tasks as complete/incomplete  
- Swipe to delete tasks
- Filter by: All, Active, Completed
- Persist data locally using SwiftData
- Dark mode support
- Clean minimalist aesthetic

Target: iOS 17+
```

```
/ui-ux-pro-max Design and build a productivity-focused Todo List app in SwiftUI:

Features:
- Task creation with title, notes, priority (low/medium/high), and due date
- Categories/tags for organizing tasks
- Mark complete with satisfying animation
- Swipe actions: delete, edit, move to category
- Today view showing due tasks
- Search and filter functionality
- Local notifications for due dates

Design:
- Modern iOS aesthetic
- Soft color palette for productivity
- Smooth micro-interactions
- Support both light and dark mode

Stack: SwiftUI + SwiftData for iOS 17+
```

```
/ui-ux-pro-max Build a SwiftUI Todo app with a Neumorphism design style. 
Include add task, complete task, and delete. Use soft shadows and subtle depth.
```
