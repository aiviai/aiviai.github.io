---
layout: single
title: "hertz-dev 80ms超低延迟！开源AI语音模型Hertz-Dev详细部署教程"
sidebar:
  nav: "docs"
date: 2024-11-05 00:00:00 +0800
categories: [Fine-Tuning, LLM, Tutorial]
tags: [AI, HuggingFace, PyTorch]
classes: wide
author_profile: true
---


#  hertz-dev 80ms超低延迟！开源AI语音模型Hertz-Dev详细部署教程 

🚀Hertz-Dev是由Standard Intelligence公司推出的一款开源全   
双工音频生成基础模型，具有85亿参数。   
🚀该模型旨在提升实时对话AI的性能，特别是在音频交互方   
面，能够实现低至80毫秒的理论延迟和120毫秒的实际延迟，适   
合在单个NVIDIA RTX 4090显卡上运行。   
🚀Standard Intelligence还计划将Hertz模型扩展到700亿参数，   
以进一步提升其在实时对话AI中的应用能力。   


###  model [ https://huggingface.co/si-community/hertz-dev/tree/main ](<https://huggingface.co/si-community/hertz-dev/tree/main>)

###  github [ https://github.com/Standard-Intelligence/hertz-dev ](<https://github.com/Standard-Intelligence/hertz-dev>)

###  Notebook代码 [ https://github.com/Standard-Intelligence/hertz-dev/blob/main/inference.ipynb ](<https://github.com/Standard-Intelligence/hertz-dev/blob/main/inference.ipynb>)
    
    
```
    sudo apt-get update
    sudo apt-get install portaudio19-dev python3-pyaudio
    pip install --upgrade sounddevice
```
    
    
    
```
    # 创建并激活环境
    conda create -n myenv python=3.10 -y
    conda activate myenv
```
    
```
    # 安装依赖
    conda install pytorch torchaudio -c pytorch -y
    conda install numpy matplotlib ipython jupyter jupyterlab -y
```
    
    conda install websockets -y
    
    pip install einops tqdm soundfile requests sounddevice fastapi uvicorn typing_extensions websocket
    
```
    # 克隆代码
    git clone https://github.com/Standard-Intelligence/hertz-dev.git
    cd hertz-dev
```
    
    pip install -r requirements.txt
    
    # 在启动 JupyterLab 之前设置密码
    jupyter server password
    
    # 然后再启动
    jupyter lab --ip=0.0.0.0 --port=8888 --allow-root --no-browser
    
    nohup jupyter lab --ip=0.0.0.0 --port=8888 --allow-root --no-browser > jupyter.log 2>&1 &
    
    
    python inference_server.py
    
    python inference_client.py

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  客户端配置 
    
    
    conda create -n audio-env python=3.11
    conda activate audio-env
    
    # 安装基础依赖
    conda install numpy websockets requests -y
    
```
    # 安装音频处理相关依赖
    conda install portaudio -y
    pip install sounddevice soundfile websocket-client
```
    
    # 安装其他依赖
    pip install asyncio base64
    
    # 运行
    python client.py --server ws://localhost:8000 --token_temp 0.8 --categorical_temp 0.5 --gaussian_temp 0.1
