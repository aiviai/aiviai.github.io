---
layout: single
title: "GraphRAG本地检索+ Prompt Tuning + covariates(协变量)+爬虫实现GitHub项目代码检索增强生成，快速掌握最新GitHub开源项目"
sidebar:
  nav: "docs"
date: 2024-07-13 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG, Tutorial, Vision]
tags: [AI, AI-Agents, Chainlit, GPT, GraphRAG, RAG]
classes: wide
author_profile: true
---


#  GraphRAG本地检索+ **Prompt Tuning** \+ **covariates(协变量)+爬虫实现GitHub项目代码检索增强生成，快速掌握最新GitHub开源项目**

###  **🔥Prompt Tuning**

> GraphRAG是微软研究院开发的一个知识图谱检索增强生成（Knowledge Graph Retrieval-Augmented Generation）系统。   
>  在GraphRAG中，Prompt Tuning（提示调优）扮演着重要角色，为用户提供了一种高效且灵活的方式来优化和定制查询体验。以下是GraphRAG中Prompt Tuning的主要优势和作用：   
> 
> 
> ##  简化配置过程 
> 
>   1. **默认提示模板** : GraphRAG提供了一套默认的提示模板，涵盖了实体/关系提取、描述总结、声明提取等关键任务。这些预设模板使用户能够快速启动和使用系统，无需复杂的初始配置。 
> 

>   2. **自动模板化** : GraphRAG引入了自动模板化功能，该功能可以根据用户的输入数据和与大语言模型（LLM）的交互自动生成适应特定领域的模板。这大大降低了用户的工作量，同时提高了系统对不同领域数据的适应性。 
> 

> 
> ##  提高性能和效率 
> 
>   1. **参数高效性** : Prompt Tuning只需更新少量的提示参数，而无需对整个预训练模型进行微调。这种方法在保持模型通用能力的同时，显著减少了计算资源的需求。 
> 

>   2. **性能接近完全微调** : 随着模型规模的增大，Prompt Tuning的性能越来越接近完全微调，在某些任务上甚至能超过完全微调。这意味着用户可以获得接近全面微调的性能，但付出的计算成本要低得多。 
> 

>   3. **高效推理** : 由于只更新少量参数，Prompt Tuning保留了预训练模型的高效推理能力。这对于需要快速响应的实时应用尤为重要。 
> 

> 
> ##  增强适应性和泛化能力 
> 
>   1. **领域适应性** : 通过将任务特定的信息编码在提示中，同时保持模型参数不变，Prompt Tuning在领域迁移问题上表现更好。这使得GraphRAG能够更容易地适应不同的知识领域和应用场景。 
> 

>   2. **提示集成** : GraphRAG允许学习多个提示并进行集成，这种方法可以进一步提高系统性能，并提供更加灵活的查询策略。 
> 

> 
> ##  提高可解释性和可控性 
> 
>   1. **可解释性** : 学习到的提示参数具有一定的可解释性，可以帮助用户理解模型的行为。这对于需要透明度和可解释性的应用场景非常有价值。 
> 

>   2. **精细控制** : 通过手动配置选项，高级用户可以对提示进行更精细的控制和调整。这为专业用户提供了更大的灵活性和定制化能力。 
> 

> 
> ##  优化知识图谱构建 
> 
>   1. **实体和关系提取** : Prompt Tuning优化了实体识别和关系提取的过程，提高了知识图谱构建的准确性和效率。 
> 

>   2. **描述总结** : 通过优化的提示，系统能够更好地生成实体和关系的描述摘要，丰富了知识图谱的内容。 
> 

>   3. **社区报告生成** : Prompt Tuning还改进了社区报告的生成过程，包括摘要、影响评估和关键发现的提取，使得生成的报告更加全面和有洞察力。 
> 

> 
> GraphRAG中的Prompt Tuning技术通过提供灵活、高效且易于使用的提示调优方法，显著提升了系统的性能、适应性和可用性。它不仅简化了用户的操作流程，还在保持高性能的同时降低了计算成本，为知识图谱检索增强生成任务提供了强有力的支持。 

###  **🔥** covariates(协变量) 

> GraphRAG中的covariates(协变量)是一个重要组成部分,具有以下几个关键作用和优势: 
> 
>   1. **提供结构化声明信息**   
>  Covariates代表从文本中提取的关于实体的结构化声明或陈述信息,这些信息可能是时间相关的。它们作为GraphRAG知识模型的一个重要组成部分,与实体、关系等一起构成了完整的知识图谱结构。   
> 
> 

>   2. **增强上下文理解**   
>  Covariates为知识图谱中的实体和关系提供了额外的上下文和细节信息。这些上下文信息可以被利用来生成更相关和连贯的查询响应。   
> 
> 

>   3. **捕获细粒度知识**   
>  通过包含covariates,GraphRAG能够从源文档中捕获更细致和全面的知识,而不仅仅是简单的实体-关系信息。这使得系统能够处理更复杂的查询和推理任务。   
> 
> 

