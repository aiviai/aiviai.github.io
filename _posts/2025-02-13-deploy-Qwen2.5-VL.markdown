---
layout: single  
title: "🚀vLLM本地部署Qwen2.5-VL多模态大模型！70亿参数即可打造监控视频目标查找项目！轻松实现监控视频自动找人！RTX A6000显卡部署Qwen2.5-VL-7B-Instruct模型实战教程"  
sidebar:
  nav: "docs"
date: 2025-02-13 10:00:00 +0800  
categories: LLMs
tags: [Qwen2.5-VL, Qwen2.5-VL-7B-Instruct, Qwen, multimoda]
classes: wide  

author_profile: true  
---


Qwen2.5-VL是阿里云开发的最新多模态大型语言模型，它在视觉理解、文档处理和多模态交互方面表现出色。在视觉理解方面，Qwen2.5-VL能够准确识别图像和视频中的物体、场景和关系，并进行描述。在文档处理方面，它擅长提取和分析各种类型的文档信息，包括文字、表格和图片。Qwen2.5-VL还支持自然的多模态交互，用户可以通过文字、语音或图像等方式与模型进行交流，实现人机协同。这款模型在智能客服、教育、金融、医疗和零售等领域具有广泛的应用前景。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/zB3kDkb)
- [👉👉👉 通过YouTube观看](https://youtu.be/Z05-JuG1a68)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🚀简介：

Qwen2.5-VL 是由阿里云通义千问团队开发的最新一代多模态大型语言模型。它在视觉理解、文档处理和多模态交互方面取得了显著进展，具备以下主要特点：

1. **更强大的视觉理解能力：** Qwen2.5-VL 能够处理图像和视频等多模态输入，准确理解其中的内容和关系。它在物体检测、场景识别、图像描述等任务上表现出色，可以应用于智能安防、图像搜索、视频分析等领域。
2. **高效的文档处理能力：** Qwen2.5-VL 擅长处理各种类型的文档，包括扫描件、网页、PDF 等。它能够提取文档中的文字、表格、图片等信息，并进行结构化处理，方便用户进行信息检索、内容摘要和智能问答。
3. **自然的多模态交互体验：** Qwen2.5-VL 支持自然语言和视觉信息的混合输入，用户可以通过文字、语音或图像等方式与模型进行交互。它能够理解用户的意图，并生成相应的回复或执行相应的操作，实现人机协同和智能助手等应用。
4. **广泛的应用前景：** Qwen2.5-VL 在多个领域具有广泛的应用前景，例如：
    - 智能客服：通过理解用户的文字和图像输入，提供个性化的客户服务。
    - 教育：辅助教师进行课件制作、作业批改和学生辅导。
    - 金融：处理财务报表、分析市场趋势、辅助投资决策。
    - 医疗：辅助医生进行病理分析、诊断和治疗方案制定。
    - 零售：优化商品推荐、提升用户购物体验。

✅国外下载：[https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct)

✅国内下载：[https://modelscope.cn/models/Qwen/Qwen2.5-VL-7B-Instruct](https://modelscope.cn/models/Qwen/Qwen2.5-VL-7B-Instruct)

### 🚀本地部署

```bash
# 创建环境
conda create -n myenv python=3.11 -y

# 激活环境 (注意这里的语法)
conda activate myenv   # 或 source activate myenv (在某些系统上)

# 安装依赖
pip install vllm
pip install git+https://github.com/huggingface/transformers
pip install torch

# 或 pip install git+https://github.com/huggingface/transformers 

# 启动服务
vllm serve Qwen/Qwen2.5-VL-7B-Instruct --limit-mm-per-prompt image=4
```

### 🚀测试代码

```python
#pip install openai

from openai import OpenAI

# 正确初始化 OpenAI 客户端
client = OpenAI(
    base_url="http://64.247.196.79:8000/v1",
    api_key="test"
)

response = client.chat.completions.create(
  model="Qwen/Qwen2.5-VL-7B-Instruct",
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

print(response.choices[0].message.content)

import base64
from openai import OpenAI

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# 初始化 OpenAI 客户端
client = OpenAI(
    base_url="http://64.247.196.79:8000/v1",
    api_key="test"
)

# 本地图片路径
image_path = "./dog.jpg"

# 编码图片
base64_image = encode_image(image_path)

response = client.chat.completions.create(
  model="Qwen/Qwen2.5-VL-7B-Instruct",
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

print(response.choices[0])
```

### 🚀视频目标检测代码

main.py

```python
#安装依赖 pip install fastapi uvicorn python-multipart jinja2 opencv-python openai aiofiles

# main.py
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, StreamingResponse
import shutil
import os
import cv2
from openai import OpenAI
import time
from pathlib import Path
import asyncio
import json
import base64

app = FastAPI()

# 创建必要的目录
UPLOAD_DIR = Path("uploads")
FRAMES_DIR = Path("frames")
UPLOAD_DIR.mkdir(exist_ok=True)
FRAMES_DIR.mkdir(exist_ok=True)

# 初始化 OpenAI 客户端
client = OpenAI(
    base_url="http://192.168.1.105:8000/v1",
    api_key="test"
)

# 设置模板和上传/帧目录的静态文件服务
templates = Jinja2Templates(directory="templates")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/frames", StaticFiles(directory="frames"), name="frames")

def encode_image(image_path):
    """将图片转换为base64编码"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

async def analyze_image(image_path: str, object_str: str):
    """异步版本的图像分析函数"""
    prompt_str = f"""Please analyze the image and answer the following questions:
    1. Is there a {object_str} in the image?
    2. If yes, describe its appearance and location in the image in detail.
    3. If no, describe what you see in the image instead.
    4. On a scale of 1-10, how confident are you in your answer?

    Please structure your response as follows:
    Answer: [YES/NO]
    Description: [Your detailed description]
    Confidence: [1-10]"""

    try:
        # 编码图片
        base64_image = encode_image(image_path)

        response = await asyncio.to_thread(
            client.chat.completions.create,
            model="Qwen/Qwen2.5-VL-7B-Instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt_str},
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

        response_text = response.choices[0].message.content
        response_lines = response_text.strip().split('\n')

        answer = None
        description = None
        confidence = 10

        for line in response_lines:
            line = line.strip()
            if line.lower().startswith('answer:'):
                answer = line.split(':', 1)[1].strip().upper()
            elif any(line.lower().startswith(prefix) for prefix in
                     ['description:', 'reasoning:', 'alternative description:']):
                description = line.split(':', 1)[1].strip()
            elif line.lower().startswith('confidence:'):
                try:
                    confidence = int(line.split(':', 1)[1].strip())
                except ValueError:
                    confidence = 10

        return answer == "YES" and confidence >= 7, description, confidence
    except Exception as e:
        print(f"Error during image analysis: {str(e)}")
        return False, "Error occurred", 0

def preprocess_image(image_path):
    """图像预处理函数"""
    img = cv2.imread(image_path)
    if img is None:
        return False

    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    final = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
    cv2.imwrite(image_path, final, [cv2.IMWRITE_JPEG_QUALITY, 100])
    return True

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/analyze")
async def analyze_video(
        video: UploadFile = File(...),
        object_str: str = Form(...)
):
    try:
        # 保存上传的视频
        video_path = UPLOAD_DIR / video.filename
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        # 为当前任务创建专门的帧目录
        task_frames_dir = FRAMES_DIR / video.filename.split('.')[0]
        task_frames_dir.mkdir(exist_ok=True)

        # 异步生成分析结果
        async def generate_results():
            cap = cv2.VideoCapture(str(video_path))
            fps = int(cap.get(cv2.CAP_PROP_FPS))
            frame_count = 0
            consecutive_detections = 0  # 连续检测计数
            first_detection_second = None  # 记录第一次检测时间

            try:
                while True:
                    success, frame = cap.read()
                    if not success:
                        break

                    if frame_count % fps == 0:  # 每秒处理一帧
                        current_second = frame_count // fps
                        frame_path = os.path.join(task_frames_dir, f"frame_{current_second}.jpg")
                        cv2.imwrite(frame_path, frame)

                        if preprocess_image(frame_path):
                            is_match, description, confidence = await analyze_image(frame_path, object_str)

                            if is_match:
                                consecutive_detections += 1
                                if consecutive_detections == 1:
                                    first_detection_second = current_second
                            else:
                                consecutive_detections = 0
                                first_detection_second = None

                            result = {
                                "status": "success",
                                "frame": {
                                    "second": current_second,
                                    "is_match": is_match,
                                    "description": description,
                                    "confidence": confidence,
                                    "frame_path": f"/frames/{video.filename.split('.')[0]}/frame_{current_second}.jpg"
                                }
                            }

                            yield json.dumps(result) + "\n"

                            # 如果连续两次检测到目标，输出结果并停止
                            if consecutive_detections >= 2:
                                final_result = {
                                    "status": "complete",
                                    "message": f"目标已连续检测到两次，首次检测时间为第 {first_detection_second} 秒",
                                    "first_detection_time": first_detection_second
                                }
                                yield json.dumps(final_result) + "\n"
                                break

                    frame_count += 1

            finally:
                cap.release()

        return StreamingResponse(generate_results(), media_type="application/json")

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
```

index.html(放入templates文件夹里)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Analysis</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
        }

        .upload-area {
            border: 2px dashed #e5e7eb;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
        }

        .upload-area:hover {
            border-color: #6366f1;
            background: rgba(255, 255, 255, 0.9);
            transform: translateY(-2px);
        }

        .analyzing {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

        .gradient-bg {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .results-container::-webkit-scrollbar {
            width: 8px;
        }

        .results-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }

        .results-container::-webkit-scrollbar-thumb {
            background: #c7d2fe;
            border-radius: 4px;
        }

        .results-container::-webkit-scrollbar-thumb:hover {
            background: #818cf8;
        }
    </style>
</head>
<body class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
        <div class="glass-card rounded-2xl shadow-xl overflow-hidden">
            <div class="gradient-bg px-6 py-4">
                <h1 class="text-2xl font-semibold text-white">Video Object Detection</h1>
                <p class="text-indigo-100 text-sm mt-1">Upload a video and find specific objects within it</p>
            </div>

            <div class="p-6">
                <form id="uploadForm" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
                        <div class="upload-area rounded-xl p-8 cursor-pointer" id="uploadArea">
                            <div id="uploadText" class="text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p class="mt-4 text-sm text-gray-600">Click or drag video to upload</p>
                            </div>
                            <input type="file" id="videoInput" accept="video/*" class="hidden">
                        </div>
                        <p class="mt-2 text-sm text-gray-500" id="fileInfo"></p>
                    </div>

                    <div>
                        <label for="objectInput" class="block text-sm font-medium text-gray-700 mb-2">Object to Find</label>
                        <input type="text"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                               id="objectInput"
                               placeholder="e.g., 'a person wearing red shirt'">
                    </div>

                    <div class="alert-danger hidden rounded-lg bg-red-50 p-4 text-red-700" id="errorAlert"></div>

                    <button type="submit"
                            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                            id="analyzeBtn">
                        Start Analysis
                    </button>
                </form>

                <div id="statusText" class="text-center mt-6 hidden">
                    <div class="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full analyzing">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing video...
                    </div>
                </div>

                <div class="results-container mt-6 space-y-4 max-h-[600px] overflow-y-auto pr-2" id="resultsContainer"></div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const uploadArea = document.getElementById('uploadArea');
            const videoInput = document.getElementById('videoInput');
            const uploadForm = document.getElementById('uploadForm');
            const analyzeBtn = document.getElementById('analyzeBtn');
            const statusText = document.getElementById('statusText');
            const errorAlert = document.getElementById('errorAlert');
            const resultsContainer = document.getElementById('resultsContainer');
            const fileInfo = document.getElementById('fileInfo');

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('border-indigo-500', 'bg-indigo-50');
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('border-indigo-500', 'bg-indigo-50');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('border-indigo-500', 'bg-indigo-50');
                const files = e.dataTransfer.files;
                if (files.length) {
                    videoInput.files = files;
                    updateFileInfo(files[0]);
                }
            });

            uploadArea.addEventListener('click', () => {
                videoInput.click();
            });

            videoInput.addEventListener('change', (e) => {
                if (e.target.files.length) {
                    updateFileInfo(e.target.files[0]);
                }
            });

            function updateFileInfo(file) {
                fileInfo.textContent = `Selected file: ${file.name}`;
                fileInfo.classList.add('text-indigo-600');
            }

            function showError(message) {
                errorAlert.textContent = message;
                errorAlert.classList.remove('hidden');
            }

            function displayFrame(frame) {
                const frameEl = document.createElement('div');
                frameEl.className = 'glass-card rounded-xl overflow-hidden';
                frameEl.innerHTML = `
                    <div class="p-4 border-b border-gray-100">
                        <h3 class="font-medium text-gray-900">Frame at ${frame.second} seconds</h3>
                    </div>
                    <div class="p-4">
                        <img src="${frame.frame_path}" alt="Frame ${frame.second}" class="w-full rounded-lg">
                        <p class="mt-4 text-gray-700">${frame.description || 'No description available'}</p>
                        <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <span>Confidence: ${frame.confidence}/10</span>
                            <span class="px-2 py-1 rounded-full ${frame.is_match ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                                ${frame.is_match ? 'Match' : 'No Match'}
                            </span>
                        </div>
                    </div>
                `;
                resultsContainer.insertBefore(frameEl, resultsContainer.firstChild);
            }

            uploadForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const video = videoInput.files[0];
                const objectStr = document.getElementById('objectInput').value;

                if (!video || !objectStr) {
                    showError('Please provide both video file and object description');
                    return;
                }

                try {
                    errorAlert.classList.add('hidden');
                    statusText.classList.remove('hidden');
                    analyzeBtn.disabled = true;
                    analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    resultsContainer.innerHTML = '';

                    const formData = new FormData();
                    formData.append('video', video);
                    formData.append('object_str', objectStr);

                    const response = await fetch('/analyze', {
                        method: 'POST',
                        body: formData
                    });

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();

                    while (true) {
                        const {value, done} = await reader.read();
                        if (done) break;

                        const text = decoder.decode(value);
                        const results = text.split('\n').filter(line => line.trim());

                        for (const result of results) {
                            try {
                                const data = JSON.parse(result);
                                if (data.status === 'success' && data.frame) {
                                    displayFrame(data.frame);
                                }
                            } catch (e) {
                                console.error('Error parsing result:', e);
                            }
                        }
                    }
                } catch (error) {
                    showError('An error occurred during analysis');
                    console.error('Error:', error);
                } finally {
                    statusText.classList.add('hidden');
                    analyzeBtn.disabled = false;
                    analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });
        });
    </script>
</body>
</html>
```