---
layout: single
title: "Mistral-Small-Instruct-2409 深入剖析如何结合Mistral small和LlamaIndex，实现语言代理树搜索，打造超强企业分析工具！"
sidebar:
  nav: "docs"
date: 2024-09-19 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM]
tags: [AI, AI-Agents, GPT, GPT-4, LLM, LlamaIndex, Mistral, Ollama]
classes: wide
author_profile: true
---


#  Mistral-Small-Instruct-2409 深入剖析如何结合Mistral small和LlamaIndex，实现语言代理树搜索，打造超强企业分析工具！ 

###  本期视频为大家深入解析Mistral最新发布的开源模型Mistral small。这款拥有220亿参数的模型不仅支持128K的上下文窗口，而且在function calling方面表现出色。 

###  参数:22B 

###  支持function calling 

###  128k上下文长度 

###  GPU显存要求:44 GB 

###  ollama 
    
    
    ollama run mistral-small

###  算法测试： 

[ https://leetcode.com/problems/merge-k-sorted-lists/description/ ](<https://leetcode.com/problems/merge-k-sorted-lists/description/>)

[ https://leetcode.com/problems/distinct-subsequences/ ](<https://leetcode.com/problems/distinct-subsequences/>)

[ https://leetcode.com/problems/sliding-window-maximum/description/ ](<https://leetcode.com/problems/sliding-window-maximum/description/>)

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **
    
    
```
    curl --location "https://api.mistral.ai/v1/chat/completions" \
         --header 'Content-Type: application/json' \
         --header 'Accept: application/json' \
         --header "Authorization: Bearer iTDzYt5Htod7u" \
         --data '{
        "model": "mistral-large-latest",
        "messages": [{"role": "user", "content": "Who is the most renowned French painter?"}]
      }'
```

###  安装 
    
    
    pip install --upgrade vllm mistral_common
    

###  离线使用 
    
    
    from vllm import LLM
    from vllm.sampling_params import SamplingParams
    
    model_name = "mistralai/Mistral-Small-Instruct-2409"
    
    sampling_params = SamplingParams(max_tokens=8192)
    
```
    # note that running Mistral-Small on a single GPU requires at least 44 GB of GPU RAM
    # If you want to divide the GPU requirement over multiple devices, please add *e.g.* `tensor_parallel=2`
    llm = LLM(model=model_name, tokenizer_mode="mistral", config_format="mistral", load_format="mistral")
```
    
    prompt = "How often does the letter r occur in Mistral?"
    
```
    messages = [
        {
            "role": "user",
            "content": prompt
        },
    ]
```
    
    outputs = llm.chat(messages, sampling_params=sampling_params)
    
    print(outputs[0].outputs[0].text)
    

###  server 
    
    
    vllm serve mistralai/Mistral-Small-Instruct-2409 --tokenizer_mode mistral --config_format mistral --load_format mistral
    
    

###  **Language Agent Tree Search 语言代理树搜索（LATS)**

[ https://colab.research.google.com/github/run-llama/llama_index/blob/main/docs/docs/examples/agent/lats_agent.ipynb ](<https://colab.research.google.com/github/run-llama/llama_index/blob/main/docs/docs/examples/agent/lats_agent.ipynb>)

> 语言代理树搜索 
> 
> ##  语言代理树搜索（LATS）简介 
> 
> **语言代理树搜索** （ **Language Agent Tree Search** ，简称LATS）是一种创新框架，旨在增强语言模型（LMs）在决策任务中的能力。 
> 
> LATS将蒙特卡罗树搜索（MCTS）与语言模型的反思和评估能力相结合，使其成为各种应用（如编程、交互式问答和网页导航）中强大的自主代理工具。 
> 
> ###  LATS的核心特征 
> 
> LATS因其独特的方法而脱颖而出，该方法结合了推理、行动和规划。以下是其主要组成部分： 
> 
>   * **蒙特卡罗树搜索** ：LATS采用了一种贪婪版本的MCTS，允许它在搜索过程中探索多个潜在结果的分支。这种方法通过一种称为“上置信界”的指标平衡探索（尝试新动作）和利用（选择产生高回报的动作）。 
> 

>   * **反思与评估** ：在执行动作后，LATS会进行反思阶段，根据预定义标准或外部反馈评估结果。这种自我反思有助于通过从过去的行动中学习来改善未来的决策。 
> 

>   * **动作选择** ：该框架包括一种系统的方法，根据先前评估的累积奖励选择最佳的下一个动作。这使得代理能够响应解决方案或继续探索更多选项。 
> 

> 
> ###  LATS的主要步骤 
> 
> LATS遵循的过程包括四个主要步骤： 
> 
>   1. **选择** ：根据累积奖励识别最有前景的动作。 
> 

>   2. **扩展与模拟** ：生成一组潜在动作（通常为五个），并并行模拟其结果。 
> 

>   3. **反思与评估** ：评估这些动作的结果，根据反思和收到的外部反馈进行评分。 
> 

>   4. **回传** ：根据评估结果更新搜索树中先前轨迹的得分。 
> 

> 
> 这种结构化的方法使LATS能够有效地在复杂决策环境中导航，显著提高了性能，相较于传统的提示技术如ReACT和Reflexion有了显著改善。 
> 
> ###  性能与应用 
> 
> LATS在多个领域展示了卓越的性能： 
> 
>   * 在HumanEval编程任务中，它以92.7%的pass@1准确率达到了最先进水平，使用的是GPT-4。 
> 

>   * 在网页导航任务中，它表现出与基于梯度微调方法相当的竞争力，在WebShop上平均得分为75.9%，使用的是GPT-3.5。 
> 

> 
> 这些结果表明，LATS可以增强语言模型的决策能力，而无需额外训练，使其成为开发更复杂AI代理的多功能工具。 
> 
> ###  限制与未来方向 
> 
> 尽管LATS提供了显著优势，但也存在一些挑战： 
> 
>   * **计算成本** ：MCTS的实现增加了计算需求，相较于更简单的方法，这可能限制其在某些场景中的实用性。 
> 

>   * **状态回退需求** ：该框架假设代理可以在决策过程中回退到早期状态，这在所有环境中可能并不现实。 
> 

> 
> 未来研究旨在通过探索更高效的实现方法以及将LATS适应于复杂的多代理系统来解决这些限制。 
> 
> 语言代理树搜索代表了利用语言模型进行自主决策任务的重要进展，将推理、行动和规划结合成一个整体框架，从而增强整体任务性能。 
