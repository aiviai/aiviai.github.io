---
layout: single
title: "Qwen/Qwen2.5-72B-Instruct"
sidebar:
  nav: "docs"
date: 2024-09-20 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, LLM, Ollama, Qwen]
classes: wide
author_profile: true
---


#  Qwen/Qwen2.5-72B-Instruct 

###  ollama 
    
    
    ollama run qwen2.5:7b
    
    ollama run qwen2.5:14b [8GB vram]
    
    ollama run qwen2.5:32b [24GB vram]
    
    ollama run qwen2.5:72b [48GB vram]
    

###  vLLM 
    
    
    conda create -n myenv python=3.10 -y
    
    conda activate myenv
    
    pip install vllm
    
    
    vllm serve Qwen/Qwen2.5-32B-Instruct --dtype auto --api-key test
    
    
    
    

###  推理题 
    
    
    8.11和8.9哪个大？
    
    
```
    在一个立方体房间里,四面墙壁分别朝向东南西北,每面墙上都有一扇门。
    东门的颜色是橙色，南门的颜色是紫色，西门的颜色是青色，北门的颜色是白色。
    房间中央有一个正方形转盘,转盘的四个角放置着4个不同颜色的立方体积木:红、蓝、绿、黄。
    此时红色立方体对着东门，蓝色立方体对着南门，绿色立方体对着西门，黄色立方体对着北门。
    现在开始计时，正方形转盘顺时针开始转动。
    每过五分钟，正方形转盘转动一周。
    当正方形转盘转动一周时，红色立方体和绿色立方体交换位置，蓝色立方体和黄色立方体交换位置；
    东门和南门的颜色交换，西门和北门的颜色交换。
    每过15分钟，门和立方体自动恢复到第0分钟的状态。
    就在计时到了第20分钟时，红、蓝、绿、黄立方体分别对应哪个方向的门，四个门分别是什么颜色？
```
    
    
    
```
    小A去商店买了90元的东西,但发现自己只带了20元。
    商店老板借给他80元,小A用这100元付款后,商店老板找回10元给他。
    回家后拿到钱后，小A来到商店把80元还给超市老板。
    但超市老板总感觉下A给的少了，请问小A应该给多少钱？
```
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  算法题 

[ https://edabit.com/challenge/QN4RMpAnktNvMCWwg ](<https://edabit.com/challenge/QN4RMpAnktNvMCWwg>)

[ https://edabit.com/challenge/WyEL2YcemhrS4waEE ](<https://edabit.com/challenge/WyEL2YcemhrS4waEE>)

[ https://edabit.com/challenge/quMt6typruySiNSAJ ](<https://edabit.com/challenge/quMt6typruySiNSAJ>)

###  Text to Sql 
    
    
```
    graph LR
        A[用户输入自然语言查询] --> B[大型语言模型 LLM]
        B --> C{理解查询意图}
        C --> D[结合数据库结构信息]
        D --> E[生成SQL查询]
        E --> F[执行SQL查询]
        F --> G[获取查询结果]
        G --> H[LLM解释结果]
        H --> I[生成自然语言回答]
        I --> J[向用户展示结果]
```
    
```
        classDef default fill:#e6e6fa,stroke:#4b0082,stroke-width:2px,color:#4b0082;
        classDef llm fill:#4b0082,stroke:#4b0082,stroke-width:2px,color:#e6e6fa;
        classDef process fill:#4169e1,stroke:#4b0082,stroke-width:2px,color:#e6e6fa;
        classDef decision fill:#6a5acd,stroke:#4b0082,stroke-width:2px,color:#e6e6fa;
```
    
```
        class A,J default;
        class B,H llm;
        class C decision;
        class D,E,F,G,I process;
```
    
    
    %pip install llama-index-llms-openrouter
    
    !pip install llama-index
    
```
    import os
    from llama_index.llms.openrouter import OpenRouter
    from llama_index.core.llms import ChatMessage
```
    
    os.environ["OPENROUTER_API_KEY"] = "sk-or-v1-"
    
    from IPython.display import Markdown, display
    
```
    from sqlalchemy import (
        create_engine,
        MetaData,
        Table,
        Column,
        String,
        Integer,
        Float,
        select,
        insert,
    )
```
    
```
    # 创建内存数据库
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
```
    
    # 创建产品库存表
    
```
    table_name = "product_inventory"
    product_inventory_table = Table(
        table_name,
        metadata_obj,
        Column("product_id", String(16), primary_key=True),
        Column("product_name", String(50), nullable=False),
        Column("quantity", Integer),
        Column("unit_price", Float),
        Column("category", String(20)),
    )
    metadata_obj.create_all(engine)
```
    
    
    from llama_index.core import SQLDatabase
    
```
    # 初始化LLM
    llm = OpenRouter(
        api_key=os.environ.get("OPENROUTER_API_KEY"),
        max_tokens=4096,
        context_window=131072, 
        model="qwen/qwen-2.5-72b-instruct",
    )
```
    
    # 创建SQL数据库对象
    sql_database = SQLDatabase(engine, include_tables=["product_inventory"])
    
    # 创建SQL数据库对象
    sql_database = SQLDatabase(engine, include_tables=["product_inventory"])
    
```
    # 插入50条示例数据请自行模拟
    rows = [
    ]
```
    
```
    for row in rows:
        stmt = insert(product_inventory_table).values(**row)
        with engine.begin() as connection:
            connection.execute(stmt)
```
    
    
```
    # 查看当前表内容
    stmt = select(
        product_inventory_table.c.product_id,
        product_inventory_table.c.product_name,
        product_inventory_table.c.quantity,
        product_inventory_table.c.unit_price,
        product_inventory_table.c.category,
    ).select_from(product_inventory_table)
```
    
    
    #演示如何执行原始 SQL 查询，该查询可直接在表上执行
    from sqlalchemy import text
    
```
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
        for row in results:
            print(row)
```
    
    from llama_index.core.query_engine import NLSQLTableQueryEngine
    
```
    # 创建查询引擎
    query_engine = NLSQLTableQueryEngine(
        sql_database=sql_database, tables=["product_inventory"], llm=llm
    )
```
    
```
    # 示例查询
    query_str = "哪个类别的产品种类最多？"
    response = query_engine.query(query_str)
```
    
    display(Markdown(f"<b>{response}</b>"))
    
    
    
    
    
    
    
    
