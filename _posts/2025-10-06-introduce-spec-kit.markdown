---
layout: single
title: "🚀这才是AI编程的正确姿势：Spec Kit 实战！7条命令跑通规格驱动开发+强制 TDD，从需求到代码全自动！支持 Claude Code、Cursor、Codex"
sidebar:
  nav: "docs"
date: 2025-10-06 00:00:00 +0800
categories: LLMs
tags: [Claude Sonnet 4.5,Spec Kit5 , Spec-Driven, Claude Code 2.0, Vibe Coding, AI智能体, TDD, AGI, AIGC]
classes: wide
author_profile: true
---


---

做过项目的都懂：**代码永远跑在文档前面**，PRD 写得再漂亮，落到实现又是另一回事；改需求时，设计、代码、测试全要跟着手工同步，慢、易错、沟通成本高。Spec Kit 提出的 **SDD（Spec-Driven Development，规格驱动开发）**，就是把这套逻辑彻底反过来：**让“规格=一等公民”，代码只是规格的表达**。他们在文档里把这种“权力反转”讲得很直白：过去是“代码为王”，现在是“代码服务规格”，规格足够精确时，它可以直接生成计划与实现，减少意图与落地之间的鸿沟。维护软件的主战场也随之上移：**迭代规格**，而不是到处打补丁改实现。

这不仅是方法论，更是一套可落地的工具链：**Spec Kit + Specify CLI + 模板/脚本**。你不用“玄学提示词”，而是用一套固定的 **/constitution → /specify → /clarify → /plan → /tasks → /analyze → /implement** 的流水线，把需求→计划→任务→实现→校验串起来，尽量自动化、结构化地完成（README 的“Get started”就按这节奏展开）。

---


## Spec Kit 到底解决了什么“老大难”？

### 1）**减少“意图走样”**

传统流程里，“需求→设计→实现”每一环都可能“走样”。SDD 的思路是：让规格**可执行**，由规格派生实现计划和测试，代码只是“最后一公里”。遇到偏差，**先改规格和计划**，再让实现“再生一次”去对齐。

### 2）**把“文档变废”为“文档生码”**

他们把“规格生实现”的节拍拆得很细：

- `/specify` 把一句话想法生成结构化规格；
- `/plan` 把规格翻译成技术架构与设计文档；
- `/tasks` 自动把设计切成可并行执行的任务清单（会标记 `[P]` 并行）；
- 最后 `/implement` 按任务和 TDD 节奏去落地。
    
    官方甚至用“即时通讯功能”为例，类比传统要花 ~12 小时的文书工作，通过三条命令在 ~15 分钟内把规格、计划、数据模型、合约、测试场景和任务都生成齐全（当然后续还要补充/验证，但开局就很稳）。
    

### 3）**降低“过度设计”的惯性**

Spec Kit 不是“放飞自我”的生成，而是用铁律**（Constitution）+ 模板 Gate** 给 LLM“上护栏”。比如**简单性 Gate、反抽象 Gate、集成优先 Gate**，明确限制项目数、反对无谓封装、强调先做真实环境的契约测试等，从模板层面就把“工程洁癖”遏住。这些“原则”是**不可协商**的底线，带来**跨时间、跨模型的一致性**。

---

## 它有哪些“好用”的特性？

### ✅ **一套固定命令，拉齐整个链路**

从确立团队原则（`/constitution`），到“说清楚要做什么”（`/specify`），到“把不清楚的先问清”（`/clarify`），再到“定技术方案”（`/plan`）、“自动拆任务”（`/tasks`）、“一致性分析”（`/analyze`）、“落地实现”（`/implement`）——这条流水线在 README 的“Get started”与 Quick Start 里都有演示，CLI 安装方式也给到了 `uv tool` 或 `uvx` 两种选择。

### ✅ **跨 Agent 工作：Claude/Cursor/Copilot/Qwen…**

Spec Kit 支持多种 AI Coding Agent（并且针对不同 Agent 生成对应的命令文件/目录结构），这意味着你可以在熟悉的工具里跑同一流程，且保持结构一致（AGENTS.md 列了支持矩阵与目录约定）。README 里也列了“Supported AI Agents”表格，顺带标注了个别工具的限制（例如部分 CLI 对自定义参数支持有限）。

### ✅ **模板即“软规范”：让 LLM 写得更像工程师**

规格模板会**强制标记不确定项** `[NEEDS CLARIFICATION]`，不允许它“合理想象”；同时明确“规格写**WHAT/WHY**，禁止 HOW（技术细节）”，逼着模型维持正确抽象层级。计划模板再用一堆 Gate 把工程复杂度“防抖”一次，这些做法在文档中被总结为“模板驱动质量”。

