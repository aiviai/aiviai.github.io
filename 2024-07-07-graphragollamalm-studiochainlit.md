---
layout: single
title: "GraphRAG+ollama+LM Studio+chainlit高级用法"
sidebar:
  nav: "docs"
date: 2024-07-07 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG]
tags: [AI, AI-Agents, Chainlit, GPT, GraphRAG, LLM, Ollama, RAG]
classes: wide
author_profile: true
---


#  GraphRAG+ollama+LM Studio+chainlit高级用法 

###  ollama下载模型 
    
    
    ollama run gemma2:9b

###  graphrag设置 
    
    
    pip install graphrag
    
    python -m graphrag.index --init --root ./ragpdf
    
    python -m graphrag.index --root ./ragpdf
    

###  本地模型配置 
    
    
```
    encoding_model: cl100k_base
    skip_workflows: []
    llm:
      api_key: ollama
      type: openai_chat # or azure_openai_chat
      model: gemma2:latest
      model_supports_json: true # recommended if this is available for your model.
      api_base: http://localhost:11434/v1
```
    
    
```
    embeddings:
      ## parallelization: override the global parallelization settings for embeddings
      async_mode: threaded # or asyncio
      llm:
        api_key: lm-studio
        type: openai_embedding # or azure_openai_embedding
        model: nomic-ai/nomic-embed-text-v1.5-GGUF/nomic-embed-text-v1.5.Q5_K_M.gguf
        api_base:  http://localhost:1234/v1
```

###  pdf转markdown，markdown转txt 
    
    
    #测试文档 https://github.com/win4r/mytest/blob/main/book.pdf
    
    pip install marker-pdf
    
    marker_single ./book.pdf ./pdftxt --batch_multiplier 2 --max_pages 60 --langs English
    
    #markdown转txt
    python markdown_to_text.py book.md book.txt
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  设置API key和模型名称 
    
    
```
    export GRAPHRAG_API_KEY="sk-xggd2443fg"
    export GRAPHRAG_LLM_MODEL="gpt-3.5-turbo"
    export GRAPHRAG_EMBEDDING_MODEL="text-embedding-ada-002"
```
    

###  global search 
    
    
```
    import os
    import asyncio
    import pandas as pd
    import tiktoken
```
    
```
    from graphrag.query.indexer_adapters import read_indexer_entities, read_indexer_reports
    from graphrag.query.llm.oai.chat_openai import ChatOpenAI
    from graphrag.query.llm.oai.typing import OpenaiApiType
    from graphrag.query.structured_search.global_search.community_context import (
        GlobalCommunityContext,
    )
    from graphrag.query.structured_search.global_search.search import GlobalSearch
```
    
```
    async def main():
        # 设置语言模型（LLM）
        # 从环境变量中获取API密钥和模型名称
        api_key = os.environ.get("GRAPHRAG_API_KEY")
        llm_model = os.environ.get("GRAPHRAG_LLM_MODEL")
```
    
```
        # 初始化ChatOpenAI实例
        llm = ChatOpenAI(
            api_key=api_key,
            model=llm_model,
            api_type=OpenaiApiType.OpenAI,  # 使用OpenAI API
            max_retries=20,  # 最大重试次数
        )
```
    
        # 初始化token编码器
        token_encoder = tiktoken.get_encoding("cl100k_base")
    
```
        # 加载社区报告作为全局搜索的上下文
        INPUT_DIR = "./inputs/operation dulce"  # 输入目录
        COMMUNITY_REPORT_TABLE = "create_final_community_reports"  # 社区报告表名
        ENTITY_TABLE = "create_final_nodes"  # 实体表名
        ENTITY_EMBEDDING_TABLE = "create_final_entities"  # 实体嵌入表名
```
    
```
        COMMUNITY_LEVEL = 2  # Leiden社区层次结构中的社区级别
        # 读取parquet文件
        entity_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_TABLE}.parquet")
        report_df = pd.read_parquet(f"{INPUT_DIR}/{COMMUNITY_REPORT_TABLE}.parquet")
        entity_embedding_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_EMBEDDING_TABLE}.parquet")
```
    
