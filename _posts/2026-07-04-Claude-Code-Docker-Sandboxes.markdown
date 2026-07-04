---
layout: single
title: "🚀Claude Code有后门？立即锁进Docker Sandboxes里！sbx完整实测：Claude Code、Codex、OpenCode如何安全隔离运行！防隐私泄露、防恶意Skill和MCP"
sidebar:
  nav: "docs"
date: 2026-07-04 00:00:00 +0800
categories: LLMs
tags: [Claude, Claude Code, Docker Sandboxes, Subagents, Agent Teams, Skills, MCP, 多Agent, AI编程, AGI, AIGC]
classes: wide
author_profile: true
---


# Docker Sandboxes 入门到常用命令：把 AI Agent 关进“安全开发舱”

AI 编程工具越来越强，但问题也越来越现实：我们到底要不要让 Claude Code、Codex、Gemini 这类 agent 直接跑在自己的电脑上？它们能读项目、执行命令、安装依赖、访问网络，效率很高，但风险也不小。Docker Sandboxes 的定位就是给这些 AI agent 提供一个隔离运行环境：让 agent 能开发、能跑命令、能装依赖，但不要默认拥有整台电脑的访问能力。

Docker 官方文档里对 `sbx` 的定位很清楚：它是 Docker Sandboxes 的 CLI。你可以用它启动 agent、管理 sandbox、控制网络访问、挂载项目目录、转发端口、保存 secret，甚至让 agent 在 sandbox 内使用独立 Docker daemon 构建镜像。更重要的是，Docker Desktop 不是使用 `sbx` 的必要条件。

<iframe width="800" height="450" src="https://www.youtube.com/embed/oB5OzfZyOqo" title="Claude Code Workflow 实测" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 一、安装 Docker Sandboxes

### macOS 安装

```bash
brew trust docker/tap
brew install docker/tap/sbx
sbx login

cd ~/my-project
sbx run claude
```

`sbx login` 会打开浏览器，让你用 Docker 账号登录。第一次登录或重置策略后，CLI 会让你选择默认网络策略：Open、Balanced、Locked Down。官方建议多数开发工作从 Balanced 开始，因为它默认拒绝未知出站流量，但允许常见开发站点、AI Provider、包管理器、代码托管、容器 registry 等。

### Windows 安装

```powershell
winget install -h Docker.sbx
sbx login

cd ~/my-project
sbx run claude
```

Windows 用户同样通过 `sbx login` 登录，然后进入项目目录启动 agent。常规体验和 macOS 类似。

### Linux 安装

```bash
curl -fsSL https://get.docker.com | sudo REPO_ONLY=1 sh
sudo apt-get install docker-sbx
sudo usermod -aG kvm $USER
newgrp kvm
sbx login

cd ~/my-project
sbx run claude
```

Linux 上需要注意 KVM 权限。执行 `usermod -aG kvm` 后，需要重新登录，或者用 `newgrp kvm` 让当前 shell 立即获得权限。

## 二、最基础的日常命令

启动一个 Claude Code sandbox：

```bash
sbx run claude
```

查看已有 sandbox：

```bash
sbx ls
```

停止 sandbox，但保留状态：

```bash
sbx stop <sandbox-name>
```

删除 sandbox，彻底清理它的内部状态：

```bash
sbx rm --force <sandbox-name>
```

进入 sandbox shell：

```bash
sbx exec -it <sandbox-name> bash
```

官方文档给出的基本生命周期就是：`run` 启动，`ls` 查看，`stop` 暂停，`rm` 清理。要记住，`stop` 只是停掉，状态还在；`rm` 才是删除。删除 sandbox 后，里面安装的包、内部 Docker images、containers、volumes 都会一起消失。但如果你使用的是 direct mount 模式，agent 已经写到 host 项目目录里的文件不会因为 `sbx rm` 被删除。

## 三、给 sandbox 起名字

默认情况下，`sbx run claude` 会根据 agent 和工作目录生成名字，比如 `claude-test`。但更推荐显式命名：

```bash
sbx run claude --name myproject-claude
```

之后你可以从任意目录重新连接：

```bash
sbx run --name myproject-claude
```

如果你想对同一个项目跑多个实验，也可以起不同名字：

```bash
sbx run claude --name feature ~/my-project
sbx run claude --name spike ~/my-project
```

两个 sandbox 可以挂载同一个 workspace，但它们的内部状态彼此独立。

