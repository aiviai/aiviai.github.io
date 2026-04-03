---
layout: single
title: "🦞在OpenClaw实测谷歌开源大模型Gemma 4！256K上下文+多模态输入，小龙虾里实战测试多Agent协作与浏览器自动化全流程！31B参数碾压其他开源大模型！五大维度深度评分结果出人意料"
sidebar:
  nav: "docs"
date: 2026-04-03 00:00:00 +0800
categories: LLMs
tags: [Claude,Claude Code, Gemma4, Gemma, OpenClaw, AI智能体, TDD, AGI, AIGC]
classes: wide
author_profile: true
---



需要将 OpenClaw 配置为使用 gemma-4-31b-it 作为默认模型，并确保其能够正常工作。

> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1Ff9gBwESC/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/GJYQ9Aw7wL8)


## **根本原因**

修复这个问题主要涉及三层兼容性问题：

1. **OpenRouter / HuggingFace Router 不支持 Gemma 4 的 tool/function calling**
    
    而 OpenClaw 的 agent 依赖工具调用，因此这些接入方式不可用。
    
2. **OpenClaw 内置的 google/* provider 不包含 Gemma 模型**
    
    因此直接使用内置 Google provider 时，gemma-4-31b-it 会被识别为未知模型。
    
3. **Gemma 4 的流式响应中包含 "thought": true 的 thinking / reasoning token**
    
    OpenClaw 的响应解析器会尝试将其按结构化 reasoning 输出处理，进而触发 MALFORMED_RESPONSE 错误。
    

## **修复方式**

解决方案是：

- 使用 **自定义 google-ai provider**
- 使用 **Google Generative AI 原生 API 格式**
- 在模型定义中加入 **"reasoning": false**

这样可以让 OpenClaw 跳过对 reasoning/thinking token 的解析，从而避免 Gemma 4 的 thought chunk 导致解析失败。

---

# **需要修改的配置**

## **1. 在~/.openclaw/openclaw.json**

## **中添加自定义 provider**

在 models.providers 下加入：

```
"google-ai": {
  "baseUrl": "https://generativelanguage.googleapis.com/v1beta",
  "api": "google-generative-ai",
  "authHeader": true,
  "models": [
    {
      "id": "gemma-4-31b-it",
      "name": "Gemma 4 31B IT",
      "reasoning": false,
      "input": ["text", "image"],
      "cost": {
        "input": 0,
        "output": 0
      },
      "contextWindow": 262144,
      "maxTokens": 32768
    }
  ]
}
```

## **2. 在~/.openclaw/openclaw.json**

## **中设置默认模型和主 agent 模型**

```
// agents.defaults.model
"primary": "google-ai/gemma-4-31b-it",
"fallbacks": ["minimax/MiniMax-M2.7", "minimax-portal/MiniMax-M2.1"]

// agents.list[0]（主 agent）
"primary": "google-ai/gemma-4-31b-it"

// agents.defaults.models（模型目录项）
"google-ai/gemma-4-31b-it": {
  "alias": "gemma4"
}
```

## **3. 在~/.openclaw/agents/main/agent/auth-profiles.json**

## **中添加认证配置**

```
"google-ai:default": {
  "type": "api_key",
  "provider": "google-ai",
  "key": "<GOOGLE_AI_STUDIO_API_KEY>"
}
```

## **4. 在~/.openclaw/.env**

## **中配置 API Key**

```
GOOGLE_AI_API_KEY=AIza...
```

---

# **关键点总结**

要让 OpenClaw 正常使用 Gemma 4 31B IT，核心是三点：

- 不使用 OpenRouter / HuggingFace Router 作为 Gemma 4 的 tool use 接入方式
- 通过自定义 google-ai provider 直连 Google AI Studio
- 在模型定义中设置 "reasoning": false，避免 OpenClaw 解析 Gemma 4 的 thinking token 时出错

---
