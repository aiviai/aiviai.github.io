---
layout: single
title: "kotaemon vs Haystack，从UI界面到代码实现，企业级应用更得心应手"
sidebar:
  nav: "docs"
date: 2024-10-20 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG]
tags: [AI, GPT, GPT-4, LLM, RAG]
classes: wide
author_profile: true
---


#  **kotaemon vs Haystack，从UI界面到代码实现，企业级应用更得心应手**

[ https://github.com/Cinnamon/kotaemon/tree/main ](<https://github.com/Cinnamon/kotaemon/tree/main>)

###  🔥安装 **kotaemon**
    
    
```
    docker run \
    -e GRADIO_SERVER_NAME=0.0.0.0 \
    -e GRADIO_SERVER_PORT=7860 \
    -p 7860:7860 -it --rm \
    --platform linux/arm64 \
    ghcr.io/cinnamon/kotaemon:main-lite
```
    
    
    # Create a virtual environment
    python3.10 -m venv kotaemon_env
    
```
    # Activate the virtual environment
    # On Unix or MacOS, use:
    source kotaemon_env/bin/activate
    # On Windows, use:
    # kotaemon_env\Scripts\activate
```
    
```
    # Clone the repository
    git clone https://github.com/Cinnamon/kotaemon
    cd kotaemon
```
    
```
    # Install kotaemon and its dependencies
    pip install -e "libs/kotaemon[all]"
    pip install -e "libs/ktem"
```
    
    # When you're done, you can deactivate the virtual environment
    # deactivate
    

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  **🔥kotaemon介绍**

###  🚀Kotaemon 是一个开源的项目，专注于构建和使用基于检索增强生成（RAG）的管道，主要用于文档的问答任务。它提供了一个简洁的用户界面，允许用户通过混合检索（全文和向量检索相结合）在文档中进行高效查询，确保返回结果的高相关性。 

###  🚀Kotaemon 支持多个大语言模型（LLMs），包括来自 OpenAI 和 Azure 等提供商的 API，以及使用本地模型（如 llama-cpp-python）的能力。其主要功能包括支持多用户登录、管理私密和公共文档集合，并且能够组织和管理各种 LLM 和嵌入模型。 

###  🚀对于开发者，Kotaemon 提供了一个灵活的框架，能够轻松构建自定义的 RAG 管道，且集成了基于 Gradio 的交互式 UI，支持进一步的自定义。此外，该系统支持复杂推理功能，如问题分解、多跳问题推理等，并可通过 Docker 容器部署，简化安装和扩展。 

###  🔥Haystack介绍 

###  🚀Haystack 是一个开源的 AI 协作框架，旨在构建基于大型语言模型（LLM）的企业级应用程序。该框架非常适合构建检索增强生成（RAG）、问答系统、语义搜索和聊天机器人等应用。 

###  🚀主要特点： 

  1. **模块化管道** ：Haystack 通过组合不同的组件，如检索器、生成器和文档存储，帮助开发者构建复杂的 AI 管道。每个组件可以根据具体需求进行自定义配置。 


  2. **技术无关性** ：Haystack 支持多种技术和模型集成，包括 OpenAI、Cohere、Hugging Face 等。用户可以根据不同的需求在各种模型和数据库之间灵活切换。 


  3. **检索增强生成 (RAG) 和语义搜索** ：Haystack 擅长 RAG，检索器会根据查询获取相关文档，而 LLM 则生成上下文相关的答案。这个特性在客户支持、知识库等需要精确文档检索和生成答案的场景中非常有用。 


  4. **文档存储** ：Haystack 支持多种文档存储选项，如 Elasticsearch、FAISS 和 InMemoryDocumentStore，方便管理和快速检索大量数据。 


  5. **可扩展性** ：框架支持开发者创建自定义组件或与第三方服务集成，这使得 Haystack 适用于研究和企业级应用。 


###  Haystack代码 
    
    
    ! pip install --upgrade --quiet pymilvus milvus-haystack markdown-it-py mdit_plain
    
    import os
    
    from google.colab import userdata
    
    
    os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')
    
    
    import os
    import urllib.request
    
    url = "https://raw.githubusercontent.com/win4r/mytest/refs/heads/main/book.txt"
    file_path = "./davinci.txt"
    
    if not os.path.exists(file_path):
        urllib.request.urlretrieve(url, file_path)
        
        
```
    from haystack import Pipeline
    from haystack.components.converters import MarkdownToDocument
    from haystack.components.embedders import OpenAIDocumentEmbedder, OpenAITextEmbedder
    from haystack.components.preprocessors import DocumentSplitter
    from haystack.components.writers import DocumentWriter
    from haystack.utils import Secret
```
    
    from milvus_haystack import MilvusDocumentStore
    from milvus_haystack.milvus_embedding_retriever import MilvusEmbeddingRetriever
    
    
```
    document_store = MilvusDocumentStore(
        connection_args={"uri": "./milvus.db"},
        # connection_args={"uri": "http://localhost:19530"},
        # connection_args={"uri": YOUR_ZILLIZ_CLOUD_URI, "token": Secret.from_env_var("ZILLIZ_CLOUD_API_KEY")},
        drop_old=True,
    )
```
    
    
```
    indexing_pipeline = Pipeline()
    indexing_pipeline.add_component("converter", MarkdownToDocument())
    indexing_pipeline.add_component(
        "splitter", DocumentSplitter(split_by="sentence", split_length=2)
    )
    indexing_pipeline.add_component("embedder", OpenAIDocumentEmbedder())
    indexing_pipeline.add_component("writer", DocumentWriter(document_store))
    indexing_pipeline.connect("converter", "splitter")
    indexing_pipeline.connect("splitter", "embedder")
    indexing_pipeline.connect("embedder", "writer")
    indexing_pipeline.run({"converter": {"sources": [file_path]}})
```
    
    print("Number of documents:", document_store.count_documents())
    
    
    question = 'Provide some examples of Seed-word Prompts'
    
```
    retrieval_pipeline = Pipeline()
    retrieval_pipeline.add_component("embedder", OpenAITextEmbedder())
    retrieval_pipeline.add_component(
        "retriever", MilvusEmbeddingRetriever(document_store=document_store, top_k=3)
    )
    retrieval_pipeline.connect("embedder", "retriever")
```
    
    retrieval_results = retrieval_pipeline.run({"embedder": {"text": question}})
    
```
    for doc in retrieval_results["retriever"]["documents"]:
        print(doc.content)
        print("-" * 10)
```
        
```
    from haystack.utils import Secret
    from haystack.components.builders import PromptBuilder
    from haystack.components.generators import OpenAIGenerator
```
    
```
    prompt_template = """Answer the following query based on the provided context. If the context does
                         not include an answer, reply with 'I don't know'.\n
                         Query: {{query}}
                         Documents:
                         {% for doc in documents %}
                            {{ doc.content }}
                         {% endfor %}
                         Answer:
                      """
```
    
```
    rag_pipeline = Pipeline()
    rag_pipeline.add_component("text_embedder", OpenAITextEmbedder())
    rag_pipeline.add_component(
        "retriever", MilvusEmbeddingRetriever(document_store=document_store, top_k=3)
    )
    rag_pipeline.add_component("prompt_builder", PromptBuilder(template=prompt_template))
    rag_pipeline.add_component(
        "generator",
        OpenAIGenerator(
            model="gpt-4o-mini",
            api_key=Secret.from_token(os.environ["OPENAI_API_KEY"]),
            generation_kwargs={"temperature": 0},
        ),
    )
    rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
    rag_pipeline.connect("retriever.documents", "prompt_builder.documents")
    rag_pipeline.connect("prompt_builder", "generator")
```
    
```
    results = rag_pipeline.run(
        {
            "text_embedder": {"text": question},
            "prompt_builder": {"query": question},
        }
    )
    print("RAG answer:", results["generator"]["replies"][0])
```
    
    
    !pip install deepeval-haystack
    
    
```
    from haystack import Pipeline
    from haystack_integrations.components.evaluators.deepeval import DeepEvalEvaluator, DeepEvalMetric
    from tabulate import tabulate
```
    
    
```
    pipeline = Pipeline()
    evaluator = DeepEvalEvaluator(
        metric=DeepEvalMetric.FAITHFULNESS,
        metric_params={"model": "gpt-3.5-turbo-1106"},
    )
    pipeline.add_component("evaluator", evaluator)
```
    
    
    
```
    results = pipeline.run({
        "evaluator": {
            "questions": [
                "When was the Rhodes Statue built?",
                "Where is the Pyramid of Giza located?",
                "Who wrote 'To Kill a Mockingbird'?",
                "What is the capital of Japan?",
                "When did World War II end?",
                "What is the largest planet in our solar system?",
                "Who painted the Mona Lisa?",
                "What is the chemical symbol for gold?",
                "What year did the Titanic sink?",
                "Who is credited with inventing the telephone?"
            ],
            "contexts": [
                ["The Rhodes Statue, a memorial to Cecil John Rhodes, was erected in 1934 at the University of Cape Town. It was removed in 2015 following student protests."],
                ["The Great Pyramid of Giza is located on the Giza Plateau, on the west bank of the Nile River, on the outskirts of modern-day Cairo, Egypt."],
                ["'To Kill a Mockingbird' is a novel by Harper Lee published in 1960. It won the Pulitzer Prize and has become a classic of modern American literature."],
                ["Tokyo is the capital city of Japan. It became the official capital in 1868 when the Meiji Emperor moved his seat to the city from the old capital of Kyoto."],
                ["World War II ended in 1945. The war in Europe concluded on May 7, 1945, when German forces surrendered. The Pacific War ended on August 15, 1945, when Japan surrendered."],
                ["Jupiter is the largest planet in our solar system. It is a gas giant with a mass more than two and a half times that of all the other planets in the solar system combined."],
                ["The Mona Lisa was painted by the Italian Renaissance artist Leonardo da Vinci. It is believed to have been painted between 1503 and 1506, although Leonardo may have continued working on it until 1517."],
                ["The chemical symbol for gold is Au. This symbol comes from the Latin word for gold, 'aurum', which means 'shining dawn'."],
                ["The RMS Titanic sank in the early morning hours of April 15, 1912, after striking an iceberg during her maiden voyage from Southampton to New York City."],
                ["Alexander Graham Bell is credited with inventing the telephone. He was granted the first U.S. patent for the telephone in 1876."]
            ],
            "responses": [
                "The Rhodes Statue was built in 1934 at the University of Cape Town.",
                "The Pyramid of Giza is located in Egypt, near Cairo, on the west bank of the Nile River.",
                "To Kill a Mockingbird was written by Harper Lee.",
                "The capital of Japan is Tokyo.",
                "World War II ended in 1945, with Germany surrendering in May and Japan in August.",
                "Jupiter is the largest planet in our solar system.",
                "The Mona Lisa was painted by Leonardo da Vinci.",
                "The chemical symbol for gold is Au.",
                "The Titanic sank in 1912.",
                "Alexander Graham Bell invented the telephone."
            ]
        }
    })
```
    
    
    
```
    # Prepare data for tabulation
    table_data = []
    for i, evaluation in enumerate(results['evaluator']['results'], 1):
        for result in evaluation:
            table_data.append([
                f"Question {i}",
                result['name'],
                result['score'],
                result['explanation']
            ])
```
    
```
    # Print table
    print("\nEvaluation Results:")
    print(tabulate(table_data, headers=["Question", "Metric", "Score", "Explanation"], tablefmt="grid"))
```
    
    
    
    
```
    from haystack.components.generators import OpenAIGenerator
    from haystack.utils import Secret
    import os
```
    
```
    client = OpenAIGenerator(model="gpt-4o-mini", api_key=Secret.from_token(os.environ["OPENAI_API_KEY"]))
    response = client.run("tell me a joke.")
    print(response['replies'][0])
```
    
    
    
```
    from haystack.components.generators import OpenAIGenerator
    from haystack.utils import Secret
    import os
```
    
    client = OpenAIGenerator(model="gpt-4o-mini", api_key=Secret.from_token(os.environ["OPENAI_API_KEY"]),streaming_callback=lambda chunk: print(chunk.content, end="", flush=True))
    response = client.run("tell me a joke.")
    
    
    
    
    
    
