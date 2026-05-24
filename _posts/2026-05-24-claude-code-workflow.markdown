---
layout: single
title: "🚀Claude Code悄悄加入的Workflow，可能会改变我们使用多Agent的方式！隐藏的多Agent编排能力实测：JavaScript脚本化编排、Subagent并行调度、结构化输出+Schema约束，比Subagents/Agent Teams/Skills更适合沉淀复用的工程流水线"
sidebar:
  nav: "docs"
date: 2026-05-24 00:00:00 +0800
categories: LLMs
tags: [Claude, Claude Code, Workflow, Subagents, Agent Teams, Skills, MCP, 多Agent, AI编程, AGI, AIGC]
classes: wide
author_profile: true
---

这两天我一直在测试 Claude Code 一个非常有意思的新能力：**Workflow**。

它有点特殊。

特殊在于，它不是 MCP，也不是 Skills，也不是普通的 Subagent，更不是 Agent Teams。

更特殊的是：它已经出现在 Claude Code 的二进制实现里，也可以实际运行，但官方公开文档里还没有正式说明。甚至在 Claude Code `2.1.147` 的发布信息中，Workflow 曾短暂出现过，随后又被移除。

所以今天这篇文章不会把它包装成"官方正式发布的新功能"。更准确地说：

**Workflow 是 Claude Code 里已经可用、但仍处于隐藏/实验状态的多 Agent 编排能力。**

如果你平时已经在用 Claude Code、Subagents、Skills 或 Agent Teams，那么 Workflow 值得重点关注。它可能是继 MCP 和 Skills 之后，Claude Code 生态里又一个非常关键的能力方向。

> 🚀 本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1KoGE6cE53/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/ozVTJm3n2U4)

<iframe width="800" height="450" src="https://www.youtube.com/embed/ozVTJm3n2U4" title="Claude Code Workflow 实测" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## 一、Workflow 到底是什么？

一句话解释：

**Workflow 是用 JavaScript 脚本来编排多个 Claude Code agent 的机制。**

以前我们让 Claude Code 做复杂任务，通常是这样说：

> 请你先分析代码，再找风险，再给出修复方案。

这本质上还是自然语言驱动。模型会自己决定怎么拆任务、什么时候派 subagent、如何汇总结果。

Workflow 不一样。

它把这个过程写成代码：

```js
phase("Review")

const results = await Promise.all([
  agent("检查 correctness 风险", { label: "correctness-reviewer" }),
  agent("检查 security 风险", { label: "security-reviewer" }),
  agent("检查 testing 覆盖", { label: "test-reviewer" }),
])

phase("Aggregate")

const final = await agent(
  `请汇总这些结果：${JSON.stringify(results)}`,
  { label: "aggregator" },
)

return final
```

也就是说，Workflow 做的不是"再多叫几个 agent"，而是把多 Agent 的调用顺序、并行关系、阶段划分、输出格式和最终聚合，都变成可复用的脚本。

这就是它真正重要的地方。

---

## 二、它和 Subagents、Agent Teams、Skills 有什么区别？

很多人第一次看到 Workflow，可能会问：Claude Code 不是已经有 Subagents 和 Agent Teams 了吗？为什么还需要 Workflow？

可以这样理解。

### Subagents：临时派人做事

Subagent 很适合临时委派。

比如：

- 让一个 agent 看某个模块
- 让一个 agent 查某段日志
- 让一个 agent 找潜在 bug

它的优点是简单、自然、启动成本低。

但它的问题也明显：整个流程主要还是模型临场决定。今天它这么拆，明天可能换一种拆法；这次它记得验证，下次可能跳过验证。它适合"临时任务"，不太适合沉淀成稳定流程。

### Agent Teams：多角色协作工作台

Agent Teams 更像一个多 agent 协作界面。

你可以让不同角色并行工作，人类再去调度、查看、接管。它适合交互式协作，适合长期多角色任务。

但如果你要的是一个可以反复跑的"工程流水线"，Agent Teams 仍然偏交互，不够脚本化。

### Skills：把能力封装给模型

Skills 更像"能力包"。

它告诉模型：

- 什么时候该用这个技能
- 怎么用
- 有哪些限制
- 可以参考哪些文件、模板、脚本

Skills 的优势在于分发、说明、触发、上下文封装。

