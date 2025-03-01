---
layout: single  
title: "🚀本地部署最强OCR大模型olmOCR！支持结构化精准提取复杂PDF文件内容！完美识别中英文文档、模糊扫描件与复杂表格！本地部署与实际测试全过程！医疗法律行业必备！轻松应对企业级PDF批量转换需求！"  
sidebar:
  nav: "docs"
date: 2025-03-01 10:00:00 +0800  
categories: LLMs
tags: [olmOCR, OCR, Qwen2 VL, multimodal, AI]
classes: wide  

author_profile: true  
---

allenai/olmocr是由Allen人工智能研究所(AI2)开发的一个开源工具包,旨在高效地将PDF和其他文档转换为结构化的纯文本,同时保持自然阅读顺序。以下是该项目的主要特点和功能:


### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1jKPYeXE9Q/)
- [👉👉👉 通过YouTube观看](https://youtu.be/XF3Q_ZjwfaI)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


## 核心技术

- 使用名为olmOCR-7B-0225-preview的视觉语言模型(VLM),这是基于Qwen2-VL-7B-Instruct训练而成的。
- 该模型经过约25万页多样化PDF内容(包括扫描和基于文本的)的训练,这些内容使用GPT-4o标注并作为olmOCR-mix-0225数据集发布。

## 主要功能

- 高效批量处理:使用SGLang优化推理管道,能以极低的成本处理大量文档。
- 文档锚定:提取每页中显著元素(如文本块和图像)的坐标,并将其与从PDF二进制文件中提取的原始文本一起注入。
- 支持本地和集群使用:可在单机GPU上运行,也支持使用AWS S3进行多节点并行处理。

## 性能和优势

- 成本效益高:转换100万页PDF仅需190美元,约为使用GPT-4o API成本的1/32。
- 准确性高:在人工评估中,olmOCR在各种PDF提取技术的ELO评级中排名最高。
- 提升下游任务:使用olmOCR提取的文本训练语言模型,在多个AI基准任务中平均提高了1.3个百分点的准确率。

## 使用方法

olmOCR提供了Python API和命令行工具,可以轻松地将PDF转换为结构化文本。它还包括评估工具包、语言过滤、SEO垃圾邮件移除等功能。用户可以通过GitHub获取代码,或使用在线演示来测试其功能。

总之,allenai/olmocr项目为大规模文档转换提供了一个高效、准确且经济的解决方案,特别适合需要处理大量PDF文档的研究和应用场景。

### 安装命令

```bash
# 安装Miniconda（如果尚未安装）
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh ; bash ~/miniconda.sh -b -p $HOME/miniconda ; eval "$($HOME/miniconda/bin/conda shell.bash hook)" ; echo 'export PATH="$HOME/miniconda/bin:$PATH"' >> ~/.bashrc ; source ~/.bashrc

conda create -n ai python=3.11 -y && conda activate ai

sudo apt-get update
sudo apt-get install poppler-utils ttf-mscorefonts-installer msttcorefonts fonts-crosextra-caladea fonts-crosextra-carlito gsfonts lcdf-typetools

conda create -n olmocr python=3.11
conda activate olmocr

git clone https://github.com/allenai/olmocr.git
cd olmocr
pip install -e .

pip install sgl-kernel==0.0.3.post1 --force-reinstall --no-deps
pip install "sglang[all]==0.4.2" --find-links https://flashinfer.ai/whl/cu124/torch2.4/flashinfer/

pip install gradio pandas

python -m olmocr.pipeline ./localworkspace --pdfs tests/gnarly_pdfs/horribleocr.pdf

cat localworkspace/results/output_*.jsonl  

```

## gradio UI代码

```bash
import os
import json
import gradio as gr
import subprocess
import pandas as pd
from pathlib import Path
import shutil
import time
import re

# 创建工作目录
WORKSPACE_DIR = "olmocr_workspace"
os.makedirs(WORKSPACE_DIR, exist_ok=True)

def modify_html_for_better_display(html_content):
    """修改HTML以便在Gradio中更好地显示"""
    if not html_content:
        return html_content
    
    # 增加容器宽度
    html_content = html_content.replace('<div class="container">', 
                                       '<div class="container" style="max-width: 100%; width: 100%;">')
    
    # 增加文本大小
    html_content = html_content.replace('<style>', 
                                       '<style>\nbody {font-size: 16px;}\n.text-content {font-size: 16px; line-height: 1.5;}\n')
    
    # 调整图像和文本部分的大小比例
    html_content = html_content.replace('<div class="row">', 
                                       '<div class="row" style="display: flex; flex-wrap: wrap;">')
    html_content = html_content.replace('<div class="col-md-6">', 
                                       '<div class="col-md-6" style="flex: 0 0 50%; max-width: 50%; padding: 15px;">')
    
    # 增加页面之间的间距
    html_content = html_content.replace('<div class="page">', 
                                       '<div class="page" style="margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">')
    
    # 增加图像大小
    html_content = re.sub(r'<img([^>]*)style="([^"]*)"', 
                         r'<img\1style="max-width: 100%; height: auto; \2"', 
                         html_content)
    
    # 添加缩放控制
    zoom_controls = """
    <div style="position: fixed; bottom: 20px; right: 20px; background: #fff; padding: 10px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.2); z-index: 1000;">
        <button onclick="document.body.style.zoom = parseFloat(document.body.style.zoom || 1) + 0.1;" style="margin-right: 5px;">放大</button>
        <button onclick="document.body.style.zoom = parseFloat(document.body.style.zoom || 1) - 0.1;">缩小</button>
    </div>
    """
    html_content = html_content.replace('</body>', f'{zoom_controls}</body>')
    
    return html_content

def process_pdf(pdf_file):
    """处理PDF文件并返回结果"""
    if pdf_file is None:
        return "请上传PDF文件", "", None, None
    
    # 创建一个唯一的工作目录
    timestamp = int(time.time())
    work_dir = os.path.join(WORKSPACE_DIR, f"job_{timestamp}")
    os.makedirs(work_dir, exist_ok=True)
    
    # 复制PDF文件
    pdf_path = os.path.join(work_dir, "input.pdf")
    shutil.copy(pdf_file, pdf_path)
    
    # 构建命令并执行
    cmd = ["python", "-m", "olmocr.pipeline", work_dir, "--pdfs", pdf_path]
    
    try:
        # 执行命令，等待完成
        process = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        
        # 命令输出
        log_text = process.stdout
        
        # 检查结果目录
        results_dir = os.path.join(work_dir, "results")
        if not os.path.exists(results_dir):
            return f"处理完成，但未生成结果目录\n\n日志输出:\n{log_text}", "", None, None
        
        # 查找输出文件
        output_files = list(Path(results_dir).glob("output_*.jsonl"))
        if not output_files:
            return f"处理完成，但未找到输出文件\n\n日志输出:\n{log_text}", "", None, None
        
        # 读取JSONL文件
        output_file = output_files[0]
        with open(output_file, "r") as f:
            content = f.read().strip()
            if not content:
                return f"输出文件为空\n\n日志输出:\n{log_text}", "", None, None
            
            # 解析JSON
            result = json.loads(content)
            extracted_text = result.get("text", "未找到文本内容")
            
            # 生成HTML预览
            try:
                preview_cmd = ["python", "-m", "olmocr.viewer.dolmaviewer", str(output_file)]
                subprocess.run(preview_cmd, check=True)
            except Exception as e:
                log_text += f"\n生成HTML预览失败: {str(e)}"
            
            # 查找HTML文件
            html_files = list(Path("dolma_previews").glob("*.html"))
            html_content = ""
            if html_files:
                try:
                    with open(html_files[0], "r", encoding="utf-8") as hf:
                        html_content = hf.read()
                        # 修改HTML以更好地显示
                        html_content = modify_html_for_better_display(html_content)
                except Exception as e:
                    log_text += f"\n读取HTML预览失败: {str(e)}"
            
            # 创建元数据表格
            metadata = result.get("metadata", {})
            meta_rows = []
            for key, value in metadata.items():
                meta_rows.append([key, value])
            
            df = pd.DataFrame(meta_rows, columns=["属性", "值"])
            
            return log_text, extracted_text, html_content, df
        
    except subprocess.CalledProcessError as e:
        return f"命令执行失败: {e.stderr}", "", None, None
    except Exception as e:
        return f"处理过程中发生错误: {str(e)}", "", None, None

# 创建Gradio界面
with gr.Blocks(title="olmOCR PDF提取工具") as app:
    gr.Markdown("# olmOCR PDF文本提取工具")
    
    with gr.Row():
        with gr.Column(scale=1):
            pdf_input = gr.File(label="上传PDF文件", file_types=[".pdf"])
            process_btn = gr.Button("处理PDF", variant="primary")
        
        with gr.Column(scale=2):
            tabs = gr.Tabs()
            with tabs:
                with gr.TabItem("提取文本"):
                    text_output = gr.Textbox(label="提取的文本", lines=20, interactive=True)
                with gr.TabItem("HTML预览", id="html_preview_tab"):
                    # 使用更大的HTML组件
                    html_output = gr.HTML(label="HTML预览", elem_id="html_preview_container")
                with gr.TabItem("元数据"):
                    meta_output = gr.DataFrame(label="文档元数据")
                with gr.TabItem("日志"):
                    log_output = gr.Textbox(label="处理日志", lines=15, interactive=False)
    
    # 使用CSS自定义HTML预览标签页和内容大小
    gr.HTML("""
    <style>
    #html_preview_container {
        height: 800px;
        width: 100%; 
        overflow: auto;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    #html_preview_container iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
    </style>
    """)
    
    # 添加操作说明
    gr.Markdown("""
    ## 使用说明
    1. 上传PDF文件
    2. 点击"处理PDF"按钮
    3. 等待处理完成
    4. 查看提取的文本和HTML预览
    
    ### 关于HTML预览
    - HTML预览展示原始PDF页面和提取的文本对照
    - 可以清楚地看到OCR过程的精确度
    - 如果预览内容太小，可以使用右下角的放大/缩小按钮调整
    
    ## 注意
    - 处理过程可能需要几分钟，请耐心等待
    - 首次运行会下载模型（约7GB）
    """)
    
    # 绑定按钮事件 - 使用阻塞模式
    process_btn.click(
        fn=process_pdf,
        inputs=pdf_input,
        outputs=[log_output, text_output, html_output, meta_output],
        api_name="process"
    )

# 启动应用
if __name__ == "__main__":
    app.launch(share=True)
```