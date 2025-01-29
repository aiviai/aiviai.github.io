---
layout: single
title: "🚀DeepSeek发布开源多模态大模型Janus-Pro-7B！本地部署+Colab部署！支持图像识别和图像生成！基准测试得分超越OpenAI的DALL·E 3 + Stable Diffusion"
sidebar:
  nav: "docs"
date: 2025-01-28 00:00:00 +0800
categories: LLMs
tags: [Janus-Pro, Janus-Pro-7B, deepseek, Stable Diffusion, 多模态大模型, 视觉模型, 文生图模型]
classes: wide
author_profile: true
---

Janus-Pro-7B 是由 DeepSeek 开发的**多模态** AI 模型，它在理解和生成方面取得了显著的进步。这意味着它不仅可以处理文本，还可以处理图像等其他模态的信息。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV18DFpeMEps/)
- [👉👉👉 通过YouTube观看](https://youtu.be/5eAtaW0LT80)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### **模型主要特点:**

- **统一的架构:** Janus-Pro 采用单一 transformer 架构来处理文本和图像信息，实现了真正的多模态理解和生成。
- **解耦的视觉编码:** 为了更好地平衡理解和生成任务，Janus-Pro 将视觉编码解耦为独立的路径，提高了模型的灵活性和性能。
- **强大的性能:** 在多个基准测试中，Janus-Pro 的性能超越了之前的统一模型，甚至可以与特定任务的模型相媲美。
- **开源:** Janus-Pro-7B 是开源的，这意味着研究人员和开发者可以自由地访问和使用它，推动 AI 领域的创新。

**具体来说，Janus-Pro-7B 有以下优势:**

- **图像理解:** 能够准确地识别和理解图像中的对象、场景和关系。
- **图像生成:** 可以根据文本描述生成高质量的图像，甚至可以进行图像编辑和转换。
- **文本生成:** 可以生成流畅、连贯的文本，例如故事、诗歌、代码等。
- **多模态推理:** 可以结合文本和图像信息进行推理，例如根据图像内容回答问题，或者根据文本描述生成图像。

### **与其他模型的比较:**

- **超越 DALL-E 3 和 Stable Diffusion:** 在 GenEval 和 DPG-Bench 等基准测试中，Janus-Pro-7B 的性能优于 OpenAI 的 DALL-E 3 和 Stability AI 的 Stable Diffusion。
- **基于 DeepSeek-LLM:** Janus-Pro 建立在 DeepSeek-LLM-1.5b-base/DeepSeek-LLM-7b-base 的基础上，并对其进行了多模态扩展。

### **应用场景:**

Janus-Pro-7B 具有广泛的应用场景，例如：

- **内容创作:** 可以帮助用户生成高质量的图像、文本和其他多媒体内容。
- **教育:** 可以用于创建交互式学习体验，例如根据文本描述生成图像，或者根据图像内容回答问题。
- **客户服务:** 可以用于构建更智能的聊天机器人，能够理解和回应用户的多模态查询。
- **辅助设计:** 可以帮助设计师生成创意概念，并将其转化为可视化原型。

### 🚀本地部署

```bash
conda create -n myenv python=3.10 -y

git clone https://github.com/deepseek-ai/Janus.git

cd Janus

pip install -e .

pip install webencodings beautifulsoup4 tinycss2

pip install -e .[gradio]

pip install 'pexpect>4.3'

python demo/app_januspro.py
```

### 🚀Colab部署

```bash
!git clone https://github.com/deepseek-ai/Janus.git

%cd Janus

!pip install -e .

!pip install -e .[gradio]

!python demo/app.py

!python demo/app_januspro.py
```