但 Workflow 的优势在于执行编排。

所以更准确的关系不是"Workflow 取代 Skills"，而是：

**Skills 负责封装和分发，Workflow script 负责执行真正的多 Agent 工作流。**

未来很可能出现这种形态：

```text
my-review-skill/
  SKILL.md
  workflows/
    sharded-review.workflow.mjs
    pr-review.workflow.mjs
  examples/
    report.md
```

Skill 告诉 Claude Code 什么时候用；Workflow 负责把流程跑起来。

---

## 三、Workflow 最核心的优势：可复用

这是我测试之后最深的感受。

普通 prompt 是一次性的。

Subagent 是临时派生的。

Agent Teams 更偏人工调度。

但 Workflow script 可以沉淀下来。

一旦某个脚本在某类任务上跑得不错，后续你就可以复用它完成类似任务。

比如：

- 大代码库分片审查
- PR 多角色 Review
- 深度研究
- 文档生成
- Prompt Eval
- Bug 定位
- Release 前质量门禁
- 安全 Threat Modeling

你不需要每次重新描述完整流程。你只需要保存脚本，下次换一个仓库、换一个主题、换一个 PR，再把参数改掉即可。

这就让"工作流"从一种 prompt 写法，变成了可以共享、可以修改、可以迭代的资产。

---

## 四、如何启用 Workflow？

当前 Workflow 仍然是隐藏/实验能力，所以需要显式开启。

启动 Claude Code 前，可以这样设置：

```bash
export CLAUDE_CODE_WORKFLOWS=1
claude
```

或者直接：

```bash
CLAUDE_CODE_WORKFLOWS=1 claude
```

进入 Claude Code 后，如果你希望它使用 Workflow，可以明确写：

```text
ultrawork

请生成一个只读的大代码库分片审查 workflow script。
不要执行，先让我确认。
```

这里要注意：`ultrawork` 更像一个经验性触发词，不是官方公开文档里的正式命令。它在测试中能有效提示 Claude Code 使用 Workflow，但不能把它当成稳定 API。

最稳妥的方式是两步走：

第一步，让 Claude Code 生成脚本，但不要执行。

```text
ultrawork

请为当前仓库生成一个 workflow script，但不要执行。

要求：
1. 识别 4-8 个 review shard
2. 每个 shard 用 agent()
3. 每个 agent 必须带 JSON schema
4. 最后 aggregator 合并 findings
5. 写到 /tmp/sharded-review.workflow.mjs
6. 输出 scriptPath，等待我确认
```

第二步，确认脚本后再运行：

```js
Workflow({
  scriptPath: "/tmp/sharded-review.workflow.mjs"
})
```

目前我最推荐 `scriptPath` 方式，因为这是反复 E2E 验证过的路径。

---

## 五、一个最小 Workflow 长什么样？

下面是一个最小可运行的例子：

```js
export const meta = {
  name: "workflow-smoke-test",
  description: "Minimal one-agent workflow script smoke test",
  phases: [
    { title: "Run", detail: "Spawn one subagent and validate structured output" },
  ],
}

phase("Run")

const result = await agent(
  "Return ok=true and message exactly WORKFLOW_SCRIPT_SMOKE_OK. Do not use tools.",
  {
    label: "smoke-agent",
    phase: "Run",
    model: "haiku",
    schema: {
      type: "object",
      properties: {
        ok: { type: "boolean" },
        message: { type: "string" },
      },
      required: ["ok", "message"],
      additionalProperties: false,
    },
  },
)

return {
  ok: result.ok === true && result.message === "WORKFLOW_SCRIPT_SMOKE_OK",
  result,
}
```

这里有几个关键点：

第一，`meta` 定义这个 workflow 的名称、描述和阶段。

第二，`phase()` 用来声明当前执行阶段。

第三，`agent()` 用来启动 subagent。

第四，`schema` 用来约束 subagent 的结构化输出。

第五，最后用 `return` 返回 workflow 的最终结果。

这已经不是普通 prompt，而是一个可以复跑、可以检查 artifact、可以被别人复用的工作流。

---

## 六、它能跑哪些场景？

下面是几类我认为最值得做成 Workflow script 的场景。

### 1. 大代码库分片审查

这是 Workflow 最典型的场景。

比如一个仓库可以拆成：

