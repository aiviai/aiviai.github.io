---
layout: single
title: "🚀OpenClaw重磅更新！浏览器自动化终极方案：龙虾自动接管Chrome浏览器，无需重复登录账号，真正实现浏览器自动化！还能将工作流打包成可复用Skill！全程无需人机验证！效率翻倍！龙虾保姆级教程！实测Chrome DevTools MCP Attach Mode"
sidebar:
  nav: "docs"
date: 2026-03-17 00:00:00 +0800
categories: AIAgents
tags: [OpenClaw, Clawdbot, Clawd, moltbook, MoltBot, AI智能体, Claude Code, Agent Teams, OpenClaw]
classes: wide
author_profile: true
---

# OpenClaw 真实 Chrome 模式配置笔记

## Chrome DevTools MCP Attach Mode是什么

OpenClaw 现在支持用内置的 **`profile="user"`** 连接你本机已经登录中的真实 Chrome 会话，而不是只使用默认的隔离浏览器。这个模式适合 **已有登录态、Cookie、现有标签页很重要** 的场景。省略 `profile` 时，OpenClaw 会使用 `browser.defaultProfile`；默认通常是 `openclaw`，也就是隔离浏览器。

> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1vYFQzQE4P/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/Smk5nisOZC0)


---

## 这个功能解决什么问题

适合解决这两类痛点：

1. 旧的隔离浏览器模式里，很多网站需要重新登录。
2. 某些网站在新浏览器环境里更容易再次触发验证码或风控；而真实 Chrome 模式可以直接复用你当前浏览器的登录态和已有会话。这个能力的官方定位就是“当现有登录和 Cookie 很重要时使用 `profile="user"`”。

---

## 使用前提

要使用 `profile="user"`，需要满足这些条件：

* **Chrome 和 OpenClaw Gateway 必须在同一台机器上**，因为 `user` 是 **host-only** 模式，不适合远程服务器、Linux 容器或 VPS。
* 本机需要安装 **Google Chrome**，Doctor 会检查它是否存在，并在版本低于 **Chrome 144** 时给出提醒。
* 需要在浏览器 inspect 页面里启用 remote debugging，官方示例入口是 `chrome://inspect/#remote-debugging`。Doctor 会提醒你做这一步，但不能替你开启。
* 使用时本机 Chrome 需要正在运行，而且至少有一个打开的标签页，否则可能出现 `No Chrome tabs found for profile="user"`。
* 首次附着时，你需要人在电脑前点击批准或确认 attach 提示。

---

## 配置文件位置

OpenClaw 的配置文件默认路径是：

```bash
~/.openclaw/openclaw.json
```

如果这个文件不存在，OpenClaw 会使用默认配置。

---

## 最简配置方案

如果你只是想让 OpenClaw 默认优先使用真实 Chrome，可以把配置文件写成这样：

```json
{
  "browser": {
    "enabled": true,
    "defaultProfile": "user"
  }
}
```

省略 `profile` 时会走 `browser.defaultProfile`，而官方说明它默认通常是 `openclaw`；改成 `"user"` 后，就会默认走真实 Chrome 模式。

---

## 完整一点的配置方案

如果你想明确写出 `user` profile，可以用这一版：

```json
{
  "browser": {
    "enabled": true,
    "defaultProfile": "user",
    "profiles": {
      "user": {
        "driver": "existing-session",
        "attachOnly": true,
        "color": "#00AA00"
      }
    }
  }
}
```

Doctor 文档明确说明，旧的扩展路径迁移后，`browser.profiles.*.driver: "extension"` 会被规范成 `"existing-session"`；这正是 host-local Chrome MCP attach 模式使用的驱动类型。

---

## 改完配置后怎么生效

改完 `~/.openclaw/openclaw.json` 后，重启 OpenClaw Gateway，再进行测试。配置文件本身是 Gateway 读取的。

---

## Chrome 侧需要做什么

1. 打开本机 Google Chrome。
2. 至少打开一个标签页。
3. 到下面这个地址启用 remote debugging：

```text
chrome://inspect/#remote-debugging
```

官方 Doctor 页面明确把这一步列为真实 Chrome 模式的前置要求。

---

## 推荐的检查顺序

### 1）先跑 Doctor

```bash
openclaw doctor
```

Doctor 会检查：

* Chrome 是否安装在同一台主机上
* 版本是否过低
* 是否需要启用 `chrome://inspect/#remote-debugging`
* 是否还残留旧的扩展式配置并自动规范迁移提示。

### 2）查看浏览器 profiles

```bash
openclaw browser profiles
```

`browser` CLI 文档明确说明，profile 是命名的浏览器路由配置；内置 profile 包括 `openclaw` 和 `user`。

### 3）测试真实 Chrome 是否能列出标签页

```bash
openclaw browser --browser-profile user tabs
```

如果能看到当前本机 Chrome 的标签页，说明基本打通。这个命令是官方 CLI 文档的标准用法。

### 4）再测试状态

```bash
openclaw browser --browser-profile user status
```

