---
layout: single
title: "smolagents颠覆传统AI智能体！ollama本地部署Hugging Face开源全新AI智能体！重新定义AI智能体开发！从入门到精通只需10分钟"
sidebar:
  nav: "docs"
date: 2025-01-04 00:00:00 +0800
categories: AIAgents
tags: [AI智能体, smolagents, Hugging Face, ollama, 教程]
classes: wide
author_profile: true
---
HuggingFace于2024年12月31日发布了一款全新的AI代理框架SmolAgents，这是一个极简但功能强大的AI Agents库，可以让开发者用最少的代码快速构建智能代理系统。该框架的核心逻辑仅用约1000行代码就实现了完整的代理功能，极大地简化了AI代理的开发流程。


### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/YzH4acK)
- [👉👉👉 通过YouTube观看](https://youtu.be/wwN3oAugc4c)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

## smolagents简介

smolagents是一款革命性的AI智能体框架，它的主要特点是:
- 设计简洁，使用方便，仅需几行代码即可创建功能强大的AI智能体
- 执行速度远超其他同类框架
- 学习曲线平缓，新手友好
- 代码精简但功能强大

## 核心优势

smolagents的设计理念是"极简代码，最大功能"。它提供了：

- 安全的Python解释器和E2B沙箱环境
- 原生支持工具调用功能
- 支持多种LLM模型集成（ollama、ChatGPT、Claude等）
- 支持搜索引擎等实用工具集成
- 支持自定义工具开发
- 通过CodeAgent类实现直观高效的代码形式工具调用
- 支持Python代码直接执行工具函数
- 可通过Hugging Face Hub轻松共享和加载工具

## 发展前景

SmolAgents将在未来取代现有的AI智能体框架。其简洁的设计理念和强大的功能正在吸引越来越多开发者的关注，有望成为2025年AI代理开发领域的重要工具。

## 快速入门

### 安装依赖

```bash
pip install smolagents sqlalchemy google-search-results
```

### 基础使用示例

以下是一个使用ollama模型的简单示例：

```python
from smolagents import LiteLLMModel, DuckDuckGoSearchTool
from smolagents import CodeAgent

# 使用ollama api
model = LiteLLMModel(
    model_id="ollama/mistral-nemo",
    api_base="http://127.0.0.1:11434",
    api_key="ollama",
)

agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=model)

# 测试智能体
agent.run("What's the 20th number in the Fibonacci sequence?")
```

### 搜索引擎工具实现

下面是一个集成Google新闻搜索的示例：

```python
# 导入所需的库和模块
from smolagents.agents import ToolCallingAgent
from smolagents import tool, LiteLLMModel
from serpapi import GoogleSearch
import os
from google.colab import userdata

os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')

model = LiteLLMModel(model_id="gpt-4o-mini")

# # 初始化LLM模型
# model = LiteLLMModel(
#     model_id="ollama/mistral-nemo",
#     api_base="http://127.0.0.1:11434",
#     api_key="ollama",
# )


@tool
def search_ai_news(query: str) -> str:
    """
    搜索AI相关新闻并返回结果。

    Args:
        query: 要搜索的AI新闻关键词

    Returns:
        新闻搜索结果的字符串
    """
    params = {
        "engine": "google_news",
        "q": query,
        "gl": "us",
        "hl": "en",
        "api_key": "Your_API_KEY"  # 替换为你的 SerpAPI key
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()

        if "news_results" not in results:
            return "No news results found."

        news_articles = results["news_results"][:3]  # 获取前3条新闻

        formatted_results = []
        for article in news_articles:
            title = article.get("title", "No title")
            source = article.get("source", {}).get("name", "Unknown source")
            date = article.get("date", "No date")
            link = article.get("link", "No link")

            formatted_results.append(
                f"Title: {title}\n"
                f"Source: {source}\n"
                f"Date: {date}\n"
                f"Link: {link}\n"
            )

        return "\n".join(formatted_results)

    except Exception as e:
        return f"Error occurred while fetching news: {str(e)}"


agent = ToolCallingAgent(tools=[search_ai_news], model=model)

# 执行
print(agent.run("What are the latest news about artificial intelligence?"))
```

### 天气查询工具实现

```python
from smolagents.agents import ToolCallingAgent
from smolagents import tool, LiteLLMModel
from typing import Optional
import requests
import json
import os
from google.colab import userdata

os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')

model = LiteLLMModel(model_id="gpt-4o-mini")

# 设置API key，从此处获取API key：https://home.openweathermap.org/api_keys
OPENWEATHER_API_KEY = userdata.get('OPENWEATHER_API_KEY')

@tool
def get_weather(location: str, celsius: Optional[bool] = True) -> str:
    """
    获取指定位置的实时天气信息
    
    Args:
        location: 位置名称(城市名)
        celsius: 是否使用摄氏度(默认True)
    """
    try:
        # 1. 先通过地理编码API获取位置的经纬度
        geocoding_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location}&limit=1&appid={OPENWEATHER_API_KEY}"
        geo_response = requests.get(geocoding_url)
        geo_data = geo_response.json()
        
        if not geo_data:
            return f"无法找到位置: {location}"
            
        lat = geo_data[0]['lat']
        lon = geo_data[0]['lon']
        
        # 2. 调用天气API获取天气数据
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
        response = requests.get(weather_url)
        data = response.json()
        
        # 3. 温度转换(开氏度转换为摄氏度或华氏度)
        temp_k = data['main']['temp']
        if celsius:
            temp = temp_k - 273.15
            temp_unit = "°C"
        else:
            temp = (temp_k - 273.15) * 9/5 + 32
            temp_unit = "°F"
            
        # 4. 格式化天气信息
        weather_desc = data['weather'][0]['description']
        humidity = data['main']['humidity']
        wind_speed = data['wind']['speed']
        
        weather_info = (
            f"当前{location}的天气情况:\n"
            f"- 天气状况: {weather_desc}\n"
            f"- 温度: {temp:.1f}{temp_unit}\n"
            f"- 湿度: {humidity}%\n"
            f"- 风速: {wind_speed}m/s"
        )
        
        return weather_info
        
    except Exception as e:
        return f"获取天气信息时发生错误: {str(e)}"

agent = ToolCallingAgent(tools=[get_weather], model=model)

# 测试
print(agent.run("What's the weather like in Paris?"))
print(agent.run("What's the weather like in New York? Use Fahrenheit."))

```

### Text to SQL实现

```python
from sqlalchemy import (
    create_engine,
    MetaData,
    Table,
    Column,
    String,
    Integer,
    Float,
    ForeignKey,
    insert,
    inspect,
    text,
)
from smolagents import tool, CodeAgent, LiteLLMModel

# 创建内存数据库
engine = create_engine("sqlite:///:memory:")
metadata_obj = MetaData()

# 创建商品表
products = Table(
    "products",
    metadata_obj,
    Column("product_id", Integer, primary_key=True),
    Column("product_name", String(50), nullable=False),
    Column("category", String(20)),
    Column("unit_price", Float, nullable=False),
    Column("stock_quantity", Integer, nullable=False),
)

# 创建订单表
orders = Table(
    "orders",
    metadata_obj,
    Column("order_id", Integer, primary_key=True),
    Column("product_id", Integer, ForeignKey("products.product_id")),
    Column("customer_name", String(50)),
    Column("order_date", String(10)),
    Column("quantity", Integer),
    Column("total_amount", Float),
)

metadata_obj.create_all(engine)

# 插入示例商品数据
product_data = [
    {"product_id": 1, "product_name": "iPhone 14", "category": "手机", "unit_price": 5999.0, "stock_quantity": 100},
    {"product_id": 2, "product_name": "MacBook Pro", "category": "笔记本", "unit_price": 12999.0, "stock_quantity": 50},
    {"product_id": 3, "product_name": "AirPods Pro", "category": "配件", "unit_price": 1999.0, "stock_quantity": 200},
    {"product_id": 4, "product_name": "iPad Air", "category": "平板", "unit_price": 4799.0, "stock_quantity": 80},
    {"product_id": 5, "product_name": "Apple Watch", "category": "智能手表", "unit_price": 3299.0,
     "stock_quantity": 150},
    {"product_id": 6, "product_name": "小米13", "category": "手机", "unit_price": 3999.0, "stock_quantity": 120},
    {"product_id": 7, "product_name": "华为Mate60", "category": "手机", "unit_price": 6999.0, "stock_quantity": 90},
    {"product_id": 8, "product_name": "联想小新Pro", "category": "笔记本", "unit_price": 5999.0, "stock_quantity": 45},
    {"product_id": 9, "product_name": "华为MateBook", "category": "笔记本", "unit_price": 6599.0, "stock_quantity": 60},
    {"product_id": 10, "product_name": "小米手环", "category": "智能手表", "unit_price": 249.0, "stock_quantity": 300},
    {"product_id": 11, "product_name": "华为手表", "category": "智能手表", "unit_price": 1499.0, "stock_quantity": 180},
    {"product_id": 12, "product_name": "荣耀手机", "category": "手机", "unit_price": 2999.0, "stock_quantity": 150},
    {"product_id": 13, "product_name": "戴尔XPS", "category": "笔记本", "unit_price": 9999.0, "stock_quantity": 30},
    {"product_id": 14, "product_name": "机械键盘", "category": "配件", "unit_price": 399.0, "stock_quantity": 250},
    {"product_id": 15, "product_name": "无线鼠标", "category": "配件", "unit_price": 129.0, "stock_quantity": 400},
    {"product_id": 16, "product_name": "显示器", "category": "配件", "unit_price": 1299.0, "stock_quantity": 120},
    {"product_id": 17, "product_name": "小米平板", "category": "平板", "unit_price": 2299.0, "stock_quantity": 100},
    {"product_id": 18, "product_name": "华为平板", "category": "平板", "unit_price": 3599.0, "stock_quantity": 85},
    {"product_id": 19, "product_name": "蓝牙耳机", "category": "配件", "unit_price": 499.0, "stock_quantity": 300},
    {"product_id": 20, "product_name": "手机壳", "category": "配件", "unit_price": 49.0, "stock_quantity": 1000},
    {"product_id": 21, "product_name": "充电器", "category": "配件", "unit_price": 129.0, "stock_quantity": 800},
    {"product_id": 22, "product_name": "移动电源", "category": "配件", "unit_price": 199.0, "stock_quantity": 600},
    {"product_id": 23, "product_name": "ThinkPad", "category": "笔记本", "unit_price": 8999.0, "stock_quantity": 40},
]

for row in product_data:
    stmt = insert(products).values(**row)
    with engine.begin() as connection:
        connection.execute(stmt)

# 插入示例订单数据
order_data = [
    {"order_id": 1, "product_id": 1, "customer_name": "张三", "order_date": "2024-01-01", "quantity": 2,
     "total_amount": 11998.0},
    {"order_id": 2, "product_id": 2, "customer_name": "李四", "order_date": "2024-01-02", "quantity": 1,
     "total_amount": 12999.0},
    {"order_id": 3, "product_id": 3, "customer_name": "王五", "order_date": "2024-01-03", "quantity": 3,
     "total_amount": 5997.0},
    {"order_id": 4, "product_id": 4, "customer_name": "赵六", "order_date": "2024-01-03", "quantity": 1,
     "total_amount": 4799.0},
    {"order_id": 5, "product_id": 5, "customer_name": "钱七", "order_date": "2024-01-04", "quantity": 2,
     "total_amount": 6598.0},
    {"order_id": 6, "product_id": 1, "customer_name": "孙八", "order_date": "2024-01-04", "quantity": 1,
     "total_amount": 5999.0},
    {"order_id": 7, "product_id": 7, "customer_name": "周九", "order_date": "2024-01-05", "quantity": 1,
     "total_amount": 6999.0},
    {"order_id": 8, "product_id": 10, "customer_name": "吴十", "order_date": "2024-01-05", "quantity": 5,
     "total_amount": 1245.0},
    {"order_id": 9, "product_id": 14, "customer_name": "郑十一", "order_date": "2024-01-06", "quantity": 3,
     "total_amount": 1197.0},
    {"order_id": 10, "product_id": 6, "customer_name": "王婷婷", "order_date": "2024-01-06", "quantity": 2,
     "total_amount": 7998.0},
    {"order_id": 11, "product_id": 8, "customer_name": "李明", "order_date": "2024-01-07", "quantity": 1,
     "total_amount": 5999.0},
    {"order_id": 12, "product_id": 12, "customer_name": "张华", "order_date": "2024-01-07", "quantity": 2,
     "total_amount": 5998.0},
    {"order_id": 13, "product_id": 15, "customer_name": "刘芳", "order_date": "2024-01-08", "quantity": 4,
     "total_amount": 516.0},
    {"order_id": 14, "product_id": 17, "customer_name": "陈明", "order_date": "2024-01-08", "quantity": 1,
     "total_amount": 2299.0},
    {"order_id": 15, "product_id": 20, "customer_name": "王磊", "order_date": "2024-01-09", "quantity": 10,
     "total_amount": 490.0},
    {"order_id": 16, "product_id": 3, "customer_name": "李娜", "order_date": "2024-01-09", "quantity": 2,
     "total_amount": 3998.0},
    {"order_id": 17, "product_id": 9, "customer_name": "张伟", "order_date": "2024-01-10", "quantity": 1,
     "total_amount": 6599.0},
    {"order_id": 18, "product_id": 11, "customer_name": "王秀英", "order_date": "2024-01-10", "quantity": 2,
     "total_amount": 2998.0},
    {"order_id": 19, "product_id": 19, "customer_name": "李军", "order_date": "2024-01-11", "quantity": 3,
     "total_amount": 1497.0},
    {"order_id": 20, "product_id": 13, "customer_name": "刘洋", "order_date": "2024-01-11", "quantity": 1,
     "total_amount": 9999.0},
    {"order_id": 21, "product_id": 21, "customer_name": "张萍", "order_date": "2024-01-12", "quantity": 5,
     "total_amount": 645.0},
    {"order_id": 22, "product_id": 22, "customer_name": "王强", "order_date": "2024-01-12", "quantity": 3,
     "total_amount": 597.0},
    {"order_id": 23, "product_id": 16, "customer_name": "李艳", "order_date": "2024-01-13", "quantity": 2,
     "total_amount": 2598.0},
]

for row in order_data:
    stmt = insert(orders).values(**row)
    with engine.begin() as connection:
        connection.execute(stmt)


# 获取表结构信息
def get_table_info(table_name):
    inspector = inspect(engine)
    columns_info = [(col["name"], col["type"]) for col in inspector.get_columns(table_name)]
    return "Columns:\n" + "\n".join([f"  - {name}: {col_type}" for name, col_type in columns_info])


@tool
def sql_engine(query: str) -> str:
    """
    执行SQL查询,支持商品表(products)和订单表(orders)的联合查询。

    商品表结构:
    - product_id: INTEGER (主键)
    - product_name: VARCHAR(50)
    - category: VARCHAR(20)
    - unit_price: FLOAT
    - stock_quantity: INTEGER

    订单表结构:
    - order_id: INTEGER (主键)
    - product_id: INTEGER (外键关联products表)
    - customer_name: VARCHAR(50)
    - order_date: VARCHAR(10)
    - quantity: INTEGER
    - total_amount: FLOAT

    Args:
        query: SQL查询语句
    """
    output = ""
    with engine.connect() as con:
        rows = con.execute(text(query))
        for row in rows:
            output += "\n" + str(row)
    return output


# 创建agent实例
agent = CodeAgent(
    tools=[sql_engine],
    model=LiteLLMModel(model_id="gpt-4o-mini"),
)

# 示例查询
# print("===示例查询1: 获取销量最高的商品信息===")
# agent.run("""
# 查询销量最高的商品的详细信息,包括商品名称、销量和销售总额。
# 需要联合查询products和orders表,按订单数量统计。
# """)

# print("\n===示例查询2: 获取库存紧张的商品===")
# agent.run("""
# 查询当前库存数量低于50件的商品信息,
# 返回商品名称、类别、当前库存数量,按库存数量升序排序。
# """)

# print("===示例查询3: 各类别商品的销售统计===")
# agent.run("""
# 统计每个商品类别的总销售额和销售数量,
# 按销售总额降序排序,同时显示该类别的商品数量。
# """)

print("\n===示例查询4: 热销商品分析===")
agent.run("""
查找单价超过1000元且销量超过2件的商品,
显示商品名称、单价、销量、销售总额,
按销售总额降序排序。
""")

print("\n===示例查询5: 客户购买力分析===")
agent.run("""
统计每个客户的消费总额和购买次数,
只显示消费总额超过10000元的客户,
按消费总额降序排序。
""")

print("\n===示例查询6: 商品库存周转分析===")
agent.run("""
计算每个商品的销量与库存比率(周转率),
显示商品名称、销量、当前库存、周转率,
只显示周转率超过10%的商品,
按周转率降序排序。
""")

print("\n===示例查询7: 日销售趋势分析===")
agent.run("""
统计每天的订单数量、销售总额、平均订单金额,
按日期升序排序。
""")

```

## 结语

smolagents的出现让AI智能体开发变得前所未有的简单和高效。无论你是AI开发新手还是经验丰富的开发者，都能快速上手并构建强大的AI应用。它的开源发布必将推动AI智能体技术的普及和发展。

