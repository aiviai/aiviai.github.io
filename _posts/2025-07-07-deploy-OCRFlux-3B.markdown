---
layout: single  
title: "🚀本地部署最强开源OCR大模型OCRFlux-3B！3090显卡即可运行！3B小参数模型企业级OCR准确率惊人超越olmOCR！3分钟部署OCRFlux，一条命令将PDF转Markdown，准确率惊人！"  
sidebar:
  nav: "docs"
date: 2025-07-07 10:00:00 +0800  
categories: LLMs
tags: [olmOCR, OCR, OCRFlux-3B, OCRFlux, multimodal, AI, PDF, markdown]
classes: wide  

author_profile: true  
---

OCRFlux是一款革命性的开源OCR工具，基于3B参数的多模态大语言模型构建，在文档识别准确率上实现了突破性进展。在权威测试中，OCRFlux达到了惊人的96.7%准确率，大幅超越了参数量更大的7B模型olmOCR（87.2%）和MonkeyOCR（78.0%），充分证明了其技术架构的先进性。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1rh3DzWEVF/)
- [👉👉👉 通过YouTube观看](https://youtu.be/sec-BQYCsco)
- [👉👉👉 Gemini OCR视频](https://youtu.be/nb87POhO6aA)
- [👉👉👉 internVL3 OCR视频](https://youtu.be/_EqUR0dYGtE)
- [👉👉👉 olmOCR视频](https://youtu.be/XF3Q_ZjwfaI)
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


OCRFlux的核心优势在于其业界首创的跨页表格和段落智能合并功能。传统OCR工具往往在处理跨页内容时表现糟糕，而OCRFlux能够准确识别并无缝合并被分页打断的表格和文本，为用户提供完整、连贯的内容提取体验。这一功能对于处理学术论文、财务报表、技术文档等复杂文档具有重要意义。

在部署便利性方面，OCRFlux表现出色。仅需12GB显存的GTX 3090即可流畅运行，相比动辄需要昂贵A100的其他方案，大大降低了使用门槛。支持PDF和图片格式，能够智能处理多列布局、复杂表格、数学公式等各种文档元素。

作为完全开源的解决方案，OCRFlux不仅免费使用，更保障了数据隐私安全。用户可以在本地环境中处理敏感文档，无需担心云端OCR服务的隐私泄露风险。这使得OCRFlux成为企业、学术机构和个人用户进行文档数字化的理想选择。

### 🚀windows开启WSL步骤：[https://learn.microsoft.com/zh-cn/windows/wsl/install](https://learn.microsoft.com/zh-cn/windows/wsl/install)

### 🚀**OCRFlux**本地部署命令

```bash
sudo apt-get update
sudo apt-get install poppler-utils poppler-data ttf-mscorefonts-installer msttcorefonts fonts-crosextra-caladea fonts-crosextra-carlito gsfonts lcdf-typetools

conda activate ocrflux

git clone https://github.com/chatdoc-com/OCRFlux.git
cd OCRFlux

pip install -e . --find-links https://flashinfer.ai/whl/cu124/torch2.5/flashinfer/

pip install huggingface_hub

mkdir -p ~/models

python -c "
from huggingface_hub import snapshot_download
snapshot_download(
    repo_id='ChatDOC/OCRFlux-3B',
    local_dir='/home/Ubuntu/models/OCRFlux-3B'
)
"

python -m ocrflux.pipeline ./localworkspace --data test.pdf --model ~/models/OCRFlux-3B
python -m ocrflux.pipeline ./localworkspace --data /home/Ubuntu/Downloads/test.pdf --model ~/models/OCRFlux-3B
cat ~/OCRFlux/localworkspace/results/*.jsonl
```

### 🚀**OCRFlux自动识别PDF的**脚本

```bash
# 1. 创建脚本文件
cat > ~/OCRFlux/pdf_to_markdown.sh << 'EOF'
#!/bin/bash

# 检查参数
if [ "$#" -ne 1 ]; then
    echo "使用方法: $0 <PDF文件路径>"
    echo "示例: $0 /home/Ubuntu/Downloads/test.pdf"
    exit 1
fi

PDF_FILE="$1"

# 检查文件是否存在
if [ ! -f "$PDF_FILE" ]; then
    echo "错误: 文件 '$PDF_FILE' 不存在"
    exit 1
fi

echo "开始处理PDF文件: $PDF_FILE"
echo "======================================="

# 确保在OCRFlux目录中
cd ~/OCRFlux

# 第一步：处理PDF生成JSONL
echo "第一步: 正在处理PDF..."
python -m ocrflux.pipeline ./localworkspace --data "$PDF_FILE" --model ~/models/OCRFlux-3B

# 检查第一步是否成功
if [ $? -eq 0 ]; then
    echo "第一步完成: PDF处理成功"
    echo "======================================="
    
    # 第二步：生成Markdown文件
    echo "第二步: 正在生成Markdown文件..."
    python -m ocrflux.jsonl_to_markdown ./localworkspace
    
    if [ $? -eq 0 ]; then
        echo "======================================="
        echo "✅ 处理完成!"
        echo "📁 Markdown文件位置: ~/OCRFlux/localworkspace/markdowns/"
        echo "📄 查看结果:"
        echo "   ls -la ~/OCRFlux/localworkspace/markdowns/"
        echo "   find ~/OCRFlux/localworkspace/markdowns/ -name '*.md'"
    else
        echo "❌ 第二步失败: 生成Markdown文件时出错"
        exit 1
    fi
else
    echo "❌ 第一步失败: PDF处理时出错"
    exit 1
fi
EOF

# 2. 设置执行权限
chmod +x ~/OCRFlux/pdf_to_markdown.sh

# 3. 使用脚本
~/OCRFlux/pdf_to_markdown.sh /home/Ubuntu/Downloads/test.pdf
```