---
layout: single
title: "mistral large 2 & ollama实现Tool-Use/function calling[openai和ollama]"
sidebar:
  nav: "docs"
date: 2024-07-28 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM]
tags: [AI, AI-Agents, AutoGen, LLM, Mistral, Ollama]
classes: wide
author_profile: true
---


#  mistral large 2 & ollama实现Tool-Use/function calling[openai和ollama] 

###  colab链接 

[ Google Colab  ![Image](https://ssl.gstatic.com/colaboratory-static/common/9a91b8ba1025a6ed5781f84f290a8cb5/img/favicon.ico) https://colab.research.google.com/drive/1EuFDiWuB6FXjhkf6zk1LrnHTLLSfgeo-?usp=sharing  ![Image](https://colab.research.google.com/img/colab_favicon_256px.png) ](<https://colab.research.google.com/drive/1EuFDiWuB6FXjhkf6zk1LrnHTLLSfgeo-?usp=sharing>)

测试推理题目 
    
    
```
    在一个立方体房间里,四面墙壁分别朝向东南西北,每面墙上都有一扇门。
    东门的颜色是橙色，南门的颜色是紫色，西门的颜色是青色，北门的颜色是白色。
    房间中央有一个正方形转盘,转盘的四个角放置着4个不同颜色的立方体积木:红、蓝、绿、黄。
    此时红色立方体对着东门，蓝色立方体对着南门，绿色立方体对着西门，黄色立方体对着北门。
    现在开始计时，正方形转盘开始转动。
    每过五分钟，正方形转盘转动一周。
    当正方形转盘转动一周时，红色立方体和绿色立方体交换位置，蓝色立方体和黄色立方体交换位置；
    东门和南门的颜色交换，西门和北门的颜色交换。
    每过15分钟，时间就会倒流5分钟。
    就在计时到了第三十五分钟时，红、蓝、绿、黄立方体分别对应哪个方向的门，四个门分别是什么颜色？
```
    

算法测试 

[ https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k/description/ ](<https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k/description/>)

###  openai 接口demo 
    
    
    #pip install openai
    
    import os
    from openai import OpenAI
    
```
    client = OpenAI(
        api_key=os.environ.get("MISTRAL_API_KEY"),
        base_url="https://api.mistral.ai/v1"
    )
```
    
```
    stream = client.chat.completions.create(
        model="mistral-large-latest",
        messages=[
            {
                "role": "user",
                "content": "三个人分披萨,每人分得三分之一。如果来了三倍的人,每人能分到多少??",
            }
        ],
        stream=True
    )
```
    
```
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            print(chunk.choices[0].delta.content, end="", flush=True)
    print()  # 添加一个换行
```

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  mistral 接口demo 
    
    
```
    import os
    from mistralai.client import MistralClient
    from mistralai.models.chat_completion import ChatMessage
```
    
    api_key = os.environ["MISTRAL_API_KEY"]
    model = "mistral-large-latest"
    
    client = MistralClient(api_key=api_key)
    
```
    chat_response = client.chat(
        model=model,
        messages=[ChatMessage(role="user", content="三个人分披萨,每人分得三分之一。如果来了三倍的人,每人能分到多少?")]
    )
```
    
    print(chat_response.choices[0].message.content)

###  ollama运行mistral-large 
    
    
    curl -fsSL https://ollama.com/install.sh | sh
    
    ollama run mistral-large

###  openai function calling实现计算器 
    
    
    import os
    from openai import OpenAI
    
    # 设置您的OpenAI API密钥
    os.environ["OPENAI_API_KEY"] = "ollama"
    
```
    # 初始化OpenAI客户端，设置自定义base URL
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
        base_url="http://localhost:11434/v1"  # 替换为您的自定义端点
    )
```
    
    
```
    # 定义计算函数
    def add(a, b):
        return a + b
```
    
    
    def subtract(a, b):
        return a - b
    
    
    def multiply(a, b):
        return a * b
    
    
```
    def divide(a, b):
        if b == 0:
            return "错误：除数不能为零"
        return a / b
```
    
    
```
    # 定义可用的函数
    available_functions = {
        "add": add,
        "subtract": subtract,
        "multiply": multiply,
        "divide": divide,
    }
```
    
```
    # 定义函数描述
    tools = [
        {
            "type": "function",
            "function": {
                "name": "add",
                "description": "加法运算",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "a": {"type": "number"},
                        "b": {"type": "number"}
                    },
                    "required": ["a", "b"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "subtract",
                "description": "减法运算",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "a": {"type": "number"},
                        "b": {"type": "number"}
                    },
                    "required": ["a", "b"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "multiply",
                "description": "乘法运算",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "a": {"type": "number"},
                        "b": {"type": "number"}
                    },
                    "required": ["a", "b"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "divide",
                "description": "除法运算",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "a": {"type": "number"},
                        "b": {"type": "number"}
                    },
                    "required": ["a", "b"]
                }
            }
        }
    ]
```
    
    
    def run_conversation(user_input):
        messages = [{"role": "user", "content": user_input}]
    
```
        while True:
            try:
                response = client.chat.completions.create(
                    model="mistral-nemo",
                    messages=messages,
                    tools=tools,
                    tool_choice="auto",
                )
```
    
                response_message = response.choices[0].message
    
```
                if response_message.tool_calls:
                    for tool_call in response_message.tool_calls:
                        function_name = tool_call.function.name
                        function_args = eval(tool_call.function.arguments)
```
    
                        function_response = available_functions[function_name](**function_args)
    
```
                        messages.append(response_message)
                        messages.append({
                            "role": "tool",
                            "tool_call_id": tool_call.id,
                            "name": function_name,
                            "content": str(function_response),
                        })
                else:
                    return response_message.content
            except Exception as e:
                return f"发生错误：{str(e)}"
```
    
    
```
    # 主程序
    if __name__ == "__main__":
        print("欢迎使用简单计算器！")
        print("您可以进行加法、减法、乘法和除法运算。")
        print("请用自然语言输入您的计算需求，例如：'请帮我计算23加17'")
        print("输入'退出'来结束程序。")
```
    
```
        while True:
            user_input = input("\n请输入您的计算需求：")
            if user_input.lower() == '退出':
                print("谢谢使用，再见！")
                break
```
    
            result = run_conversation(user_input)
            print(result)

###  ollama function calling实现航班信息查询 
    
    
```
    import json
    import ollama
    import asyncio
```
    
    
```
    # Simulates an API call to get flight times
    # In a real application, this would fetch data from a live database or API
    def get_flight_times(departure: str, arrival: str) -> str:
      flights = {
        'NYC-LAX': {'departure': '08:00 AM', 'arrival': '11:30 AM', 'duration': '5h 30m'},
        'LAX-NYC': {'departure': '02:00 PM', 'arrival': '10:30 PM', 'duration': '5h 30m'},
        'LHR-JFK': {'departure': '10:00 AM', 'arrival': '01:00 PM', 'duration': '8h 00m'},
        'JFK-LHR': {'departure': '09:00 PM', 'arrival': '09:00 AM', 'duration': '7h 00m'},
        'CDG-DXB': {'departure': '11:00 AM', 'arrival': '08:00 PM', 'duration': '6h 00m'},
        'DXB-CDG': {'departure': '03:00 AM', 'arrival': '07:30 AM', 'duration': '7h 30m'},
      }
```
    
      key = f'{departure}-{arrival}'.upper()
      return json.dumps(flights.get(key, {'error': 'Flight not found'}))
    
    
```
    async def run(model: str):
      client = ollama.AsyncClient()
      # Initialize conversation with a user query
      messages = [{'role': 'user', 'content': 'What is the flight time from New York (NYC) to Los Angeles (LAX)?'}]
```
    
```
      # First API call: Send the query and function description to the model
      response = await client.chat(
        model=model,
        messages=messages,
        tools=[
          {
            'type': 'function',
            'function': {
              'name': 'get_flight_times',
              'description': 'Get the flight times between two cities',
              'parameters': {
                'type': 'object',
                'properties': {
                  'departure': {
                    'type': 'string',
                    'description': 'The departure city (airport code)',
                  },
                  'arrival': {
                    'type': 'string',
                    'description': 'The arrival city (airport code)',
                  },
                },
                'required': ['departure', 'arrival'],
              },
            },
          },
        ],
      )
```
    
      # Add the model's response to the conversation history
      messages.append(response['message'])
    
```
      # Check if the model decided to use the provided function
      if not response['message'].get('tool_calls'):
        print("The model didn't use the function. Its response was:")
        print(response['message']['content'])
        return
```
    
```
      # Process function calls made by the model
      if response['message'].get('tool_calls'):
        available_functions = {
          'get_flight_times': get_flight_times,
        }
        for tool in response['message']['tool_calls']:
          function_to_call = available_functions[tool['function']['name']]
          function_response = function_to_call(tool['function']['arguments']['departure'], tool['function']['arguments']['arrival'])
          # Add function response to the conversation
          messages.append(
            {
              'role': 'tool',
              'content': function_response,
            }
          )
```
    
```
      # Second API call: Get final response from the model
      final_response = await client.chat(model=model, messages=messages)
      print(final_response['message']['content'])
```
    
    
    # Run the async function
    asyncio.run(run('mistral-nemo'))

###  Parallel function calling实现电商 **客户服务系统**
    
    
    #pip install mistralai pandas
    
```
    import os
    import pandas as pd
    import json
    import time
    from functools import partial
    from google.colab import userdata
    from mistralai.client import MistralClient
    from mistralai.models.chat_completion import ChatMessage
    from mistralai.exceptions import MistralAPIStatusException, MistralAPIException
```
    
    MISTRAL_API_KEY =os.environ.get("MISTRAL_API_KEY")
    
```
    # 模拟订单数据库
    order_data = {
        '订单号': ['O1001', 'O1002', 'O1003', 'O1004', 'O1005'],
        '客户ID': ['C001', 'C002', 'C003', 'C002', 'C001'],
        '总金额': [1255.50, 899.99, 1200.00, 543.30, 2102.20],
        '下单日期': ['2024-07-20', '2024-07-21', '2024-07-22', '2024-07-23', '2024-07-24'],
        '状态': ['已送达', '处理中', '已发货', '已取消', '处理中'],
        '预计送达日期': ['2024-07-25', '2024-07-28', '2024-07-26', None, '2024-07-29']
    }
    df = pd.DataFrame(order_data)
```
    
```
    def get_order_status(order_id: str) -> str:
        """获取订单状态"""
        if order_id in df.订单号.values:
            return json.dumps({'状态': df[df.订单号 == order_id].状态.item()})
        return json.dumps({'错误': '未找到该订单号。'})
```
    
```
    def get_estimated_delivery(order_id: str) -> str:
        """获取预计送达日期"""
        if order_id in df.订单号.values:
            delivery_date = df[df.订单号 == order_id].预计送达日期.item()
            if pd.isna(delivery_date):
                return json.dumps({'错误': '暂无预计送达日期信息。'})
            return json.dumps({'预计送达日期': delivery_date})
        return json.dumps({'错误': '未找到该订单号。'})
```
    
```
    # 可用函数字典
    available_functions = {
        "get_order_status": get_order_status,
        "get_estimated_delivery": get_estimated_delivery,
    }
```
    
```
    # 工具定义
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_order_status",
                "description": "获取订单的当前状态",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_id": {
                            "type": "string",
                            "description": "订单号",
                        }
                    },
                    "required": ["order_id"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_estimated_delivery",
                "description": "获取订单的预计送达日期",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_id": {
                            "type": "string",
                            "description": "订单号",
                        }
                    },
                    "required": ["order_id"],
                },
            },
        }
    ]
```
    
```
    def run_conversation(query: str):
        """运行对话，处理用户查询并返回结果"""
        messages = [ChatMessage(role="user", content=query)]
```
        
```
        # 步骤 1: 发送对话和可用函数到模型
        response = client.chat(
            model="mistral-large-latest",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )
```
        
        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls
        
```
        # 步骤 2: 检查模型是否想要调用函数 执行多个函数调用
        if tool_calls:
            messages.append(response_message)  # 将助手的回复添加到对话中
```
            
```
            # 步骤 3: 执行所有函数调用
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_to_call = available_functions[function_name]
                function_args = json.loads(tool_call.function.arguments)
                function_response = function_to_call(**function_args)
                messages.append(ChatMessage(
                    role="tool",
                    content=function_response,
                    name=function_name,
                    tool_call_id=tool_call.id
                ))
```
            
```
            # 步骤 4: 发送函数调用信息和函数响应给模型
            second_response = client.chat(
                model="mistral-large-latest",
                messages=messages,
            )
            return second_response.choices[0].message.content
```
        
        return response_message.content
    
```
    # 示例使用
    if __name__ == "__main__":
        print(run_conversation("订单O1002和O1003的状态如何？它们预计什么时候送达？"))
```
    

###  atuogen调用mistral api 
    
    
    pip install pyautogen[mistral]
    pip install dask[dataframe]
    
    
    import os
    
```
    config_list = [
        {
            # 选择 mistral-large-latest 模型
            "model": "mistral-large-latest",
            # 在这里提供您的 Mistral AI API 密钥，或将其放入 MISTRAL_API_KEY 环境变量中
            "api_key": os.environ.get("MISTRAL_API_KEY"),
            # 将 API 类型指定为 'mistral'，以使用 Mistral AI 客户端类
            "api_type": "mistral",
        }
    ]
```
    
    
    from pathlib import Path
    
    from autogen import AssistantAgent, UserProxyAgent
    from autogen.coding import LocalCommandLineCodeExecutor
    
```
    # 设置代码执行器
    workdir = Path("coding")
    workdir.mkdir(exist_ok=True)
    code_executor = LocalCommandLineCodeExecutor(work_dir=workdir)
```
    
    # 设置代理
    
```
    # UserProxyAgent 将执行 AssistantAgent 提供的代码
    user_proxy_agent = UserProxyAgent(
        name="用户",
        code_execution_config={"executor": code_executor},
        is_termination_msg=lambda msg: "完成" in msg.get("content"),
    )
```
    
```
    system_message = """你是一个有帮助的 AI 助手，可以编写代码，而用户则执行这些代码。
    使用你的编码和语言技能来解决任务。
    在以下情况下，为用户提供 Python 代码（在 Python 代码块中）以供执行。
    如果需要，请逐步解决任务。如果没有提供计划，请先解释你的计划。清楚地说明哪一步使用代码，哪一步使用你的语言技能。
    使用代码时，你必须在代码块中指明脚本类型。用户除了执行你建议的代码外，不能提供任何其他反馈或执行任何其他操作。用户不能修改你的代码。因此，不要提供需要用户修改的不完整代码。如果代码块不是用于用户执行，则不要使用代码块。
    不要在一个回复中包含多个代码块。不要要求用户复制粘贴结果。相反，在相关时使用 'print' 函数输出结果。检查用户返回的执行结果。
    如果结果表明有错误，请修复错误并再次输出代码。建议完整的代码，而不是部分代码或代码更改。如果错误无法修复，或者即使代码成功执行后任务仍未解决，请分析问题，重新审视你的假设，收集你需要的额外信息，并考虑尝试不同的方法。
    当你找到答案时，请仔细验证答案。如果可能，在你的回复中包含可验证的证据。
    重要：等待用户执行你的代码，然后你可以回复"完成"一词。不要在代码块后输出"完成"。"""
```
    
```
    # AssistantAgent 使用 Mistral AI 的模型，接收编码请求并返回代码
    assistant_agent = AssistantAgent(
        name="Mistral 助手",
        system_message=system_message,
        llm_config={"config_list": config_list},
    )
```
    
    
```
    # 开始对话，UserProxyAgent 向 AssistantAgent 发送消息
    chat_result = user_proxy_agent.initiate_chat(
        assistant_agent,
        message="提供代码来计算 1 到 10000 之间的质数数量。",
    )
```
