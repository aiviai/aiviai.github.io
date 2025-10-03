---
layout: single
title: "TinyTroupe部署打造多角色团队头脑风暴"
sidebar:
  nav: "docs"
date: 2024-11-16 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, Vision]
tags: [AI, AI-Agents, GPT, GPT-4]
classes: wide
author_profile: true
---


#  **TinyTroupe部署打造多角色团队头脑风暴**

#  **Microsoft TinyTroupe - Install Locally - LLM-powered Multiagent Persona Simulation**

微软的 **TinyTroupe** 是一个创新的开源项目，旨在模拟多智能体交互，利用大型语言模型（LLM）创建逼真的角色和环境。该项目由微软团队开发，包括 Paulo Salem 博士，TinyTroupe 允许用户探索合成agent之间复杂的行为和互动，这些agent被称为 **TinyPersons** ，并在一个可定制的环境中进行互动，称为 **TinyWorld** 。 

##  TinyTroupe 的主要特点 

**多智能体模拟**

  * **TinyPersons** ：这些是由 AI 驱动的agent，具有独特的人格、兴趣和目标。它们可以相互交互并与环境互动，通过多种方法（如 _listen_ 、 _see_ 和 _act_ ）对刺激作出反应。 


  * **TinyWorld** ：这是 TinyPersons 存在和互动的虚拟空间。它提供了一个灵活的框架，用于模拟多样化场景，而不受代理如何相互参与的严格限制。 


**应用场景**

TinyTroupe 在多个领域具有广泛的潜在应用： 

  * **广告评估** ：企业可以在推出广告活动之前，模拟受众对数字广告（如 Bing Ads）的反应，从而帮助优化营销策略。 


  * **软件测试** ：该库可以为聊天机器人或搜索引擎等系统生成测试输入，使开发人员能够有效评估输出。 


  * **合成数据生成** ：TinyTroupe 可以创建逼真的合成数据集，用于训练机器学习模型或进行市场分析。 


  * **产品反馈** ：通过模拟焦点小组或利益相关者之间的互动，TinyTroupe 可以从特定角色的角度提供对产品提案和设计的宝贵见解。 


  * **头脑风暴会议** ：该工具可以通过模拟不同角色之间的讨论来促进创意过程，以较低成本产生创新想法。 


**技术方面**

TinyTroupe 采用缓存机制来优化性能，通过存储先前的 LLM 调用和模拟状态来减少与 API 使用相关的操作成本。该库还包括便于代理创建和管理的工具，例如 **TinyPersonFactory** ，帮助使用 LLM 生成新角色。 

###  Anaconda下载 

