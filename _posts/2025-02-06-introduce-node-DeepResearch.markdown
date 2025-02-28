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

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1ZYNHetEY1/)
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


  curl http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secret_token" \
  -d '{
    "model": "jina-deepsearch-v1",
    "messages": [
      {
        "role": "user",
        "content": "1+2="
      }
    ],
    "stream": true
  }'

```

### 🚀 chatbot代码

```bash
# 执行命令启动服务 nohup npm run serve > output.log 2>&1 &
# 安装所需依赖 pip install gradio requests

# 完整代码如下：
# 安装依赖 pip install gradio requests

import gradio as gr
import requests
import json
import time
import re

# DeepResearch OpenAI 兼容API URL
SERVER_URL = "http://localhost:3000/v1/chat/completions"

def extract_thinking(text):
    """从响应中提取思考过程和最终答案"""
    think_pattern = r'<think>(.*?)</think>'
    think_match = re.search(think_pattern, text, re.DOTALL)
    
    if think_match:
        thinking = think_match.group(1).strip()
        answer = re.sub(think_pattern, '', text, flags=re.DOTALL).strip()
        return thinking, answer
    
    return "", text

def query_deepsearch(message: str, history):
    """向DeepResearch服务发送查询并接收响应"""
    # 从聊天历史创建消息列表
    messages = []
    
    # 添加历史消息 - 历史是(用户,助手)元组的列表
    for user_msg, assistant_msg in history:
        messages.append({"role": "user", "content": user_msg})
        messages.append({"role": "assistant", "content": assistant_msg})
    
    # 添加当前消息
    messages.append({"role": "user", "content": message})
    
    data = {
        "model": "jina-deepsearch-v1",
        "messages": messages,
        "stream": True
    }
    
    try:
        # 发送请求
        response = requests.post(
            SERVER_URL,
            headers={"Content-Type": "application/json"},
            json=data,
            stream=True,
            timeout=300  # 增加超时时间
        )
        
        if response.status_code != 200:
            return f"请求失败: {response.status_code} {response.text}"
        
        # 处理流式响应
        full_text = ""
        buffer = ""
        
        for line in response.iter_lines(decode_unicode=True):
            if line:
                if line.startswith("data: "):
                    line = line[6:]  # 移除 "data: " 前缀
                    
                    if line.strip() == "[DONE]":
                        continue
                        
                    try:
                        json_data = json.loads(line)
                        content = json_data.get("choices", [{}])[0].get("delta", {}).get("content", "")
                        if content:
                            buffer += content
                            full_text = buffer
                    except json.JSONDecodeError:
                        continue
        
        # 提取思考过程和最终答案
        thinking, answer = extract_thinking(full_text)
        
        # 如果有思考过程，将其格式化为纯文本
        if thinking:
            formatted_answer = f"【思考过程】\n{thinking}\n\n【最终答案】\n{answer}"
            return formatted_answer
        else:
            return answer
            
    except requests.exceptions.Timeout:
        return "错误: 请求超时，请重试。"
    except requests.exceptions.RequestException as e:
        return f"API错误: {str(e)}"
    except Exception as e:
        return f"错误: {str(e)}\n\n请确保DeepResearch服务正在运行，并可以通过 {SERVER_URL} 访问。"

# 创建Gradio界面
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("""# DeepResearch 聊天界面
    输入您的问题，DeepResearch将搜索互联网寻找答案。
    """)
    
    chatbot = gr.Chatbot(
        label="聊天历史",
        height=500,
        elem_id="chatbot"
    )
    
    msg = gr.Textbox(
        label="您的问题",
        placeholder="例如：'什么是Jina AI的最新博客文章的标题？'",
        container=True
    )
    
    with gr.Row():
        clear = gr.Button("清除聊天")
        submit = gr.Button("发送", variant="primary")
    
    # 设置事件处理
    def user(user_message, history):
        """处理用户输入，添加到历史记录"""
        return "", history + [[user_message, ""]]
    
    def bot(history):
        """处理机器人响应"""
        user_message = history[-1][0]
        bot_response = query_deepsearch(user_message, history[:-1])
        history[-1][1] = bot_response
        return history
    
    msg.submit(user, [msg, chatbot], [msg, chatbot], queue=False).then(
        bot, chatbot, chatbot
    )
    
    submit.click(user, [msg, chatbot], [msg, chatbot], queue=False).then(
        bot, chatbot, chatbot
    )
    
    clear.click(lambda: None, None, chatbot, queue=False)
    
    # 设置示例问题
    examples = [
        "Jina AI的最新博客文章是什么？",
        "ReadLM-v2的上下文长度是多少？",
        "列出你能找到的所有Jina AI员工",
        "谁是Jina AI的创始人？",
        "1+2="
    ]
    
    gr.Examples(
        examples=examples,
        inputs=msg,
        label="示例问题"
    )
    
    gr.HTML("""
    <div style="text-align: center; margin-top: 1rem; padding: 1rem; background-color: #f7f7f7; border-radius: 5px;">
        <p>此界面连接到本地运行的DeepResearch服务。确保服务已启动并在<code>http://localhost:3000</code>上运行。</p>
        <p>DeepResearch会搜索互联网并逐步找到最佳答案 - 由Jina AI和Google Gemini提供支持。</p>
    </div>
    """)

if __name__ == "__main__":
    # 启动界面并启用公网访问
    demo.launch(
        share=True,
        server_name="0.0.0.0",
        server_port=7860
    )
```