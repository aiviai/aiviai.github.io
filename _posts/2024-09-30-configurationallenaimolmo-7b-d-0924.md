---
layout: single
title: "本地配置allenai/Molmo-7B-D-0924"
sidebar:
  nav: "docs"
date: 2024-09-30 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, Chainlit, PyTorch, Vision]
classes: wide
author_profile: true
---


#  本地配置allenai/Molmo-7B-D-0924 

###  本地配置 
    
    
```
    conda create --name molmo_env \
        python=3.11 \
        pytorch torchvision pytorch-cuda=12.1 \
        cudatoolkit xformers -c pytorch -c nvidia -c xformers \
        -y
```
    
    conda activate molmo_env
    
    
    pip install transformers Pillow requests einops
    
    pip install 'accelerate>=0.26.0' bitsandbytes
    
    
    pip install --no-deps accelerate bitsandbytes
    
    
    pip install jupyter
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  Code 
    
    
```
    from transformers import AutoModelForCausalLM, AutoProcessor, GenerationConfig
    from PIL import Image
    import requests
```
    
```
    # load the processor
    processor = AutoProcessor.from_pretrained(
        'allenai/Molmo-7B-D-0924',
        trust_remote_code=True,
        torch_dtype='auto',
        device_map='auto'
    )
```
    
```
    # load the model
    model = AutoModelForCausalLM.from_pretrained(
        'allenai/Molmo-7B-D-0924',
        trust_remote_code=True,
        torch_dtype='auto',
        device_map='auto'
    )
```
    
```
    # process the image and text
    inputs = processor.process(
        images=[Image.open(requests.get("https://picsum.photos/id/237/536/354", stream=True).raw)],
        text="Describe this image."
    )
```
    
    # move inputs to the correct device and make a batch of size 1
    inputs = {k: v.to(model.device).unsqueeze(0) for k, v in inputs.items()}
    
```
    # generate output; maximum 200 new tokens; stop generation when <|endoftext|> is generated
    output = model.generate_from_batch(
        inputs,
        GenerationConfig(max_new_tokens=200, stop_strings="<|endoftext|>"),
        tokenizer=processor.tokenizer
    )
```
    
```
    # only get generated tokens; decode them to text
    generated_tokens = output[0,inputs['input_ids'].size(1):]
    generated_text = processor.tokenizer.decode(generated_tokens, skip_special_tokens=True)
```
    
    # print the generated text
    print(generated_text)
    
    # >>>  This image features an adorable black Labrador puppy, captured from a top-down
    #      perspective. The puppy is sitting on a wooden deck, which is composed ...
    

###  chainlit 
    
    
    pip install chainlit
    
    chainlit run ui.py --host 0.0.0.0
    
    
```
    import chainlit as cl
    from transformers import AutoModelForCausalLM, AutoProcessor, GenerationConfig
    from PIL import Image
    import torch
```
    
```
    # Load the processor
    processor = AutoProcessor.from_pretrained(
        'allenai/Molmo-7B-D-0924',
        trust_remote_code=True,
        torch_dtype='auto',
        device_map='auto'
    )
```
    
```
    # Load the model
    model = AutoModelForCausalLM.from_pretrained(
        'allenai/Molmo-7B-D-0924',
        trust_remote_code=True,
        torch_dtype='auto',
        device_map='auto'
    )
```
    
```
    @cl.on_chat_start
    async def start():
        await cl.Message("欢迎使用图像分析应用!请上传一张图片，然后输入您的问题或描述要求。").send()
```
    
```
    @cl.on_message
    async def main(message: cl.Message):
        if not message.elements:
            await cl.Message("请先上传一张图片，然后再输入您的问题。").send()
            return
```
    
```
        image = message.elements[0]
        if not image.mime.startswith("image"):
            await cl.Message("请上传一个有效的图片文件。").send()
            return
```
    
```
        user_prompt = message.content
        if not user_prompt:
            user_prompt = "Describe this image."
```
    
        await process_image(image.path, user_prompt)
    
```
    async def process_image(image_path, user_prompt):
        # Process the image
        inputs = processor.process(
            images=[Image.open(image_path)],
            text=user_prompt
        )
```
        
        # Move inputs to the correct device and make a batch of size 1
        inputs = {k: v.to(model.device).unsqueeze(0) for k, v in inputs.items()}
        
```
        # Generate output
        output = model.generate_from_batch(
            inputs,
            GenerationConfig(max_new_tokens=200, stop_strings="<|endoftext|>"),
            tokenizer=processor.tokenizer
        )
```
        
```
        # Get generated tokens and decode them to text
        generated_tokens = output[0, inputs['input_ids'].size(1):]
        generated_text = processor.tokenizer.decode(generated_tokens, skip_special_tokens=True)
```
        
        # Send the generated text as a message
        await cl.Message(content=generated_text).send()
    
    if __name__ == "__main__":
        cl.run()
    
    
    Where is the short-haired man wearing a white shirt, blue jeans, and white shoes?
    
    Where is the woman wearing a black and white striped top and carrying a red bag?
    
    
