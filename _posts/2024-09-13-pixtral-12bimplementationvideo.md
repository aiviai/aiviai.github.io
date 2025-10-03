---
layout: single
title: "pixtral 12B轻松实现视频智能分析"
sidebar:
  nav: "docs"
date: 2024-09-13 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, Chainlit, HuggingFace, Mistral]
classes: wide
author_profile: true
---


#  pixtral 12B轻松实现视频智能分析 

> Pixtral 12B是由法国初创公司Mistral AI最新推出的多模态人工智能模型。这个模型意义重大，因为它代表了Mistral首次尝试结合文本和图像处理能力，使其有望与OpenAI和Anthropic等公司的领先人工智能模型展开竞争。 
> 
> ##  Pixtral 12B的主要特点 
> 
> **模型架构和参数**
> 
>   * **基础模型** ：基于之前发布的文本模型Nemo 12B。 
> 

>   * **总参数量** ：跨40层共120亿参数。 
> 

>   * **视觉适配器** ：集成了4亿参数的视觉适配器，增强了处理视觉数据的能力。 
> 

>   * **隐藏维度** ：具有14,336个隐藏维度和32个注意力头，实现了广泛的计算处理。 
> 

>   * **图像分辨率** ：能够处理1024 x 1024像素分辨率的图像，将其分割成16 x 16像素的小块。 
> 

>   * **词元词汇量** ：扩展了词汇量至131,072个词元，包括三个新的专用于图像处理的特殊词元： ` img ` 、 ` img_break ` 和 ` img_end ` 。 
> 

>   * **位置编码** ：采用2D RoPE（旋转位置嵌入）来增强对图像空间关系的理解。 
> 

> 
> **功能**   
>  Pixtral 12B允许用户通过URL或base64编码输入图像，能够执行多种任务，如：   
> 
> 
>   * **图像描述** ：为上传的图像生成描述性文字。 
> 

>   * **物体识别** ：识别并计数图像中的物体。 
> 

>   * **视觉问答** ：根据图像内容回答问题。 
> 

> 
> 该模型的架构支持同时处理文本和图像，使其在内容分析和数据解释方面的应用具有多样性。 
> 
> ##  可访问性和许可 
> 
> Pixtral 12B可通过GitHub和Hugging Face等多个平台下载，也可以通过磁力链接获取。它以Apache 2.0许可证发布，允许用户自由使用、修改和商业化该模型。然而，用于训练模型的具体数据集尚未公开，这引发了对训练数据可能涉及的版权问题的质疑。此外，其完整的许可条款尚未完全明确，预计未来将有更多相关信息发布。 
> 
> ##  未来发展 
> 
> Mistral计划将Pixtral 12B整合到其聊天机器人Le Chat和API平台La Platforme中，使开发者和用户更容易使用。随着人工智能社区开始试验Pixtral 12B，预计将会对其能力和性能有更深入的了解。 
> 
> Pixtral 12B标志着Mistral AI在多模态人工智能领域迈出了重要一步，有望增强生成式人工智能应用的能力。这个模型通过结合先进的文本处理能力和新增的视觉处理功能，为用户提供了一个强大而灵活的多模态AI工具。 

###  环境 

  * Ubuntu 


  * Nvidia RTX A6000*2 


  * vLLM 


##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  安装 
    
    
    pip install --upgrade mistral_common vllm
    
    
    vllm serve mistralai/Pixtral-12B-2409 --tokenizer_mode mistral --limit_mm_per_prompt 'image=4' --max_num_batched_tokens 16384 --gpu-memory-utilization 0.95 --max-model-len 65536
    
    vllm serve mistralai/Pixtral-12B-2409 --tokenizer_mode mistral --limit_mm_per_prompt 'image=4' --max_num_batched_tokens 65536 --gpu-memory-utilization 0.95 --max-model-len 65536
    
    pip install -U "huggingface_hub[cli]"
    
    huggingface-cli login
    
    
    
