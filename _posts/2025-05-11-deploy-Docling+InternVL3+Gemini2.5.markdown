---
layout: single
title: "🚀支持视觉大模型的开源PDF解析+OCR工具！Docling本地配置从入门到精通保姆级教程！支持LM Studio+InternVL3-9B与Gemini2.5 Pro轻松识别解析模糊PDF扫描文件"
sidebar:
  nav: "docs"
date: 2025-05-1 00:00:00 +0800
categories: LLMs
tags: [Docling, OCR, PDF解析 , LM Studio, InternVL3-9B, Gemini2.5 Pro, AI, Gemini]
classes: wide
author_profile: true
---

在AI浪潮席卷全球的今天，企业和个人都在追问：如何让手头海量的PDF、Word、Excel、网页和图片文档真正变成AI可以理解和利用的知识？答案正悄然诞生--Docling，这款由IBM Research团队主导、开源社区热捧的文档处理神器，正以惊人的速度重塑“文档到AI”的数据通道。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1Vy55zSEpd/)
- [👉👉👉 通过YouTube观看](https://youtu.be/q_IdxUGZsow)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥OCR能力测评视频

1. [InternVL#](https://youtu.be/_EqUR0dYGtE) 
2. [Gemini2.5 Pro](https://youtu.be/nb87POhO6aA)  


### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  



**Docling到底是什么？**

Docling是一款开源的文档解析与转换工具，它能将各种复杂的文档格式（如PDF、DOCX、XLSX、HTML、图片等）一键解析，自动转化为结构化的JSON、Markdown或HTML格式。这些格式对大语言模型（LLM）和生成式AI来说，简直是“美味佳肴”--它们能直接用来训练、微调AI，或作为知识库支撑智能问答、内容生成等前沿应用。

**为什么Docling如此特别？**

- **极致的格式兼容力**：无论是多栏排版的年度报告、带有嵌入图片和表格的技术手册，还是扫描版的发票和合同，Docling都能精准识别文本、图片、表格、代码块、数学公式等元素，甚至还能理解页面布局和阅读顺序。
- **超强的PDF解析能力**：PDF一直是AI界的“硬骨头”，因为其内容类型混杂且结构复杂。Docling不仅能把多页表格还原成一个整体，还能识别公式、代码和图片，最大程度保留原始语义和上下文。
- **统一的文档表达格式**：Docling创新性地提出了DoclingDocument格式，无论原始文档来自何种格式，最终都能转换成标准化的结构对象，极大简化了后续AI处理流程。
- **灵活的导出与本地执行**：用户可根据需求选择导出为Markdown、HTML或无损JSON格式。更重要的是，Docling支持本地离线运行，数据隐私和安全性无忧，特别适合处理敏感或内网环境下的企业数据。
- **与主流AI框架无缝集成**：Docling已深度集成LangChain、LlamaIndex、Crew AI、Haystack等热门生成式AI生态，开发者只需几行代码，即可将文档知识注入AI智能体，实现自动问答、内容生成、知识检索等创新场景。

**Docling正在如何改变行业？**

在知识管理、企业智能、法律合规、技术文档分析等领域，Docling已成为不可或缺的“知识管道”。例如，Red Hat和IBM将Docling集成到RHEL AI和InstructLab平台，帮助企业用自有文档微调大模型，让AI真正“懂业务、懂行业”。开源社区更是热情高涨，Docling在GitHub上星标数飙升，成为AI开发者的新宠。

**未来展望：AI与文档的无限可能**

Docling的研发团队正持续扩展其能力，未来将支持更复杂的数据类型，如图表、化学结构、业务表单等。想象一下，AI不仅能读懂技术手册，还能自动解析财报图表、识别专利分子结构，企业的知识资产将被彻底激活，成为AI驱动创新的燃料。

Docling不是下一个“文档OCR工具”，而是AI时代的“知识发动机”。它让沉睡在海量文档中的数据焕发新生，助力每一个组织和开发者，轻松跨越“文档到AI”的鸿沟。未来已来，Docling正带你领跑AI知识革命！

### 🚀安装

```bash
pip install litellm google-generativeai docling
```

### 🚀命令行

```bash
docling https://arxiv.org/pdf/2206.01062

```

### 🚀基础用法

```bash
from docling.document_converter import DocumentConverter

source = "./test/docling.pdf"  # document per local path or URL
output_path = "./output/docling.md"  # 修改为你希望保存的路径

converter = DocumentConverter()
result = converter.convert(source)

markdown_text = result.document.export_to_markdown()

# 保存到本地 Markdown 文件
with open(output_path, "w", encoding="utf-8") as f:
    f.write(markdown_text)

print(f"Markdown 已保存到：{output_path}")
```

### 🚀docling+LM Studio

```bash
import logging
import os
from pathlib import Path
import requests
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import (
    ApiVlmOptions,
    ResponseFormat,
    VlmPipelineOptions,
)
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.pipeline.vlm_pipeline import VlmPipeline

def check_lm_studio_connection(url="http://127.0.0.1:1234", timeout=5):
    """检查LM Studio是否正常运行"""
    try:
        response = requests.get(f"{url}/v1/models", timeout=timeout)
        if response.status_code == 200:
            models = response.json()
            logging.info("LM Studio连接成功")
            return True, models
        else:
            logging.error(f"LM Studio响应异常，状态码: {response.status_code}")
            return False, None
    except Exception as e:
        logging.error(f"无法连接到LM Studio: {e}")
        return False, None

def lm_studio_vlm_options(model: str, prompt: str, timeout: int = 300):
    """配置LM Studio的VLM选项"""
    options = ApiVlmOptions(
        url="http://localhost:1234/v1/chat/completions",
        params=dict(
            model=model,
            max_tokens=8192,
            temperature=0.1,
        ),
        prompt=prompt,
        timeout=timeout,
        scale=0.5,  # 可以调整图片缩放比例
        response_format=ResponseFormat.MARKDOWN,
    )
    return options

def process_single_pdf(pdf_path: Path, output_dir: Path, model_name: str = "internvl3-9b"):
    """处理单个PDF文件"""
    logging.info(f"正在处理: {pdf_path.name}")

    # 配置VLM流水线
    pipeline_options = VlmPipelineOptions(
        enable_remote_services=True
    )

    pipeline_options.vlm_options = lm_studio_vlm_options(
        model=model_name,
        prompt="OCR the full page to markdown.",

        #         prompt="""Please accurately extract all text content from this page, including:
# 1. Text content
# 2. Mathematical formulas (in LaTeX format if possible)
# 3. Figure captions and references
# 4. Table content
# 5. Any other relevant information
#
# Format the output in markdown.""",
        timeout=300
    )

    # 创建文档转换器
    doc_converter = DocumentConverter(
        format_options={
            InputFormat.PDF: PdfFormatOption(
                pipeline_options=pipeline_options,
                pipeline_cls=VlmPipeline,
            )
        }
    )

    try:
        # 执行转换
        result = doc_converter.convert(pdf_path)

        # 保存结果
        markdown_content = result.document.export_to_markdown()
        output_file = output_dir / f"{pdf_path.stem}_content.md"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        logging.info(f"转换完成，结果已保存到: {output_file}")
        return True, output_file

    except Exception as e:
        logging.error(f"处理 {pdf_path.name} 时出错: {e}")
        return False, None

def process_pdf_folder(input_folder: str, output_folder: str = "./output", model_name: str = "internvl3-2b"):
    """处理指定文件夹中的所有PDF文件"""

    # 设置日志
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    # 检查输入文件夹
    input_path = Path(input_folder)
    if not input_path.exists():
        logging.error(f"输入文件夹不存在: {input_folder}")
        return

    # 创建输出文件夹
    output_path = Path(output_folder)
    output_path.mkdir(parents=True, exist_ok=True)

    # 检查LM Studio连接
    logging.info("=== 检查LM Studio连接 ===")
    success, models = check_lm_studio_connection()
    if not success:
        logging.error("无法连接到LM Studio，请确保：")
        logging.error("1. LM Studio已启动")
        logging.error("2. API服务器已启用")
        logging.error("3. internvl3-2b模型已加载")
        return

    # 查找所有PDF文件
    pdf_files = list(input_path.glob("*.pdf"))
    if not pdf_files:
        logging.warning(f"在 {input_folder} 中未找到PDF文件")
        return

    logging.info(f"找到 {len(pdf_files)} 个PDF文件")

    # 处理每个PDF文件
    success_count = 0
    failed_files = []

    for i, pdf_file in enumerate(pdf_files, 1):
        logging.info(f"\n=== 处理第 {i}/{len(pdf_files)} 个文件 ===")
        success, output_file = process_single_pdf(pdf_file, output_path, model_name)

        if success:
            success_count += 1
            # 显示部分内容预览
            with open(output_file, 'r', encoding='utf-8') as f:
                content = f.read()
                print(f"\n--- {pdf_file.name} 转换结果预览 ---")
                print(content[:200] + "..." if len(content) > 200 else content)
        else:
            failed_files.append(pdf_file.name)

    # 输出处理结果统计
    logging.info(f"\n=== 处理完成 ===")
    logging.info(f"成功处理: {success_count}/{len(pdf_files)} 个文件")
    if failed_files:
        logging.warning(f"失败文件: {', '.join(failed_files)}")

def main():
    """主函数"""
    # 设置输入文件夹 - 修改这里指定你的PDF文件所在位置
    input_folder = "./pdf_files"  # 修改为你的PDF文件夹路径

    # 设置输出文件夹
    output_folder = "./output"  # 结果保存位置

    # 设置模型名称
    model_name = "internvl3-9b"  # 或者其他你在LM Studio中使用的模型名称

    # 处理指定文件夹中的所有PDF
    process_pdf_folder(input_folder, output_folder, model_name)

if __name__ == "__main__":
    main()
```

### 🚀docling+Gemini2.5 Pro

```bash
import logging
import os
from pathlib import Path
import litellm
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import (
    ApiVlmOptions,
    ResponseFormat,
    VlmPipelineOptions,
)
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.pipeline.vlm_pipeline import VlmPipeline
import threading
import queue
import time

# 创建一个自定义的 API 服务器模拟器
class GeminiAPIServer:
    def __init__(self):
        self.is_running = False
        self.server_thread = None
        self.model_cache = {}

    def start(self):
        """启动 API 服务器"""
        import http.server
        import socketserver
        import json
        from urllib.parse import parse_qs, urlparse

        class CustomHandler(http.server.SimpleHTTPRequestHandler):
            server_obj = self

            def do_POST(self):
                if self.path == '/v1/chat/completions':
                    content_length = int(self.headers['Content-Length'])
                    post_data = self.rfile.read(content_length)

                    try:
                        request_data = json.loads(post_data.decode('utf-8'))
                        response = self.handle_completion(request_data)

                        self.send_response(200)
                        self.send_header('Content-type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps(response).encode())
                    except Exception as e:
                        self.send_response(500)
                        self.send_header('Content-type', 'application/json')
                        self.end_headers()
                        error_response = {"error": str(e)}
                        self.wfile.write(json.dumps(error_response).encode())
                else:
                    self.send_response(404)
                    self.end_headers()

            def handle_completion(self, request_data):
                model = request_data.get("model", "gemini-2.5-pro-preview-05-06")
                messages = request_data.get("messages", [])

                # 使用 liteLLM 进行实际调用
                try:
                    response = litellm.completion(
                        model=f"gemini/{model}",
                        messages=messages,
                        temperature=request_data.get("temperature", 0.1),
                        max_tokens=request_data.get("max_tokens", 65536)
                    )

                    # 确保响应格式符合 OpenAI 标准
                    return {
                        "id": response.id,
                        "object": "chat.completion",
                        "created": int(time.time()),
                        "model": model,
                        "choices": [
                            {
                                "index": 0,
                                "message": {
                                    "role": "assistant",
                                    "content": response.choices[0].message.content
                                },
                                "finish_reason": "stop"
                            }
                        ],
                        "usage": response.usage.dict() if response.usage else {}
                    }
                except Exception as e:
                    raise e

            def log_message(self, format, *args):
                pass  # 减少日志输出

        def run_server():
            with socketserver.TCPServer(("", 4000), CustomHandler) as httpd:
                httpd.timeout = 1  # 设置超时，便于优雅关闭
                self.httpd = httpd
                while self.is_running:
                    httpd.handle_request()

        self.is_running = True
        self.server_thread = threading.Thread(target=run_server)
        self.server_thread.start()
        time.sleep(2)  # 等待服务器启动

    def stop(self):
        """停止 API 服务器"""
        self.is_running = False
        if self.server_thread:
            self.server_thread.join(timeout=5)
        logging.info("API 服务器已停止")

# 全局 API 服务器实例
api_server = GeminiAPIServer()

def gemini_vlm_options(model: str, prompt: str, timeout: int = 300):
    """配置 Gemini 的 VLM 选项"""
    options = ApiVlmOptions(
        url="http://localhost:4000/v1/chat/completions",
        params=dict(
            model=model,
            max_tokens=65536,
            temperature=1,
        ),
        prompt=prompt,
        timeout=timeout,
        scale=1.0, # 图片缩放比例
        response_format=ResponseFormat.MARKDOWN,
    )
    return options

def process_single_pdf(pdf_path: Path, output_dir: Path, model_name: str = "gemini-2.5-pro-preview-05-06"):
    """处理单个PDF文件"""
    logging.info(f"正在处理: {pdf_path.name}")

    # 配置VLM流水线
    pipeline_options = VlmPipelineOptions(
        enable_remote_services=True
    )

    pipeline_options.vlm_options = gemini_vlm_options(
        model=model_name,
        prompt="OCR the full page to markdown.",
        timeout=300
    )

    # 创建文档转换器
    doc_converter = DocumentConverter(
        format_options={
            InputFormat.PDF: PdfFormatOption(
                pipeline_options=pipeline_options,
                pipeline_cls=VlmPipeline,
            )
        }
    )

    try:
        # 执行转换
        result = doc_converter.convert(pdf_path)

        # 保存结果
        markdown_content = result.document.export_to_markdown()
        output_file = output_dir / f"{pdf_path.stem}_content.md"

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        logging.info(f"转换完成，结果已保存到: {output_file}")
        return True, output_file

    except Exception as e:
        logging.error(f"处理 {pdf_path.name} 时出错: {e}")
        return False, None

def process_pdf_folder(input_folder: str, output_folder: str = "./output", model_name: str = "gemini-2.5-pro-preview-05-06"):
    """处理指定文件夹中的所有PDF文件"""

    # 设置日志
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

    # 检查环境变量
    if not os.getenv("GEMINI_API_KEY"):
        logging.error("未设置 GEMINI_API_KEY 环境变量")
        logging.error("请设置你的 Gemini API 密钥: export GEMINI_API_KEY='your-api-key'")
        return

    # 初始化 liteLLM
    os.environ["LITELLM_LOG"] = "ERROR"  # 减少日志输出

    # 启动本地 API 服务器
    logging.info("=== 启动本地 API 服务器 ===")
    try:
        api_server.start()
        logging.info("API 服务器启动成功")
    except Exception as e:
        logging.error(f"无法启动 API 服务器: {e}")
        return

    # 检查输入文件夹
    input_path = Path(input_folder)
    if not input_path.exists():
        logging.error(f"输入文件夹不存在: {input_folder}")
        api_server.stop()
        return

    # 创建输出文件夹
    output_path = Path(output_folder)
    output_path.mkdir(parents=True, exist_ok=True)

    try:
        # 查找所有PDF文件
        pdf_files = list(input_path.glob("*.pdf"))
        if not pdf_files:
            logging.warning(f"在 {input_folder} 中未找到PDF文件")
            return

        logging.info(f"找到 {len(pdf_files)} 个PDF文件")

        # 处理每个PDF文件
        success_count = 0
        failed_files = []

        for i, pdf_file in enumerate(pdf_files, 1):
            logging.info(f"\n=== 处理第 {i}/{len(pdf_files)} 个文件 ===")
            success, output_file = process_single_pdf(pdf_file, output_path, model_name)

            if success:
                success_count += 1
                # 显示部分内容预览
                with open(output_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    print(f"\n--- {pdf_file.name} 转换结果预览 ---")
                    print(content[:200] + "..." if len(content) > 200 else content)
            else:
                failed_files.append(pdf_file.name)

        # 输出处理结果统计
        logging.info(f"\n=== 处理完成 ===")
        logging.info(f"成功处理: {success_count}/{len(pdf_files)} 个文件")
        if failed_files:
            logging.warning(f"失败文件: {', '.join(failed_files)}")

    finally:
        # 停止服务器
        api_server.stop()

def main():
    """主函数"""
    # 设置输入文件夹
    input_folder = "./pdf_files"  # 修改为你的PDF文件夹路径

    # 设置输出文件夹
    output_folder = "./output"  # 结果保存位置

    # 设置模型名称
    model_name = "gemini-2.5-pro-preview-05-06"  # 使用 Gemini 2.5 Pro Preview

    # 处理指定文件夹中的所有PDF
    process_pdf_folder(input_folder, output_folder, model_name)

if __name__ == "__main__":
    main()
```