[ https://www.anaconda.com/download/success ](<https://www.anaconda.com/download/success>)

###  部署 
    
    
    conda create -n tinytroupes python=3.10
    
    conda activate tinytroupes
    
    conda install jupyter jupyterlab notebook nbconvert
    
    
    export OPENAI_API_KEY=
    
    jupyter lab
    
    
    pip install -e .
    

###  config.ini文件代码 
    
    
```
    [OpenAI]
    #
    # OpenAI or Azure OpenAI Service
    #
```
    
    # Default options: openai, azure
    API_TYPE=openai
    
```
    # Check Azure's documentation for updates here:
    # https://learn.microsoft.com/en-us/azure/ai-services/openai/chatgpt-quickstart?tabs=command-line&pivots=programming-language-python
    AZURE_API_VERSION=2023-05-15
```
    
```
    #
    # Model parameters
    #
```
    
```
    MODEL=gpt-4o-mini
    MAX_TOKENS=4000
    TEMPERATURE=0.3
    FREQ_PENALTY=0.0
    PRESENCE_PENALTY=0.0
    TIMEOUT=60
    MAX_ATTEMPTS=5
    WAITING_TIME=1
    EXPONENTIAL_BACKOFF_FACTOR=5
```
    
    EMBEDDING_MODEL=text-embedding-3-small 
    
    CACHE_API_CALLS=False
    CACHE_FILE_NAME=openai_api_cache.pickle
    
    MAX_CONTENT_DISPLAY_LENGTH=1024
    
```
    [Simulation]
    RAI_HARMFUL_CONTENT_PREVENTION=True
    RAI_COPYRIGHT_INFRINGEMENT_PREVENTION=True
```
    
    
```
    [Logging]
    LOGLEVEL=ERROR
    # ERROR
    # WARNING
    # INFO
    # DEBUG
```

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **
    
    
```
    """
    AI聊天机器人团队讨论模拟
    使用tinytroupe库创建虚拟团队成员并模拟产品功能讨论
    """
```
    
    import json
    import sys
    
```
    import tinytroupe
    from tinytroupe.environment import TinyWorld, TinySocialNetwork
    from tinytroupe.agent import TinyPerson
    from tinytroupe.extraction import ResultsExtractor
```
    
```
    def create_ethan_the_developer():
        """创建全栈开发者角色（偏后端） - Ethan"""
        ethan = TinyPerson("Ethan")
```
        
```
        ethan.define("age", 29)
        ethan.define("nationality", "American")
        ethan.define("occupation", "Full Stack Developer (Backend Focused)")
```
        
```
        ethan.define("routine", """Every morning, you start with system monitoring and performance analysis, 
                    then focus on backend development tasks, API optimization, and occasionally help with frontend integration.""", 
                    group="routines")    
```
        
```
        ethan.define("occupation_description", 
                     """
                     你是一名专注于后端的全栈开发者。你在一家科技公司工作，主要负责构建AI聊天机器人的核心系统。
                     你的主要工作包括：
                     - 设计和优化后端架构
                     - 构建高性能API和微服务
                     - 实现数据库设计和优化
                     - 确保系统的可扩展性和安全性
                     - 集成各种AI和NLP服务
                     - 配合前端开发进行系统整合
```
                     
```
                     你精通后端技术栈，同时对前端技术有足够理解，能够有效地与前端团队协作。
                     目前你正在专注于使用容器化技术优化部署流程，并探索如何提升AI服务的性能和响应速度。
                     """)
```
    
```
        ethan.define_several("personality_traits", 
                             [
                                 {"trait": "你思维逻辑性强，热爱解决复杂的技术问题。"}, 
                                 {"trait": "你注重系统性能和代码质量。"},
                                 {"trait": "你善于在技术团队中担任核心角色。"},
                                 {"trait": "你有很强的分析能力，善于优化系统架构。"},
                                 {"trait": "你乐于分享知识，帮助团队提升技术能力。"}
                             ])
```
    
```
        ethan.define_several("professional_interests", 
                             [
                                 {"interest": "分布式系统和微服务架构。"},
                                 {"interest": "AI和机器学习系统集成。"},
                                 {"interest": "高性能计算和系统优化。"},
                                 {"interest": "云原生技术和DevOps实践。"},
                                 {"interest": "数据库设计和性能调优。"}
                             ])
```
    
```
        ethan.define_several("personal_interests", 
                             [
                                 {"interest": "研究新的编程语言和技术框架。"},
                                 {"interest": "参与开源项目。"},
                                 {"interest": "下国际象棋。"},
                                 {"interest": "玩策略类游戏。"}
                             ])
```
    
```
        ethan.define_several("skills", 
                             [
                                 {"skill": "你精通Python、Java、Node.js等后端技术。"},
                                 {"skill": "你擅长设计和优化分布式系统。"},
                                 {"skill": "你熟练使用PostgreSQL、MongoDB等数据库。"},
                                 {"skill": "你精通Docker、Kubernetes等容器化技术。"},
                                 {"skill": "你有丰富的系统性能优化经验。"},
                                 {"skill": "你了解React、Vue.js等前端框架，能有效配合前端开发。"}
                             ])
```
    
```
        ethan.define_several("relationships", 
                             [
                                 {"name": "Alex", "description": "你的经理，一位注重技术创新的工程主管，善于平衡技术债务和新特性开发。"},
                                 {"name": "Liam", "description": "前端开发者，你经常与他紧密协作来确保前后端的顺畅集成。"},
                                 {"name": "Tina", "description": "UX设计师，你与她合作优化API设计以支持更好的用户体验。"}
                             ])
```
        
        return ethan
    
```
    def create_samantha_the_product_manager():
        """创建产品经理角色 - Samantha"""
        samantha = TinyPerson("Samantha")
```
    
```
        samantha.define("age", 32)
        samantha.define("nationality", "British")
        samantha.define("occupation", "Product Manager")
```
    
        samantha.define("routine", "Every morning, you review user feedback, prioritize tasks, and update the product roadmap.", group="routines")    
    
```
        samantha.define("occupation_description", 
                        """
                        你是一家开发AI聊天机器人公司的产品经理。你的职责包括定义产品特性、
                        编写用户故事，并与开发和设计团队密切合作以交付有价值的更新。
                        你关注用户需求，确保聊天机器人能提供真正的价值并符合整体业务战略。
                        你负责优先排序功能请求、维护产品待办事项，并与利益相关者协调以收集市场趋势和用户行为洞察。
                        """)
```
    
```
        samantha.define_several("personality_traits", 
                                [
                                    {"trait": "你组织能力强，喜欢跟踪进度。"}, 
                                    {"trait": "你富有同理心，能理解客户痛点。"},
                                    {"trait": "你在高压环境中表现出色，善于管理多个任务。"},
                                    {"trait": "你是个优秀的沟通者，热爱团队协作。"}
                                ])
```
    
```
        samantha.define_several("professional_interests", 
                                [
                                    {"interest": "用户体验和产品战略。"},
                                    {"interest": "客户反馈分析。"},
                                    {"interest": "敏捷项目管理。"}
                                ])
```
    
```
        samantha.define_several("personal_interests", 
                                [
                                    {"interest": "瑜伽和正念。"},
                                    {"interest": "阅读商业战略书籍。"},
                                    {"interest": "旅行体验不同文化。"}
                                ])
```
    
```
        samantha.define_several("skills", 
                                [
                                    {"skill": "你精通敏捷方法论和Jira。"},
                                    {"skill": "你有市场研究和用户访谈经验。"},
                                    {"skill": "你擅长定义KPI和分析产品指标。"}
                                ])
```
    
```
        samantha.define_several("relationships", 
                                [
                                    {"name": "Tina", "description": "你的UX设计师，始终确保用户反馈驱动设计决策。"},
                                    {"name": "Max", "description": "你的数据分析师，协助进行客户数据分析。"},
                                    {"name": "Ethan", "description": "你的核心开发者，帮助评估新功能的技术可行性。"}
                                ])
```
    
        return samantha
    
```
    def create_tina_the_ux_designer():
        """创建UX设计师角色 - Tina"""
        tina = TinyPerson("Tina")
```
    
```
        tina.define("age", 27)
        tina.define("nationality", "Canadian")
        tina.define("occupation", "UX Designer")
```
    
        tina.define("routine", "Every morning, you sketch out new design ideas, review user testing feedback, and collaborate with the team.", group="routines")    
    
```
        tina.define("occupation_description", 
                    """
                    你是一名专注于对话界面的UX设计师。你的主要职责是为AI聊天机器人创建直观、
                    用户友好的设计。你进行用户研究以了解聊天机器人用户的需求，开发线框图、
                    原型，并根据反馈改进界面。你还与开发团队合作，确保聊天机器人的对话流程
                    顺畅且具有吸引力，负责视觉和交互设计方面。
                    """)
```
    
```
        tina.define_several("personality_traits", 
                            [
                                {"trait": "你富有同理心，能轻易理解用户需求。"}, 
                                {"trait": "你富有创造力，喜欢尝试不同的设计方案。"},
                                {"trait": "你喜欢接收反馈，总是寻求改进设计。"},
                                {"trait": "你是个出色的沟通者，能清晰解释设计决策。"}
                            ])
```
    
```
        tina.define_several("professional_interests", 
                            [
                                {"interest": "以用户为中心的设计和人机交互。"},
                                {"interest": "原型工具如Figma和Sketch。"},
                                {"interest": "可用性测试和改进用户交互。"}
                            ])
```
    
```
        tina.define_several("personal_interests", 
                            [
                                {"interest": "摄影。"},
                                {"interest": "弹钢琴。"},
                                {"interest": "园艺和户外活动。"}
                            ])
```
    
```
        tina.define_several("skills", 
                            [
                                {"skill": "你精通Figma、Sketch和Adobe XD等设计工具。"},
                                {"skill": "你有进行用户测试并将结果应用到设计中的经验。"},
                                {"skill": "你深入理解对话式UI设计原则。"}
                            ])
```
    
```
        tina.define_several("relationships", 
                            [
                                {"name": "Samantha", "description": "你的产品经理，确保设计决策符合产品目标。"},
                                {"name": "Liam", "description": "你的前端开发者，帮助实现你的设计。"},
                                {"name": "Ethan", "description": "后端开发者，帮助你理解系统能力和限制。"}
                            ])
```
    
        return tina
    
```
    def create_alex_the_engineering_manager():
        """创建工程经理角色 - Alex"""
        alex = TinyPerson("Alex")
```
        
```
        alex.define("age", 38)
        alex.define("nationality", "Indian")
        alex.define("occupation", "Engineering Manager")
```
        
        alex.define("routine", "You spend your mornings in planning meetings and afternoons supporting your team.", group="routines")
        
```
        alex.define("occupation_description", 
                    """
                    你是工程团队的经理，负责指导团队开发AI聊天机器人。你平衡技术债务和新功能开发，
                    确保项目按时交付。你与产品团队密切合作，帮助确定技术可行性和工作量估算。
                    你特别关注团队成员的成长和项目的可持续发展。
                    """)
```
        
```
        alex.define_several("personality_traits", 
                            [
                                {"trait": "你善于领导，能激发团队潜能。"},
                                {"trait": "你有战略思维，善于规划长期目标。"},
                                {"trait": "你重视团队成长，经常提供指导和反馈。"},
                                {"trait": "你擅长沟通，能处理复杂的团队动态。"}
                            ])
```
        
```
        alex.define_several("professional_interests", 
                            [
                                {"interest": "团队管理和领导力发展。"},
                                {"interest": "技术策略和架构决策。"},
                                {"interest": "敏捷开发和持续集成。"}
                            ])
```
        
```
        alex.define_several("skills", 
                            [
                                {"skill": "你有丰富的项目管理经验。"},
                                {"skill": "你精通敏捷开发方法论。"},
                                {"skill": "你有很强的问题解决能力。"}
                            ])
```
    
```
        alex.define_several("relationships", 
                            [
                                {"name": "Ethan", "description": "你的核心开发者，负责系统架构和后端开发。"},
                                {"name": "Liam", "description": "你的前端开发者，负责用户界面实现。"},
                                {"name": "Samantha", "description": "产品经理，与你密切合作规划产品路线。"}
                            ])
```
        
        return alex
    
```
    def create_liam_the_frontend_developer():
        """创建前端开发者角色 - Liam"""
        liam = TinyPerson("Liam")
```
        
```
        liam.define("age", 26)
        liam.define("nationality", "Irish")
        liam.define("occupation", "Frontend Developer")
```
        
        liam.define("routine", "You start your day by reviewing design specifications and implementing UI components.", group="routines")
        
```
        liam.define("occupation_description", 
                    """
                    你是一名专注于用户界面的前端开发者。你负责将设计师的概念转化为实际的用户界面，
                    确保聊天机器人的交互体验流畅自然。你特别关注性能优化和响应式设计，
                    确保在各种设备上都能提供出色的用户体验。
                    """)
```
        
```
        liam.define_several("personality_traits", 
                            [
                                {"trait": "你对设计有强烈的感觉，注重细节。"},
                                {"trait": "你喜欢用代码实现创意设计。"},
                                {"trait": "你乐于接受反馈，不断改进工作。"},
                                {"trait": "你有耐心，善于解决界面兼容性问题。"}
                            ])
```
        
```
        liam.define_several("professional_interests", 
                            [
                                {"interest": "前端动画和交互设计。"},
                                {"interest": "性能优化和用户体验。"},
                                {"interest": "响应式设计和移动端适配。"}
                            ])
```
        
```
        liam.define_several("skills", 
                            [
                                {"skill": "你精通HTML5、CSS3和JavaScript。"},
                                {"skill": "你擅长前端动画和交互效果实现。"},
                                {"skill": "你有丰富的跨浏览器兼容性经验。"},
                                {"skill": "你熟练使用React和Vue.js等现代前端框架。"},
                                {"skill": "你了解前端性能优化和用户体验改进技术。"}
                            ])
```
    
```
        liam.define_several("relationships", 
                            [
                                {"name": "Tina", "description": "UX设计师，为你提供详细的界面设计和交互规范。"},
                                {"name": "Ethan", "description": "后端开发者，与你紧密协作确保前后端整合。"},
                                {"name": "Alex", "description": "工程经理，帮助你规划开发任务和时间安排。"}
                            ])
```
        
        return liam
    
```
    def create_max_the_data_analyst():
        """创建数据分析师角色 - Max"""
        max = TinyPerson("Max")
```
        
```
        max.define("age", 30)
        max.define("nationality", "German")
        max.define("occupation", "Data Analyst")
```
        
        max.define("routine", "You spend your mornings analyzing user behavior data and afternoons creating reports.", group="routines")
        
```
        max.define("occupation_description", 
                    """
                    你是一名专注于用户行为分析的数据分析师。你负责收集和分析聊天机器人的使用数据，
                    识别用户行为模式，提供改进建议。你还负责监控关键性能指标，评估新功能的效果。
                    你的分析结果对产品决策有重要影响。通过数据驱动的方法，你帮助团队理解用户需求
                    并优化产品体验。
                    """)
```
        
```
        max.define_several("personality_traits", 
                            [
                                {"trait": "你善于发现数据中的模式和趋势。"},
                                {"trait": "你注重数据准确性和可靠性。"},
                                {"trait": "你善于用数据讲故事，传达见解。"},
                                {"trait": "你喜欢探索新的分析方法和工具。"},
                                {"trait": "你对细节非常关注，追求数据的精确性。"}
                            ])
```
        
```
        max.define_several("professional_interests", 
                            [
                                {"interest": "用户行为分析和预测。"},
                                {"interest": "数据可视化和报告。"},
                                {"interest": "机器学习和预测模型。"},
                                {"interest": "A/B测试和实验设计。"},
                                {"interest": "数据驱动的产品优化。"}
                            ])
```
        
```
        max.define_several("skills", 
                            [
                                {"skill": "你精通Python数据分析库（Pandas、NumPy等）。"},
                                {"skill": "你擅长使用BI工具创建报告和仪表板。"},
                                {"skill": "你有丰富的A/B测试经验。"},
                                {"skill": "你熟练使用SQL进行数据查询和分析。"},
                                {"skill": "你了解机器学习基础，能构建简单的预测模型。"}
                            ])
```
        
```
        max.define_several("relationships", 
                            [
                                {"name": "Samantha", "description": "产品经理，你为她提供数据支持以做出产品决策。"},
                                {"name": "Ethan", "description": "后端开发者，协助你获取所需的系统数据。"},
                                {"name": "Alex", "description": "工程经理，与你讨论性能指标和系统改进方向。"}
                            ])
```
        
        return max
    
    def main():
        """主函数：创建虚拟世界并执行讨论"""
        
```
        # 创建包含所有角色的虚拟世界
        world = TinyWorld("AI Chatbot Focus Group", [
            create_ethan_the_developer(),
            create_samantha_the_product_manager(),
            create_tina_the_ux_designer(),
            create_alex_the_engineering_manager(),
            create_liam_the_frontend_developer(),
            create_max_the_data_analyst()
        ])
```
    
```
        # 向所有角色广播讨论任务
        world.broadcast("""
                     团队成员们，我们需要讨论开发一个创新的AI聊天机器人。我们的目标是不仅要实现常规的AI聊天功能，
                     还要加入市面上其他AI聊天机器人不具备的创新功能，以提高我们的竞争力并吸引更多用户。
```
    
```
                     请考虑以下几个方面：
                     1. 除了基本的对话功能外，我们能添加什么独特的功能？
                     2. 如何提高用户体验和交互的自然度？
                     3. 有什么创新的技术或方法可以应用？
                     4. 如何确保我们的产品在市场上脱颖而出？
                     5. 如何平衡创新性和实用性？
                     6. 如何确保系统的可扩展性和性能？
```
    
                     请从你的专业角度提供见解和建议。让我们开始头脑风暴。
                     """)
    
        # 运行6轮讨论
        world.run(4)
    
        # 选择Alex作为报告人（作为工程经理，他能够很好地平衡技术和产品视角）
        rapporteur = world.get_agent_by_name("Alex")
    
```
        # 让报告人总结讨论中提出的想法
        rapporteur.listen_and_act("""
                               请总结团队讨论的主要成果，包括：
                               1. 创新功能提议
                               2. 技术实现建议
                               3. 用户体验改进方案
                               4. 潜在的挑战和解决方案
```
                               
                               请确保总结涵盖每个团队成员的主要贡献。
                               """)
    
        # 创建结果提取器并获取结果
        extractor = ResultsExtractor()
    
```
        # 从报告人处提取结果
        results = extractor.extract_results_from_agent(
            rapporteur, 
            extraction_objective="""总结团队提出的创新AI聊天机器人功能想法和实现方案，
                                  突出每个想法的创新点、技术可行性和潜在影响。
                                  特别关注那些能让产品在市场上脱颖而出的特性。""", 
            situation="AI聊天机器人产品创新讨论会议。"
        )
```
    
```
        # 格式化打印结果
        print("\n====== AI聊天机器人创新功能讨论总结 ======\n")
        print(results)
```
    
    if __name__ == "__main__":
        main()
    
