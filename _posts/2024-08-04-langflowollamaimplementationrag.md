---
layout: single
title: "LangFlow+ollama实现本地RAG知识库"
sidebar:
  nav: "docs"
date: 2024-08-04 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG]
tags: [AI, GPT, GPT-4, HuggingFace, LLM, LangChain, LangFlow, Ollama, RAG]
classes: wide
author_profile: true
---


#  LangFlow+ollama实现本地RAG知识库 

###  api key 

[ https://www.langflow.store/profile/api-key  ](<https://www.langflow.store/profile/api-key>)

###  huggingface 

[ LangFlow - a Hugging Face Space by Langflow  Discover amazing ML apps made by the community  ![Image](https://huggingface.co/favicon.ico) https://huggingface.co/spaces/Langflow/Langflow?duplicate=true  ![Image](https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/Langflow/Langflow.png) ](<https://huggingface.co/spaces/Langflow/Langflow?duplicate=true>)

LangFlow 是一个开源的可视化框架，旨在构建多智能体和检索增强生成（RAG）应用。它提供了一个无需编码的 AI 生态系统，能够无缝集成各种常用工具和技术栈。LangFlow 以 Python 为基础，非常灵活，支持多种大型语言模型（LLM）和向量存储。 

###  LangFlow 的主要特点 

  1. **直观的可视化界面** : 
     * LangFlow 提供了一个易于使用的可视化界面，使用户无需编写大量代码就能构建复杂的 AI 工作流。这使得技术和非技术用户都能轻松上手。 


  2. **强大的集成功能** : 
     * 该平台支持与众多 AI 和数据服务集成，如 OpenAI、HuggingFace、LangChain、Pinecone 和 Google Cloud 等。这种灵活性使用户能够将他们的工作流与已熟悉的工具和服务连接起来。 


  3. **多种安装选项** : 
     * LangFlow 可以在本地、Google Cloud 或 VirtualBox 环境中安装。这种多样性使用户可以选择最适合其需求和资源的设置。 


  4. **组件化架构** : 
     * 该框架采用组件化的方法，用户可以通过拖放各种元素（如模型、提示和数据源）来创建所需的工作流。这些组件可以定制并以不同的方式连接，以构建复杂的 AI 应用。 


  5. **异步处理** : 
     * LangFlow 支持异步处理，使用户能够更有效地处理长时间运行的任务。这是通过使用 Celery 工作队列和 AnyIO 任务组实现的，用户可以通过简单的 API 进行管理。 


  6. **应用场景** : 
     * LangFlow 被用于各种 AI 应用，包括聊天机器人、文档问答系统和记忆型聊天机器人。其灵活性和易用性使其成为开发者快速原型和部署 AI 解决方案的首选。 


##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  api key 

[ https://www.langflow.store/profile/api-key/ ](<https://www.langflow.store/profile/api-key/>)

###  安装 

直接使用工作流的api 
    
    
```
    curl -X POST \
        "http://127.0.0.1:7861/api/v1/run/ee207a8c-aa4f-435c-99e9-d4f019d4c92f?stream=false" \
        -H 'Content-Type: application/json'\
        -d '{"input_value": "message",
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": {
      "ChatInput-u6JPw": {},
      "OllamaModel-Mb0Nf": {},
      "ChatOutput-wkFXt": {}
    }}'
```
        
    
    
```
    import argparse
    import json
    from argparse import RawTextHelpFormatter
    import requests
    from typing import Optional
    import warnings
    try:
        from langflow.load import upload_file
    except ImportError:
        warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
        upload_file = None
```
    
```
    BASE_API_URL = "http://127.0.0.1:7861"
    FLOW_ID = "ee207a8c-aa4f-435c-99e9-d4f019d4c92f"
    ENDPOINT = "" # You can set a specific endpoint name in the flow settings
```
    
```
    # You can tweak the flow by adding a tweaks dictionary
    # e.g {"OpenAI-XXXXX": {"model_name": "gpt-4"}}
    TWEAKS = {
      "ChatInput-u6JPw": {},
      "OllamaModel-Mb0Nf": {},
      "ChatOutput-wkFXt": {}
    }
```
    
```
    def run_flow(message: str,
      endpoint: str,
      output_type: str = "chat",
      input_type: str = "chat",
      tweaks: Optional[dict] = None,
      api_key: Optional[str] = None) -> dict:
        """
        Run a flow with a given message and optional tweaks.
```
    
```
        :param message: The message to send to the flow
        :param endpoint: The ID or the endpoint name of the flow
        :param tweaks: Optional tweaks to customize the flow
        :return: The JSON response from the flow
        """
        api_url = f"{BASE_API_URL}/api/v1/run/{endpoint}"
```
    
```
        payload = {
            "input_value": message,
            "output_type": output_type,
            "input_type": input_type,
        }
        headers = None
        if tweaks:
            payload["tweaks"] = tweaks
        if api_key:
            headers = {"x-api-key": api_key}
        response = requests.post(api_url, json=payload, headers=headers)
        return response.json()
```
    
```
    def main():
        parser = argparse.ArgumentParser(description="""Run a flow with a given message and optional tweaks.
    Run it like: python <your file>.py "your message here" --endpoint "your_endpoint" --tweaks '{"key": "value"}'""",
            formatter_class=RawTextHelpFormatter)
        parser.add_argument("message", type=str, help="The message to send to the flow")
        parser.add_argument("--endpoint", type=str, default=ENDPOINT or FLOW_ID, help="The ID or the endpoint name of the flow")
        parser.add_argument("--tweaks", type=str, help="JSON string representing the tweaks to customize the flow", default=json.dumps(TWEAKS))
        parser.add_argument("--api_key", type=str, help="API key for authentication", default=None)
        parser.add_argument("--output_type", type=str, default="chat", help="The output type")
        parser.add_argument("--input_type", type=str, default="chat", help="The input type")
        parser.add_argument("--upload_file", type=str, help="Path to the file to upload", default=None)
        parser.add_argument("--components", type=str, help="Components to upload the file to", default=None)
```
    
```
        args = parser.parse_args()
        try:
          tweaks = json.loads(args.tweaks)
        except json.JSONDecodeError:
          raise ValueError("Invalid tweaks JSON string")
```
    
```
        if args.upload_file:
            if not upload_file:
                raise ImportError("Langflow is not installed. Please install it to use the upload_file function.")
            elif not args.components:
                raise ValueError("You need to provide the components to upload the file to.")
            tweaks = upload_file(file_path=args.upload_file, host=BASE_API_URL, flow_id=ENDPOINT, components=args.components, tweaks=tweaks)
```
    
```
        response = run_flow(
            message=args.message,
            endpoint=args.endpoint,
            output_type=args.output_type,
            input_type=args.input_type,
            tweaks=tweaks,
            api_key=args.api_key
        )
```
    
        print(json.dumps(response, indent=2))
    
    if __name__ == "__main__":
        main()
    

方法1 
    
    
    python -m pip install langflow -U
    
    python -m langflow run
    

方法2 
    
    
    git clone https://github.com/langflow-ai/langflow.git
    
    cd langflow
    
    make install_frontend && make build_frontend && make install_backend
    
    poetry run python -m langflow run
    

###  API 
    
    
    poetry run python -m langflow api-key
    
    
```
    curl -X POST \
      'http://localhost:7860/api/v1/run/4277d3c1-096d-48bc-a98a-8fc690ddaa8d' \
      -H 'Content-Type: application/json' \
      -H 'x-api-key: sk-mBZChEOy6Vc8n6MnCwVYNfiqbA3qoDYlR45-RrRhcnk' \
      -d '{"inputs": {"text": "hello"}, "tweaks": {}}'
```
    
    
    
```
    curl -X POST \
      'http://127.0.0.1:7861/api/v1/run/ee207a8c-aa4f-435c-99e9-d4f019d4c92f' \
      -H 'Content-Type: application/json' \
      -H 'x-api-key: sk-5vTph2sgyXxmqlgkfOqBxGo-ja2id4vrLdsrXa7LP4o' \
      -d '{"inputs": {"text": "hello"}, "tweaks": {}}'
```
    
    
    
    
    import requests
    from typing import Optional
    
```
    BASE_API_URL = "http://localhost:7860/api/v1/run"
    FLOW_ID = "4277d3c1-096d-48bc-a98a-8fc690ddaa8d"
    # You can tweak the flow by adding a tweaks dictionary
    # e.g {"OpenAI-XXXXX": {"model_name": "gpt-4"}}
    TWEAKS = {}
```
    
    
```
    def run_flow(inputs: dict,
                 flow_id: str,
                 tweaks: Optional[dict] = None,
                 apiKey: Optional[str] = None) -> dict:
        """
        Run a flow with given inputs and optional tweaks.
```
    
```
        :param inputs: The inputs to send to the flow
        :param flow_id: The ID of the flow to run
        :param tweaks: Optional tweaks to customize the flow
        :param apiKey: Optional API key for authentication
        :return: The JSON response from the flow
        """
        api_url = f"{BASE_API_URL}/{flow_id}"
        payload = {"inputs": inputs}
        headers = {"Content-Type": "application/json"}
```
    
```
        if tweaks:
            payload["tweaks"] = tweaks
        if apiKey:
            headers["x-api-key"] = apiKey
```
    
        response = requests.post(api_url, json=payload, headers=headers)
        return response.json()
    
    
```
    def extract_message(response: dict) -> str:
        """
        Extract the message text from the response.
```
    
```
        :param response: The JSON response from the flow
        :return: The extracted message text
        """
        try:
            return response['outputs'][0]['outputs'][0]['results']['message']['data']['text']
        except KeyError:
            return "Unable to extract the message from the response."
```
    
    
```
    # Setup inputs and API key
    inputs = {"input_value": "hello"}
    api_key = "sk-mBZChEOy6Vc8n6MnCwVYNfiqbA3qoDYlR45-RrRhcnk"
```
    
```
    # Run the flow and print the extracted message
    response = run_flow(inputs, flow_id=FLOW_ID, tweaks=TWEAKS, apiKey=api_key)
    print(extract_message(response))
```
    