## 四、如何传参数给 Claude Code

这是很多人第一次会踩坑的地方。`sbx run` 有自己的参数，Claude Code 也有自己的参数。要把参数传给 sandbox 里的 Claude Code，需要用 `--` 分隔：

```bash
sbx run claude -- --dangerously-skip-permissions
```

规则是：

```bash
sbx run claude [sbx自己的参数] -- [传给claude的参数]
```

例如：

```bash
sbx run claude --name claude-test -- --dangerously-skip-permissions
```

`--dangerously-skip-permissions` 不是 `sbx` 的参数，而是 Claude Code 的参数。如果少了中间的 `--`，`sbx` 会报：

```text
ERROR: unknown flag: --dangerously-skip-permissions
```

需要注意的是，在 `sbx` 里用这个参数，风险确实比直接在 host 上小，但并不是零风险。Direct mount 模式下，Claude Code 仍然可以修改当前挂载进去的项目文件。

## 五、Direct Mode 和 Clone Mode 怎么选

默认是 Direct Mode。你在项目目录里运行：

```bash
cd ~/Projects/myproject
sbx run claude
```

这时当前项目目录会被直接挂进 sandbox。Claude 改文件，host 上立即可见。这个模式最适合日常开发，尤其是 macOS/iOS 项目：Claude 在 sandbox 里改代码，Xcode 在 host 上构建和运行。

更隔离的方式是 Clone Mode：

```bash
cd ~/Projects/myproject
sbx run --clone claude
```

Clone Mode 会在 sandbox 里创建一个私有 Git clone，host 仓库以只读方式挂载。agent 的提交可以通过 host 上的 `sandbox-<name>` remote 拉回来。这个模式适合高风险重构、并行任务、探索性修改。缺点是 host 工作区不会立即看到改动，需要 `git fetch sandbox-<name>` 取回。

Direct Mode 简单高效，Clone Mode 隔离更强。个人日常开发建议默认 Direct Mode；不确定 agent 会不会大改时，再用 `--clone`。

## 六、多个目录和只读挂载

你可以给 sandbox 挂多个目录：

```bash
sbx run claude ~/project-a ~/shared-libs:ro ~/docs:ro
```

第一个路径是主 workspace，agent 会从这里启动。后面的路径是额外 workspace。加 `:ro` 表示只读挂载，适合挂文档、参考代码、公共库，避免 agent 误改。

不建议把整个 `~/Projects` 或 `~` 都挂进去。更安全的做法是：每个项目进入自己的目录启动，让 sandbox 只看到当前项目和必要的只读参考资料。

## 七、端口转发：让浏览器访问 sandbox 里的服务

sandbox 默认是网络隔离的。agent 在里面启动了开发服务器后，host 浏览器不能直接访问。需要发布端口：

```bash
sbx ports my-sandbox --publish 8080:3000
open http://localhost:8080
```

也可以让系统自动选择 host 端口：

```bash
sbx ports my-sandbox --publish 3000
sbx ports my-sandbox
```

停止转发：

```bash
sbx ports my-sandbox --unpublish 8080:3000
```

这对前端项目、API 服务、文档站点都很实用。

## 八、复制文件进出 sandbox

如果文件不在挂载的 workspace 里，可以用 `sbx cp`：

```bash
sbx cp ./config.json my-sandbox:/home/user/
sbx cp my-sandbox:/home/user/output.log ./
sbx cp ./src/ my-sandbox:/home/user/src
```

注意，复制时必须有一端使用 `SANDBOX:PATH` 形式。Docker 文档也说明，不支持直接在两个 sandbox 之间复制。

## 九、网络策略：给 agent 上“访问规则”

`sbx` 的网络策略非常重要。官方文档说明，sandbox 出站 HTTP/HTTPS 流量会通过 host 上的代理执行访问规则。第一次登录时可以选择 Open、Balanced、Locked Down。

手动初始化策略：

```bash
sbx policy init balanced
```

允许访问某个域名：

```bash
sbx policy allow network api.anthropic.com
```

阻止某个域名：

```bash
sbx policy deny network ads.example.com
```

只对某个 sandbox 生效：

```bash
sbx policy allow network --sandbox my-sandbox api.example.com
```

一次允许多个：

```bash
sbx policy allow network "api.anthropic.com,*.npmjs.org,*.pypi.org"
```

查看策略：

```bash
sbx policy ls
```

