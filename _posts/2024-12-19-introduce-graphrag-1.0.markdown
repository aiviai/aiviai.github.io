---
layout: single  
title: "GraphRAG 1.0重磅升级！颠覆传统RAG！DRIFT搜索+Update命令！整合LM Studio本地大模型实现高效RAG！MarkItDown将PDF转为markdown！性能提升3倍"  
sidebar:
  nav: "docs"
date: 2024-12-19 10:00:00 +0800  
categories: RAG
tags: [GraphRAG, 微软, 开源, 自然语言处理]
classes: wide  

author_profile: true  
---



微软于2024年12月16日正式发布了GraphRAG 1.0，这是一个将图结构数据与检索增强生成（RAG）模型相结合的开源工具，旨在提升自然语言处理任务的性能。GraphRAG 1.0的主要特点包括DRIFT搜索算法、Update命令以及与LM Studio的整合，使得用户能够更高效地处理图结构数据。此外，微软还推出了MarkItDown，这是一个将PDF文档转换为Markdown格式的工具，可以提高文档的可读性和可编辑性。

### 本篇笔记所对应的视频：


- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/YzH4acK)
- [👉👉👉 通过YouTube观看](https://youtu.be/GRZ2th6s7uY)



### 主要改进

- **简化设置**：通过添加`init`命令生成简化的`settings.yml`文件，减少了新项目的配置难度。 

- **易用性增强**：减少了环境变量的使用，使配置更加直观和友好。

- **社区支持**：社区贡献者提供了大量修复和改进，提升了整体性能和稳定性。

### 应用前景

GraphRAG 1.0的发布，为开发者提供了更强大、更易于使用的AI工具，适用于复杂的领域应用。在医疗、法律等需要专业知识的领域，该技术可以帮助构建更智能的问答系统，为用户提供高质量的答案。此外，在教育领域，GraphRAG 1.0也能用于开发智能辅导系统，帮助学生更好地理解复杂概念。

### 安装GraphRAG

```bash
git clone https://github.com/microsoft/graphrag.git

cd graphrag
pip install .

```

### MarkItDown

MarkItDown是一个功能强大的文件格式转换工具，可以将多种格式的文件转换为Markdown格式。

**支持的输入格式**

- PowerPoint/PPTX文件
- Excel/XLSX文件
- Word/DOCX文件
- 图片（支持EXIF元数据和OCR识别）
- 音频（支持EXIF元数据和语音转写）
- HTML（特别支持Wikipedia等网站）
- 其他文本格式如CSV、JSON、XML等


### 安装MarkItDown

```bash

pip install markitdown

markitdown GPT.pdf > ./ragtest/input/book.txt

```

### GraphRAG使用方式

```bash

graphrag query \\
--root ./ragtest \\
--method drift \\
--query "Provide some examples of the Seed-word Prompt?"
graphrag query \\
--root ./ragtest \\
--method local \\
--query "show me some examples of the Instructions Prompt Technique"
graphrag query \\
--root ./ragtest \\
--method global \\
--query "Provide some examples of the Seed-word Prompt?"

```

### GraphRAG updat 命令

```bash

graphrag update \\
  --config PATH \\                    # Path to your configuration file
  --root PATH \\                      # Project root directory (defaults to current directory '.')
  --verbose \\                        # Enable verbose logging (default is --no-verbose)
  --memprofile \\                     # Enable memory profiling (default is --no-memprofile)
  --logger [rich|print|none] \\       # Choose logger type (default is 'rich')
  --cache \\                          # Use LLM cache (default is --cache)
  --skip-validation \\                # Skip preflight validation (default is --no-skip-validation)
  --output PATH                      # Directory for output (overrides storage.base_dir in config)

```