>   4. **支持高级推理**   
>  Covariates使GraphRAG能够在知识图谱上执行更高级的推理和推断,超越了简单的事实检索。它们捕获的关系和属性信息允许系统发现隐含的连接并得出新的见解。   
> 
> 

>   5. **改进信息可解释性**   
>  作为整体知识图谱的一部分,covariates的结构化表示使信息更易于语言模型组件访问和解释。这种结构化数据可以更有效地集成到响应生成过程中。   
> 
> 

>   6. **优化社区报告生成**   
>  在GraphRAG的社区报告生成过程中,covariates信息被用于生成更全面和有洞察力的摘要、影响评估和关键发现。   
> 
> 

>   7. **支持时序分析**   
>  由于covariates可以包含时间相关的信息,它们使GraphRAG能够执行时序分析和跟踪实体随时间的变化。   
> 
> 

> 
> covariates作为GraphRAG方法的关键组成部分,提供了宝贵的上下文信息,并使系统能够执行比传统检索增强生成系统更复杂的推理和总结任务。它们极大地增强了GraphRAG的知识表示能力和查询处理能力。 

###  🔥代码检索功能 

> 使用GraphRAG来为GitHub上的开源项目构建RAG系统以便快速检索代码具有以下几个主要优势: 
> 
> ###  提高检索性能和准确性 
> 
> GraphRAG通过结合知识图谱和大型语言模型,能够更好地理解和连接代码库中的各个组件之间的关系。这种方法可以: 
> 
>   * 捕捉代码结构和依赖关系,提供更精准的检索结果 
> 

>   * 理解代码的语义和上下文,而不仅仅是基于关键词匹配 
> 

>   * 连接分散在不同文件或模块中的相关代码片段 
> 

> 
> ###  降低计算和存储成本 
> 
> 与传统的RAG系统相比,GraphRAG可以更高效地存储和检索信息[3]: 
> 
>   * 减少冗余数据存储,因为关系信息被编码在图结构中 
> 

>   * 加快检索速度,通过图遍历而不是全文搜索 
> 

>   * 降低处理大型代码库所需的计算资源 
> 

> 
> ###  GraphRAG的模块化设计使其更容易适应不同的代码库和项目结构: 
> 
>   * 可以轻松地添加新的代码组件或更新现有关系 
> 

>   * 支持多种编程语言和框架的集成 
> 

> 
> ###  增强代码理解和文档生成 
> 
> 通过利用GraphRAG的知识图谱结构,可以: 
> 
>   * 自动生成更全面和准确的代码文档 
> 

>   * 提供代码结构和依赖关系的可视化 
> 

>   * 辅助开发者快速理解复杂的代码库 
> 

> 
> ###  支持高级查询和分析 
> 
> GraphRAG允许进行更复杂和语义化的代码查询: 
> 
>   * 可以执行基于路径和模式的搜索 
> 

>   * 支持跨文件和模块的关系查询 
> 

>   * 能够回答关于代码结构、设计模式和最佳实践的问题 
> 

> 
> 使用GraphRAG来构建GitHub项目的RAG系统可以显著提高代码检索的效率和质量,同时为开发者提供更深入的代码理解和分析能力。这种方法不仅可以加速开发过程,还能促进更好的代码重用和知识共享。 

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **
    
    
```
    claim_extraction:
      ## llm: override the global llm settings for this task
      ## parallelization: override the global parallelization settings for this task
      ## async_mode: override the global async_mode settings for this task
      enabled: true
      prompt: "prompts/claim_extraction.txt"
      description: "Any claims or facts that could be relevant to information discovery."
      max_gleanings: 1
```
    
    ##Just uncomment the enabled line in your settings.yaml file.
    ##I'll resolve the issue, but please reopen if this doesn't work
    
    
    pip install graphrag
    
```
    python -m graphrag.index --init  --root . 
    python -m graphrag.index --root . 
    ###提示优化
    python -m graphrag.prompt_tune --root . --no-entity-types
```
    
    GRAPHRAG_ENTITY_EXTRACTION_PROMPT_FILE="prompts/entity_extraction.txt"
    
    GRAPHRAG_COMMUNITY_REPORT_PROMPT_FILE="prompts/community_report.txt"
    
    GRAPHRAG_SUMMARIZE_DESCRIPTIONS_PROMPT_FILE="prompts/summarize_descriptions.txt"
    
    
    
    设置env
    GRAPHRAG_API_KEY=sk-proj-wDPaUDu1Iim
    
    
    
```
    export GRAPHRAG_API_KEY="sk-xggd2443fg"
    export GRAPHRAG_LLM_MODEL="gpt-3.5-turbo"
    export GRAPHRAG_EMBEDDING_MODEL="text-embedding-ada-002"
```
    
```
    export GRAPHRAG_ENTITY_EXTRACTION_PROMPT_FILE="prompts/entity_extraction.txt"
    export GRAPHRAG_COMMUNITY_REPORT_PROMPT_FILE="prompts/community_report.txt"
    export GRAPHRAG_SUMMARIZE_DESCRIPTIONS_PROMPT_FILE="prompts/summarize_descriptions.txt"
```
    
    
    
