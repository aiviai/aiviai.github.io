---
layout: single
title: "本地部署OmniParser微软最强开源屏幕解析模型！最强开源屏幕解析工具，面向纯视觉的GUI代理！实现用户界面截图解析为结构化！结合pyautogui实现自动点击指定元素！#OmniParser"
sidebar:
  nav: "docs"
date: 2024-10-30 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, Vision]
tags: [AI, AI-Agents, GPT, GPT-4, HuggingFace, PyTorch, Vision]
classes: wide
author_profile: true
---

#  本地部署OmniParser微软最强开源屏幕解析模型！最强开源屏幕解析工具，面向纯视觉的GUI代理！实现用户界面截图解析为结构化！结合pyautogui实现自动点击指定元素！#OmniParser 

微软的 **OmniParser** 是一款屏幕解析工具，专为增强用户界面（UI）自动化而设计。它将UI截图转换为结构化数据，使人工智能代理能够通过视觉分析独立理解和操作图形界面。OmniParser主要用于提升大型视觉语言模型（VLM），如GPT-4V的功能，赋予这些模型在操作系统环境中仅凭视觉交互执行任务的能力。 

OmniParser的核心由两个模型组成： **检测模型** 和 **描述模型** 。检测模型识别截图中可点击或可操作的图标区域，而描述模型提供这些元素的功能说明。通过将UI图像转化为可操作的结构化数据，OmniParser帮助VLMs生成更精准的操作指令。测试中，它在ScreenSpot和Windows Agent Arena等基准测试上表现出色，显著提升了VLM的准确性和任务执行能力。 

###  安装命令 
    
    
    conda create -n a_i python=3.12 -y && conda activate a_i
    
    pip install einops timm pillow openai
    
    conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia
    
    pip install -U "huggingface_hub[cli]"
    
    git clone https://github.com/microsoft/OmniParser.git && cd OmniParser
    
    pip install -r requirements.txt
    
    huggingface-cli download --repo-type model microsoft/OmniParser --local-dir weights --include "icon_detect/*" "icon_caption_blip2/*" "icon_caption_florence/*"
    
    python /home/Ubuntu/OmniParser/weights/convert_safetensor_to_pt.py
    
    python gradio_demo.py
    
    
    ###jupyter notebook
    
    conda install -c conda-forge --override-channels notebook ipywidgets jupyter notebook -y
    
    
    nohup jupyter notebook --ip 0.0.0.0 --port 8888 --no-browser > jupyter.log 2>&1 &
    
    #结束任务：
    pkill -f jupyter-notebook
    
    # 安装 notebook
    conda install -c conda-forge --override-channels notebook -y
    
    # 安装 ipywidgets
    conda install -c conda-forge --override-channels ipywidgets -y
    
    # 安装 jupyter notebook
    conda install -c conda-forge --override-channels jupyter notebook -y
    

###  pyautogui 
    
    
    python3 -m pip install pyautogui
    
    sudo apt-get install scrot
    
    sudo apt-get install python3-tk
    
    sudo apt-get install python3-dev
    

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

### 
