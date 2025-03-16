---
layout: single  
title: "🚀实战详解MCP，从入门到开发！小白也能看懂！MCP推动AI智能体大爆发！Cline+Claude3.7打造论文搜索MCP Server！集成到AutoGen+smolagents智能体框架！AGI到来"  
sidebar:
  nav: "docs"
date: 2025-03-16 10:00:00 +0800  
categories: AIAgents  
tags: [MCP, MCP Server, Cline, AutoGen, smolagents, Claude3.7]  
classes: wide  

author_profile: true  
---

MCP（Model Context Protocol）是一个开源协议，旨在简化AI模型与外部数据源、工具和系统的连接，从而对AI智能体开发产生了深远的影响。它提供了一个标准化的方法，使得AI智能体能够更轻松地访问和利用各种资源，从而提升其功能性和开发效率。以下是从MCP对AI智能体开发影响力的角度进行的详细介绍：


### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/lXC0XdH)
- [👉👉👉 通过YouTube观看](https://youtu.be/vYm0brFoMwA)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


## 🚀观看我之前发布的MCP与AI智能体相关视频

| 类别 | 视频链接 |
|------|----------|
| MCP相关视频 | [MCP视频1](https://youtu.be/szTXELuaJos) |
| MCP相关视频 | [MCP视频2](https://youtu.be/RxR3x_Uyq4c) |
| MCP相关视频 | [MCP视频3](https://youtu.be/jsd8TpzicRQ) |
| MCP相关视频 | [MCP视频4](https://youtu.be/kFwE4hHbkT0) |
| MCP相关视频 | [MCP视频5](https://youtu.be/7BFMY0yuRAY) |
| AI智能体相关视频 | [AI智能体视频1](https://youtu.be/szTXELuaJos) |
| AI智能体相关视频 | [AI智能体视频2](https://youtu.be/IrTEDPnEVvU) |
| AI智能体相关视频 | [AI智能体视频3](https://youtu.be/wwN3oAugc4c) |


### 1. **简化集成**

MCP通过提供一个统一的接口，使得AI智能体能够动态地与外部数据源和工具进行交互。开发者无需为每个服务或数据源编写定制化的集成代码，这显著降低了开发成本和时间。例如，一个AI智能体可以通过MCP快速连接到数据库、API或第三方工具，而无需复杂的适配工作。

### 2. **增强互操作性**

作为一个开放标准，MCP促进了不同AI系统、模型和工具之间的互操作性。这种标准化设计允许开发者灵活地选择和组合不同的技术组件，从而构建功能更强大的AI应用。例如，一个基于MCP的AI智能体可以无缝整合来自多个供应商的模型或服务，提升其适用范围和性能。

### 3. **提高可扩展性**

MCP采用模块化设计，使得AI应用的扩展变得更加简单。当需求发生变化时，开发者可以轻松添加或替换MCP服务器，而无需对整个系统进行大规模重构。这种灵活性确保了AI智能体能够快速适应新的用例或技术进步，从而延长系统的生命周期。

### 4. **促进社区协作**

由于MCP是开源的，它鼓励全球开发者社区的参与和贡献。这种开放性加速了新工具、服务和功能的开发，为AI智能体开发者提供了丰富的资源和选择。例如，社区可能开发出新的MCP兼容插件，进一步扩展AI智能体的能力。

### 5. **提升AI智能体的自主性**

通过MCP，AI智能体能够更自主地执行复杂任务，例如数据分析、决策制定以及与外部系统的交互。这种能力减少了对人工干预的依赖，使得AI智能体在实际应用中更加高效和独立。例如，一个配备MCP的智能体可以根据实时数据自主调整策略，而无需人工重新配置。

MCP对AI智能体开发的影响是多方面的：它简化了集成过程、增强了互操作性、提高了可扩展性、促进了社区协作，并显著提升了AI智能体的自主性。通过提供一个标准化的连接框架，MCP不仅降低了开发门槛，还为AI技术的创新和广泛应用开辟了新的可能性。对于AI智能体开发者而言，MCP是一个强大的工具，能够助力构建更智能、更灵活的系统。

### MCP Server

[https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

### python和node.js安装

[https://www.python.org/downloads/release/python-3110/](https://www.python.org/downloads/release/python-3110/)

[https://nodejs.org/zh-cn/download](https://nodejs.org/zh-cn/download)

```bash
pip install uv
```

### arxiv论文检索代码

```bash
#------------------------------🔥js版本------------------------------

# npm install axios xml2js

const axios = require('axios');
const xml2js = require('xml2js');

async function searchArxiv() {
    const query = 'robotics+technology+in+electronic+information+engineering';
    const url = `http://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=5&sortBy=submittedDate`;

    try {
        const response = await axios.get(url);
        const parser = new xml2js.Parser();
        parser.parseString(response.data, (err, result) => {
            if (err) {
                console.error("解析错误:", err);
                return;
            }
            const entries = result.feed.entry || [];
            entries.forEach((entry, index) => {
                console.log(`论文 ${index + 1}:`);
                console.log(`标题: ${entry.title[0]}`);
                console.log(`作者: ${entry.author.map(a => a.name[0]).join(', ')}`);
                console.log(`摘要: ${entry.summary[0]}`);
                console.log(`发布时间: ${entry.published[0]}`);
                console.log(`PDF 链接: ${entry.link.find(link => link.$.title === 'pdf').$.href}\n`);
            });
        });
    } catch (error) {
        console.error("请求失败:", error);
    }
}

searchArxiv();

#------------------------------🔥python版本------------------------------

# pip install arxiv

import arxiv

# 定义查询关键词
query = "robotics technology in electronic information engineering"

# 执行搜索
search = arxiv.Search(
    query=query,
    max_results=5,  # 限制返回论文数量
    sort_by=arxiv.SortCriterion.SubmittedDate  # 按提交时间排序
)

# 打印论文信息
for result in search.results():
    print(f"标题: {result.title}")
    print(f"作者: {', '.join([author.name for author in result.authors])}")
    print(f"摘要: {result.summary}")
    print(f"发布时间: {result.published}")
    print(f"PDF链接: {result.pdf_url}\n")

```

### AutoGen和smolagents代码

```bash
export OPENAI_API_KEY=sk-proj-xxxxxxxxxx
set OPENAI_API_KEY=sk-proj-xxxxxxxxxx

# pip install -U "autogen-agentchat" "autogen-ext[openai]" "autogen-ext[mcp]" "mcp-server-fetch" "autogen-ext[http-tool]"

### 示例1 - 
import asyncio  # 导入异步IO库，用于支持异步编程
from autogen_agentchat.agents import AssistantAgent  # 导入助手代理，用于创建AI助手
from autogen_ext.models.openai import OpenAIChatCompletionClient  # 导入OpenAI聊天完成客户端
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools  # 导入MCP工具相关的功能

async def main() -> None:
    # 从mcp-server-fetch获取fetch工具
    # 创建一个标准输入输出服务器参数对象，指定要运行的Node.js程序及其参数
    arxiv_mcp_server = StdioServerParams(
        command="node",  # 使用node命令
        args=["/Users/charlesqin/Documents/Cline/MCP/arxiv-search/build/index.js"]  # 指定要运行的JavaScript文件路径
    )
    # 异步获取MCP服务器工具，这些工具将允许代理与外部服务器通信
    tools = await mcp_server_tools(arxiv_mcp_server)

    # 创建一个可以使用fetch工具的代理
    # 初始化OpenAI聊天完成客户端，使用gpt-4o-mini模型
    model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")

    # 将连字符改为下划线在代理名称中
    # 创建一个助手代理实例
    agent = AssistantAgent(
        name="arxiv_searcher",  # "arxiv_searcher"
        model_client=model_client,  # 设置模型客户端
        tools=tools,  # 配置可用工具
        reflect_on_tool_use=True  # 启用工具使用反思功能，代理将分析其工具使用的有效性
    )

    # 让代理获取URL的内容并进行摘要
    # 运行代理来执行指定的任务，这里是搜索微调Llama3的论文
    result = await agent.run(task="搜索微调Llama3的论文")
    # 打印代理返回的最后一条消息内容，即任务执行结果
    print(result.messages[-1].content)

if __name__ == "__main__":
    # 如果这个脚本是直接运行的（不是被导入的），则执行main函数
    asyncio.run(main())  # 使用asyncio运行异步main函数

--------------------------------------------------------------------

# pip install smolagents

from smolagents import ToolCollection, CodeAgent
from mcp import StdioServerParameters
import os
from smolagents import OpenAIServerModel

model = OpenAIServerModel(
    model_id="gpt-4o-mini",
    api_base="https://api.openai.com/v1",
    api_key=os.environ["OPENAI_API_KEY"],
)

server_parameters = StdioServerParameters(
    command="uvx",
    args=["--quiet", "mcp-server-fetch"],
    env={"UV_PYTHON": "3.11", **os.environ},
)

with ToolCollection.from_mcp(server_parameters) as tool_collection:
    agent = CodeAgent(tools=[*tool_collection.tools], model=model, add_base_tools=True)
    agent.run("总结这篇博客的内容：https://www.aivi.fyi/llms/introduce-Gemma3")

```