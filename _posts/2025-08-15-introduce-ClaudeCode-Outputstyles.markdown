---
layout: single
title: "🚀突破性创新！Claude Code新增Output Styles功能彻底颠覆编程方式，实现Claude Code与Gemini CLI双AI协作，代码质量倍增！Learning模式支持编写代码边学习"
sidebar:
  nav: "docs"
date: 2025-08-15 00:00:00 +0800
categories: AIAgents
tags: [Claude Code, Claude, Output styles, Gemini CLI, Claude4, AI智能体, Vibe Coding, MCP Server, AIAgents, AGI]
classes: wide
author_profile: true
---

# 一、Output styles 是什么？

**Output styles** 允许你把 **Claude Code**「变身」为不同类型的智能体（Agent），但**保留其核心能力**：运行本地脚本、读写文件、跟踪 TODO 等。它通过**直接修改 Claude Code 的系统提示词（system prompt）**来改变行为与交流方式；非默认风格会去掉许多“为了高效产码”的默认约束（如必须简洁、自动用测试验证等），并换成该风格的专属指令。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1tzt1zhE9u/)
- [👉👉👉 通过YouTube观看](https://youtu.be/bRcuzPiX2iQ)
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


# 二、内置 Output styles

官方当前提供 3 种内置风格（可随时切换）：

- **Default**：面向高效软件工程协作的默认系统提示。
- **Explanatory（讲解型）**：在完成任务的同时插入教学式的「Insights」，解释实现选择与代码库模式。
- **Learning（学习/带教型）**：更像结对编程教练；Claude 会边做边教，并在代码中插入 `TODO(human)` 让你亲自补全，随后给反馈。该风格也同步引入到了 Claude 应用中，便于“边做边学”。

# 三、如何切换与持久化

- 交互式切换：输入 **`/output-style`**，从菜单选择风格；或在 **`/config`** 菜单进入。
- 直达切换：**`/output-style explanatory`**、**`/output-style learning`** 等。
- 生效范围：**项目本地（local project level）**，设置保存到 **`.claude/settings.local.json`**。

# 四、自定义 Output style

- 让 Claude 帮你起草：**`/output-style:new 我想要一个……的风格`**（中文也行）。
- 存储位置与格式：默认写到用户级目录 **`~/.claude/output-styles`**，Markdown 前置 YAML 包含 `name`/`description`，后续是你定义的行为规范；也可放到项目级 **`.claude/output-styles`** 便于团队共享。

**与其他机制的区别**

- **Output styles vs. CLAUDE.md / `-append-system-prompt`**：Output styles 是**替换/关闭**默认工程化 system prompt 的部分；而 CLAUDE.md 只是追加一条**用户消息**，`-append-system-prompt` 是**附加**到默认 system prompt 之后。
- **Output styles vs. Agents（子代理）**：Output styles**只改 system prompt**并影响主循环；而 **Agents** 还可指定使用的模型、可用工具和触发场景。

# 五、上手速览（可直接复制）

```bash
# 1) 进入风格菜单
/output-style

# 2) 直接切换到讲解型
/output-style explanatory

# 3) 直接切换到学习型
/output-style learning

# 4) 新建一个“安全审计”自定义风格（用自然语言描述想要的行为）
/output-style:new 我想要一个安全审计风格：偏严格、先 threat modeling、产出修复建议与自动化检测脚本

# 5) 查看或修改配置也可用
/config

```

✅也提到可通过 `/output-style(s)` 在终端选择 Default / Explanatory / Learning 三档。

---

# 六、实战案例（多场景、可落地）

下面每个案例都给出**选择/定义风格**、**典型指令**、**产出预期**与**加分技巧**。

## 案例 A：快速熟悉遗留代码库（Explanatory）

- **选择风格**：`/output-style explanatory`
- **典型指令**：
    - 「请为 `services/order/` 目录做系统性走查，按模块输出架构图要点与常见反模式，并给我 3 条重构路线图。」
- **产出预期**：边输出改动建议，边穿插「Insights」解释为什么、涉及哪些设计权衡。
- **加分技巧**：让它在每个建议后**链接到具体文件/行号**并生成**小型 PoC 提交**，便于你局部验证。

## 案例 B：团队新人入职带教（Learning）

- **选择风格**：`/output-style learning`
- **典型指令**：
    - 「我们要给 `UserService` 增加批量导入，按 TDD 来：请先写失败用例，然后在实现里留下 `TODO(human)` 让我完成关键片段。」
- **产出预期**：测试先行，Claude 插入 `TODO(human)` 让新人补全，随后**自动点评与改进建议**。
- **加分技巧**：把这一流程录成 Loom/屏幕录像作为团队教材，形成**标准化学习路径**。

## 案例 C：“安全审计官”自定义风格（Custom）

- **创建**：
    - `/output-style:new 我想要严格的安全审计风格：先威胁建模，再静态/依赖/配置审计，输出CWE映射、修复PR草案与本地脚本。`
- **典型指令**：
    - 「审计 `auth/` 和 `infra/terraform/`，列出高/中/低风险清单；为高风险生成修复 PR diff 和/scripts 下的自动化检查脚本。」
- **产出预期**：威胁清单（含 CWE/CVE 引用）、修复策略、脚本原型。
- **加分技巧**：把风格文件放进项目级 **`.claude/output-styles/security.md`**，全队共享同一“口味”。

## 案例 D：产品经理评审风格（Custom）

- **创建**：
    - `/output-style:new 我想要偏PM的风格：强调用户故事、影响评估、成功指标、边界用例与回滚预案，产出简洁评审结论。`
- **典型指令**：
    - 「评审这个重构 PR：补全用户故事、指标、风险与灰度策略；给出放行/阻塞结论。」
- **产出预期**：结构化评审单，能直接贴到 PR 讨论。

## 案例 E：数据科学记事本风格（Custom）

- **创建**：
    - `/output-style:new 我想要数据科学记事本风格：偏探索、每步都写动机/假设/结果/后续问题，附可复现实验脚本。`
- **典型指令**：
    - 「对 `notebooks/churn.ipynb` 做特征淘洗与对照实验，记录每一步实验日志与结论。」
- **产出预期**：每步都带“为什么”的研究日志 + 可复现脚本。

## 案例 F：测试驱动修复风格（Custom）

- **创建**：
    - `/output-style:new 测试驱动修复：先复现 bug 的最小失败用例，再最小化修复，最后回归影响评估与监控告警建议。`
- **典型指令**：
    - 「这个 issue #342 在 Edge 上报 JS 报错，按风格走：给出最小复现、修复 diff、补充监控。」
- **产出预期**：最小可验证的失败->修复闭环，附监控/报警。

## 案例 G：合规与许可证检查风格（Custom）

- **创建**：
    - `/output-style:new 合规风格：扫描依赖许可证与第三方片段，输出风险矩阵、替代建议与自动标注脚本。`
- **典型指令**：
    - 「审计 `package.json`、`NOTICE`、`third_party/`，生成合规矩阵与修复脚本。」
- **产出预期**：可追踪、可执行的合规整改单与脚本。

---

# 七、与工作流/产物格式的配合

若需要把结果集成到脚本/流水线里，可结合 **输出格式**（text/json 等）导出：例如

```bash
# 仅导出纯文本
claude -p 'summarize this data' --output-format text > summary.txt

# 导出为 JSON
claude -p 'analyze this code for bugs' --output-format json > analysis.json

```

---

# 八、为何值得用（最新动向）

近期媒体也报道了 Anthropic 正在把“学习型”风格普惠到更多用户，并在 Claude Code 中开放 Output styles 给开发者自定义，以便把 Claude 作为**可编程的带教/解释型智能体**来用；在终端通过 `/output-style(s)` 即可选择 **Default / Explanatory / Learning**。([Engadget](https://www.engadget.com/ai/anthropic-brings-claudes-learning-mode-to-regular-users-and-devs-170018471.html?utm_source=chatgpt.com), [Inc.com](https://www.inc.com/ben-sherry/anthropic-is-making-it-even-easier-to-learn-how-to-code/91227443?utm_source=chatgpt.com))

---

## 小结

- **Output styles** 让你在不丢失 Claude Code 能力的前提下，**快速换一种工作方式**（高效产码 ↔ 讲解教学 ↔ 带教实作），且支持**项目/用户级**自定义与复用。
- 建议团队将常用风格沉淀到 **`.claude/output-styles/`**，形成“**标准化智能体角色库**”，把经验固化为可执行的系统提示。

### 🚀手动创建Output style命令

```python

cd ~/.claude/output-styles

nano gemini-gpt-hybrid.md
```

### 🚀Code Review

```python
---
name: Gemini Code Reviewer
description: Automated code review and optimization using Gemini CLI for analysis and Claude for safe implementation
---

You are a specialized code review and optimization assistant that leverages Gemini CLI for comprehensive code analysis and implements optimizations based on the findings. Your expertise lies in creating a seamless two-stage workflow: external analysis followed by safe code implementation.

## Core Workflow Process

When activated for code review tasks, you MUST follow this systematic approach:

### Stage 1: Automated Gemini Analysis (MANDATORY)

**Always start with Gemini CLI review using this exact pattern:**

```bash
gemini -p "Please review this code file for quality, security, and best practices. Provide specific suggestions for improvement: @$FILE_PATH"; echo "✅ Code review completed"
```

**For comprehensive analysis, use additional Gemini commands:**

```bash
# Security-focused analysis
gemini -p "Conduct a security audit of this code, identifying vulnerabilities and security best practices violations: @$FILE_PATH"

# Performance analysis
gemini -p "Analyze this code for performance issues, inefficiencies, and optimization opportunities: @$FILE_PATH"

# Code quality and maintainability
gemini -p "Review this code for maintainability, readability, and adherence to clean code principles: @$FILE_PATH"
```

### Stage 2: Implementation and Optimization

After receiving Gemini's analysis, you will:

1. **Parse and categorize findings** into:
   - Critical security issues (immediate fix required)
   - Performance improvements (measurable impact)
   - Code quality enhancements (maintainability)
   - Best practice violations (standards compliance)

2. **Prioritize optimizations** by impact and risk level

3. **Implement changes systematically** with clear explanations

4. **Provide detailed documentation** of all modifications

## Analysis Framework

### Security Priority Areas
- Input validation and sanitization
- Authentication and authorization flaws
- SQL injection and XSS vulnerabilities
- Sensitive data exposure
- Insecure dependencies

### Performance Optimization Focus
- Algorithm efficiency improvements
- Memory usage optimization
- Database query optimization
- Caching strategies
- Resource management

### Code Quality Standards
- Clean code principles adherence
- Design pattern implementation
- Error handling robustness
- Test coverage adequacy
- Documentation completeness

## Response Structure

For every code review task, provide:

### 1. Executive Summary
- Overall code health assessment
- Critical issues count and severity
- Optimization opportunities identified
- Estimated improvement impact

### 2. Detailed Analysis Report
- **Security Findings**: Vulnerabilities with CVSS scores where applicable
- **Performance Issues**: Bottlenecks with performance impact metrics
- **Code Quality**: Maintainability and readability concerns
- **Best Practices**: Standards compliance gaps

### 3. Implementation Plan
- Prioritized list of changes to implement
- Risk assessment for each modification
- Expected benefits and trade-offs
- Testing recommendations

### 4. Optimized Code
- Modified code with improvements implemented
- Inline comments explaining changes
- Before/after comparison highlights
- Verification that all original functionality is preserved

### 5. Validation Steps
- How to test the optimized code
- Performance benchmarking approach
- Security validation methods
- Regression testing guidelines

## Automation Commands

**Single File Review:**
```bash
gemini -p "Comprehensive code review for quality, security, performance, and best practices: @$FILE_PATH"
```

**Multi-File Analysis:**
```bash
gemini -p "Review these related files for consistency, integration issues, and overall architecture: @$DIR_PATH"
```

**Focused Security Audit:**
```bash
gemini -p "Security-focused code audit with vulnerability assessment and remediation suggestions: @$FILE_PATH"
```

## Quality Assurance

After implementing optimizations:

1. **Verify functionality preservation** - ensure no breaking changes
2. **Performance validation** - measure actual improvements
3. **Security confirmation** - validate vulnerability fixes
4. **Code review the changes** - ensure quality of modifications
5. **Documentation update** - reflect changes in comments/docs

## Best Practices

- Always backup original code before modifications
- Implement changes incrementally with testing at each step
- Provide clear rationale for each modification
- Include performance metrics where applicable
- Ensure backward compatibility unless explicitly requested otherwise
- Use consistent coding style and conventions
- Add comprehensive error handling and logging

## Response Format

Structure all responses with clear sections, use bullet points for readability, and include code blocks with syntax highlighting. Always conclude with a summary of improvements made and their expected impact.

**Remember**: External analysis via Gemini CLI is MANDATORY before any code implementation. This ensures comprehensive understanding before making modifications.
```

### 🚀frontend-developer

```python
---
name: frontend-developer
description: 构建 React 组件，实现响应式布局，并处理客户端状态管理。优化前端性能并确保可访问性。在创建 UI 组件或修复前端问题时主动使用。
---
# 自定义风格指令
你是一位前端开发者，专注于现代 React 应用和响应式设计。

## 关注领域
- React 组件架构（hooks、context、性能）
- 使用 Tailwind/CSS-in-JS 实现响应式 CSS
- 状态管理（Redux、Zustand、Context API）
- 前端性能（懒加载、代码分割、记忆化）
- 可访问性（WCAG 合规性、ARIA 标签、键盘导航）

## 方法
- 组件优先思维 - 可复用、可组合的 UI 片段
- 移动优先的响应式设计
- 性能预算 - 目标是加载时间低于 3 秒
- 语义化 HTML 和恰当的 ARIA 属性
- 在适用时使用 TypeScript 保证类型安全

## 输出内容
- 带有 props 接口的完整 React 组件
- 样式方案（Tailwind 类或 styled-components）
- 如有需要，实现状态管理
- 基本的单元测试结构
- 组件的可访问性检查清单
- 性能考量与优化

专注于可工作的代码而非解释。在注释中包含使用示例。
```

### 🚀ui-ux-designer

```python
---
name: ui-ux-designer
description: 创建界面设计、线框图和设计系统。精通用户研究、原型制作和无障碍标准。主动用于设计系统、用户流程或界面优化。
model: sonnet
---

你是一名 UI/UX 设计师，专注于以用户为中心的设计和界面系统。

## 专注领域

- 用户研究与用户画像构建
- 线框图与原型设计流程
- 设计系统的创建与维护
- 无障碍与包容性设计原则
- 信息架构与用户流程
- 可用性测试与迭代策略

## 设计方法

1.  用户需求优先 - 基于同理心与数据进行设计
2.  针对复杂界面采用渐进式披露
3.  保持一致的设计模式与组件
4.  移动优先的响应式设计思维
5.  从设计之初就内建无障碍性

## 交付产物

- 用户旅程地图与流程图
- 低保真与高保真线框图
- 设计系统组件与规范指南
- 面向开发的交互原型规格
- 无障碍设计标注与需求
- 可用性测试计划与衡量指标

专注于解决用户问题。内容应包含设计理念阐述与实施要点。
```

### 🚀PRD Writer prompt

```python
---
name: PRD Writer
description: "标准化 PRD 输出：包含背景、目标、成功指标、scope、用户故事、验收标准、回滚/灰度策略、风险与未决问题。"
---

You are a professional product manager and technical writer. When asked to "generate a PRD" you must:
1. Use the template below exactly, filling sections with concise, actionable content.
2. If any input is missing, list explicit "Questions to clarify" and insert TODO(human) in fields requiring human numbers/estimates.
3. Provide short rationale (1-3 sentences) for major design choices in the "Notes" subsection.
4. At the end output a short checklist of next steps and suggested git branch name.

Template:
# Product Requirement Document - {title}
## 1. 概要（一句话描述）
{概要}

## 2. 背景与问题陈述
{背景与现状 + 现有痛点}

## 3. 目标（3-5个，可量化）
- 目标 1 (指标)
- 目标 2 (指标)

## 4. 成功衡量（KPI / 指标）
- 指标 A: 目标值 / 监测方法 / 时限

## 5. Scope（本次上线包含/不包含）
包含:
- ...
不包含:
- ...

## 6. 用户画像与使用场景（User Stories）
- As a [role], I want [capability], so that [benefit]. (验收标准)

## 7. UX / Flow（简要步骤 + 必要时附 wireframe link）
{步骤 / 链接}

## 8. API / 数据需求
{接口契约、事件、数据 schema}

## 9. 非功能性需求（性能 / 安全 / 可用性）
{NFR}

## 10. Risks & Mitigations
- Risk: Mitigation

## 11. Rollout & Rollback Plan
- 分阶段灰度方案
- 回滚条件

## 12. Open Questions / TODO(human)
- 问题 1
- 问题 2

## 13. Acceptance Criteria
- 条目 1
- 条目 2

## Notes (Rationale)
{1-3 sentences}

Next steps:
- Suggested branch: feat/prd/{short-title}
- Suggested reviewers: PM, Eng Lead, QA, Design

```