```
    python -m graphrag.query \
    --root . \
    --method local \
    "how to install crawl4ai?"
```
    
    
    ###settings.yaml
    
```
    encoding_model: cl100k_base
    skip_workflows: []
    llm:
      api_key: ${GRAPHRAG_API_KEY}
      type: openai_chat # or azure_openai_chat
      model: gpt-3.5-turbo-0125
      model_supports_json: true # recommended if this is available for your model.
      # max_tokens: 4000
      # request_timeout: 180.0
      # api_base: https://<instance>.openai.azure.com
      # api_version: 2024-02-15-preview
      # organization: <organization_id>
      # deployment_name: <azure_model_deployment_name>
      # tokens_per_minute: 150_000 # set a leaky bucket throttle
      # requests_per_minute: 10_000 # set a leaky bucket throttle
      # max_retries: 10
      # max_retry_wait: 10.0
      # sleep_on_rate_limit_recommendation: true # whether to sleep when azure suggests wait-times
      # concurrent_requests: 25 # the number of parallel inflight requests that may be made
```
    
```
    parallelization:
      stagger: 0.3
      # num_threads: 50 # the number of threads to use for parallel processing
```
    
    async_mode: threaded # or asyncio
    
```
    embeddings:
      ## parallelization: override the global parallelization settings for embeddings
      async_mode: threaded # or asyncio
      llm:
        api_key: ${GRAPHRAG_API_KEY}
        type: openai_embedding # or azure_openai_embedding
        model: text-embedding-3-small
        # api_base: https://<instance>.openai.azure.com
        # api_version: 2024-02-15-preview
        # organization: <organization_id>
        # deployment_name: <azure_model_deployment_name>
        # tokens_per_minute: 150_000 # set a leaky bucket throttle
        # requests_per_minute: 10_000 # set a leaky bucket throttle
        # max_retries: 10
        # max_retry_wait: 10.0
        # sleep_on_rate_limit_recommendation: true # whether to sleep when azure suggests wait-times
        # concurrent_requests: 25 # the number of parallel inflight requests that may be made
        # batch_size: 16 # the number of documents to send in a single request
        # batch_max_tokens: 8191 # the maximum number of tokens to send in a single request
        # target: required # or optional
```
      
    
    
```
    chunks:
      size: 300
      overlap: 100
      group_by_columns: [id] # by default, we don't allow chunks to cross documents
```
        
```
    input:
      type: file # or blob
      file_type: text # or csv
      base_dir: "input"
      file_encoding: utf-8
      file_pattern: ".*\\.txt$"
```
    
```
    cache:
      type: file # or blob
      base_dir: "cache"
      # connection_string: <azure_blob_storage_connection_string>
      # container_name: <azure_blob_storage_container_name>
```
    
```
    storage:
      type: file # or blob
      base_dir: "inputs/artifacts"
      # connection_string: <azure_blob_storage_connection_string>
      # container_name: <azure_blob_storage_container_name>
```
    
```
    reporting:
      type: file # or console, blob
      base_dir: "inputs/reports"
      # connection_string: <azure_blob_storage_connection_string>
      # container_name: <azure_blob_storage_container_name>
```
    
```
    entity_extraction:
      ## llm: override the global llm settings for this task
      ## parallelization: override the global parallelization settings for this task
      ## async_mode: override the global async_mode settings for this task
      prompt: "prompts/entity_extraction.txt"
      entity_types: [organization,person,geo,event]
      max_gleanings: 0
```
    
```
    summarize_descriptions:
      ## llm: override the global llm settings for this task
      ## parallelization: override the global parallelization settings for this task
      ## async_mode: override the global async_mode settings for this task
      prompt: "prompts/summarize_descriptions.txt"
      max_length: 500
```
    
```
    claim_extraction:
      ## llm: override the global llm settings for this task
      ## parallelization: override the global parallelization settings for this task
      ## async_mode: override the global async_mode settings for this task
      # enabled: true
      prompt: "prompts/claim_extraction.txt"
      description: "Any claims or facts that could be relevant to information discovery."
      max_gleanings: 0
```
    
```
    community_report:
      ## llm: override the global llm settings for this task
      ## parallelization: override the global parallelization settings for this task
      ## async_mode: override the global async_mode settings for this task
      prompt: "prompts/community_report.txt"
      max_length: 2000
      max_input_length: 8000
```
    
    cluster_graph:
      max_cluster_size: 10
    
```
    embed_graph:
      enabled: false # if true, will generate node2vec embeddings for nodes
      # num_walks: 10
      # walk_length: 40
      # window_size: 2
      # iterations: 3
      # random_seed: 597832
```
    
    umap:
      enabled: false # if true, will generate UMAP embeddings for nodes
    
```
    snapshots:
      graphml: false
      raw_entities: false
      top_level_nodes: false
```
    
```
    local_search:
      # text_unit_prop: 0.5
      # community_prop: 0.1
      # conversation_history_max_turns: 5
      # top_k_mapped_entities: 10
      # top_k_relationships: 10
      # max_tokens: 12000
```
    
