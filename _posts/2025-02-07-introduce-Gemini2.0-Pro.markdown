---
layout: single
title: "🚀谷歌重磅发布Gemini 2.0 Pro！多模态能力大幅提升，训练数据质量高，编程能力强！多维度测评轻松识别手写汉字、提取模糊扫描内容，Roo Code+Gemini 2.0 Pro编程大幅能力提升"
sidebar:
  nav: "docs"
date: 2025-02-07 00:00:00 +0800
categories: LLMs
tags: [Gemini 2.0 Pro, Gemini 2.0 Pro Experimental , Gemini, Roo Code, AIGC, 多模态大模型, LLMs]
classes: wide
author_profile: true
---

Gemini 2.0 Pro Experimental 是 Google 在 2025 年 2 月 5 日推出的最新实验性 AI 模型，作为 Gemini 2.0 系列的重要组成部分。该模型在编码能力、复杂提示处理及世界知识理解方面展现了当前最先进的性能，现通过 Gemini Advanced 订阅（每月 19.99 美元）向用户开放测试。

### **本篇笔记所对应的视频：**

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1knNhetETR/)
- [👉👉👉 通过YouTube观看](https://youtu.be/O_DJwXDEMiA)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。


### 核心特性

**增强推理与编码能力**

- 在 GPQA、MMLU-Pro 等 30+ 项基准测试中创下系列最高分
- 支持 200 万 tokens 的上下文窗口，可深度分析复杂文档和代码库
- 集成代码执行和 Google 搜索调用能力，实现动态信息验证

**技术规格**

| 指标 | 参数 |
| --- | --- |
| 输出速度 | 137.7 tokens/秒 |
| 首 token 延迟 | 0.72 秒 |
| 多模态支持 | 文本输入/输出（图像生成即将推出） |
| API 定价 | 开发者可通过 Google AI Studio/Vertex AI 获取 |

### 🚀视频中的测试题

1️⃣一个农场里有牛和鸵鸟一共75只。
已知牛和鸵鸟一共196条腿，牛角和鸵鸟头加起来一共98个。
问有多少头牛、多少只鸵鸟？

---

2️⃣A带着12块钱去超市买饮料。饮料分为大瓶和小瓶。
其中大瓶(500毫升)3块钱，小瓶(100毫升)1块钱。
喝完之后的空瓶可以继续换饮料，3个大空瓶可以换1个大瓶饮料，
1个大空瓶可以换1个小瓶饮料，4个小空瓶可以换1个小瓶的饮料，5个小空瓶可以换1个大瓶的饮料。
问A最多可以喝多少毫升饮料。

---

3️⃣三个数的和是15，两两相乘的积分别是21、28、35。
求这三个数分别是多少。

---

4️⃣一个光子从一颗距离地球100光年的恒星发出。
对于这个光子而言，从发出到被地球上的望远镜接收到这段时间是多久？为什么？

---

5️⃣编写一个 Python 程序，显示一个球在旋转的六边形内弹跳。
小球应受到重力和摩擦力的影响，而且必须真实地从旋转的墙壁上弹起

---

6️⃣用html+css+js实现一个赛博朋克风格的扫雷游戏，游戏分为简单、中等和高难度三个模式，用户点击开始后游戏开始，用户踩到雷之后会出现爆炸效果，用户踩到雷之后可以点击重新开始

### 🚀六边形小球源代码

```bash
import pygame
import math
import sys

# 初始化 pygame
pygame.init()

# 屏幕设置
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("在旋转六边形中弹跳的球")

# 颜色
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)

# 六边形参数
hex_radius = 150
hex_center = (width // 2, height // 2)
hex_angle = 0  # 初始旋转角度
hex_rotation_speed = 0.02  # 角速度

# 球的参数
ball_radius = 15
ball_pos = [hex_center[0], hex_center[1] - hex_radius + ball_radius + 10]  # 初始位置
ball_velocity = [0, 0]  # 初始速度
gravity = 0.15  # 重力加速度
friction = 0.998  # 摩擦系数（用于减速）
restitution = 0.6  # 弹性系数（从墙壁上弹起）

def rotate_point(point, center, angle):
    """绕中心点旋转一个点。"""
    x, y = point
    cx, cy = center
    rad = math.radians(angle)
    rotated_x = cx + (x - cx) * math.cos(rad) - (y - cy) * math.sin(rad)
    rotated_y = cy + (x - cx) * math.sin(rad) + (y - cy) * math.cos(rad)
    return rotated_x, rotated_y

def get_hexagon_vertices(center, radius, angle):
    """计算旋转六边形的顶点。"""
    vertices = []
    for i in range(6):
        vertex_angle = i * 60 + angle  # 以度为单位
        x = center[0] + radius * math.cos(math.radians(vertex_angle))
        y = center[1] + radius * math.sin(math.radians(vertex_angle))
        vertices.append((x, y))
    return vertices

def draw_hexagon(center, radius, angle):
    """绘制旋转的六边形。"""
    vertices = get_hexagon_vertices(center, radius, angle)
    pygame.draw.polygon(screen, white, vertices, 2)

def collide_with_hexagon(ball_pos, ball_velocity, hex_vertices):
    """检测并处理球与六边形边之间的碰撞。"""

    ball_x, ball_y = ball_pos

    for i in range(6):
        # 获取六边形的边
        v1 = hex_vertices[i]
        v2 = hex_vertices[(i + 1) % 6]  # 模运算符使最后一侧与第一侧连接

        # 将边表达为法线向量（指向远离边的方向）
        edge_x, edge_y = v2[0] - v1[0], v2[1] - v1[1]
        normal_x, normal_y = -edge_y, edge_x

        # 将法线归一化
        normal_length = math.sqrt(normal_x ** 2 + normal_y ** 2)
        if normal_length == 0:  # 避免被零除（在六边形过小时发生）
            continue
        normal_x /= normal_length
        normal_y /= normal_length

        # 计算球到六边形的距离
        dist_x, dist_y = ball_x - v1[0], ball_y - v1[1]
        distance = dist_x * normal_x + dist_y * normal_y

        if distance < ball_radius:
            # 碰撞检测

            # 修正小球位置，使小球不在六边形内部
            overlap = ball_radius - distance
            ball_x += normal_x * overlap
            ball_y += normal_y * overlap

            # 计算球在法线方向的速度分量
            dot_product = ball_velocity[0] * normal_x + ball_velocity[1] * normal_y

            # 计算反射速度（应用弹性）
            new_velocity_x = ball_velocity[0] - 2 * dot_product * normal_x * restitution
            new_velocity_y = ball_velocity[1] - 2 * dot_product * normal_y * restitution

            return [ball_x, ball_y], [new_velocity_x, new_velocity_y]

    return ball_pos, ball_velocity  # 没有发生碰撞

# 游戏循环
clock = pygame.time.Clock()
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 更新六边形旋转
    hex_angle = (hex_angle + hex_rotation_speed) % 360  # 以度为单位

    # 更新球的物理属性
    ball_velocity[1] += gravity  # 施加重力
    ball_pos[0] += ball_velocity[0]
    ball_pos[1] += ball_velocity[1]

    ball_velocity[0] *= friction  # 应用摩擦力
    ball_velocity[1] *= friction

    # 碰撞检测和解析
    hex_vertices = get_hexagon_vertices(hex_center, hex_radius, hex_angle * 180 / math.pi)  # 六边形角度转换为度
    ball_pos, ball_velocity = collide_with_hexagon(ball_pos, ball_velocity, hex_vertices)

    # 保持球在屏幕内部（以防万一）
    if ball_pos[0] - ball_radius < 0:
        ball_pos[0] = ball_radius
        ball_velocity[0] *= -restitution
    if ball_pos[0] + ball_radius > width:
        ball_pos[0] = width - ball_radius
        ball_velocity[0] *= -restitution
    if ball_pos[1] - ball_radius < 0:
        ball_pos[1] = ball_radius
        ball_velocity[1] *= -restitution
    if ball_pos[1] + ball_radius > height:
        ball_pos[1] = height - ball_radius
        ball_velocity[1] *= -restitution

    # 绘制
    screen.fill(black)  # 清除屏幕
    draw_hexagon(hex_center, hex_radius, hex_angle * 180 / math.pi)  # 将角度转换为度以进行绘制
    pygame.draw.circle(screen, red, (int(ball_pos[0]), int(ball_pos[1])), ball_radius)

    # 更新显示
    pygame.display.flip()

    # 控制帧率
    clock.tick(60)  # 60 FPS

pygame.quit()
sys.exit()
```