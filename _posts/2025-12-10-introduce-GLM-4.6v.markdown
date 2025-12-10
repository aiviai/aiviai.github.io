---
layout: single
title: "🚀【深度实测】智谱GLM-4.6V登场！9B模型支持本地部署，视觉能力全面SOTA，更有原生Function Calling加持！连模糊的 PDF 和潦草公式都能识别"
sidebar:
  nav: "docs"
date: 2025-12-10 00:00:00 +0800
categories: LLMs
tags: [GLM, GLM-4.6 , GLM-4.6v, LLM, VLM, 智谱, 智谱AI, AIGC, AGI]
classes: wide
author_profile: true
---



刚刚，智谱AI正式发布了 **GLM-4.6V** 系列多模态模型！作为国产大模型的领军者，这次更新不仅带来了性能上的全面提升，更是在“视觉感知”到“行动执行”的链路上迈出了关键一步。

我也在第一时间拿到了模型，并进行了一整天的高强度**“地狱级”实测**。结果如何？到底是“挤牙膏”还是“王炸”？这篇文章带你一探究竟！



> 🚀本篇笔记所对应的视频：
> - [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1rb2tBFEZi/)
> - [👉👉👉 通过YouTube观看](https://youtu.be/UJuDZNykOIc)
> - [👉👉👉 Subagents视频](https://youtu.be/GjlkRcNNONo)
> - [👉👉👉 Gemini CLI视频](https://youtu.be/v41xKxZmygU)
> - [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
> - [👉👉👉 SuperClaude视频](https://youtu.be/bMO13RNjvBk)
> - [👉👉👉 Claudia视频](https://youtu.be/WIwW7V56wxE)
> - [👉👉👉 Task Master视频](https://youtu.be/6dhOUJ_vnIY)
> - [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
> - [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
> - [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
> - [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
> - [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
> - 👉👉👉 我的微信：stoeng
> - 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。
>
> 🔥AI智能体相关视频
> - [AI智能体视频 1](https://youtu.be/vYm0brFoMwA)
> - [AI智能体视频 2](https://youtu.be/szTXELuaJos)
> - [AI智能体视频 3](https://youtu.be/szTXELuaJos)
> - [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)
> - [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)
> - [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  



## 01 全系升级：从端侧到云端的全能选手

这次GLM-4.6V系列主要包含两款核心模型，精准覆盖了不同的使用场景：

- **⚡️ GLM-4.6V-Flash (9B)：轻量级之王**
    - **定位：** 专为本地部署和低延迟应用优化。
    - **亮点：** 仅9B参数，普通显卡即可跑起来，响应速度极快。
- **☁️ GLM-4.6V (106B)：最强性能怪兽**
    - **定位：** 专为云端和高性能集群设计，处理复杂任务。
    - **亮点：** 视觉理解精度达到同等参数规模 **SOTA（目前最佳）**。

**🔥 核心优势一览：**

1. **原生Function Calling（函数调用）：** 首次将Function Calling原生融入视觉模型。这意味着模型不仅能“看懂”图片，还能根据图片内容直接调用工具去“干活”，打通了视觉感知到可执行行动的闭环。
2. **超长上下文：** 支持 **128K context**。它不需要将文档转为纯文本，而是直接理解文档的布局、图表、图形，哪怕是包含大量图像的复杂文档也能精准拿捏。
3. **屠榜级表现：** 在通用视觉问答、OCR、图表理解、空间感知等基准测试中，得分全面超越 GLM-4.5V、Qwen-VL、Kimi VL 以及 STEP 32-21B 系列。
4. **前端神器：** 支持前端复现与可视化编辑，一张截图直接变代码。

---

## 02 硬核实测：真金不怕火炼

光看参数没用，是骡子是马，拉出来遛遛。视频中，我们从本地部署到云端API，对这两款模型进行了全方位的综合能力测试。

### 🛠️ 场景一：GLM-4.6V-Flash 本地部署初体验

对于开发者来说，能本地跑才是真理。

我们使用 Ubuntu 系统 + RTX A6000 显卡，通过 vLLM 框架成功部署了 9B 参数的 Flash 版本。部署过程非常丝滑，同时也支持 LM Studio 一键下载使用。

测试结果：

上传一张“派对角落里戴帽子的男性”趣味图，让模型配内心独白。

> 模型输出： “这派对气氛倒是挺热闹，不过我好像不太习惯这种喧哗，还是先看看大家玩得开心吧……”
> 

**评价：** 9B的小模型精准捕捉到了人物的神态和派对的氛围，本地推理速度极快，完全可用于生产环境。

---

### 💻 场景二：UI截图变代码（前端工程师狂喜？）

我们直接给 106B 模型投喂了一张布局非常复杂的仪表盘 UI 截图，要求它“用 React + Tailwind CSS 百分百复刻”。

测试结果：

模型迅速给出了完整的代码。

- **优点：** 整体布局还原度极高，甚至贴心地为原图中的火箭图标预留了图片位。
- **不足：** 原图中图表卡片的宽度比较宽，模型复刻版稍微窄了一些（但这完全可以通过多轮对话微调）。

**评价：** 这绝对是前端开发的效率神器，基本实现了“截图即代码”。

---

### 📝 场景三：极限OCR挑战（手写、模糊、公式）

多模态模型最常用的场景就是 OCR，这次我们上了“大刑伺候”：

1. **复杂笔记：** 提取包含序号、列表的笔记图片。
    - ✅ **结果：** 格式、内容完全正确。
2. **高糊PDF扫描件：** 肉眼几乎无法识别的小字，且带有噪点。
    - ✅ **结果：** 标题、页码、正文全对！唯一一处错误是因为单元格被噪点完全遮挡，除此之外，连图表描述和小字都提取出来了。
3. **潦草手写公式：** 拍摄的复杂排版手写数学公式。
    - ✅ **结果：** 无论是竖排内容还是复杂的数学符号，全部识别正确。

**评价：** 在 OCR 领域，GLM-4.6V 的表现堪称惊艳，抗干扰能力极强。

---

### 🔍 场景四：视觉“找茬”与细粒度识别

1. **逻辑判断：** 给它看一张“伪·清明上河图”，里面藏着摩托艇和自行车。
    - ✅ **结果：** 秒回“时代错乱”，精准指出现代交通工具不匹配，并给出了红框标注（Bounding Box）。
2. **物体检测：** 在大图中寻找隐蔽的鳄鱼和恐龙。
    - ✅ **结果：** 即使放大后很难找，模型依然给出了准确的坐标标注。
3. **专家级分类：** 10只不同品种的猫、10只不同品种的狗并排站。
    - ✅ **结果：** 从左到右，纽芬兰犬、柴犬、边牧……全部正确识别，一个没乱。

---

### 📊 场景五：图文混排与论文解析

这也是本次的一大亮点。

- **新闻生成：** 搜索2025新舰试飞资讯，直接生成图文并茂的新闻稿，排版专业。
- **论文解读：** 上传一篇 arXiv 的大模型微调论文，要求“翻译并输出图文公众号”。模型不仅翻译了摘要，还智能截取了论文中的架构图插入文中，可读性极高。

---

## 03 杀手锏：原生 Function Calling 实战

这是我认为最酷的功能。以往的 Vision 模型只能“看”，现在它能“做”。

我们通过 API 构建了一个 **“多模态旅行规划 Agent”**。

- **输入：** 一张手机截图，上面是简略的“新加坡三日游”备忘录。
- **任务：** 根据图片，规划一个2025年12月20日的可执行行程。

执行过程：

代码后台显示，模型先是读取图片，识别出行程是“滨海湾、文化乐园、自然离岛”三天主题，然后自主调用了我们预设的工具函数。

最终结果：

输出了一份包含具体时间、交通建议、门票预订、餐饮推荐的详细方案，且预算和主题完全贴合原图。

> “此行程紧密贴合图片中的景点和主题，兼顾探索与文化……”
> 

这意味着，未来的 AI Agent 可以直接看着你的屏幕截图帮你订票、做表、发邮件，这才是真正的多模态助手！

---

## 总结

经过一上午的详细测评，GLM-4.6V 给我的最大感受就是：**稳且强。**

无论是 Flash 版本在本地部署的轻量高效，还是 106B 版本在复杂视觉理解、OCR 甚至代码生成上的精准度，都展示了国产开源视觉模型的巨大进步。特别是原生 Function Calling 的加入，让“视觉大模型”不仅仅是聊天工具，更成为了能干活的生产力工具。

**如果你也想体验：**

- **本地部署：** 推荐 LM Studio 或 vLLM 部署 GLM-4.6V-Flash。
- **在线体验：** 国内用户可直接前往 BigModel 平台，海外用户可使用 ZhiPu AI 平台。

---

*本文基于真实视频测评撰写，客观展示 GLM-4.6V 实际表现。*

### 🚀api:

[https://bigmodel.cn/usercenter/proj-mgmt/apikeys](https://bigmodel.cn/usercenter/proj-mgmt/apikeys)

https://z.ai/manage-apikey/apikey-list

### 🚀调用vLLM示例

```python
python -m venv .venv
source .venv/bin/activate

# 安装 vLLM（官方要求 vLLM>=0.12.0）
pip install "vllm>=0.12.0"

# 安装 Transformers 5.x RC（GLM-4V 的自定义类在这里）
pip install "transformers>=5.0.0rc0"

# 视图处理依赖
pip install pillow

vllm serve zai-org/GLM-4.6V-Flash \
  --host 0.0.0.0 \
  --port 8000 \
  --tensor-parallel-size 1 \
  --tool-call-parser glm45 \
  --reasoning-parser glm45 \
  --enable-auto-tool-choice \
  --allowed-local-media-path / \
  --mm-encoder-tp-mode data \
  --mm_processor_cache_type shm \
  --max-model-len 65536 \
  --gpu-memory-utilization 0.9

```

```python
from openai import OpenAI

# 指向你的 vLLM 服务
client = OpenAI(
    api_key="EMPTY",                    # vLLM 不校验，但字段必须存在
    base_url="http://localhost:8000/v1"
)

resp = client.chat.completions.create(
    model="zai-org/GLM-4.6V-Flash",     # 与 vllm serve 中的模型名一致
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "请用中文详细描述这张图片，并分析一下这可能是哪种场景、适合做什么用？",
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://cdn.pixabay.com/photo/2025/11/06/04/45/water-9939988_1280.jpg"
                    },
                },
            ],
        }
    ],
    max_tokens=1024,
    # 采样参数：结合模型卡推荐 + vLLM 文档
    temperature=0.8,        # 模型卡推荐值之一
    top_p=0.6,              # 模型卡推荐值之一
    extra_body={            # OpenAI 不支持的参数用 extra_body 传给 vLLM
        "top_k": 2,
        "repetition_penalty": 1.1,
    },
)

print(resp.choices[0].message.content)

```

### Function Calling代码

```python

# 如果还没装 zhipuai，可以先装一次
!pip install -q zhipuai

import os
import json
import base64
from datetime import datetime
from typing import Dict, Any, List

from zhipuai import ZhipuAI

# ================== 0. 初始化客户端（从 Colab userdata 或环境变量读取 API Key） ==================

api_key = None
try:
    from google.colab import userdata
    api_key = userdata.get("ZHIPU_API_KEY")
except Exception:
    pass

if not api_key:
    api_key = os.environ.get("ZHIPU_API_KEY")

assert api_key, "请先在 Colab userdata 或环境变量中设置 ZHIPU_API_KEY"

client = ZhipuAI(api_key=api_key)

# ================== 1. 工具函数：从本地文件读取图片并转为 data URI ==================

def encode_image_to_data_uri(path: str) -> str:
    """
    从本地路径读取图片，转成 data:image/...;base64,xxxx 形式
    只支持常见 jpg/jpeg/png，就够我们这个 demo 用了。
    """
    assert os.path.exists(path), f"图片文件不存在: {path}"

    ext = os.path.splitext(path)[1].lower()
    if ext in [".jpg", ".jpeg"]:
        mime = "image/jpeg"
    elif ext in [".png"]:
        mime = "image/png"
    else:
        # 默认按 jpeg 处理
        mime = "image/jpeg"

    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    data_uri = f"data:{mime};base64,{b64}"
    print(f"[Image] 已从本地读取图片 {path} 并转为 base64，长度 = {len(b64)} chars")
    return data_uri

def safe_print_messages_for_log(messages: List[Dict[str, Any]]) -> None:
    """
    打日志时过滤掉 image_url 里的 base64 内容，防止 Colab 页面卡死。
    无论是 'data:image/...;base64,xxxx' 还是 '/9j/4Q...'，统统只显示前几十个字符 + 长度。
    """
    import copy
    masked = copy.deepcopy(messages)

    for m in masked:
        content = m.get("content")
        # content 可能是字符串，也可能是 list（多模态）
        if isinstance(content, list):
            for part in content:
                if isinstance(part, dict) and part.get("type") == "image_url":
                    img = part.get("image_url", {})
                    url = img.get("url")
                    if isinstance(url, str):
                        # 不管是不是 data:image 或裸 base64，一律截断
                        short = url[:40]
                        img["url"] = f"{short}...<image base64 omitted, len={len(url)}>"
        # 如果 content 是字符串且非常长，也可以选择截断（可选）
        elif isinstance(content, str) and len(content) > 500:
            m["content"] = content[:500] + f"...<omitted long content, len={len(content)}>"

    print(json.dumps(masked, ensure_ascii=False, indent=2))

# ================== 2. 业务函数：plan_trip ==================

def plan_trip(
    destination: str,
    start_date: str,
    days: int,
    budget_level: str,
    interests: List[str] = None,
) -> Dict[str, Any]:
    """
    旅行规划函数：带参数校验和结构化输出。
    注意：这里完全不处理图像，图像只在 LLM 侧用于“决定这些参数”。
    """
    interests = interests or []

    # 基本校验
    if days <= 0 or days > 30:
        return {
            "success": False,
            "error_code": "INVALID_DAYS",
            "error": "行程天数必须在 1~30 天之间",
        }

    try:
        start = datetime.fromisoformat(start_date)
    except Exception:
        return {
            "success": False,
            "error_code": "INVALID_DATE",
            "error": "start_date 必须是 ISO 格式，例如 2025-12-01",
        }

    if budget_level not in ("economy", "standard", "luxury"):
        return {
            "success": False,
            "error_code": "INVALID_BUDGET",
            "error": "budget_level 必须是 economy/standard/luxury 之一",
        }

    daily_budget_map = {
        "economy": 500,
        "standard": 1000,
        "luxury": 2500,
    }
    total_budget = daily_budget_map[budget_level] * days

    outline = [
        {
            "day": i + 1,
            "title": f"第 {i+1} 天：城市探索 & 美食",
            "notes": "白天城市地标 + 晚上当地特色餐厅（示例）",
        }
        for i in range(days)
    ]

    return {
        "success": True,
        "destination": destination,
        "start_date": start.strftime("%Y-%m-%d"),
        "days": days,
        "budget_level": budget_level,
        "estimated_total_budget_cny": total_budget,
        "interests": interests,
        "outline": outline,
    }

# ================== 3. tools 定义（Function Calling 标准 JSON Schema） ==================

TRIP_TOOL = [
    {
        "type": "function",
        "function": {
            "name": "plan_trip",
            "description": (
                "根据目的地、出行日期、天数和预算，生成一个结构化旅行计划。"
                "当用户提供旅游海报/行程截图/目的地描述时，应基于图像和文字综合理解后调用本函数，"
                "禁止跳过工具直接编行程。"
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "destination": {
                        "type": "string",
                        "description": "城市或地区，例如：新加坡、东京、巴黎、成都。可以从宣传海报或截图中识别。"
                    },
                    "start_date": {
                        "type": "string",
                        "description": "出发日期，ISO 格式，如 2025-12-20。若海报未写具体日期，可让用户补充。"
                    },
                    "days": {
                        "type": "integer",
                        "description": "旅行天数（1~30）。可从海报/行程截图推断，例如“新加坡3日游”。",
                        "minimum": 1,
                        "maximum": 30
                    },
                    "budget_level": {
                        "type": "string",
                        "enum": ["economy", "standard", "luxury"],
                        "description": "预算档位：economy / standard / luxury。可根据用户文字补充来判断。"
                    },
                    "interests": {
                        "type": "array",
                        "description": "兴趣偏好，如美食、博物馆、夜生活、沙滩、购物等，可从图像和文字中综合推断。",
                        "items": {"type": "string"},
                    },
                },
                "required": ["destination", "start_date", "days", "budget_level"],
            },
        },
    }
]

# ================== 4. 工具执行路由 ==================

def execute_trip_tool(name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
    if name == "plan_trip":
        return plan_trip(**arguments)
    return {
        "success": False,
        "error_code": "UNKNOWN_TOOL",
        "error": f"unknown tool: {name}",
    }

# ================== 5. 多模态 + Function Calling 主流程（使用本地图片） ==================

def ask_glm46v_with_local_image_for_trip_plan(image_path: str, user_instruction: str) -> str:
    """
    image_path: Colab 本地图片路径，例如 /content/test.jpg
    user_instruction: 搭配图片的文字指令，例如：
        "根据这张新加坡3日精华游行程图，帮我规划一个实际可执行的 3 天行程。"
    """
    data_uri = encode_image_to_data_uri(image_path)

    messages: List[Dict[str, Any]] = [
        {
            "role": "system",
            "content": "你是一个多模态旅行规划 Agent，能够看懂旅游海报/行程截图，并通过调用 plan_trip 工具生成结构化行程。",
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {"url": data_uri},  # ✅ 按官方要求传 data:image/...;base64,...
                },
                {
                    "type": "text",
                    "text": (
                        user_instruction
                        + " 请先仔细观察图片中的目的地、天数、玩法主题等信息，"
                        + "再决定 plan_trip 的参数。不要直接编造参数。"
                    ),
                },
            ],
        },
    ]

    # -------- [Step 0] 打印发送给模型的请求（脱敏后的） --------
    print("\n[Step 0] 发送给模型的 messages（已隐藏 base64 具体内容）：")
    safe_print_messages_for_log(messages)

    print("\n[Step 0] 发送给模型的 tools (TRIP_TOOL)：")
    print(json.dumps(TRIP_TOOL, ensure_ascii=False, indent=2))

    # -------- [Step 1] 第一次调用：多模态理解 + 是否调用工具 --------
    resp = client.chat.completions.create(
        model="glm-4.6v",
        messages=messages,
        tools=TRIP_TOOL,
        tool_choice="auto",
    )

    message = resp.choices[0].message
    message_dict = message.model_dump()

    print("\n[Step 1] 第一轮模型输出 message（含 tool_calls 的完整结构）：")
    print(json.dumps(message_dict, ensure_ascii=False, indent=2))

    messages.append(message_dict)

    if not message.tool_calls:
        print("\n[Step 1.1] 本轮没有 tool_calls，模型直接给出回答（只用图像+文本推理，无工具）。")
        return message.content

    # -------- [Step 2] 执行每一个 tool_call --------
    for idx, tool_call in enumerate(message.tool_calls):
        fn_name = tool_call.function.name
        raw_args = tool_call.function.arguments or "{}"
        args = json.loads(raw_args)

        print(f"\n[Step 2] 第 {idx+1} 个 tool_call：")
        print(f"[Step 2] 函数名: {fn_name}")
        print(f"[Step 2] 原始 arguments 字符串: {raw_args}")
        print("[Step 2] 解析后的 arguments dict:")
        print(json.dumps(args, ensure_ascii=False, indent=2))

        result = execute_trip_tool(fn_name, args)

        print("[Step 2] 本地函数执行结果 (tool result)：")
        print(json.dumps(result, ensure_ascii=False, indent=2))

        tool_message = {
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result, ensure_ascii=False),
        }
        messages.append(tool_message)

        print("\n[Step 2] 追加到 messages 的 tool 消息：")
        print(json.dumps(tool_message, ensure_ascii=False, indent=2))

    # -------- [Step 3] 打印带 tool 结果的 messages（同样做脱敏） --------
    print("\n[Step 3] 携带 tool 结果后，准备发送给模型的完整 messages（已隐藏 base64）：")
    safe_print_messages_for_log(messages)

    # -------- [Step 4] 第二次调用：基于工具结果生成最终回答 --------
    final = client.chat.completions.create(
        model="glm-4.6v",
        messages=messages,
        tools=TRIP_TOOL,
    )

    final_message = final.choices[0].message
    final_message_dict = final_message.model_dump()

    print("\n[Step 4] 第二轮模型输出 message（最终回答 + 内部结构）：")
    print(json.dumps(final_message_dict, ensure_ascii=False, indent=2))

    print("\n[Step 4] 最终返回给用户的 content：")
    print(final_message.content)

    return final_message.content

# ================== 6. 实测调用（使用 /content/test.jpg） ==================

if __name__ == "__main__":
    # 先确保你已经把那张“新加坡3日精华游行程图”上传为 /content/test.jpg
    IMAGE_PATH = "/content/test.jpg"

    USER_INSTRUCTION = "根据这张新加坡3日精华游行程图，帮我规划一个2025年12月20日实际可执行的 3 天行程。"

    print("\n================ 开始调用 ask_glm46v_with_local_image_for_trip_plan ================\n")
    answer = ask_glm46v_with_local_image_for_trip_plan(IMAGE_PATH, USER_INSTRUCTION)

    print("\n================ 函数返回值（给前端 / 用户的文本） ================\n")
    print(answer)
```