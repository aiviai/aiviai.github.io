---
layout: single
title: "crewAI + codestral AI超元域频道原创代码和视频"
sidebar:
  nav: "docs"
date: 2024-05-31 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM]
tags: [AI, AI-Agents, CrewAI, LLM, Ollama]
classes: wide
author_profile: true
---


#  crewAI + codestral AI超元域频道原创代码和视频 

###  ollama安装codestral 
    
    
    ollama run codestral:22b
    
    
    ##为ollama开启公网ip
    sudo nano /etc/systemd/system/ollama.service.d/override.conf
    
```
    ##输入
    [Service]
    Environment="OLLAMA_HOST=0.0.0.0"
```
    
    
    sudo systemctl daemon-reload
    
    sudo systemctl restart ollama.service
    

###  安装crewAI 
    
    
    pip install crewai
    
    pip install 'crewai[tools]'
    

###  完整代码 
    
    
```
    ###本视频和代码由AI超元域频道原创 禁止盗搬 如有问题请联系我的徽信 stoeng
    import os
    from textwrap import dedent
    from crewai import Agent, Task, Crew, Process
```
    
```
    # 设置环境变量，指定模型的基础URL、模型名称和API密钥
    os.environ["OPENAI_API_BASE"] = 'http://localhost:11434/v1'
    os.environ["OPENAI_MODEL_NAME"] ='codestral:22b'  # Adjust based on available model
    os.environ["OPENAI_API_KEY"] ='ollama'
```
    
    # 获取用户输入的游戏类型和机制
    game = input("What is the game you would like to build? What will be the mechanics?\n")
    
```
    # 定义一个高级软件工程师角色的Agent
    senior_engineer_agent = Agent(
        role='Senior Software Engineer',
        goal='Create software as needed',
        backstory=dedent("""\Instructions
                            You are a Senior Software Engineer at a leading tech think tank.
                            Your expertise in programming in python. and do your best to
                            produce perfect code"""),
        allow_delegation=False,
        verbose=True
    )
```
    
```
    # 定义一个软件质量控制工程师角色的Agent
    qa_engineer_agent = Agent(
        role='Software Quality Control Engineer',
        goal='create prefect code, by analizing the code that is given for errors',
        backstory=dedent("""\
                            You are a software engineer that specializes in checking code
                            for errors. You have an eye for detail and a knack for finding
                            hidden bugs.
                            You check for missing imports, variable declarations, mismatched
                            brackets and syntax errors.
                            You also check for security vulnerabilities, and logic errors"""),
        allow_delegation=False,
        verbose=True
    )
```
    
```
    # 定义一个首席软件质量控制工程师角色的Agent
    ###本视频和代码由AI超元域频道原创 禁止盗搬 如有问题请联系我的徽信 stoeng
    chief_qa_engineer_agent = Agent(
        role='Chief Software Quality Control Engineer',
        goal='Ensure that the code does the job that it is supposed to do',
        backstory=dedent("""\
                            You feel that programmers always do only half the job, so you are
                            super dedicate to make high quality code."""),
        allow_delegation=True,
        verbose=True
    )
```
    
```
    # # 为你的Agents创建任务
    code_task = Task(
        description=dedent(f"""You will create a game using python, these are the instructions:
```
                    
```
                                Instructions
                                ------------
                            {game}
```
                    
```
                                Your Final answer must be the full python code, only the python code and nothing else.
      			        """),
        expected_output="A complete Python game code implementing all specified mechanics, fully functional and commented.",
        agent=senior_engineer_agent
    )
```
    
```
    review_task = Task(
        description=dedent(f"""\
                                You are helping create a game using python, these are the instructions:
```
                    
```
                                Instructions
                                ------------
                                {game}
```
                    
```
                                Using the code you got, check for errors. Check for logic errors,
                                syntax errors, missing imports, variable declarations, mismatched brackets,
                                and security vulnerabilities.
```
                    
```
                                Your Final answer must be the full python code, only the python code and nothing else.
      			        """),
        expected_output="An error-checked and corrected Python game code, ensuring no syntax, logical, or security flaws are present.",
        agent=qa_engineer_agent
    )
```
    
```
    evaluate_task = Task(
        description=dedent(f"""\
                                You are helping create a game using python, these are the instructions:
```
                    
```
                                Instructions
                                ------------
                                {game}
```
                    
                                You will look over the code to insure that it is complete and
                                does the job that it is supposed to do.
                    
```
                                Your Final answer must be the full python code, only the python code and nothing else.
    			            """),
        expected_output="A finalized Python game code that is reviewed for completeness, functionality, and optimization.",
        agent=chief_qa_engineer_agent
    )
```
    
```
    # 用顺序流程实例化你的团队
    ###本视频和代码由AI超元域频道原创 禁止盗搬
    crew = Crew(
      agents=[senior_engineer_agent, qa_engineer_agent,chief_qa_engineer_agent],
      tasks=[code_task, review_task,evaluate_task],
      verbose=2, # You can set it to 1 or 2 to different logging levels
    )
```
    
    # 让你的团队开始工作！
    game = crew.kickoff()
    
```
    # 输出结果
    print("\n\n########################")
    print("## Here is the result")
    print("########################\n")
    print("final code for the game:")
    print(game)
```

##  如有问题请联系我的徽信 stoeng 

##  🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇ 

##  👉👉👉 [ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>)

##  👉👉👉 [ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>)
