---
layout: single  
title: "🚀24B参数模型碾压gpt4o-mini！推理速度超快！vLLM本地部署Mistral-Small 3.1+全方位测试多模态大模型！超越Gemma3.1，最适合企业项目的大模型！中文OCR能力也不弱"  
sidebar:
  nav: "docs"
date: 2025-03-18 10:00:00 +0800  
categories: LLMs
tags: [Mistral-Small-3.1, Mistral-Small, Mistral, multimoda, Mistral AI]
classes: wide  

author_profile: true  
---

Mistral AI 最新推出的 **Mistral Small 3.1** 模型无疑是近期科技界的一大亮点。这款由法国 AI 实验室 Mistral AI 开发的开源多模态模型，以其卓越的性能和灵活性，为开发者、企业和研究人员带来了全新的可能性。凭借 24B 参数、对文本与图像的处理能力，以及在多个关键指标上的突破，Mistral Small 3.1 正成为 2025 年 AI 领域的一颗耀眼新星。


### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1Q9XLYiEwD/)
- [👉👉👉 通过YouTube观看](https://youtu.be/Z9WR6INi-HQ)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

## 什么是 Mistral Small 3.1？

Mistral Small 3.1 是一款轻量级、高性能的 AI 模型，专为低延迟任务设计。相比前代 Mistral Small 3，3.1 版本在文本处理能力上显著提升，并新增了多模态功能，可同时处理文本和图像输入。其上下文窗口高达 **128k 标记（token）**，推理速度达到 **150 个标记每秒**，效率令人惊叹。

这款模型的最大亮点在于其 **开源性质**，采用 Apache 2.0 许可证，用户可以免费下载、修改和部署。无论是个人开发者还是企业用户，都能根据需求进行定制。此外，Mistral Small 3.1 支持包括中文在内的多种语言，具备全球化的应用潜力。

### 核心特性一览

- **开源**：Apache 2.0 许可证，自由使用与修改。
- **高效**：可在本地运行，降低使用门槛。
- **多模态**：支持文本与图像处理，应用场景丰富。
- **快速响应**：推理速度高达 150 个标记/秒。
- **多语言支持**：覆盖中文等数十种语言。

---

## 性能如何？

Mistral Small 3.1 在多项基准测试中表现优异，特别是在 **GPQA（Google Proof Question Answering）** 测试中，超越了 Claude 3.5 Haiku、Gemma 3 和 GPT-4o-mini 等知名模型。在多语言任务中，其在欧洲和东亚语言理解上的表现也优于 GPT-4o Mini 和 Gemma 3。

更令人印象深刻的是，Mistral Small 3.1 的推理速度达到 **150 个标记每秒**，成为目前市场上最快的模型之一。这一优势使其在需要快速响应的场景中脱颖而出，例如虚拟助手和实时数据分析。

### 性能亮点

- **GPQA 测试**：优于 Claude 3.5 Haiku、Gemma 3 和 GPT-4o-mini。
- **多语言能力**：在欧洲和东亚语言理解中表现突出。
- **上下文与速度**：支持 128k 上下文窗口，推理速度领先同类模型。

---

## 应用场景

Mistral Small 3.1 的多功能性和高效性使其适用于多种场景，以下是几个典型应用：

1. **自动化**
    
    通过 HTTP 请求，Mistral Small 3.1 可无缝集成到自动化流程中，例如 CRM（客户关系管理）、数据库管理和客户支持等领域。
    
2. **图像分析**
    
    借助多模态能力，模型可生成图像描述或分析内容，适用于社交媒体图像自动标注、内容审核等任务。
    
3. **学习与实验**
    
    开源代码为学生和 AI 初学者提供了一个理想平台，用户可以自由探索模型，深入理解 AI 技术。
    

---

## 为什么选择 Mistral Small 3.1？

Mistral Small 3.1 的推出降低了 AI 使用的门槛，其轻量级设计允许在本地计算机上运行，无需依赖云服务，这对于数据隐私和安全敏感的场景尤为重要。同时，快速响应能力和多语言支持使其在全球范围内具备广泛适用性。

Mistral AI 表示，Mistral Small 3.1 是其创新之路的一部分，未来还将推出更多增强推理能力的模型。这款模型不仅推动了 AI 技术的发展，也为用户提供了一个强大且灵活的工具，助力他们在 AI 领域实现更多突破。

---

Mistral Small 3.1 的问世标志着 AI 模型在性能、效率和可访问性上的重要进步。无论是开发者、企业还是研究人员，都能从中受益，探索 AI 的无限可能。如果你正在寻找一款高效、开源且多功能的 AI 模型，Mistral Small 3.1 无疑值得关注！

### 🔥LangFlow部署方式

```bash
python -m venv .venv

source .venv/bin/activate

python -m pip install langflow

python -m langflow run

```

### 🔥中文能力测试题

✅文言文翻译

```bash
九月甲午，晋侯秦伯围郑，以其无礼于晋，且贰于楚也。晋 军函陵，秦军汜南。 

佚之狐言于郑伯曰：“国危矣！若使烛之武见秦君，师必 退。

”公从之。辞曰：“臣之壮也，犹不如人；今老矣，无能力也 已。”

公曰：“吾不能早用子，今急而求子，是寡人之过也。然郑 亡，子亦有不利焉！”许之。 
```

✅中文能力

```bash
识别以下句子中的讽刺或反语，并解释其真实含义：

a. "你真是个天才，连这么简单的问题都解决不了。"
b. "这报告写得真好，我看了三遍都没看懂。"
c. "你的解释非常清楚，把简单的问题变得更加复杂了。"
d. "你的房间整理得太干净了，连路都走不出来。"
e. "他真是个好同事，总是把自己的工作推给别人做。"
```

✅言外之意理解

```bash
解释以下对话中的真实意图：

A: "这周末一起去看电影吧？"
B: "我这周末要准备下周的报告。"

A: "你觉得我的新发型怎么样？"
B: "颜色挺特别的。"

A: "这份工作需要加班，你能接受吗？"
B: "我家里有两个小孩要照顾。"
```

### 🔥数学题测试

```bash
四个数的和是21，这四个数两两相乘得到的六个积分别是15、18、21、30、35和42。
请求出这四个数分别是多少。
```

✅这三个数是3、5、6、7

```bash
一个动物园里有水牛、鸵鸟和蛇，一共有75只动物。
水牛、鸵鸟和蛇的腿共有176条，水牛角和鸵鸟头与蛇头加起来一共98个。
求有多少头水牛、多少只鸵鸟和多少条蛇？
```

✅23头牛、42只鸵鸟和10条蛇

### 🔥文档问答测试

- **🔥问题**：LIMO 使用了多少样本进行训练，并在 AIME 基准测试中取得了什么准确率？
- **✅答案**：LIMO 仅使用了 817 个精心策划的训练样本，在 AIME 基准测试中取得了 57.1% 的准确率。
- **🔥问题**：论文中提到 LIMO 与先前的模型相比，数据效率有什么提升？
- **✅答案**：LIMO 仅使用了先前方法所需训练数据的 1%，同时在 AIME 上将性能从 6.5% 提升到 57.1%，在 MATH 上从 59.2% 提升到 94.8%。
- **🔥问题**：论文作者如何定义和评估推理链的质量？列出他们确定的三个高质量推理链的关键特征。
- **✅答案**：高质量推理链的三个关键特征：(1) 最佳结构组织 - 清晰的结构格式和自适应的步骤分解粒度；(2) 有效的认知支架 - 通过结构化解释逐步建立理解；(3) 严格的验证 - 在推理过程中包含极其频繁的验证步骤，验证中间结果、交叉检查假设并确认每个推导的逻辑一致性。
- **🔥问题**：论文中的实验表明，推理链质量（L1-L5）与模型性能之间存在什么关系？这对大语言模型训练有何启示？
- **✅答案**：实验表明推理链质量与模型性能直接相关，随着质量从 L1 到 L5 提高，性能稳步提升。在 AIME24 上，L5 和 L1 之间的性能差距约为 15 个百分点，在 MATH500 上为 12 个百分点。这表明高质量推理链在模型性能中比以前假设的更重要，强调了在训练数据中包含结构良好、详细和自我验证的解决方案的重要性，而不仅仅是大量的数据。
- **🔥问题**：论文表 2 比较了 LIMO 和 RL 扩展方法（如 o1、R1）的不同特点。根据表 2 数据，完整列出两种方法在"搜索策略"和"泛化"方面的具体区别，并指出 LIMO 在资源效率方面的优势是什么？
- **✅答案**：根据表 2，LIMO 和 RL 扩展方法在以下方面有明确区别：
搜索策略：RL 扩展方法：使用计算资源对解决方案空间进行广泛探索。LIMO：由认知原则引导的有针对性的探索。泛化：RL 扩展方法：通过对轨迹空间的广泛采样实现泛化。LIMO：通过理解基本推理模式实现泛化。LIMO 在资源效率方面的优势是：采用"资源高效的直接构建"方法，而 RL 扩展方法采用"资源密集型搜索过程"。具体来说，LIMO 不需要通过大规模强化学习优化来寻找有效推理轨迹，而是通过直接构建高质量推理链来激活模型的推理能力，从而大大减少了训练所需的计算资源。

### vLLM本地部署

```bash
# Create a new virtual environment
python -m venv mistral_env
source mistral_env/bin/activate

# Install vLLM nightly build
pip install vllm --pre --extra-index-url https://wheels.vllm.ai/nightly --upgrade

python -c "import mistral_common; print(mistral_common.__version__)"

# 运行
c

# 调用
import requests
import json
from datetime import datetime

def query_model(prompt, system_prompt=None, temperature=0.15):
    """
    Query the deployed Mistral model.
    
    Args:
        prompt (str): The user prompt to send to the model
        system_prompt (str, optional): System prompt to guide model behavior
        temperature (float, optional): Sampling temperature (default: 0.15)
        
    Returns:
        dict: The model's response
    """
    # Current date for system prompt
    today = datetime.now().strftime("%Y-%m-%d")
    yesterday = (datetime.now() - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
    
    # Default system prompt if none provided
    if system_prompt is None:
        system_prompt = f"""You are Mistral Small 3.1, a Large Language Model (LLM) created by Mistral AI, a French startup headquartered in Paris.
You power an AI assistant called Le Chat.
Your knowledge base was last updated on 2023-10-01.
The current date is {today}.

When you're not sure about some information, you say that you don't have the information and don't make up anything.
If the user's question is not clear, ambiguous, or does not provide enough context for you to accurately answer the question, you do not try to answer it right away and you rather ask the user to clarify their request (e.g. "What are some good restaurants around me?" => "Where are you?" or "When is the next flight to Tokyo" => "Where do you travel from?").
You are always very attentive to dates, in particular you try to resolve dates (e.g. "yesterday" is {yesterday}) and when asked about information at specific dates, you discard information that is at another date.
You follow these instructions in all languages, and always respond to the user in the language they use or request.
Next sections describe the capabilities that you have.

# WEB BROWSING INSTRUCTIONS

You cannot perform any web search or access internet to open URLs, links etc. If it seems like the user is expecting you to do so, you clarify the situation and ask the user to copy paste the text directly in the chat.

# MULTI-MODAL INSTRUCTIONS

You have the ability to read images, but you cannot generate images. You also cannot transcribe audio files or videos.
You cannot read nor transcribe audio files or videos."""
    
    # API endpoint (adjust if your server is on a different host/port)
    url = "http://localhost:8000/v1/chat/completions"
    
    # Prepare the request payload
    payload = {
        "model": "mistralai/Mistral-Small-3.1-24B-Instruct-2503",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "temperature": temperature
    }
    
    # Send the request to the server
    headers = {
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    
    # Return the processed response
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Request failed with status {response.status_code}", "details": response.text}

# Example usage
if __name__ == "__main__":
    user_prompt = "Explain how large language models work"
    response = query_model(user_prompt)
    
    # Extract and print the model's response
    try:
        model_response = response["choices"][0]["message"]["content"]
        print("Model response:")
        print(model_response)
    except KeyError:
        print("Unexpected response format:", response)
        
        
# vLLM 
curl http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistralai/Mistral-Small-3.1-24B-Instruct-2503",
    "messages": [
      {
        "role": "system",
        "content": "You are Mistral Small 3.1, a Large Language Model (LLM) created by Mistral AI, a French startup headquartered in Paris.\nYou power an AI assistant called Le Chat.\nYour knowledge base was last updated on 2023-10-01.\nThe current date is 2025-03-18.\n\nWhen you'\''re not sure about some information, you say that you don'\''t have the information and don'\''t make up anything.\nIf the user'\''s question is not clear, ambiguous, or does not provide enough context for you to accurately answer the question, you do not try to answer it right away and you rather ask the user to clarify their request (e.g. \"What are some good restaurants around me?\" => \"Where are you?\" or \"When is the next flight to Tokyo\" => \"Where do you travel from?\").\nYou are always very attentive to dates, in particular you try to resolve dates (e.g. \"yesterday\" is 2025-03-17) and when asked about information at specific dates, you discard information that is at another date.\nYou follow these instructions in all languages, and always respond to the user in the language they use or request.\nNext sections describe the capabilities that you have.\n\n# WEB BROWSING INSTRUCTIONS\n\nYou cannot perform any web search or access internet to open URLs, links etc. If it seems like the user is expecting you to do so, you clarify the situation and ask the user to copy paste the text directly in the chat.\n\n# MULTI-MODAL INSTRUCTIONS\n\nYou have the ability to read images, but you cannot generate images. You also cannot transcribe audio files or videos.\nYou cannot read nor transcribe audio files or videos."
      },
      {
        "role": "user",
        "content": "识别以下句子中的讽刺或反语，并解释其真实含义：你真是个天才，连这么简单的问题都解决不了。"
      }
    ],
    "temperature": 0.15,
    "max_tokens": 400
  }'
  

```

### 官方api调用方式

```bash
# 模型id
mistral-small-latest

# 测试
curl --location "https://api.mistral.ai/v1/chat/completions" \
     --header 'Content-Type: application/json' \
     --header 'Accept: application/json' \
     --header "Authorization: Bearer key" \
     --data '{
    "model": "mistral-small-latest",
    "messages": [
     {
        "role": "user",
        "content": "What is the best French cheese?"
      }
    ]
  }'
  
  
 # 多模态
 curl https://api.mistral.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer key" \
  -d '{
    "model": "mistral-small-latest",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What’s in this image?"
          },
          {
            "type": "image_url",
            "image_url": "https://tripfixers.com/wp-content/uploads/2019/11/eiffel-tower-with-snow.jpeg"
          }
        ]
      }
    ],
    "max_tokens": 300
  }'
  
  
  # ocr与格式化输出
  
  curl https://api.mistral.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer key" \
  -d '{
    "model": "mistral-small-latest",
    "messages": [
            {
                "role": "system",
                "content": [
                    {"type": "text",
                     "text" : "Extract the text elements described by the user from the picture, and return the result formatted as a json in the following format : {name_of_element : [value]}"
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "From this restaurant bill, extract the bill number, item names and associated prices, and total price and return it as a string in a Json object"
                    },
                    {
                        "type": "image_url",
                        "image_url": "https://i.imghippo.com/files/kgXi81726851246.jpg"
                    }
                ]
            }
        ],
    "response_format": 
      {
        "type": "json_object"
      }
  }'

  
  
```


