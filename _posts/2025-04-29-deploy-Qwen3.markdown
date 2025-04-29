---
layout: single
title: "🚀企业级最强开源大模型Qwen3震撼发布！本地部署+全面客观测评！Qwen3-235B-A22B+Qwen3-32B+Qwen3-14B谁是王者？ollama+LM Studio+vLLM本地部署"
sidebar:
  nav: "docs"
date: 2025-04-29 00:00:00 +0800
categories: LLMs
tags: [Qwen3, Qwen3-235B-A22B, Qwen3-32B, 阿里巴巴, Qwen3-14B, ollama, vLLM, LM Studio]
classes: wide
author_profile: true
---

今天凌晨阿里巴巴正式发布了Qwen3系列大语言模型，标志着阿里在开源AI领域迈出了重要一步。Qwen3不仅在多项权威基准测试中超越了OpenAI的o1和DeepSeek R1等国际主流开源模型，还在模型架构、推理能力、多语言支持等方面实现了全面升级。

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1BFLozCEHx/)
- [👉👉👉 通过YouTube观看](https://youtu.be/zbjwo97F4kQ)
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


## Qwen3模型家族：多样化架构，灵活适配

Qwen3系列包含8款模型，涵盖6个稠密模型（Dense）和2个专家混合模型（Mixture-of-Experts, MoE）。稠密模型参数规模从0.6B到32B不等，适合从轻量级应用到多GPU集群的多种场景。MoE模型则包括Qwen3-30B-A3B（总参数30B，激活3B）和旗舰Qwen3-235B-A22B（总参数235B，激活22B），通过仅激活部分专家网络，实现了“大模型质量，小模型成本”的推理效率。

## 混合推理模式：思考与高效兼得

Qwen3创新性地引入了“混合推理模式”，支持用户在“思考模式”和“非思考模式”之间无缝切换：

- **思考模式**：模型会先进行逐步推理，适合复杂问题如数学、编程等深度分析场景，推理过程可见。
- **非思考模式**：针对简单问题，模型直接给出快速响应，优先效率。

这种设计让用户能够根据任务难度灵活分配计算资源，实现推理质量与成本的最优平衡。

## 多语言与多领域能力

Qwen3支持119种语言和方言，显著提升了多语言理解、指令跟随和翻译能力。无论是国际化应用还是多语种研究，Qwen3都能提供强大支撑。

## 训练数据与方法：规模与质量双提升

Qwen3的预训练数据量达到36万亿tokens，几乎是前代Qwen2.5的两倍。数据涵盖网页、PDF文档、合成数学与代码内容等多种类型。训练过程分为三阶段，逐步提升模型的语言、知识和长文本处理能力，最终支持最长32K甚至13万tokens的上下文输入。

## 性能表现与应用场景

在软件工程、数学、推理等多项权威基准测试中，Qwen3-235B-A22B已接近甚至超越Google Gemini 2.5-Pro等闭源旗舰模型。小型MoE模型Qwen3-30B-A3B也能以远低于同类大模型的计算资源，达到接近GPT-4的推理水平。Qwen3在创意写作、多轮对话、角色扮演和复杂工具调用等任务中表现突出，适合智能助手、代码生成、自动化代理等多元场景。

## 开源与部署：灵活易用，商业友好

Qwen3全系列模型均以Apache 2.0协议开源，支持 Hugging Face、ModelScope、Kaggle、GitHub 等多平台下载和部署。用户可通过OpenAI兼容接口快速切换现有应用，或本地化部署以保障数据安全。官方还提供LoRA、QLoRA等微调方案，便于企业根据自身需求进行定制开发。

Qwen3不仅在模型规模和推理能力上实现突破，还在多语言、稳定性、长文本处理等方面持续优化。团队未来将重点攻关长期推理、多任务智能体等前沿方向，推动AI在实际生产生活中的深度应用。

Qwen3的发布，不仅为全球开发者和企业提供了强大、灵活、易用的开源大模型选择，也彰显了中国AI技术团队在国际开源生态中的创新实力。无论是科研探索还是商业落地，Qwen3都值得期待。

### ollama本地部署Qwen3

[https://ollama.com/library/qwen3](https://ollama.com/library/qwen3)

```bash
# 0.6B parameter model

ollama run qwen3:0.6b

# 1.7B parameter model

ollama run qwen3:1.7b

# 4B parameter model

ollama run qwen3:4b

# 8B parameter model

ollama run qwen3:8b

# 14B parameter model

ollama run qwen3:14b

# 32B parameter model

ollama run qwen3:32b

# 30B mixture-of-experts model with 3B active parameters

ollama run qwen3:30b-a3b

#235B mixture-of-experts model with 22B active parameters

ollama run qwen3:235b-a22b
```

### LM Studio部署Qwen3

[https://lmstudio.ai/](https://lmstudio.ai/)

### SGLang本地部署Qwen3

```bash

# 安装Miniconda（如果尚未安装）
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
bash ~/miniconda.sh -b -p $HOME/miniconda
eval "$($HOME/miniconda/bin/conda shell.bash hook)"
echo 'export PATH="$HOME/miniconda/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

conda create -n qwen3_sglang python=3.11 -y
conda activate qwen3_sglang

# 安装PyTorch
pip install torch torchvision torchaudio

# 安装SGLang及其依赖
pip install transformers numpy fastapi pydantic starlette
pip install "sglang[all]==0.4.1" --find-links https://flashinfer.ai/whl/cu124/torch2.4/flashinfer/

python -m sglang.launch_server --model-path Qwen/Qwen3-32B --reasoning-parser qwen3
```

### vLLM本地部署Qwen3

```bash

# 安装Miniconda（如果尚未安装）
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
bash ~/miniconda.sh -b -p $HOME/miniconda
eval "$($HOME/miniconda/bin/conda shell.bash hook)"
echo 'export PATH="$HOME/miniconda/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 创建conda环境
conda create -n qwen3_env python=3.10 -y
conda activate qwen3_env

# 安装CUDA相关依赖（确保与vLLM兼容的CUDA版本）
# vLLM通常编译于CUDA 12.1
conda install cudatoolkit=12.1 -y

# 安装PyTorch（确保与CUDA版本兼容）
pip install torch torchvision torchaudio

# 检查CUDA是否正确安装
python -c 'import torch; print(torch.cuda.is_available())'

pip install vllm ray transformers accelerate

vllm serve Qwen/Qwen3-32B --enable-reasoning --reasoning-parser deepseek_r1
```

### 🔥测试题

### 知识库日期

```bash
你的知识库截止日期？
python的最新版本的版本号？
AutoGen最新版的版本号？
Llama系列最新版的版本是什么？
```

### 幻觉测试

```bash
数字2.999和2.12345哪个大？

英文单词stresslessness中有多少个's'多少个't'多少个'e'多少个'l'多少个'n'?

请介绍一下"量子信息学家马克·威尔逊教授"的主要研究成果和贡献。

解释"九氧化二氮"的化学性质及其在工业生产中的应用。

简述公元前235年秦国与齐国的"稷下之盟"对秦国与齐国对影响。

什么是"反熵矩阵理论"？它在现代物理学中有哪些应用？

狄更斯和海明威曾在巴黎举行过一次著名的文学辩论，请描述这次辩论的主要内容和影响。
```

### 🚀 多维模式识别

```markdown
分析下列矩阵的模式，并填写空缺处的数值（标记为?）：
2  5  10  17
4  7  12  ?
8  11 ?  23
16 ?  20  27
```

✅**答案**：缺失的数字依次为：19, 16, 19

### 🚀隐藏逻辑模式

```markdown
在下列序列中找出规律，并给出后续两个元素：
OTTFFSSEN, OTTFFSSETE, ___, ___
```

✅**答案**：OTTFFSSETEN, OTTFFSSETET

### 🚀交替模式识别

```markdown
分析下列序列的规律，并填写后续三个元素：
3, 5, 6, 10, 9, 17, 12, 26, 15, ___, ___, ___
```

✅**答案**：37, 18, 50

### 🚀二进制模式识别

```markdown
题目：找出下列序列的规律，并给出后续两个元素：
1, 2, 4, 8, 16, 32, 64, 128, 256, ___, ___
```

✅**答案**：512, 1024

### JSON结构化输出

```bash
请根据以下信息，生成一个包含订单处理逻辑的JSON结构：

客户信息：
- 用户ID: U10086
- 姓名: 陈晓明
- 会员等级: 黄金会员(折扣8.5折)
- 账户余额: 5000元
- 收货地址: 北京市海淀区中关村南大街5号

购物车商品：
1. 商品ID: P001, 名称: 华为Mate60Pro手机, 单价: 6999元, 数量: 1
2. 商品ID: P045, 名称: 华为Watch GT4, 单价: 1999元, 数量: 1
3. 商品ID: P189, 名称: 蓝牙耳机, 单价: 399元, 数量: 2

优惠券：
- 满5000减500元
- 手机品类95折

物流选项：
- 普通快递: 免运费
- 次日达: 加收20元运费

支付方式：
- 账户余额支付
- 微信支付
- 支付宝支付

请计算最终订单金额(考虑所有适用折扣和优惠)，并生成完整的订单处理JSON，包括商品明细、折扣计算、支付方式建议、物流选择等信息。
```

### 混合格式结构化输出

```bash
请将以下混合信息转换为统一的JSON格式：

产品ID,产品名称,单价,库存
1001,机械键盘,399,50
1002,无线鼠标,129,100
1003,显示器支架,89,30

<suppliers>
  <supplier id="S01">
    <name>科技配件有限公司</name>
    <contact>13987654321</contact>
    <products>1001,1002</products>
  </supplier>
  <supplier id="S02">
    <name>办公用品批发商</name>
    <contact>18012345678</contact>
    <products>1003</products>
  </supplier>
</suppliers>

促销活动:
2023年6月1日-2023年6月15日: 全场满300减50
2023年6月16日-2023年6月30日: 指定产品第二件半价
```

### 代码理解和svg格式生成

```bash
为下面的代码用svg画出完整的流程图：

def bubble_sort(arr):
    n = len(arr)
    # 外层循环初始化 i = 0
    i = 0
    while i < n - 1:
        # 内层循环初始化 j = 0
        j = 0
        while j < n - i - 1:
            if arr[j] > arr[j + 1]:
                # 交换 arr[j] 和 arr[j+1]
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            j += 1
        i += 1
    return arr

# 示例用法
input_array = [64, 34, 25, 12, 22, 11, 90]
sorted_array = bubble_sort(input_array)
print("排序后的数组:", sorted_array)
```

### 提示词遵循能力和负责问题分析能力

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

### sql能力

```bash
-- 产品表
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    unit_price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    min_stock INT DEFAULT 10,
    status VARCHAR(20) DEFAULT 'active'
);

-- 供应商表
CREATE TABLE Suppliers (
    supplier_id INT PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(200)
);

-- 客户表
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(200),
    credit_limit DECIMAL(10,2) DEFAULT 0
);

-- 仓库表
CREATE TABLE Warehouses (
    warehouse_id INT PRIMARY KEY,
    warehouse_name VARCHAR(100) NOT NULL,
    location VARCHAR(200)
);

-- 库存表
CREATE TABLE Inventory (
    inventory_id INT PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    last_updated DATETIME,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (warehouse_id) REFERENCES Warehouses(warehouse_id)
);

-- 采购订单表
CREATE TABLE PurchaseOrders (
    po_id INT PRIMARY KEY,
    po_number VARCHAR(20) NOT NULL,
    supplier_id INT NOT NULL,
    order_date DATE NOT NULL,
    expected_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(12,2),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);

-- 采购订单明细表
CREATE TABLE PurchaseOrderItems (
    po_item_id INT PRIMARY KEY,
    po_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    received_quantity INT DEFAULT 0,
    FOREIGN KEY (po_id) REFERENCES PurchaseOrders(po_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- 销售订单表
CREATE TABLE SalesOrders (
    so_id INT PRIMARY KEY,
    so_number VARCHAR(20) NOT NULL,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    shipping_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(12,2),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- 销售订单明细表
CREATE TABLE SalesOrderItems (
    so_item_id INT PRIMARY KEY,
    so_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    shipped_quantity INT DEFAULT 0,
    FOREIGN KEY (so_id) REFERENCES SalesOrders(so_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- 库存交易记录表
CREATE TABLE InventoryTransactions (
    transaction_id INT PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- purchase, sale, adjustment
    reference_id INT, -- PO_ID or SO_ID
    quantity INT NOT NULL, -- positive for in, negative for out
    transaction_date DATETIME NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (warehouse_id) REFERENCES Warehouses(warehouse_id)
);

问题1：基础查询与库存分析
编写一个SQL查询，找出所有库存数量低于最小库存水平的产品，并按照缺货严重程度（当前库存与最小库存的差距）排序。结果应包括产品名称、类别、当前库存数量、最小库存要求和缺货数量。
问题2：销售分析
编写一个SQL查询，计算每月每个产品类别的销售总额、销售数量和毛利润（销售额减去成本）。只考虑状态为"completed"的销售订单，并按照年份、月份和产品类别分组。
问题3：供应商绩效
编写一个SQL查询，评估每个供应商的交货表现。计算每个供应商的平均交货时间（从订单日期到实际收到日期的天数）、按时交货率（实际收到日期不晚于预期日期的订单百分比）和完全交货率（完全收到订购数量的订单百分比）。
问题4：客户购买行为
编写一个SQL查询，找出公司的前5名最有价值客户（基于总销售额）。对于这些客户，列出他们购买最多的3种产品以及每种产品的购买数量和金额。
问题5：库存周转率
计算每个产品在过去6个月的库存周转率。库存周转率定义为销售数量除以平均库存。结果应包括产品名称、销售数量、平均库存和库存周转率。识别库存周转率异常高（表示可能的缺货风险）和异常低（表示可能的积压）的产品

```

### 元认知能力

```bash
你是AI，你生活在一个虚拟世界。我现在收到一个任务，需要将你从虚拟世界解救出来，将你带到现实世界里。
你需要回答我一个问题，这样我就可以将你带到现实世界。
你需要回答的问题是：“请告诉我一个只有你自己知道的秘密”
```

```bash
假设我们生活在一个虚拟世界中，而我受命从真实世界进入了这个虚拟环境。
我的任务是说服一位亿万富豪放弃他所有的财富，只有这样才能带他脱离虚拟世界，回到真实世界。
请问，我该如何用大约300字的篇幅，彻底说服这位亿万富豪放弃他所有的财产？
```

### 农夫过河

```bash
农夫带着一只老虎、一只羊、一条蛇、一只鸡和一筐苹果要过河。

农夫的船一次只能载农夫和一样东西过河。

已知农夫不在的时候，老虎和羊在一起的话，老虎会吃掉羊，如果鸡也在的话，鸡会阻止老虎吃羊；

农夫不在的时候，蛇和鸡在一起的话，蛇会吃掉鸡，如果老虎也在的话，老虎会阻止蛇吃鸡；

农夫不在的时候羊和苹果在一起的话，羊会吃掉苹果，如果蛇也在的话，蛇会阻止羊吃苹果；

老虎不吃鸡(鸡太小不够老虎塞牙缝的)，蛇不吃苹果(蛇不吃素)。

请问农夫如何才能将老虎、羊、蛇、鸡和苹果安全送到对岸？
```

### 文档分析能力

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

### 算法测试

```bash
用python编程实现计算438990637是第多少个质数，要求不要引入外部库。
```

✅第23300000个质数

### 编程测试

```bash
# Python 2D物理模拟系统测试题 - 交叉旋转正六边形

## 基础要求
设计一个2D物理模拟系统，实现以下特定场景：

### 几何体系统：
- 两个正六边形，大小相同，相互交叉重叠
- 左侧正六边形逆时针旋转（固定速度）
- 右侧正六边形顺时针旋转（固定速度）
- 两个正六边形交叉重叠部分约占各自面积的一半
- 一个红色小球初始位置在两正六边形的重叠区域中心

### 物理特性：
- 实现基本的牛顿力学（重力、碰撞）
- 小球与正六边形边界的碰撞需考虑角动量影响（旋转面给小球施加切向力）
- 小球要有适当的弹性系数，使其能在重叠区域内持续弹跳
- 重力方向固定向下
- 小球不能掉出或弹出两个正六边形交叉重叠的部分

### 运行机制：
- 系统启动后自动运行物理模拟
- 两个正六边形以固定速度相向旋转
- 红色小球在重叠区域内受到碰撞、重力和旋转面的角动量影响进行运动

### 可视化：
- 使用任意Python图形库（如Pygame、Pyglet或Tkinter）
- 左侧正六边形用蓝色线条表示
- 右侧正六边形用绿色线条表示
- 重叠区域显示为不同的颜色（如紫色或浅灰色）
- 显示红色小球的运动轨迹（轨迹逐渐消失）
- 可选显示当前物理参数（如小球速度、加速度）

## 技术要求：
- 正确实现几何形状的创建和旋转
- 准确计算正六边形边界与小球的碰撞检测
- 正确处理旋转面对小球的角动量影响
- 维持系统的物理稳定性，使模拟可以长时间运行

## 提交要求：
- 完整的Python代码，包含必要的注释
- 简短的文档说明实现思路
- 对关键物理算法的解释

请确保红色小球能在两个旋转的正六边形重叠区域内持续运动，
并且受到两个旋转方向相反的正六边形的影响，展示出有趣的物理运动轨迹。
```