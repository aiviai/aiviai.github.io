---
layout: single
title: "本地部署+微调 stable diffusion 3"
sidebar:
  nav: "docs"
date: 2024-06-17 00:00:00 +0800
categories: [Fine-Tuning, LLM, Vision]
tags: [AI, HuggingFace, PyTorch, Stable-Diffusion]
classes: wide
author_profile: true
---


#  本地部署+微调 stable diffusion 3 

###  **[ StableSwarmUI ](<https://github.com/Stability-AI/StableSwarmUI>) **

> StableSwarmUI是Stable Diffusion官方推出的一款WebUI框架   
>  让Stable Diffusion的使用变得更加简单和方便   
> 

[ ![Image](https://github.com/Stability-AI/StableSwarmUI/blob/master/.github/images/stableswarmui.jpg?raw=true) ](<https://github.com/Stability-AI/StableSwarmUI/blob/master/.github/images/stableswarmui.jpg?raw=true>) [ ![Image](%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2+%E5%BE%AE%E8%B0%83%20stable%20diffusion%203%20ea64c55f7f834968bd945c1609d21f9d/Untitled.png) ](<%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2+%E5%BE%AE%E8%B0%83%20stable%20diffusion%203%20ea64c55f7f834968bd945c1609d21f9d/Untitled.png>)

###  prompt 
    
    
    a female character with long, flowing hair that appears to be made of ethereal, swirling patterns resembling the Northern Lights or Aurora Borealis. The background is dominated by deep blues and purples, creating a mysterious and dramatic atmosphere. The character's face is serene, with pale skin and striking features. She wears a dark-colored outfit with subtle patterns. The overall style of the artwork is reminiscent of fantasy or supernatural genres
    
    Digital art, portrait of an anthropomorphic roaring Tiger warrior with full armor, close up in the middle of a battle, behind him there is a banner with the text "Open Source".
    
    photo of a dog and a cat both standing on a red box, with a blue ball in the middle with a parrot standing on top of the ball. The box has the text "SD3"
    
    selfie photo of a wizard with long beard and purple robes, he is apparently in the middle of Tokyo. Probably taken from a phone.
    
    A vibrant street wall covered in colorful graffiti, the centerpiece spells "SD3 MEDIUM", in a storm of colors
    
    photo of a young woman with long, wavy brown hair tied in a bun and glasses. She has a fair complexion and is wearing subtle makeup, emphasizing her eyes and lips. She is dressed in a black top. The background appears to be an urban setting with a building facade, and the sunlight casts a warm glow on her face.
    
    anime art of a steampunk inventor in their workshop, surrounded by gears, gadgets, and steam. He is holding a blue potion and a red potion, one in each hand
    
    photo of picturesque scene of a road surrounded by lush green trees and shrubs. The road is wide and smooth, leading into the distance. On the right side of the road, there's a blue sports car parked with the license plate spelling "SD32B". The sky above is partly cloudy, suggesting a pleasant day. The trees have a mix of green and brown foliage. There are no people visible in the image. The overall composition is balanced, with the car serving as a focal point.
    
    photo of young man in a black suit, white shirt, and black tie. He has a neatly styled haircut and is looking directly at the camera with a neutral expression. The background consists of a textured wall with horizontal lines. The photograph is in black and white, emphasizing contrasts and shadows. The man appears to be in his late twenties or early thirties, with fair skin and short, dark hair.
    
    photo of a woman on the beach, shot from above. She is facing the sea, while wearing a white dress. She has long blonde hair

###  安装 
    
    
    wget https://github.com/Stability-AI/StableSwarmUI/releases/download/0.6.1-Beta/install-linux.sh -O install-linux.sh
    chmod +x install-linux.sh
    
    
```
    ##windows
    git clone https://github.com/Stability-AI/StableSwarmUI
    ##然后双击打开launch-windows.bat
```
    
    ##模型下载链接 https://huggingface.co/leo009/stable-diffusion-3-medium/resolve/main/sd3_medium_incl_clips.safetensors

###  微调 
    
    
```
    # 创建名为 aila 的 Python 3.11 conda 环境
    conda create -n aila python=3.11 -y
    # 激活 aila 环境
    conda activate aila
```
    
    # 安装必要的 Python 库
    pip install peft datasets huggingface_hub wandb bitsandbytes pillow git+https://github.com/huggingface/transformers accelerate sentencepiece
    
```
    # 克隆 Hugging Face 的 diffusers 仓库
    git clone https://github.com/huggingface/diffusers
    # 进入 diffusers 目录
    cd diffusers
    # 以可编辑模式安装 diffusers 库
    pip install -e .
    # 进入 examples/dreambooth 目录
    cd examples/dreambooth
    # 安装 requirements_sd3.txt 中的依赖
    pip install -r requirements_sd3.txt
```
    
```
    # 登录 Hugging Face Hub
    huggingface-cli login
    # 配置 Accelerate 库的默认设置
    accelerate config default
```
    
```
    # 使用 Python 的 heredoc 语法执行 Python 代码块
    python - <<EOT
    from huggingface_hub import snapshot_download
```
    
```
    # 设置本地目录路径
    local_dir = "/home/Ubuntu/dog"
    # 从 Hugging Face Hub 下载 "diffusers/dog-example" 数据集到本地目录
    snapshot_download(
        "diffusers/dog-example",
        local_dir=local_dir,
        repo_type="dataset",
        ignore_patterns=".gitattributes",
    )
    EOT
```
    
```
    # 设置预训练的 Stable Diffusion 3 模型名称
    export MODEL_NAME="stabilityai/stable-diffusion-3-medium-diffusers"
    # 设置自定义数据集的目录路径
    export INSTANCE_DIR="/home/Ubuntu/dog"
    # 设置微调后模型的输出目录
    export OUTPUT_DIR="trained-sd3-lora"
```
    
```
    # 使用 Accelerate 启动 train_dreambooth_lora_sd3.py 训练脚本
    accelerate launch train_dreambooth_lora_sd3.py \
      --pretrained_model_name_or_path=$MODEL_NAME \
      --instance_data_dir=$INSTANCE_DIR \
      --output_dir=$OUTPUT_DIR \
      --mixed_precision="fp16" \
      --instance_prompt="a photo of sks dog" \
      --resolution=512 \
      --train_batch_size=1 \
      --gradient_accumulation_steps=4 \
      --learning_rate=1e-5 \
      --report_to="wandb" \
      --lr_scheduler="constant" \
      --lr_warmup_steps=0 \
      --max_train_steps=500 \
      --validation_prompt="A photo of sks dog in a bucket" \
      --validation_epochs=25 \
      --seed="0"   
      #如果报错，则运行这行代码
```
      
     pip install numpy==1.24.3
     mv /home/Ubuntu/dog/.huggingface /home/Ubuntu/
    
    
    
```
    accelerate launch train_dreambooth_lora_sd3.py \
      --pretrained_model_name_or_path=${MODEL_NAME}  \
      --instance_data_dir=${INSTANCE_DIR} \
      --output_dir=/home/Ubuntu/${OUTPUT_DIR} \
      --mixed_precision="fp16" \
      --instance_prompt="a photo of sks dog" \
      --resolution=1024 \
      --train_batch_size=1 \
      --gradient_accumulation_steps=4 \
      --learning_rate=1e-5 \
      --report_to="wandb" \
      --lr_scheduler="constant" \
      --lr_warmup_steps=0 \
      --max_train_steps=500 \
      --weighting_scheme="logit_normal" \
      --validation_prompt="A photo of sks dog in a bucket" \
      --validation_epochs=25 \
      --seed="0" 
```
    
    
    
    ##load lora
    ##path /home/Ubuntu/diffusers/examples/dreambooth
    
```
    import os
    import torch
    from diffusers import AutoPipelineForText2Image
    from PIL import Image
```
    
    model_id = "stabilityai/stable-diffusion-xl-base-1.0"
    pipeline = AutoPipelineForText2Image.from_pretrained(model_id, torch_dtype=torch.float16).to("cuda")
    
    lora_path = "/home/Ubuntu/trained-sd3-lora/pytorch_lora_weights.safetensors"
    
```
    if os.path.exists(lora_path):
        pipeline.load_lora_weights(lora_path)
    else:
        print(f"LoRA 权重文件 {lora_path} 不存在。")
```
    
```
    # 使用 LoRA 生成图像
    prompt = "A photo of sks dog in a bucket"
    image = pipeline(prompt, num_inference_steps=50).images[0]
```
    
```
    # 将图片保存到文件
    image.save("output.png")
    print(f"生成的图片已保存到 output.png")
```
    
    
    
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) ** ****

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉** **[ 我的开源项目 ](<https://github.com/win4r/AISuperDomain>) **

###  超参数设置解释 

>   1. -mixed_precision="fp16":使用半精度(FP16)进行混合精度训练。这可以减少内存使用并加速训练过程,同时保持模型性能。 
> 

>   2. -instance_prompt="a photo of sks dog":这是你为模型提供的实例提示,用于指导模型生成特定主题(sks狗)的图像。 
> 

>   3. -resolution=1024:生成图像的分辨率设置为1024x1024。更高的分辨率可以生成更细节的图像,但也需要更多的计算资源和时间。 
> 

>   4. -train_batch_size=1:训练批量大小设置为1。这可能是由于GPU内存限制或者为了更稳定的训练。 
> 

>   5. -gradient_accumulation_steps=4:梯度累积步数设置为4。这意味着每4个训练步骤更新一次模型参数。这可以模拟更大的批量大小,在内存有限的情况下很有用。 
> 

>   6. -learning_rate=1e-5:学习率设置为1×10^(-5),这是一个较小的值,有助于模型稳定学习并逐步适应新数据。 
> 

>   7. -report_to="wandb":使用Weights & Biases (wandb)来记录和跟踪训练过程。 
> 

>   8. -lr_scheduler="constant":使用恒定的学习率调度器,即在整个训练过程中保持学习率不变。 
> 

>   9. -lr_warmup_steps=0:学习率预热步数设置为0,表示不使用学习率预热。 
> 

>   10. -max_train_steps=500:最大训练步数设置为500,控制模型训练的总迭代次数。 
> 

>   11. -weighting_scheme="logit_normal":使用logit_normal权重方案。权重方案决定了如何组合各项损失计算最终的训练目标。 
> 

>   12. -validation_prompt="A photo of sks dog in a bucket":验证提示,用于在训练过程中评估模型性能。 
> 

>   13. -validation_epochs=25:每25个训练epoch进行一次验证。 
> 

>   14. -seed="0":设置随机种子为0,用于确保训练的可重复性。 
> 

> 
> 这些超参数设置的优势在于: 
> 
>   1. 使用混合精度训练和较小的批量大小,可以减少内存使用并加速训练。 
> 

>   2. 较低的学习率有助于模型稳定学习并逐步适应新数据。 
> 

>   3. 使用wandb可以方便地跟踪和可视化训练过程。 
> 

>   4. 恒定的学习率调度器简单易用。 
> 

>   5. 使用验证提示和定期验证,可以监控模型在训练过程中的性能。 
> 

>   6. 设置随机种子保证了训练的可重复性。 
> 


###  wandb介绍 

> [ https://wandb.ai/site ](<https://wandb.ai/site>)
> 
> wandb是一个强大的机器学习平台，为实验提供跟踪、可视化和协作功能。   
>  可以记录训练指标，生成可视化图表，自动优化超参数，并进行模型版本控制。   
> 

[ ![Image](%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2+%E5%BE%AE%E8%B0%83%20stable%20diffusion%203%20ea64c55f7f834968bd945c1609d21f9d/Untitled%201.png) ](<%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2+%E5%BE%AE%E8%B0%83%20stable%20diffusion%203%20ea64c55f7f834968bd945c1609d21f9d/Untitled%201.png>)
