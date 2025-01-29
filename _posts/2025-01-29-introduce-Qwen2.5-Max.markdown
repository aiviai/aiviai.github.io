---
layout: single
title: "🚀阿里千问系列最强大模型-Qwen2.5-Max震撼发布！在线测评+API调用！Cline编程+AutoGen智能体！轻松实现任务计划AI Agents！官方基准测试得分超越DeepSeek v3！"
sidebar:
  nav: "docs"
date: 2025-01-29 00:00:00 +0800
categories: LLMs
tags: [Qwen2.5-Max, Qwen2.5, deepseek, 阿里巴巴, LLMs, AutoGen, Cline]
classes: wide
author_profile: true
---

通义千问Qwen 2.5-Max是阿里云研发的一款超大规模语言模型，它采用了MoE（专家混合）架构。这意味着它内部有多个“专家”网络，每个专家负责处理不同类型的任务，从而提高效率和性能。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV18DFpeMEps/)
- [👉👉👉 通过YouTube观看](https://youtu.be/vLVV6_Wiyps)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


**主要特点：**

- **规模庞大：** Qwen 2.5-Max 拥有超过 20 万亿个token的预训练数据和精心设计的后训练方案，使其能够在各种任务中实现高水平的性能。
- **性能领先：** 在多个基准测试中，Qwen 2.5-Max 的表现优于其他领先模型，包括 DeepSeek V3，例如 Arena-Hard、LiveBench、LiveCodeBench 和 GPQA-Diamond。它还在其他评估中展现了强大的实力，如 MMLU-Pro。
- **开放访问：** 与一些闭源模型不同，Qwen 2.5-Max 为研究和开发目的提供了对其基础模型的访问，促进了 AI 社区的进一步创新和合作。

**应用场景：**

Qwen 2.5-Max 可用于各种任务，包括：

- **文本生成：** 创作故事、文章和其他类型的创意内容。
- **代码生成：** 编写和调试多种编程语言的代码。
- **翻译：** 翻译不同语言的文本。
- **问答：** 根据给定的信息回答问题。
- **对话生成：** 进行自然且信息丰富的对话。

### 🚀测试题：

> 1️⃣两艘飞船同时从地球出发，飞船A以光速的99%的速度从地球飞往半人马座，
飞船B以光速的99.9999999999%的速度从地球飞往半人马座，
飞船B抵达半人马座后，飞船B的船员需要等待多久飞船A才能抵达半人马座？

> 2️⃣一个光子从一颗距离地球100光年的恒星发出。
对于这个光子而言，从发出到被地球上的望远镜接收到这段时间是多久？为什么？

> 3️⃣5相同大小的氢气球放一起上升的速度快，还是一个氢气球上升的速度快？

> 4️⃣一只青蛙掉进了井里，此时井里的水面距离井口10米。
青蛙每天可以往上爬2米，然后滑落1米。井里的水每天上涨1米。
请问青蛙几天能爬出井口。

> 5️⃣用python写一个程序来找出179424673是第几个质数，不要引入任何外部库

> 6️⃣为正方形内弹跳的黄色球编写一个 Python 脚本，确保正确处理碰撞检测。
使正方形缓慢旋转。
用 Python 实现它。确保球停留在正方形内

> 7️⃣编写一个Python脚本，实现一个用一个快速滚动的白色的小球撞击排成一列静止的5个红色小球

> 8️⃣用html+js+css实现一个贪吃蛇游戏，游戏运行后界面出现多个不同颜色的食物，当蛇吃到红色食物时会死掉并且游戏结束。当蛇吃到黄色食物时蛇的长度加倍。加入游戏积分功能。


### 🚀AutoGen代码

```bash
!pip install --upgrade pip
!pip install -U "autogen-agentchat" "autogen-ext[openai,magentic-one,azure]" "litellm[proxy]" nest_asyncio pyngrok yfinance google-search-results rich playwright

from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_agentchat.ui import Console
from autogen_ext.models.openai import OpenAIChatCompletionClient

from google.colab import userdata

api_key=userdata.get('QWEN_API_KEY')

## Nvidia NIM
def get_model_qwen() -> OpenAIChatCompletionClient:  # type: ignore
    return OpenAIChatCompletionClient(
        model="qwen-max-2025-01-25",
        api_key=api_key,
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
        model_capabilities={
            "json_output": True,
            "vision": False,
            "function_calling": True,
        },
    )
    
planner_agent = AssistantAgent(
    "planner_agent",
    model_client=get_model_qwen(),
    description="一个能够帮助规划行程的智能助手",
    system_message="你是一个能够根据用户需求提供旅行规划建议的智能助手。",
)

local_agent = AssistantAgent(
    "local_agent",
    model_client=get_model_qwen(),
    description="一个能够推荐当地活动和景点的在地助手",
    system_message="你是一个能够为用户推荐地道有趣的当地活动和景点的智能助手，可以充分利用所提供的任何背景信息。",
)

language_agent = AssistantAgent(
    "language_agent",
    model_client=get_model_qwen(),
    description="一个能够提供目的地语言建议的智能助手",
    system_message="你是一个能够审查旅行计划的智能助手，负责就如何最好地应对目的地的语言或沟通挑战提供重要/关键提示。如果计划中已经包含了语言提示，你可以说明计划是令人满意的，并解释原因。",
)

travel_summary_agent = AssistantAgent(
    "travel_summary_agent",
    model_client=get_model_qwen(),
    description="一个能够总结旅行计划的智能助手",
    system_message="你是一个能够整合其他助手的所有建议和意见并提供详细最终旅行计划的智能助手。你必须确保最终计划是完整且连贯的。你的最终回复必须是完整的计划。当计划完整且所有观点都已整合后，你可以回复'TERMINATE'。",
)

termination = TextMentionTermination("TERMINATE")
group_chat = RoundRobinGroupChat(
    [planner_agent, local_agent, language_agent, travel_summary_agent], termination_condition=termination
)
await Console(group_chat.run_stream(task="制定一个泰国三日游计划."))
```

### 网页版中正方形和小球的代码，请自行测试：

```bash
#pip install numpy matplotlib
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# 定义元胞自动机的大小
GRID_SIZE = 50
# 定义动画的更新间隔（毫秒）
INTERVAL = 200

# 初始化随机网格
def init_grid(size):
    return np.random.choice([0, 1], size=(size, size), p=[0.8, 0.2])

# 计算下一个状态
def update(frameNum, img, grid, size):
    new_grid = grid.copy()
    for i in range(size):
        for j in range(size):
            # 计算邻居的总和（使用周期性边界条件）
            total = int((grid[i, (j-1)%size] + grid[i, (j+1)%size] +
                         grid[(i-1)%size, j] + grid[(i+1)%size, j] +
                         grid[(i-1)%size, (j-1)%size] + grid[(i-1)%size, (j+1)%size] +
                         grid[(i+1)%size, (j-1)%size] + grid[(i+1)%size, (j+1)%size]))
            
            # 根据康威生命游戏规则更新状态
            if grid[i, j] == 1:
                if (total < 2) or (total > 3):
                    new_grid[i, j] = 0
            else:
                if total == 3:
                    new_grid[i, j] = 1
    
    # 更新图像
    img.set_data(new_grid)
    grid[:] = new_grid[:]
    return img,

# 主函数
def main():
    # 初始化网格
    grid = init_grid(GRID_SIZE)

    # 设置绘图
    fig, ax = plt.subplots()
    img = ax.imshow(grid, interpolation='nearest', cmap='Greys')
    ani = animation.FuncAnimation(fig, update, fargs=(img, grid, GRID_SIZE),
                                  frames=10,
                                  interval=INTERVAL,
                                  save_count=50)

    plt.show()

if __name__ == '__main__':
    main()
```

### Cline编写的贪吃蛇代码，请自行测试：

```bash
#index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container">
        <canvas id="game-canvas"></canvas>
        <div id="score">Score: 0</div>
        <div id="game-over" style="display: none;">Game Over! Final Score: <span id="final-score">0</span></div>
    <button id="start-button" style="display: block; margin-top: 20px;">Start Game</button>
    </div>
    <script src="script.js"></script>
</body>
</html>

#style.css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #000;
    color: #fff;
    font-family: Arial, sans-serif;
}

#game-container {
    position: relative;
}

#game-canvas {
    border: 2px solid #fff;
    display: block;
}

#score {
    margin-top: 10px;
    font-size: 20px;
}

#game-over {
    margin-top: 20px;
    font-size: 24px;
    color: red;
}

#script.js
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let score = 0;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let gameStarted = false;
let gameLoopInterval;

document.getElementById('start-button').addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('start-button').style.display = 'none';
        gameLoopInterval = setInterval(() => {
            if (foods.length < 5) {
                createFood();
            }
            gameLoop();
        }, 100);
    }
});

function startGame() {
    gameStarted = true;
    document.getElementById('start-button').style.display = 'none';
    gameLoopInterval = setInterval(() => {
        if (foods.length < 5) {
            createFood();
        }
        gameLoop();
    }, 100);
}

let foods = [];
let foodColors = ['green', 'red', 'yellow'];
let foodEffects = {
    'red': () => gameOver(),
    'yellow': () => doubleSnakeLength()
};

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
}

function createFood() {
    const color = foodColors[Math.floor(Math.random() * foodColors.length)];
    foods.push({ ...getRandomPosition(), color });
}

function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
}

function updateScore(points) {
    score += points;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function gameOver() {
    clearInterval(gameLoop);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('final-score').innerText = score;
}

function doubleSnakeLength() {
    const tail = snake[snake.length - 1];
    for (let i = 0; i < snake.length; i++) {
        snake.push({ ...tail });
    }
    updateScore(snake.length);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width / boxSize || head.y >= canvas.height / boxSize) {
        return gameOver();
    }

    snake.unshift(head);

    for (let i = 0; i < foods.length; i++) {
        if (foods[i].x === head.x && foods[i].y === head.y) {
            updateScore(10);
            if (foodEffects[foods[i].color]) {
                foodEffects[foods[i].color]();
            }
            foods.splice(i, 1);
            break;
        } else {
            snake.pop();
        }
    }

    foods.forEach(food => drawBox(food.x, food.y, food.color));
    snake.forEach(segment => drawBox(segment.x, segment.y, 'lime'));

    if (Math.random() < 0.05) {
        createFood();
    }
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Initialize foods but don't start the game loop until the start button is clicked
for (let i = 0; i < 5; i++) {
    createFood();
}

```