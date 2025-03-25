---
layout: single
title: "🚀DeepSeek 6850亿参数开源大模型！DeepSeek-V3-0324全方位测评！编程能力、文档分析、复杂推理能力、Text-to-SQL能力！Cline+DeepSeek轻松开发城市模拟游戏"
sidebar:
  nav: "docs"
date: 2025-02-07 00:00:00 +0800
categories: LLMs
tags: [DeepSeek, DeepSeek-V3-0324 , DeepSeek-V3, Cline, AIGC, AI编程, LLMs, Text to SQL]
classes: wide
author_profile: true
---

昨天晚上DeepSeek推出其最新模型DeepSeek-V3-0324，这一小版本更新不仅在模型参数上有所提升，更在开源协议上做出了重大调整，为开发者带来了更大的自由度和便利性。

DeepSeek-V3-0324模型在参数规模上进行了小幅增长，从初代V3版本的6710亿参数提升至6850亿参数。虽然参数增长幅度不大，但性能上的提升却十分显著。特别是在代码能力方面，根据国外开源评测平台kcores-llm-arena的最新测试数据显示，DeepSeek-V3-0324的代码能力达到了328.3分，超越了Claude 3.7 Sonnet（322.3分），与思维链版本的Claude 3.7 Sonnet（334.8分）相近。这表明DeepSeek-V3-0324在代码生成和理解方面已经达到了世界领先水平。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1x7o4YvEJy/)
- [👉👉👉 通过YouTube观看](https://youtu.be/28x0s0rv-mw)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  



**开源协议更加宽松**

除了模型性能的提升，DeepSeek还对其开源协议进行了重大调整。DeepSeek-V3-0324的开源协议更新为与DeepSeek-R1一致的MIT协议。相较于之前的协议，MIT协议更加宽松，允许模型蒸馏、商业化等行为。这一调整无疑将极大地促进DeepSeek-V3-0324在各个领域的应用和发展。

**技术亮点分析**

- **高效的分布式训练：**
    - 在大规模分布式训练中，跨节点的通信开销是一个重要的性能瓶颈。
    - DeepSeek-V3-0324通过确保每个输入最多只能被发送到预设数量的节点上，显著减少了跨节点通信的流量，从而提高了训练效率。
- **优化的输出可读性：**
    - DeepSeek-V3-0324基于“数千”个“冷启动”数据进行SFT（监督微调），这些数据都采用标准格式：|特殊标记|<推理过程>|特殊标记|<摘要>。
    - 这个方式被设计用来提高模型输出的可读性。

**应用前景展望**

DeepSeek-V3-0324的发布，标志着DeepSeek在人工智能领域取得了又一项重要突破。其强大的代码能力和宽松的开源协议，将为开发者和企业提供更多创新和应用的可能性。无论是在软件开发、数据分析，还是在人工智能应用开发领域，DeepSeek-V3-0324都将发挥重要作用。

DeepSeek-V3-0324的发布，不仅展示了DeepSeek在模型性能上的持续进步，也体现了其在开源生态建设上的积极态度。我们有理由相信，随着DeepSeek-V3-0324的广泛应用，人工智能技术将为更多领域带来变革和创新。

### 测试题

```markdown
编写一个 Python 脚本，实现一个绿色的球在旋转的正十二边形内弹跳。
小球应受到重力和摩擦力的影响，而且必须真实地从旋转的墙壁上弹起。
```

```markdown
农夫带着一只老虎、一只羊、一条蛇、一只鸡和一筐苹果要过河。

农夫的船一次只能载农夫和一样东西过河。

已知农夫不在的时候，老虎和羊在一起的话，老虎会吃掉羊，如果鸡也在的话，鸡会阻止老虎吃羊；

农夫不在的时候，蛇和鸡在一起的话，蛇会吃掉鸡，如果老虎也在的话，老虎会阻止蛇吃鸡；

农夫不在的时候羊和苹果在一起的话，羊会吃掉苹果，如果蛇也在的话，蛇会阻止羊吃苹果；

老虎不吃鸡(鸡太小不够老虎塞牙缝的)，蛇不吃苹果(蛇不吃素)。

请问农夫如何才能将老虎、羊、蛇、鸡和苹果安全送到对岸？

# AI超元域频道原创视频
```

```markdown
英文单词单词possessionlessnesses中有多少个's'
```

### Cline编程

```markdown
使用 Three.js 创建一个 3D 城市场景，呈现一个繁忙的城市环境，
其中包含摩天大楼、公寓楼和沿街的小商店。加入有行驶的汽车、交通信号灯和人行横道的道路，
为城市注入生机。添加在人行道上行走和过马路的行人，以增强真实感。
包含路灯、长椅和树木等街道元素，打造更具沉浸感的体验。
利用动态光照模拟昼夜循环，并实现基本的相机控制，让用户能够从不同角度探索这个充满活力的城市景观。

# AI超元域频道原创视频
```

```markdown
连续抛硬币100次，每次都是正面朝上的概率是多少
```

```markdown
7.89 × 10^-31
0.5100≈7.89×10−31

7.888609052210118e-31
7.888609052210118e-31

即使每秒抛一次硬币，宇宙年龄（约138亿年）也远远不足以看到一次这样的事件发生
```

```markdown
20世纪50年代以来，人类丢弃了多达10亿吨塑料，这种垃圾可能存在数百年甚至数千年。
近日，一个科研小组在亚马逊雨林中发现了一种名为内生菌的真菌，它能降解普通的聚氨酯塑料。
科研人员认为利用这种真菌的特性，将有望帮助人类消除塑料垃圾所带来的威胁。

　　科研人员的判断还需基于以下哪一前提（    ）。

　　A.塑料垃圾是人类活动产生的最主要的废弃物种类

　　B.内生菌在任何条件下都可以很好地分解塑料制品

　　C.目前绝大多数塑料垃圾都属于普通的聚氨酯塑料

　　D.这种真菌在地球上其他地区也能正常地存活生长

答案：C
```

```markdown
一楼到十楼的每层电梯门口都放着一颗钻石，钻石大小不一。
你乘坐电梯从一楼到十楼，每层楼电梯门都会打开一次，只能拿一次钻石，问怎样才能拿到最大的一颗？

✅先拿下第一楼的钻石，然后在每一楼把手中的钻石与那一楼的钻石相比较，如果那一楼的钻石比手中的钻石大的话那就把手中的钻石换成那一层的钻石。
```

### Text to SQL能力

```markdown
创建产品表
cursor.execute('''
CREATE TABLE products (
product_id INTEGER PRIMARY KEY,
product_name TEXT NOT NULL,
category TEXT NOT NULL,
unit_price REAL NOT NULL,
cost_price REAL NOT NULL,
current_stock INTEGER NOT NULL,
min_stock_level INTEGER NOT NULL
)
''')

创建进货表
cursor.execute('''
CREATE TABLE purchases (
purchase_id INTEGER PRIMARY KEY,
product_id INTEGER NOT NULL,
supplier_id INTEGER NOT NULL,
purchase_date TEXT NOT NULL,
quantity INTEGER NOT NULL,
unit_cost REAL NOT NULL,
total_cost REAL NOT NULL,
FOREIGN KEY (product_id) REFERENCES products (product_id),
FOREIGN KEY (supplier_id) REFERENCES suppliers (supplier_id)
)
''')

创建销售表
cursor.execute('''
CREATE TABLE sales (
sale_id INTEGER PRIMARY KEY,
product_id INTEGER NOT NULL,
customer_id INTEGER,
sale_date TEXT NOT NULL,
quantity INTEGER NOT NULL,
unit_price REAL NOT NULL,
total_price REAL NOT NULL,
FOREIGN KEY (product_id) REFERENCES products (product_id)
)
''')

创建供应商表
cursor.execute('''
CREATE TABLE suppliers (
supplier_id INTEGER PRIMARY KEY,
supplier_name TEXT NOT NULL,
contact_person TEXT,
phone TEXT,
email TEXT,
address TEXT
)
''')

创建客户表
cursor.execute('''
CREATE TABLE customers (
customer_id INTEGER PRIMARY KEY,
customer_name TEXT NOT NULL,
contact_person TEXT,
phone TEXT,
email TEXT,
address TEXT
)
''')

生成随机数据
供应商数据
suppliers_data = [
(1, '北京供应有限公司', '张三', '13800000001', 'supplier1@example.com', '北京市海淀区'),
(2, '上海优质货源公司', '李四', '13800000002', 'supplier2@example.com', '上海市浦东新区'),
(3, '广州原材料供应商', '王五', '13800000003', 'supplier3@example.com', '广州市天河区'),
(4, '深圳电子零件公司', '赵六', '13800000004', 'supplier4@example.com', '深圳市南山区'),
(5, '杭州科技供应链', '钱七', '13800000005', 'supplier5@example.com', '杭州市西湖区')
]

客户数据
customers_data = [
(1, '第一商场', '陈一', '13900000001', 'customer1@example.com', '北京市朝阳区'),
(2, '二号连锁超市', '刘二', '13900000002', 'customer2@example.com', '上海市静安区'),
(3, '三星电子经销商', '孙三', '13900000003', 'customer3@example.com', '广州市越秀区'),
(4, '四方百货公司', '周四', '13900000004', 'customer4@example.com', '深圳市福田区'),
(5, '五洲商贸中心', '吴五', '13900000005', 'customer5@example.com', '杭州市拱墅区'),
(6, '六合连锁店', '郑六', '13900000006', 'customer6@example.com', '成都市锦江区'),
(7, '七彩电器城', '王七', '13900000007', 'customer7@example.com', '重庆市渝中区'),
(8, '八方食品公司', '冯八', '13900000008', 'customer8@example.com', '武汉市江汉区')
]

产品数据
products_data = [
(1, '笔记本电脑A型', '电子产品', 5999.00, 4500.00, 50, 10),
(2, '智能手机X1', '电子产品', 3999.00, 2800.00, 120, 20),
(3, '办公桌椅套装', '办公家具', 1299.00, 800.00, 30, 5),
(4, '激光打印机P3', '办公设备', 1599.00, 1100.00, 25, 8),
(5, '液晶显示器27寸', '电子产品', 1299.00, 900.00, 60, 15),
(6, '机械键盘K8', '电子配件', 399.00, 250.00, 100, 30),
(7, '无线鼠标M2', '电子配件', 199.00, 120.00, 150, 40),
(8, '移动硬盘1TB', '存储设备', 499.00, 350.00, 80, 20),
(9, '办公文件柜', '办公家具', 899.00, 600.00, 15, 5),
(10, '投影仪H1', '办公设备', 2999.00, 2200.00, 10, 3),
(11, '复印纸A4', '办公耗材', 39.90, 25.00, 500, 100),
(12, '墨盒套装', '办公耗材', 299.00, 180.00, 70, 20),
(13, '电脑包', '配件', 199.00, 120.00, 90, 30),
(14, 'USB集线器', '电子配件', 99.00, 60.00, 120, 40),
(15, '无线耳机', '电子配件', 599.00, 400.00, 85, 25)
]

找出所有库存低于最小库存水平的产品，直接给出SQL语句，不需要解释

对比各产品的进货量和销售量，找出库存周转率最高的5种产品，直接给出sql语句，不要解释

查询所有单价超过1000元的产品及其类别，直接给出sql语句，不要解释

分析每种产品在不同月份的销售情况，并计算同比增长率，直接给出sql语句，不要解释

```

### 文档分析能力

[https://arxiv.org/html/2503.01743v2](https://arxiv.org/html/2503.01743v2)

```markdown
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