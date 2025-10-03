---
layout: single
title: "阿里巴巴重磅发布Qwen2-VL：超越人类的视觉理解能力，从医学影像到手写识别，这款开源多模态大模型究竟有多强？深度解析与实测"
sidebar:
  nav: "docs"
date: 2024-08-31 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, HuggingFace, PyTorch, Qwen, Vision]
classes: wide
author_profile: true
---


#  阿里巴巴重磅发布Qwen2-VL：超越人类的视觉理解能力，从医学影像到手写识别，这款开源多模态大模型究竟有多强？深度解析与实测 

###  Qwen2-VL-72B 

[ https://huggingface.co/spaces/Qwen/Qwen2-VL ](<https://huggingface.co/spaces/Qwen/Qwen2-VL>)

[ https://colab.research.google.com/drive/1y7g9-StAWSf_fbSybQgBFjH-fMuRR5PN#scrollTo=o5SXsfB1VENw ](<https://colab.research.google.com/drive/1y7g9-StAWSf_fbSybQgBFjH-fMuRR5PN#scrollTo=o5SXsfB1VENw>)

###  模型简介 

> Qwen2-VL 有多种实际用途，涵盖了多个领域的应用场景，特别是在多模态数据处理方面。以下是该模型的一些主要应用场景： 
> 
>   1. **实时视频分析与互动** ：Qwen2-VL 可用于实时视频分析，在视频通话或直播中回答用户提出的问题。这种能力可以应用于 **客服** 场景，用户可以通过视频展示产品或条形码，模型能够识别并提供相关信息。 
> 

>   2. **图像和视频理解任务** ：Qwen2-VL 能够处理复杂的图像和视频输入，支持如 **视觉内容分析、图像识别、视频摘要** 等任务。它在电子商务、监控、医疗影像分析等领域有着广泛的潜在应用。 
> 

>   3. **多语言多模态交互** ：该模型支持文本与视觉信息的结合，能实现多语言的文本生成和翻译，还可以处理包括图像和视频在内的复杂内容。这种特性使其在 **跨国客服、语言翻译、智能助理** 等场景中具有广泛应用。 
> 

>   4. **工具调用与外部数据集成** ：Qwen2-VL 支持调用外部工具和访问外部数据，如 **航班状态查询、天气预报、物流跟踪** 等，使其在物流和现场操作中具有很强的实用性。 
> 

>   5. **视觉内容生成和推理** ：该模型可以根据输入的图像或视频内容生成相应的文本描述或推理结果，适用于 **广告设计、创意生成、视频摘要** 等领域。 
> 


###  本地配置 
    
    
    conda create -n qwen2_vl python=3.11
    conda activate qwen2_vl
    
```
    conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
    pip install pillow requests
    pip install git+https://github.com/huggingface/transformers
```
    
    
    pip install 'accelerate>=0.26.0'
    
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  code 
    
    
    from transformers import Qwen2VLForConditionalGeneration, AutoTokenizer, AutoProcessor
    from qwen_vl_utils import process_vision_info
    
```
    # default: Load the model on the available device(s)
    model = Qwen2VLForConditionalGeneration.from_pretrained(
        "Qwen/Qwen2-VL-7B-Instruct", torch_dtype="auto", device_map="auto"
    )
```
    
```
    # We recommend enabling flash_attention_2 for better acceleration and memory saving, especially in multi-image and video scenarios.
    # model = Qwen2VLForConditionalGeneration.from_pretrained(
    #     "Qwen/Qwen2-VL-7B-Instruct",
    #     torch_dtype=torch.bfloat16,
    #     attn_implementation="flash_attention_2",
    #     device_map="auto",
    # )
```
    
    # default processer
    processor = AutoProcessor.from_pretrained("Qwen/Qwen2-VL-7B-Instruct")
    
```
    # The default range for the number of visual tokens per image in the model is 4-16384. You can set min_pixels and max_pixels according to your needs, such as a token count range of 256-1280, to balance speed and memory usage.
    # min_pixels = 256*28*28
    # max_pixels = 1280*28*28
    # processor = AutoProcessor.from_pretrained("Qwen/Qwen2-VL-7B-Instruct", min_pixels=min_pixels, max_pixels=max_pixels)
```
    
```
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "image": "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-VL/assets/demo.jpeg",
                },
                {"type": "text", "text": "Describe this image."},
            ],
        }
    ]
```
    
```
    # Preparation for inference
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
    inputs = inputs.to("cuda")
```
    
```
    # Inference: Generation of the output
    generated_ids = model.generate(**inputs, max_new_tokens=128)
    generated_ids_trimmed = [
        out_ids[len(in_ids) :] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
    ]
    output_text = processor.batch_decode(
        generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
    )
    print(output_text)
```
    

> 这段代码的主要功能是使用Qwen2VL模型（一个视觉-语言模型）来描述给定的图像。它首先加载预训练的模型和处理器，然后下载一个图像，构建一个包含图像和文本提示的对话结构。接着，它预处理输入数据，使用模型生成描述，最后解码并打印生成的文本描述。 
> 
> 这个过程展示了如何使用现代的多模态AI模型来执行图像描述任务，结合了计算机视觉和自然语言处理技术。 
    
    
```
    # 导入所需的库
    from PIL import Image  # 用于图像处理
    import requests  # 用于发送HTTP请求
    import torch  # PyTorch深度学习库
    from torchvision import io  # PyTorch的计算机视觉工具包
    from typing import Dict  # 用于类型注解
    from transformers import Qwen2VLForConditionalGeneration, AutoTokenizer, AutoProcessor  # Hugging Face的transformers库，用于加载和使用预训练模型
```
    
```
    # 加载模型，使用半精度浮点数，自动选择可用设备
    model = Qwen2VLForConditionalGeneration.from_pretrained(
        "Qwen/Qwen2-VL-7B-Instruct", torch_dtype="auto", device_map="auto"
    )
    # 加载处理器，用于预处理输入数据
    processor = AutoProcessor.from_pretrained("Qwen/Qwen2-VL-7B-Instruct")
```
    
```
    # 设置图像URL并下载图像
    url = "https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-VL/assets/demo.jpeg"
    image = Image.open(requests.get(url, stream=True).raw)
```
    
```
    # 构建对话结构，包含用户角色、图像和文本提示
    conversation = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                },
                {"type": "text", "text": "描述这张图."},
            ],
        }
    ]
```
    
    # 使用处理器应用聊天模板，生成文本提示
    text_prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)
    
```
    # 预处理输入数据，将文本和图像转换为模型可接受的格式
    inputs = processor(
        text=[text_prompt], images=[image], padding=True, return_tensors="pt"
    )
    inputs = inputs.to("cuda")  # 将输入数据移至GPU（如果可用）
```
    
    # 使用模型生成输出
    output_ids = model.generate(**inputs, max_new_tokens=128)
    
```
    # 提取生成的新token（去除输入部分）
    generated_ids = [
        output_ids[len(input_ids) :]
        for input_ids, output_ids in zip(inputs.input_ids, output_ids)
    ]
```
    
```
    # 解码生成的token为可读文本
    output_text = processor.batch_decode(
        generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True
    )
```
    
    # 打印生成的文本
    print(output_text)
