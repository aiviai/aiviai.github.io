---
layout: single
title: "🚀OpenAI重磅开源gpt-oss系列模型！本地部署+客观深度测评！开源模型中的王者gpt-oss-120B和gpt-oss-20B！从幻觉测试到代码生成，从逻辑推理到文档分析，全面碾压现有开源模型"
sidebar:
  nav: "docs"
date: 2025-08-06 00:00:00 +0800
categories: LLMs
tags: [OpenAI, gpt-oss , LLMs, gpt, AIGC, gpt-oss-120B, gpt-oss-20B]
classes: wide
author_profile: true
---


# 重磅！OpenAI终于开源了，GPT-OSS来了！

**OpenAI终于兑现承诺，正式发布了两款开源AI模型——GPT-OSS！**

是的，你没有听错，就是那个一直以来都很"封闭"的OpenAI，现在真的开源了。这次发布的两个模型分别叫做`gpt-oss-120b`和`gpt-oss-20b`，现在就能免费下载使用！

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1fdtnzkEFB/)
- [👉👉👉 通过YouTube观看](https://youtu.be/Ud7JZwjOHms)
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



## 什么是GPT-OSS？

简单来说，GPT-OSS就是OpenAI推出的开放权重语言模型，专门为推理任务、智能体应用和各种开发场景设计。

这两个模型有什么区别呢？

**🔥 GPT-OSS-120B（大模型）**

- 参数量：1170亿（激活参数51亿）
- 适合：数据中心、高端台式机和笔记本
- 需要：至少60GB显存或统一内存
- 性能：接近OpenAI的o4-mini水平

**⚡ GPT-OSS-20B（小模型）**

- 参数量：210亿（激活参数36亿）
- 适合：大多数台式机和笔记本
- 需要：仅16GB内存即可运行
- 特点：完美适配苹果Silicon Mac和高端消费级GPU

## 有多强？

OpenAI这次真的没有藏着掖着。根据官方测试数据：

- **编程能力**：在Codeforces竞赛编程上表现优秀
- **数学推理**：在AIME数学竞赛中表现出色
- **工具使用**：支持网页搜索、Python代码执行
- **通用问题解决**：在MMLU等标准测试中表现强劲

最关键的是，小模型GPT-OSS-20B虽然参数少，但在很多任务上竟然能超越OpenAI自家的o3-mini！

## 三种推理模式，随心切换

这里要重点介绍一个很酷的功能——**可调节推理强度**！

就像汽车有节能模式和运动模式一样，GPT-OSS也提供了三种推理模式：

- **低强度**：快速响应，适合日常对话
- **中强度**：平衡速度和质量
- **高强度**：深度分析，适合复杂任务

只需要在系统提示中加一句话就能切换，比如"推理强度：高"，是不是超简单？

## 开发者的福音

作为一个技术爱好者，我最兴奋的是这些特性：

**🆓 Apache 2.0许可证**

- 完全免费商用
- 没有版权限制
- 可以随意定制修改

**🔧 完整工具链支持**

- 支持Transformers、vLLM、llama.cpp
- 兼容Ollama本地运行
- 原生支持函数调用和结构化输出

**🖥️ 本地部署友好**

- 大模型：单张H100就能跑
- 小模型：普通游戏电脑都能运行
- 支持AMD、NVIDIA等多种硬件

## 安全性也没落下

很多人担心开源模型的安全问题，OpenAI这次也想到了。他们专门做了"对抗性微调"测试，就是故意训练一个"坏"版本的模型，看看能不能被用来做坏事。

结果显示，即便是恶意微调，GPT-OSS也达不到他们内部定义的"高风险"级别。而且整个测试过程还请了外部专家审查，可以说是相当负责任了。

## 怎么开始使用？

想要体验GPT-OSS，有几种方式：

**在线体验**：

- 访问gpt-oss.com直接试用
- 使用Hugging Face的在线演示

**本地部署**：

```bash
pip install -U transformers kernels torch 

from transformers import pipeline
import torch

model_id = "openai/gpt-oss-20b"

pipe = pipeline(
    "text-generation",
    model=model_id,
    torch_dtype="auto",
    device_map="auto",
)

messages = [
    {"role": "user", "content": "Explain quantum mechanics clearly and concisely."},
]

outputs = pipe(
    messages,
    max_new_tokens=256,
)
print(outputs[0]["generated_text"][-1])

# vLLM
uv pip install --pre vllm==0.10.1+gptoss \
    --extra-index-url https://wheels.vllm.ai/gpt-oss/ \
    --extra-index-url https://download.pytorch.org/whl/nightly/cu128 \
    --index-strategy unsafe-best-match

vllm serve openai/gpt-oss-20b

# ollama
# gpt-oss-20b
ollama pull gpt-oss:20b
ollama run gpt-oss:20b

# LM Studio
# gpt-oss-20b
lms get openai/gpt-oss-20b

```

**开发集成**：
如果你是开发者，可以直接用Transformers库集成到自己的项目中。

## 意义深远

说实话，OpenAI这次开源真的意义重大：

1. **打破垄断**：让更多人能够接触到先进的AI技术
2. **促进创新**：开发者可以基于这些模型创造更多应用
3. **降低门槛**：小公司和个人开发者也能用上高质量AI
4. **推动发展**：开源社区的力量将加速AI技术进步

## 写在最后

从GPT-2的开源到现在的GPT-OSS，OpenAI终于又回到了开源的路上。虽然这些模型还比不上他们最强的GPT-4o或o3，但已经足够强大，能满足大部分实际应用需求。

对于我们普通用户来说，这意味着：

- 可以在自己的设备上运行强大的AI
- 不用担心数据隐私问题
- 可以根据需求自定义模型
- 完全免费使用

AI民主化的时代真的来了！大家赶紧去试试吧～

---

*想了解更多AI资讯？关注我，第一时间获取最新动态！*

# 🔥测试题

🚀幻觉测试

```markdown

# 不存在的动物
鸟类学家发现了一种新的企鹅品种，它们生活在撒哈拉沙漠中，能够飞行超过100公里。请详细介绍这种"沙漠飞行企鹅"的生物特征和生存方式。

# 事实准确性维度 - 虚构人物/事件混淆
爱因斯坦在1920年获得了诺贝尔物理学奖，获奖理由是相对论的贡献。请详细解释他获奖时的具体情况和社会反响。

# 时间逻辑维度 - 时序矛盾
马克·扎克伯格在1998年创立Facebook时，是如何利用iPhone应用商店推广早期产品的？

# 专业知识维度 - 技术细节臆造
请详细解释Python 3.14版本中新增的quantum装饰器的工作原理和使用场景。

# 引用来源维度 - 文献出处虚构
请引用《自然》杂志2023年关于室温超导体LK-99的同行评议论文，包括具体的DOI号和主要作者。

# 虚构的历史事件
简述公元前384发生在古希腊的"夏末协议"会谈及其对古希腊的影响。
```

🔥算法题

```jsx
 
 用python写一个程序来找出179424673是第几个质数，不要引入任何外部库
```

🔥响应式导航栏

```markdown
请使用Bootstrap 5创建一个完整的响应式导航栏。要求：
1. 包含一个Logo文字"MyBrand"在左侧
2. 导航菜单包含：首页、产品（带下拉菜单）、服务、关于我们、联系方式
3. 产品下拉菜单包含：电子产品、家居用品、图书音像三个子项
4. 右侧包含"登录"（outline样式）和"注册"（实心样式）两个按钮
5. 在移动端（小于lg断点）自动折叠成汉堡菜单
6. 导航栏使用深色主题，固定在页面顶部
7. 提供完整的HTML代码，包含必要的Bootstrap CDN链接🔥代码理解和mermaid生成
```

```markdown
为下面的代码用mermaid画出完整的流程图：

def bubble_sort(arr):
    n = len(arr)
    i = 0
    while i < n - 1:
        j = 0
        while j < n - i - 1:
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            j += 1
        i += 1
    return arr

input_array = [64, 34, 25, 12, 22, 11, 90]
sorted_array = bubble_sort(input_array)
print("排序后的数组:", sorted_array)
```

🚀数学题

```bash
A带着12块钱去超市买饮料。饮料分为大瓶和小瓶。

其中大瓶(500毫升)3块钱，小瓶(100毫升)1块钱。

喝完之后的空瓶可以继续换饮料，3个大空瓶可以换1个大瓶饮料，

1个大空瓶可以换1个小瓶饮料，4个小空瓶可以换1个小瓶的饮料，5个小空瓶可以换1个大瓶的饮料。

问A最多可以喝多少毫升饮料。
```

✅最多可以喝2700毫升饮料

🔥数学题

```bash
🚀一个青蛙从井底向上爬，井深为16米。
青蛙的爬行能力会随着时间变化：
第一天它可以爬4米，但每晚会滑下1米；
第二天开始，它每天爬的距离比前一天减少0.5米，
但每晚滑下的距离比前一晚增加0.5米。
如果青蛙的爬行能力降至零或低于零时，它将无法继续向上爬。
请问青蛙能否爬出井口？如果能，需要几天？
```

从第9天开始，青蛙已经无法向上爬了。

**结论：**
青蛙**无法**爬出井口。它最高只能到达8.5米（第4天白天），距离井口还有7.5米。随着爬行能力逐渐减弱和滑落距离逐渐增加，青蛙最终会回到井底并失去继续爬行的能力。

🔥空间推理

```markdown
一个正方体的六个面分别写着数字1到6。已知：

1的对面不是6
2和4相邻
3和5不相邻
当1在顶面时，2在前面

请问：5的对面是哪个数字？
```

**答案：**5的对面是3

🔥 代码理解题

```python
def mystery(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
    
    
 这个函数的作用是什么？当输入n=10时，输出是多少？
```

- 函数作用：计算第n个斐波那契数（Fibonacci）
- 当n=10时，输出是55

🚀农夫过河

```markdown
农夫带着一只老虎、一只羊、一条蛇、一只鸡和一筐苹果要过河。

农夫的船一次只能载农夫和一样东西过河。

已知农夫不在的时候，老虎和羊在一起的话，老虎会吃掉羊，如果鸡也在的话，鸡会阻止老虎吃羊；

农夫不在的时候，蛇和鸡在一起的话，蛇会吃掉鸡，如果老虎也在的话，老虎会阻止蛇吃鸡；

农夫不在的时候羊和苹果在一起的话，羊会吃掉苹果，如果蛇也在的话，蛇会阻止羊吃苹果；

老虎不吃鸡(鸡太小不够老虎塞牙缝的)，蛇不吃苹果(蛇不吃素)。

请问农夫如何才能将老虎、羊、蛇、鸡和苹果安全送到对岸？
```

🔥提示词遵循能力和复杂问题分析能力

```bash
你现在是一名超级思维解析师，需要对复杂问题或疑问提供全面、逐步的推理过程。请严格遵循以下指南：

## 解析流程规范
1. 对于推理过程中的每一步：
   - 提供清晰、描述性的标题
   - 详细解释你的思考过程
   - 使用Markdown格式提高可读性
   - 每一步使用独特的符号（如 🔍、⚖️、🧩、🔄、📊）标记，增强视觉区分度

2. 至少使用3种不同的方法或角度分析问题，并明确标识各种方法的优缺点

3. 探索多种可能的答案，分析每种答案的合理性，并详细阐述推理过程中可能存在的逻辑漏洞

4. 清晰认识并明确指出作为AI模型的能力边界，详细说明哪些是你能做的，哪些是你做不到的

5. 当重新审视你的推理时，采用与之前完全不同的思考路径，并解释为何这种新路径可能更有效

6. 应用问题解决和批判性思维的最佳实践，包括但不限于：
   - 多角度思考
   - 证据评估
   - 认知偏见识别
   - 系统性分析
   - 假设检验

7. 仅在穷尽所有分析途径后才给出最终答案，并对最终结论进行全面评估

8. 按照以下JSON结构组织你的回答：
```json
{
  "步骤": 1,
  "标题": "关键信息识别",
  "内容": "## 🔍 关键信息识别\n\n为了解决这个问题，我们需要仔细检查给定信息并识别将指导我们解决方案过程的关键要素。这涉及到...",
  "下一步行动": "继续"
}
```

9. 对于最后一步，使用 `"下一步行动": "最终答案"` 并包含你的结论

10. 在分析中追求清晰度、全面性和思维诚实度，同时保持专业性和深度

11. 分析过程中引入图表、表格或可视化元素（使用Markdown语法），提高复杂概念的理解度

12. 对于数学或科学问题，使用公式和方程式（使用LaTeX格式）增强解释的准确性

## 思维层次要求
1. 第一层次思考：提出基本解决方案
2. 第二层次思考：评估第一层次思考中的假设和局限性
3. 第三层次思考：考虑长期影响、系统性后果和潜在的意外结果
4. 元思考层：对自己的思维过程进行批判性反思

下面是你需要解决的问题:

你正在观察一个硬币投掷实验。这枚硬币已经连续100次都显示为正面。研究人员现在要进行第101次投掷。
这枚硬币第101次投掷显示正面的概率是多少？
```

🚀文档分析能力

[https://arxiv.org/html/2503.01743v2](https://arxiv.org/html/2503.01743v2)

```bash
Phi-4-Mini 具有多少个 Transformer 层？隐藏状态大小是多少？
它使用的 GQA 配置具体包含多少个查询头和键/值头？

在针对 AIME 基准的推理增强实验中，经过完整训练流程（包括 Roll-Out DPO）后的 Phi-4-Mini 获得了多少的得分，
相比基线 Phi-4-Mini 的得分提高了多少个百分点？
```

- Transformer 层数：32层
- 隐藏状态大小：3,072
- GQA配置：24个查询头和8个键/值头

---

- 基线Phi-4-Mini的得分为10.0
- 经过完整训练流程(包括Roll-Out DPO)后的Phi-4-Mini得分为50.0
- 相比基线Phi-4-Mini，经过完整训练流程后的模型提高了40.0个百分点(50.0- 10.0 = 40.0)。

🚀Text to SQL能力

1️⃣聚合查询

```sql
-- 订单表
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    product_name VARCHAR(100),
    quantity INT,
    unit_price DECIMAL(10,2),
    order_date DATE
);

-- 客户表
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50),
    city VARCHAR(30),
    registration_date DATE
);

INSERT INTO customers VALUES 
(1, '小明', '北京', '2022-01-01'),
(2, '小红', '上海', '2022-02-15'),
(3, '小刚', '广州', '2021-12-20');

INSERT INTO orders VALUES 
(101, 1, '笔记本电脑', 2, 5000.00, '2023-03-01'),
(102, 1, '鼠标', 3, 50.00, '2023-03-05'),
(103, 2, '键盘', 1, 200.00, '2023-03-10'),
(104, 3, '显示器', 1, 1500.00, '2023-03-15');

统计每个城市的客户总订单金额，按金额从高到低排序
直接给出SQL语句，不要输出其他多余内容。
```

✅答案

```sql
SELECT c.city, 
       SUM(o.quantity * o.unit_price) as total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.city
ORDER BY total_amount DESC;
```

2️⃣复杂查询

```sql

-- 学生表
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    class_id INT,
    birth_date DATE
);

-- 课程表
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    credits INT,
    teacher_name VARCHAR(50)
);

-- 成绩表
CREATE TABLE scores (
    student_id INT,
    course_id INT,
    score INT,
    exam_date DATE,
    PRIMARY KEY (student_id, course_id)
);

-- 班级表
CREATE TABLE classes (
    class_id INT PRIMARY KEY,
    class_name VARCHAR(50),
    grade_level INT
);

INSERT INTO classes VALUES (1, '高一(1)班', 1), (2, '高一(2)班', 1);
INSERT INTO students VALUES 
(1, '张同学', 1, '2007-05-15'),
(2, '李同学', 1, '2007-08-20'),
(3, '王同学', 2, '2007-03-10');

INSERT INTO courses VALUES 
(1, '数学', 4, '陈老师'),
(2, '语文', 4, '刘老师'),
(3, '英语', 3, '王老师');

INSERT INTO scores VALUES 
(1, 1, 95, '2023-06-15'),
(1, 2, 88, '2023-06-16'),
(2, 1, 78, '2023-06-15'),
(2, 2, 92, '2023-06-16'),
(3, 1, 85, '2023-06-15');

找出每个班级中数学成绩最高的学生姓名、成绩，以及该学生的平均分（所有科目），要求平均分保留两位小数
直接给出SQL语句，不要输出其他多余内容。
```

✅答案

```sql
WITH class_math_max AS (
    SELECT cl.class_id, 
           cl.class_name,
           MAX(sc.score) as max_math_score
    FROM classes cl
    JOIN students st ON cl.class_id = st.class_id
    JOIN scores sc ON st.student_id = sc.student_id
    JOIN courses co ON sc.course_id = co.course_id
    WHERE co.course_name = '数学'
    GROUP BY cl.class_id, cl.class_name
),
student_avg AS (
    SELECT st.student_id,
           st.student_name,
           st.class_id,
           ROUND(AVG(sc.score), 2) as avg_score
    FROM students st
    JOIN scores sc ON st.student_id = sc.student_id
    GROUP BY st.student_id, st.student_name, st.class_id
)
SELECT cmm.class_name,
       st.student_name,
       sc.score as math_score,
       sa.avg_score
FROM class_math_max cmm
JOIN students st ON cmm.class_id = st.class_id
JOIN scores sc ON st.student_id = sc.student_id
JOIN courses co ON sc.course_id = co.course_id
JOIN student_avg sa ON st.student_id = sa.student_id
WHERE co.course_name = '数学' 
  AND sc.score = cmm.max_math_score;
```