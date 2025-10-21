---
layout: single  
title: "🚀DeepSeek又放大招！这个OCR模型让文档识别效率倍增！本地部署+客观实测DeepSeek-OCR！OCR识别准确率97%，支持100+语言，每天处理3300万页文档的开源大模型！"  
sidebar:
  nav: "docs"
date: 2025-10-21 10:00:00 +0800  
categories: LLMs
tags: [DeepSeek-OCR, DeepSeek, OCR, VLM, multimodal, AI, PDF, markdown]
classes: wide  

author_profile: true  
---


如果你经常需要处理大量文档，或者正在为AI模型的长文本处理能力发愁，那么这篇文章你一定要看完。DeepSeek最近发布的OCR模型，可能会彻底改变我们处理文档的方式。

## 一、为什么我们需要这个模型？

说起OCR（光学字符识别），大家应该都不陌生。从扫描纸质文档到识别图片中的文字，OCR技术已经深入到我们工作生活的方方面面。但是，传统的OCR技术有个老大难问题——**处理长文档时效率低下，成本高昂**。

想象一下这个场景：你需要让AI分析一份100页的研究报告，传统方法需要将每个字符都转换成数字信号（token），一份长文档可能需要成千上万个token。这不仅会导致处理速度变慢，还会让显存占用暴增，成本也随之水涨船高。

