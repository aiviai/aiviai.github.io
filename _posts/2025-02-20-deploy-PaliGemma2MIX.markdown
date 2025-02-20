---
layout: single  
title: "🚀本地部署谷歌PaliGemma 2 mix视觉大模型！轻松识别图像！支持标记物体位置！支持ORC提取文字内容！支持自然语言问答、文档理解、视觉问答！5分钟带你掌握本地部署全流程！附全部代码与注释说明"  
sidebar:
  nav: "docs"
date: 2025-02-20 10:00:00 +0800  
categories: LLMs
tags: [PaliGemma, PaliGemma 2, PaliGemma 2 mix, 多模态大模型, OCR]
classes: wide  

author_profile: true  
---

PaliGemma 2 mix是Google最新发布的视觉语言模型(VLM),是PaliGemma 2系列的一个重要组成部分。这个模型在多种视觉语言任务上进行了微调,可以直接用于多种应用场景。

PaliGemma 2 mix代表了视觉语言模型的最新进展,为多模态AI应用开辟了新的可能性。它的多功能性和即插即用特性使其成为研究和实际应用的理想选择。


### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1sNAWeBELq/)
- [👉👉👉 通过YouTube观看](https://youtu.be/a_bfJCM1xrg)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


### 🚀简介


## 模型架构与特点

PaliGemma 2 mix基于两个关键技术:

1. SigLIP视觉编码器:处理图像和视频等视觉数据
2. Gemma 2语言模型:处理多语言文本理解和生成

这两个组件共同构成了一个强大的视觉语言模型,能够无缝地解释和连接视觉与文本信息。

主要特点包括:

- **多种规模**: 提供3B、10B和28B参数的版本,适应不同的计算资源需求
- **多分辨率支持**: 支持224x224、448x448和896x896等多种图像输入分辨率,适用于不同的任务需求
- **多语言能力**: 继承自Gemma 2,具有强大的多语言处理能力
- **即插即用**: 经过多任务微调,可以直接使用,无需额外训练

## 支持的任务

PaliGemma 2 mix能够执行多种视觉语言任务,包括但不限于:

- 图像和短视频字幕生成
- 视觉问答
- 光学字符识别(OCR)
- 对象检测和分割
- 文档理解(如图表和图解分析)
- 科学问题回答

## 使用方法

PaliGemma 2 mix支持开放式提示和特定任务前缀两种使用方式:

1. **开放式提示**: 直接使用自然语言描述任务,模型会自动理解并执行相应操作
2. **任务前缀**: 使用特定格式的前缀来指定任务类型,如"caption {lang}"用于生成图像描述

对于对象检测和图像分割任务,仍需使用特定的任务前缀:

- "detect {object description}": 用于对象检测
- "segment {object description}; {object description}": 用于图像分割

## 性能对比

在各种任务上,PaliGemma 2 mix展现出优秀的性能:

- **图像描述**: 10B/448版本能生成更详细、准确的图像描述,相比3B/448版本
- **视觉问答**: 在简单问题上,3B和10B版本都能给出准确答案
- **OCR**: 能准确识别图像中的文字,并用于后续的问答任务

## 应用前景

PaliGemma 2 mix为研究人员和开发者提供了强大的工具,可应用于:

- 智能图像分析和描述
- 自动文档处理和理解
- 高级视觉搜索系统
- 辅助医疗诊断(如放射影像分析)
- 科学研究辅助工具

### 🔥Demo:

[https://huggingface.co/spaces/google/paligemma2-10b-mix](https://huggingface.co/spaces/google/paligemma2-10b-mix)

### 🚀微调PaliGemma视频

✅国内通过哔哩哔哩观看 [https://b23.tv/iCJzMTr](https://b23.tv/iCJzMTr)

✅海外通过YouTube观看 [https://youtu.be/8WrfOGgGkck](https://youtu.be/8WrfOGgGkck)

### 🚀本地部署

```python
# 下载Miniconda安装脚本
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh

# 添加执行权限
chmod +x Miniconda3-latest-Linux-x86_64.sh

# 运行安装脚本
./Miniconda3-latest-Linux-x86_64.sh

# 激活conda命令
source ~/.bashrc

#anaconda
https://www.anaconda.com/download/success

# 创建一个Python 3.9的环境
conda create -n paligemma python=3.11 -y

# 激活环境
conda activate paligemma

# 如果有NVIDIA GPU,安装CUDA版本的PyTorch
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia -y

# 如果没有GPU,安装CPU版本的PyTorch
conda install pytorch torchvision torchaudio cpuonly -c pytorch -y

# 安装transformers
pip install transformers gradio pillow numpy sympy==1.13.1 accelerate>=0.26.0

pip install gradio pillow numpy

pip install sympy==1.13.1

pip install 'accelerate>=0.26.0'

python -c "import torch; import transformers; import gradio; print('所有依赖已正确安装')"

huggingface-cli login

```

### Demo

```python
import gradio as gr
from transformers import (
    PaliGemmaProcessor,
    PaliGemmaForConditionalGeneration,
)
import torch
from PIL import Image
import numpy as np

# 检查是否有可用的GPU
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# 初始化模型和处理器
model_id = "google/paligemma2-10b-mix-448"  # 使用较小的模型版本

try:
    # 使用更保守的加载设置
    model = PaliGemmaForConditionalGeneration.from_pretrained(
        model_id,
        torch_dtype=torch.float32,  # 使用float32而不是bfloat16以提高兼容性
        device_map="auto",
        low_cpu_mem_usage=True
    ).eval()
    
    processor = PaliGemmaProcessor.from_pretrained(model_id)
    print("Model and processor loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

def process_image(image, task_type, question="", objects=""):
    """处理图片并返回结果"""
    try:
        # 根据任务类型构建prompt
        if task_type == "描述图像":
            prompt = "describe en"
        elif task_type == "OCR文字识别":
            prompt = "ocr"
        elif task_type == "回答问题":
            prompt = f"answer en {question}"
        elif task_type == "检测物体":
            prompt = f"detect {objects}"
        else:
            return "请选择有效的任务类型"
        
        # 确保图像是PIL格式
        if isinstance(image, np.ndarray):
            image = Image.fromarray(image)
        
        # 准备模型输入
        model_inputs = processor(
            text=prompt,
            images=image,
            return_tensors="pt"
        )
        
        # 将输入移到正确的设备上
        model_inputs = {k: v.to(device) for k, v in model_inputs.items()}
        
        input_len = model_inputs["input_ids"].shape[-1]
        
        # 生成结果
        with torch.inference_mode():
            generation = model.generate(
                **model_inputs,
                max_new_tokens=100,
                do_sample=False
            )
            generation = generation[0][input_len:]
            result = processor.decode(generation, skip_special_tokens=True)
        
        return result
    except Exception as e:
        return f"处理过程中出现错误: {str(e)}"

# 创建Gradio界面
with gr.Blocks() as demo:
    gr.Markdown("# PaliGemma 2 演示")
    gr.Markdown("上传图片并选择任务类型来获取分析结果")
    
    with gr.Row():
        with gr.Column():
            # 输入部分
            image_input = gr.Image(label="上传图片")
            task_type = gr.Radio(
                choices=["描述图像", "OCR文字识别", "回答问题", "检测物体"],
                label="选择任务类型",
                value="描述图像"
            )
            
            # 条件输入
            with gr.Group():
                question_input = gr.Textbox(
                    label="问题",
                    placeholder="请输入您的问题",
                    visible=False
                )
                objects_input = gr.Textbox(
                    label="检测物体",
                    placeholder="请输入要检测的物体，用分号分隔",
                    visible=False
                )
            
            submit_btn = gr.Button("开始分析")
        
        with gr.Column():
            # 输出部分
            output_text = gr.Textbox(label="分析结果")
    
    # 动态显示/隐藏输入框
    def update_inputs(task):
        return {
            question_input: gr.update(visible=(task == "回答问题")),
            objects_input: gr.update(visible=(task == "检测物体"))
        }
    
    task_type.change(
        fn=update_inputs,
        inputs=[task_type],
        outputs=[question_input, objects_input]
    )
    
    # 处理提交
    submit_btn.click(
        fn=process_image,
        inputs=[
            image_input,
            task_type,
            question_input,
            objects_input
        ],
        outputs=output_text
    )

if __name__ == "__main__":
    # 添加异常处理
    try:
        # 启动时不自动打开浏览器，并允许外部访问
        demo.launch(share=True, inbrowser=False, server_name="0.0.0.0")
    except Exception as e:
        print(f"启动服务时出现错误: {e}")
```