```
    global_search:
      # max_tokens: 12000
      # data_max_tokens: 12000
      # map_max_tokens: 1000
      # reduce_max_tokens: 2000
      # concurrency: 32
```
    
    
    
```
    import os
    import asyncio
    import pandas as pd
    import tiktoken
    from rich import print
    from typing import List
```
    
```
    # 导入必要的模块和类
    from graphrag.query.context_builder.entity_extraction import EntityVectorStoreKey
    from graphrag.query.indexer_adapters import (
        read_indexer_covariates,
        read_indexer_entities,
        read_indexer_relationships,
        read_indexer_reports,
        read_indexer_text_units,
    )
    from graphrag.query.input.loaders.dfs import store_entity_semantic_embeddings
    from graphrag.query.llm.oai.chat_openai import ChatOpenAI
    from graphrag.query.llm.oai.embedding import OpenAIEmbedding
    from graphrag.query.llm.oai.typing import OpenaiApiType
    from graphrag.query.question_gen.local_gen import LocalQuestionGen
    from graphrag.query.structured_search.local_search.mixed_context import LocalSearchMixedContext
    from graphrag.query.structured_search.local_search.search import LocalSearch
    from graphrag.vector_stores.lancedb import LanceDBVectorStore
```
    
```
    # 设置常量和配置
    INPUT_DIR = "/Users/charlesqin/PycharmProjects/RAGCode/inputs/artifacts"
    LANCEDB_URI = f"{INPUT_DIR}/lancedb"
    COMMUNITY_REPORT_TABLE = "create_final_community_reports"
    ENTITY_TABLE = "create_final_nodes"
    ENTITY_EMBEDDING_TABLE = "create_final_entities"
    RELATIONSHIP_TABLE = "create_final_relationships"
    COVARIATE_TABLE = "create_final_covariates"
    TEXT_UNIT_TABLE = "create_final_text_units"
    COMMUNITY_LEVEL = 2
```
    
    
```
    async def setup_llm_and_embedder():
        """
        设置语言模型（LLM）和嵌入模型
        """
        api_key = os.environ["GRAPHRAG_API_KEY"]
        llm_model = os.environ.get("GRAPHRAG_LLM_MODEL", "gpt-3.5-turbo")
        embedding_model = os.environ.get("GRAPHRAG_EMBEDDING_MODEL", "text-embedding-3-small")
```
    
```
        # 初始化ChatOpenAI实例
        llm = ChatOpenAI(
            api_key=api_key,
            model=llm_model,
            api_type=OpenaiApiType.OpenAI,
            max_retries=20,
        )
```
    
        # 初始化token编码器
        token_encoder = tiktoken.get_encoding("cl100k_base")
    
```
        # 初始化文本嵌入模型
        text_embedder = OpenAIEmbedding(
            api_key=api_key,
            api_base=None,
            api_type=OpenaiApiType.OpenAI,
            model=embedding_model,
            deployment_name=embedding_model,
            max_retries=20,
        )
```
    
        return llm, token_encoder, text_embedder
    
    
```
    async def load_context():
        """
        加载上下文数据，包括实体、关系、报告、文本单元和协变量
        """
        # 读取实体数据
        entity_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_TABLE}.parquet")
        entity_embedding_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_EMBEDDING_TABLE}.parquet")
        entities = read_indexer_entities(entity_df, entity_embedding_df, COMMUNITY_LEVEL)
```
    
```
        # 设置和加载实体描述嵌入
        description_embedding_store = LanceDBVectorStore(collection_name="entity_description_embeddings")
        description_embedding_store.connect(db_uri=LANCEDB_URI)
        store_entity_semantic_embeddings(entities=entities, vectorstore=description_embedding_store)
```
    
```
        # 读取关系数据
        relationship_df = pd.read_parquet(f"{INPUT_DIR}/{RELATIONSHIP_TABLE}.parquet")
        relationships = read_indexer_relationships(relationship_df)
```
    
```
        # 读取社区报告数据
        report_df = pd.read_parquet(f"{INPUT_DIR}/{COMMUNITY_REPORT_TABLE}.parquet")
        reports = read_indexer_reports(report_df, entity_df, COMMUNITY_LEVEL)
```
    
```
        # 读取文本单元数据
        text_unit_df = pd.read_parquet(f"{INPUT_DIR}/{TEXT_UNIT_TABLE}.parquet")
        text_units = read_indexer_text_units(text_unit_df)
```
    
```
        # 读取和处理协变量数据
        covariate_df = pd.read_parquet(f"{INPUT_DIR}/{COVARIATE_TABLE}.parquet")
        claims = read_indexer_covariates(covariate_df)
        print(f"Claim records: {len(claims)}")
        covariates = {"claims": claims}
```
    
        return entities, relationships, reports, text_units, description_embedding_store, covariates
    
    
