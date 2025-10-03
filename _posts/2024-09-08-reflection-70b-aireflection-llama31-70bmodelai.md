---
layout: single
title: "Reflection 70B-AI界的新星来袭：深度解析Reflection-Llama3.1-70b模型，揭秘其超强推理能力与自我纠错技术，带你体验AI思维的革命性突破"
sidebar:
  nav: "docs"
date: 2024-09-08 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG, Tutorial]
tags: [AI, AI-Agents, AutoGen, DeepSeek, HuggingFace, LLM, Llama-3, LlamaIndex, Ollama, RAG]
classes: wide
author_profile: true
---


#  **Reflection 70B-AI界的新星来袭：深度解析Reflection-Llama3.1-70b模型，揭秘其超强推理能力与自我纠错技术，带你体验AI思维的革命性突破**

###  hugging face 

[ https://huggingface.co/mattshumer/Reflection-Llama-3.1-70B ](<https://huggingface.co/mattshumer/Reflection-Llama-3.1-70B>)

###  算法测试 

[ https://leetcode.com/problems/text-justification/ ](<https://leetcode.com/problems/text-justification/>)

###  推理测试 
    
    
    Which is bigger -- 9.11 or 9.9?
    
    
    How many Rs are in strawberry?
    
    
```
    小A去商店买了90元的东西,但发现自己只带了20元。
    商店老板借给他80元,小A用这100元付款后,商店老板找回10元给他。
    回家后拿到钱后，小A来到商店把80元还给超市老板。
    但超市老板总感觉下A给的少了，请问小A应该给多少钱？
```
    

###  ollama 
    
    
    curl -fsSL https://ollama.com/install.sh | sh
    
    
    ollama run reflection:70b

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  api 

[ https://openrouter.ai/chat?models=mattshumer/reflection-70b:free ](<https://openrouter.ai/chat?models=mattshumer/reflection-70b:free>)
    
    
```
    curl https://openrouter.ai/api/v1/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $OPENROUTER_API_KEY" \
      -d '{
      "model": "mattshumer/reflection-70b:free",
      "messages": [
        {"role": "user", "content": "What is the meaning of life?"}
      ]
```
      
    }'

###  LM Studio 

[ https://huggingface.co/lmstudio-community/Reflection-Llama-3.1-70B-GGUF ](<https://huggingface.co/lmstudio-community/Reflection-Llama-3.1-70B-GGUF>)
    
    
```
    curl https://api.deepseek.com/chat/completions \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer sk-9d626022379a49a29e4147f593853732" \
      -d '{
            "model": "deepseek-chat",
            "messages": [
              {"role": "system", "content": "You are a helpful assistant."},
              {"role": "user", "content": "Hello!"}
            ],
            "stream": false
          }'
```

###  AutoGen+LlamaIndex 
    
    
    !pip install pyautogen llama-index-vector-stores-chroma llama-index llama-index-embeddings-huggingface llama-index-llms-together
    
```
    from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
    from llama_index.vector_stores.chroma import ChromaVectorStore
    from llama_index.core import StorageContext
    from llama_index.embeddings.huggingface import HuggingFaceEmbedding
    from llama_index.core import Settings
    from llama_index.llms.together import TogetherLLM
```
    
```
    import chromadb
    import autogen
    from autogen import ConversableAgent
```
    
    
    
    # 创建目录（如果不存在）
    !mkdir -p ./documents
    
    # 下载文件到 ./documents 目录
    !wget -P ./documents https://raw.githubusercontent.com/win4r/mytest/main/book.txt
    
    
    
    
```
    def initialize_index():
        # 初始化 Chroma 数据库客户端
        db = chromadb.PersistentClient(path="./chroma_db")
        # 获取或创建一个名为 "my-docs" 的集合
        chroma_collection = db.get_or_create_collection("my-docs")
        # 创建 ChromaVectorStore 实例
        vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
        # 创建存储上下文
        storage_context = StorageContext.from_defaults(vector_store=vector_store)
```
    
        # 使用 BAAI/bge-large-en-v1.5 嵌入模型
        embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-large-en-v1.5")
    
```
        # 设置全局嵌入模型
        Settings.embed_model = embed_model
        Settings.llm = TogetherLLM( model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", api_key="sk-" )
```
    
```
        # 检查集合是否已存在数据
        if chroma_collection.count() > 0:
            print("Loading existing index...")
            # 如果存在，从向量存储加载索引
            return VectorStoreIndex.from_vector_store(
                vector_store, storage_context=storage_context
            )
        else:
            print("Creating new index...")
            # 如果不存在，从文档目录加载数据并创建新索引
            documents = SimpleDirectoryReader("./documents").load_data()
            return VectorStoreIndex.from_documents(
                documents, storage_context=storage_context
            )
```
    
```
    # 初始化索引
    index = initialize_index()
    # 创建查询引擎
    query_engine = index.as_query_engine()
```
    
    
    
    def create_prompt(user_input):
        result = query_engine.query(user_input)
    
        prompt = f"""
        Your Task: Provide a concise and informative response to the user's query, drawing on the provided context.
    
        Context: {result}
    
        User Query: {user_input}
    
```
        Guidelines:
        1. Relevance: Focus directly on the user's question.
        2. Conciseness: Avoid unnecessary details.
        3. Accuracy: Ensure factual correctness.
        4. Clarity: Use clear language.
        5. Contextual Awareness: Use general knowledge if context is insufficient.
        6. Honesty: State if you lack information.
```
    
```
        Response Format:
        - Direct answer
        - Brief explanation (if necessary)
        - Citation (if relevant)
        - Conclusion
        """
```
    
        return prompt
    
    
    
    
```
    # 配置LLM(语言模型)
    llm_config = {
        "config_list": [
            # {
            #     "model": "llama-3.1-8b-instant",
            #     "api_key": os.getenv("GROQ_API_KEY"),
            #     "api_type": "groq",
            # }
            {
              "model": "mattshumer/reflection-70b:free",
              "base_url": "https://openrouter.ai/api/v1",
              "api_key": "sk-or-v1-",
              "cache_seed": 42
            },
        ]
    }
```
    
```
    # 创建RAG机器人代理
    rag_agent = ConversableAgent(
        name="RAGbot",
        system_message="You are a RAG chatbot",
        llm_config=llm_config,
        code_execution_config=False,
        human_input_mode="NEVER",
    )
```
    
    
    
    
    
    prompt = create_prompt("Show me some samples of Knowledge Integration prompts")
    
    reply = rag_agent.generate_reply(messages=[{"content": prompt, "role": "user"}])
    
    print("\nType of reply:", type(reply))
    print("\nContent of reply:", reply)
    
```
    if isinstance(reply, dict) and 'content' in reply:
        print(f"\nRAGbot: {reply['content']}")
    elif isinstance(reply, str):
        print(f"\nRAGbot: {reply}")
    else:
        print("\nUnexpected reply format")
```
    
    
    
    
    
