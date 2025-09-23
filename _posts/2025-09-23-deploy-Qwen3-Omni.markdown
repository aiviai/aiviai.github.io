---
layout: single
title: "🚀本地部署+全面测评！阿里最强全模态大模型Qwen3-Omni史诗级更新！OCR能力、音频识别、视频理解无所不能！Qwen3-Omni-30B-A3B-Instruct支持语音输出！"
sidebar:
  nav: "docs"
date: 2025-09-23 00:00:00 +0800
categories: LLMs
tags: [Qwen, Qwen3, Qwen3-Omni, AIGC, AI, AGI, LLM, VLM]
classes: wide
author_profile: true
---




## **01｜**Qwen3-Omni**是什么，为何值得关注？**

**Qwen3-Omni** 是阿里巴巴 Qwen 团队最新开源的原生端到端多语言“全模态”大模型：一次性打通 **文本、图片、音频、视频** 的理解与生成，并且能做 **文字 + 自然语音** 的实时流式响应（自然轮流对话、低延迟首包）。更难得的是，在加入音视能力后，并 **没有牺牲** 纯文本与图像基准的表现，同时在 **音频/音视频** 任务上拿到非常强的成绩。

**多语言覆盖** 也很硬核：**119 种文本语言**、**19 种语音输入**、**10 种语音输出**（支持 **粤语** 等方言场景）。这意味着它既能“听懂世界”，也能流利地“说出来”。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1zXWNzREip/)
- [👉👉👉 通过YouTube观看](https://youtu.be/r-g1m9k6No8)
- [👉👉👉 Subagents视频](https://youtu.be/GjlkRcNNONo)
- [👉👉👉 Gemini CLI视频](https://youtu.be/v41xKxZmygU)
- [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
- [👉👉👉 SuperClaude视频](https://youtu.be/bMO13RNjvBk)
- [👉👉👉 Claudia视频](https://youtu.be/WIwW7V56wxE)
- [👉👉👉 Task Master视频](https://youtu.be/6dhOUJ_vnIY)
- [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
- [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。
> 
🔥AI智能体相关视频
- [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
- [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
- [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  
- [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  



---

## **02｜核心参数与架构，一文讲透**

Omni 的“灵魂”来自一个 **Thinker-Talker 的 MoE（混合专家）双体架构**：

- **Thinker（思考者）**：**30B-A3B** 的 MoE Transformer，侧重理解与推理；A3B 表示单步推理时**激活约 3B** 参数。
- **Talker（说话者）**：**3B-A0.3B** 的 MoE Transformer，负责生成自然语音（含多码本离散语音建模）。
- 还包含 **音频编码器（AuT, 650M）**、**视觉编码器（SigLIP2-So400M, 540M）**、**MTP 轻量解码器（80M）** 与 **Code2wav 卷积解码器（200M）** 等模块，协同把端到端语音首包延迟压到 **理论 234 ms** 等级（冷启动场景）。

> 小结：Omni 通过
> 
> 
> **强理解（Thinker） + 实时自然语音（Talker）**
> 

---

## **03｜一个系列三种模型，各司其职**

官方同时开源了三个变体，命名清晰、定位明确：

- **Qwen3-Omni-30B-A3B-Instruct**：包含 *thinker + talker*；**支持音频/视频/文本输入，输出文字与语音**。
- **Qwen3-Omni-30B-A3B-Thinking**：只包含 *thinker*；**支持音频/视频/文本输入，仅输出文字**（更偏重复杂多模态推理）。
- **Qwen3-Omni-30B-A3B-Captioner**：下游 **音频精细字幕** 模型（从 Instruct 微调而来），**音频输入 → 文本输出**，追求详细且低幻觉的音频描述。

---

## **04｜功能清单：从“能听会说”到“视听对齐”**

- **Any-to-Any 交互**：文本、图片、音频、视频随意组合输入；输出可为文字或自然语音，适合语音助手/视频问答/图像问答/多模态对话。
- **实时流式 & 自然轮替**：具备低延迟流式、自然轮流对话体验；技术报告给出 Talker 的多码本自回归设计与端到端首包延迟细节。
- **多语言 & 方言**：文本 119 种、语音入 19 种、语音出 10 种（含粤语等），满足跨语言实时交流与字幕生成。
- **跨模态推理**：在 36 项音频/音视频基准中**开源 SOTA 32 项、总体 SOTA 22 项**，强调“无退化”的多模态训练策略。
- **官方 Cookbook 场景**：ASR/语音翻译、音乐与音效分析、OCR、图像数学题、视频描述/导航、音视频对话、**语音驱动的函数调用（Agent）** 等，一键复现。

---

## **05｜部署与实践：本地直跑 vs vLLM 服务化**

**两条主线**：

1. **Transformers 直跑（功能最全）**：支持 **文字 + 语音输出**；官方建议安装 flash-attn（BF16/FP16 下减少显存），以及 qwen-omni-utils 处理多模态输入。**若你暂不需要语音输出，可 model.disable_talker()，大约省 ~10GB 显存。**
2. **vLLM 服务化（高吞吐/并发）**：当前 **vLLM serve 仅支持 thinker**，因此**服务化路径下默认是文字输出**；音视频同传时需将视频与音频分开传入（use_audio_in_video 在 serve 模式不可用）。

**显存预估（Transformers·BF16·FA2）**：以视频输入为例，**15s≈78.85GB、30s≈88.52GB、60s≈107.74GB、120s≈144.81GB**；Thinking 版会低一些。生产环境推荐多卡 + vLLM 做吞吐与并发。

---

## **06｜典型落地场景（可直接对标业务）**

- **客服/质检 & 远程排障**：用户上传设备照片 + 故障音；模型“看图+听声”给出排障步骤，必要时**语音播报**。
- **多语直播字幕 & 会议信息化**：**实时 ASR + 翻译 + 关键片段摘要**，支持中英日韩等多语场景，方言更友好。
- **教育与训练**：拍题解题（含 **图像数学题/图表 OCR**）、口语练习（语音纠错/评测），课程视频**视听对齐**问答。
- **创作者工作流**：视频粗切 → 镜头/场景拆解 → 自动生成旁白草稿；音乐/音效风格识别与描述。
- **安防/工控监测**：摄像画面 + 现场音频联动分析，异常声响/画面异动联合告警。

---

## **07｜和传统多模态方案相比，它强在哪？**

- **真“端到端”**：统一架构贯通“听-看-说”，**少拼接、低耦合**，首包与整体时延优势明显。
- **无退化训练**：**早期文本优先 + 混合多模态训练**，尽可能避免“加了音视频后文本反而变差”的老问题。
- **MoE 的效率-性能平衡**：Thinker 30B-A3B/ Talker 3B-A0.3B 的稀疏激活在推理成本与效果之间取得折中，更利于服务端高并发。

---

## **08｜注意事项与选型建议**

- **是否需要“说话”**：如果你要 **语音输出**，优先 **Transformers 路径**；用 vLLM **serve** 暂时只有 thinker（文字输出）。
- **显存与时延**：长视频/多模态并发非常吃显存；不够就降分辨率/时长、分段处理，或多卡并行（vLLM 的 tensor_parallel_size / limit_mm_per_prompt / max_num_seqs 都会影响显存和吞吐）。
- **多语言实践**：语音输入/输出语言覆盖面广，但真实业务中仍建议 **按目标语种做专项评测**（口音、降噪、回声、重叠说话人）。**单次音频可达 40 分钟** 的处理能力，适合长会话/长录音。

---

## **结语**

如果你正在寻找**能看能听还能说**、同时在**文本/图像能力不掉线**的开源多模态模型，**Qwen3-Omni-30B-A3B-Instruct** 值得认真上手：它把“跨模态理解 + 语音交互 + 低延迟流式”做成了一个统一的工程化方案，从 Demo 到落地的“最后一公里”成本更低。

---

### **参考与延伸**

- 官方 **Hugging Face 模型卡**（介绍、语言列表、Cookbook、部署示例、显存表）：Qwen/Qwen3-Omni-30B-A3B-Instruct。
- **技术报告**（架构表、流式语音首包、语言覆盖与基准）：Qwen3-Omni Technical Report。
- **vLLM 说明**（serve 仅支持 thinker、音视频参数注意、OpenAI 兼容示例）：见模型卡 vLLM 用法章节。
- **Captioner 下游模型**（音频精细字幕）：Qwen3-Omni-30B-A3B-Captioner。

### 🚀Docker部署

```bash

sudo groupadd docker

sudo usermod -aG docker $USER

newgrp docker

git clone https://github.com/QwenLM/Qwen3-Omni.git

mkdir -p ~/Qwen3-Omni
  
  
docker run --gpus all --name qwen3-omni \
  -p 8901:80 \
  --mount type=bind,source=/home/Ubuntu/Qwen3-Omni,target=/data/shared/Qwen3-Omni \
  --shm-size=4g \
  -it qwenllm/qwen3-omni:3-cu124
  
  
cd /data/shared/Qwen3-Omni

python3 web_demo.py -c Qwen/Qwen3-Omni-30B-A3B-Instruct \
  --use-transformers --flash-attn2 \
  --server-name 0.0.0.0 --server-port 80
  

python3 web_demo.py -c Qwen/Qwen3-Omni-30B-A3B-Instruct \
  --server-name 0.0.0.0 --server-port 80
  
 
```