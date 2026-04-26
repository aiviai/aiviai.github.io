---
layout: single
title: "🚀解锁NotebookLM隐藏功能！notebooklm-py完全使用指南：Python+CLI+AI Agent三种玩法，批量下载、播客生成、思维导图、PPT导出，连Web版没有的功能都能用！Claude Code、Hermes Agent、OpenClaw一键集成"
sidebar:
  nav: "docs"
date: 2026-04-26 00:00:00 +0800
categories: LLMs
tags: [NotebookLM, Python, CLI, Claude Code, Hermes Agent, OpenClaw, AI Agent, 自动化, AGI, AIGC]
classes: wide
author_profile: true
---

Google 的 NotebookLM 是当下最强的"个人知识库 + AI 研究助手"之一，但官方 Web 界面有几个老大难问题：

- **没有官方 API**——所有操作只能在网页里点点点
- **批量任务做不了**——想一次导入 50 个 PDF？想都别想
- **隐藏功能用不上**——比如思维导图导出 JSON、PPT 导出 PPTX、测验导出 Markdown，Web UI 全都没暴露

今天给大家介绍一个非常硬核的开源项目——[`notebooklm-py`](https://github.com/win4r/notebooklm-py)。它通过逆向 NotebookLM 的内部 API，把所有功能（包括 Web 端没暴露的）都做成了 **Python API + CLI + AI Agent Skill** 三件套。

> ⚠️ **重要提示**：这是非官方库，使用的是 Google 未公开的内部接口，存在 API 随时变动的风险。适合做原型、做研究、做个人项目，不建议用在生产环境。

---

## 一、它到底能干什么？

先看一张能力总览：

| 模块 | 能力 |
|------|------|
| **笔记本** | 创建、列出、重命名、删除 |
| **资料源** | URL、YouTube、PDF、Markdown、Word、音视频、图片、Google Drive、纯文本，都能批量导入 |
| **对话** | 提问、查看历史、自定义 Persona |
| **研究** | Web 研究 / Drive 研究 Agent，支持快速 / 深度两种模式，结果自动入库 |
| **分享** | 公开 / 私有链接、用户权限（查看 / 编辑） |
| **生成** | 音频概览、视频概览、PPT、信息图、测验、闪卡、报告、数据表、思维导图 |

### Web UI 里没有、但 API 能干的事

这才是这个项目最值钱的地方：

- 🚀 **批量下载**——一次性把笔记本里所有音频、视频、PPT 全部下载到本地
- 📝 **测验 / 闪卡导出**——支持 JSON / Markdown / HTML 三种格式（Web 只能在线交互）
- 🧠 **思维导图导出 JSON**——可以喂给 Mermaid、XMind 等可视化工具
- 📊 **数据表导出 CSV**——直接进 Excel
- 📑 **PPT 导出 PPTX**——Web 只给 PDF，API 给可编辑的 PowerPoint
- ✏️ **单页 PPT 重写**——用自然语言改某一页，其他页不动
- 🔓 **资料全文访问**——拿到 NotebookLM 索引后的纯文本

光这几条就值得一试。

---

## 二、安装：30 秒上手

`win4r` 这个 fork 把版本锁定在 **`v0.3.4-hermes.4`**，附带了一份 `SECURITY_AUDIT.md` 安全审计报告，比直接装 PyPI 上的版本更稳。

### 2.1 标准安装

```bash
pip install "git+https://github.com/win4r/notebooklm-py@v0.3.4-hermes.4"
```

### 2.2 带浏览器支持（推荐）

```bash
pip install "notebooklm-py[browser] @ git+https://github.com/win4r/notebooklm-py@v0.3.4-hermes.4"
playwright install chromium
```

加上 `[browser]` extra 后就能用 Playwright 自动登录，省掉手动复制 cookie 的麻烦。

### 2.3 Hermes Agent 专用安装

如果你是 Hermes 用户：

```bash
VIRTUAL_ENV=~/.hermes/hermes-agent/venv uv pip install \
  "notebooklm-py[browser,cookies] @ git+https://github.com/win4r/notebooklm-py@v0.3.4-hermes.4"

~/.hermes/hermes-agent/venv/bin/playwright install chromium

mkdir -p ~/.local/bin
ln -sf ~/.hermes/hermes-agent/venv/bin/notebooklm ~/.local/bin/notebooklm
```

最后这行 `ln -sf` 是把 `notebooklm` 命令软链到 `~/.local/bin/`，这样在终端任何位置都能调用。

---

## 三、登录认证：三种姿势

NotebookLM 没有 OAuth，所以认证只能靠 cookie。项目提供了三种方案，**首推方案一**。

### 方案一：直接抓浏览器 Cookie（最省事）

```bash
notebooklm login --browser-cookies chrome
notebooklm auth check --test
```

这条命令会自动从你已登录的 Chrome 里读 cookie，**几乎零配置**。

由于 Google session 通常 15-30 分钟就过期，强烈建议在 `~/.hermes/.env`（或你常用的 shell rc 文件）里加一行：

```
NOTEBOOKLM_REFRESH_CMD=notebooklm login --browser-cookies chrome
```

设置后，cookie 过期时会**自动透明刷新**，你不会感知到。

### 方案二：Playwright 交互式登录

```bash
notebooklm login
# 企业 SSO 用户用 Edge：
notebooklm login --browser msedge
```

会弹一个浏览器窗口让你扫码 / 输密码，登完自动保存。

### 方案三：手动导出 Cookie（兜底方案）

装一个浏览器扩展叫 **"Get cookies.txt LOCALLY"**，导出 JSON 后：

```bash
python3 skills/notebooklm/import_browser_cookies.py /tmp/nb_cookies.json
rm /tmp/nb_cookies.json   # ⚠️ 用完立刻删，里面是你的 Google 登录态
```

> 🔐 **安全提示**：`~/.notebooklm/storage_state.json` 存的就是你的 Google 登录凭证，**当成密码看待**。项目自带 `.gitignore` 屏蔽，但别手贱去 `git add -A`。

---

## 四、CLI 速查：一条命令搞定一个流程

CLI 是最适合脚本化的入口，下面是一份"从零到产出"的完整 demo。

### 4.1 创建笔记本 & 选定上下文

```bash
notebooklm create "AI 研究"
notebooklm list                  # 列出所有笔记本
notebooklm use <notebook_id>     # 把某个笔记本设为当前默认上下文
```

`use` 之后，后续所有命令都默认作用在这个笔记本上，不用每次都传 ID。

### 4.2 批量导入资料

```bash
# 网页
notebooklm source add "https://arxiv.org/abs/2501.12345"

# 本地 PDF
notebooklm source add "./paper.pdf"

# 让 NotebookLM 自己去 Web 上找资料并自动入库
notebooklm source add-research "Diffusion Transformer"
```

`source add-research` 是**真·杀器**：传一个关键词，它会调用 NotebookLM 的 Research Agent 去全网检索，结果自动塞进笔记本，省掉你自己搜 + 整理的功夫。

### 4.3 提问

```bash
notebooklm ask "总结一下这些论文的核心方法"
```

### 4.4 生成各种内容

```bash
# 音频概览（播客）
notebooklm generate audio "make it engaging" --wait

# 视频概览（白板风格）
notebooklm generate video --style whiteboard --wait

# 电影感视频（纪录片风格）
notebooklm generate cinematic-video "documentary-style" --wait

# 测验
notebooklm generate quiz --difficulty hard

# 闪卡
notebooklm generate flashcards --quantity more

# PPT
notebooklm generate slide-deck

# 信息图
notebooklm generate infographic --orientation portrait

# 思维导图
notebooklm generate mind-map

# 数据表（用自然语言描述结构）
notebooklm generate data-table "对比各论文的核心方法、数据集、评测指标"
```

`--wait` 参数会一直 poll 到任务完成，省掉自己写轮询逻辑。

### 4.5 批量下载（重头戏）

```bash
notebooklm download audio              ./podcast.mp3
notebooklm download video              ./overview.mp4
notebooklm download cinematic-video    ./documentary.mp4
notebooklm download quiz       --format markdown ./quiz.md
notebooklm download flashcards --format json     ./cards.json
notebooklm download slide-deck         ./slides.pdf       # 也支持 .pptx
notebooklm download infographic        ./infographic.png
notebooklm download mind-map           ./mindmap.json
notebooklm download data-table         ./data.csv
```

注意 quiz / flashcards 的 `--format` 选项，**这是 Web UI 完全没有的能力**。

### 4.6 诊断命令

```bash
notebooklm auth check --test     # 检查登录状态
notebooklm metadata --json       # 输出当前笔记本元数据
notebooklm share status          # 查看分享设置
notebooklm language list         # 列出 50+ 语言代码
```

---

## 五、Python API：异步全家桶

CLI 适合写脚本，Python API 适合接进自己的应用。整个库基于 `asyncio`，下面是一个标准用法：

```python
import asyncio
from notebooklm import NotebookLMClient

async def main():
    async with await NotebookLMClient.from_storage() as client:
        # 1. 创建笔记本，导入网页
        nb = await client.notebooks.create("Research")
        await client.sources.add_url(
            nb.id,
            "https://example.com",
            wait=True,
        )

        # 2. 提问
        result = await client.chat.ask(nb.id, "Summarize this")
        print(result.answer)

        # 3. 生成 + 下载播客
        status = await client.artifacts.generate_audio(
            nb.id,
            instructions="make it fun",
        )
        await client.artifacts.wait_for_completion(nb.id, status.task_id)
        await client.artifacts.download_audio(nb.id, "podcast.mp3")

        # 4. 生成 + 导出测验为 JSON
        status = await client.artifacts.generate_quiz(nb.id)
        await client.artifacts.wait_for_completion(nb.id, status.task_id)
        await client.artifacts.download_quiz(
            nb.id,
            "quiz.json",
            output_format="json",
        )

        # 5. 生成 + 导出思维导图 JSON
        await client.artifacts.generate_mind_map(nb.id)
        await client.artifacts.download_mind_map(nb.id, "mindmap.json")

asyncio.run(main())
```

几个关键点：

- `NotebookLMClient.from_storage()` 会自动读 `~/.notebooklm/storage_state.json`，**不需要你管 cookie**
- `async with` 会保证 client 优雅退出，连接不泄漏
- 所有生成类操作都返回 `task_id`，配合 `wait_for_completion` 实现异步轮询
- `download_quiz` 这种 API 多了一个 `output_format` 参数——这就是 Web UI 拿不到的"结构化导出"

---

## 六、AI Agent 集成：让 Claude Code / Hermes 直接驱动 NotebookLM

这是整个项目最有想象力的玩法——**把 NotebookLM 变成 AI Agent 的工具**。

### 6.1 Claude Code / OpenClaw

```bash
npx skills add win4r/notebooklm-py
```

一行命令搞定。装完之后，Claude Code 就能用自然语言驱动整个 NotebookLM 流程，比如你跟它说：

> "把这 10 篇论文导入新笔记本，生成一个深度播客和思维导图，导出到 ./output/"

它会自己去调 `notebooklm create` → `source add` → `generate audio` → `download` 全流程。

### 6.2 Claude Code 的 `.agents/` 目录方式

```bash
notebooklm skill install
```

会把 Skill 写到当前项目的 `.agents/` 下，**只在当前项目生效**，适合给具体项目定制。

### 6.3 Hermes Agent

```bash
hermes skills tap add win4r/notebooklm-py
hermes skills install win4r/notebooklm-py/skills/notebooklm --force
```

记得**先装 Python 包**（参见第二节），并且把自动刷新命令塞到 `~/.hermes/.env`：

```
NOTEBOOKLM_REFRESH_CMD=notebooklm login --browser-cookies chrome
```

Hermes 子进程会自动继承这个环境变量，cookie 过期不用你管。

---

## 七、几个真实可玩的场景

### 场景一：论文自动播客流水线

每天早上跑一个定时任务：

1. 抓 arxiv 上你订阅的几个分类
2. 全部 `source add` 进同一个笔记本
3. `generate audio --wait`
4. 下载到本地 + 推送到你的播客 RSS

**通勤路上听昨天的论文摘要**——比逛 Twitter 高效十倍。

### 场景二：课程自动生成"学习包"

老师 / 培训讲师特别适合：

1. 把课件、教材、参考论文塞进笔记本
2. 一键生成 **PPT + 测验 + 闪卡 + 思维导图**
3. 测验导出 Markdown 直接给学生
4. 闪卡导出 JSON 喂给 Anki

### 场景三：竞品调研机器人

接到 Claude Code / OpenClaw 之后：

> "调研 NotebookLM 的所有竞品，每个都生成一份对比报告，最后产出一张数据表"

Agent 会自己跑 `add-research` → `generate report` → `generate data-table` → `download data-table`，**全程不用你点鼠标**。

---

## 八、踩坑提示

1. **API 不稳定性**：Google 可能随时改内部接口。如果哪天突然报错，先 `git pull` 看看 fork 有没有更新，或者去 [upstream](https://github.com/teng-lin/notebooklm-py) 看 issue。

2. **Cookie 过期**：默认 15-30 分钟，**一定要配 `NOTEBOOKLM_REFRESH_CMD`**，否则跑长任务跑一半挂掉很烦。

3. **Linux + Playwright**：第一次装可能缺系统依赖，跑一下 `playwright install-deps chromium` 即可。

4. **存储路径**：`~/.notebooklm/storage_state.json` 是登录态文件，**别上传到任何地方**（包括 GitHub Gist、ChatGPT 截图）。

5. **生产慎用**：再说一遍，这是非官方接口，**千万别接到生产业务**——一旦 Google 改 API，你的服务就挂了。

---

## 九、总结

如果你符合下面任何一条，这个项目值得花 10 分钟试一下：

- ✅ 重度 NotebookLM 用户，受够了 Web UI 的批量限制
- ✅ 想做"论文 → 播客"或者"课件 → 学习包"的自动化流水线
- ✅ 玩 Claude Code / Hermes / OpenClaw，希望给 Agent 加一个"超强研究工具"
- ✅ 单纯想白嫖 NotebookLM 的思维导图 / 测验 / PPT 数据，做二次加工

项目地址再贴一遍：

- 🔗 **本期主角（fork）**：<https://github.com/win4r/notebooklm-py>
- 🔗 **upstream 上游**：<https://github.com/teng-lin/notebooklm-py>

如果只是普通用法、不需要 Hermes，建议直接用 upstream（更新更快）；如果你是 Hermes 用户或者特别在意安全审计，就用 `win4r` 这个 fork（带 audit report 和锁版本）。

NotebookLM 本身已经是 2026 年最被低估的 AI 工具之一，再叠加 `notebooklm-py` 之后，它从一个"网页版 AI 研究助手"直接升维成了"**可编程的知识基础设施**"。

值得玩。
