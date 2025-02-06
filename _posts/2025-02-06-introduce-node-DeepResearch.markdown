---
layout: single
title: "🚀零成本复刻Deep Research！超越OpenAI Deep Research+DeepSeek R1！三分钟快速部署node-DeepResearch最强AI agent，由Jina AI打造！"
sidebar:
  nav: "docs"
date: 2025-02-06 00:00:00 +0800
categories: AIAgents
tags: [AI智能体, node-DeepResearch, DeepResearch, AI agent, AI agents]
classes: wide
author_profile: true
---

Jina AI 开发的 **node-DeepResearch** 是一个开源自动化研究工具，旨在通过搜索、阅读网页和推理，直到找到问题的答案。该项目适用于自动化信息检索和智能问答任务，结合了搜索引擎和大语言模型（LLM）来提高研究效率。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1CXPCecEUk/)
- [👉👉👉 通过YouTube观看](https://youtu.be/vrpraFiPUyA)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


### 🚀OpenAI Deep Research简介：

OpenAI最近推出了Deep Research功能，通过自动化的多步骤互联网研究任务，生成全面的报告。

该功能利用最新的o3模型，能够分析和综合来自各种在线来源的数据，包括文本、图像和PDF。

用户只需提供一个提示，ChatGPT就会在10分钟内生成一份详细的报告。

Deep Research在Humanity's Last Exam基准测试中取得了26.6%的得分，显示了其在处理复杂研究任务方面的能力。

目前，Deep Research已集成到ChatGPT界面中，供美国的Pro订阅用户使用。

所以我们使用开源的**Jina AI node-DeepResearch**替代方案来复现Deep Research。

### **🚀Jina AI node-DeepResearch 简介**

Jina AI 开发的 **node-DeepResearch** 是一个开源自动化研究工具，旨在通过搜索、阅读网页和推理，直到找到问题的答案。该项目适用于自动化信息检索和智能问答任务，结合了搜索引擎和大语言模型（LLM）来提高研究效率。

### **主要功能**

- **自动搜索和推理**：使用搜索引擎查找相关网页，并通过大模型（如 Gemini）推理，生成最终答案。
- **智能网页阅读**：结合 Jina Reader，能够从网页提取关键内容，提升信息获取的精准度。
- **可配置 API**：用户可配置自己的 **Gemini API** 和 **Jina Reader API**，以优化查询效果。

**✅Jina AI node-DeepResearch GitHub仓库** [https://github.com/jina-ai/node-DeepResearch](https://github.com/jina-ai/node-DeepResearch)

### 🚀环境配置

1️⃣Node.js配置

> **Windows**用户只需要打开链接下载对应版本的Node.js安装包安装即可
链接：[https://nodejs.org/en/download](https://nodejs.org/en/download)

**Linux安装方式：**
`curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh) | bash
source ~/.bashrc
nvm install --lts`

macOS安装方式：
`/bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"
brew install node`

打开终端命令行，输入`node -v`和`npm -v`验证安装
> 

2️⃣Git安装

> 打开链接下载对应的安装包进行安装即可
链接：[https://git-scm.com/downloads](https://git-scm.com/downloads)
验证：`git --version`
> 

3️⃣Python3安装

> 打开链接下载对应版本的Node.js安装包安装即可
链接：[https://www.python.org/downloads/](https://www.python.org/downloads/)
验证：`python3 --version`
> 

### 🚀API key申请：

✅Jina API: [https://jina.ai/api-dashboard/key-manager](https://jina.ai/api-dashboard/key-manager)

✅Gemini API: [https://aistudio.google.com/prompts/new_chat](https://aistudio.google.com/prompts/new_chat)

### 🚀配置

```bash
# Windows
set GEMINI_API_KEY=xxxxxx
set JINA_API_KEY=xxxxxx

git clone https://github.com/jina-ai/node-DeepResearch.git
cd node-DeepResearch
npm install

```

### 🚀运行命令并测试

```bash
npm run dev "1+1="
npm run dev "what is the capital of France?"
npm run dev "9.9 vs 9.11"
npm run dev "How many R letters are in the word strawberry?"
npm run dev "The hyperparameter settings for fine-tuning Llama3?"
npm run dev "SpaceX的创始人是谁"
npm run dev "1+2+3+4+5+6+...+100="

# 运行服务
nohup npm run serve > output.log 2>&1 &

# 通过服务API来调用
curl -X POST http://localhost:3000/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{
    "q": "9.9 vs 9.11",
    "budget": 1000000,
    "maxBadAttempt": 3
  }' | jq -r .requestId | xargs -I {} curl -N http://localhost:3000/api/v1/stream/{}

```

### 🚀 chatbot代码

```bash
# 执行命令启动服务 nohup npm run serve > output.log 2>&1 &
# 安装所需依赖 pip install gradio requests

# 完整代码如下：
import gradio as gr
import requests
import json
import time
from typing import Generator, Tuple, List, Dict

def parse_sse_data(data: str) -> dict:
    """Parse SSE data string into a dictionary."""
    if data.startswith("data: "):
        try:
            return json.loads(data[6:])  # Remove "data: " prefix
        except json.JSONDecodeError:
            return {}
    return {}

def get_final_answer(response_text: str) -> str:
    """Extract the final answer from the SSE stream."""
    lines = response_text.strip().split('\n')
    for line in reversed(lines):  # Search from the end
        parsed = parse_sse_data(line)
        if parsed.get("type") == "answer":
            return parsed.get("data", {}).get("answer", "No answer found")
    return "No answer found"

def query_api(message: str) -> str:
    """Send query to API and get response."""
    try:
        # First request to get requestId
        session = requests.Session()
        
        init_response = session.post(
            "http://localhost:3000/api/v1/query",
            json={
                "q": message,
                "budget": 1000000,
                "maxBadAttempt": 3
            },
            headers={
                "Content-Type": "application/json"
            },
            timeout=60  # Increased timeout
        )
        
        init_response.raise_for_status()
        request_id = init_response.json().get("requestId")
        
        if not request_id:
            return "Error: No request ID received"
        
        # Stream the response with increased timeout
        stream_response = session.get(
            f"http://localhost:3000/api/v1/stream/{request_id}",
            stream=True,
            timeout=120,  # Increased timeout for streaming
            headers={
                "Accept": "text/event-stream"
            }
        )
        
        stream_response.raise_for_status()
        
        full_response = ""
        for line in stream_response.iter_lines(decode_unicode=True):
            if line:
                full_response += line + '\n'
                # Check if we've received the answer
                if '"type":"answer"' in line:
                    parsed = parse_sse_data(line)
                    if parsed.get("type") == "answer":
                        answer = parsed.get("data", {}).get("answer")
                        if answer:
                            return answer
                            
        # If we haven't returned by now, try to extract answer from full response
        answer = get_final_answer(full_response)
        return answer if answer else "No answer found in response"

    except requests.exceptions.Timeout:
        return "Error: Request timed out. Please try again."
    except requests.exceptions.RequestException as e:
        return f"API Error: {str(e)}"
    except Exception as e:
        return f"Error: {str(e)}"

def format_message(role: str, content: str) -> Dict[str, str]:
    """Format message in the OpenAI-style format."""
    return {"role": role, "content": content}

def chat_response(message: str, history: List[Dict[str, str]]) -> str:
    """Handle chat interaction and return response."""
    try:
        response = query_api(message)
        return response
    except Exception as e:
        return f"Error: {str(e)}"

# Create Gradio interface
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("""# AI Query Interface
    Enter your question below to get an answer from the AI system.""")
    
    chatbot = gr.Chatbot(
        label="Chat History",
        height=400,
        type="messages"
    )
    
    msg = gr.Textbox(
        label="Your Question",
        placeholder="Type your question here...",
        container=True
    )
    
    with gr.Row():
        clear = gr.Button("Clear Chat")
        submit = gr.Button("Submit", variant="primary")

    def user(user_message: str, history: List[Dict[str, str]]) -> Tuple[str, List[Dict[str, str]]]:
        if not user_message.strip():
            return "", history
        user_msg = format_message("user", user_message)
        history.append(user_msg)
        return "", history

    def bot(history: List[Dict[str, str]]) -> List[Dict[str, str]]:
        user_message = history[-1]["content"]
        bot_response = chat_response(user_message, history)
        bot_msg = format_message("assistant", bot_response)
        history.append(bot_msg)
        return history

    # Set up event handlers
    msg.submit(user, [msg, chatbot], [msg, chatbot], queue=False).then(
        bot, chatbot, chatbot
    )
    submit.click(user, [msg, chatbot], [msg, chatbot], queue=False).then(
        bot, chatbot, chatbot
    )
    clear.click(lambda: None, None, chatbot, queue=False)

if __name__ == "__main__":
    # Launch the interface with public URL enabled
    demo.launch(
        share=True,
        server_name="0.0.0.0",
        server_port=7860
    )
```