DeepSeek团队显然注意到了这个痛点。他们提出了一个脑洞大开的思路：**既然文字本身就在图片里，为什么不直接让AI"看"图片，而非逐字识别呢？**

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1SPWozJEos/)
- [👉👉👉 通过YouTube观看](https://youtu.be/9oICqbApvTg)
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



## 二、DeepSeek-OCR的"黑科技"在哪里？

### 1. 光学上下文压缩：AI界的"压缩包"

DeepSeek-OCR最核心的创新叫做"光学上下文压缩"（Optical Context Compression）。简单来说，就是把文档当成一张图片，用视觉的方式来压缩和理解其中的文字信息。

这种方法的巧妙之处在于：一张包含大量文字的图片，用视觉token表示时，比用文本token要高效得多。根据DeepSeek的实验数据，**在10倍压缩率的情况下，模型仍能保持97%的识别精度**！即便将压缩率提升到20倍，精度依然能维持在60%左右。

这是什么概念？传统OCR可能需要用几千个token才能处理完的文档，DeepSeek-OCR只需要几百个甚至几十个token就能搞定。

### 2. 双核架构：DeepEncoder + DeepSeek-3B-MoE

DeepSeek-OCR采用了精心设计的双组件架构：

**DeepEncoder（视觉编码器）**

这是整个系统的"眼睛"，参数量约为380M。它的设计非常巧妙，融合了两种不同的视觉处理能力：

- **SAM（Segment Anything Model）**：负责局部感知，像显微镜一样扫描图像的细节部分
- **CLIP**：负责全局理解，像鸟瞰图一样把握整体布局和上下文

两者之间还插入了一个16倍的卷积压缩器。一张1024×1024的图片最初会被分成4096个小块，经过SAM处理后，压缩器将其缩减为仅256个token，然后再送入CLIP进行全局分析。这种设计既保证了细节识别的准确性，又大幅降低了计算成本。

**DeepSeek-3B-MoE（解码器）**

这是一个30亿参数的混合专家模型（Mixture of Experts），但每次处理时只激活约5.7亿个参数。它负责把压缩后的视觉信息解码成我们能理解的文字。

### 3. 灵活的分辨率模式

DeepSeek-OCR提供了五种不同的处理模式，满足不同场景的需求：

- **Tiny模式**：512×512分辨率，仅需64个视觉token
- **Small模式**：640×640分辨率，需要100个视觉token
- **Base模式**：1024×1024分辨率，需要256个视觉token
- **Large模式**：1280×1280分辨率，需要400个视觉token
- **Gundam模式**：动态分辨率，结合多个局部视图和一个全局视图

你可以根据文档的复杂程度和对精度的要求，选择合适的模式。比如处理简单的收据，Tiny模式就足够了；而面对复杂的技术论文，可能需要用到Gundam模式。

## 三、性能到底有多强？

数据最有说服力。在实际测试中，DeepSeek-OCR的表现相当亮眼：

**1. 效率惊人**

在Fox基准测试中，当文本token数量在视觉token的10倍以内时，DeepSeek-OCR能达到97%的解码精度。而在实际应用中，**一块NVIDIA A100 GPU每天可以处理超过20万页文档**！

**2. 以少胜多**

在OmniDocBench基准测试中，DeepSeek-OCR仅用100个视觉token就达到了与GOT-OCR2.0（使用256个token）相当的性能。与需要近7000个token的MinerU 2.0相比，DeepSeek-OCR只需不到800个token就能超越其表现。

**3. 支持超过100种语言**

无论是英文、中文，还是小语种，DeepSeek-OCR都能轻松应对。这对于需要处理多语言文档的场景来说，简直是福音。

## 四、可以用来做什么？

DeepSeek-OCR的应用场景非常广泛：

### 文档数字化

将纸质文档、PDF扫描件快速转换为可编辑的电子文本，而且能保留原有的排版格式。对于需要批量处理历史档案、合同文件的企业来说，这能大幅提升工作效率。

### 智能对话系统的记忆优化

DeepSeek团队提出了一个很有意思的应用思路：用这个模型来压缩聊天机器人的对话历史。就像人的记忆会随着时间淡化一样，较早的对话可以用较低的分辨率存储，让AI能够在有限的算力下处理更长的上下文。

### 数据集构建

现代AI模型的训练需要海量的文本数据。DeepSeek-OCR可以从各种文档中快速提取文本，帮助研究人员高效构建训练数据集。

### 复杂文档解析

不仅仅是识别文字，DeepSeek-OCR还能理解和解析图表、化学分子式、几何图形等复杂内容。它可以将金融图表转换成结构化数据，自动生成Markdown表格和图形描述。

## 五、如何上手使用？

DeepSeek一如既往地选择了开源策略，任何人都可以免费使用这个模型。

### 环境要求

- Python 3.12.9
- CUDA 11.8
- PyTorch 2.6.0
- Transformers 4.46.3

### 快速开始

模型已经托管在Hugging Face平台上，你可以用几行代码就开始使用：

```python
from transformers import AutoModel, AutoTokenizer
import torch

model_name = 'deepseek-ai/DeepSeek-OCR'
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModel.from_pretrained(model_name, trust_remote_code=True)
model = model.eval().cuda().to(torch.bfloat16)

# 对于文档，使用这个提示词
prompt = "<image>\n<|grounding|>Convert the document to markdown."
# 对于一般图片
# prompt = "<image>\n<|grounding|>OCR this image."

res = model.infer(tokenizer, prompt=prompt, image_file='your_image.jpg')

```

### 多种提示词支持

DeepSeek-OCR支持多种场景的提示词：

- 文档转Markdown：`<image>\n<|grounding|>Convert the document to markdown.`
- 通用OCR：`<image>\n<|grounding|>OCR this image.`
- 无布局提取：`<image>\nFree OCR.`
- 图表解析：`<image>\nParse the figure.`
- 图像描述：`<image>\nDescribe this image in detail.`
- 文本定位：`<image>\nLocate <|ref|>特定文字<|/ref|> in the image.`

## 六、背后的故事

DeepSeek-OCR的发布其实也反映了当前AI行业的一些趋势。

今年，DeepSeek的旗舰模型R2因为硬件挑战（主要与中美科技竞争有关）而被无限期推迟。但这并没有阻止DeepSeek继续创新的步伐。发布DeepSeek-OCR，某种程度上也是一种战略调整——通过专注于高效、实用的开源工具，继续保持技术领先和社区影响力。

值得一提的是，DeepSeek一贯秉持的理念就是**提高AI效率，降低使用成本**。从去年底发布的V3模型，到今年2月的R1模型，再到现在的OCR模型，这条主线一直没有改变。在全球AI竞赛愈演愈烈的背景下，这种务实的路线显得尤为可贵。

## 七、未来展望

DeepSeek-OCR的出现，为AI处理长文本提供了一条全新的思路。通过"视觉压缩"这种巧妙的方法，它在保持高精度的同时大幅降低了计算成本。

但这只是开始。随着模型的进一步优化和应用场景的拓展，我们有理由相信，未来AI处理文档会变得更加高效、智能。或许有一天，处理几百页的合同文件就像翻阅几页PPT一样轻松。

对于开发者和研究者来说，现在就是上手体验的最好时机。模型已经在GitHub和Hugging Face上开源，配套的技术文档也很完善。无论你是想用它来优化自己的产品，还是想深入研究其技术细节，都能找到合适的切入点。

AI技术的发展日新月异，但真正能落地、能解决实际问题的工具才是最有价值的。DeepSeek-OCR显然属于后者。如果你的工作涉及大量文档处理，不妨试试这个新工具，说不定会给你带来意外的惊喜。

---

**相关链接：**

- GitHub仓库：https://github.com/deepseek-ai/DeepSeek-OCR
- Hugging Face模型：https://huggingface.co/deepseek-ai/DeepSeek-OCR
- 技术论文：可在GitHub仓库中找到

**关注我们，获取更多AI前沿资讯！**

### 🔥完整安装命令如下

```markdown
# 克隆仓库
git clone https://github.com/deepseek-ai/DeepSeek-OCR.git

cd DeepSeek-OCR

# 创建虚拟环境
conda create -n deepseek-ocr python=3.12 -y

conda activate deepseek-ocr

pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cu118

pip install -r requirements.txt

pip install gradio

nvcc --version
which nvcc
find /usr -name nvcc 2>/dev/null
export CUDA_HOME=/usr/local/cuda-12.3
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
nvcc --version
pip install flash-attn==2.7.3 --no-build-isolation

# 新建gradio_demo.py文件并放入下面的Demo代码
nano gradio_demo.py

# 运行脚本
python gradio_demo.py

```

### 🔥Demo代码

```python
# 确保安装了gradio，用pip install gradio

import gradio as gr
from transformers import AutoModel, AutoTokenizer
import torch
import os
from PIL import Image
import tempfile
import shutil

# Global variables for model and tokenizer
model = None
tokenizer = None

def load_model():
    """Load the DeepSeek-OCR model and tokenizer"""
    global model, tokenizer
    
    if model is None:
        print("Loading DeepSeek-OCR model...")
        model_name = 'deepseek-ai/DeepSeek-OCR'
        
        tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
        model = AutoModel.from_pretrained(
            model_name, 
            _attn_implementation='flash_attention_2',
            trust_remote_code=True, 
            use_safetensors=True
        )
        model = model.eval().cuda().to(torch.bfloat16)
        print("Model loaded successfully!")
    
    return model, tokenizer

def process_image(image, prompt_type, custom_prompt, model_size):
    """Process image with OCR"""
    try:
        # Load model if not already loaded
        model, tokenizer = load_model()
        
        # Create temporary directory for output
        temp_dir = tempfile.mkdtemp()
        
        # Save uploaded image temporarily
        temp_image_path = os.path.join(temp_dir, "input_image.jpg")
        if isinstance(image, str):
            shutil.copy(image, temp_image_path)
        else:
            image.save(temp_image_path)
        
        # Set prompt based on selection
        if prompt_type == "Free OCR":
            prompt = "<image>\nFree OCR. "
        elif prompt_type == "Markdown Conversion":
            prompt = "<image>\n<|grounding|>Convert the document to markdown. "
        elif prompt_type == "Custom":
            prompt = f"<image>\n{custom_prompt}"
        else:
            prompt = "<image>\nFree OCR. "
        
        # Set model size parameters
        size_configs = {
            "Tiny": {"base_size": 512, "image_size": 512, "crop_mode": False},
            "Small": {"base_size": 640, "image_size": 640, "crop_mode": False},
            "Base": {"base_size": 1024, "image_size": 1024, "crop_mode": False},
            "Large": {"base_size": 1280, "image_size": 1280, "crop_mode": False},
            "Gundam (Recommended)": {"base_size": 1024, "image_size": 640, "crop_mode": True}
        }
        
        config = size_configs[model_size]
        
        # Capture stdout to get the OCR results
        import sys
        from io import StringIO
        
        # Redirect stdout to capture print statements
        old_stdout = sys.stdout
        sys.stdout = captured_output = StringIO()
        
        try:
            # Run inference
            result = model.infer(
                tokenizer,
                prompt=prompt,
                image_file=temp_image_path,
                output_path=temp_dir,
                base_size=config["base_size"],
                image_size=config["image_size"],
                crop_mode=config["crop_mode"],
                save_results=True,
                test_compress=False
            )
        finally:
            # Restore stdout
            sys.stdout = old_stdout
        
        # Get captured output
        captured_text = captured_output.getvalue()
        
        # Try to read from saved text file if it exists
        ocr_text = ""
        for filename in os.listdir(temp_dir):
            if filename.endswith('.txt'):
                with open(os.path.join(temp_dir, filename), 'r', encoding='utf-8') as f:
                    ocr_text += f.read() + "\n"
        
        # If we found text in files, use that; otherwise use captured output
        if ocr_text.strip():
            final_result = ocr_text.strip()
        elif captured_text.strip():
            # Parse the captured output to extract actual OCR text
            # Remove detection boxes and reference tags
            lines = captured_text.split('\n')
            clean_lines = []
            for line in lines:
                # Skip lines with detection boxes and reference tags
                if '<|ref|>' in line or '<|det|>' in line or '<|/ref|>' in line or '<|/det|>' in line:
                    # Extract text between tags
                    import re
                    # Pattern to match text between </ref|> and <|det|>
                    text_match = re.search(r'<\|/ref\|>(.*?)<\|det\|>', line)
                    if text_match:
                        clean_lines.append(text_match.group(1).strip())
                elif line.startswith('=====') or 'BASE:' in line or 'PATCHES:' in line or line.startswith('image:') or line.startswith('other:'):
                    continue
                elif line.strip():
                    clean_lines.append(line.strip())
            
            final_result = '\n'.join(clean_lines)
        elif isinstance(result, str):
            final_result = result
        else:
            final_result = str(result) if result else "No text detected in image."
        
        # Clean up temporary directory
        shutil.rmtree(temp_dir)
        
        return final_result if final_result.strip() else "No text detected in image."
    
    except Exception as e:
        import traceback
        return f"Error: {str(e)}\n\nTraceback:\n{traceback.format_exc()}\n\nPlease make sure you have a CUDA-enabled GPU and all dependencies installed."

def create_demo():
    """Create Gradio interface"""
    
    with gr.Blocks(title="DeepSeek-OCR Demo", theme=gr.themes.Soft()) as demo:
        gr.Markdown(
            """
            # 🔍 DeepSeek-OCR Demo
            
            Upload an image containing text, documents, charts, or tables to extract text using DeepSeek-OCR.
            
            **Features:**
            - Free OCR for general text extraction
            - Markdown conversion for document structure
            - Multiple model sizes for different accuracy/speed tradeoffs
            - Support for various document types
            """
        )
        
        with gr.Row():
            with gr.Column(scale=1):
                # Input section
                gr.Markdown("### 📤 Input")
                image_input = gr.Image(
                    label="Upload Image",
                    type="pil",
                    sources=["upload", "clipboard"]
                )
                
                gr.Markdown("### ⚙️ Settings")
                
                prompt_type = gr.Radio(
                    choices=["Free OCR", "Markdown Conversion", "Custom"],
                    value="Markdown Conversion",
                    label="Prompt Type",
                    info="Choose the type of OCR processing"
                )
                
                custom_prompt = gr.Textbox(
                    label="Custom Prompt (if selected)",
                    placeholder="Enter your custom prompt here...",
                    lines=2,
                    visible=False
                )
                
                model_size = gr.Radio(
                    choices=[
                        "Tiny",
                        "Small", 
                        "Base",
                        "Large",
                        "Gundam (Recommended)"
                    ],
                    value="Gundam (Recommended)",
                    label="Model Size",
                    info="Larger models are more accurate but slower"
                )
                
                process_btn = gr.Button("🚀 Process Image", variant="primary", size="lg")
                
                gr.Markdown(
                    """
                    ### 💡 Tips
                    - **Gundam** mode works best for most documents
                    - Use **Markdown Conversion** for structured documents
                    - **Free OCR** for simple text extraction
                    - Higher resolution images give better results
                    """
                )
            
            with gr.Column(scale=1):
                # Output section
                gr.Markdown("### 📄 Results")
                output_text = gr.Textbox(
                    label="Extracted Text",
                    lines=20,
                    max_lines=30,
                    show_copy_button=True
                )
                
                gr.Markdown(
                    """
                    ### 📥 Export
                    You can copy the results using the copy button above.
                    """
                )
        
        # Show/hide custom prompt based on selection
        def update_prompt_visibility(choice):
            return gr.update(visible=(choice == "Custom"))
        
        prompt_type.change(
            fn=update_prompt_visibility,
            inputs=[prompt_type],
            outputs=[custom_prompt]
        )
        
        # Process button click
        process_btn.click(
            fn=process_image,
            inputs=[image_input, prompt_type, custom_prompt, model_size],
            outputs=[output_text]
        )
        
        # Add examples
        gr.Markdown("### 📚 Example Images")
        gr.Examples(
            examples=[
                ["example_document.jpg", "Markdown Conversion", "", "Gundam (Recommended)"],
                ["example_receipt.jpg", "Free OCR", "", "Small"],
            ],
            inputs=[image_input, prompt_type, custom_prompt, model_size],
            outputs=[output_text],
            fn=process_image,
            cache_examples=False,
        )
        
        gr.Markdown(
            """
            ---
            ### ℹ️ About
            
            This demo uses [DeepSeek-OCR](https://huggingface.co/deepseek-ai/DeepSeek-OCR) for optical character recognition.
            
            **Model Sizes Explained:**
            - **Tiny**: Fastest, lowest accuracy (512x512)
            - **Small**: Fast, good for simple documents (640x640)
            - **Base**: Balanced performance (1024x1024)
            - **Large**: High accuracy, slower (1280x1280)
            - **Gundam**: Best balance with crop mode (1024x640 with cropping)
            
            **Note:** First run will download the model (~several GB). Requires CUDA-enabled GPU.
            """
        )
    
    return demo

if __name__ == "__main__":
    # Set CUDA device
    os.environ["CUDA_VISIBLE_DEVICES"] = '0'
    
    # Create and launch demo
    demo = create_demo()
    demo.launch(
        server_name="0.0.0.0",  # Allow external access
        server_port=7860,
        share=False,  # Set to True to create a public link
        debug=True
    )
```