---
layout: single
title: "🔥command-r-plus最强开源大模型"
sidebar:
  nav: "docs"
date: 2024-09-04 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG]
tags: [AI, AI-Agents, AutoGen, HuggingFace, LLM, LlamaIndex, Ollama, RAG]
classes: wide
author_profile: true
---


#  🔥command-r-plus最强开源大模型 

C4AI Command R+（2024年8月版）是CohereForAI推出的一款极为强大的语言模型，拥有1040亿参数。以下是该模型的详细信息： 

  1. **高级检索增强生成（RAG）** ：Command R+ 支持先进的RAG能力，即通过检索相关文档片段来增强生成内容。这使得它在需要结合多种信息来源的任务中表现非常出色，能够生成有依据的响应，并且可以提供引用回文档的能力，适用于复杂的知识增强场景。 


  2. **多步骤工具使用** ：模型经过训练能够在对话中进行多步骤的工具使用。例如，模型可以在一轮对话中调用多个工具来完成一个复杂的任务，还能够识别并使用特殊的 ` directly_answer ` 工具，这使得它可以选择不使用任何工具，而直接提供答案。这种能力使模型在处理任务自动化、问答以及智能对话中具有很大的灵活性。 


  3. **多语言支持** ：Command R+支持10种语言，经过多语言评估，使得它能够在不同语言和文化背景下应用。这为跨语言的自然语言处理任务提供了广泛的支持。 


  4. **优化的应用场景** ：模型特别适合用于推理、摘要生成、问答系统等应用场景。此外，它的工具使用和RAG能力，使得它在开发智能助手、内容生成工具、知识管理系统方面有着广阔的应用前景。 


  5. **训练与使用** ：模型通过监督微调和偏好微调的混合方式进行了训练。用户可以通过特定的提示模板与模型进行互动，并可以灵活调整这些模板，以探索模型的各种功能和表现。CohereForAI还提供了全面的文档，以帮助开发者充分利用Command R+的工具使用功能。 


这些特性使C4AI Command R+成为自然语言处理领域中极具前景的模型，适用于多种复杂的任务和应用场景。 

###  模型链接 

