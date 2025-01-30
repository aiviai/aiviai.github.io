---
layout: single
title: "🚀重磅首发！本地部署+真实测评阿里开源视觉大模型Qwen2.5-VL-7B-Instruct和Qwen2.5-VL-72B！轻松识别提取发票！全方位测评见证AI视觉理解能力的质的飞跃，图像识别不再是难题"
sidebar:
  nav: "docs"
date: 2025-01-30 00:00:00 +0800
categories: LLMs
tags: [Qwen2.5-VL, Qwen2.5-VL-7B-Instruct, Qwen2.5, 阿里巴巴, Qwen2.5-VL-7B, Qwen2.5-VL-72B, LLMs]
classes: wide
author_profile: true
---

2025年1月，阿里巴巴通义千问团队发布了全新的视觉语言模型——Qwen2.5-VL-7B-Instruct，作为Qwen2.5-VL系列的一员，标志着视觉语言理解领域的一次重要突破。这一中型参数模型，凭借其卓越的性能和多样化的功能，迅速吸引了业界的广泛关注。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1BZF5e8E6z/)
- [👉👉👉 通过YouTube观看](https://youtu.be/hhFZW7r-ySU)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


## 🚀简介

### 强大的视觉理解能力

Qwen2.5-VL-7B-Instruct不仅能够识别花、鸟、鱼等常见物体，还具有极强的文本、图表、图标及图形的理解能力。通过深度学习技术，该模型能够全面解析图像内容，将视觉信息转化为可以理解和操作的结构化数据。这使得Qwen2.5-VL-7B-Instruct能够适应更加复杂的视觉任务，成为诸如图像标注、物体识别等应用场景中的理想选择。

### 视觉代理与智能推理

Qwen2.5-VL-7B-Instruct的另一大亮点在于其作为视觉代理的能力。通过智能推理，模型能够动态地使用各种工具进行任务处理，初步具备了模拟人类操作设备的能力。无论是操作电脑还是手机，Qwen2.5-VL-7B-Instruct均能展现出强大的适应性和灵活性，进一步提升了模型的实用性和互动性。

### 长视频理解与事件捕捉

与许多同类模型相比，Qwen2.5-VL-7B-Instruct在处理长时间视频方面展现了其独特优势。该模型不仅可以理解超过一小时的长视频，还能够精准定位视频中的关键片段，帮助用户快速捕捉重要事件。这一功能的实现，使得Qwen2.5-VL-7B-Instruct在视频分析、新闻监控等领域展现出巨大的潜力。

### 精确的视觉定位与结构化输出

Qwen2.5-VL-7B-Instruct在视觉定位方面也有不小的突破。模型能够通过生成边界框或坐标点，准确地定位图像中的物体，并为属性提供稳定的JSON输出。这一技术的实现，使得Qwen2.5-VL-7B-Instruct在图像处理、自动标注和数据提取等任务中展现出强大的能力。

此外，Qwen2.5-VL-7B-Instruct在处理结构化数据（如发票、表单、表格等）时，能够自动提取并生成结构化输出，广泛应用于金融、商业等多个领域，极大提升了数据处理的效率和准确性。

### 性能提升与架构优化

与上一代Qwen2-VL相比，Qwen2.5-VL系列在模型架构上进行了重要优化，简化了网络结构并增强了模型对时间和空间尺度的感知能力。这一改进不仅提升了Qwen2.5-VL-7B-Instruct的运行效率，还使其在多个视觉语言任务中超越了同类产品，如GPT-4o-mini。

### 开源与广泛应用

Qwen2.5-VL-7B-Instruct目前已在Hugging Face、ModelScope等平台开源，用户可以根据自身需求进行下载和使用。通过开源，阿里巴巴通义千问团队为更多开发者提供了探索和应用这一模型的机会，进一步推动了视觉语言理解领域的发展。

### 🚀本地部署命令(通过history命令显示我所输入的命令)：

```bash
(qwen_vl) Ubuntu@0017-dsm-prxmx30138:~$ history 20
    8  conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
    9  pip install git+https://github.com/huggingface/transformers accelerate
   10  pip install beautifulsoup4 tinycss2
   11  pip install six
   12  pip install "qwen-vl-utils[decord]==0.0.8"
   13  pip install git+https://github.com/huggingface/transformers accelerate
   14  clear
   15  pip install "qwen-vl-utils[decord]==0.0.8"
   16  clear
   17  nano app.py
   18  python app.py
   19  clear
   20  python app.py
   21  pip install gradio
   22  clear
   23  python app.py
   24  clear
   25  history 20  # 显示最近20条命令
```

### 🚀视频中所用到的代码：

```bash
import gradio as gr
from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
from qwen_vl_utils import process_vision_info
import torch

# 加载模型和处理器
model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
    "Qwen/Qwen2.5-VL-7B-Instruct", 
    torch_dtype="auto", 
    device_map="auto"
)
processor = AutoProcessor.from_pretrained("Qwen/Qwen2.5-VL-7B-Instruct")

def process_image_and_text(image, text_prompt):
    if image is None:
        return "请上传一张图片。"
    
    # 构建消息格式
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "image": image,  # Gradio将自动处理图片路径
                },
                {"type": "text", "text": text_prompt if text_prompt else "Describe this image."},
            ],
        }
    ]
    
    try:
        # 准备推理输入
        text = processor.apply_chat_template(
            messages, tokenize=False, add_generation_prompt=True
        )
        image_inputs, video_inputs = process_vision_info(messages)
        inputs = processor(
            text=[text],
            images=image_inputs,
            videos=video_inputs,
            padding=True,
            return_tensors="pt",
        )
        inputs = inputs.to(model.device)

        # 生成输出
        with torch.no_grad():
            generated_ids = model.generate(**inputs, max_new_tokens=128)
            generated_ids_trimmed = [
                out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
            ]
            output_text = processor.batch_decode(
                generated_ids_trimmed, 
                skip_special_tokens=True, 
                clean_up_tokenization_spaces=False
            )
        
        return output_text[0]
    
    except Exception as e:
        return f"处理过程中出现错误: {str(e)}"

# 创建Gradio界面
with gr.Blocks() as demo:
    gr.Markdown("# Qwen2.5-VL 图像理解演示")
    
    with gr.Row():
        with gr.Column():
            image_input = gr.Image(type="filepath", label="上传图片")
            text_input = gr.Textbox(
                placeholder="请输入提示语（如不输入，默认描述图片）", 
                label="提示语"
            )
            submit_btn = gr.Button("提交")
        
        with gr.Column():
            output = gr.Textbox(label="输出结果")
    
    submit_btn.click(
        fn=process_image_and_text,
        inputs=[image_input, text_input],
        outputs=output
    )

    gr.Examples(
        examples=[
            ["path/to/example1.jpg", "这张图片里有什么？"],
            ["path/to/example2.jpg", "描述图中的场景"],
        ],
        inputs=[image_input, text_input],
    )

# 启动应用
if __name__ == "__main__":
    demo.launch(share=True)
```