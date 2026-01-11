---
layout: single
title: "🚀Claude Code最强外挂？Superpowers保姆级教程！从头脑风暴→写计划→执行计划！让AI编程助手秒变专业开发团队，自动遵循TDD测试驱动开发，一次通过零报错！真正实现代码质量质的飞跃"
sidebar:
  nav: "docs"
date: 2026-01-11 00:00:00 +0800
categories: LLMs
tags: [Superpowers, OpenCode, Claude Code, Codex, Plugins, Oh My OpenCode, Vibe Coding, AI智能体, TDD, AGI, AIGC]
classes: wide
author_profile: true
---



**Superpowers** 是一个为 AI 编程代理（如 Claude Code、Codex、OpenCode）打造的完整软件开发工作流系统。它的核心理念是：通过一套可组合的"技能"（Skills）和初始指令，让 AI 代理在编写代码时自动遵循最佳实践，而不是像"没有经验的初级工程师"那样随意行事。

项目由 Jesse Vincent（GitHub: obra）开发，目前已获得 16.1k 星标和 1.3k 分叉，社区活跃度很高。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV11urFBrEc4/)
- [👉👉👉 通过YouTube观看](https://youtu.be/TMmq9Wx1AIQ)
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


---

### 二、核心设计哲学

项目建立在四个核心原则之上：

**测试驱动开发（TDD）**：永远先写测试。没有看到测试失败，就不能确定测试是否真正测试了正确的行为。

**系统化而非临时化**：用流程替代猜测。每个技能都有明确的决策流程图（用 DOT/GraphViz 语法定义），作为"可执行规范"。

**复杂度削减**：以简洁为首要目标。技能中反复强调 YAGNI（You Aren't Gonna Need It）原则，积极删除不必要的功能。

**证据而非声明**：在宣布任务完成之前，必须验证。看到测试通过，看到代码运行，而不是"我觉得应该可以了"。

---

### 三、完整工作流程

Superpowers 构建了一个端到端的开发流程：

**第一阶段：头脑风暴（brainstorming）**
当你说"我想做一个 X 功能"时，AI 不会直接写代码。它会像苏格拉底式对话一样，一次问一个问题，帮你厘清真正的需求。设计方案分 200-300 字的小节呈现，每节都要你确认"看起来对吗"。

**第二阶段：工作区隔离（using-git-worktrees）**
设计确认后，AI 会创建一个新的 git 分支和 worktree，确保开发环境隔离，不污染主分支。

**第三阶段：编写计划（writing-plans）**
把设计拆解成 2-5 分钟的小任务。每个任务都有精确的文件路径、完整的代码片段、验证步骤。目标是让"一个没有判断力、没有项目背景、讨厌写测试的热情初级工程师"也能执行。

**第四阶段：子代理驱动开发（subagent-driven-development）**
这是 v4.0 的重大创新。主代理为每个任务派遣一个"新鲜"的子代理（没有上下文污染），实现任务后进行两阶段审查：

- 规格符合性审查：代码是否完全符合需求规格？是否多做了？少做了？
- 代码质量审查：只有规格审查通过后才进行。检查代码是否干净、测试覆盖是否足够

审查是循环的：发现问题→修复→再审查，直到通过。

**第五阶段：收尾（finishing-a-development-branch）**
所有任务完成后，验证测试、呈现选项（合并/创建 PR/保留/丢弃），清理 worktree。

---

### 四、技能库详解

项目包含 14 个核心技能，分为几大类别：

**测试类**

- `test-driven-development`：强制执行 RED-GREEN-REFACTOR 循环。核心规则是"先写测试失败的代码？删掉，重新来"，包含详细的反模式参考

**调试类**

- `systematic-debugging`：四阶段根因定位流程，整合了 root-cause-tracing（逆向追踪调用栈）、defense-in-depth（多层验证）、condition-based-waiting（基于条件的等待替代任意超时）等技术
- `verification-before-completion`：确保问题真正被修复

**协作类**

- `brainstorming`：苏格拉底式设计提炼
- `writing-plans`：详细实现计划
- `executing-plans`：批量执行与检查点
- `dispatching-parallel-agents`：并发子代理工作流
- `requesting-code-review` / `receiving-code-review`：代码审查的请求与响应
- `using-git-worktrees`：并行开发分支
- `finishing-a-development-branch`：合并/PR 决策工作流
- `subagent-driven-development`：两阶段审查的快速迭代

**元技能**

- `using-superpowers`：技能系统入门
- `writing-skills`：如何创建新技能（包含测试方法论）

---

### 五、技术架构亮点

**流程图作为可执行规范**：技能文件使用 DOT 语法定义决策流程图，这不是装饰性的，而是 AI 必须遵循的权威定义。这解决了"描述覆盖流程图"的陷阱。

**描述陷阱的发现与解决**：项目团队发现，如果技能描述中包含工作流摘要，AI 会跟随简短描述而忽略详细流程图。解决方案是描述只写触发条件（"Use when X"），不写流程细节。

**反合理化设计**：`using-superpowers` 技能中专门列出了 AI 常见的逃避借口及其反驳，例如"我已经手动测试过了"→错误，临时测试不等于系统化测试。

**测试基础设施**：项目包含三套测试框架：

- 技能触发测试：验证技能能否从"朴素"提示触发
- Claude Code 集成测试：使用 `claude -p` 进行无头测试
- 子代理工作流端到端测试：包含完整的 Go 和 Svelte 测试项目

---

### 六、跨平台支持

**Claude Code**：通过插件市场安装，有原生的 Skill 工具支持

**Codex/OpenCode**：通过获取远程指令文件引导安装，共享核心模块 `lib/skills-core.js`

---

### 七、版本演进亮点

**v4.0.0** 的核心创新是两阶段代码审查和调试技术整合。v3.0 迁移到 Anthropic 官方技能系统。v2.0 实现技能仓库分离，支持社区贡献。

---

### 八、总结

Superpowers 本质上是在回答一个问题：**如何让 AI 代理像有经验的工程师一样工作，而不是像"会写代码但不懂工程"的实习生？**

答案是：把最佳实践编码成可执行的、不可逃避的工作流。用流程图定义决策点，用测试验证行为，用子代理实现关注点分离，用两阶段审查确保质量。

这个项目对于想要提升 AI 编程效率和质量的开发者来说，是一个非常值得学习和使用的工具。

### 🚀Claude Code使用方式

**✅第一步：安装 Superpowers**

打开 Claude Code，输入两条命令：

```markdown
/plugin marketplace add obra/superpowers-marketplace
```

**验证安装成功**

输入 `/help`，你应该能看到：

- `/superpowers:brainstorm` - 头脑风暴
- `/superpowers:write-plan` - 写计划
- `/superpowers:execute-plan` - 执行计划

**✅第二步：启动头脑风暴**

你有一个想法，但可能还很模糊。头脑风暴阶段就是让 AI 像产品经理一样问你问题，帮你把想法变成清晰的设计。

假设你想做一个"待办事项应用"。你只需要说：“我想做一个待办事项应用”。

**注意**：你不需要输入任何特殊命令！Superpowers 会自动触发。当 AI 看到你想"做"或"建"什么东西时，它会自动进入头脑风暴模式。

**AI 会怎么做？**

1. **先侦察**：AI 会先看看你的项目目录，了解现有代码结构
2. **一次问一个问题**：不会一下子问你10个问题
3. **给你选项**：尽量给你 A/B/C 选择，而不是让你从零想

**设计文档输出**

问完所有关键问题后，AI 会：

1. 把设计分成 200-300 字的小节展示给你
2. 每节都问你："这部分对吗？"
3. 全部确认后，写入 `docs/plans/2025-01-10-todo-app-design.md`

**✅第三步：创建隔离工作区**

**这是什么？**

想象你在装修房子。你不会直接在客厅里试验新油漆颜色——你会先找一小块墙试试。Git Worktree 就是那块"试验墙"。

**发生了什么？**

AI 设计完成后会问你：

`AI: 设计确认完毕。准备好开始实现了吗？
你: 是的`

然后 AI 会自动：

1. **创建新分支**：比如 `feature/todo-app`
2. **创建 worktree**：一个独立的工作目录，和主代码完全隔离
3. **运行项目初始化**：确保环境能跑起来
4. **验证测试基线**：确保现有测试都是绿色的

**为什么这么做？**

- 你的主分支（main）保持干净
- 如果实验失败，直接删掉这个 worktree，不影响任何东西
- 可以同时开多个功能分支，互不干扰

**✅第四步：编写实现计划**

**这是什么？**

你不能对一个实习生说"做一个待办事项应用"。你得说：

- 第一步：创建 `Todo` 数据结构
- 第二步：实现"添加"功能
- 第三步：实现"删除"功能
- ...

每一步都要小到 2-5 分钟能完成。

**每个步骤详解**

**RED（红色）**：写一个会失败的测试

运行测试：`npm test` → 失败（因为 `addTodo` 还不存在）

**这步的关键**：你必须亲眼看到测试失败！如果测试一开始就通过，说明：

- 你测试的是已有功能（没意义）
- 测试写错了（危险）

**GREEN（绿色）**：写最少的代码让测试通过

### 🚀Codex 安装与使用

1. **快速安装（推荐）**

直接告诉 Codex：

```markdown
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.codex/INSTALL.md
```

Codex 会自动完成所有安装步骤。

1. **手动安装**

**前置要求**

- OpenAI Codex CLI 已安装
- Node.js v14+（推荐 v18+ 以获得更好的 ES 模块支持）
- Git 已安装
- Shell 访问权限

**安装步骤**

**第一步：克隆 Superpowers 仓库**

```markdown
mkdir -p ~/.codex/superpowers
cd ~/.codex/superpowers
git clone https://github.com/obra/superpowers.git .
```

**第二步：创建个人技能目录**

```markdown
mkdir -p ~/.codex/skills
```

**第三步：配置 AGENTS.md**
编辑 `~/.codex/AGENTS.md`，添加以下内容：

```markdown
## Superpowers System

<EXTREMELY_IMPORTANT>
You have superpowers. Superpowers teach you new skills and capabilities.

RIGHT NOW run: `~/.codex/superpowers/.codex/superpowers-codex bootstrap` 
and follow the instructions it returns.
</EXTREMELY_IMPORTANT>
```

**第四步：验证安装**

```markdown
~/.codex/superpowers/.codex/superpowers-codex bootstrap
```

如果看到技能列表和引导指令，说明安装成功。

**使用方法**

查找可用技能

```markdown
~/.codex/superpowers/.codex/superpowers-codex find-skills
```

或者告诉 Codex：
```
Run ~/.codex/superpowers/.codex/superpowers-codex find-skills to show available skills
```

**加载特定技能**

```markdown
~/.codex/superpowers/.codex/superpowers-codex use-skill superpowers:brainstorming
```

**加载完整引导**

```markdown
~/.codex/superpowers/.codex/superpowers-codex bootstrap
```

### 🚀**OpenCode 安装与使用完整脚本
一键安装脚本**

```markdown
#!/bin/bash
# Superpowers for OpenCode - 完整安装脚本

echo "=== 安装 Superpowers for OpenCode ==="

# 第一步：克隆 Superpowers 仓库
echo "[1/4] 克隆 Superpowers 仓库..."
mkdir -p ~/.config/opencode/superpowers
git clone https://github.com/obra/superpowers.git ~/.config/opencode/superpowers

# 第二步：创建插件目录并注册插件
echo "[2/4] 注册插件..."
mkdir -p ~/.config/opencode/plugin
ln -sf ~/.config/opencode/superpowers/.opencode/plugin/superpowers.js \\
       ~/.config/opencode/plugin/superpowers.js

# 第三步：创建个人技能目录
echo "[3/4] 创建个人技能目录..."
mkdir -p ~/.config/opencode/skills

# 第四步：验证安装
echo "[4/4] 验证安装..."
if [ -f ~/.config/opencode/plugin/superpowers.js ]; then
    echo "✅ 插件链接创建成功"
else
    echo "❌ 插件链接创建失败"
    exit 1
fi

if [ -d ~/.config/opencode/superpowers/skills ]; then
    echo "✅ 技能目录存在"
    echo "   可用技能数量: $(ls ~/.config/opencode/superpowers/skills | wc -l)"
else
    echo "❌ 技能目录不存在"
    exit 1
fi

echo ""
echo "=== 安装完成！==="
echo ""
echo "下一步操作："
echo "1. 重启 OpenCode"
echo "2. 在对话中输入: do you have superpowers?"
echo "3. 使用 find_skills 工具查看可用技能"
echo "4. 使用 use_skill 工具加载技能"
echo ""
echo "示例命令："
echo "  use find_skills tool"
echo "  use use_skill tool with skill_name: \\"superpowers:brainstorming\\""
```