[ https://huggingface.co/CohereForAI/c4ai-command-r-plus-08-2024 ](<https://huggingface.co/CohereForAI/c4ai-command-r-plus-08-2024>)

###  🔥online 

[ https://coral.cohere.com/ ](<https://coral.cohere.com/>)

###  🔥ollama 
    
    
```
    #https://ollama.com/library/command-r-plus
    ollama run command-r-plus
    ollama run command-r-plus:104b-fp16
```

###  🔥逻辑推理测试 
    
    
```
    张三去理发店理发，理发费用30元，但是张三没带钱，于是找理发店老板借了100块，
    用借的这100块，付了30块给理发店老板，老板找了70块给张三。
    张三回家拿钱后找到老板，并且给老板100块。
    但老板总觉得张三给少了，请问张三应该还给老板多少钱？
```
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  🔥autogen 

> AutoGen 是一个开源的编程框架，旨在简化多智能体人工智能应用的开发。通过结构化的多智能体对话，AutoGen 允许多个智能体进行互动与协作，以执行复杂任务。   
>    
>  该框架支持自主和人机协作的工作流程，能够无缝集成大型语言模型（LLM）、各种工具及人类输入。   
>    
>  AutoGen 提供高度可定制的智能体，适应特定应用需求，优化和自动化复杂的 AI 工作流程，从而推动下一代智能系统的发展和创新。   
> 
    
    
```
    import json
    import os
    from typing import Literal
    from typing_extensions import Annotated
    import autogen
    import asyncio
    from forex_python.converter import CurrencyRates
    import ssl
    import certifi
    import requests
```
    
    # 设置环境变量
    os.environ["COHERE_API_KEY"] = ""
    
```
    # API 配置列表
    config_list = [
        {"api_type": "cohere", "model": "command-r-plus", "api_key": os.getenv("COHERE_API_KEY"), "cache_seed": None}
    ]
```
    
```
    # 创建用于工具调用的助手代理
    chatbot = autogen.AssistantAgent(
        name="chatbot",
        system_message="""对于货币兑换和天气预报任务，
            只使用提供给你的函数。
            当提供了答案时输出'HAVE FUN!'""",
        llm_config={"config_list": config_list},
    )
```
    
```
    # 创建用户代理
    user_proxy = autogen.UserProxyAgent(
        name="user_proxy",
        is_termination_msg=lambda x: x.get("content", "") and "HAVE FUN!" in x.get("content", ""),
        human_input_mode="NEVER",
        max_consecutive_auto_reply=1,
    )
```
    
    # 货币兑换功能
    CurrencySymbol = Literal["USD", "EUR"]
    
    # 使用 forex-python 获取汇率
    c = CurrencyRates()
    
```
    # 添加一个简单的汇率字典作为备用
    backup_rates = {
        "EUR": {"USD": 1.1},
        "USD": {"EUR": 1/1.1}
    }
```
    
```
    @user_proxy.register_for_execution()
    @chatbot.register_for_llm(description="货币兑换计算器。")
    def currency_calculator(
        base_amount: Annotated[float, "基础货币的金额"],
        base_currency: Annotated[CurrencySymbol, "基础货币"] = "USD",
        quote_currency: Annotated[CurrencySymbol, "报价货币"] = "EUR",
    ) -> str:
        try:
            # 创建 SSL 上下文
            ssl_context = ssl.create_default_context(cafile=certifi.where())
            # 获取汇率
            rate = c.get_rate(base_currency, quote_currency)
            # 计算兑换金额
            quote_amount = rate * base_amount
            return f"{format(quote_amount, '.2f')} {quote_currency}"
        except Exception as e:
            # 使用备用汇率
            if base_currency in backup_rates and quote_currency in backup_rates[base_currency]:
                rate = backup_rates[base_currency][quote_currency]
                quote_amount = rate * base_amount
                return f"(使用备用汇率) {format(quote_amount, '.2f')} {quote_currency}"
            else:
                return f"获取汇率时出错，无可用备用汇率: {str(e)}"
```
    
```
    # 天气功能
    def get_weather(city):
        try:
            # WeatherAPI.com 的 API 密钥
            api_key = "8a5ea58a527f4d89a6d64152240409"
            # 构建 API 请求 URL
            url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={city}"
            # 发送 GET 请求
            response = requests.get(url)
            # 解析 JSON 响应
            data = response.json()
```
    
```
            if response.status_code == 200:
                # 提取位置信息
                location = data['location']
                # 提取当前天气信息
                current = data['current']
                temp_c = current['temp_c']
                temp_f = current['temp_f']
                condition = current['condition']['text']
                return f"{location['name']}, {location['country']}的天气: 当前温度 {temp_c}°C ({temp_f}°F), {condition}"
            else:
                # 返回错误信息
                return f"获取天气信息时出错: {data.get('error', {}).get('message', '未知错误')}"
        except Exception as e:
            # 捕获并返回任何异常
            return f"获取天气信息时出错: {str(e)}"
```
    
```
    @user_proxy.register_for_execution()
    @chatbot.register_for_llm(description="根据城市名称获取天气预报。")
    def weather_forecast(
        city: Annotated[str, "城市名称"],
    ) -> str:
        return get_weather(city)
```
    
```
    # 开始对话
    res = user_proxy.initiate_chat(
        chatbot,
        message="纽约的天气如何，你能告诉我123.45欧元兑换成美元是多少，以便我在假期中使用吗？再顺便给些假期建议。",
        summary_method="reflection_with_llm",
    )
```

###  🔥LlamaIndex 

> LlamaIndex 是一个多功能工具，旨在优化大型语言模型（LLM）与复杂数据集之间的交互。   
>    
>  它通过创建高效的索引结构，将原始数据转化为中间表示（如向量嵌入），从而在查询时实现快速且精确的数据检索。   
>    
>  LlamaIndex 还支持增强检索生成（RAG），通过结合上下文与 LLM 的能力来提高响应的准确性。此外，它提供集成工具，用于监控和评估 LLM 的性能，支持实时调整和持续改进。   
> 
    
    
    %pip install llama-index-llms-cohere
    %pip install llama-index-embeddings-cohere
    
    
    !pip install llama-index
    
    
```
    import os
    from sqlalchemy import (
        create_engine,
        MetaData,
        Table,
        Column,
        String,
        Integer,
        Float,
        select,
        text,
        insert,
    )
    from llama_index.core import SQLDatabase
    from llama_index.core.query_engine import NLSQLTableQueryEngine
    from llama_index.llms.cohere import Cohere
    from llama_index.embeddings.cohere import CohereEmbedding
```
    
    
    
    
    # 设置Cohere API密钥
    os.environ["CO_API_KEY"] = ""
    
    cohere_api_key = os.environ["CO_API_KEY"]
    
    
    
```
    # 创建数据库引擎
    engine = create_engine("sqlite:///:memory:")
    metadata_obj = MetaData()
```
    
    
    
```
    # 创建产品库存SQL表
    table_name = "产品库存"
    product_inventory_table = Table(
        table_name,
        metadata_obj,
        Column("产品编号", String(16), primary_key=True),
        Column("产品名称", String(64), nullable=False),
        Column("类别", String(32), nullable=False),
        Column("库存数量", Integer),
        Column("价格", Float),
    )
    metadata_obj.create_all(engine)
```
    
    
    
    
```
    # 添加样本数据
    rows = [
        {"产品编号": "LT001", "产品名称": "超薄笔记本Pro", "类别": "电子产品", "库存数量": 50, "价格": 6999.99},
        {"产品编号": "SP002", "产品名称": "智能手机X", "类别": "电子产品", "库存数量": 100, "价格": 4999.99},
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
    stmt = select(product_inventory_table)
    with engine.connect() as connection:
        results = connection.execute(stmt).fetchall()
        print("当前库存:")
        for row in results:
            print(row)
```
      
            
    
    
    
```
    # 示例查询1：查询电子产品类别的产品名称和库存数量
    print("\n电子产品库存:")
    with engine.connect() as con:
        rows = con.execute(text("SELECT 产品名称, 库存数量 FROM 产品库存 WHERE 类别 = '电子产品'"))
        for row in rows:
            print(row)
```
    
    
    
    
    
    
```
    # 示例查询2：查找库存低于100的产品
    print("\n库存低于100的产品:")
    with engine.connect() as con:
        rows = con.execute(text("SELECT 产品名称, 库存数量 FROM 产品库存 WHERE 库存数量 < 100"))
        for row in rows:
            print(row)
```
    
    
    
    
```
    # 示例查询3：计算总库存价值
    print("\n总库存价值:")
    with engine.connect() as con:
        result = con.execute(text("SELECT SUM(库存数量 * 价格) as 总价值 FROM 产品库存"))
        total_value = result.fetchone()[0]
        print(f"￥{total_value:.2f}")
```
    
    
    
    
    
    
```
    # 设置Cohere LLM和嵌入模型
    llm = Cohere(temperature=0.1, model="command-r-plus")
    # 创建Cohere嵌入模型
    embed_model = CohereEmbedding(
        api_key=os.environ["CO_API_KEY"],
        model_name="embed-multilingual-v3.0",
        input_type="search_query",
    )
```
    
    
    
    
    
    
```
    # 创建自然语言到SQL查询引擎
    query_engine = NLSQLTableQueryEngine(
        sql_database=sql_database,
        tables=["产品库存"],
        llm=llm,
        embed_model=embed_model
    )
```
    
    
    
    
    
    
```
    # 使用自然语言查询
    nl_query = "哪个产品的价格最高？"
    response = query_engine.query(nl_query)
    print(f"\n问题: {nl_query}")
    print(f"回答: {response}")
```
    
    
    
    
    
```
    nl_query = "库存量最多的产品是什么？"
    response = query_engine.query(nl_query)
    print(f"\n问题: {nl_query}")
    print(f"回答: {response}")
```
    
    
    
    
    
```
    nl_query = "经济学原理库存多少"
    response = query_engine.query(nl_query)
    print(f"\n问题: {nl_query}")
    print(f"回答: {response}")
```
    
    
    
    
    
```
    nl_query = "有多少种书籍？"
    response = query_engine.query(nl_query)
    print(f"\n问题: {nl_query}")
    print(f"回答: {response}")
```
    
    
    
    
    
```
    nl_query = "食品类有哪些？"
    response = query_engine.query(nl_query)
    print(f"\n问题: {nl_query}")
    print(f"回答: {response}")
```
    
    
    
    
    
```
    nl_query = "哪种食品价格最高？"
    response = query_engine.query(nl_query)
    print(f"\n问题: {nl_query}")
    print(f"回答: {response}")
```
    
    