- correctness reviewer
- security reviewer
- performance reviewer
- data integrity reviewer
- testing reviewer
- packaging reviewer

每个 reviewer 只看自己的分片，最后 aggregator 汇总结果、去重、排序。

这种模式比"请审查整个仓库"稳定得多。

### 2. PR 多角色 Review

一个 PR 可以让多个 agent 同时检查：

- 行为是否正确
- 是否有安全风险
- 是否缺测试
- 是否破坏 API 兼容性
- 是否影响性能

最后给出：

- blocking findings
- non-blocking findings
- merge recommendation

这比单 agent review 更有覆盖面。

### 3. 生成、批评、修复

适合文档、方案、Prompt、Release Note。

流程可以是：

1. generator 生成初稿
2. critic 找问题
3. repairer 根据问题修复
4. final judge 判断是否通过

这个模式很适合需要质量闭环的内容生产。

### 4. 深度研究

可以让不同 agent 分别研究：

- 官方文档
- 论文
- 社区讨论
- GitHub 项目
- 实测结果

然后由 synthesizer 生成最终报告。

这种 workflow 一旦跑通，就可以反复用于不同技术主题。

### 5. Prompt / Agent Eval

比如你有 4 个 prompt 版本，不知道哪个更好。

Workflow 可以并行测试多个版本，然后由 judge agent 评分和排序。

这比人工复制粘贴 prompt 做对比高效很多。

---

## 七、Workflow script 可以共享吗？

可以，而且这可能是 Workflow 最有想象力的地方。

以前大家共享的是 prompt、skill、MCP server。

现在，至少在工作流编排这个层面，大家可以共享：

```text
deep-research.workflow.mjs
pr-review.workflow.mjs
large-codebase-review.workflow.mjs
prompt-eval.workflow.mjs
release-gate.workflow.mjs
```

别人拿到脚本后，只要环境支持 Workflow，就可以复用这套工作流。

这意味着什么？

意味着"如何组织多个 agent 做事"本身，也可以变成开源资产。

以前我们共享的是能力。

现在我们可以共享流程。

---

## 八、但它还不能盲用

Workflow 很强，但不代表它可以无监督使用。

我在实际测试中也看到过边界。

比如用 Workflow 做代码审查时，它能快速发现很多高价值问题，但也可能把某些问题严重级别判断过高。一个看似 SQL 注入的 finding，人工复核后发现上游已经有 UUID/prefix 正则约束，所以不能直接定性为 critical。

还有一次生成-批评-修复 workflow 中，因为 schema 字段叫 `ok`，critic 把它理解成"草稿是否合格"，返回了 `ok=false`，导致脚本最终断言失败。后来把字段改成 `reviewed`，结果就稳定了。

这说明两点：

第一，Workflow 能提升覆盖面，但不能替代工程判断。

第二，Workflow 的 schema 设计非常关键。

所以我建议：

- 高风险任务先让 Claude Code 只生成脚本，不执行
- 人工审查后再用 `Workflow({ scriptPath })` 执行
- 每个 agent 都要求结构化输出
- 最终 artifact 必须复核
- 不要把隐藏实验能力直接接入生产 CI

---

## 九、我的判断

Workflow 的价值，不是让 Claude Code 多叫几个 agent。

它真正的价值是：

**把 Agent 编排变成代码。**

这件事会带来三个变化。

第一，复杂任务可以复跑。

第二，优秀工作流可以共享。

第三，多 Agent 协作可以从"模型临场发挥"，变成"脚本化、结构化、可观察的工程流程"。

这也是为什么我认为 Workflow 值得重点关注。

它现在还不是正式公开能力，也不适合被包装成稳定平台 API。

但如果你已经在深度使用 Claude Code，尤其是已经在使用 Subagents、Agent Teams、Skills，那么 Workflow 很可能会成为你下一阶段最重要的效率杠杆。

未来如果官方正式公开这个能力，我们大概率会看到大量 workflow script 项目出现：

- 代码审查 workflow
- 安全审计 workflow
- 深度研究 workflow
- 文档生成 workflow
- Prompt eval workflow
- Release gate workflow

那时，大家共享的就不只是 prompt，而是完整的多 Agent 工作流。

这可能才是 Claude Code Workflow 最值得期待的地方。

---

本期内容到这里，欢迎大家点赞、关注和转发，谢谢大家观看。
