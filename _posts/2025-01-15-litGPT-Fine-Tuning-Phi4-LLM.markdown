---
layout: single
title: "🚀最强LitGPT框架零代码微调Phi-4开源大模型！轻松实现Text to SQL！解决复杂SQL查询难题！【AI实战教程】从环境配置到模型部署全流程讲解！大模型微调从入门到精通 - AI超元域频道"
sidebar:
  nav: "docs"
date: 2025-01-15 00:00:00 +0800
categories: Fine-Tuning
tags: [Fine-Tuning, 微调, 大模型, Phi-4, LLMs, Text to SQL, LitGPT, AI]
classes: wide
author_profile: true
---


在当前大语言模型蓬勃发展的背景下,微调大模型的需求与日俱增，选择一款优秀的微调框架尤为重要。

LitGPT是一款开源的优秀微调框架。LitGPT是由Lightning AI团队开发的工具包，为用户提供了高效的大语言模型训练、微调和部署解决方案。使用LitGPT可以快速实现微调大语言模型。

### **本篇笔记所对应的视频：**
- [👉👉👉 数据集制作视频可以参考](https://youtu.be/7zw2B8upP00)
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1f2cqeFEii/)
- [👉👉👉 通过YouTube观看](https://youtu.be/MSwltnFg1fw)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng 【加我请注明来意】
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

## 核心特性

LitGPT支持20多种主流大语言模型,包括Llama、Mistral、Mixtral、Phi-4等。其主要技术特点包括:

- **高性能优化**: 集成了Flash Attention v2、多GPU支持、CPU卸载以及TPU/XLA支持等先进特性
- **灵活的精度设置**: 支持FP32、FP16、BF16等多种精度模式,可根据需求灵活调整
- **高效微调方案**: 内置LoRA、QLoRA、Adapter等参数高效微调方法
- **量化支持**: 提供4位浮点、8位整数等多种量化方案,有效降低内存需求

## 开发者友好

作为一款面向开发者的工具,LitGPT具有以下优势:

- **零抽象设计**: 采用从零实现的方式,避免复杂的抽象层,便于调试和定制
- **Apache 2.0许可**: 完全开源且允许商业使用
- **简单易用的API**: 提供Python API和命令行接口,快速上手

## 实际应用示例

以下是使用LitGPT加载和运行模型的简单示例:

```python
# 0) setup your dataset
curl -L https://huggingface.co/datasets/ksaw008/finance_alpaca/resolve/main/finance_alpaca.json -o my_custom_dataset.json

# 1) Finetune a model (auto downloads weights)
litgpt finetune microsoft/phi-4 \
  --data JSON \
  --data.json_path my_custom_dataset.json \
  --data.val_split_fraction 0.1 \
  --out_dir out/custom-model

# 2) Test the model
litgpt chat out/custom-model/final

# 3) Deploy the model
litgpt serve out/custom-model/final
```

## 视频中对应的配置和代码

✅本地部署:

```bash
## 安装bitsandbytes
pip install -U 'bitsandbytes>=0.42.0'
pip install bitsandbytes==0.42.0

sudo apt-get update
sudo apt-get install cuda-toolkit

## 安装litgpt
git clone https://github.com/Lightning-AI/litgpt
cd litgpt
pip install -e '.[all]'
```

✅下载模型:

```bash
litgpt download microsoft/phi-4 --access_token=xxxxxx
```

✅下载数据集:

```bash
## 下载数据集
curl -L https://huggingface.co/datasets/ksaw008/finance_alpaca/resolve/main/finance_alpaca.json -o my_custom_dataset.json
```

✅微调:

```bash
litgpt finetune microsoft/phi-4 \
    --data JSON \
    --data.json_path my_custom_dataset.json \
    --precision "bf16-true" \
    --quantize "bnb.nf4-dq" \
    --train.max_seq_length 2048 \
    --data.val_split_fraction 0.1 \
    --out_dir out/custom-model-c \
    --train.epochs 10 \
    --eval.interval 20 \
    --eval.max_iters 100 \
    --eval.max_new_tokens 100 \
    --eval.initial_validation True \
    --train.lr_warmup_steps 100 \
    --train.global_batch_size 4 \
    --train.micro_batch_size 1 \
    --train.save_interval 200 \
    --lora_r 8 \
    --lora_alpha 16 \
    --lora_dropout 0.05
```

✅参数解析:

1. 基础模型选择：

```bash
litgpt finetune microsoft/phi-4

```

- 使用 litgpt 框架微调 phi-4 模型
- phi-4 作为基础模型进行定制训练
1. 数据配置：

```bash
--data JSON
--data.json_path my_custom_dataset.json
--data.val_split_fraction 0.1

```

- 指定训练数据为 JSON 格式
- 训练数据文件路径为 my_custom_dataset.json
- 划分 10% 数据作为验证集
1. 训练精度与量化：

```bash
--precision "bf16-true"
--quantize "bnb.nf4-dq"

```

- 使用 bfloat16 精度训练
- 采用 4-bit nested float 动态量化减少显存占用
1. 序列与批次设置：

```bash
--train.max_seq_length 2048
--train.global_batch_size 4
--train.micro_batch_size 1

```

- 最大序列长度为 2048 tokens
- 全局批次大小为 4
- 微批次大小为 1,表示会进行梯度累积
- 实际上每次会处理 1 个样本,累积 4 次后更新一次模型
1. 学习率和训练进度：

```bash
--train.lr_warmup_steps 100
--train.epochs 10
--train.save_interval 200

```

- 学习率预热步数为 100 步
- 总共训练 10 轮
- 每 200 步保存一次模型检查点
1. LoRA 参数配置：

```bash
--lora_r 8
--lora_alpha 16
--lora_dropout 0.05

```

- LoRA 秩为 8,控制可训练参数量
- alpha 为 16,影响 LoRA 更新的缩放程度
- dropout 为 0.05,用于防止过拟合
1. 评估设置：

```bash
--eval.interval 20
--eval.max_iters 100
--eval.max_new_tokens 100
--eval.initial_validation True

```

- 每 20 步进行一次评估
- 评估最多运行 100 次迭代
- 生成最多 100 个新 token
- 训练前进行初始评估

✅运行模型

```bash
litgpt chat "out/custom-model-a/final/" --max_new_tokens 2048
```

✅转为Hugging Face Transformers格式

```bash
litgpt convert_from_litgpt out/custom-model-a/final/ out/hf-phi-4/converted

```

### 转为GGUF格式，方便在ollama、Llama.cpp中使用

1. 安装Llama.cpp

```bash
sudo apt update
sudo apt install build-essential python3-pip python3-dev python3-venv gcc g++ make jq

mkdir llama
cd llama
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
mkdir build
cd build
sudo apt install cmake
cmake ..
cmake --build . --config Release
```

1. 转为GGUF格式

```bash
python convert_hf_to_gguf.py /home/Ubuntu/litgpt/out/hf-phi-4/converted --outfile phi-4.gguf --outtype f16
```

1. 使用llama-server命令行运行

```bash
llama-server \
--model phi-4.gguf \
--port 8080
```

### 数据库Demo

```bash
import sqlite3
import pandas as pd
from datetime import datetime

# 设置pandas显示选项
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.unicode.east_asian_width', True)
pd.set_option('display.expand_frame_repr', False)
pd.set_option('display.colheader_justify', 'left')

# 创建内存数据库连接
conn = sqlite3.connect(':memory:')
cursor = conn.cursor()

# 创建商品表
cursor.execute('''
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    current_stock INTEGER NOT NULL
)
''')

# 创建交易记录表
cursor.execute('''
CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY,
    product_id INTEGER,
    transaction_type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    transaction_date DATE NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
)
''')

# 预定义商品数据
products_data = [
    (1, '联想笔记本电脑', '电子产品', 5999.00, 100),
    (2, '苹果手机', '电子产品', 6999.00, 150),
    (3, '华为平板', '电子产品', 3999.00, 80),
    (4, '索尼耳机', '电子产品', 1999.00, 200),
    (5, '费列罗巧克力', '食品', 88.00, 300),
    (6, '奥利奥饼干', '食品', 15.50, 500),
    (7, '可口可乐', '食品', 3.50, 1000),
    (8, '乐事薯片', '食品', 8.50, 400),
    (9, '优衣库T恤', '服装', 99.00, 200),
    (10, '李维斯牛仔裤', '服装', 399.00, 150),
    (11, 'nike运动鞋', '服装', 699.00, 100),
    (12, '安踏外套', '服装', 299.00, 120),
    (13, '得力铅笔', '文具', 2.50, 1000),
    (14, '晨光笔记本', '文具', 5.50, 800),
    (15, '广博文件夹', '文具', 15.00, 300)
]

# 预定义交易记录数据
transactions_data = [
    (1, 1, '入库', 50, '2024-01-01', 5999.00),
    (2, 1, '出库', 20, '2024-01-02', 5999.00),
    (3, 2, '入库', 100, '2024-01-01', 6999.00),
    (4, 2, '出库', 30, '2024-01-03', 6999.00),
    (5, 3, '入库', 40, '2024-01-02', 3999.00),
    (6, 4, '入库', 150, '2024-01-01', 1999.00),
    (7, 4, '出库', 50, '2024-01-04', 1999.00),
    (8, 5, '入库', 200, '2024-01-01', 88.00),
    (9, 5, '出库', 100, '2024-01-02', 88.00),
    (10, 6, '入库', 300, '2024-01-01', 15.50),
    (11, 6, '出库', 150, '2024-01-03', 15.50),
    (12, 7, '入库', 500, '2024-01-01', 3.50),
    (13, 7, '出库', 200, '2024-01-02', 3.50),
    (14, 8, '入库', 200, '2024-01-01', 8.50),
    (15, 8, '出库', 100, '2024-01-04', 8.50),
    (16, 9, '入库', 100, '2024-01-01', 99.00),
    (17, 9, '出库', 50, '2024-01-02', 99.00),
    (18, 10, '入库', 80, '2024-01-01', 399.00),
    (19, 10, '出库', 30, '2024-01-03', 399.00),
    (20, 11, '入库', 50, '2024-01-01', 699.00),
    (21, 11, '出库', 20, '2024-01-04', 699.00),
    (22, 12, '入库', 60, '2024-01-01', 299.00),
    (23, 12, '出库', 25, '2024-01-02', 299.00),
    (24, 13, '入库', 500, '2024-01-01', 2.50),
    (25, 13, '出库', 200, '2024-01-03', 2.50),
    (26, 14, '入库', 400, '2024-01-01', 5.50),
    (27, 14, '出库', 150, '2024-01-02', 5.50),
    (28, 15, '入库', 150, '2024-01-01', 15.00),
    (29, 15, '出库', 50, '2024-01-04', 15.00),
    (30, 1, '入库', 30, '2024-01-05', 5999.00),
    (31, 2, '入库', 40, '2024-01-05', 6999.00),
    (32, 3, '出库', 20, '2024-01-05', 3999.00),
    (33, 4, '入库', 50, '2024-01-05', 1999.00),
    (34, 5, '入库', 100, '2024-01-05', 88.00),
    (35, 6, '出库', 80, '2024-01-05', 15.50),
    (36, 7, '入库', 300, '2024-01-05', 3.50),
    (37, 8, '出库', 50, '2024-01-05', 8.50),
    (38, 9, '入库', 60, '2024-01-05', 99.00),
    (39, 10, '出库', 20, '2024-01-05', 399.00),
    (40, 11, '入库', 30, '2024-01-05', 699.00),
    (41, 12, '出库', 15, '2024-01-05', 299.00),
    (42, 13, '入库', 300, '2024-01-05', 2.50),
    (43, 14, '出库', 100, '2024-01-05', 5.50),
    (44, 15, '入库', 80, '2024-01-05', 15.00),
    (45, 1, '出库', 15, '2024-01-06', 5999.00),
    (46, 2, '出库', 25, '2024-01-06', 6999.00),
    (47, 3, '入库', 30, '2024-01-06', 3999.00),
    (48, 4, '出库', 40, '2024-01-06', 1999.00),
    (49, 5, '入库', 50, '2024-01-06', 88.00),
    (50, 6, '出库', 60, '2024-01-06', 15.50)
]

# 插入商品数据
cursor.executemany('INSERT INTO products VALUES (?,?,?,?,?)', products_data)

# 插入交易记录
cursor.executemany('INSERT INTO transactions VALUES (?,?,?,?,?,?)', transactions_data)

# 提交事务
conn.commit()

def execute_query(query):
    """执行SQL查询并返回结果"""
    try:
        df = pd.read_sql_query(query, conn)
        
        # 设置列对齐方式
        for col in df.columns:
            if col in ['product_id', 'transaction_id']:
                df[col] = df[col].map(lambda x: f"{x:>12}")
            elif col in ['quantity', 'current_stock', 'product_count']:
                df[col] = df[col].map(lambda x: f"{x:>10}")
            elif col in ['unit_price', 'total_value']:
                df[col] = df[col].apply(lambda x: f"{float(x):>12,.2f}")
            elif col == 'product_name':
                df[col] = df[col].map(lambda x: f"{x:<20}")
            elif col == 'category':
                df[col] = df[col].map(lambda x: f"{x:<20}")
            elif col == 'transaction_type':
                df[col] = df[col].map(lambda x: f"{x:^20}")
            elif col == 'transaction_date':
                df[col] = pd.to_datetime(df[col]).dt.strftime('%Y-%m-%d')
        
        return df
    except Exception as e:
        return f"查询错误: {str(e)}"

# 示例查询
print("="*50)
print("商品信息".center(50))
print("="*50)
query1 = "SELECT * FROM products"
print(execute_query(query1))

print("\n" + "="*50)
print("交易记录".center(50))
print("="*50)
query2 = """
SELECT t.transaction_id, p.product_name, t.transaction_type, 
       t.quantity, t.transaction_date, t.unit_price
FROM transactions t
JOIN products p ON t.product_id = p.product_id
ORDER BY t.transaction_date DESC
LIMIT 10
"""
print(execute_query(query2))

print("\n" + "="*50)
print("各类别商品库存总值".center(50))
print("="*50)
query3 = """
SELECT category, 
       COUNT(*) as product_count,
       SUM(current_stock * unit_price) as total_value
FROM products
GROUP BY category
"""
print(execute_query(query3))

# 关闭连接
conn.close()
```