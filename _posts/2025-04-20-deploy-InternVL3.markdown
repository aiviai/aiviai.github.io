---
layout: single  
title: "🚀挑战Gemini 2.5！最强开源企业级OCR大模型InternVL3！本地部署教程+实战测评全纪录，轻松搞定潦草手写汉字、模糊PDF扫描件、模糊复杂表格，效果炸裂超过人眼！支持Open WebUI"  
sidebar:
  nav: "docs"
date: 2025-04-20 10:00:00 +0800  
categories: LLMs
tags: [InternVL3, OCR, InternVL, multimodal, AI, VLM]
classes: wide  

author_profile: true  
---

近日，一个重量级的开源多模态大语言模型（MLLM）新星横空出世。由上海人工智能实验室、商汤科技研究院等多家机构联合开发的InternVL3模型，以其卓越的性能和创新的架构设计，正在重新定义开源多模态模型的发展边界。

InternVL3模型采用了一种称为"原生多模态预训练"的创新方法，与传统模型不同，它没有先训练纯文本大语言模型再适配视觉输入，而是在单一预训练阶段同时从多样化的多模态数据和纯文本语料中共同学习语言能力和多模态能力。这种统一的训练范式有效解决了传统MLLM训练流程中常见的复杂性和对齐挑战。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1QDLFzGEyL/)
- [👉👉👉 通过YouTube观看](https://youtu.be/_EqUR0dYGtE)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  


## 技术创新点

InternVL3模型的核心技术创新包括：

1. **可变视觉位置编码（V2PE）**：该模型引入了可变视觉位置编码技术，为视觉令牌使用更小、更灵活的位置增量，从而支持更长的多模态上下文，而无需过度扩展位置窗口。
2. **混合偏好优化（MPO）**：为解决模型在推理过程中可能出现的分布偏移问题，研究团队采用了混合偏好优化技术，引入来自正负样本的额外监督，以使模型响应分布与真实分布保持一致，从而提高推理性能。
3. **测试时扩展策略**：InternVL3采用了Best-of-N评估策略并使用VisualPRM-8B作为评判模型，为推理和数学评估选择最佳响应，显著提升了模型的整体性能。

## 性能突破

根据研究团队的广泛经验评估，InternVL3在多种多模态任务上表现出色。特别值得一提的是，InternVL3-78B在MMMU基准测试中取得了72.2分的成绩，创下了开源MLLM的新纪录，其能力与领先的专有模型（包括ChatGPT-4o、Claude 3.5 Sonnet和Gemini 2.5 Pro）相当，同时保持了强大的纯语言能力。

这一成绩标志着开源多模态模型首次在这一重要基准上突破70%的门槛，相比于之前的InternVL 2.5模型有了显著提升。

## 广泛的应用场景

与前代InternVL 2.5相比，InternVL3不仅在多模态感知和推理能力方面表现更佳，还将其多模态能力进一步扩展到工具使用、GUI代理、工业图像分析、3D视觉感知等领域。

这使得InternVL3在实际应用中具有更广泛的价值，从基础图像理解到复杂的跨模态推理任务，都能表现出色。

## 开源贡献

遵循开放科学原则，研究团队将公开发布InternVL3的训练数据和模型权重，以促进下一代MLLM的进一步研究和开发。这一举措对开源AI社区具有重要意义，为研究人员和开发者提供了宝贵的资源。

## 未来展望

随着多模态大语言模型的不断发展，InternVL3的创新技术和优异性能为未来AI系统的发展提供了新的思路和参考。我们期待看到更多研究团队基于这一开源模型进行创新，推动多模态AI技术在各行各业的落地应用。

---

### LMDeploy文档

[https://github.com/InternLM/lmdeploy](https://github.com/InternLM/lmdeploy)

### Windows系统开启wsl：
[https://learn.microsoft.com/zh-cn/windows/wsl/install](https://learn.microsoft.com/zh-cn/windows/wsl/install)

### 🔥Open WebUI安装

```python
pip install open-webui

open-webui serve

访问：http://localhost:8080/
```

### 🔥本地部署详细命令

```markdown
# AI超元域频道原创视频
# 安装Miniconda（如果尚未安装）
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
bash ~/miniconda.sh -b -p $HOME/miniconda
eval "$($HOME/miniconda/bin/conda shell.bash hook)"
echo 'export PATH="$HOME/miniconda/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
# AI超元域频道原创视频
conda create -n lmdeploy python=3.11 -y && conda activate lmdeploy

pip install lmdeploy partial_json_parser timm

# serve
lmdeploy serve api_server OpenGVLab/InternVL3-14B-Instruct --backend turbomind --server-port 23333 --tp 2 --chat-template internvl2_5

# 调用api
from openai import OpenAI

client = OpenAI(api_key='YOUR_API_KEY', base_url='http://0.0.0.0:23333/v1')
model_name = client.models.list().data[0].id
response = client.chat.completions.create(
    model=model_name,
    messages=[{
        'role':
        'user',
        'content': [{
            'type': 'text',
            'text': 'describe this image',
        }, {
            'type': 'image_url',
            'image_url': {
                'url':
                'https://modelscope.oss-cn-beijing.aliyuncs.com/resource/tiger.jpeg',
            },
        }],
    }],
    temperature=0.8,
    top_p=0.8)
print(response)
```

### Linux/Ubuntu内存、显存监控脚本

```python

#pip install psutil flask flask-cors gputil
#nohup python server.py > server_log.txt 2>&1 &

#!/usr/bin/env python3
"""
Server Metrics API - Provides real-time GPU, CPU and RAM usage via HTTP
"""

import json
import os
import time
import psutil
import subprocess
from flask import Flask, jsonify, Response
from flask_cors import CORS
import GPUtil

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

def get_ram_info():
    """Get RAM usage information"""
    memory = psutil.virtual_memory()
    return {
        "total": memory.total / (1024 ** 3),  # Convert to GB
        "used": memory.used / (1024 ** 3),
        "free": memory.available / (1024 ** 3),
        "percent": memory.percent
    }

def get_cpu_info():
    """Get CPU usage information"""
    # Get per-core CPU percentage over 0.5 second interval
    per_cpu_percent = psutil.cpu_percent(interval=0.5, percpu=True)
    
    # Get overall CPU percentage
    overall_percent = sum(per_cpu_percent) / len(per_cpu_percent)
    
    # Get CPU frequency information if available
    freq = psutil.cpu_freq()
    frequency = None
    if freq:
        frequency = {
            "current": freq.current,
            "min": freq.min if hasattr(freq, 'min') else None,
            "max": freq.max if hasattr(freq, 'max') else None
        }
    
    return {
        "overall_percent": overall_percent,
        "per_cpu_percent": per_cpu_percent,
        "frequency": frequency,
        "core_count": psutil.cpu_count(logical=True),
        "physical_core_count": psutil.cpu_count(logical=False)
    }

def get_gpu_info():
    """Get GPU usage information"""
    try:
        gpus = GPUtil.getGPUs()
        gpu_data = []
        
        for i, gpu in enumerate(gpus):
            gpu_data.append({
                "id": i,
                "name": gpu.name,
                "load": gpu.load * 100,  # Convert to percentage
                "memory": {
                    "total": gpu.memoryTotal,  # In GB
                    "used": gpu.memoryUsed,    # In GB
                    "free": gpu.memoryFree,    # In GB
                    "percent": (gpu.memoryUsed / gpu.memoryTotal) * 100
                },
                "temperature": gpu.temperature
            })
        
        return gpu_data
    except Exception as e:
        print(f"Error retrieving GPU info: {e}")
        return []

@app.route('/metrics', methods=['GET'])
def metrics():
    """API endpoint to get all metrics"""
    data = {
        "timestamp": time.time(),
        "cpu": get_cpu_info(),
        "ram": get_ram_info(),
        "gpu": get_gpu_info()
    }
    return jsonify(data)

@app.route('/metrics/stream', methods=['GET'])
def metrics_stream():
    """Stream metrics as server-sent events"""
    def generate():
        while True:
            data = {
                "timestamp": time.time(),
                "cpu": get_cpu_info(),
                "ram": get_ram_info(),
                "gpu": get_gpu_info()
            }
            yield f"data: {json.dumps(data)}\n\n"
            time.sleep(1)  # Update every second

    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    # Install dependencies if not already installed
    try:
        import GPUtil
        import flask
        import flask_cors
    except ImportError:
        print("Installing required packages...")
        os.system('pip install psutil flask flask-cors gputil')
        print("Please restart the script after installation.")
        exit(1)
        
    # Run the server on all interfaces on port 5000
    app.run(host='0.0.0.0', port=5000, threaded=True)
```