---
layout: single
title: "GraphRAG+FastAPI+OpenWebUI实现GraphRAG4OpenWebUI"
sidebar:
  nav: "docs"
date: 2024-07-15 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG, Vision]
tags: [AI, GPT, GraphRAG, LLM, Ollama, RAG, Vision]
classes: wide
author_profile: true
---


#  GraphRAG+FastAPI+OpenWebUI实现GraphRAG4OpenWebUI 

###  视频中的开源项目链接 [ https://github.com/win4r/GraphRAG4OpenWebUI ](<https://github.com/win4r/GraphRAG4OpenWebUI>)

###  Open WebUI安装 
    
    
    pip install open-webui
    
    open-webui serve
    
    ###在浏览器中打开http://localhost:8080/

###  Tavily AI API申请 [ https://app.tavily.com/home ](<https://app.tavily.com/home>)

###  GraphRAG详细配置请看这个视频 [ https://youtu.be/CvCVFH7bsAk ](<https://youtu.be/CvCVFH7bsAk>)

###  GraphRAG用ollama运行本地模型请看这个视频 [ https://youtu.be/XiLEZzm7yCk ](<https://youtu.be/XiLEZzm7yCk>)

###  GraphRAG4OpenWebUI配置 
    
    
    git clone https://github.com/your-username/GraphRAG4OpenWebUI.git
    
    cd GraphRAG4OpenWebUI
    
    python -m venv venv
    
    source venv/bin/activate  # On Windows use venv\Scripts\activate
    
    
    pip install fastapi uvicorn pandas tiktoken graphrag tavily-python pydantic python-dotenv asyncio aiohttp numpy scikit-learn matplotlib seaborn nltk spacy transformers torch torchvision torchaudio
    
    
```
    export GRAPHRAG_API_KEY="your_graphrag_api_key"
    export TAVILY_API_KEY="your_tavily_api_key"
    export GRAPHRAG_LLM_MODEL="gpt-3.5-turbo"
    export GRAPHRAG_EMBEDDING_MODEL="text-embedding-3-small"
    export INPUT_DIR="/path/to/your/input/directory"
```
    
    
    python main.py
    
    ###接口地址为 http://localhost:8012
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** [ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>)

###  **👉👉👉我的开源项目** **[ ](<https://github.com/win4r/GraphRAG4OpenWebUI>) ** [ https://github.com/win4r/GraphRAG4OpenWebUI ](<https://github.com/win4r/GraphRAG4OpenWebUI>)