```
        # 读取索引器报告和实体
        reports = read_indexer_reports(report_df, entity_df, COMMUNITY_LEVEL)
        entities = read_indexer_entities(entity_df, entity_embedding_df, COMMUNITY_LEVEL)
        print(f"报告记录数: {len(report_df)}")
        print(report_df.head())
```
    
```
        # 基于社区报告构建全局上下文
        context_builder = GlobalCommunityContext(
            community_reports=reports,
            entities=entities,  # 用于计算上下文排序的社区权重
            token_encoder=token_encoder,
        )
```
    
```
        # 执行全局搜索
        # 设置上下文构建器参数
        context_builder_params = {
            "use_community_summary": False,  # 使用完整的社区报告，而不是摘要
            "shuffle_data": True,  # 随机打乱数据
            "include_community_rank": True,  # 包括社区排名
            "min_community_rank": 0,  # 最小社区排名
            "community_rank_name": "rank",  # 社区排名的名称
            "include_community_weight": True,  # 包括社区权重
            "community_weight_name": "occurrence weight",  # 社区权重的名称
            "normalize_community_weight": True,  # 标准化社区权重
            "max_tokens": 12_000,  # 最大token数
            "context_name": "Reports",  # 上下文名称
        }
```
    
```
        # 设置map LLM参数
        map_llm_params = {
            "max_tokens": 1000,  # 最大生成token数
            "temperature": 0.0,  # 温度参数，控制输出的随机性
            "response_format": {"type": "json_object"},  # 响应格式为JSON对象
        }
```
    
```
        # 设置reduce LLM参数
        reduce_llm_params = {
            "max_tokens": 2000,  # 最大生成token数
            "temperature": 0.0,  # 温度参数，控制输出的随机性
        }
```
    
```
        # 初始化全局搜索引擎
        search_engine = GlobalSearch(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            max_data_tokens=12_000,  # 最大数据token数
            map_llm_params=map_llm_params,
            reduce_llm_params=reduce_llm_params,
            allow_general_knowledge=False,  # 不允许使用通用知识
            json_mode=True,  # 使用JSON模式
            context_builder_params=context_builder_params,
            concurrent_coroutines=32,  # 并发协程数
            response_type="multiple paragraphs",  # 响应类型为多个段落
        )
```
    
```
        # 执行异步搜索
        result = await search_engine.asearch(
            "这个故事中的主要冲突是什么，谁是主角和反派？"
        )
```
    
```
        # 打印搜索结果
        print(result.response)
        print("上下文数据报告:")
        print(result.context_data["reports"])
        print(f"LLM调用次数: {result.llm_calls}. LLM tokens数: {result.prompt_tokens}")
```
    
    if __name__ == "__main__":
        asyncio.run(main())  # 运行异步主函数

###  local search 
    
    
```
    import os
    import asyncio
    import pandas as pd
    import tiktoken
```
    
```
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
    async def main():
        # 设置输入目录和数据表名
        INPUT_DIR = "./inputs/operation dulce"
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
        # 读取协变量数据
        covariate_df = pd.read_parquet(f"{INPUT_DIR}/{COVARIATE_TABLE}.parquet")
        claims = read_indexer_covariates(covariate_df)
        covariates = {"claims": claims}
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
        # 设置LLM和嵌入模型
        api_key = os.environ["GRAPHRAG_API_KEY"]
        llm_model = os.environ["GRAPHRAG_LLM_MODEL"]
        embedding_model = os.environ["GRAPHRAG_EMBEDDING_MODEL"]
```
    
```
        llm = ChatOpenAI(
            api_key=api_key,
            model=llm_model,
            api_type=OpenaiApiType.OpenAI,
            max_retries=20,
        )
```
    
        token_encoder = tiktoken.get_encoding("cl100k_base")
    