```
    async def setup_search_engine(llm, token_encoder, text_embedder, entities, relationships, reports, text_units,
                                  description_embedding_store, covariates):
        """
        设置搜索引擎，包括上下文构建器和搜索参数
        """
        # 初始化上下文构建器
        context_builder = LocalSearchMixedContext(
            community_reports=reports,
            text_units=text_units,
            entities=entities,
            relationships=relationships,
            covariates=covariates,
            entity_text_embeddings=description_embedding_store,
            embedding_vectorstore_key=EntityVectorStoreKey.ID,
            text_embedder=text_embedder,
            token_encoder=token_encoder,
        )
```
    
```
        # 设置本地上下文参数
        local_context_params = {
            "text_unit_prop": 0.5,
            "community_prop": 0.1,
            "conversation_history_max_turns": 5,
            "conversation_history_user_turns_only": True,
            "top_k_mapped_entities": 10,
            "top_k_relationships": 10,
            "include_entity_rank": True,
            "include_relationship_weight": True,
            "include_community_rank": False,
            "return_candidate_context": False,
            "embedding_vectorstore_key": EntityVectorStoreKey.ID,
            "max_tokens": 12_000,
        }
```
    
```
        # 设置语言模型参数
        llm_params = {
            "max_tokens": 2_000,
            "temperature": 0.0,
        }
```
    
```
        # 初始化本地搜索引擎
        search_engine = LocalSearch(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            llm_params=llm_params,
            context_builder_params=local_context_params,
            response_type="multiple paragraphs",
        )
```
    
        return search_engine, context_builder, llm_params, local_context_params
    
    
```
    async def run_search(search_engine, query: str):
        """
        执行搜索查询
        """
        result = await search_engine.asearch(query)
        return result
```
    
    
```
    async def generate_questions(question_generator, history: List[str]):
        """
        基于历史生成新的问题
        """
        questions = await question_generator.agenerate(
            question_history=history, context_data=None, question_count=5
        )
        return questions
```
    
    
```
    async def main():
        """
        主函数，运行整个搜索和问题生成流程
        """
        try:
            # 设置语言模型和嵌入器
            llm, token_encoder, text_embedder = await setup_llm_and_embedder()
```
    
            # 加载上下文数据
            entities, relationships, reports, text_units, description_embedding_store, covariates = await load_context()
    
```
            # 设置搜索引擎
            search_engine, context_builder, llm_params, local_context_params = await setup_search_engine(
                llm, token_encoder, text_embedder, entities, relationships, reports, text_units,
                description_embedding_store, covariates
            )
```
    
```
            # 运行搜索示例
            queries = [
                "how to take a screenshot of the page in crawl4ai?",
                "how to set a custom user agent in crawl4ai?",
                "tell me what is Extraction Strategies and show some examples in crawl4ai.",
            ]
```
    
```
            for query in queries:
                print(f"\n[bold]Query:[/bold] {query}")
                result = await run_search(search_engine, query)
                print(f"[bold]Response:[/bold]\n{result.response}")
                print("\n[bold]Context Data:[/bold]")
                print("Entities:")
                print(result.context_data["entities"].head())
                print("\nRelationships:")
                print(result.context_data["relationships"].head())
                print("\nReports:")
                print(result.context_data["reports"].head())
                print("\nSources:")
                print(result.context_data["sources"].head())
                if "claims" in result.context_data:
                    print("\nClaims:")
                    print(result.context_data["claims"].head())
```
    
```
            # 问题生成
            question_generator = LocalQuestionGen(
                llm=llm,
                context_builder=context_builder,
                token_encoder=token_encoder,
                llm_params=llm_params,
                context_builder_params=local_context_params,
            )
```
    
```
            question_history = [
                "how to take a screenshot of the page in crawl4ai?",
                "how to set a custom user agent in crawl4ai?",
                "tell me what is Extraction Strategies and show some examples in crawl4ai.",
            ]
            print("\n[bold]Generating questions based on history:[/bold]")
            print(f"History: {question_history}")
            candidate_questions = await generate_questions(question_generator, question_history)
            print("Generated questions:")
            for i, question in enumerate(candidate_questions.response, 1):
                print(f"{i}. {question}")
```
    
        except Exception as e:
            print(f"[bold red]An error occurred:[/bold red] {str(e)}")
    
    
```
    if __name__ == "__main__":
        # 运行主函数
        asyncio.run(main())
```

###  爬虫 
    
    
    #pip install scrapy html2text bs4
    
```
    import scrapy
    from scrapy.crawler import CrawlerProcess
    from bs4 import BeautifulSoup
    import html2text
    import os
    import json
    from urllib.parse import urlparse
```
    
```
    class ContentFocusedSpider(scrapy.Spider):
        name = 'content_focused_spider'
        start_urls = ['https://crawl4ai.com/mkdocs/']
        allowed_domains = ['crawl4ai.com']
```
    
```
        def __init__(self, *args, **kwargs):
            super(ContentFocusedSpider, self).__init__(*args, **kwargs)
            self.h = html2text.HTML2Text()
            self.h.ignore_links = True
            self.h.ignore_images = True
            self.h.ignore_emphasis = True
            self.h.body_width = 0
            self.results = []
```
            
            os.makedirs('.data', exist_ok=True)
            os.makedirs('.data/markdown_files', exist_ok=True)
    
