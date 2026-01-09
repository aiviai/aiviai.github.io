---
layout: single
title: "🚀一人抵一个开发团队！OpenCode最强插件Oh My OpenCode让你拥有GPT 5.2+Gemini 3 Pro+Claude Opus 4.5组成的AI开发团队，一个咒语实现全自动编程开发"
sidebar:
  nav: "docs"
date: 2026-01-09 00:00:00 +0800
categories: LLMs
tags: [OpenCode, Claude Code, Plugins, Oh My OpenCode, Vibe Coding, AI智能体, TDD, AGI, AIGC]
classes: wide
author_profile: true
---



很多人第一次用 AI 编程工具，会经历一个“从惊艳到冷静”的过程：写小功能很快，但一到重构、迁移、补测试、清 ESLint 警告这种大活，就容易卡在拆任务、查文档、反复上下文、做一半停住。

Oh My OpenCode（oh-my-opencode）就是冲着这类问题来的。它不是在 OpenCode 上再套一层 UI，而是把“一个模型”升级成“多代理协作”，用一个主控代理（Sisyphus）负责拆分/委派/推进，把不同类型的工作分给不同角色去做，尽量贴近真实团队的协作方式。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1SYrTBMEzB/)
- [👉👉👉 通过YouTube观看](https://youtu.be/twFjLiy2Pmc)
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

## 1）它到底在做什么：多代理协作 + 强推进

Oh My OpenCode 的关键词是 **Sisyphus**：一个负责规划和调度的主代理。你可以把它理解成“Tech Lead + 项目经理”的组合：把任务拆成 TODO，按类型分派给不同角色并推动完成。

项目里常见的角色大概包括：架构/深度调试（Oracle）、文档检索（Librarian）、代码库探索（Explore）、前端 UI（Frontend UI/UX Engineer）等。它并不强迫你固定使用某个模型，而是鼓励“不同模型做不同事”，用各自擅长的能力来补齐短板。

---

## 2）先把最重要的“使用入口”说清楚：ultrawork / ulw

你会在 README 和用户分享里反复看到 `ultrawork`（或 `ulw`）。它更像一个“工作模式开关”：提示主控代理进入更积极的协作模式——并行探索、后台任务、强推进，直到完成。

直观理解：

- 小任务：不一定要开 ultrawork
- 大任务（跨文件/跨模块/要查资料/要持续推进）：开 ultrawork 更稳

---

## 3）快速安装与验证（把流程走通）

### Step 1：安装 OpenCode

按 OpenCode 官方方式安装（略），确保 `opencode` 能运行。

### Step 2：安装 Oh My OpenCode 插件

```bash
bunx oh-my-opencode install
# 或
npx oh-my-opencode install

```

安装器会帮你把插件写进 `~/.config/opencode/opencode.json`。

### Step 3：登录你已有的订阅（可选但很常见）

如果你想用订阅而不是 API key，一般会走 OAuth（OpenAI/Google/Anthropic）。你已经验证过：

```bash
opencode auth list

```

能看到对应 provider 就算登录链路打通。

---

## 4）真实使用场景：怎么下 prompt，怎么跑起来

下面这些例子我尽量保留你原文的“可抄”风格，同时补充一些“为什么这么写”的解释。

---

### 场景一：大型代码重构 / 迁移（跨模块、跨技术栈）

**典型任务**：把一个桌面应用（例如 Tauri）迁移为 SaaS Web 应用，功能尽量保持一致。

**使用方式（核心就两步）**：

1）进入仓库启动 OpenCode：

```bash
cd your-project
opencode

```

2）在对话里直接下指令（带 ultrawork）：

> ultrawork 将这个 Tauri 应用转换为 SaaS Web 应用，保持现有核心功能不变。
> 
> 
> 先输出迁移计划与阶段拆分（每阶段验收标准），我确认后再开始写代码。
> 

**它通常会怎么做（你可以用来验收过程）**：

- 主控先产出 TODO / 里程碑
- Explore 并行扫代码库定位入口与模块边界
- Oracle 给迁移架构（哪些做替代、哪些要拆服务、数据怎么迁）
- 前端角色处理 UI / 页面结构
- Librarian 查框架文档和迁移注意事项
    
    这一套“先拆再并行”的流程，是多代理模式最典型的价值点。
    

---

### 场景二：批量清理代码质量问题（大量相似改动）

**典型任务**：项目有大量 ESLint 警告、格式问题、重复写法，需要集中清理。

**使用方式**：

```bash
opencode

```

然后：

> ulw 修复所有 ESLint 警告，遵循现有代码风格。
> 
> 
> 先按模块分批处理，每批处理完都要跑 lint 并给出结果。
> 

为什么要加“按模块分批”？因为这能避免一次改太多导致回滚困难，也更容易定位引入的问题。

（如果你配置了 hooks/门禁，还可以让每次改动后自动跑 lint/test。）

---

### 场景三：复杂 Debug（间歇性、非确定性问题）

**典型任务**：认证系统偶发把用户登出，复现不稳定。

**使用方式（建议用更明确的调查式 prompt）**：

```bash
opencode

```

> ultrathink 调查认证系统的间歇性失败问题：某些情况下用户被意外登出。
> 
> 
> 1）先列出可能原因假设清单
> 
> 2）定位相关代码路径与日志点
> 
> 3）提出最小复现步骤（如果能）
> 
> 4）给出修复方案与回归测试建议
> 

这种场景多代理的价值在于：Explore 快速扫代码路径，Librarian 查第三方库已知问题，Oracle 做收敛分析，最后再回到修复与验证。

---

### 场景四：前端 UI 开发（把“视觉任务”交给更适合的模型）

Oh My OpenCode 的常见用法是：把“视觉/交互”这类任务单独分配到更擅长 UI 的模型。

你可以在配置里给某个类别/角色指定模型（示例为概念表达）：

```json
// oh-my-opencode.json（示例）
{
  "categories": {
    "visual-engineering": {
      "model": "google/gemini-3-pro-high",
      "temperature": 0.7
    }
  }
}

```

然后在对话里写：

> ulw 创建一个现代化的分析仪表板：包含图表、实时更新、深色模式。
> 
> 
> UI/交互请优先交给视觉工程角色处理，主控只负责数据与集成。
> 

这里的关键不是“某个模型更强”，而是把任务交给“更合适的角色”，减少来回沟通成本。

---

### 场景五：研究开源实现（快速搞清楚一个库怎么做的）

**典型任务**：想理解 React Query 的缓存失效机制，顺便找真实项目用法。

**使用方式**：

```bash
opencode

```

> @librarian 研究 React Query 的缓存失效机制是如何实现的：
> 
> - 先给一份机制概览（失效触发条件、缓存 key、staleTime/cacheTime 等）
> - 再找几个真实项目的使用片段与常见模式
> - 最后总结“踩坑点”和推荐配置

这种任务特别适合 Librarian：它更偏“查资料+归纳”，而不是直接写业务代码。

---

### 场景六：Ralph Loop（让它“自动循环直到 done”）

当你希望它把一个任务做成“闭环交付”（例如生成一个完整 REST API、带测试、带文档），可以用 Ralph Loop：

```bash
opencode

```

> /ralph-loop "创建一个完整的用户管理 REST API：CRUD、认证、权限控制、单元测试"
> 

它的思路是：持续迭代推进，直到检测到完成标记（或达到迭代上限）。适合“从零搭骨架”或“需要连续推进”的任务，但也意味着更容易消耗 tokens，需要你把验收标准写清楚。

---

## 5）一个实际可用的配置例子（并发、模型分工、Ralph Loop）

下面是一个更偏“实战”的配置思路：便宜模型负责探索，贵模型负责审查与关键决策，并发做限制。

```json
// ~/.config/opencode/oh-my-opencode.json（示例）
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/master/assets/oh-my-opencode.schema.json",

  // 如果你用的是外部 antigravity OAuth 插件来跑 Gemini，可能需要关闭内置 google_auth（按你的实际插件/模型命名来）
  "google_auth": false,

  "agents": {
    "oracle": { "model": "openai/gpt-5.2" },
    "explore": { "model": "google/antigravity-gemini-3-flash" }
  },

  "background_task": {
    "defaultConcurrency": 5,
    "modelConcurrency": {
      "anthropic/claude-opus-4-5": 2
    }
  },

  "ralph_loop": {
    "enabled": true,
    "default_max_iterations": 100
  }
}

```

这类配置的好处是：把成本和质量“拆开管理”——探索用便宜快的，关键决策用更强的，整体更稳定。

---

## 6）适合谁？不适合谁？

**更适合：**

- 遗留系统改造、大型重构、跨模块迁移
- 要求“别半途而废”，希望有明显推进节奏的人
- 愿意花点时间做配置/分工的 power user

**不太适合：**

- 只做单文件小改动、追求极简的人
- 不想折腾配置、只想“开箱即用自动补全”的场景

---

## 写在最后

Oh My OpenCode 最有价值的地方，是把 AI 编程从“单轮对话”推进到更接近工程团队的协作：拆任务、并行、查资料、审查、迭代、收敛。它不保证每次都一次成功，但能显著降低“大活做一半停住”的概率。

如果你准备试一试，建议从一个中等任务开始：比如“批量修 lint + 加测试”或“迁移一个模块”。等熟悉节奏后再上 ultrawork 去啃真正的大项目。

### 快速安装指南

1. 安装 OpenCode：`curl -fsSL <https://opencode.ai/install.sh> | bash`
2. 安装 Bun：`curl -fsSL <https://bun.sh/install> | bash`
3. 安装插件：`bunx oh-my-opencode install`
4. 认证模型：`opencode auth login`（登录 Anthropic/OpenAI/Google）
5. 启动：进入项目目录，`opencode`，输入指令测试。

更多细节见仓库 README（中文版写得极好，许多开发者被“征服”）。如果你是 Claude Code 用户，迁移几乎无缝；新手建议从小项目练手，感受多代理魔法！

# Oh My OpenCode 真实项目使用场景

## 一、Web 应用开发

### 场景 1：SaaS 产品从零到一

**项目类型**：订阅制 B2B SaaS 平台（如 CRM、项目管理工具、数据分析平台）

**使用方式**：

bash

`opencode
> ultrawork 创建一个完整的项目管理 SaaS，包含：
> - 用户认证系统（邮箱/OAuth）
> - 团队和权限管理
> - 看板式任务管理
> - 实时协作功能
> - Stripe 订阅付费集成
> - 管理后台仪表盘`

**Agent 分工**：

- **Sisyphus**：整体架构规划，任务分解为 50+ 个原子任务
- **Oracle**：设计数据库 schema、API 架构、权限模型
- **Frontend Engineer**：React/Vue 组件开发、Tailwind 样式
- **Librarian**：查阅 Stripe API、NextAuth 文档
- **Explore**：搜索现有 SaaS 模板和最佳实践

**预期效果**：传统开发 2-3 个月 → Oh My OpenCode 1-2 周

---

### 场景 2：电商平台

**项目类型**：多商户电商平台（类似 Shopify 店铺）

**具体任务**：

bash

`> ulw 开发一个跨境电商平台：
> - 商品目录和搜索（Elasticsearch）
> - 购物车和结算流程
> - 多币种支付（PayPal/Stripe/支付宝）
> - 订单管理和物流追踪
> - 商户入驻和后台管理`

**为什么适合**：

- 涉及前后端、支付、物流等多个领域，多 Agent 协同优势明显
- Librarian 可以实时查阅各支付网关的最新 API
- 复杂的状态管理需要 Oracle 设计架构

---

### 场景 3：内容管理系统（CMS）

**项目类型**：企业官网 + 博客 + 文档站点

bash

`> ultrawork 基于 Next.js + Sanity CMS 创建一个企业官网，包含：
> - 响应式首页设计
> - 博客系统（MDX 支持）
> - 产品展示页面
> - SEO 优化
> - 国际化（中英文）`

---

## 二、移动应用开发

### 场景 4：React Native 跨平台应用

**项目类型**：社交/工具类 App

bash

`> ulw 开发一个习惯追踪 App（React Native + Expo）：
> - 用户注册和登录
> - 习惯创建和每日打卡
> - 数据统计和可视化图表
> - 本地通知提醒
> - 云端同步（Firebase）
> - 暗色模式支持`

**Agent 优势**：

- Frontend Engineer 处理所有 UI 组件和动画
- Librarian 查阅 React Native、Expo SDK 文档
- 探索现有开源习惯 App 的实现

---

### 场景 5：Flutter 企业应用

**项目类型**：企业内部管理 App

bash

`> ultrawork 开发一个企业 OA 移动端（Flutter）：
> - 员工考勤打卡（定位）
> - 审批流程（请假/报销）
> - 内部通讯录
> - 公告通知
> - 与现有后端 API 对接`

---

## 三、后端服务开发

### 场景 6：微服务架构

**项目类型**：高并发 API 服务

bash

`> ulw 设计并实现一个微服务架构：
> - 用户服务（认证、权限）
> - 订单服务（创建、支付、退款）
> - 库存服务（实时库存、预留）
> - 通知服务（邮件、短信、推送）
> - API 网关（限流、熔断）
> - 使用 Kubernetes 部署配置`

**Oracle 的价值**：

- 设计服务间通信方案（gRPC vs REST vs 消息队列）
- 解决分布式事务问题
- 数据一致性策略

---

### 场景 7：实时数据管道

**项目类型**：数据工程项目

bash

`> ultrawork 构建一个实时数据处理管道：
> - Kafka 消息采集
> - Flink/Spark Streaming 实时处理
> - ClickHouse 实时分析存储
> - Grafana 监控仪表盘
> - 数据质量检测和告警`

---

## 四、AI/ML 项目

### 场景 8：RAG 应用开发

**项目类型**：企业知识库问答系统

bash

`> ulw 开发一个基于 RAG 的企业知识库：
> - 文档上传和解析（PDF/Word/网页）
> - 向量化存储（Pinecone/Weaviate）
> - LLM 问答接口（支持 OpenAI/Claude）
> - 引用溯源和准确性验证
> - 管理后台和权限控制`

**Librarian 价值**：实时查阅 LangChain、LlamaIndex 最新文档和实现

---

### 场景 9：AI Agent 平台

**项目类型**：多 Agent 协作平台

bash

`> ultrawork 创建一个 AI Agent 编排平台：
> - Agent 定义和配置界面
> - 工作流可视化编辑器
> - 工具/MCP 集成管理
> - 执行监控和日志
> - 计费和用量统计`

---

## 五、DevOps 与基础设施

### 场景 10：内部开发者平台（IDP）

**项目类型**：企业内部工具

bash

`> ulw 构建一个内部开发者平台：
> - 服务目录和文档
> - 一键部署脚手架
> - CI/CD 流水线配置生成
> - 环境管理（dev/staging/prod）
> - 成本监控和资源优化建议`

---

### 场景 11：监控告警系统

**项目类型**：可观测性平台

bash

`> ultrawork 开发一个全栈监控系统：
> - 指标采集（Prometheus）
> - 日志聚合（Loki）
> - 链路追踪（Jaeger）
> - 统一仪表盘（Grafana）
> - 智能告警和根因分析`

---

## 六、遗留系统现代化

### 场景 12：单体应用拆分

**项目类型**：技术债务清理

bash

`> ulw 将这个 Rails 单体应用拆分为微服务：
> 1. 分析现有代码结构和依赖关系
> 2. 识别边界上下文
> 3. 设计服务拆分方案
> 4. 逐步提取服务，保持向后兼容
> 5. 添加服务间通信和数据同步`

**为什么特别适合**：

- Explore agent 快速分析整个代码库
- Oracle 设计迁移策略
- Todo Enforcer 确保每个模块都被处理，不遗漏

---

### 场景 13：框架升级

**项目类型**：大版本迁移

bash

`> ultrawork 将项目从 Vue 2 升级到 Vue 3：
> - 分析所有组件的 Options API 用法
> - 转换为 Composition API
> - 更新 Vuex 到 Pinia
> - 处理破坏性变更
> - 更新所有依赖到兼容版本
> - 确保所有测试通过`

**真实案例**：用户 Jacob Ferrari 用 Oh My OpenCode 一天清理了 8000 个 ESLint 警告。

---

### 场景 14：桌面应用迁移

**项目类型**：Electron/Tauri 应用 Web 化

bash

`> ulw 将这个 45k 行的 Tauri 桌面应用转换为 SaaS Web 应用：
> - 分析现有功能和本地 API 调用
> - 设计云端替代方案
> - 实现用户认证和多租户
> - 迁移本地存储到云数据库
> - 添加协作功能`

**真实案例**：用户 James Hargis 一夜之间完成了这个转换。

---

## 七、开源项目贡献

### 场景 15：复杂 Bug 修复

**项目类型**：为大型开源项目贡献 PR

bash

`> ulw 修复 issue #1234：
> 1. 阅读 issue 描述和相关讨论
> 2. 复现问题
> 3. 分析根本原因
> 4. 研究相关代码
> 5. 实现修复
> 6. 添加测试用例
> 7. 创建 PR`

**优势**：

- Librarian 研究项目历史和设计决策
- Explore 快速定位相关代码
- Oracle 分析复杂的 edge case

---

### 场景 16：新功能开发

**项目类型**：为开源项目添加重要功能

bash

`> ultrawork 为这个开源项目实现 RFC #567 提案的功能：
> - 理解 RFC 规范
> - 设计实现方案
> - 遵循项目代码规范
> - 完整的测试覆盖
> - 更新文档
> - 提交 PR`

---

## 八、自动化脚本与工具

### 场景 17：CLI 工具开发

**项目类型**：命令行工具

bash

`> ulw 创建一个数据库迁移 CLI 工具（类似 Flyway）：
> - 迁移文件管理
> - 版本控制和回滚
> - 多数据库支持（PostgreSQL/MySQL/SQLite）
> - 锁机制防止并发迁移
> - 清晰的日志输出`

---

### 场景 18：浏览器扩展

**项目类型**：Chrome/Firefox 插件

bash

`> ultrawork 开发一个网页标注 Chrome 扩展：
> - 文本高亮和标注
> - 截图和区域标记
> - 标注云端同步
> - 团队协作共享
> - 导出为 PDF/Markdown`

---

## 九、测试与质量保障

### 场景 19：测试覆盖率提升

**项目类型**：补充测试用例

bash

`> ulw 将这个项目的测试覆盖率从 40% 提升到 80%：
> 1. 分析当前覆盖率报告
> 2. 识别关键未覆盖路径
> 3. 为核心业务逻辑添加单元测试
> 4. 添加集成测试
> 5. 添加 E2E 测试（关键流程）`

---

### 场景 20：安全审计修复

**项目类型**：安全漏洞修复

bash

`> ultrawork 修复安全扫描报告中的所有漏洞：
> - CVE-2024-xxxx：依赖升级
> - SQL 注入风险：参数化查询
> - XSS 漏洞：输出编码
> - CSRF 防护：Token 验证
> - 敏感信息泄露：环境变量`

---
