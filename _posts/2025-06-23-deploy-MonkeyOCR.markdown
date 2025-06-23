---
layout: single
title: "🚀只有3B参数开源OCR大模型！MonkeyOCR媲美MinerU+Gemini 2.5 Pro +Qwen2.5-VL+olmOCR！真实测评+保姆级部署教程！三分钟打造自己的PDF扫描件OCR项目"
sidebar:
  nav: "docs"
date: 2025-05-23 00:00:00 +0800
categories: LLMs
tags: [MonkeyOCR, OCR, Gemini 2.5 , MinerU, olmOCR, Qwen2.5-VL, PDF扫描件, LLMs, 多模态大模型]
classes: wide
author_profile: true
---

MonkeyOCR是一个基于Structure-Recognition-Relation (SRR)三元组范式的轻量级文档解析模型，由华中科技大学和金山办公联合开发。该模型专门用于文档解析任务，能够处理中英文文档。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1m7N1zKEU8/)
- [👉👉👉 通过YouTube观看](https://youtu.be/T9oaqp-IaZ0)
- [👉👉👉 olmOCR视频](https://youtu.be/XF3Q_ZjwfaI)
- [👉👉👉 internVL3 OCR视频](https://youtu.be/_EqUR0dYGtE)
- [👉👉👉 Gemini2.5 pro OCR视频](https://youtu.be/nb87POhO6aA)
- [👉👉👉 Docling OCR视频](https://youtu.be/WWPWAi-REl0)
- [👉👉👉 Augment编程插件视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Cursor编程视频](https://youtu.be/6dhOUJ_vnIY)
- [👉👉👉 Claude Code编程视频](https://youtu.be/SK9JBDyHqiI)
- [👉👉👉 Kilo Code编程视频](https://youtu.be/sUCsitU7hmE)
- [👉👉👉 Magnetic UI视频](https://youtu.be/0ubHrQz9PN0)
- [👉👉👉 n8n相关视频](https://youtu.be/nb87POhO6aA)
- [👉👉👉 n8n相关视频](https://youtu.be/hE_CeOUY2h0)
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
6. [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  



## **核心优势和特点**

### **1. 创新的SRR三元组范式**

MonkeyOCR将文档解析抽象为三个基本问题："Where is it?"（结构）、"What is it?"（识别）和"How is it organized?"（关系），分别对应布局分析、内容识别和逻辑排序。这种设计：

- 简化了传统多工具流水线的复杂性
- 避免了大型多模态模型处理全页文档的低效率问题
- 在精度和速度之间实现了最佳平衡

### **2. 卓越的性能表现**

与基于流水线的方法MinerU相比，MonkeyOCR在九种中英文文档类型上平均提升5.1%，其中公式识别提升15.0%，表格识别提升8.6%。

与端到端模型相比，3B参数的模型在英文文档上达到最佳平均性能，超越了Gemini 2.5 Pro和Qwen2.5 VL-72B等模型。

### **3. 处理速度优势**

在多页文档解析方面，MonkeyOCR达到0.84页/秒的处理速度，超越MinerU（0.65页/秒）和Qwen2.5 VL-7B（0.12页/秒）。

## **模型详细参数**

### **基础参数**

- **模型大小**: 3B参数
- **架构**: 基于视觉-语言模型的Transformer架构
- **支持语言**: 中文和英文
- **部署要求**: 可在单张NVIDIA 3090 GPU上高效运行

### **技术架构**

MonkeyOCR采用三个专门组件并行工作：结构模块分析文档布局，识别模块处理文本提取，关系模块映射不同元素之间的连接。

### **训练数据**

模型使用MonkeyDoc数据集训练，该数据集包含390万个实例，涵盖十多种中英文文档类型。

## **支持的文档类型**

模型支持解析以下九种文档类型：

- 书籍（Book）
- 幻灯片（Slides）
- 财务报告（Financial Report）
- 教科书（Textbook）
- 考试卷（Exam Paper）
- 杂志（Magazine）
- 学术论文（Academic Papers）
- 笔记（Notes）
- 报纸（Newspaper）

## **技术优势**

### **1. 硬件兼容性**

- 支持LMDeploy和Transformers推理后端
- 在RTX 3090/4090上可能需要调整为Transformers后端以避免兼容性问题
- 推荐Flash Attention 2以提升性能

### **2. 部署灵活性**

- 支持Gradio演示界面
- 正在开发对Ollama和其他部署方案的支持
- 提供简单的命令行接口

## **性能评估结果**

在OmniDocBench基准测试中，MonkeyOCR在多项指标上表现出色：

- **整体编辑距离**: 英文0.124，中文0.257
- **公式CDM得分**: 英文86.2，中文65.4
- **表格TEDS得分**: 英文86.2，中文81.8

## **使用限制**

目前MonkeyOCR不支持拍摄的文档，但团队将在未来更新中持续改进。模型主要针对PDF文档和数字化图像进行优化。

### 🚀Colab脚本：[https://github.com/win4r/mytest/blob/main/monkeyOCR_AI超元域频道制作.ipynb](https://github.com/win4r/mytest/blob/main/monkeyOCR_AI%E8%B6%85%E5%85%83%E5%9F%9F%E9%A2%91%E9%81%93%E5%88%B6%E4%BD%9C.ipynb)

## **安装和使用**

### **环境要求**

```bash
conda create -n MonkeyOCR python=3.10
conda activate MonkeyOCR
pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1

```

### **基本使用**

```bash
python parse.py path/to/your.pdf

```

MonkeyOCR代表了文档理解技术的重大进步，其统一的结构-识别-关系方法提供了更准确和高效的文档处理能力，在计算资源要求较低的同时实现了卓越的性能。

## **环境准备**

### **1. 创建Python环境**

```bash
conda create -n MonkeyOCR python=3.10
conda activate MonkeyOCR

```

### **2. 克隆项目代码**

```bash
git clone https://github.com/Yuliang-Liu/MonkeyOCR.git
cd MonkeyOCR

```

### **3. 安装PyTorch**

根据您的CUDA版本安装对应的PyTorch：

```bash
# 针对CUDA 12.4版本
pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124

```

### **4. 安装MonkeyOCR**

```bash
pip install .

```

## **模型权重下载**

### **方式一：从Hugging Face下载**

```bash
pip install huggingface_hub
python download_model.py

```

### **方式二：从ModelScope下载**

```bash
pip install modelscope
python download_model.py -t modelscope

```

## **基础使用方式**

### **命令行推理**

```bash
# 基础使用
python parse.py path/to/your.pdf

# 指定输出路径和配置文件
python parse.py path/to/your.pdf -o ./output -c config.yaml

# 指定模型路径和配置文件
python parse.py path/to/your.pdf -m model_weight/Recognition -c config.yaml

```

## **GPU兼容性配置**

### **针对RTX 3090/4090的配置优化**

当在RTX 3090/4090 GPU上使用LMDeploy作为推理后端时，可能会遇到兼容性问题。解决方案：

### **1. 安装Flash Attention 2**

```bash
pip install flash-attn==2.7.4.post1 --no-build-isolation

```

### **2. 修改配置文件**

编辑`model_configs.yaml`文件：

```yaml
chat_config:
  backend: transformers  # 改为transformers后端
  batch_size: 10  # 根据GPU内存调整批次大小

```

## **Gradio UI部署**

### **1. 安装UI依赖**

```bash
pip install gradio==5.23.3
pip install pdf2image==1.17.0

```

### **2. 启动Gradio演示界面**

```bash
python demo/demo_gradio.py

```

### **3. UI功能特性**

MonkeyOCR的演示界面提供以下功能：

- 上传PDF或图像文件
- 点击"Parse (解析)"按钮让模型执行结构检测、内容识别和关系预测
- 最终输出为Markdown格式的文档
- 选择提示词并点击"Test by prompt"基于所选提示词进行内容识别

## **在线演示体验**

官方提供了在线演示地址：http://vlrlabmonkey.xyz:7685

**注意事项**：

- 目前模型部署在单GPU上，如果同时有太多用户上传文件，可能会出现"This application is currently busy"的问题
- 演示页面显示的处理时间不仅包括计算时间，还包括结果上传和其他开销

## **性能基准测试环境**

MonkeyOCR、MinerU和Qwen2.5 VL-7B的推理速度都是在H800 GPU上测量的：

- **MonkeyOCR**: 0.84页/秒（多页文档）
- **MinerU**: 0.65页/秒
- **Qwen2.5 VL-7B**: 0.12页/秒

## **部署架构建议**

### **单GPU部署**

- **推荐硬件**: NVIDIA 3090或更高配置
- **内存要求**: 根据批次大小调整，建议至少24GB显存
- **推理后端**: 对于3090/4090建议使用Transformers

### **生产环境部署**

```bash
# 启动服务
python demo/demo_gradio.py --server_name 0.0.0.0 --server_port 7860

```

### **Docker部署（如需要）**

虽然官方文档未提供Docker配置，但您可以基于以上步骤创建Dockerfile：

```
FROM nvidia/cuda:12.4-devel-ubuntu22.04

# 安装Python和conda
RUN apt-get update && apt-get install -y wget
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
RUN bash Miniconda3-latest-Linux-x86_64.sh -b -p /opt/conda

# 设置环境
ENV PATH="/opt/conda/bin:$PATH"
RUN conda create -n MonkeyOCR python=3.10

# 复制代码并安装依赖
COPY . /app
WORKDIR /app
RUN pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124
RUN pip install .
RUN pip install gradio==5.23.3 pdf2image==1.17.0

# 启动服务
CMD ["python", "demo/demo_gradio.py"]

```

## **未来发展计划**

团队正在积极开发对Ollama和其他部署解决方案的支持，以确保为更多用户提供更流畅的体验。

这个部署方案可以让您快速上手MonkeyOCR，无论是用于研究还是生产环境都能提供良好的文档解析能力。

### 安装conda

```bash
# 安装Miniconda（如果尚未安装）
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
bash ~/miniconda.sh -b -p $HOME/miniconda
eval "$($HOME/miniconda/bin/conda shell.bash hook)"
echo 'export PATH="$HOME/miniconda/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

conda create -n ai python=3.11 -y && conda activate ai
```

### **步骤1：下载CUDA 12.4安装包**

```bash

# 下载CUDA 12.4.1 runfile
wget https://developer.download.nvidia.com/compute/cuda/12.4.1/local_installers/cuda_12.4.1_550.54.15_linux.run

```

### **步骤2：运行安装程序**

```bash

# 运行安装程序
sudo sh cuda_12.4.1_550.54.15_linux.run

```

###