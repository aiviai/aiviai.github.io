---
layout: single
title: "AI-Scientist 颠覆传统科研模式：AI Scientist如何利用迭代实验和自动化系统，开创学术研究新纪元"
sidebar:
  nav: "docs"
date: 2024-08-14 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, Claude, GPT, GPT-4]
classes: wide
author_profile: true
---


#  [ AI-Scientist ](<https://github.com/SakanaAI/AI-Scientist>) 颠覆传统科研模式：AI Scientist如何利用迭代实验和自动化系统，开创学术研究新纪元 
    
    
    conda create -n ai_scientist1 python=3.11
    conda activate ai_scientist1
    
```
    # LLM APIs
    pip install anthropic aider-chat backoff openai
    # Viz
    pip install matplotlib pypdf pymupdf4llm
    # Install pdflatex
    sudo apt-get install texlive-full
```
    
    # Common Requirements
    pip install torch numpy transformers datasets tiktoken wandb tqdm
    
    
    export OPENAI_API_KEY="sk-proj-"
    
    
    git clone https://github.com/SakanaAI/AI-Scientist.git
    
    
```
    # 准备NanoGPT数据
    python data/enwik8/prepare.py
    python data/shakespeare_char/prepare.py
    python data/text8/prepare.py
```
    
    
```
    # 创建NanoGPT基线运行 训练NanoGPT模型建立一个基准
    cd templates/nanoGPT
    python experiment.py --out_dir run_0
    python plot.py
    cd ../..
```

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  使用claude接口 
    
    
    export ANTHROPIC_API_KEY="sk-proj-"
    
    python launch_scientist.py --model "claude-3-5-sonnet-20240620" --experiment nanoGPT --num-ideas 5
    
    # --num-ideas 5表示生成5个研究想法

###  使用openai接口 
    
    
    export OPENAI_API_KEY="sk-proj-"
    
    python launch_scientist.py --model "gpt-4o-2024-05-13" --experiment nanoGPT --num-ideas 5

###  获取论文审查 
    
    
    #export OPENAI_API_KEY="sk-proj-"
    
    import openai
    from ai_scientist.perform_review import load_paper, get_llm_review
    
    client = openai.OpenAI()
    model = "gpt-4o-2024-05-13"
    
```
    paper_txt = load_paper("path_to_your_generated_paper.pdf")
    review = get_llm_review(
        paper_txt,
        model,
        client,
        num_reflections=5,
        num_fs_examples=1,
        num_reviews_ensemble=5,
        temperature=0.1,
    )
```
    
```
    print(review["Overall"])  # 总体评分
    print(review["Decision"])  # 接受或拒绝
    print(review["Weaknesses"])  # 弱点列表
```

###  运行批量分析 
    
    
    cd review_iclr_bench
    python iclr_analysis.py --num_reviews 500  --batch_size 100 --num_fs_examples 1 --num_reflections 5 --temperature 0.1 --num_reviews_ensemble 5

###  2D扩散 
    
    
    cd templates/2d_diffusion && python experiment.py --out_dir run_0 && python plot.py

###  Grokking 
    
    
    cd templates/grokking && python experiment.py --out_dir run_0 && python plot.py