如果公司启用了组织级治理，local policy 会失效。Docker FAQ 明确说，组织管理员可以通过 Docker Admin Console 集中管理网络和文件系统策略；当组织治理开启时，它会替代本机 `sbx policy` 规则，本地规则不再参与评估。这是付费组织治理能力，适合团队统一管控 agent 能访问什么、能挂载什么路径。

## 十、Secret 和凭据

很多 agent 需要 Anthropic、OpenAI、GitHub 等 token。`sbx secret` 用来管理这类凭据。

例如给后续新 sandbox 配 GitHub token：

```bash
echo "$(gh auth token)" | sbx secret set -g github
```

`-g` 表示 global，对未来创建的 sandbox 生效。已有 sandbox 不会自动拿到新的 global secret，需要单独配置。

如果你只想在当前 shell 临时传入，也可以用环境变量配合 `sbx run`。如果某个环境变量不是 `sbx secret` 支持的服务类型，Docker FAQ 建议写入 sandbox 内的 `/etc/sandbox-persistent.sh`，让它在 sandbox 生命周期内持久生效。

## 十一、更新 Claude Code 和模板

`sandbox` 里的 Claude Code 不等于 host 上的 `claude`。如果你卸载了 host 上通过 Homebrew 安装的 Claude Code，`sbx run claude` 仍然使用自己的 template。

查看 template：

```bash
sbx template ls
```

删除旧 Claude template，让下次重新拉取：

```bash
sbx template rm docker.io/docker/sandbox-templates:claude-code-docker
```

或者用 `IMAGE ID` 删除：

```bash
sbx template rm 9a3bab17aae9
```

更新当前已有 sandbox 里的 Claude Code：

```bash
sbx exec <sandbox-name> claude --version
sbx exec <sandbox-name> claude update
sbx exec <sandbox-name> claude --version
```

如果你想让以后新建 sandbox 默认更新，通常做法是删除旧 sandbox 和旧 template，再重新 `sbx run claude`。不要轻易用 `sbx reset`，它会清更多状态，包括 sandboxes、cache、policy、secret、登录状态等。

## 十二、关闭遥测数据

Docker FAQ 说明，`sbx` CLI 会收集基础使用数据，例如运行了哪个命令、成功还是失败、耗时、登录用户名等；同时也说明 Docker Sandboxes 不会监控 session、不会读取 prompts、不会访问代码。

如果要关闭 analytics：

```bash
export SBX_NO_TELEMETRY=1
```

为了长期生效，写进 zsh 配置：

```bash
echo 'export SBX_NO_TELEMETRY=1' >> ~/.zshrc
source ~/.zshrc
```

验证：

```bash
echo $SBX_NO_TELEMETRY
```

应输出：

```text
1
```

如果 `sbx daemon` 已经在没有这个变量的环境下启动，可以重启一次：

```bash
sbx daemon stop
SBX_NO_TELEMETRY=1 sbx daemon start -d
```

## 十三、常用清理命令

列出 sandbox：

```bash
sbx ls
```

删除不用的 sandbox：

```bash
sbx rm --force claude-test1 claude-untitled-folder
```

删除所有 sandbox 前，先确认列表：

```bash
sbx ls
```

再谨慎执行：

```bash
sbx rm --force $(sbx ls | awk 'NR>1 {print $1}')
```

如果使用 `--clone`，删除前一定要确认改动已经 fetch 回 host 或 push 到远端。Docker 文档提醒，删除 clone-mode sandbox 会一起删除 sandbox 内的 clone；未 fetch 或未 push 的提交会丢失。

## 结语

Docker Sandboxes 的核心价值，不是让 AI agent 变得“绝对安全”，而是把风险控制在更清晰的边界里。它让 Claude Code 这类工具仍然能读写项目、安装依赖、运行服务、构建容器，但不再默认拥有整台电脑的访问面。个人开发可以用 Direct Mode 获得最高效率；高风险任务可以用 Clone Mode；团队环境可以通过组织级 policy 和 audit log 做统一治理。

如果你准备长期使用 AI 编程工具，`sbx` 很适合成为默认入口：项目进目录，执行 `sbx run claude`，需要跳过 Claude Code 内部确认就用 `--` 传参，需要隔离就加 `--clone`，不用的 sandbox 及时 `sbx rm`。掌握这些命令之后，AI agent 的效率和安全边界会同时变得更可控。

