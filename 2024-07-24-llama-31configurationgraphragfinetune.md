---
layout: single
title: "Llama 3.1本地配置+GraphRAG+微调"
sidebar:
  nav: "docs"
date: 2024-07-24 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG]
tags: [AI, GraphRAG, HuggingFace, LLM, Llama-3, Ollama, RAG]
classes: wide
author_profile: true
---


#  Llama 3.1本地配置+GraphRAG+微调 

###  微调代码 [ https://colab.research.google.com/drive/1vi6vLcjR_lMtZzRIWzIsa4aLWa35C_8s?usp=sharing ](<https://colab.research.google.com/drive/1vi6vLcjR_lMtZzRIWzIsa4aLWa35C_8s?usp=sharing>)

###  下载地址 

[ https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct ](<https://huggingface.co/meta-llama/Meta-Llama-3.1-8B-Instruct>)

[ https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct ](<https://huggingface.co/meta-llama/Meta-Llama-3.1-70B-Instruct>)

###  算法测试 

[ https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/ ](<https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/>)

[ https://leetcode.com/problems/candy/description/ ](<https://leetcode.com/problems/candy/description/>)

[ https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k/description/ ](<https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k/description/>)

###  推理题 
    
    
```
    在一个立方体房间里,四面墙壁分别朝向东南西北,每面墙上都有一扇门。
    房间中央有一个正方形转盘,转盘的四个角放置着4个不同颜色的立方体积木:红、蓝、绿、黄。
    此时红色立方体对着东门，蓝色立方体对着南门，绿色立方体对着西门，黄色立方体对着北门。
    现在开始计时，正方形转盘开始转动。
    每过五分钟，正方形转盘转动一周。
    当正方形转盘转动一周时，红色立方体和绿色立方体交换位置，蓝色立方体和黄色立方体交换位置。
    每过15分钟，时间就会倒流5分钟。
    就在计时到了第三十五分钟时，红、蓝、绿、黄立方体分别对应哪个方向的门？
```
    
```
    答案：
    红->西
    蓝->北
    绿->东
    黄->南
```
    
    
    

###  ollama运行llama3.1 
    
    
```
    ollama run llama3.1
    ollama run llama3.1:70b
    ollama run llama3.1:405b
```

###  vllm推理llama3.1 
    
    
    #http://localhost:8000/v1/
    conda create -n myenv python=3.10 -y
    
    conda activate myenv
    
    
    python -m vllm.entrypoints.openai.api_server --model meta-llama/Meta-Llama-3.1-70B-Instruct --dtype auto --api-key token-abc123 --host 0.0.0.0 --trust-remote-code

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

##  API调用 
    
    
    # https://docs.together.ai/docs/quickstart
    
```
    #together
    import os
    from together import Together
```
    
    client = Together(api_key=os.environ.get("TOGETHER_API_KEY"))
    
```
    stream = client.chat.completions.create(
      model="meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
      messages=[{"role": "user", "content": "鲁迅和周树人是什么关系?"}],
      stream=True,
    )
```
    
    for chunk in stream:
      print(chunk.choices[0].delta.content or "", end="", flush=True)
    
    
    #------------------------------------------------------------
    
    #groq
    import os
    
    from groq import Groq
    
```
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
```
    
```
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "鲁迅和周树人是什么关系？",
            }
        ],
        model="llama-3.1-70b-versatile",
    )
```
    
    print(chat_completion.choices[0].message.content)
    
    
    

##  GraphRAG对接llama 3.1 

###  命令 
    
    
    python -m graphrag.index --init --root ./ragtest
    
    
    python -m graphrag.index --root ./ragtest
    
    
```
    python -m graphrag.query \                                                              
    --root ./ragtest \
    --method local \
    "tell me a Prompt formula about Instructions Prompt Technique."
```
    

###  settings.yaml 
    
    
```
    encoding_model: cl100k_base
    skip_workflows: []
    llm:
      api_key: ${GRAPHRAG_API_KEY}
      type: openai_chat # or azure_openai_chat
      model: llama3.1
      model_supports_json: true # recommended if this is available for your model.
      # max_tokens: 4000
      # request_timeout: 180.0
      api_base: http://localhost:8166/v1
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
        api_base: http://localhost:8166/v1
```

###  nomic-embed-text-v1.5模型运行 
    
    
```
    from sentence_transformers import SentenceTransformer
    from pydantic import BaseModel
    from fastapi import FastAPI
    import torch
    from transformers import AutoTokenizer
```
    
    app = FastAPI()
    
```
    # 加载模型和分词器
    model = SentenceTransformer('nomic-ai/nomic-embed-text-v1.5', trust_remote_code=True)
    tokenizer = AutoTokenizer.from_pretrained('nomic-ai/nomic-embed-text-v1.5', trust_remote_code=True)
```
    
    
```
    class Item(BaseModel):
        input: list
        model: str
        encoding_format: str = None
```
    
    
```
    @app.post("/v1/embeddings")
    async def create_embedding(item: Item):
        # 确保输入是字符串列表
        texts = [str(x) for x in item.input]
```
    
```
        # 计算token数量
        tokens = tokenizer(texts, padding=True, truncation=True)
        token_count = sum(len(ids) for ids in tokens['input_ids'])
```
    
```
        # 生成嵌入
        with torch.no_grad():
            embeddings = model.encode(texts, convert_to_tensor=True)
```
    
        # 将张量转换为列表
        embeddings_list = embeddings.tolist()
    
```
        # 构建响应
        data = [
            {
                "object": "embedding",
                "index": i,
                "embedding": emb
            }
            for i, emb in enumerate(embeddings_list)
        ]
```
    
```
        return {
            "object": "list",
            "data": data,
            "model": "text-embedding-3-small",  # 改回原来的模型名称
            "usage": {
                "prompt_tokens": token_count,
                "total_tokens": token_count
            }
        }
```
    
    
    if __name__ == "__main__":
        import uvicorn
    
        uvicorn.run(app, host="0.0.0.0", port=8166)