### ✅ **把 TDD 写进流程**

任务模板把顺序写死：**先写契约/集成测试并确认失败**，再写实现（“红-绿-重构”节奏内化到命令/模板）——这是 Spec Kit 的“工程底线”，而且与“集成优先”的原则一致，鼓励使用**真实依赖**而非一味打桩。

### ✅ **“Clarify/Analyze”把风险暴露在编码前**

Changelog 里能看到近期新增了 `/clarify`（自动追问关键不确定性并入档）与 `/analyze`（跨规格/计划/任务/铁律的差异报告）这两步，把“返工”前置为“提问与体检”，而不是写完再返修。

---

## 跟“普通的让 AI 直接生成代码”相比，优势在哪？

**一句话：少拍脑袋，多有证据。**

- **链路可追踪**：每个技术选择都能追溯到规格里的具体需求，规格/计划/研究/合约是**活文档**，与代码同分支、同演进。
- **团队协作友好**：规格是团队共识对象，而不是提示词的“黑箱艺术”；“Clarifications”有迹可循，方便评审与补齐（Quick Start 和 README 的示例把 Clarify 的玩法写得很细）。
- **抗噪声**：模板把 LLM 容易“过拟合到实现细节”的毛病卡住了（例如明确“禁止 HOW”），降低误差传播。
- **可落地**：不是 PPT 流程。官方示例从命令到目录结构再到脚本都给全了，实践门槛很低（初始化项目、选择 Agent、看到命令就能跑起来）。

---

## 真实开发会是什么体验？

想象一下这样的节奏：

1. **订“**铁律**”**：先用 `/constitution` 写定团队的工程原则（例如“简单优先、反抽象、集成优先、测试先行”），这会成为之后每个计划文档的**检查 Gate**（不通过就打回）。
2. **说清楚做什么**：用 `/specify` 把用户价值、场景、边界写清——**不写技术**，只写 WHAT/WHY（模板会校验）。
3. **把不清楚的问清楚**： `/clarify` 会生成结构化问题清单并把回答入档，减少后期“猜”。
4. **定技术方案**：用 `/plan` 把栈、结构、合约、数据模型、Quickstart 测试场景都生成出来，并通过 Gate 校验一次复杂度与原则一致性。
5. **自动拆任务**：`/tasks` 读取 plan 与 contracts/data-model，生成带并行标记的任务清单（先测后码）。
6. **一致性检查**：`/analyze` 在实现前再跑一遍“对账单”，发现冲突先改文档不是先改码。
7. **开始实现**：`/implement` 严格按任务、按 TDD 顺序推进，过程中也会持续回写状态文档，便于复盘与协作（Quick Start/README 展示了端到端流程）。

---

## 上手成本与环境要求

好消息是：**上手很轻**。你只需要：

- 一台 macOS / Linux /（或 Windows + PowerShell）环境；
- Python 3.11+、Git、以及用于协作的一个 AI Coding Agent（Claude Code / Copilot / Gemini CLI 等皆可）；
- 使用 `uv tool` 或 `uvx` 一行命令初始化即可（可强制选择脚本类型 sh/ps；也支持“当前目录初始化”与忽略工具检查）。

如果你已经有偏爱的 Agent，不用换工作方式——Spec Kit 也考虑了跨 Agent 的目录/命令适配（AGENTS.md 详细写了各自约定与工具检测）。

---

## 适合谁？

- **中小团队/个人开发者**：需要快速起盘、又不想牺牲工程质量。
- **大中型组织/平台团队**：希望在多项目、多技术栈下保持统一工程治理与“可再生”的实现方式（Spec Kit 的目标之一就是**技术独立性**与**企业级约束**场景验证）。
- **内容/效率爱好者**：你要做 Demo、做对比评测或想尝试“并行解法”，这套“生成多个实现以做决策”的思路也被官方当成实验目标之一。

---

## 我个人的使用建议

1. **把“**铁律**”当第一生产力**：先定好工程底线，再谈技术栈，真的能少走弯路（Gate 会帮你挡很多“未来可期式”的复杂度）。
2. **习惯先 Clarify，再 Plan**：这一步是把“返工”变“补题面”的关键，尤其多人协作时更必要。
3. **把“研究（research.md）”当可执行备忘录**：遇到版本/依赖不确定，就让 Agent 生成研究任务逐条攻克，别放任“模糊栈”进实现。
4. **严格按 TDD 顺序**：契约和集成测试先红再绿，这是 Spec Kit 最硬的护栏之一。
5. **实现前跑一遍 /analyze**：让系统帮你找“规格/计划/任务/铁律”的矛盾，宁可前置 10 分钟，也别后置 3 天。