```
    curl http://64.247.196.11:8000/v1/chat/completions \
      -H "Content-Type: application/json" \
      -d '{
        "model": "mistralai/Pixtral-12B-2409",
        "messages": [{"role": "user", "content": "Hello, how are you?"}]
      }'
```
    
    
    
    
```
    curl --location 'http://64.247.196.11:8000/v1/chat/completions' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer token' \
    --data '{
        "model": "mistralai/Pixtral-12B-2409",
        "messages": [
          {
            "role": "user",
            "content": [
                {"type" : "text", "text": "Describe this image in detail please in Chinese."},
                {"type": "image_url", "image_url": {"url": "https://s3.amazonaws.com/cms.ipressroom.com/338/files/201808/5b894ee1a138352221103195_A680%7Ejogging-edit/A680%7Ejogging-edit_hero.jpg"}},
                {"type" : "text", "text": "and this one as well. Answer in Chinese."},
                {"type": "image_url", "image_url": {"url": "https://www.wolframcloud.com/obj/resourcesystem/images/a0e/a0ee3983-46c6-4c92-b85d-059044639928/6af8cfb971db031b.png"}}
            ]
          }
        ]
      }'
```
    
    
    
    from openai import OpenAI
    
```
    # 正确初始化 OpenAI 客户端
    client = OpenAI(
        base_url="http://64.247.196.11:8000/v1",
        api_key="test"
    )
```
    
```
    response = client.chat.completions.create(
      model="mistralai/Pixtral-12B-2409",
      messages=[
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "What's in this image?"},
            {
              "type": "image_url",
              "image_url": {
                "url": "https://s3.amazonaws.com/cms.ipressroom.com/338/files/201808/5b894ee1a138352221103195_A680%7Ejogging-edit/A680%7Ejogging-edit_hero.jpg",
              },
            },
          ],
        }
      ],
      max_tokens=1024,
    )
```
    
    print(response.choices[0])
    
    
    
    
    import base64
    from openai import OpenAI
    
```
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
```
    
```
    # 初始化 OpenAI 客户端
    client = OpenAI(
        base_url="http://64.247.196.11:8000/v1",
        api_key="test"
    )
```
    
    # 本地图片路径
    image_path = "./dog.jpg"
    
    # 编码图片
    base64_image = encode_image(image_path)
    
```
    response = client.chat.completions.create(
      model="mistralai/Pixtral-12B-2409",
      messages=[
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "What's in this image?"},
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}",
              },
            },
          ],
        }
      ],
      max_tokens=1024,
    )
```
    
    print(response.choices[0])
    
    
    
    
    

###  stream 
    
    
    from openai import OpenAI
    import sys
    
```
    # 初始化 OpenAI 客户端
    client = OpenAI(
        base_url="http://64.247.196.11:8000/v1",
        api_key="test"
    )
```
    
```
    # 创建流式 completion 请求
    stream = client.chat.completions.create(
        model="mistralai/Pixtral-12B-2409",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What's in this image?"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://s3.amazonaws.com/cms.ipressroom.com/338/files/201808/5b894ee1a138352221103195_A680%7Ejogging-edit/A680%7Ejogging-edit_hero.jpg",
                        },
                    },
                ],
            }
        ],
        max_tokens=1024,
        stream=True  # 启用流式输出
    )
```
    
```
    # 处理流式响应
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end='', flush=True)
```
    
    print()  # 最后打印一个换行
    
    
```
    import base64
    import sys
    from openai import OpenAI
```
    
    
```
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
```
    
    
```
    # 初始化 OpenAI 客户端
    client = OpenAI(
        base_url="http://64.247.196.11:8000/v1",
        api_key="test"
    )
```
    
    # 本地图片路径
    image_path = "./dog.jpg"
    
    # 编码图片
    base64_image = encode_image(image_path)
    
```
    # 创建流式 completion 请求
    stream = client.chat.completions.create(
        model="mistralai/Pixtral-12B-2409",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What's in this image?"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        max_tokens=1024,
        stream=True  # 启用流式输出
    )
```
    