```
        text_embedder = OpenAIEmbedding(
            api_key=api_key,
            api_base=None,
            api_type=OpenaiApiType.OpenAI,
            model=embedding_model,
            deployment_name=embedding_model,
            max_retries=20,
        )
```
    
```
        # 创建本地搜索上下文构建器
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
        # 设置本地搜索参数
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
        llm_params = {
            "max_tokens": 2_000,
            "temperature": 0.0,
        }
```
    
```
        # 创建本地搜索引擎
        search_engine = LocalSearch(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            llm_params=llm_params,
            context_builder_params=local_context_params,
            response_type="multiple paragraphs",
        )
```
    
```
        # 运行本地搜索示例
        result = await search_engine.asearch("Tell me about Agent Mercer")
        print(result.response)
```
    
        result = await search_engine.asearch("Tell me about Dr. Jordan Hayes")
        print(result.response)
    
```
        # 创建问题生成器
        question_generator = LocalQuestionGen(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            llm_params=llm_params,
            context_builder_params=local_context_params,
        )
```
    
```
        # 生成候选问题
        question_history = [
            "Tell me about Agent Mercer",
            "What happens in Dulce military base?",
        ]
        candidate_questions = await question_generator.agenerate(
            question_history=question_history, context_data=None, question_count=5
        )
        print(candidate_questions.response)
```
    
    if __name__ == "__main__":
        asyncio.run(main())

###  global-ui 
    
    
```
    import os
    import asyncio
    import pandas as pd
    import tiktoken
    import chainlit as cl
```
    
```
    from graphrag.query.indexer_adapters import read_indexer_entities, read_indexer_reports
    from graphrag.query.llm.oai.chat_openai import ChatOpenAI
    from graphrag.query.llm.oai.typing import OpenaiApiType
    from graphrag.query.structured_search.global_search.community_context import GlobalCommunityContext
    from graphrag.query.structured_search.global_search.search import GlobalSearch
```
    
    # 全局变量
    search_engine = None
    
    
```
    @cl.on_chat_start
    async def on_chat_start():
        global search_engine
```
    
```
        # 从环境变量中获取API密钥和模型名称
        api_key = os.environ.get("GRAPHRAG_API_KEY")
        if not api_key:
            await cl.Message(content="错误：GRAPHRAG_API_KEY 未设置").send()
            raise ValueError("GRAPHRAG_API_KEY 环境变量未设置")
```
    
        llm_model = os.environ.get("GRAPHRAG_LLM_MODEL", "gpt-3.5-turbo")
    
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
        # 加载社区报告作为全局搜索的上下文
        INPUT_DIR = "./inputs/operation dulce"
        COMMUNITY_REPORT_TABLE = "create_final_community_reports"
        ENTITY_TABLE = "create_final_nodes"
        ENTITY_EMBEDDING_TABLE = "create_final_entities"
        COMMUNITY_LEVEL = 2
```
    
```
        try:
            # 读取parquet文件
            entity_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_TABLE}.parquet")
            report_df = pd.read_parquet(f"{INPUT_DIR}/{COMMUNITY_REPORT_TABLE}.parquet")
            entity_embedding_df = pd.read_parquet(f"{INPUT_DIR}/{ENTITY_EMBEDDING_TABLE}.parquet")
        except FileNotFoundError as e:
            await cl.Message(content=f"错误：找不到所需的parquet文件。{str(e)}").send()
            return
```
    
```
        # 读取索引器报告和实体
        reports = read_indexer_reports(report_df, entity_df, COMMUNITY_LEVEL)
        entities = read_indexer_entities(entity_df, entity_embedding_df, COMMUNITY_LEVEL)
        await cl.Message(content=f"报告记录数: {len(report_df)}").send()
```
    
```
        # 基于社区报告构建全局上下文
        context_builder = GlobalCommunityContext(
            community_reports=reports,
            entities=entities,
            token_encoder=token_encoder,
        )