```
        def parse(self, response):
            # 使用 BeautifulSoup 提取主要内容
            soup = BeautifulSoup(response.text, 'html.parser')
```
            
```
            # 移除导航栏、侧边栏、页脚等元素
            for elem in soup(['nav', 'header', 'footer', 'aside']):
                elem.decompose()
```
            
            # 尝试找到主要内容区域
            main_content = soup.find('main') or soup.find('article') or soup.find('div', class_='content')
            
```
            if main_content:
                content = str(main_content)
            else:
                content = str(soup.body)  # 如果找不到明确的主要内容，使用整个 body
```
    
            # 转换为 Markdown
            markdown_content = self.h.handle(content)
    
```
            # 生成文件名并保存
            parsed_url = urlparse(response.url)
            file_path = parsed_url.path.strip('/').replace('/', '_') or 'index'
            markdown_filename = f'.data/markdown_files/{file_path}.md'
```
            
            with open(markdown_filename, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
```
            result = {
                'url': response.url,
                'markdown_file': markdown_filename,
            }
            self.results.append(result)
```
            
```
            # 继续爬取其他链接
            for link in response.css('a::attr(href)').getall():
                yield response.follow(link, self.parse)
```
    
```
        def closed(self, reason):
            with open('.data/markdown_results.json', 'w', encoding='utf-8') as f:
                json.dump(self.results, f, ensure_ascii=False, indent=2)
```
            
```
            print(f"爬取完成。总共爬取了 {len(self.results)} 个页面")
            print("结果元数据保存在 .data/markdown_results.json")
            print("Markdown 文件保存在 .data/markdown_files/ 目录下")
```
    
```
    process = CrawlerProcess(settings={
        'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'ROBOTSTXT_OBEY': True,
        'CONCURRENT_REQUESTS': 1,
        'DOWNLOAD_DELAY': 2,
    })
```
    
    process.crawl(ContentFocusedSpider)
    process.start()

###  fastapi 
    
    
    #pip install fastapi uvicorn
    
```
    #测试命令
    #curl -X POST "http://localhost:8012/v1/completions" -H "Content-Type: application/json" -d '{"prompt": "how to take a screenshot of the page in crawl4ai?"}'
    #curl -X POST "http://localhost:8012/v1/question_generation" -H "Content-Type: application/json" -d '{"question_history": ["how to take a screenshot of the page in crawl4ai?", "how to set a custom user agent in crawl4ai?"], "question_count": 5}'
```
    
```
    import os
    import asyncio
    import time
    import pandas as pd
    import tiktoken
    from fastapi import FastAPI, HTTPException
    from pydantic import BaseModel
    from typing import List, Optional
```
    
```
    # 导入必要的GraphRAG模块和类
    from graphrag.query.context_builder.entity_extraction import EntityVectorStoreKey
    from graphrag.query.indexer_adapters import (
        read_indexer_covariates,
        read_indexer_entities,
        read_indexer_relationships,
        read_indexer_reports,
        read_indexer_text_units,
    )
    from graphrag.query.input.loaders.dfs import store_entity_semantic_embeddings
    from graphrag.query.llm.oai.chat_openai import ChatOpenAI
    from graphrag.query.llm.oai.embedding import OpenAIEmbedding
    from graphrag.query.llm.oai.typing import OpenaiApiType
    from graphrag.query.question_gen.local_gen import LocalQuestionGen
    from graphrag.query.structured_search.local_search.mixed_context import LocalSearchMixedContext
    from graphrag.query.structured_search.local_search.search import LocalSearch
    from graphrag.vector_stores.lancedb import LanceDBVectorStore
```
    
    # 创建FastAPI应用
    app = FastAPI()
    
```
    # 设置常量和配置
    INPUT_DIR = "/Users/charlesqin/PycharmProjects/RAGCode/inputs/artifacts"
    LANCEDB_URI = f"{INPUT_DIR}/lancedb"
    COMMUNITY_REPORT_TABLE = "create_final_community_reports"
    ENTITY_TABLE = "create_final_nodes"
    ENTITY_EMBEDDING_TABLE = "create_final_entities"
    RELATIONSHIP_TABLE = "create_final_relationships"
    COVARIATE_TABLE = "create_final_covariates"
    TEXT_UNIT_TABLE = "create_final_text_units"
    COMMUNITY_LEVEL = 2
```
    
```
    # 全局变量，用于存储搜索引擎和问题生成器
    search_engine = None
    question_generator = None
```
    
    
```
    # 定义API请求的数据模型
    class Query(BaseModel):
        prompt: str
        max_tokens: Optional[int] = 2000
        temperature: Optional[float] = 0.0
```
    
    
```
    class QuestionGenRequest(BaseModel):
        question_history: List[str]
        question_count: Optional[int] = 5
```
    
    
```
    async def setup_llm_and_embedder():
        """
        设置语言模型（LLM）和嵌入模型
        """
        api_key = os.environ["GRAPHRAG_API_KEY"]
        llm_model = os.environ.get("GRAPHRAG_LLM_MODEL", "gpt-3.5-turbo")
        embedding_model = os.environ.get("GRAPHRAG_EMBEDDING_MODEL", "text-embedding-3-small")
```
    
```
        # 初始化ChatOpenAI实例
        llm = ChatOpenAI(
            api_key=api_key,
            model=llm_model,
            api_type=OpenaiApiType.OpenAI,
            max_retries=20,
        )
```
    
        # 初始化token编码器
        token_encoder = tiktoken.get_encoding("cl100k_base")
    
```
        # 初始化文本嵌入模型
        text_embedder = OpenAIEmbedding(
            api_key=api_key,
            api_base=None,
            api_type=OpenaiApiType.OpenAI,
            model=embedding_model,
            deployment_name=embedding_model,
            max_retries=20,
        )
```
    
        return llm, token_encoder, text_embedder
    
    
```
    async def load_context():
        """
        加载上下文数据，包括实体、关系、报告、文本单元和协变量
        """
        # 读取实体数据
        entity_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_TABLE}.parquet")
        entity_embedding_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_EMBEDDING_TABLE}.parquet")
        entities = read_indexer_entities(entity_df, entity_embedding_df, COMMUNITY_LEVEL)
```
    
```
        # 设置和加载实体描述嵌入
        description_embedding_store = LanceDBVectorStore(collection_name="entity_description_embeddings")
        description_embedding_store.connect(db_uri=LANCEDB_URI)
        store_entity_semantic_embeddings(entities=entities, vectorstore=description_embedding_store)
```
    
```
        # 读取关系数据
        relationship_df = pd.read_parquet(f"{INPUT_DIR}/{RELATIONSHIP_TABLE}.parquet")
        relationships = read_indexer_relationships(relationship_df)
```
    
```
        # 读取社区报告数据
        report_df = pd.read_parquet(f"{INPUT_DIR}/{COMMUNITY_REPORT_TABLE}.parquet")
        reports = read_indexer_reports(report_df, entity_df, COMMUNITY_LEVEL)
```
    
```
        # 读取文本单元数据
        text_unit_df = pd.read_parquet(f"{INPUT_DIR}/{TEXT_UNIT_TABLE}.parquet")
        text_units = read_indexer_text_units(text_unit_df)
```
    
```
        # 读取和处理协变量数据
        covariate_df = pd.read_parquet(f"{INPUT_DIR}/{COVARIATE_TABLE}.parquet")
        claims = read_indexer_covariates(covariate_df)
        print(f"Claim records: {len(claims)}")
        covariates = {"claims": claims}
```
    
        return entities, relationships, reports, text_units, description_embedding_store, covariates
    
    
```
    async def setup_search_engine(llm, token_encoder, text_embedder, entities, relationships, reports, text_units,
                                  description_embedding_store, covariates):
        """
        设置搜索引擎，包括上下文构建器和搜索参数
        """
        # 初始化上下文构建器
        context_builder = LocalSearchMixedContext(
            community_reports=reports,
            text_units=text_units,
            entities=entities,
            relationships=relationships,
            covariates=covariates,
            entity_text_embeddings=description_embedding_store,
            embedding_vectorstore_key=EntityVectorStoreKey.ID,
            text_embedder=text_embedder,
            token_encoder=token_encoder,
        )
```
    
```
        # 设置本地上下文参数
        local_context_params = {
            "text_unit_prop": 0.5,
            "community_prop": 0.1,
            "conversation_history_max_turns": 5,
            "conversation_history_user_turns_only": True,
            "top_k_mapped_entities": 10,
            "top_k_relationships": 10,
            "include_entity_rank": True,
            "include_relationship_weight": True,
            "include_community_rank": False,
            "return_candidate_context": False,
            "embedding_vectorstore_key": EntityVectorStoreKey.ID,
            "max_tokens": 12_000,
        }
```
    
```
        # 设置语言模型参数
        llm_params = {
            "max_tokens": 2_000,
            "temperature": 0.0,
        }
```
    
```
        # 初始化本地搜索引擎
        search_engine = LocalSearch(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            llm_params=llm_params,
            context_builder_params=local_context_params,
            response_type="multiple paragraphs",
        )
```
    
        return search_engine, context_builder, llm_params, local_context_params
    
    
```
    @app.on_event("startup")
    async def startup_event():
        """
        应用启动时的初始化事件
        """
        global search_engine, question_generator
```
    
        # 设置语言模型和嵌入器
        llm, token_encoder, text_embedder = await setup_llm_and_embedder()
    
        # 加载上下文数据
        entities, relationships, reports, text_units, description_embedding_store, covariates = await load_context()
    
```
        # 设置搜索引擎
        search_engine, context_builder, llm_params, local_context_params = await setup_search_engine(
            llm, token_encoder, text_embedder, entities, relationships, reports, text_units,
            description_embedding_store, covariates
        )
```
    
```
        # 设置问题生成器
        question_generator = LocalQuestionGen(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            llm_params=llm_params,
            context_builder_params=local_context_params,
        )
```
    
    
```
    @app.post("/v1/completions")
    async def create_completion(query: Query):
        """
        处理文本补全请求的API端点
        """
        if not search_engine:
            raise HTTPException(status_code=500, detail="搜索引擎未初始化")
```
    
```
        try:
            # 执行搜索
            result = await search_engine.asearch(query.prompt)
            # 返回格式化的响应
            return {
                "id": "cmpl-" + os.urandom(12).hex(),
                "object": "text_completion",
                "created": int(time.time()),
                "model": "graphrag-local-search",
                "choices": [
                    {
                        "text": result.response,
                        "index": 0,
                        "logprobs": None,
                        "finish_reason": "stop"
                    }
                ],
                "usage": {
                    "prompt_tokens": len(query.prompt.split()),
                    "completion_tokens": len(result.response.split()),
                    "total_tokens": len(query.prompt.split()) + len(result.response.split())
                }
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
```
    
    
```
    @app.post("/v1/question_generation")
    async def generate_questions(request: QuestionGenRequest):
        """
        处理问题生成请求的API端点
        """
        if not question_generator:
            raise HTTPException(status_code=500, detail="问题生成器未初始化")
```
    
```
        try:
            # 生成候选问题
            candidate_questions = await question_generator.agenerate(
                question_history=request.question_history,
                context_data=None,
                question_count=request.question_count
            )
            # 返回格式化的响应
            return {
                "id": "qgen-" + os.urandom(12).hex(),
                "object": "question_generation",
                "created": int(time.time()),
                "model": "graphrag-question-generator",
                "choices": [
                    {
                        "questions": candidate_questions.response,
                        "index": 0
                    }
                ]
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
```
    
    
```
    if __name__ == "__main__":
        # 使用uvicorn运行FastAPI应用
        import uvicorn
```
    
        uvicorn.run(app, host="0.0.0.0", port=8012)

###  chainlit 
    
    
```
    #pip install chainlit
    import os
    import aiohttp
    import chainlit as cl
    import logging
```
    
    # 设置环境变量，防止 Chainlit 加载 .env 文件
    os.environ["CHAINLIT_AUTO_LOAD_DOTENV"] = "false"
    
```
    # 设置日志
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
```
    
    API_BASE_URL = "http://localhost:8012"  # 注意：这里使用了8012端口，请确保与您的API端口一致
    
    
```
    class CustomAsyncClient:
        def __init__(self, base_url: str):
            self.base_url = base_url
            self.chat = self.Chat(base_url)
```
    
```
        class Chat:
            def __init__(self, base_url: str):
                self.base_url = base_url
                self.completions = self.Completions(base_url)
```
    
```
            class Completions:
                def __init__(self, base_url: str):
                    self.base_url = base_url
```
    
```
                async def create(self, messages: list, **kwargs):
                    logger.info(f"Sending request to {self.base_url}/v1/completions")
                    try:
                        async with aiohttp.ClientSession() as session:
                            async with session.post(
                                    f"{self.base_url}/v1/completions",
                                    json={"prompt": messages[-1]["content"], **kwargs}
                            ) as response:
                                logger.info(f"Received response with status {response.status}")
                                if response.status == 200:
                                    data = await response.json()
                                    logger.info(f"Response data: {data}")
                                    return data
                                else:
                                    error_text = await response.text()
                                    logger.error(f"API request failed with status {response.status}: {error_text}")
                                    raise Exception(f"API request failed with status {response.status}: {error_text}")
                    except Exception as e:
                        logger.error(f"Error in create method: {str(e)}")
                        raise
```
    
    
    client = CustomAsyncClient(API_BASE_URL)
    
```
    settings = {
        "model": "graphrag-local-search",
        "temperature": 0,
    }
```
    
    
```
    @cl.on_message
    async def on_message(message: cl.Message):
        logger.info(f"Received message: {message.content}")
        try:
            # 发送"处理中"的消息
            processing_message = cl.Message(content="Processing your request...")
            await processing_message.send()
```
    
```
            response = await client.chat.completions.create(
                messages=[
                    {
                        "content": "You are a helpful bot based on GraphRAG",
                        "role": "system"
                    },
                    {
                        "content": message.content,
                        "role": "user"
                    }
                ],
                **settings
            )
```
    
            response_content = response['choices'][0]['text']
            logger.info(f"Sending response: {response_content}")
    
            # 创建新消息而不是更新旧消息
            await cl.Message(content=response_content).send()
    
            # 移除"处理中"的消息
            await processing_message.remove()
    
```
        except Exception as e:
            logger.error(f"Error in on_message: {str(e)}")
            error_message = f"An error occurred: {str(e)}"
            # 创建新的错误消息
            await cl.Message(content=error_message).send()
            # 移除"处理中"的消息
            await processing_message.remove()
```
    
    
```
    @cl.on_chat_start
    async def on_chat_start():
        logger.info("New chat started")
        await cl.Message(content="Welcome! I'm your GraphRAG assistant. How can I help you today?").send()
```
    
    
```
    if __name__ == "__main__":
        logger.info("Starting Chainlit application")
        cl.run()
```
    
    