---

## 一分钟开始你的第一个项目

```bash
# 方式一：一次安装，处处可用（推荐）
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init my-first-spec-kit
specify check
# 方式二：临时使用
uvx --from git+https://github.com/github/spec-kit.git specify init my-first-spec-kit

```

初始化后，进到你的 Agent 里，先跑一发 `/constitution`，再 `/specify`、`/clarify`、`/plan`、`/tasks`、`/analyze`、`/implement`，就能完整体验从“意图→实现”的全链路（官方 Quick Start 也提供了示例命令与输入模版）。

---

## 结语

Spec Kit 的价值不在于“它能不能一键出代码”，而在于它把**团队的“意图”变成有约束、有证据链、可再生的资产**。当规格成为“唯一真相”，当测试把“真相”守住，代码就不再是“手工翻译”，而是可再生成的“表达”。如果你也在找一种**高质高效、又不放弃工程纪律**的 AI 开发方式，Spec Kit 非常值得一试。

---

### 安装 `uv` 的方法

你可以选择下面最适合你的一种方法进行安装。

### **方法一：官方推荐脚本 (macOS, Linux, Windows)**

这是最直接和推荐的安装方式。

- 对于 macOS 和 Linux：Bash
    
    打开你的终端，运行以下命令：
    
    # 
    
    `curl -LsSf https://astral.sh/uv/install.sh | sh`
    
- 对于 Windows：PowerShell
    
    打开 PowerShell，运行以下命令：
    
    # 
    
    `irm https://astral.sh/uv/install.ps1 | iex`
    

---

### **方法二：使用 `pip`**

如果你已经安装了 Python 和 `pip`，可以直接使用 `pip` 来安装 `uv`。

Bash

# 

`pip install uv`

为了获得最佳性能，建议使用 Python 3.8 或更高版本。

---

### **方法三：使用包管理器**

如果你习惯使用系统或语言的包管理器，也可以用它们来安装。

- **Homebrew** (macOS/Linux):Bash
    
    # 
    
    `brew install uv`
    
- **Scoop** (Windows):Bash
    
    # 
    
    `scoop install uv`
    
- **Cargo** (如果你安装了 Rust 工具链):Bash
    
    # 
    
    `cargo install uv`
    

---

### 验证安装

安装完成后，你可以通过运行以下命令来验证 `uv` 是否成功安装并查看其版本：

Bash

# 

`uv --version`

如果能看到版本号输出，就说明安装成功了！✅

---

### ## 执行你的命令

在你成功安装 `uv` 之后，你就可以直接运行你提到的命令了：

Bash

# 

`uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`

这个命令的作用是：

- **`uv tool install`**: 类似于 `pipx install`，它会将 `specify-cli` 这个工具安装到一个独立的虚拟环境中，避免污染你的全局 Python 环境，同时将其可执行文件路径添加到系统的 `PATH` 中，让你可以在任何地方直接调用它。
- **`-from git+...`**: 指定从一个 Git 仓库来安装这个包。

总的来说，你先用上述任意一种方法把 **`uv` 本身**安装好，然后就可以使用 `uv` 来安装其他 Python 工具了。

### 初始化（官方推荐方式）：

```markdown
# 持久安装
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 初始化项目
specify init forest-focus --ai claude

# 验证环境
specify check

# 进入项目
cd forest-focus
```

### **开发流程：**

```markdown
# 1. 铁律
/constitution Keep the iOS Forest-style focus app radically simple and offline-first.
Enforce test-first development, 60fps animations, <2s cold start, and VoiceOver/Dynamic Type support.

# 2. 规范
/specify Build a Forest-style Pomodoro app for iOS: start a 25-minute session to "plant"
a tree that grows through 5 stages; cancel/quit kills the tree; completion saves it to a
personal forest. Show countdown, pause/resume, local notification, and background-accurate timing.
Store completed/abandoned sessions locally; show a forest grid and stats (total trees, total focus
time, today's count, daily streak). Out of scope: custom durations, species, sync, sharing, watch, widgets.

# 3. 澄清
/clarify

# 4. 计划
/plan Use SwiftUI + SwiftData on iOS 17+. Timer via Combine; local notifications via
UNUserNotificationCenter; smooth 60fps growth animations; no third-party deps.
Use XCTest/XCUITest; keep memory ~<50MB during active sessions.

# 5. 任务
/tasks

# 6. 分析
/analyze

# 7. 实现
/implement
```