```
    
```
        # 设置上下文构建器参数
        context_builder_params = {
            "use_community_summary": False,
            "shuffle_data": True,
            "include_community_rank": True,
            "min_community_rank": 0,
            "community_rank_name": "rank",
            "include_community_weight": True,
            "community_weight_name": "occurrence weight",
            "normalize_community_weight": True,
            "max_tokens": 12_000,
            "context_name": "Reports",
        }
```
    
```
        # 设置map LLM参数
        map_llm_params = {
            "max_tokens": 1000,
            "temperature": 0.0,
            "response_format": {"type": "json_object"},
        }
```
    
```
        # 设置reduce LLM参数
        reduce_llm_params = {
            "max_tokens": 2000,
            "temperature": 0.0,
        }
```
    
```
        # 初始化全局搜索引擎
        search_engine = GlobalSearch(
            llm=llm,
            context_builder=context_builder,
            token_encoder=token_encoder,
            max_data_tokens=12_000,
            map_llm_params=map_llm_params,
            reduce_llm_params=reduce_llm_params,
            allow_general_knowledge=False,
            json_mode=True,
            context_builder_params=context_builder_params,
            concurrent_coroutines=32,
            response_type="multiple paragraphs",
        )
```
    
        await cl.Message(content="全局搜索系统已准备就绪，请输入您的查询。").send()
    
    
```
    @cl.on_message
    async def main(message: cl.Message):
        global search_engine
```
    
```
        if search_engine is None:
            await cl.Message(content="搜索引擎尚未初始化。请稍后再试。").send()
            return
```
    
        query = message.content
        result = await search_engine.asearch(query)
    
        # 发送搜索结果
        await cl.Message(content=result.response).send()
    
```
        # 发送上下文数据报告
        context_data = f"上下文数据报告数量: {len(result.context_data['reports'])}"
        await cl.Message(content=context_data).send()
```
    
```
        # 发送LLM调用信息
        llm_info = f"LLM调用次数: {result.llm_calls}. LLM tokens数: {result.prompt_tokens}"
        await cl.Message(content=llm_info).send()
```
    
    
    if __name__ == "__main__":
        cl.run()

###  local-ui 
    
    
```
    import os
    import asyncio
    import pandas as pd
    import tiktoken
    import chainlit as cl
```
    
```
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
    # 全局变量
    search_engine = None
    question_generator = None
    question_history = []
```
    
    
```
    @cl.on_chat_start
    async def on_chat_start():
        global search_engine, question_generator
```
    
```
        try:
            # 设置输入目录和数据表名
            INPUT_DIR = "./inputs/operation dulce"
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
            # 读取协变量数据
            covariate_df = pd.read_parquet(f"{INPUT_DIR}/{COVARIATE_TABLE}.parquet")
            claims = read_indexer_covariates(covariate_df)
            covariates = {"claims": claims}
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
            # 设置LLM和嵌入模型
            api_key = os.environ.get("GRAPHRAG_API_KEY")
            if not api_key:
                raise ValueError("GRAPHRAG_API_KEY 环境变量未设置")
            llm_model = os.environ.get("GRAPHRAG_LLM_MODEL", "gpt-3.5-turbo")
            embedding_model = os.environ.get("GRAPHRAG_EMBEDDING_MODEL", "text-embedding-3-small")
```
    
```
            llm = ChatOpenAI(
                api_key=api_key,
                model=llm_model,
                api_type=OpenaiApiType.OpenAI,
                max_retries=20,
            )
```
    
            token_encoder = tiktoken.get_encoding("cl100k_base")
    
```
            text_embedder = OpenAIEmbedding(
                api_key=api_key,
                api_base=None,
                api_type=OpenaiApiType.OpenAI,
                model=embedding_model,
                deployment_name=embedding_model,
                max_retries=20,
            )
```
    
```
            # 创建本地搜索上下文构建器
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
            # 设置本地搜索参数
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
            llm_params = {
                "max_tokens": 2_000,
                "temperature": 0.0,
            }