这是验证 profile 是否可达的常用方法，CLI 文档中 `--browser-profile <name>` 就是用来显式指定 profile 的。

---

## 在聊天里怎么调用

如果你是在 Telegram、MacBot 或其他 OpenClaw 聊天入口里调用，建议写得明确一点：

```text
请调用 browser tool，使用 profile="user"，打开 https://www.google.com
```

原因很简单：官方说明当 `profile` 被省略时，会使用 `browser.defaultProfile`；如果你没有改默认值，它大概率还是走隔离浏览器 `openclaw`，而不是真实 Chrome。

---

## 什么时候该用 `profile="user"`

适合这些场景：

* 你已经在 Chrome 中登录了 GitHub、Gmail、X、Reddit、OpenAI、Claude 等网站，希望 OpenClaw 直接复用当前会话。
* 你已经手动打开了某些标签页，希望 OpenClaw 继续在这些现有 tab 上操作。CLI 文档明确说明 `user` 是控制现有已登录 Chrome 会话。
* 你人在电脑前，愿意处理首次 attach 批准或偶发人工确认。

---

## 什么时候不该用 `profile="user"`

不适合这些情况：

* OpenClaw 跑在远程服务器、Docker、容器或 Linux 无头环境里，而 Chrome 在你本地电脑。`user` 是 host-only。
* 你想做完全无人值守、后台持续跑的浏览器任务。`user` 依赖本机 Chrome 会话，也可能需要人工批准。
* 你不想让 AI 接触你真实浏览器里的登录态和 Cookie。这时更适合继续用默认的 `openclaw` 隔离浏览器。

---

## 常见报错与处理

### 报错 1：`No Chrome tabs found for profile="user"`

含义：OpenClaw 看到了本机 Chrome attach 模式，但没有可附着的标签页。

处理方式：

* 确保 Chrome 已经打开
* 确保至少有一个 tab 正在打开
* 重新执行：

```bash
openclaw browser --browser-profile user tabs
```

官方 Linux 浏览器排障页就是这么写的。

### 报错 2：attach-only profile 不可达

Gateway Troubleshooting 中提到，如果 attach-only profile 没有可用目标，会出现类似 “Browser attachOnly is enabled ... not reachable” 的错误。通常说明 Chrome 侧 remote debugging 还没准备好，或者没有可附着的 live target。

### 报错 3：版本太低或 Doctor 警告 Chrome 144 以下

Doctor 会在版本低于 Chrome 144 时给提醒。升级 Chrome 后再试。

---

## 和 Chrome 扩展模式的区别

如果你看到旧文档或中文文档里仍然提到 `chrome` profile 和扩展 relay，要注意：

* 新的 host-local 真实浏览器 attach 路径，官方现在主推的是 **`user` + `existing-session`**。
* Chrome 扩展模式仍然存在，但官方明确写了：如果你想用 Chrome 官方 DevTools MCP attach 流程，而不是扩展 relay，就应该用 `existing-session` profile。
* 中文 CLI 页面里还显示 `chrome` 作为扩展 relay profile，这说明部分中文页面内容可能落后于最新文档；配置时优先参考英文官方文档。

---

## 一套可以直接复制给别人的最简步骤

### 第一步：编辑配置

```bash
nano ~/.openclaw/openclaw.json
```

填入：

```json
{
  "browser": {
    "enabled": true,
    "defaultProfile": "user"
  }
}
```

配置文件路径是官方固定默认路径。

### 第二步：Chrome 侧准备

* 打开 Google Chrome
* 至少打开一个标签页
* 打开：

```text
chrome://inspect/#remote-debugging
```

并启用 remote debugging。

### 第三步：重启 Gateway

重启 OpenClaw Gateway，让新配置生效。配置由 Gateway 读取。

### 第四步：运行检查

```bash
openclaw doctor
openclaw browser profiles
openclaw browser --browser-profile user tabs
openclaw browser --browser-profile user status
```

这些都是官方文档中的标准检查路径。

### 第五步：聊天中调用

```text
请调用 browser tool，使用 profile="user"，打开 https://www.google.com
```

这样可以避免 OpenClaw 因为默认 profile 仍是 `openclaw` 而没有使用真实 Chrome。

---


<img src="https://private-user-images.githubusercontent.com/42172631/313519233-7568cf78-c8ba-4182-aa96-d524d903f2bc.jpeg?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzM3NDQ3NTgsIm5iZiI6MTc3Mzc0NDQ1OCwicGF0aCI6Ii80MjE3MjYzMS8zMTM1MTkyMzMtNzU2OGNmNzgtYzhiYS00MTgyLWFhOTYtZDUyNGQ5MDNmMmJjLmpwZWc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMxN1QxMDQ3MzhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMzFlN2UwZmEyYmI1MThlOGVhOTQ0ZmJjOGMwYWFhYmRiZmUwNjdlM2M4ODM5ZDM2YzBkYWFmM2JmZmYwMzkwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7BRSFAaGC9AmP1X2nE6nOfGQo-ZgmdHbhP1iETXFJRQ" width="214.8" height="291" style="max-width: 100%; height: auto; max-height: 291px;">