```
    # 处理流式响应
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end='', flush=True)
```
    
    print()  # 最后打印一个换行

###  UI Chatbot 
    
    
    #pip install streamlit
    #streamlit run bot.py
    
    
```
    import streamlit as st
    import base64
    from openai import OpenAI
    from io import BytesIO
```
    
    
    def encode_image(image_file):
        return base64.b64encode(image_file.getvalue()).decode('utf-8')
    
    
```
    def get_chat_response(client, messages):
        stream = client.chat.completions.create(
            model="mistralai/Pixtral-12B-2409",
            messages=messages,
            max_tokens=1024,
            stream=True
        )
        return stream
```
    
    
    st.title("多模态Chatbot")
    
```
    # 初始化OpenAI客户端
    client = OpenAI(
        base_url="http://64.247.196.11:8000/v1",
        api_key="test"
    )
```
    
```
    # 初始化会话状态
    if "messages" not in st.session_state:
        st.session_state.messages = []
```
    
```
    # 显示聊天历史
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
```
    
    # 图片上传
    uploaded_file = st.file_uploader("上传图片", type=["jpg", "jpeg", "png"])
    
    # 用户输入
    user_input = st.chat_input("输入你的问题")
    
```
    if uploaded_file and user_input:
        # 编码图片
        base64_image = encode_image(uploaded_file)
```
    
```
        # 创建新的用户消息
        new_message = {
            "role": "user",
            "content": [
                {"type": "text", "text": user_input},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}",
                    },
                },
            ]
        }
```
    
        st.session_state.messages.append({"role": "user", "content": user_input})
    
```
        with st.chat_message("user"):
            st.markdown(user_input)
            st.image(uploaded_file, caption="上传的图片", use_column_width=True)
```
    
```
        # 获取AI响应
        with st.chat_message("assistant"):
            message_placeholder = st.empty()
            full_response = ""
            for chunk in get_chat_response(client, [new_message]):
                if chunk.choices[0].delta.content is not None:
                    full_response += chunk.choices[0].delta.content
                    message_placeholder.markdown(full_response + "▌")
            message_placeholder.markdown(full_response)
```
    
        st.session_state.messages.append({"role": "assistant", "content": full_response})
    
```
    st.sidebar.title("使用说明")
    st.sidebar.markdown("""
    1. 上传一张图片
    2. 在输入框中输入你的问题
    3. 等待AI分析图片并回答你的问题
    """)
```

###  chainlit 
    
    
```
    import base64
    import chainlit as cl
    from openai import OpenAI
```
    
```
    # 初始化 OpenAI 客户端
    client = OpenAI(
        base_url="http://64.247.196.48:8000/v1",
        api_key="test"
    )
```
    
```
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
```
    
```
    @cl.on_chat_start
    async def start():
        await cl.Message("欢迎使用图像分析应用!请选择一张图片并输入您的问题，然后点击发送。").send()
```
    
```
    @cl.on_message
    async def main(message: cl.Message):
        if not message.elements:
            await cl.Message("请上传一张图片并输入您的问题。").send()
            return
```
    
```
        image = message.elements[0]
        if not image.mime.startswith("image"):
            await cl.Message("请上传一个有效的图片文件。").send()
            return
```
    
```
        question = message.content
        if not question:
            await cl.Message("请输入关于图片的问题。").send()
            return
```
    
        await process_image(image.path, question)
    
    async def process_image(image_path, question):
        base64_image = encode_image(image_path)
    
```
        stream = client.chat.completions.create(
            model="mistralai/Pixtral-12B-2409",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": question},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            max_tokens=1024,
            stream=True
        )
```
    
        msg = cl.Message(content="")
        await msg.send()
    
```
        full_response = ""
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                content = chunk.choices[0].delta.content
                full_response += content
                await msg.stream_token(content)
```
    
        await msg.update()
    
    if __name__ == "__main__":
        cl.run()
