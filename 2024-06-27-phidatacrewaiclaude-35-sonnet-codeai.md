---
layout: single
title: "phidata+crewAI+Claude 3.5 sonnet 代码由AI超元域频道编写"
sidebar:
  nav: "docs"
date: 2024-06-27 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG, Tutorial, Vision]
tags: [AI, AI-Agents, Chainlit, Claude, CrewAI, GPT, LLM, LangChain, Ollama, RAG]
classes: wide
author_profile: true
---


#  phidata+crewAI+Claude 3.5 sonnet 代码由AI超元域频道编写 

###  Claude API [ https://console.anthropic.com/settings/keys ](<https://console.anthropic.com/settings/keys>)

###  phidata配置 
    
    
```
    python3 -m venv ~/.venvs/aienv
    source ~/.venvs/aienv/bin/activate
    pip install -U phidata
    export OPENAI_API_KEY=sk-***
    export ANTHROPIC_API_KEY=sk-***
    pip install -U pgvector pypdf "psycopg[binary]" sqlalchemy
```

**Run PgVector**

Install **[ docker desktop ](<https://docs.docker.com/desktop/install/mac-install/>) ** and run **PgVector** on port **5532** using: 
    
    
```
    docker run -d \
      -e POSTGRES_DB=ai \
      -e POSTGRES_USER=ai \
      -e POSTGRES_PASSWORD=ai \
      -e PGDATA=/var/lib/postgresql/data/pgdata \
      -v pgvolume:/var/lib/postgresql/data \
      -p 5532:5432 \
      --name pgvector \
      phidata/pgvector:16
```

###  pdf pgvector: 
    
    
    #python3 -m venv ~/.venvs/aienv
    #source ~/.venvs/aienv/bin/activate
    
    
```
    from phi.assistant import Assistant
    from phi.llm.openai import OpenAIChat
    from phi.tools.yfinance import YFinanceTools
    from phi.llm.groq import Groq
```
    
    
    from phi.knowledge.pdf import PDFKnowledgeBase, PDFReader
    from phi.vectordb.pgvector import PgVector2
    
```
    pdf_knowledge_base = PDFKnowledgeBase(
        path="data/pdfs",
        # Table name: ai.pdf_documents
        vector_db=PgVector2(
            collection="pdf_documents",
            db_url="postgresql+psycopg://ai:ai@localhost:5532/ai",
        ),
        reader=PDFReader(chunk=True),
    )
```
    
    
```
    assistant = Assistant(
        knowledge_base=pdf_knowledge_base,
        add_references_to_prompt=True,
    )
    assistant.knowledge_base.load(recreate=False)
```
    
    assistant.print_response("show me some Question-answering prompts")
    
    

###  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉** 我的开源项目 [ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>)

## 

###  crewAI embdding 模型设置 
    
    
    from crewai_tools import PGSearchTool
    
    # Initialize the tool with the database URI and the target table name
    tool = PGSearchTool(db_uri='postgresql://user:password@localhost:5432/mydatabase', table_name='employees')
    
```
    #自定义模型
    tool = PGSearchTool(
        config=dict(
            llm=dict(
                provider="ollama", # or google, openai, anthropic, llama2, ...
                config=dict(
                    model="llama2",
                    # temperature=0.5,
                    # top_p=1,
                    # stream=true,
                ),
            ),
            embedder=dict(
                provider="google", # or openai, ollama, ...
                config=dict(
                    model="models/embedding-001",
                    task_type="retrieval_document",
                    # title="Embeddings",
                ),
            ),
        )
    )
```

###  prompt Agent 
    
    
    #安装依赖
    
```
    pip install crewai
    pip install 'crewai[tools]'
    pip install anthropic
    pip install langchain_anthropic
    pip install langchain_openai
```
    
    
```
    import os
    import asyncio
    from crewai import Agent, Task, Crew
    from langchain_openai import ChatOpenAI
    from dotenv import load_dotenv
    from crewai_tools import PGSearchTool
```
    
    # 加载环境变量，确保API密钥等敏感信息不直接暴露在代码中
    load_dotenv()
    
```
    # 获取openai API密钥
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")
```
    
```
    # 获取Claude API密钥
    anthropic_api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not anthropic_api_key:
        raise ValueError("ANTHROPIC_API_KEY not found in environment variables")
```
    
    # 初始化PGSearchTool，用于从PostgreSQL数据库中搜索相关内容
    search_tool = PGSearchTool(db_uri='postgresql://ai:ai@localhost:5532/ai', table_name='pdf_documents')
    
```
    def create_agents(task_type):
        """
        创建四个不同角色的AI代理
        :param task_type: 任务类型
        :return: 包含四个Agent对象的列表
        """
        # 初始化ChatOpenAI模型
        #llm = ChatOpenAI(
            #model_name="gpt-3.5-turbo",
            #temperature=0.7,
            #openai_api_key=api_key,
        #)
         llm=ChatAnthropic(
            model="claude-3-5-sonnet-20240620",
            anthropic_api_key = anthropic_api_key
          )
```
    
    
```
        # 创建Prompt分析师代理
        prompt_analyst = Agent(
            role='Prompt Analyst',
            goal=f'Analyze existing prompts for {task_type} tasks and suggest improvements',
            backstory='You are an expert in prompt engineering with years of experience in optimizing prompts for various AI models.',
            verbose=True,
            allow_delegation=False,
            llm=llm,
            tools=[search_tool]
        )
```
    
```
        # 创建Prompt优化师代理
        prompt_optimizer = Agent(
            role='Prompt Optimizer',
            goal=f'Optimize prompts for {task_type} tasks based on analysis and best practices',
            backstory='You are a skilled prompt engineer who can refine and enhance prompts to improve AI model performance.',
            verbose=True,
            allow_delegation=False,
            llm=llm,
            tools=[search_tool]
        )
```
    
```
        # 创建Prompt测试员代理
        prompt_tester = Agent(
            role='Prompt Tester',
            goal=f'Test optimized prompts for {task_type} tasks and provide performance feedback',
            backstory='You are an experienced QA specialist in AI, focusing on evaluating the effectiveness of prompts.',
            verbose=True,
            allow_delegation=False,
            llm=llm
        )
```
    
```
        # 创建最终优化专家代理
        ultimate_optimizer = Agent(
            role='Ultimate Optimizer',
            goal=f'Provide the final, most optimized prompt for {task_type} tasks',
            backstory='You are a seasoned AI prompt expert with a keen eye for detail and a deep understanding of user requirements.',
            verbose=True,
            allow_delegation=False,
            llm=llm
        )
```
    
        return [prompt_analyst, prompt_optimizer, prompt_tester, ultimate_optimizer]
    
```
    def create_tasks(agents, task_type, original_prompt, user_requirements):
        """
        为每个代理创建相应的任务
        :param agents: 代理列表
        :param task_type: 任务类型
        :param original_prompt: 原始提示词
        :param user_requirements: 用户特定要求
        :return: 任务列表
        """
        tasks = [
            # Prompt分析任务
            Task(
                description=f'''Analyze the given prompt and similar examples from the database. Consider:
                1. Clarity and specificity
                2. Alignment with intended task ({task_type})
                3. Potential ambiguities or misinterpretations
                4. Structure and formatting
                Original prompt: "{original_prompt}"
                Use the search tool to find relevant prompt examples for {task_type} tasks.
                Present your analysis in Markdown format.''',
                agent=agents[0],
                expected_output="A detailed analysis of the prompt and relevant examples in Markdown format"
            ),
            # Prompt优化任务
            Task(
                description=f'''Based on the analysis, optimize the prompt. Your optimization should:
                1. Improve clarity and reduce ambiguity
                2. Enhance alignment with the {task_type} task
                3. Incorporate effective elements from example prompts
                4. Consider the following specific requirements: {user_requirements}
                Original prompt: "{original_prompt}"
                Use the search tool to find best practices for {task_type} prompts.
                Provide the optimized prompt with explanations for your changes.''',
                agent=agents[1],
                expected_output="An optimized prompt with explanations for changes made"
            ),
            # Prompt测试任务
            Task(
                description=f'''Test the optimized prompt against the original. Your test should:
                1. Compare potential performance on the {task_type} task
                2. Evaluate clarity and ease of understanding
                3. Assess potential for misuse or unintended outputs
                4. Verify that it meets the following requirements: {user_requirements}
                Original prompt: "{original_prompt}"
                Optimized prompt: [Insert optimized prompt from previous task]
                Present your findings in a clear, Markdown-formatted report.''',
                agent=agents[2],
                expected_output="A comprehensive test report comparing the original and optimized prompts in Markdown format"
            ),
            # 最终优化任务
            Task(
                description=f'''Review all previous outputs and provide the ultimate optimized prompt. Your task includes:
                1. Analyzing the initial prompt, optimized prompt, and test results
                2. Ensuring all user requirements are met: {user_requirements}
                3. Further refining the prompt based on all available information
                4. Providing a final, highly optimized prompt for the {task_type} task
                Present your final optimized prompt along with a brief explanation of your refinements.''',
                agent=agents[3],
                expected_output="The final, most optimized prompt with explanations for refinements"
            )
        ]
        return tasks
```
    
```
    async def main():
        """
        主函数，处理用户输入并启动优化流程
        """
        print("Welcome to the Prompt Optimization Assistant!")
```
    
```
        # 获取用户输入
        original_prompt = input("Please enter the prompt you want to optimize: ")
        task_type = input("What type of task is this prompt for? ")
        user_requirements = input("Please enter any specific requirements for the optimized prompt: ")
```
    
        print(f"\nThank you! Starting the optimization process for a {task_type} prompt with the following requirements: {user_requirements}\n")
    
```
        # 创建代理和任务
        agents = create_agents(task_type)
        tasks = create_tasks(agents, task_type, original_prompt, user_requirements)
```
    
```
        # 创建并启动Crew
        crew = Crew(
            agents=agents,
            tasks=tasks,
            verbose=2
        )
```
    
        # 异步执行Crew的kickoff方法
        result = await asyncio.to_thread(crew.kickoff)
    
```
    if __name__ == "__main__":
        # 运行主函数
        asyncio.run(main())
```

###  game agent 
    
    
```
    import os
    import asyncio
    import subprocess
    import tempfile
    import random
    from crewai import Agent, Task, Crew
    from langchain_openai import ChatOpenAI
    from dotenv import load_dotenv
    from crewai_tools import PGSearchTool
    import pygame
```
    
    # 加载环境变量
    load_dotenv()
    
```
    # 获取API密钥
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")
```
    
    # 初始化PGSearchTool
    search_tool = PGSearchTool(db_uri='postgresql://ai:ai@localhost:5532/ai', table_name='pdf_documents')
    
```
    def create_agents(game_type, programming_language):
        llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            temperature=0.7,
            openai_api_key=api_key,
        )
```
    
```
        game_designer = Agent(
            role='Game Designer',
            goal=f'Design engaging and innovative {game_type} game concepts',
            backstory=f'You are a creative game designer with years of experience in various genres, specializing in {programming_language}-based game development.',
            verbose=True,
            allow_delegation=False,
            llm=llm,
            tools=[search_tool]
        )
```
    
```
        programmer = Agent(
            role='Programmer',
            goal=f'Implement game mechanics and features efficiently using {programming_language}',
            backstory=f'You are a skilled programmer with expertise in {programming_language} for game development.',
            verbose=True,
            allow_delegation=False,
            llm=llm,
            tools=[search_tool]
        )
```
    
```
        artist = Agent(
            role='Artist',
            goal=f'Create visually appealing and cohesive game assets compatible with {programming_language}',
            backstory=f'You are a talented digital artist specializing in game art and animation, with experience in creating assets for {programming_language} projects.',
            verbose=True,
            allow_delegation=False,
            llm=llm
        )
```
    
```
        code_optimizer = Agent(
            role='Code Optimizer',
            goal='Optimize and complete game code to ensure it is runnable and efficient',
            backstory=f'You are an experienced software engineer specializing in {game_type} game development and code optimization in {programming_language}.',
            verbose=True,
            allow_delegation=False,
            llm=llm,
            tools=[search_tool]
        )
```
    
```
        code_validator = Agent(
            role='Code Validator',
            goal=f'Validate and test the AI-generated {programming_language} code for the {game_type} game',
            backstory=f'You are an expert in {programming_language} and game development, with a keen eye for code correctness and runtime errors.',
            verbose=True,
            allow_delegation=False,
            llm=llm
        )
```
    
```
        qa_tester = Agent(
            role='QA Tester',
            goal=f'Ensure game quality and identify bugs in {programming_language}-based games',
            backstory=f'You are a meticulous QA tester with a keen eye for detail and user experience, specializing in {programming_language} projects.',
            verbose=True,
            allow_delegation=False,
            llm=llm
        )
```
    
```
        project_manager = Agent(
            role='Project Manager',
            goal=f'Ensure all requirements are met and provide the final, complete code for the {game_type} game',
            backstory=f'You are an experienced project manager with a strong background in {game_type} game development and {programming_language}.',
            verbose=True,
            allow_delegation=False,
            llm=llm
        )
```
    
        return [game_designer, programmer, artist, code_optimizer, code_validator, qa_tester, project_manager]
    
```
    def create_tasks(agents, game_type, programming_language, user_requirements):
        tasks = [
            Task(
                description=f'''Design a {game_type} game concept with unique mechanics. Include:
                1. Detailed game mechanics
                2. Level progression and difficulty scaling
                3. Scoring system
                4. Power-ups and obstacles (if applicable)
                5. Win/lose conditions
                Incorporate the following user requirements: {user_requirements}
                Use the search tool to find relevant game design patterns and innovative mechanics for {game_type} games.
                Present your design in standard Markdown format.''',
                agent=agents[0],
                expected_output=f"A detailed game design document for a {game_type} game in Markdown format"
            ),
            Task(
                description=f'''Implement the core gameplay mechanics for the {game_type} game using {programming_language}. Your code should include:
                1. All necessary imports
                2. Game initialization
                3. Main game loop
                4. Player input handling
                5. Core game mechanics implementation
                6. Collision detection (if applicable)
                7. Scoring system
                8. Basic UI elements (score display, game over screen)
                Ensure to implement the following user requirements: {user_requirements}
                Use the search tool to find best practices and efficient implementations for {game_type} games in {programming_language}.
                Provide a complete, runnable code with comments explaining key parts. Ensure the code follows best practices for {programming_language}.''',
                agent=agents[1],
                expected_output=f"A complete, runnable {programming_language} code for the {game_type} game with comments"
            ),
            Task(
                description=f'''Create character designs and environment assets for the {game_type} game, optimized for use with {programming_language}. Include:
                1. Main character design (if applicable)
                2. Enemy designs (if applicable)
                3. Item designs
                4. Obstacle designs
                5. Background designs for different levels
                6. UI element designs (buttons, score display, etc.)
                Consider the following user requirements in your designs: {user_requirements}
                Describe your designs in detail and provide placeholder images or ASCII art representations.''',
                agent=agents[2],
                expected_output=f"Detailed descriptions and ASCII art representations of game assets for the {game_type} game"
            ),
            Task(
                description=f'''Review, optimize, and complete the code provided by the Programmer for the {game_type} game. Your task includes:
                1. Ensuring all game mechanics are properly implemented
                2. Adding any missing features based on the Game Designer's concept
                3. Optimizing the code for performance
                4. Implementing the Artist's designs into the game
                5. Adding sound effects and background music (if applicable)
                6. Implementing a simple menu system
                7. Adding comments and docstrings for better code readability
                8. Ensuring the following user requirements are met: {user_requirements}
                Use the search tool to find advanced optimization techniques and additional features for {game_type} games.
                Provide the full, optimized, and runnable code with explanations for your changes and additions.''',
                agent=agents[3],
                expected_output=f"An optimized and complete {programming_language} code for the {game_type} game with explanations"
            ),
            Task(
                description=f'''Validate and test the optimized {programming_language} code for the {game_type} game. Your task includes:
                1. Reviewing the code for syntax errors
                2. Attempting to run the code in a controlled environment
                3. Identifying and reporting any runtime errors or exceptions
                4. Verifying that all game features described in the design document are present in the code
                5. Suggesting fixes for any identified issues
                Provide a detailed report of your findings, including any errors encountered and suggestions for improvement.''',
                agent=agents[4],
                expected_output=f"A validation report for the {game_type} game code, including any errors found and suggestions for fixes"
            ),
            Task(
                description=f'''Develop a comprehensive test plan and conduct initial gameplay testing for the {game_type} game. Your report should include:
                1. Test cases for all game mechanics and features
                2. Performance testing results
                3. User experience evaluation
                4. Bug report with severity ratings
                5. Suggestions for improvements and additional features
                6. Verification that the following user requirements are met: {user_requirements}
                Present your findings in a clear, Markdown-formatted report. Include steps to reproduce any bugs found and screenshots if possible.''',
                agent=agents[5],
                expected_output=f"A comprehensive test report for the {game_type} game in Markdown format"
            ),
            Task(
                description=f'''Review all previous tasks and their outputs. Ensure that all user requirements are met and all suggested improvements have been incorporated. Your task includes:
                1. Reviewing the game design, code, and test reports
                2. Identifying any missing features or unresolved issues
                3. Coordinating with other agents to address any shortcomings
                4. Compiling the final, complete code for the {game_type} game
                5. Providing a summary of the development process and final product
                Deliver the complete, final code for the {game_type} game, ensuring it meets all requirements and incorporates all necessary improvements.''',
                agent=agents[6],
                expected_output=f"The final, complete {programming_language} code for the {game_type} game, along with a summary of the development process"
            ),
        ]
        return tasks
```
    
```
    def run_code(code, programming_language):
        with tempfile.NamedTemporaryFile(mode='w', suffix=f'.{programming_language}', delete=False) as temp_file:
            temp_file.write(code)
            temp_file_path = temp_file.name
```
    
```
        try:
            if programming_language == 'python':
                result = subprocess.run(['python', temp_file_path], capture_output=True, text=True, timeout=10)
            else:
                return f"Unsupported programming language: {programming_language}"
```
    
```
            return result.stdout if result.returncode == 0 else f"Error: {result.stderr}"
        except subprocess.TimeoutExpired:
            return "Error: Code execution timed out"
        finally:
            os.unlink(temp_file_path)
```
    
    async def main():
        print("Welcome to the Game Development Assistant!")
    
```
        # 获取用户需求
        game_type = input("What type of game would you like to develop? ")
        programming_language = input("What programming language would you like to use? ")
        user_requirements = input("Please enter your specific requirements for the game (e.g., difficulty levels, special features, theme preferences): ")
```
    
        print(f"\nThank you! Starting the development process for a {game_type} game using {programming_language} with the following requirements: {user_requirements}\n")
    
        agents = create_agents(game_type, programming_language)
        tasks = create_tasks(agents, game_type, programming_language, user_requirements)
    
```
        crew = Crew(
            agents=agents,
            tasks=tasks,
            verbose=2
        )
```
    
        result = await asyncio.to_thread(crew.kickoff)
    
```
        # print("\n\nFinal Results:")
        # for task in crew.tasks:
        #     print(f"\n\n## {task.agent.role}'s Task")
        #     print(f"\n### Description\n\n{task.description}")
        #     print(f"\n### Output\n\n{task.output}")
        #
        #     # 如果是Project Manager的任务,尝试运行最终代码
        #     if task.agent.role == 'Project Manager':
        #         print("\n### Final Code Execution Result")
        #         final_code = str(task.output)
        #         execution_result = run_code(final_code, programming_language)
        #         print(execution_result)
```
    
    if __name__ == "__main__":
        asyncio.run(main())

提示词案例 
    
    
    游戏
    implement a snake game with python
    
    game development
    
    Include requirements for game mechanics, user interface, scoring system, difficulty levels, and make it suitable for beginners in Python programming. Also, specify the use of Pygame library for graphics
    
    小说：
    Story writing
    
    creative writing
    
    Generate a dialogue in a story

###  执行结果 
    
    
```
    (aienv) charlesqin@charless-MacBook-Pro chainlit-test % python promptAgent.py
    Welcome to the Prompt Optimization Assistant!此项目代码由AI超元域开发.欢迎来到我的频道😊
    Please enter the prompt you want to optimize: Story writing
    What type of task is this prompt for? creative writing
    Please enter any specific requirements for the optimized prompt: Generate a dialogue in a story
```
    
    Thank you! Starting the optimization process for a creative writing prompt with the following requirements: Generate a dialogue in a story
    
```
     [2024-06-26 19:06:12][DEBUG]: == Working Agent: Prompt Analyst
     [2024-06-26 19:06:12][INFO]: == Starting Task: Analyze the given prompt and similar examples from the database. Consider:
                1. Clarity and specificity
                2. Alignment with intended task (creative writing)
                3. Potential ambiguities or misinterpretations
                4. Structure and formatting
                Original prompt: "Story writing"
                Use the search tool to find relevant prompt examples for creative writing tasks.
                Present your analysis in Markdown format.
```
    
    
    > Entering new CrewAgentExecutor chain...
    To analyze the given prompt and find relevant examples for creative writing tasks, I should first search the database for similar prompts.
    
    Action: Search a database's table content
    Action Input: {"search_query": "creative writing prompts for story writing"}
     
    
    Relevant Content:
    ('GPT_17_1', 'GPT', {'page': 17, 'chunk': 1, 'chunk_size': 875}, 'Here are a few examples of prompts using this technique : Prompt : "Let\'s think about the impact of climate change on agriculture" Prompt : "Let\'s discuss the current state of artiﬁcial intelligence" Prompt : "Let\'s talk about the beneﬁts and drawbacks of remote work" Y ou can also add a open-end ed question , statement or a piece of text that you want the model to continue or build upon . Once you provide the promp t , the model will use its training data and algorithms to generate a response that is relevant to the prompt and will continue the conversation in a coherent way . This unique prompt helps ChatGPT to give answers in dif ferent perspectives and angles , resulting in more dynamic and informative passages . The steps to use the prompt are simple and easy to follow , and it can truly make a dif ference in your writing . Give it a try and see for yourself',
    
    ('GPT_16_1', 'GPT', {'page': 16, 'chunk': 1, 'chunk_size': 1621}, 'Chapter 6: "Let’ s think about this” prompt The "Let\'s think about this " prompt is a technique used to encourage ChatGPT to generate text that is reﬂective and contemplative . This technique is useful for tasks such as writing essays , poetry , or creative writing . The prompt formula for the "L et\'s think about this" prompt i s simply the phrase "Let\'s think about this" followed by a topic or question . Example : Generating a reﬂective essay : T ask : W rite a reﬂective essay on the topic of personal growth Prompt formula : "Let\'s think about this : personal growth" Generating a poem : T ask : W rite a poem about the changing seasons Prompt formula : "Let\'s think about this : the changing seasons" This prompt is asking for a conversation or discussion about a speciﬁc topic or idea . The speaker is inviting ChatGPT to engage in a dialogue about the subject at hand . The model is p rovided with a prompt , which serves as the starting point for the conversation or text generation . The model then uses its train ing data and algorithms to ge nerate a response that is relevant to the prompt . This technique allows ChatGPT to generate conte xtually appropriate and co herent text based on the provided prompt . T o u se the "Let ’ s think about this prompt" technique with C hatGPT , you can follow these steps : 1. Identify the topic or idea you want to discuss . 2. Formulate a prompt that clearly states the topic or idea , and starts the conversation or text generation . 3. Preface the prompt with "Let\'s think about" or "Let\'s discuss" to indicate that you\'re initiating a conversation or discussion .',
    
    ('GPT_21_1', 'GPT', {'page': 21, 'chunk': 1, 'chunk_size': 1006}, 'T ask : Generate a poem Instructions : The poem should be related to the seed word "love" and should be written in the style of a sonnet . Role : Poet Prompt formula : "Generate a sonnet related to the seed word \'love\' as a poet" Example 2: T ext Completion T ask : Complete a sentence Instructions : The completion should be related to the seed word "science" and should be written in the style of a research paper Role : Researcher Prompt formula : "Complete the following sentence in a way that is related to the seed w ord \'science\' and in the sty le of a research paper as a researcher : [ insert sentence ] " Example 3: T ext Summarization T ask : Summarize a news article Instructions : The summary sh ould be related to the seed word "politics" and should be written in a neutral and unbiased tone Role : Journalist Prompt formula : "Summarize the following news article in a way that is related to the seed word \'politics\' in a neutral and unbiased tone as a journalist : [ insert news article ] "',
    
    Thought: Now that I have some relevant examples and information about creative writing prompts, I can analyze the original prompt and suggest improvements.
    
    Final Answer:
    
    # Analysis of the Creative Writing Prompt: "Story writing"
    
    ## Overview
    
    The original prompt "Story writing" is extremely brief and lacks specificity. While it does indicate the general task of writing a story, it fails to provide any guidance or structure for the creative process. Let's analyze this prompt and suggest improvements based on the examples found in the database.
    
    ## Analysis
    
    ### 1. Clarity and Specificity
    
    The prompt "Story writing" lacks clarity and specificity. It does not provide any details about the desired outcome, such as the genre, length, or any specific elements to include in the story. This vagueness can lead to unfocused or inconsistent results.
    
    ### 2. Alignment with Intended Task
    
    While the prompt does align with the intended task of creative writing, it does not offer any direction or inspiration to guide the writing process. This may result in writer's block or generic storytelling.
    
    ### 3. Potential Ambiguities or Misinterpretations
    
    The lack of detail in the prompt leaves it open to various interpretations. Writers might be unsure about the expected format, style, or content of the story. This ambiguity could lead to results that don't meet the user's expectations.
    
    ### 4. Structure and Formatting
    
    The prompt has no structure or formatting to guide the writer. It does not follow any of the more effective prompt structures found in the database examples.
    
    ## Improvements Based on Database Examples
    
    Drawing inspiration from the examples found in the database, we can suggest the following improvements to the prompt:
    
```
    1. **Use the "Let's think about this" technique:**
       Instead of simply stating "Story writing," we could use a more engaging prompt like:
       "Let's think about this: A story that explores the theme of personal growth"
```
    
```
    2. **Incorporate specific instructions and roles:**
       We can add more structure and guidance to the prompt:
       "As a creative writer, generate a short story related to the seed word 'love'. The story should be written in the style of magical realism and be approximately 500 words long."
```
    
```
    3. **Provide a starting point or sentence to complete:**
       To help overcome writer's block, we could offer a beginning sentence:
       "Complete the following story opener in a suspenseful and intriguing way: 'The old clock struck midnight, and suddenly, everything in the room began to change...'"
```
    
```
    4. **Include multiple elements for a more complex prompt:**
       We can combine various aspects to create a more comprehensive prompt:
       "Task: Write a short story
       Instructions: The story should incorporate the themes of friendship and adventure, and should be set in a futuristic city.
       Role: Science fiction author
       Prompt: Generate a 1000-word science fiction story that explores the power of friendship in a technologically advanced metropolis. Include at least one plot twist and end with a cliffhanger."
```
    
    ## Conclusion
    
    The original prompt "Story writing" is too vague and lacks the necessary elements to guide an effective creative writing process. By incorporating techniques such as the "Let's think about this" approach, providing specific instructions, and including elements like themes, genres, and story structures, we can create much more effective prompts for creative writing tasks. These improved prompts will likely result in more focused, engaging, and diverse stories that better meet the user's expectations and spark creativity.
    
    > Finished chain.
     [2024-06-26 19:06:29][DEBUG]: == [Prompt Analyst] Task output: # Analysis of the Creative Writing Prompt: "Story writing"
    
    ## Overview
    
    The original prompt "Story writing" is extremely brief and lacks specificity. While it does indicate the general task of writing a story, it fails to provide any guidance or structure for the creative process. Let's analyze this prompt and suggest improvements based on the examples found in the database.
    
    ## Analysis
    
    ### 1. Clarity and Specificity
    
    The prompt "Story writing" lacks clarity and specificity. It does not provide any details about the desired outcome, such as the genre, length, or any specific elements to include in the story. This vagueness can lead to unfocused or inconsistent results.
    
    ### 2. Alignment with Intended Task
    
    While the prompt does align with the intended task of creative writing, it does not offer any direction or inspiration to guide the writing process. This may result in writer's block or generic storytelling.
    
    ### 3. Potential Ambiguities or Misinterpretations
    
    The lack of detail in the prompt leaves it open to various interpretations. Writers might be unsure about the expected format, style, or content of the story. This ambiguity could lead to results that don't meet the user's expectations.
    
    ### 4. Structure and Formatting
    
    The prompt has no structure or formatting to guide the writer. It does not follow any of the more effective prompt structures found in the database examples.
    
    ## Improvements Based on Database Examples
    
    Drawing inspiration from the examples found in the database, we can suggest the following improvements to the prompt:
    
```
    1. **Use the "Let's think about this" technique:**
       Instead of simply stating "Story writing," we could use a more engaging prompt like:
       "Let's think about this: A story that explores the theme of personal growth"
```
    
```
    2. **Incorporate specific instructions and roles:**
       We can add more structure and guidance to the prompt:
       "As a creative writer, generate a short story related to the seed word 'love'. The story should be written in the style of magical realism and be approximately 500 words long."
```
    
```
    3. **Provide a starting point or sentence to complete:**
       To help overcome writer's block, we could offer a beginning sentence:
       "Complete the following story opener in a suspenseful and intriguing way: 'The old clock struck midnight, and suddenly, everything in the room began to change...'"
```
    
```
    4. **Include multiple elements for a more complex prompt:**
       We can combine various aspects to create a more comprehensive prompt:
       "Task: Write a short story
       Instructions: The story should incorporate the themes of friendship and adventure, and should be set in a futuristic city.
       Role: Science fiction author
       Prompt: Generate a 1000-word science fiction story that explores the power of friendship in a technologically advanced metropolis. Include at least one plot twist and end with a cliffhanger."
```
    
    ## Conclusion
    
    The original prompt "Story writing" is too vague and lacks the necessary elements to guide an effective creative writing process. By incorporating techniques such as the "Let's think about this" approach, providing specific instructions, and including elements like themes, genres, and story structures, we can create much more effective prompts for creative writing tasks. These improved prompts will likely result in more focused, engaging, and diverse stories that better meet the user's expectations and spark creativity.
    
    
```
     [2024-06-26 19:06:29][DEBUG]: == Working Agent: Prompt Optimizer
     [2024-06-26 19:06:29][INFO]: == Starting Task: Based on the analysis, optimize the prompt. Your optimization should:
                1. Improve clarity and reduce ambiguity
                2. Enhance alignment with the creative writing task
                3. Incorporate effective elements from example prompts
                4. Consider the following specific requirements: Generate a dialogue in a story
                Original prompt: "Story writing"
                Use the search tool to find best practices for creative writing prompts.
                Provide the optimized prompt with explanations for your changes.
```
    
    
    > Entering new CrewAgentExecutor chain...
    Thought: To optimize the prompt for generating a dialogue in a story, I should first search for best practices in creative writing prompts, particularly those related to dialogue. This will help me create a more effective and engaging prompt.
    
    Action: Search a database's table content
    Action Input: {"search_query": "creative writing prompts for dialogue"}
     
    
    Relevant Content:
    ('GPT_33_1', 'GPT', {'page': 33, 'chunk': 1, 'chunk_size': 1460}, 'Chapter 16: Dialogue prompts Dialogue prom pts is a technique that allows a model to generate text that simulates a convers ation between two or more entities . By providing the model with a context and a set of characters or entities , along w ith their roles and b ackgrounds , and asking the model to generate dialogue between them Therefore , the model should be provided with a context a nd a set of chara cters or entities , along with their roles and backgrounds . The model should also be provided with information about the desired output , such as the type of conversation or dialogue and a ny speciﬁc requirements or constraints . Prompt Examples and their Formula : Example 1: Dialogue generation T ask : Generate a conversation between two characters Instructions : The conversation should be natural and relevant to the given context Prompt formu la : "Generate a conversation between the following chara cters [ insert characters ] in the following context [ insert context ] " Example 2: Story writing T ask : Generate a dialogue in a story Instructions : The dialogue should be consistent with the characters and events of the story Prompt formula : "Generate a dialogue between the following characters [ insert characters ] in the following story [ insert story ] " Example 3: Chatbot development T ask : Generate a dialogue for a customer service chatbot Instructions : Th e dialogue should be professional and prov ide accurate information',
    
    ('GPT_17_1', 'GPT', {'page': 17, 'chunk': 1, 'chunk_size': 875}, 'Here are a few examples of prompts using this technique : Prompt : "Let\'s think about the impact of climate change on agriculture" Prompt : "Let\'s discuss the current state of artiﬁcial intelligence" Prompt : "Let\'s talk about the beneﬁts and drawbacks of remote work" Y ou can also add a open-end ed question , statement or a piece of text that you want the model to continue or build upon . Once you provide the promp t , the model will use its training data and algorithms to generate a response that is relevant to the prompt and will continue the conversation in a coherent way . This unique prompt helps ChatGPT to give answers in dif ferent perspectives and angles , resulting in more dynamic and informative passages . The steps to use the prompt are simple and easy to follow , and it can truly make a dif ference in your writing . Give it a try and see for yourself',
    
    ('GPT_16_1', 'GPT', {'page': 16, 'chunk': 1, 'chunk_size': 1621}, 'Chapter 6: "Let’ s think about this” prompt The "Let\'s think about this " prompt is a technique used to encourage ChatGPT to generate text that is reﬂective and contemplative . This technique is useful for tasks such as writing essays , poetry , or creative writing . The prompt formula for the "L et\'s think about this" prompt i s simply the phrase "Let\'s think about this" followed by a topic or question . Example : Generating a reﬂective essay : T ask : W rite a reﬂective essay on the topic of personal growth Prompt formula : "Let\'s think about this : personal growth" Generating a poem : T ask : W rite a poem about the changing seasons Prompt formula : "Let\'s think about this : the changing seasons" This prompt is asking for a conversation or discussion about a speciﬁc topic or idea . The speaker is inviting ChatGPT to engage in a dialogue about the subject at hand . The model is p rovided with a prompt , which serves as the starting point for the conversation or text generation . The model then uses its train ing data and algorithms to ge nerate a response that is relevant to the prompt . This technique allows ChatGPT to generate conte xtually appropriate and co herent text based on the provided prompt . T o u se the "Let ’ s think about this prompt" technique with C hatGPT , you can follow these steps : 1. Identify the topic or idea you want to discuss . 2. Formulate a prompt that clearly states the topic or idea , and starts the conversation or text generation . 3. Preface the prompt with "Let\'s think about" or "Let\'s discuss" to indicate that you\'re initiating a conversation or discussion .',
    
    Thought: Based on the search results, I now have some valuable insights on creating effective prompts for dialogue in creative writing. I'll use this information to optimize the original prompt "Story writing" for generating dialogue in a story.
    
    Thought: I now know the final answer
    
    Final Answer: Here's an optimized prompt for generating dialogue in a story, along with explanations for the changes made:
    
    Optimized Prompt:
    "Let's think about this: A compelling dialogue between two characters in a story.
    
```
    Task: Generate a conversation between two characters in a short story.
    Instructions: 
    1. Create two distinct characters with brief backgrounds.
    2. Establish a context or setting for their interaction.
    3. Write a natural and engaging dialogue that reveals their personalities and advances the story.
    4. The conversation should be approximately 300 words long.
    5. Include both spoken words and brief descriptions of non-verbal cues or actions.
```
    
    Prompt: Generate a dialogue between [Character 1] and [Character 2] in the following context: [Insert context]. Ensure the conversation flows naturally, reveals character traits, and moves the story forward."
    
    Explanations for changes:
    
    1. Added "Let's think about this" technique: This encourages more reflective and creative thinking, as suggested in the search results. It sets the stage for a more thoughtful approach to dialogue creation.
    
    2. Specified the task: Instead of the vague "Story writing," the prompt now clearly states that we're generating a conversation between characters in a short story. This provides a clear focus for the creative process.
    
    3. Included detailed instructions: The instructions break down the task into manageable steps, guiding the writer through the process of creating characters, establishing context, and writing dialogue. This structure helps to ensure that all necessary elements are included.
    
    4. Provided specific requirements: By specifying the approximate word count and asking for non-verbal cues, we encourage a more detailed and vivid dialogue scene.
    
    5. Used a flexible prompt formula: The prompt allows for customization by inserting specific characters and context. This adaptability makes the prompt more versatile for various story scenarios.
    
    6. Emphasized natural conversation and character development: By instructing to make the dialogue natural and revealing of character traits, we encourage more authentic and engaging writing.
    
    7. Linked dialogue to story progression: The instruction to move the story forward ensures that the dialogue serves a purpose in the overall narrative, rather than being isolated conversation.
    
    These changes transform the original vague prompt into a structured, detailed guide for creating meaningful dialogue in a story. The optimized prompt provides clear direction while still allowing for creativity, making it more likely to produce engaging and effective story dialogue.
    
    > Finished chain.
     [2024-06-26 19:06:46][DEBUG]: == [Prompt Optimizer] Task output: Here's an optimized prompt for generating dialogue in a story, along with explanations for the changes made:
    
    Optimized Prompt:
    "Let's think about this: A compelling dialogue between two characters in a story.
    
```
    Task: Generate a conversation between two characters in a short story.
    Instructions: 
    1. Create two distinct characters with brief backgrounds.
    2. Establish a context or setting for their interaction.
    3. Write a natural and engaging dialogue that reveals their personalities and advances the story.
    4. The conversation should be approximately 300 words long.
    5. Include both spoken words and brief descriptions of non-verbal cues or actions.
```
    
    Prompt: Generate a dialogue between [Character 1] and [Character 2] in the following context: [Insert context]. Ensure the conversation flows naturally, reveals character traits, and moves the story forward."
    
    Explanations for changes:
    
    1. Added "Let's think about this" technique: This encourages more reflective and creative thinking, as suggested in the search results. It sets the stage for a more thoughtful approach to dialogue creation.
    
    2. Specified the task: Instead of the vague "Story writing," the prompt now clearly states that we're generating a conversation between characters in a short story. This provides a clear focus for the creative process.
    
    3. Included detailed instructions: The instructions break down the task into manageable steps, guiding the writer through the process of creating characters, establishing context, and writing dialogue. This structure helps to ensure that all necessary elements are included.
    
    4. Provided specific requirements: By specifying the approximate word count and asking for non-verbal cues, we encourage a more detailed and vivid dialogue scene.
    
    5. Used a flexible prompt formula: The prompt allows for customization by inserting specific characters and context. This adaptability makes the prompt more versatile for various story scenarios.
    
    6. Emphasized natural conversation and character development: By instructing to make the dialogue natural and revealing of character traits, we encourage more authentic and engaging writing.
    
    7. Linked dialogue to story progression: The instruction to move the story forward ensures that the dialogue serves a purpose in the overall narrative, rather than being isolated conversation.
    
    These changes transform the original vague prompt into a structured, detailed guide for creating meaningful dialogue in a story. The optimized prompt provides clear direction while still allowing for creativity, making it more likely to produce engaging and effective story dialogue.
    
    
```
     [2024-06-26 19:06:46][DEBUG]: == Working Agent: Prompt Tester
     [2024-06-26 19:06:46][INFO]: == Starting Task: Test the optimized prompt against the original. Your test should:
                1. Compare potential performance on the creative writing task
                2. Evaluate clarity and ease of understanding
                3. Assess potential for misuse or unintended outputs
                4. Verify that it meets the following requirements: Generate a dialogue in a story
                Original prompt: "Story writing"
                Optimized prompt: [Insert optimized prompt from previous task]
                Present your findings in a clear, Markdown-formatted report.
```
    
    
    > Entering new CrewAgentExecutor chain...
    Thought: I now can give a great answer
    
    Final Answer:
    
    # Prompt Test Report: Original vs. Optimized Prompt for Dialogue Generation
    
    ## 1. Comparison of Potential Performance
    
```
    ### Original Prompt: "Story writing"
    - Extremely vague and open-ended
    - Provides no guidance or structure for the task
    - Likely to result in inconsistent or unfocused outputs
    - May lead to confusion about the specific goal (dialogue generation)
```
    
```
    ### Optimized Prompt:
    ```
    "Let's think about this: A compelling dialogue between two characters in a story.
```
    
```
    Task: Generate a conversation between two characters in a short story.
    Instructions: 
    1. Create two distinct characters with brief backgrounds.
    2. Establish a context or setting for their interaction.
    3. Write a natural and engaging dialogue that reveals their personalities and advances the story.
    4. The conversation should be approximately 300 words long.
    5. Include both spoken words and brief descriptions of non-verbal cues or actions.
```
    
    Prompt: Generate a dialogue between [Character 1] and [Character 2] in the following context: [Insert context]. Ensure the conversation flows naturally, reveals character traits, and moves the story forward."
    ```
    
```
    - Clearly defines the task and expected outcome
    - Provides a structured approach to dialogue creation
    - Encourages thoughtful character development and context-setting
    - Specifies length and includes non-verbal elements for added depth
    - Likely to produce more consistent, focused, and engaging dialogue
```
    
    ## 2. Clarity and Ease of Understanding
    
```
    ### Original Prompt:
    - Extremely unclear and ambiguous
    - Requires significant interpretation and guesswork
    - Difficult to understand the specific task or expectations
```
    
```
    ### Optimized Prompt:
    - Clear and concise task description
    - Step-by-step instructions make the process easy to follow
    - Specific requirements (word count, non-verbal cues) provide clear guidelines
    - Easy to understand for both human writers and AI models
```
    
    ## 3. Potential for Misuse or Unintended Outputs
    
```
    ### Original Prompt:
    - High potential for misuse due to lack of specificity
    - May result in irrelevant or inappropriate content
    - No safeguards against generating offensive or harmful material
```
    
```
    ### Optimized Prompt:
    - Lower risk of misuse due to clear focus on dialogue generation
    - Structured approach reduces likelihood of irrelevant outputs
    - Still potential for generating inappropriate content, but context-setting step allows for some control
    - No explicit safeguards against offensive or harmful material, which could be added for improvement
```
    
    ## 4. Verification of Requirements
    
    Requirement: Generate a dialogue in a story
    
```
    ### Original Prompt:
    - Does not explicitly meet the requirement
    - May or may not result in dialogue generation, depending on interpretation
```
    
```
    ### Optimized Prompt:
    - Fully meets the requirement
    - Explicitly focuses on generating dialogue between two characters in a story context
    - Provides clear instructions for creating a compelling and story-advancing dialogue
```
    
    ## Conclusion
    
    The optimized prompt significantly outperforms the original in all aspects of this evaluation. It provides clear guidance, encourages creativity within a structured framework, and is much more likely to produce the desired outcome of generating engaging dialogue in a story context. While there is still room for improvement in terms of safeguarding against potential misuse, the optimized prompt represents a substantial enhancement over the original and is well-suited for creative writing tasks focused on dialogue generation.
    
    > Finished chain.
     [2024-06-26 19:06:57][DEBUG]: == [Prompt Tester] Task output: # Prompt Test Report: Original vs. Optimized Prompt for Dialogue Generation
    
    ## 1. Comparison of Potential Performance
    
```
    ### Original Prompt: "Story writing"
    - Extremely vague and open-ended
    - Provides no guidance or structure for the task
    - Likely to result in inconsistent or unfocused outputs
    - May lead to confusion about the specific goal (dialogue generation)
```
    
```
    ### Optimized Prompt:
    ```
    "Let's think about this: A compelling dialogue between two characters in a story.
```
    
```
    Task: Generate a conversation between two characters in a short story.
    Instructions: 
    1. Create two distinct characters with brief backgrounds.
    2. Establish a context or setting for their interaction.
    3. Write a natural and engaging dialogue that reveals their personalities and advances the story.
    4. The conversation should be approximately 300 words long.
    5. Include both spoken words and brief descriptions of non-verbal cues or actions.
```
    
    Prompt: Generate a dialogue between [Character 1] and [Character 2] in the following context: [Insert context]. Ensure the conversation flows naturally, reveals character traits, and moves the story forward."
    ```
    
```
    - Clearly defines the task and expected outcome
    - Provides a structured approach to dialogue creation
    - Encourages thoughtful character development and context-setting
    - Specifies length and includes non-verbal elements for added depth
    - Likely to produce more consistent, focused, and engaging dialogue
```
    
    ## 2. Clarity and Ease of Understanding
    
```
    ### Original Prompt:
    - Extremely unclear and ambiguous
    - Requires significant interpretation and guesswork
    - Difficult to understand the specific task or expectations
```
    
```
    ### Optimized Prompt:
    - Clear and concise task description
    - Step-by-step instructions make the process easy to follow
    - Specific requirements (word count, non-verbal cues) provide clear guidelines
    - Easy to understand for both human writers and AI models
```
    
    ## 3. Potential for Misuse or Unintended Outputs
    
```
    ### Original Prompt:
    - High potential for misuse due to lack of specificity
    - May result in irrelevant or inappropriate content
    - No safeguards against generating offensive or harmful material
```
    
```
    ### Optimized Prompt:
    - Lower risk of misuse due to clear focus on dialogue generation
    - Structured approach reduces likelihood of irrelevant outputs
    - Still potential for generating inappropriate content, but context-setting step allows for some control
    - No explicit safeguards against offensive or harmful material, which could be added for improvement
```
    
    ## 4. Verification of Requirements
    
    Requirement: Generate a dialogue in a story
    
```
    ### Original Prompt:
    - Does not explicitly meet the requirement
    - May or may not result in dialogue generation, depending on interpretation
```
    
```
    ### Optimized Prompt:
    - Fully meets the requirement
    - Explicitly focuses on generating dialogue between two characters in a story context
    - Provides clear instructions for creating a compelling and story-advancing dialogue
```
    
    ## Conclusion
    
    The optimized prompt significantly outperforms the original in all aspects of this evaluation. It provides clear guidance, encourages creativity within a structured framework, and is much more likely to produce the desired outcome of generating engaging dialogue in a story context. While there is still room for improvement in terms of safeguarding against potential misuse, the optimized prompt represents a substantial enhancement over the original and is well-suited for creative writing tasks focused on dialogue generation.
    
    
```
     [2024-06-26 19:06:57][DEBUG]: == Working Agent: Ultimate Optimizer
     [2024-06-26 19:06:57][INFO]: == Starting Task: Review all previous outputs and provide the ultimate optimized prompt. Your task includes:
                1. Analyzing the initial prompt, optimized prompt, and test results
                2. Ensuring all user requirements are met: Generate a dialogue in a story
                3. Further refining the prompt based on all available information
                4. Providing a final, highly optimized prompt for the creative writing task
                Present your final optimized prompt along with a brief explanation of your refinements.
```
    
    
    > Entering new CrewAgentExecutor chain...
    Thought: I now can give a great answer
    
    Final Answer: Here is the ultimate optimized prompt for generating dialogue in a story, along with explanations for the refinements:
    
    ```
    Creative Writing Task: Craft an Engaging Dialogue Scene
    
    Your mission is to write a captivating dialogue scene between two characters that brings a story to life. Follow these steps to create a rich, meaningful exchange:
    
```
    1. Character Creation:
       - Introduce two distinct characters with names, ages, and brief backgrounds
       - Highlight one key personality trait for each character
```
    
```
    2. Setting the Scene:
       - Describe the location and time of day in 1-2 sentences
       - Mention any relevant objects or environmental factors
```
    
```
    3. Dialogue Objectives:
       - Define a clear purpose for the conversation (e.g., reveal a secret, resolve a conflict)
       - Identify one key emotion or tension underlying the exchange
```
    
```
    4. Writing the Dialogue:
       - Craft a natural conversation of 250-300 words
       - Use a mix of short and long responses to create rhythm
       - Include at least 3 instances of non-verbal communication (gestures, facial expressions, etc.)
       - Ensure each character's dialogue reflects their unique voice and background
```
    
```
    5. Advancing the Story:
       - Introduce at least one new piece of information or plot development
       - End the scene with a subtle hook or unresolved tension
```
    
```
    6. Formatting:
       - Use quotation marks for spoken words
       - Start a new paragraph for each speaker change
       - Integrate brief action or description between dialogue lines
```
    
    Remember: Show, don't tell. Let the characters' words and actions reveal their thoughts and feelings.
    
    Now, write a dialogue scene between [Character 1] and [Character 2] in [Setting], where they must [Dialogue Objective]. Begin your scene with a brief introduction of the characters and setting before diving into the dialogue.
    ```
    
    Explanations for refinements:
    
    1. Structured Approach: The prompt is organized into clear, numbered steps, making it easy to follow and ensuring all important elements are addressed.
    
    2. Character Development: Added more specific instructions for character creation, including names and key traits, to help establish distinct personalities.
    
    3. Setting Context: Expanded on the setting description to create a more vivid backdrop for the dialogue.
    
    4. Dialogue Objectives: Introduced a specific purpose for the conversation and underlying emotion, adding depth and direction to the exchange.
    
    5. Detailed Writing Instructions: Provided more specific guidelines on dialogue length, pacing, and the inclusion of non-verbal cues to create a more dynamic scene.
    
    6. Story Advancement: Added explicit instructions to introduce new information and end with a hook, ensuring the dialogue serves a purpose in the larger narrative.
    
    7. Formatting Guidelines: Included specific formatting instructions to improve readability and professional presentation.
    
    8. "Show, Don't Tell" Reminder: Emphasized this key writing principle to encourage more engaging and descriptive dialogue.
    
    9. Flexible Framework: The prompt allows for customization of characters, setting, and objectives, making it adaptable to various story types and genres.
    
    10. Balance of Structure and Creativity: While providing a clear framework, the prompt still leaves room for creative expression and unique interpretations.
    
    This optimized prompt addresses all the requirements of generating dialogue in a story context while providing a comprehensive guide for creating rich, meaningful exchanges between characters. It builds upon the strengths of the previous optimization while adding more specific instructions and creative elements to further enhance the quality of the output.
    
    > Finished chain.
     [2024-06-26 19:07:11][DEBUG]: == [Ultimate Optimizer] Task output: Here is the ultimate optimized prompt for generating dialogue in a story, along with explanations for the refinements:
    
    ```
    Creative Writing Task: Craft an Engaging Dialogue Scene
    
    Your mission is to write a captivating dialogue scene between two characters that brings a story to life. Follow these steps to create a rich, meaningful exchange:
    
```
    1. Character Creation:
       - Introduce two distinct characters with names, ages, and brief backgrounds
       - Highlight one key personality trait for each character
```
    
```
    2. Setting the Scene:
       - Describe the location and time of day in 1-2 sentences
       - Mention any relevant objects or environmental factors
```
    
```
    3. Dialogue Objectives:
       - Define a clear purpose for the conversation (e.g., reveal a secret, resolve a conflict)
       - Identify one key emotion or tension underlying the exchange
```
    
```
    4. Writing the Dialogue:
       - Craft a natural conversation of 250-300 words
       - Use a mix of short and long responses to create rhythm
       - Include at least 3 instances of non-verbal communication (gestures, facial expressions, etc.)
       - Ensure each character's dialogue reflects their unique voice and background
```
    
```
    5. Advancing the Story:
       - Introduce at least one new piece of information or plot development
       - End the scene with a subtle hook or unresolved tension
```
    
```
    6. Formatting:
       - Use quotation marks for spoken words
       - Start a new paragraph for each speaker change
       - Integrate brief action or description between dialogue lines
```
    
    Remember: Show, don't tell. Let the characters' words and actions reveal their thoughts and feelings.
    
    Now, write a dialogue scene between [Character 1] and [Character 2] in [Setting], where they must [Dialogue Objective]. Begin your scene with a brief introduction of the characters and setting before diving into the dialogue.
    ```
    
    Explanations for refinements:
    
    1. Structured Approach: The prompt is organized into clear, numbered steps, making it easy to follow and ensuring all important elements are addressed.
    
    2. Character Development: Added more specific instructions for character creation, including names and key traits, to help establish distinct personalities.
    
    3. Setting Context: Expanded on the setting description to create a more vivid backdrop for the dialogue.
    
    4. Dialogue Objectives: Introduced a specific purpose for the conversation and underlying emotion, adding depth and direction to the exchange.
    
    5. Detailed Writing Instructions: Provided more specific guidelines on dialogue length, pacing, and the inclusion of non-verbal cues to create a more dynamic scene.
    
    6. Story Advancement: Added explicit instructions to introduce new information and end with a hook, ensuring the dialogue serves a purpose in the larger narrative.
    
    7. Formatting Guidelines: Included specific formatting instructions to improve readability and professional presentation.
    
    8. "Show, Don't Tell" Reminder: Emphasized this key writing principle to encourage more engaging and descriptive dialogue.
    
    9. Flexible Framework: The prompt allows for customization of characters, setting, and objectives, making it adaptable to various story types and genres.
    
    10. Balance of Structure and Creativity: While providing a clear framework, the prompt still leaves room for creative expression and unique interpretations.
    
    This optimized prompt addresses all the requirements of generating dialogue in a story context while providing a comprehensive guide for creating rich, meaningful exchanges between characters. It builds upon the strengths of the previous optimization while adding more specific instructions and creative elements to further enhance the quality of the output.
    
    
