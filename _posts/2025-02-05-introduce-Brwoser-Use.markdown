---
layout: single
title: "🚀取代ChatGPT Operator！支持DeepSeek！Browser Use最强浏览器自动化框架，支持Roo Code轻松实现MCP Server集成Claude桌面版"
sidebar:
  nav: "docs"
date: 2025-02-05 00:00:00 +0800
categories: AIAgents
tags: [Browser Use, Web UI , Mistral AI, Roo Code, MCP Server, Claude, ChatGPT Operator]
classes: wide
author_profile: true
---

Browser-use是一款开源的基于AI的智能浏览器自动化工具， 而且这款开源项目分为命令行版本和web UI版本，并且支持deepseek、gpt-4o在内的开源和闭源模型。 我们可以使用这款开源项目轻松实现浏览器自动化操作，执行订机票、浏览网页、点击链接、提取信息，甚至填写表单、订机票等复杂操作。 用户可以使用自然语言来指示AI执行任务，大大降低了开发者需要编写代码的需求。 甚至可以替代OpenAI 推出的ChatGPT Operator功能，因为OpenAI 推出的ChatGPT Operator功能.

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1sgFDeuEtZ/)
- [👉👉👉 通过YouTube观看](https://youtu.be/jsd8TpzicRQ)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🚀命令和代码如下

```bash
pip install uv

uv venv myenv

source myenv/bin/activate

# webUI
git clone https://github.com/browser-use/web-ui.git

cd web-ui

pip install -r requirements.txt

cp .env.example .env

python webui.py --ip 127.0.0.1 --port 7788

### 无UI版
pip install browser-use

pip install playwright

playwright install

import os
from langchain_openai import ChatOpenAI
from browser_use import Agent, Browser, BrowserConfig
import asyncio

# 无头模式
browser = Browser(
	config=BrowserConfig(
		headless=False,
        disable_security=True
    )
)

os.environ['OPENAI_API_KEY']="sk-proj--xxxxx"

async def main():
    agent = Agent(
        task="搜索AI超元域的GitHub项目并进入",
        llm=ChatOpenAI(model="gpt-4o-mini",),
        browser=browser
    )
    result = await agent.run()
    print(result)

asyncio.run(main())

import os
import argparse
from langchain_openai import ChatOpenAI
from browser_use import Agent, Browser, BrowserConfig
import asyncio

# 默认配置
DEFAULT_API_KEY = "sk-proj-xxxxxxxx"
DEFAULT_MODEL = "gpt-4o-mini"

async def run_agent(task: str, model: str = DEFAULT_MODEL, api_key: str = None) -> str:
    """
    使用指定参数运行浏览器代理。

    参数：
        task (str): 代理的任务描述
        model (str): 要使用的 OpenAI 模型
        api_key (str): OpenAI API 密钥。如果为空，将尝试使用环境变量或默认值

    返回：
        str: 代理返回的结果
    """
    # API key 优先级：
    # 1. 命令行参数传入的 api_key
    # 2. 环境变量 OPENAI_API_KEY
    # 3. 代码中的默认值 DEFAULT_API_KEY
    if api_key:
        os.environ['OPENAI_API_KEY'] = api_key
    elif 'OPENAI_API_KEY' not in os.environ:
        os.environ['OPENAI_API_KEY'] = DEFAULT_API_KEY

    # Initialize the agent
    agent = Agent(
        task=task,
        llm=ChatOpenAI(model=model),
        # 无头模式
        browser=Browser(
            config=BrowserConfig(
                headless=False,
                disable_security=True
            )
        )
    )

    # Run the agent and return result
    return await agent.run()

def parse_arguments():
    """解析命令行参数."""
    parser = argparse.ArgumentParser(description='Browser Agent CLI')

    parser.add_argument(
        '--task',
        type=str,
        required=True,
        help='Task description for the agent'
    )

    parser.add_argument(
        '--model',
        type=str,
        default=DEFAULT_MODEL,
        help=f'OpenAI model to use (default: {DEFAULT_MODEL})'
    )

    parser.add_argument(
        '--api-key',
        type=str,
        required=False,  # 不再是必需参数
        help='OpenAI API key (optional, will use default if not provided)'
    )

    return parser.parse_args()

async def main():
    """运行代理程序的主函数，使用命令行参数。"""
    # 解析命令行参数
    args = parse_arguments()

    try:
        # Run the agent
        result = await run_agent(
            task=args.task,
            model=args.model,
            api_key=args.api_key
        )
        print(result)

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        exit(1)

if __name__ == "__main__":
    asyncio.run(main())

### MCP Server
请用为我实现MCP Tool，并命名为browser-use，当我需要搜索相关内容的时候，请执行下面的命令进行搜索并且返回搜索结果。
需要搜索的内容请放在--task参数里：

cd /Users/charlesqin/PycharmProjects/PythonProject && \
source /Users/charlesqin/PycharmProjects/PythonProject/.venv/bin/activate && \
python app.py \
--task "Visit the blog www.aivi.fyi and summarize the content of the first post."

```