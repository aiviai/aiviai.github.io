---
layout: single
title: "🚀Cursor降低智商！WindSurf零代码开发MCP Server！五分钟轻松实现LightRAG+MCP为Claude和AutoGen挂载知识库！增强Claude和AutoGen的知识库检索能力"
sidebar:
  nav: "docs"
date: 2025-03-23 00:00:00 +0800
categories: AIAgents
tags: [MCP, MCP Server, Cursor, WindSurf, AI编程]
classes: wide
author_profile: true
---


使用WindSurf开发LightRAG MCP服务器，增强Claude和AutoGen的知识库能力。本视频展示如何使用WindSurf（无需编写代码）开发一个LightRAG MCP服务器，并将其集成到Claude桌面版和AutoGen智能体框架中，提供强大的知识库检索功能。

随着人工智能技术的不断突破，编程工具正迎来前所未有的变革。由 Codeium 团队推出的 WindSurf，以全新的 AI Flow 范式和多工具协同能力，正逐步超越备受关注的 Cursor，成为开发者提高工作效率的利器。

WindSurf 的最大亮点在于其深度上下文理解能力。传统的编程助手往往只能对简单代码片段进行补全，而 WindSurf 则能智能捕捉项目整体结构、变量关系以及函数调用链，无需开发者反复输入提示。它能够主动预测需求，在代码编写、重构、调试等过程中提供精准建议，从而大幅减少手动调试和反复确认的时间。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1P6XYYgEjY/)
- [👉👉👉 通过YouTube观看](https://youtu.be/KGZ_zM6Xi-U)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA)  
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  


WindSurf 内置了一整套工具集成系统。无论是文件搜索、目录管理，还是命令行执行，所有功能均实现无缝衔接。借助这一系统，开发者只需在一个平台内就能完成项目管理、代码编辑、依赖安装等多项任务。例如，在项目重构过程中，WindSurf 可以自动检测源目录与目标目录的状态，智能判断文件冲突，并根据历史操作自动选择最合适的执行策略，让整个过程变得流畅而高效。

与 Cursor 相比，WindSurf 在多步骤任务规划和协同工作方面优势更为明显。其支持多工具联动，通过自动维护上下文状态，能将复杂任务分解为多个子任务，逐步完成操作。这种能力不仅适用于大型项目的代码重构，也能帮助初学者在熟悉项目结构的同时，快速掌握开发技巧。

WindSurf 的智能编程助手功能更是为开发者提供了全新的交互体验。利用先进的 GPT-4o 和 Claude 3.5 模型，WindSurf 可处理文本、图像等多模态输入，生成高质量代码和解决方案。不仅如此，它还能根据开发者的操作习惯进行自动学习，将常用操作记录为隐式记忆，从而在后续对话中提供更加个性化的建议。

在实际应用中，比如一个基于 Nuxt 3 的 AI 工具集项目，开发者需要将旧有目录迁移至新架构。传统方法往往需要多次手动操作，而 WindSurf 则能自动扫描项目结构、识别配置文件、处理依赖问题，并利用内置命令顺利完成文件复制与删除、配置更新等任务。整个流程几乎无需人工干预，大大提升了项目重构效率。

未来，随着 AI 技术的进一步发展，WindSurf 将持续优化其智能交互和自动化能力，拓展更多企业级功能，如 SSO 认证、深度日志审计等。凭借强大的上下文感知、多步骤任务协同和灵活的工具集成，WindSurf 不仅重新定义了 AI 辅助编程的标准，更为开发者开辟了一条高效、智能的工作之路。

WindSurf 作为一款集智能、高效、便捷于一体的全新 AI 编程工具，正在引领编程工具的未来。无论是对个人开发者还是团队协作而言，WindSurf 都展示了它在提升代码质量、优化开发流程以及减少重复劳动方面的巨大潜力。未来的编程世界，将由这些智能工具驱动，让开发者真正实现“写代码，享受生活”。

### WindSurf Prompt

```bash

source .venv/bin/activate
execute @task.md 
```

### Claude desktop app prompt

```bash
 Using lightrag-server naive_search Tool to Search for "数据质量控制流程"，并用中文回答
```

### AutoGen

```bash

pip install -U "autogen-ext[mcp]"

import asyncio

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_ext.tools.mcp import StdioServerParams, mcp_server_tools

async def main() -> None:
    # Get the fetch tool from mcp-server-fetch.
    rag_mcp_server = StdioServerParams(
        command="/Users/charlesqin/PycharmProjects/ligtrag-test/.venv/bin/python",
        args=["/Users/charlesqin/PycharmProjects/ligtrag-test/mcp_server.py"],
        env={"OPENAI_API_KEY": "sk-proj-xxxxxxxx"}
    )
    tools = await mcp_server_tools(rag_mcp_server)

    # Create an agent that can use the fetch tool.
    model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")
    agent = AssistantAgent(name="fetcher", model_client=model_client, tools=tools, reflect_on_tool_use=True)  # type: ignore

    # Let the agent fetch the content of a URL and summarize it.
    result = await agent.run(task="Using lightrag-server naive_search Tool to Search for '数据质量控制流程'，并用中文回答")
    print(result.messages[-1].content)

asyncio.run(main())

```

### MCP配置文件

```bash
{
  "mcpServers": {
    "lightrag": {
      "command": "/Users/charlesqin/PycharmProjects/ligtrag-test/.venv/bin/python",
      "args": ["/Users/charlesqin/PycharmProjects/ligtrag-test/mcp_server.py"],
      "env": {
        "OPENAI_API_KEY": "sk-proj---"
      }
    }
  }
}
```

```bash
#--------------------------安装LightRAG--------------------------#

git clone https://github.com/HKUDS/LightRAG.git
cd LightRAG
pip install -e .
cd ..
export OPENAI_API_KEY=sk-proj-xxxxxxx

curl https://raw.githubusercontent.com/win4r/mytest/refs/heads/main/book.txt > ./book.txt

#--------------------------OpenAI--------------------------#

import os
import asyncio
from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import gpt_4o_mini_complete, openai_embed
from lightrag.kg.shared_storage import initialize_pipeline_status

WORKING_DIR = "./mybook"

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

async def initialize_rag():
    rag = LightRAG(
        working_dir=WORKING_DIR,
        embedding_func=openai_embed,
        llm_model_func=gpt_4o_mini_complete,
        # llm_model_func=gpt_4o_complete
    )

    await rag.initialize_storages()
    await initialize_pipeline_status()

    return rag

def main():
    # Initialize RAG instance
    rag = asyncio.run(initialize_rag())

    with open("./book.txt", "r", encoding="utf-8") as f:
        rag.insert(f.read())

    # Perform naive search
    print(
        rag.query(
            "What is the Self-Consistency Prompt?", param=QueryParam(mode="naive")
        )
    )

    # Perform local search
    print(
        rag.query(
            "What is the Self-Consistency Prompt?", param=QueryParam(mode="local")
        )
    )

    # Perform global search
    print(
        rag.query(
            "What is the Self-Consistency Prompt?", param=QueryParam(mode="global")
        )
    )

    # Perform hybrid search
    print(
        rag.query(
            "What are the top themes in this story?", param=QueryParam(mode="hybrid")
        )
    )

if __name__ == "__main__":
    main()
    
    
 

```

### windsurf Prompt

```bash
### task:

为 LightRAG 构建一个 MCP 服务器(MCP Server)。  

该服务器应允许我输入任意查询文本，并使用四种不同的 MCP 工具执行搜索操作：**朴素搜索、本地搜索、全局搜索和混合搜索**。  

### 支持多种查询模式：  

- **朴素搜索（Naive Search）**：对插入的内容执行直接搜索。  
- **本地搜索（Local Search）**：在插入文档的局部上下文中检索结果。  
- **全局搜索（Global Search）**：对整个数据集进行全面搜索。  
- **混合搜索（Hybrid Search）**：结合本地搜索和全局搜索的特点，以提高结果的相关性和一致性。  

**工作目录（WORKING_DIR）**路径为：  
`/Users/charlesqin/PycharmProjects/ligtrag-test`  

请激活虚拟环境（venv）：
cd /Users/charlesqin/Documents/test-mcp
source .venv/bin/activate

export OPENAI_API_KEY=sk-proj-aZpGaivSXgNJ--

Here's the Code and Response for the LightRAG:

### Code (app.py):

import os
import asyncio
from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import gpt_4o_mini_complete, openai_embed
from lightrag.kg.shared_storage import initialize_pipeline_status

WORKING_DIR = "./mybook"

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

async def initialize_rag():
    rag = LightRAG(
        working_dir=WORKING_DIR,
        embedding_func=openai_embed,
        llm_model_func=gpt_4o_mini_complete,
        # llm_model_func=gpt_4o_complete
    )

    await rag.initialize_storages()
    await initialize_pipeline_status()

    return rag

def main():
    # Initialize RAG instance
    rag = asyncio.run(initialize_rag())

    with open("./book.txt", "r", encoding="utf-8") as f:
        rag.insert(f.read())

    # Perform naive search
    print(
        rag.query(
            "What is the Self-Consistency Prompt?", param=QueryParam(mode="naive")
        )
    )

    # Perform local search
    print(
        rag.query(
            "What is the Self-Consistency Prompt?", param=QueryParam(mode="local")
        )
    )

    # Perform global search
    print(
        rag.query(
            "What is the Self-Consistency Prompt?", param=QueryParam(mode="global")
        )
    )

    # Perform hybrid search
    print(
        rag.query(
            "What are the top themes in this story?", param=QueryParam(mode="hybrid")
        )
    )

if __name__ == "__main__":
    main()
    
    

### Response:

[Full response logs showing the initialization and search results]

(.venv) charlesqin@charless-MacBook-Pro ligtrag-test % python app.py  
INFO: Process 31212 Shared-Data created for Single Process
INFO:nano-vectordb:Load (89, 1536) data
INFO:nano-vectordb:Init {'embedding_dim': 1536, 'metric': 'cosine', 'storage_file': './mybook/vdb_entities.json'} 89 data
INFO:nano-vectordb:Load (85, 1536) data
INFO:nano-vectordb:Init {'embedding_dim': 1536, 'metric': 'cosine', 'storage_file': './mybook/vdb_relationships.json'} 85 data
INFO:nano-vectordb:Load (9, 1536) data
INFO:nano-vectordb:Init {'embedding_dim': 1536, 'metric': 'cosine', 'storage_file': './mybook/vdb_chunks.json'} 9 data
INFO: Process 31212 initialized updated flags for namespace: [full_docs]
INFO: Process 31212 ready to initialize storage namespace: [full_docs]
INFO: Process 31212 initialized updated flags for namespace: [text_chunks]
INFO: Process 31212 ready to initialize storage namespace: [text_chunks]
INFO: Process 31212 initialized updated flags for namespace: [entities]
INFO: Process 31212 initialized updated flags for namespace: [relationships]
INFO: Process 31212 initialized updated flags for namespace: [chunks]
INFO: Process 31212 initialized updated flags for namespace: [chunk_entity_relation]
INFO: Process 31212 initialized updated flags for namespace: [llm_response_cache]
INFO: Process 31212 ready to initialize storage namespace: [llm_response_cache]
INFO: Process 31212 initialized updated flags for namespace: [doc_status]
INFO: Process 31212 ready to initialize storage namespace: [doc_status]
INFO: Process 31212 storage namespace already initialized: [full_docs]
INFO: Process 31212 storage namespace already initialized: [text_chunks]
INFO: Process 31212 storage namespace already initialized: [llm_response_cache]
INFO: Process 31212 storage namespace already initialized: [doc_status]
INFO: Process 31212 Pipeline namespace initialized
## Self-Consistency Prompt

The Self-Consistency prompt is a technique utilized to ensure that the output generated by ChatGPT maintains consistency with the provided input. This approach is particularly useful for tasks such as fact-checking, data validation, or ensuring consistency in text generation.

### Prompt Formula
The prompt formula for the Self-Consistency prompt involves embedding the input text alongside an instruction. The instruction typically states, "Please ensure the following text is self-consistent."

### Examples of Application

1. **Text Generation**
   - **Task**: Generate a product review.
   - **Instructions**: The review should be consistent with the product information provided in the input.
   - **Prompt formula**: "Generate a product review that is consistent with the following product information [insert product information]."

2. **Text Summarization**
   - **Task**: Summarize a news article.
   - **Instructions**: The summary should be consistent with the information provided in the article.
   - **Prompt formula**: "Summarize the following news article in a way that is consistent with the information provided [insert news article]."

3. **Fact-checking**
   - **Task**: Check for consistency in a given news article.
   - **Input text**: "The article states that the population of the city is 5 million, but later on, it says that the population is 7 million."
   - **Prompt formula**: "Please ensure the following text is self-consistent: The article states that the population of the city is 5 million, but later on, it says that the population is 7 million."

4. **Data Validation**
   - **Task**: Check for consistency in a given data set.
   - **Input text**: "The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees."
   - **Prompt formula**: "Please ensure the following text is self-consistent: The data shows that the average temperature in July is 30 degrees, but the minimum temperature is recorded as 20 degrees."

By employing the Self-Consistency prompt, users can enhance the reliability of the text generated by ensuring that it aligns with the provided inputs.

### References
- [KG] Self-Consistency Prompt Description (File: Document Chunks)
- [KG] Application Examples for Self-Consistency Prompts (File: Document Chunks)
The Knowledge Base does not provide specific information on the "Self-Consistency Prompt." It typically discusses various prompt engineering techniques and their applications with language models like ChatGPT, but mentions self-consistency without elaborating on its definition or use cases.

If you have more detailed questions about other prompt techniques or topics related to prompt engineering, please feel free to ask!

### References
- [KG] Prompt Engineering Techniques encompass a variety of methods and practices for effectively engaging with language models like ChatGPT. (File: unknown_source)
- [KG] The Art of Asking ChatGPT for High-Quality Answers: A Complete Guide to Prompt Engineering Techniques covers various techniques related to prompt engineering and the effective use of ChatGPT. (File: unknown_source)
- [KG] ChatGPT is a state-of-the-art language model capable of generating human-like text based on the prompts given. (File: unknown_source)
The Knowledge Base provided does not contain specific information about the "Self-Consistency Prompt." This term may refer to a prompting technique meant to encourage models, like ChatGPT, to generate consistent outputs across different prompts or contexts, but further details are not available in the provided content. Therefore, I cannot provide a detailed explanation or context for the Self-Consistency Prompt.

If you have any other questions or need information on a different topic, feel free to ask! 

### References
- [KG] Ibrahim John discusses various prompting techniques in his book (File: unknown_source)
- [KG] Knowledge generation techniques are outlined in the book's content (File: unknown_source)
I don’t have specific details about the story you’re referring to, as the Knowledge Base does not provide information on any particular narrative beyond discussing techniques for text generation and prompt engineering. 

However, common themes in literature often include:

1. **Love** - exploring emotional connections and relationships.
2. **Personal Growth** - focusing on the journey of self-discovery and development.
3. **Conflict** - presenting struggles between characters or within oneself.
4. **Change** - highlighting transformations in characters or settings (e.g., changing seasons).
5. **Morality** - examining the concepts of right and wrong.

If you could provide more details or specify the story, I could help further! 

### References
- [KG] Love is a complex emotion that forms the basis of many poems and literary works. (File: unknown_source)
- [KG] Personal growth refers to the process of self-improvement and development, focusing on various aspects of life such as emotional, intellectual and relational growth. (File: unknown_source)
- [KG] The changing seasons refer to the transition periods throughout the year characterized by different weather patterns, environmental changes, and their impact on nature and human life. (File: unknown_source)
(.venv) charlesqin@charless-MacBook-Pro ligtrag-test % 

### The MCP document is:
https://modelcontextprotocol.io/llms-full.txt

```