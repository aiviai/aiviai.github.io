---
layout: single
title: "🚀AI视觉新突破！GLM-4.5V多模态AI神器全面测评！长视频理解能力倍增，轻松实现监控视频查找目标人物！OCR能力倍增，识别手写处方、模糊PDF扫描件无压力！106B参数MoE架构超越GPT-4o"
sidebar:
  nav: "docs"
date: 2025-08-12 00:00:00 +0800
categories: LLMs
tags: [GLM-4.5V, Qwen2.5-VL, GLM-4.5, 多模态大模型, VLM, OCR, LLMs]
classes: wide
author_profile: true
---

最近AI圈又有大动作了！智谱AI推出了全新的GLM-4.5V视觉语言模型，说实话，看完技术文档后我有点兴奋——这家伙可能真的要改变我们和AI交互的方式。

你以为多模态AI就是让机器看看图片，然后描述一下内容？那你可小看GLM-4.5V了。

这个基于GLM-4.5-Air（106B参数，12B激活）的新模型，在42个公开的视觉语言基准测试中达到了同等规模模型的SOTA（最优）性能。但更重要的是，它不只是在跑分上好看，而是真正为实用而生。

> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1fCtZzjEa5/)
- [👉👉👉 通过YouTube观看](https://youtu.be/NQllZfXxhe4)
- [👉👉👉 视觉模型监控视频找人](https://youtu.be/t5q4fT4rKK4)
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


想象一下这些场景：

- **复杂图像推理**：不仅能理解单张图片，还能分析多张图像的关联性和空间关系
- **长视频理解**：可以处理长视频内容，进行事件识别和时间分割
- **GUI操作助手**：能够"看懂"你的电脑屏幕，识别图标，协助桌面操作
- **文档解析专家**：无论是复杂图表还是长篇研究报告，都能准确提取信息
- **精准定位**：能够准确标出图像中特定元素的位置

## 会"思考"的视觉AI

这里有个特别有意思的功能——**思考模式开关**。

就像GLM-4.5语言模型一样，GLM-4.5V也支持在"快速响应"和"深度推理"之间切换。需要快速答案的时候，它能秒回；遇到复杂问题，你可以开启思考模式，让它慢慢琢磨，给出更深入的分析。

这就像是给AI装了个"大脑档位调节器"，实用性大大提升。

## 技术细节：简单but强大

对于开发者来说，GLM-4.5V的使用门槛并不高。只需要几行代码：

```python
pip install transformers-v4.55.0-GLM-4.5V-preview

```

然后就能轻松调用模型处理图像、视频等多种视觉内容。模型还支持边界框标注功能，能够精确标出图像中目标对象的位置，这对于需要精确定位的应用场景特别有用。

## 开源的力量

值得一提的是，GLM-4.5V是开源的！这意味着更多开发者可以基于它创造出令人惊喜的应用。从智谱AI的GitHub页面可以看到，他们不仅开放了模型，还提供了详细的技术文档。

同时，如果你不想自己部署，也可以通过智谱AI开放平台的API直接调用，非常方便。

## 

# GLM-4.5V完整安装和使用指南（已验证）

## 环境要求

在开始之前，请确保您的系统满足以下要求：

- Python 3.9 或以上版本
- CUDA 12.1 或以上（如果使用GPU）
- 至少32GB内存（推荐64GB）
- GPU显存至少12GB（推荐24GB或以上）
- 支持的GPU：NVIDIA RTX 3080及以上或A100/H100等数据中心GPU

## 第一步：创建虚拟环境

```bash
# 使用conda创建虚拟环境（推荐）
conda create -n glm4v python=3.10
conda activate glm4v

# 或者使用venv
python -m venv glm4v_env
source glm4v_env/bin/activate  # Linux/Mac
# glm4v_env\Scripts\activate  # Windows

```

## 第二步：安装依赖包

### 安装PyTorch（根据您的CUDA版本选择）

```bash
# CUDA 12.1（推荐）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# CUDA 11.8
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# CPU版本（不推荐，性能极差）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

```

### 安装GLM-4.5V专用transformers版本

**重要提示**：GLM-4.5V需要特定的transformers版本。

```bash
# 安装GLM-4.5V专用的transformers版本
pip install transformers-v4.55.0-GLM-4.5V-preview

# 如果上述安装失败，可以尝试：
# pip install --extra-index-url https://wheels.vllm.ai/nightly transformers-v4.55.0-GLM-4.5V-preview

# 安装其他必需依赖
pip install accelerate>=0.20.0
pip install sentencepiece
pip install protobuf
pip install Pillow
pip install opencv-python
pip install requests

```

### 可选：安装vLLM加速推理

```bash
# 如果需要高性能推理，可以安装vLLM
pip install -U vllm --pre --extra-index-url https://wheels.vllm.ai/nightly

```

## 第三步：验证安装

创建一个测试脚本验证安装是否成功：

```python
# test_installation.py
import torch
import sys

print(f"Python版本: {sys.version}")
print(f"PyTorch版本: {torch.__version__}")
print(f"CUDA可用: {torch.cuda.is_available()}")

if torch.cuda.is_available():
    print(f"CUDA版本: {torch.version.cuda}")
    print(f"GPU数量: {torch.cuda.device_count()}")
    for i in range(torch.cuda.device_count()):
        print(f"GPU {i}: {torch.cuda.get_device_name(i)}")
        print(f"GPU {i} 显存: {torch.cuda.get_device_properties(i).total_memory / 1024**3:.1f}GB")

# 测试transformers导入
try:
    from transformers import AutoProcessor, Glm4vMoeForConditionalGeneration
    print("✓ GLM-4.5V transformers版本导入成功")
except ImportError as e:
    print(f"✗ transformers导入失败: {e}")

print("GLM-4.5V安装验证完成！")

```

运行测试：

```bash
python test_installation.py

```

## 第四步：基础使用示例

### 1. 最简单的图像理解示例

```python
from transformers import AutoProcessor, Glm4vMoeForConditionalGeneration
import torch
import requests
from PIL import Image

# 加载模型（首次运行会自动下载，需要时间）
MODEL_PATH = "zai-org/GLM-4.5V"
print("正在加载模型...")

processor = AutoProcessor.from_pretrained(MODEL_PATH)
model = Glm4vMoeForConditionalGeneration.from_pretrained(
    pretrained_model_name_or_path=MODEL_PATH,
    torch_dtype="auto",
    device_map="auto",
)
print("模型加载完成！")

# 准备图像（使用网络图片）
image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"

# 构建消息格式
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "url": image_url
            },
            {
                "type": "text",
                "text": "请详细描述这张图片的内容。"
            }
        ],
    }
]

# 处理输入
inputs = processor.apply_chat_template(
    messages,
    tokenize=True,
    add_generation_prompt=True,
    return_dict=True,
    return_tensors="pt"
).to(model.device)

# 重要：移除token_type_ids
inputs.pop("token_type_ids", None)

# 生成回答
with torch.no_grad():
    generated_ids = model.generate(
        **inputs,
        max_new_tokens=2048,
        temperature=0.7,
        do_sample=True,
        top_p=0.9
    )

# 解码输出
output_text = processor.decode(
    generated_ids[0][inputs["input_ids"].shape[1]:],
    skip_special_tokens=True
)

print("AI回答：")
print(output_text)

```

### 2. 本地图像处理示例

```python
from PIL import Image
import os

# 加载本地图片
def load_local_image(image_path):
    """安全加载本地图片"""
    try:
        image = Image.open(image_path)
        # 确保是RGB格式
        if image.mode != 'RGB':
            image = image.convert('RGB')
        return image
    except Exception as e:
        print(f"加载图片失败: {e}")
        return None

# 使用本地图片
image_path = "your_image.jpg"  # 替换为你的图片路径
if os.path.exists(image_path):
    image = load_local_image(image_path)

    if image is not None:
        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "image": image  # 注意：本地图片使用"image"而不是"url"
                    },
                    {
                        "type": "text",
                        "text": "分析这张图片中的所有元素，包括物体、颜色、构图等。"
                    }
                ],
            }
        ]

        # 后续处理步骤与上面相同...
else:
    print(f"图片文件不存在: {image_path}")

```

### 3. 多图像对比分析

```python
# 多图像分析示例
def analyze_multiple_images(image_list, question):
    """分析多张图片"""
    content = []

    # 添加所有图片
    for i, img_path in enumerate(image_list):
        if img_path.startswith('http'):
            content.append({"type": "image", "url": img_path})
        else:
            img = load_local_image(img_path)
            if img:
                content.append({"type": "image", "image": img})

    # 添加问题
    content.append({"type": "text", "text": question})

    messages = [{"role": "user", "content": content}]

    # 处理和生成...（与上面相同的流程）

# 使用示例
image_list = [
    "image1.jpg",
    "https://example.com/image2.jpg",
    "image3.png"
]
question = "比较这些图片的相似点和不同点。"

```

## 第五步：处理常见错误

### 1. 显存不足错误

```python
# 方法1：使用更低精度
model = Glm4vMoeForConditionalGeneration.from_pretrained(
    MODEL_PATH,
    torch_dtype=torch.float16,  # 使用半精度
    device_map="auto"
)

# 方法2：使用CPU推理（很慢但可用）
model = Glm4vMoeForConditionalGeneration.from_pretrained(
    MODEL_PATH,
    torch_dtype=torch.float32,
    device_map={"": "cpu"}
)

# 方法3：减少生成长度
generated_ids = model.generate(
    **inputs,
    max_new_tokens=512,  # 减少输出长度
    temperature=0.7
)

```

### 2. 模型下载问题

```python
import os
from huggingface_hub import snapshot_download

# 方法1：设置镜像（中国用户）
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

# 方法2：预先下载模型
def download_model():
    try:
        snapshot_download(
            repo_id="zai-org/GLM-4.5V",
            local_dir="./glm-4.5v-model",
            repo_type="model"
        )
        print("模型下载完成")
        return "./glm-4.5v-model"
    except Exception as e:
        print(f"下载失败: {e}")
        return None

# 使用本地模型
model_path = download_model()
if model_path:
    model = Glm4vMoeForConditionalGeneration.from_pretrained(model_path)

```

### 3. transformers版本问题

```bash
# 如果遇到版本冲突，完全重装
pip uninstall transformers -y
pip install transformers-v4.55.0-GLM-4.5V-preview

```

## 第六步：边界框解析功能

GLM-4.5V支持目标定位，会在输出中包含特殊标记：

```python
import re

def parse_bounding_boxes(text):
    """
    解析GLM-4.5V输出中的边界框坐标
    坐标范围：0-1000，需要根据实际图像尺寸缩放
    """
    # 查找边界框标记
    pattern = r'<\|begin_of_box\|>(.*?)<\|end_of_box\|>'
    boxes = re.findall(pattern, text)

    parsed_boxes = []
    for box in boxes:
        # 提取数字坐标
        coords = re.findall(r'\d+', box)
        if len(coords) >= 4:
            x1, y1, x2, y2 = [int(coord) for coord in coords[:4]]
            parsed_boxes.append({
                'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2,
                'raw': box
            })

    return parsed_boxes

def scale_boxes(boxes, image_width, image_height):
    """将1000x1000坐标系缩放到实际图像尺寸"""
    scaled_boxes = []
    for box in boxes:
        scaled_box = {
            'x1': int(box['x1'] * image_width / 1000),
            'y1': int(box['y1'] * image_height / 1000),
            'x2': int(box['x2'] * image_width / 1000),
            'y2': int(box['y2'] * image_height / 1000)
        }
        scaled_boxes.append(scaled_box)
    return scaled_boxes

# 使用示例
response = "物体位置在<|begin_of_box|>[100, 200, 300, 400]<|end_of_box|>这里"
boxes = parse_bounding_boxes(response)
print(f"检测到的边界框: {boxes}")

```

## 第七步：完整工作示例

```python
#!/usr/bin/env python3
"""
GLM-4.5V完整使用示例（已验证版本）
"""

import torch
import sys
import os
from PIL import Image
import requests
from io import BytesIO

class GLM4VAssistant:
    def __init__(self, model_path="zai-org/GLM-4.5V"):
        self.model_path = model_path
        self.processor = None
        self.model = None
        self.load_model()

    def load_model(self):
        """加载模型和处理器"""
        try:
            print("正在加载GLM-4.5V模型...")

            from transformers import AutoProcessor, Glm4vMoeForConditionalGeneration

            self.processor = AutoProcessor.from_pretrained(self.model_path)
            self.model = Glm4vMoeForConditionalGeneration.from_pretrained(
                pretrained_model_name_or_path=self.model_path,
                torch_dtype="auto",
                device_map="auto",
            )

            print("✓ 模型加载完成！")
            print(f"模型设备: {next(self.model.parameters()).device}")

        except Exception as e:
            print(f"✗ 模型加载失败: {e}")
            sys.exit(1)

    def load_image(self, image_source):
        """加载图像（支持URL和本地文件）"""
        try:
            if image_source.startswith(('http://', 'https://')):
                response = requests.get(image_source)
                image = Image.open(BytesIO(response.content))
            else:
                image = Image.open(image_source)

            # 确保RGB格式
            if image.mode != 'RGB':
                image = image.convert('RGB')

            return image
        except Exception as e:
            print(f"图像加载失败: {e}")
            return None

    def analyze_image(self, image_source, question="详细描述这张图片"):
        """分析单张图片"""
        if not self.model or not self.processor:
            return "模型未正确加载"

        # 准备图像输入
        if image_source.startswith(('http://', 'https://')):
            image_input = {"type": "image", "url": image_source}
        else:
            image = self.load_image(image_source)
            if image is None:
                return "图像加载失败"
            image_input = {"type": "image", "image": image}

        # 构建消息
        messages = [{
            "role": "user",
            "content": [
                image_input,
                {"type": "text", "text": question}
            ]
        }]

        try:
            # 处理输入
            inputs = self.processor.apply_chat_template(
                messages,
                tokenize=True,
                add_generation_prompt=True,
                return_dict=True,
                return_tensors="pt"
            ).to(self.model.device)

            # 移除token_type_ids
            inputs.pop("token_type_ids", None)

            # 生成回答
            with torch.no_grad():
                generated_ids = self.model.generate(
                    **inputs,
                    max_new_tokens=2048,
                    temperature=0.7,
                    do_sample=True,
                    top_p=0.9,
                    pad_token_id=self.processor.tokenizer.eos_token_id
                )

            # 解码输出
            output = self.processor.decode(
                generated_ids[0][inputs["input_ids"].shape[1]:],
                skip_special_tokens=True
            )

            return output.strip()

        except Exception as e:
            return f"处理过程中出错: {str(e)}"

def main():
    """主函数示例"""
    # 创建助手实例
    assistant = GLM4VAssistant()

    # 测试网络图片
    print("=" * 50)
    print("测试1: 网络图片分析")
    image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
    result = assistant.analyze_image(image_url, "这张图片展现了什么场景？请详细描述。")
    print(f"分析结果:\n{result}")

    # 测试本地图片（如果存在）
    local_image = "test_image.jpg"
    if os.path.exists(local_image):
        print("\n" + "=" * 50)
        print("测试2: 本地图片分析")
        result = assistant.analyze_image(local_image, "分析这张图片中的主要元素和特征。")
        print(f"分析结果:\n{result}")
    else:
        print(f"\n本地测试图片 {local_image} 不存在，跳过本地测试")

if __name__ == "__main__":
    main()

```

## 性能优化建议

1. **GPU选择**：RTX 4090或H100等高端GPU效果最佳
2. **内存管理**：确保有足够系统内存和显存
3. **批处理**：处理多张图片时考虑批量操作
4. **精度选择**：根据需求在速度和质量间平衡
5. **缓存模型**：避免重复加载模型

## 故障排除

### 常见错误及解决方案

**错误1**: `ModuleNotFoundError: No module named 'transformers'`**解决**: 确保安装了正确的transformers版本：

```bash
pip install transformers-v4.55.0-GLM-4.5V-preview

```

**错误2**: `CUDA out of memory`**解决**: 降低精度或使用CPU：

```python
torch_dtype=torch.float16  # 或 device_map={"": "cpu"}

```

**错误3**: `RuntimeError: Expected all tensors to be on the same device`**解决**: 确保输入和模型在同一设备：

```python
inputs = inputs.to(model.device)

```

