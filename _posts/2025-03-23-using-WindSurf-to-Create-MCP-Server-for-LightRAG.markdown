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


使用WindSurf开发LightRAG MCP服务器，增强Claude和AutoGen的知识库能力

本视频展示如何使用WindSurf（无需编写代码）开发一个LightRAG MCP服务器，并将其集成到Claude桌面版和AutoGen智能体框架中，提供强大的知识库检索功能。

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


## 视频亮点：
- 详细演示如何安装LightRAG并构建自定义知识库
- 通过WindSurf快速构建MCP服务器，无需手动编写代码
- 支持多种检索方式：naive、local、global和hybrid
- 将微调Llama3的技术文档作为示例知识库
- 完整演示与Claude桌面版和AutoGen框架的集成过程

## 技术特点：
- LightRAG基于图结构的检索增强生成系统
- 通过构建知识图谱优化文本索引和检索
- 融合向量与结构化关系，增强信息连贯性
- 支持增量更新，降低计算成本
- 在复杂信息检索和跨文档推理方面表现优异

本视频所使用的代码和指令可在视频下方描述栏或评论区找到，也可通过博客查找对应笔记。

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

pip install -U "autogen-agentchat"

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
        "OPENAI_API_KEY": "sk-proj--"
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

```markdown
### task:

为 LightRAG 构建一个 MCP 服务器(MCP Server)。  

该服务器应允许我输入任意查询文本，并使用四种不同的 MCP 工具执行搜索操作：
**朴素搜索、本地搜索、全局搜索和混合搜索**。  

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

export OPENAI_API_KEY=sk-proj-xxxxxxx

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

(.venv) charlesqin@charless-MacBook-Pro test-mcp % python app.py
INFO: Process 6536 Shared-Data created for Single Process
INFO:nano-vectordb:Load (124, 1536) data
INFO:nano-vectordb:Init {'embedding_dim': 1536, 'metric': 'cosine', 'storage_file': './mybook/vdb_entities.json'} 124 data
INFO:nano-vectordb:Load (110, 1536) data
INFO:nano-vectordb:Init {'embedding_dim': 1536, 'metric': 'cosine', 'storage_file': './mybook/vdb_relationships.json'} 110 data
INFO:nano-vectordb:Load (9, 1536) data
INFO:nano-vectordb:Init {'embedding_dim': 1536, 'metric': 'cosine', 'storage_file': './mybook/vdb_chunks.json'} 9 data
INFO: Process 6536 initialized updated flags for namespace: [full_docs]
INFO: Process 6536 ready to initialize storage namespace: [full_docs]
INFO: Process 6536 initialized updated flags for namespace: [text_chunks]
INFO: Process 6536 ready to initialize storage namespace: [text_chunks]
INFO: Process 6536 initialized updated flags for namespace: [entities]
INFO: Process 6536 initialized updated flags for namespace: [relationships]
INFO: Process 6536 initialized updated flags for namespace: [chunks]
INFO: Process 6536 initialized updated flags for namespace: [chunk_entity_relation]
INFO: Process 6536 initialized updated flags for namespace: [llm_response_cache]
INFO: Process 6536 ready to initialize storage namespace: [llm_response_cache]
INFO: Process 6536 initialized updated flags for namespace: [doc_status]
INFO: Process 6536 ready to initialize storage namespace: [doc_status]
INFO: Process 6536 storage namespace already initialized: [full_docs]
INFO: Process 6536 storage namespace already initialized: [text_chunks]
INFO: Process 6536 storage namespace already initialized: [llm_response_cache]
INFO: Process 6536 storage namespace already initialized: [doc_status]
INFO: Process 6536 Pipeline namespace initialized
## 数据质量控制流程

数据质量控制流程在确保用于模型微调的训练数据符合标准方面至关重要。特别是在医疗和金融领域，这一过程确保数据的准确性和可靠性。以下是针对医疗领域的数据质量控制流程：

### 1. 数据来源审核

- **MedChat 数据集**：包含医疗问答对，需要确保数据的来源是权威的和可靠的。
- **MeDAL 数据集**：从 PubMed 摘要中提取的 1400 万篇文章，以保证医疗信息的真实性和最新性。
- **医学诊断数据集**：用于生成合成 Q&A 数据集，确保数据可用于训练并符合医疗领域的要求。

### 2. 专业人员审核

- 通过医学专业人员对收集到的数据进行审核，确认数据的准确性和适用性。
- 借助专家知识确保数据中的术语和内容符合医学标准和现实情况。

### 3. 术语标准化

- 对于数据集中使用的医学术语，进行标准化处理，以确保不同数据源中的术语一致，避免歧义。

### 4. 权威资料引用

- 引用权威的医学资料，以支持数据的有效性和可信度。这能够提高模型在处理医疗相关查询时的准确性和可靠性。

### 5. 数据清洗和预处理

- 对数据进行清洗，去除冗余和不相关的信息，确保数据的整洁。
- 格式化数据，使其适合模型的输入要求。

这些步骤将有效保障数据的高质量，为后续的模型训练奠定基础，并提升模型在特定任务上的表现。

### References
- [KG] 数据质量控制策略 (File: N/A)
- [DC] 医疗领域微调案例分析 (File: N/A)
### 数据质量控制流程

数据质量控制流程是Meta为确保Llama 3训练数据集高质量而实施的一系列系统性措施，旨在提升数据的有效性与可靠性。该流程包括以下几个关键部分：

1. **基于LLM的分类器**：
   - 开发多种基于大型语言模型的分类器，用于筛选高质量的提示和响应。这些分类器有助于自动判断数据的相关性和准确性。

2. **主题分类**：
   - 利用微调过的Llama 3 8B模型作为主题分类器，将采集到的数据分类为广泛类别和特定类别，以便于后续的数据处理和分析。

3. **问题检测与纠正**：
   - 实施基于规则的策略，识别并过滤不良内容，例如过度使用表情符号和感叹号、以及频繁出现的道歉语气等。此外，还确保所有数据遵循统一的格式规范。

4. **数据清洗**：
   - 进行重复内容的去除，低质量文档的过滤，以及个人身份信息和成人内容的移除，以保证数据集中只有高质量材料。

5. **数据增强技术**：
   - 采用多种数据增强技术，例如变体生成和难度递增等，以提升模型训练的全面性与有效性。这些增强措施有助于提高模型对不同场景的适应能力。

通过上述流程，Meta确保Llama 3所使用的数据集具备高质量，从而促进模型性能的优化和提升。

### 参考文献

1. Meta实施的数据质量控制流程 [KG] Source content (File: unknown_source)
2. 数据清洗的定义与Importance [KG] Source content (File: unknown_source)
3. 数据增强技术的应用与优势 [KG] Source content (File: unknown_source)
### 数据质量控制流程

数据质量控制流程是由Meta实施的一种系统化方法，旨在确保用于训练Llama 3的高标准数据集。这一流程包括多个关键步骤，以有效维护数据的高质量和可靠性：

1. **数据收集**：依据既定标准和目标，收集多样化和高质量的数据。这一步骤涉及明确数据源和收集方法，以确保数据的代表性和覆盖面。

2. **数据清洗**：通过去除重复项，过滤低质量文档等验证技术，确保数据的准确性和一致性。这是提升训练数据质量的关键环节。

3. **数据验证**：对收集的数据进行审查，确保其符合预设的要求和特点，防止因不良数据影响模型性能。

4. **合规检查**：在数据处理过程中，审查潜在的法律和道德问题，确保所用数据的合理性和合规性。

5. **持续监控**：实施持续的质量监控和反馈机制，定期评估数据集的质量和适度性，以便及时进行调整和优化。

数据质量控制流程是Llama 3微调及应用中不可或缺的组成部分，帮助确保AI模型在训练中使用到的数据能够支持其性能表现。

### References

- [KG] Meta实施的严格数据质量控制流程 (File: unknown_source)
- [KG] Llama 3的高标准数据集 (File: unknown_source)
- [KG] 数据质量控制确保模型性能的影响 (File: unknown_source)
- [KG] 管理和预处理的数据集的重要性 (File: unknown_source)
### 数据质量控制流程

Meta为Llama 3实施了严格的数据质量控制流程，以确保训练所用数据集的高标准。以下是该流程的关键组成部分：

1. **基于LLM的分类器**：
   - 开发多种基于大型语言模型的分类器，用于筛选高质量提示和响应。

2. **主题分类**：
   - 使用微调过的Llama 3 8B模型作为主题分类器，将数据分为广泛和特定类别，以提高分类的准确性。

3. **问题检测与纠正**：
   - **表情符号和感叹号过度使用**：实施基于规则的策略，识别并过滤此类元素。
   - **过度道歉语气**：识别并调整如“我很抱歉”或“我道歉”等常见短语的频率。
   - **格式一致性**：确保所有数据遵循统一格式，以提升数据集的整体质量。

4. **数据清洗**：
   - 去除重复内容。
   - 过滤低质量文档。
   - 移除个人身份信息和成人内容，以保障数据的合法性和道德性。

5. **数据增强技术**：
   - 针对微调的目标，采用各种数据增强技术以提升数据多样性和使用效果。这包括生成变体、制定难度递增的训练样本及其它特定的方案。

通过以上流程，Meta确保Llama 3模型能够在高质量的数据基础上进行训练，从而提高模型的性能和可靠性。

### References
- [KG] Data Quality Control Process (File: unknown_source)
- [KG] 安全微调的技术实现 (File: unknown_source)
- [KG] 数据清洗 (File: unknown_source)
(.venv) charlesqin@charless-MacBook-Pro test-mcp % 

### The MCP document is:

# Example Clients
Source: https://modelcontextprotocol.io/clients

A list of applications that support MCP integrations

This page provides an overview of applications that support the Model Context Protocol (MCP). Each client may support different MCP features, allowing for varying levels of integration with MCP servers.

🔥此处省略，因为文档过长博客展示不出来了，请自行准备MCP文档。MCP文档请从这里获取：https://modelcontextprotocol.io/llms-full.txt

Remember that Claude can help you modify and improve your server as requirements change over time.

Need more guidance? Just ask Claude specific questions about implementing MCP features or troubleshooting issues that arise.

```