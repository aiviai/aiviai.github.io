---
layout: single  
title: "🚀本地部署OmniParser v2.0与pyautogui真正实现自动化点击！支持macOS、Windows与Linux！轻松实现自动化操作电脑！从服务端部署到客户端开发，从接口设计到自动化控制全流程"  
sidebar:
  nav: "docs"
date: 2025-02-18 10:00:00 +0800  
categories: LLMs
tags: [OmniParser, OmniParser v2.0, pyautogui, multimoda]
classes: wide  

author_profile: true  
---

OmniParser V2.0是微软开发的一款先进开源AI工具，旨在将图形用户界面（GUI）截图转换为结构化数据。这一功能增强了大型语言模型（LLMs）与屏幕上视觉元素的互动，能够实现更加智能的自动化和用户辅助。

OmniParser V2.0代表了AI视觉解析技术的重大进步，它不仅促进了用户与数字界面之间的更好互动，还在各类应用中增强了自动化能力。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/zB3kDkb)
- [👉👉👉 通过YouTube观看](https://youtu.be/aBcedtGCA9I)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 主要特点

- **速度与效率**：与其前版本相比，OmniParser V2.0显著减少了约60%的处理延迟，在高端GPU（如A100）上的平均处理时间为0.6秒，在4090型号上为0.8秒。
- **增强的准确性**：该工具在检测交互元素方面的平均准确率为39.6%，相比早期版本有了显著提升。这一准确率通过使用精细调优的YOLOv8模型和扩展的训练数据集（涵盖各种UI组件）得以实现。
- **强大的输入/输出能力**：OmniParser支持来自多个平台的截图，包括Windows和移动设备。它能够生成UI元素的结构化表示，详细描述可点击区域及其功能。
- **与LLM的无缝集成**：该工具通过统一接口OmniTool与多个AI模型集成，如OpenAI的GPT-4o、DeepSeek R1、Qwen 2.5VL和Anthropic Sonnet。这种集成使得创建自动化测试工具和辅助技术解决方案成为可能。

### 应用领域

OmniParser V2.0有广泛的应用场景：

- **UI自动化**：通过让AI代理与GUI互动来自动化重复任务。
- **辅助技术解决方案**：为残障用户提供结构化数据，帮助辅助技术的实现。
- **用户界面分析**：根据从截图中提取的数据分析UI设计，提升可用性[2][4]。

### 🚀安装步骤

```bash
conda create -n "omni" python==3.12 -y && conda activate omni

git clone https://github.com/microsoft/OmniParser.git

cd OmniParser

pip install -r requirements.txt

# 下载V2模型权重
rm -rf weights/icon_detect weights/icon_caption weights/icon_caption_florence 
for f in icon_detect/{train_args.yaml,model.pt,model.yaml} icon_caption/{config.json,generation_config.json,model.safetensors}; do
    huggingface-cli download microsoft/OmniParser-v2.0 "$f" --local-dir weights
done
mv weights/icon_caption weights/icon_caption_florence

# 启动UI
python gradio_demo.py

# 服务端配置

cd ~/OmniParser

pip install fastapi uvicorn python-multipart pillow requests

nano main.py

python main.py
```

### 🚀pyautogui

```bash
# pip install pyautogui

from time import sleep

import pyautogui
import time

def bbox_to_coords(bbox, screen_width, screen_height):
    """将 bbox 坐标转换为屏幕坐标."""
    xmin, ymin, xmax, ymax = bbox
    x_center = int((xmin + xmax) / 2 * screen_width)
    y_center = int((ymin + ymax) / 2 * screen_height)
    return x_center, y_center

def click_bbox(bbox):
    """点击指定的 bbox."""
    screen_width, screen_height = pyautogui.size()
    x, y = bbox_to_coords(bbox, screen_width, screen_height)

    # 移动鼠标到指定位置
    pyautogui.moveTo(x, y, duration=0.2)  # duration 是移动时间，单位为秒

    # 点击鼠标
    pyautogui.click()

    print(f"点击了坐标: x={x}, y={y}")

if __name__ == '__main__':

    sleep(5)

    # 示例 bbox (来自您提供的数据)
    bbox = [0.36728453636169434, 0.9408491849899292, 0.39909330010414124, 0.9875121712684631] # chrome

    # 点击 bbox
    click_bbox(bbox)
```

### 🚀server

```python
# pip install fastapi uvicorn python-multipart pillow requests

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import torch
from PIL import Image
import io
import base64
from typing import Optional
import numpy as np

from util.utils import check_ocr_box, get_yolo_model, get_caption_model_processor, get_som_labeled_img

app = FastAPI()

# 初始化模型
yolo_model = get_yolo_model(model_path='weights/icon_detect/model.pt')
caption_model_processor = get_caption_model_processor(
    model_name="florence2", 
    model_name_or_path="weights/icon_caption_florence"
)

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

@app.post("/process_image")
async def process_image(
    file: UploadFile = File(...),
    box_threshold: float = 0.05,
    iou_threshold: float = 0.1,
    use_paddleocr: bool = True,
    imgsz: int = 640
):
    try:
        # 读取上传的图片
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # 临时保存图片
        image_save_path = 'imgs/temp_image.png'
        image.save(image_save_path)
        
        # 配置绘制边界框的参数
        box_overlay_ratio = image.size[0] / 3200
        draw_bbox_config = {
            'text_scale': 0.8 * box_overlay_ratio,
            'text_thickness': max(int(2 * box_overlay_ratio), 1),
            'text_padding': max(int(3 * box_overlay_ratio), 1),
            'thickness': max(int(3 * box_overlay_ratio), 1),
        }

        # OCR处理
        ocr_bbox_rslt, is_goal_filtered = check_ocr_box(
            image_save_path,
            display_img=False,
            output_bb_format='xyxy',
            goal_filtering=None,
            easyocr_args={'paragraph': False, 'text_threshold': 0.9},
            use_paddleocr=use_paddleocr
        )
        text, ocr_bbox = ocr_bbox_rslt

        # 获取标记后的图片和解析内容
        dino_labled_img, label_coordinates, parsed_content_list = get_som_labeled_img(
            image_save_path,
            yolo_model,
            BOX_TRESHOLD=box_threshold,
            output_coord_in_ratio=True,
            ocr_bbox=ocr_bbox,
            draw_bbox_config=draw_bbox_config,
            caption_model_processor=caption_model_processor,
            ocr_text=text,
            iou_threshold=iou_threshold,
            imgsz=imgsz,
        )

        # 格式化解析结果
        parsed_content = '\n'.join([f'icon {i}: {str(v)}' for i, v in enumerate(parsed_content_list)])

        return JSONResponse({
            "status": "success",
            "labeled_image": dino_labled_img,  # base64编码的图片
            "parsed_content": parsed_content,
            "label_coordinates": label_coordinates
        })

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 🚀Client

```python
import requests
from PIL import Image
import base64
import io
import pyautogui
from time import sleep
import json
import ast  # 用于解析字符串形式的字典

def process_image(
        image_path: str,
        api_url: str = "http://192.168.1.105:8000/process_image",
        box_threshold: float = 0.05,
        iou_threshold: float = 0.1,
        use_paddleocr: bool = True,
        imgsz: int = 640
):
    files = {
        'file': ('image.png', open(image_path, 'rb'), 'image/png')
    }

    params = {
        'box_threshold': box_threshold,
        'iou_threshold': iou_threshold,
        'use_paddleocr': use_paddleocr,
        'imgsz': imgsz
    }

    response = requests.post(api_url, files=files, params=params)

    if response.status_code == 200:
        result = response.json()

        if result['status'] == 'success':
            labeled_image = Image.open(io.BytesIO(base64.b64decode(result['labeled_image'])))
            return {
                'status': 'success',
                'labeled_image': labeled_image,
                'parsed_content': result['parsed_content'],
                'label_coordinates': result['label_coordinates']
            }
        else:
            return {'status': 'error', 'message': result.get('message', 'Unknown error')}
    else:
        return {'status': 'error', 'message': f'HTTP error {response.status_code}'}

def parse_icon_data(content_str):
    """解析包含图标数据的字符串为列表."""
    icons = []
    lines = content_str.strip().split('\n')
    for line in lines:
        if line.startswith('icon '):
            try:
                # 提取花括号中的内容
                dict_str = line[line.index('{'):line.rindex('}') + 1]
                # 解析字符串为字典
                icon_data = ast.literal_eval(dict_str)
                icons.append(icon_data)
            except Exception as e:
                print(f"解析错误: {e}")
                continue
    return icons

def bbox_to_coords(bbox, screen_width, screen_height):
    """将 bbox 坐标转换为屏幕坐标."""
    xmin, ymin, xmax, ymax = bbox

    # 考虑 Mac 顶部菜单栏的偏移
    menu_bar_height = 25

    # 向上偏移以避免点击到文件名
    y_offset = -15  # 向上偏移15像素

    # 计算相对坐标
    x_center = int((xmin + xmax) / 2 * screen_width)
    y_center = int((ymin + ymax) / 2 * (screen_height - menu_bar_height)) + menu_bar_height + y_offset

    # 添加调试信息
    print(f"\n坐标转换详情:")
    print(f"屏幕尺寸: {screen_width} x {screen_height}")
    print(f"原始bbox: {bbox}")
    print(f"x轴变换: {xmin:.4f} -> {xmax:.4f} 中点: {(xmin + xmax) / 2:.4f}")
    print(f"y轴变换: {ymin:.4f} -> {ymax:.4f} 中点: {(ymin + ymax) / 2:.4f}")
    print(f"考虑菜单栏偏移: {menu_bar_height}px")
    print(f"向上偏移: {y_offset}px")
    print(f"计算结果: x={x_center}, y={y_center}")

    # 确保坐标在屏幕范围内
    x_center = max(0, min(x_center, screen_width))
    y_center = max(0, min(y_center, screen_height))

    return x_center, y_center

# def bbox_to_coords(bbox, screen_width, screen_height):
#     """将 bbox 坐标转换为屏幕坐标."""
#     xmin, ymin, xmax, ymax = bbox
#
#     # 考虑 Mac 顶部菜单栏的偏移（大约25像素）
#     menu_bar_height = 25
#
#     # 考虑窗口边框和其他可能的偏移
#     x_offset = 0
#     y_offset = menu_bar_height
#
#     # 计算相对坐标
#     x_center = int((xmin + xmax) / 2 * screen_width)
#     y_center = int((ymin + ymax) / 2 * (screen_height - menu_bar_height)) + y_offset
#
#     # 添加调试信息
#     print(f"\n坐标转换详情:")
#     print(f"屏幕尺寸: {screen_width} x {screen_height}")
#     print(f"原始bbox: {bbox}")
#     print(f"x轴变换: {xmin:.4f} -> {xmax:.4f} 中点: {(xmin + xmax) / 2:.4f}")
#     print(f"y轴变换: {ymin:.4f} -> {ymax:.4f} 中点: {(ymin + ymax) / 2:.4f}")
#     print(f"考虑菜单栏偏移: {menu_bar_height}px")
#     print(f"计算结果: x={x_center}, y={y_center}")
#
#     # 确保坐标在屏幕范围内
#     x_center = max(0, min(x_center, screen_width))
#     y_center = max(0, min(y_center, screen_height))
#
#     return x_center, y_center

def click_bbox(bbox):
    """双击指定的 bbox."""
    # 获取屏幕分辨率
    screen_width, screen_height = pyautogui.size()
    print(f"当前屏幕分辨率: {screen_width}x{screen_height}")

    # 获取点击坐标
    x, y = bbox_to_coords(bbox, screen_width, screen_height)

    print(f"\n即将执行双击:")
    print(f"目标坐标: x={x}, y={y}")
    print("3秒准备时间...")
    sleep(3)

    # 移动鼠标到指定位置
    pyautogui.moveTo(x, y, duration=0.5)

    print("鼠标已就位，1秒后双击...")
    sleep(1)

    # 执行双击
    pyautogui.doubleClick()

    print(f"已双击坐标: x={x}, y={y}")

# def click_bbox(bbox):
#     """点击指定的 bbox."""
#     # 获取屏幕分辨率
#     screen_width, screen_height = pyautogui.size()
#     print(f"当前屏幕分辨率: {screen_width}x{screen_height}")
#
#     # 获取点击坐标
#     x, y = bbox_to_coords(bbox, screen_width, screen_height)
#
#     print(f"\n即将执行点击:")
#     print(f"目标坐标: x={x}, y={y}")
#     print("3秒准备时间...")
#     sleep(3)
#
#     # 移动鼠标到指定位置（使用缓动效果）
#     pyautogui.moveTo(x, y, duration=1, tween=pyautogui.easeOutQuad)
#
#     print("鼠标已就位，1秒后点击...")
#     sleep(1)
#
#     # 获取当前鼠标位置以验证
#     current_x, current_y = pyautogui.position()
#     print(f"当前鼠标位置: x={current_x}, y={current_y}")
#
#     # 点击鼠标
#     pyautogui.click()
#     print(f"已点击坐标: x={x}, y={y}")

def find_dog_avif_coordinates(icons):
    """在解析内容中查找 dog.avif 的图标."""
    for i, icon in enumerate(icons):
        if isinstance(icon, dict) and 'content' in icon:
            content = icon['content'].strip().lower()
            if 'dog.avif' in content:
                print(f"找到 dog.avif，图标索引: {i}")
                return icon['bbox']
    return None

if __name__ == "__main__":
    # 获取并打印屏幕分辨率
    screen_width, screen_height = pyautogui.size()
    print(f"当前屏幕分辨率: {screen_width}x{screen_height}")

    image_path = "s.png"
    result = process_image(
        image_path=image_path,
        box_threshold=0.05,
        iou_threshold=0.1,
        use_paddleocr=True,
        imgsz=640
    )

    if result['status'] == 'success':
        icons = parse_icon_data(result['parsed_content'])
        dog_avif_bbox = find_dog_avif_coordinates(icons)

        if dog_avif_bbox:
            print("找到 dog.avif 坐标:", dog_avif_bbox)
            click_bbox(dog_avif_bbox)
        else:
            print("未找到 dog.avif 图标")
    else:
        print("Error:", result['message'])

# print(f"当前屏幕分辨率: {pyautogui.size()}")

```