```
    
```
            # 创建本地搜索引擎
            search_engine = LocalSearch(
                llm=llm,
                context_builder=context_builder,
                token_encoder=token_encoder,
                llm_params=llm_params,
                context_builder_params=local_context_params,
                response_type="multiple paragraphs",
            )
```
    
```
            # 创建问题生成器
            question_generator = LocalQuestionGen(
                llm=llm,
                context_builder=context_builder,
                token_encoder=token_encoder,
                llm_params=llm_params,
                context_builder_params=local_context_params,
            )
```
    
            await cl.Message(
                content="本地搜索系统和问题生成器已准备就绪。您可以开始提问，或输入 '/generate' 来生成新的问题。").send()
    
        except Exception as e:
            await cl.Message(content=f"初始化过程中发生错误: {str(e)}").send()
    
    
```
    @cl.on_message
    async def main(message: cl.Message):
        global search_engine, question_generator, question_history
```
    
```
        if search_engine is None or question_generator is None:
            await cl.Message(content="系统尚未完全初始化，请稍后再试。").send()
            return
```
    
```
        try:
            if message.content.strip().lower() == "/generate":
                # 生成新问题
                await cl.Message(content="正在生成问题，请稍候...").send()
                candidate_questions = await question_generator.agenerate(
                    question_history=question_history, context_data=None, question_count=5
                )
                if isinstance(candidate_questions.response, list):
                    questions_text = "\n".join([f"{i + 1}. {q}" for i, q in enumerate(candidate_questions.response)])
                else:
                    questions_text = candidate_questions.response
                await cl.Message(content=f"以下是一些建议的问题：\n{questions_text}").send()
            else:
                # 执行搜索
                await cl.Message(content="正在处理您的问题，请稍候...").send()
                question_history.append(message.content)
                result = await search_engine.asearch(message.content)
```
    
                await cl.Message(content=result.response).send()
    
                context_data = f"上下文数据报告数量: {len(result.context_data['reports'])}"
                await cl.Message(content=context_data).send()
    
```
                llm_info = f"LLM调用次数: {result.llm_calls}. LLM tokens数: {result.prompt_tokens}"
                await cl.Message(content=llm_info).send()
        except Exception as e:
            error_message = f"处理您的请求时发生错误: {str(e)}"
            await cl.Message(content=error_message).send()
            print(f"Error in main function: {str(e)}")  # 为了调试目的，在控制台打印错误
```
    
    
    if __name__ == "__main__":
        cl.run()

###  markdown_to_text.py 
    
    
    ##运行方式 python markdown_to_text.py book.md book.txt
    
```
    import markdown
    from bs4 import BeautifulSoup
    import re
    import argparse
```
    
    
```
    def markdown_to_text(markdown_content):
        # Convert Markdown to HTML
        html = markdown.markdown(markdown_content)
```
    
```
        # Use BeautifulSoup to parse HTML and extract text
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.get_text(separator='\n\n')
```
    
```
        # Additional cleaning
        text = re.sub(r'\n{3,}', '\n\n', text)  # Replace multiple newlines with double newlines
        text = text.strip()  # Remove leading/trailing whitespace
```
    
        return text
    
    
```
    def convert_file(input_file, output_file):
        # Read the Markdown file
        with open(input_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
```
    
        # Convert to plain text
        plain_text = markdown_to_text(markdown_content)
    
```
        # Write the plain text to the output file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(plain_text)
```
    
    
```
    if __name__ == "__main__":
        parser = argparse.ArgumentParser(description="Convert Markdown file to plain text")
        parser.add_argument("input_file", help="Path to the input Markdown file")
        parser.add_argument("output_file", help="Path to the output plain text file")
        args = parser.parse_args()
```
    
        convert_file(args.input_file, args.output_file)
        print(f"Conversion complete. Plain text saved to {args.output_file}")
