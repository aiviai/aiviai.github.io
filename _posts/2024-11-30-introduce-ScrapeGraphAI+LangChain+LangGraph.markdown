---
layout: single  
title: "ScrapeGraphAI开启智能数据抓取新时代！用AI重塑数据提取方式！ScrapeGraphAI+LangChain+LangGraph打造最强文章采集和写作AI智能体！让内容创作更简单"  
sidebar:
  nav: "docs"
date: 2024-12-30 10:00:00 +0800  
categories: AIAgents
tags: [Ai智能体, 爬虫, 开源, 自然语言处理,LangChain,LangGraph]
classes: wide  

author_profile: true  
---

传统的网页抓取工具严重依赖于预定义的规则和模式，一旦目标网站的结构发生变化，就需要手动更新代码，耗时费力。而 ScrapeGraphAI 则另辟蹊径，它利用 LLMs 的强大理解能力，让用户只需用自然语言描述所需数据，剩下的复杂工作全部交给 AI 完成！

### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://bili2233.cn/reWSLAE)
- [👉👉👉 通过YouTube观看](https://youtu.be/PEB8z48mAhw)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng


### ScrapeGraphAI：革新网络爬取的开源工具

**ScrapeGraphAI** 是一个开源的 Python 库，通过结合**大语言模型（LLMs）和基于图的逻辑**，彻底革新了网络爬取技术。用户只需用简单的自然语言描述需要提取的信息，即可从网站或多种文档格式中提取结构化数据。

---

### 核心功能

### **自适应爬取**

ScrapeGraphAI 利用 LLM 技术，能够自动适应网站结构的变化，大幅降低了对频繁维护和更新的需求。不像传统依赖固定模式的爬取工具，它可以应对不断变化的网站布局，无需人工干预。

### **多平台支持**

该平台兼容多种 LLM 提供商，包括 GPT、Gemini、Groq、Azure 和 Hugging Face，同时也支持通过 Ollama 使用本地模型。此外，它可以处理 XML、HTML、JSON 和 Markdown 等多种文档格式。

---

### 可用管道

| **管道名称** | **功能描述** |
| --- | --- |
| **SmartScraperGraph** | 基于提示词和来源的单页面数据提取 |
| **SearchGraph** | 从搜索结果中进行多页面数据提取 |
| **SpeechGraph** | 将提取内容转换为音频 |
| **ScriptCreatorGraph** | 生成爬取所需的 Python 脚本 |

---

### 实现方式

ScrapeGraphAI 采用基于图的设计，将爬取流程分解为多个离散节点，每个节点负责处理不同的任务。这种模块化的方法不仅提升了爬取管道的灵活性和鲁棒性，还使得功能的扩展和修改变得更加高效。

---

### 优势分析

### **简化操作**

用户只需描述想要提取的数据，其余技术细节均由 ScrapeGraphAI 负责处理。这使得它在 AI 应用、数据分析、数据集创建以及平台搭建等场景中极具价值。

### **降低维护成本**

AI 驱动的爬取方法显著减少了脚本更新和维护的需求，让开发者能专注于数据分析而非故障排查。同时，该系统能够自动适应网站的变化，为长期的数据提取需求提供了更具可持续性的解决方案。

---

### 总结

ScrapeGraphAI 凭借其自适应能力、多平台支持和模块化设计，为数据提取带来了全新的可能。无论是从简单的单页面抓取到复杂的多页面数据挖掘，它都为开发者提供了强大且高效的解决方案，是网络爬取领域的一次重大突破。

---

## 核心管道功能

**SmartScraperGraph**
针对单页网站的数据提取，只需提供用户提示和输入源即可完成抓取。

**SearchGraph**
支持从搜索引擎的多个搜索结果中批量提取信息。

**SpeechGraph**
能够从网站提取信息并自动生成音频文件，实现文本到语音的转换。

## 技术特性

**模型支持**
支持多种LLM提供商和部署方式：

- 云端模型：GPT、Gemini、Groq、Azure
- 本地模型：通过Ollama实现

**文档处理能力**
可处理多种格式的文档：

- HTML网页
- XML文件
- JSON数据
- Markdown文档

## 智能化功能

**自动化结构分析**

- 能够自动识别网页中的重要数据节点
- 支持静态内容和动态加载内容的提取
- 无需手动编写复杂的抓取规则

**自适应能力**

- 可以适应网站结构的变化
- 自动调整抓取策略
- 减少维护成本和人工干预

## 实用工具

**图形化工作流**
采用基于图的设计方法，将抓取过程分解为离散节点，提供灵活的管道定制能力。

**开发工具支持**

- 支持Playwright处理JavaScript渲染的网页
- 提供API设计和详细文档
- 包含丰富的使用示例

## 数据输出

- 提取的信息以字典格式输出
- 支持结构化数据的自动导入
- 可直接用于后续的数据分析和处理

### ScrapeGraphAI API key申请 [https://dashboard.scrapegraphai.com/](https://dashboard.scrapegraphai.com/)

### Tavily API Key申请 [https://app.tavily.com/home](https://app.tavily.com/home)

### 安装和部署

```bash
pip install scrapegraphai

sudo playwright install

pip install -U duckduckgo-search

pip install scrapegraphai'[other-language-models]'

pip install scrapegraphai'[more-semantic-options]'

pip install scrapegraphai'[more-browser-options]'

```

### OpenAI接口示例

```python
import os
from dotenv import load_dotenv

import json
from scrapegraphai.graphs import SmartScraperGraph

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

# Define the configuration for the scraping pipeline
graph_config = {
    "llm": {
        "api_key": api_key,
        "model": "openai/gpt-4o-mini",
    },
    "verbose": True,
    "headless": True,
}

# Create the SmartScraperGraph instance
smart_scraper_graph = SmartScraperGraph(
    prompt="Extract all the posts from the website",
    source="https://www.aivi.fyi/",
    config=graph_config
)

# Run the pipeline
result = smart_scraper_graph.run()
print(json.dumps(result, indent=4,ensure_ascii=False))
```

### Ollama

```python
import json
from scrapegraphai.graphs import SmartScraperGraph

# Define the configuration for the scraping pipeline
graph_config = {
    "llm": {
        "api_key": "ollama",
        "model": "ollama/mistral-nemo:latest",
        "temperature": 0,
        "rate_limit": {
            "requests_per_second": 1
        }
    },
    "verbose": True,
    "headless": False,
}

# 抓取网页标题
smart_scraper_graph = SmartScraperGraph(
    prompt="List all article titles on the page",
    source="https://www.aivi.fyi/",
    config=graph_config
)

# Run the pipeline
result = smart_scraper_graph.run()
print(result)
```

### 🔥🔥🔥LangGraph

### 主要功能：

1. 网站内容提取：使用 langchain-scrapegraph 工具自动提取博客网站上的文章内容，包括标题、摘要、正文和标签。
2. 数据结构定义：
- 使用 Pydantic 模型定义了两个数据结构：
    - BlogPostSchema：定义单篇文章的结构（标题、摘要、内容、标签）
    - BlogPostsSchema：定义整个博客的文章列表结构
1. AI 辅助提取：
- 使用 OpenAI 的 GPT-4 模型来理解和提取网页内容
- 通过 ReAct agent 协调 AI 模型和网页抓取工具的工作
1. 数据处理和存储：
- 将提取的内容转换为 Pandas DataFrame 格式
- 自动将结果保存为 CSV 文件，支持中文编码

关键组件：

1. SmartScraperTool：智能网页内容提取工具
2. ChatOpenAI：GPT模型接口
3. ReAct agent：协调各组件工作的代理
4. Pandas：数据处理和保存

使用场景：

- 批量提取博客文章内容
- 建立文章数据库
- 内容分析和管理
- 自动化内容采集

技术特点：

1. 自动化：无需手动复制粘贴
2. 结构化：输出格式统一、规范
3. 智能化：使用 AI 理解和提取内容
4. 可扩展：易于修改和适应不同网站结构

```bash
from pydantic import BaseModel, Field
from typing import List
import getpass
import os
from langchain_scrapegraph.tools import SmartScraperTool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
import json
import pandas as pd
from google.colab import userdata

# 定义一个文章的schema
class BlogPostSchema(BaseModel):
    title: str = Field(description="文章标题")
    summary: str = Field(description="文章摘要/总结")
    content: str = Field(description="文章完整内容")
    tags: List[str] = Field(description="文章标签")

# 定义包含多篇文章的schema
class BlogPostsSchema(BaseModel):
    posts: List[BlogPostSchema] = Field(description="博客文章列表")

# 设置API密钥
if not os.environ.get("SGAI_API_KEY"):
    os.environ["SGAI_API_KEY"] = userdata.get('SGAI_API_KEY')

if not os.environ.get("OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')

# 初始化scraper工具
smartscraper_tool = SmartScraperTool(llm_output_schema=BlogPostsSchema)

# 初始化LLM模型
llm_model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 设置工具列表
tools = [smartscraper_tool]

# 设置内存保存器
memory = MemorySaver()

# 配置
config = {"configurable": {"thread_id": "1"}}

# 初始化(ReAct agent) [ReAct agent是一种创新的智能Agent架构，它通过结合推理和行动的能力来解决复杂任务。]
graph = create_react_agent(llm_model, tools=tools, checkpointer=memory)

# 运行抓取
inputs = {
    "messages": [
        (
            "user",
            "Go to https://www.aivi.fyi/ and extract all blog posts with their titles, summaries, content and tags"
        )
    ]
}

# 执行graph并获取结果
print("开始抓取博客内容...")
for event in graph.stream(inputs, config, stream_mode="values"):
    event["messages"][-1].pretty_print()

# 获取最后一条消息（假设是SmartScraper工具的响应）
result = graph.get_state(config).values["messages"][-1].content

# 将字符串转换为JSON
result = json.loads(result)

# 转换为DataFrame
df = pd.DataFrame([
    {
        'title': post['title'],
        'summary': post['summary'],
        'content': post['content'],
        'tags': ','.join(post['tags']) if post['tags'] else ''
    }
    for post in result['posts']
])

# 保存到CSV文件
csv_file = "blog_posts.csv"
df.to_csv(csv_file, index=False, encoding='utf-8')
print(f"数据已保存到 {csv_file}")

# 显示提取的文章数量
print(f"\n总共提取了 {len(df)} 篇文章")
```

### 🔥搜索资讯并改写为科技文章

### 核心功能：

1. 新闻搜索与提取
- 使用 Tavily 搜索引擎搜索最新的 AI 相关新闻
- 通过 SmartScraper 工具提取网页内容
- 对搜索结果进行结构化处理
1. 内容分析与处理
- 解析和验证搜索到的文章数据
- 提取关键信息（标题、链接、摘要、文章内容等）
- 对内容进行格式化和清理
1. 文章自动生成
- 使用 GPT-4 模型生成科技资讯文章
- 整合多个新闻源的信息
- 生成结构化的文章（标题、副标题、正文等）
1. 数据存储和输出
- 将原始数据保存为 CSV 文件
- 生成 Markdown 格式的文章
- 提供文章预览功能

技术特点：

1. 模块化设计
- 使用类和方法组织代码
- 功能模块清晰分离
- 便于维护和扩展
1. 错误处理机制
- 完整的异常捕获和处理
- 详细的日志记录
- 容错和恢复机制
1. 数据模型规范
- 使用 Pydantic 模型定义数据结构
- 强类型检查
- 数据验证和清理

实际应用场景：

1. 科技媒体
- 快速生成 AI 领域新闻综述
- 跟踪技术发展动态
- 制作行业报告
1. 研究机构
- 收集 AI 研究进展
- 整理技术发展趋势
- 生成研究简报
1. 企业决策
- 跟踪行业动态
- 竞争对手分析
- 技术趋势分析

输出成果：

1. 结构化数据（CSV 文件）
- 原始新闻数据
- 文章元信息
- 来源链接
1. 生成文章（Markdown 文件）
- 专业的科技文章
- 包含多个信息源
- 深度分析和见解

这个系统的主要价值在于自动化了从新闻搜索到文章生成的完整流程，大大提高了科技资讯生产的效率，同时保证了内容的专业性和可读性。

```python
from pydantic import BaseModel, Field
from typing import List, Optional
import getpass
import os
from langchain_scrapegraph.tools import SmartScraperTool
from langchain_community.tools import TavilySearchResults
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
import json
import pandas as pd
from datetime import datetime
import logging
import time
import hashlib

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# 数据模型定义
class AIArticle(BaseModel):
    """增强的AI文章数据模型"""
    title: str = Field(description="文章标题")
    link: str = Field(description="文章URL链接")
    summary: Optional[str] = Field(description="文章摘要/总结", default="")
    content: Optional[str] = Field(description="文章完整内容", default="")
    publish_date: Optional[str] = Field(description="发布日期", default="")
    author: Optional[str] = Field(description="作者", default="")
    tags: Optional[List[str]] = Field(description="文章标签", default_factory=list)

class AIArticles(BaseModel):
    """AI文章列表的数据模型"""
    articles: List[AIArticle] = Field(description="AI和大模型相关的文章列表")

class TechNewsArticle(BaseModel):
    """科技资讯文章的数据模型"""
    title: str = Field(description="科技资讯标题")
    subtitle: str = Field(description="副标题")
    author: str = Field(description="作者")
    date: str = Field(description="发布日期")
    content: str = Field(description="文章内容")
    sources: List[str] = Field(description="信息来源")

class AINewsGenerator:
    def __init__(self):
        self.setup_api_keys()
        self.smartscraper_tool = None
        self.tavily_tool = None
        self.llm_model = None
        self.graph = None
        self.config = None

    def setup_api_keys(self):
        """设置必要的API密钥"""
        try:
            if not os.environ.get("SGAI_API_KEY"):
                os.environ["SGAI_API_KEY"] = userdata.get('SGAI_API_KEY')
            
            if not os.environ.get("TAVILY_API_KEY"):
                os.environ["TAVILY_API_KEY"] = userdata.get('TAVILY_API_KEY')
            
            if not os.environ.get("OPENAI_API_KEY"):
                os.environ["OPENAI_API_KEY"] = userdata.get('OPENAI_API_KEY')
        except Exception as e:
            logging.error(f"设置API密钥时出错: {str(e)}")
            raise

    def initialize_tools(self):
        """初始化所需工具"""
        try:
            self.smartscraper_tool = SmartScraperTool(llm_output_schema=AIArticles)
            
            self.tavily_tool = TavilySearchResults(
                max_results=5,
                name="ai_news_finder",
                description="搜索最新的开源大语言模型相关的新闻和文章"
            )
            
            self.llm_model = ChatOpenAI(
                model="gpt-4o-mini",
                temperature=0.3,
                request_timeout=120
            )
            
            return [self.smartscraper_tool, self.tavily_tool]
        except Exception as e:
            logging.error(f"初始化工具时出错: {str(e)}")
            raise

    def create_agent(self, tools):
        """创建ReAct agent"""
        try:
            memory = MemorySaver()
            self.config = {"configurable": {"thread_id": str(int(time.time()))}}
            
            self.graph = create_react_agent(
                model=self.llm_model,
                tools=tools,
                checkpointer=memory
            )
            
            return self.graph, self.config
        except Exception as e:
            logging.error(f"创建agent时出错: {str(e)}")
            raise

    def extract_article_content(self, url: str) -> dict:
        """从单个URL提取完整文章内容"""
        try:
            extract_prompt = f"""
            请从以下URL提取文章的完整信息，包括：
            1. 标题
            2. 作者
            3. 发布日期
            4. 完整的文章内容（保留所有段落和格式）
            5. 文章中的关键技术点
            6. 相关链接和引用
            7. 文章标签或分类
            
            URL: {url}
            
            请以JSON格式返回，包含以下字段：
            { "title": "文章标题", "author": "作者名称", "publish_date": "发布日期", "content": "完整文章内容", "summary": "文章摘要", "tags": ["标签1", "标签2"] }
            """
            
            extraction_inputs = {
                "messages": [("user", extract_prompt)]
            }
            
            article_content = None
            for event in self.graph.stream(extraction_inputs, self.config, stream_mode="values"):
                message = event["messages"][-1]
                if hasattr(message, 'content'):
                    article_content = message.content
                    break
            
            # 确保返回有效的数据结构
            if article_content:
                try:
                    parsed_content = json.loads(article_content)
                    return parsed_content
                except json.JSONDecodeError:
                    return {
                        "title": "无标题",
                        "author": "未知",
                        "publish_date": "",
                        "content": article_content,
                        "summary": article_content[:200] + "...",
                        "tags": []
                    }
            return None
        except Exception as e:
            logging.error(f"提取文章内容时出错 {url}: {str(e)}")
            return None

    def search_and_extract(self):
        """搜索和提取AI相关文章"""
        try:
            # 首先搜索相关文章
            search_query = "latest developments in open source large language models AI technology"
            search_inputs = {
                "messages": [("user", search_query)]
            }
            
            logging.info("开始搜索相关文章...")
            urls_found = set()
            
            for event in self.graph.stream(search_inputs, self.config, stream_mode="values"):
                message = event["messages"][-1]
                if hasattr(message, 'content'):
                    try:
                        # 解析返回的搜索结果
                        if isinstance(message.content, str):
                            data = json.loads(message.content)
                            if isinstance(data, list):
                                for item in data:
                                    if 'url' in item:
                                        urls_found.add(item['url'])
                    except:
                        continue

            articles_data = {"articles": []}
            
            # 对每个URL进行内容提取
            for url in urls_found:
                logging.info(f"正在提取文章: {url}")
                article_data = self.extract_article_content(url)
                
                if article_data:
                    article_data["link"] = url
                    articles_data["articles"].append(article_data)
                
                # 添加延时避免过快请求
                time.sleep(2)
            
            return articles_data
                
        except Exception as e:
            logging.error(f"搜索和提取过程出错: {str(e)}")
            return {"articles": []}

    def generate_article(self, articles_data: dict) -> TechNewsArticle:
        """生成科技资讯文章"""
        try:
            if not isinstance(articles_data, dict) or "articles" not in articles_data:
                articles_data = {"articles": []}
            
            sources = [article["link"] for article in articles_data["articles"] if article.get("link")]
            
            # 增强的提示词
            prompt = f"""
            基于以下AI和大语言模型相关的新闻信息，撰写一篇深度科技资讯文章。

            要求：
            1. 专业性：使用准确的技术术语，保持客观立场
            2. 可读性：确保非技术读者也能理解
            3. 结构完整：按照下面的结构组织内容
            4. 分析深度：加入技术原理分析和行业影响评估
            5. 前瞻性：对技术发展趋势做出预测和展望
            6. 数据支持：引用具体的数据和案例
            7. 多角度：考虑技术、商业和社会影响

            文章结构：
            1. 标题：吸引人且专业
            2. 副标题：补充说明要点
            3. 导语：概括核心内容（3-4段）
            4. 正文：
               - 技术背景和发展历程
               - 最新突破和创新点
               - 技术原理解析
               - 应用场景分析
               - 行业影响评估
               - 挑战和解决方案
               - 专家观点和市场反应
            5. 趋势展望：预测未来发展方向
            6. 总结：核心观点提炼

            新闻信息：
            {json.dumps([{
                "title": article.get("title", ""),
                "summary": article.get("summary", ""),
                "content": article.get("content", "")[:1000] + "..."  
            } for article in articles_data["articles"]], indent=2, ensure_ascii=False)}
            """
            
            response = self.llm_model.invoke(prompt)
            content_lines = response.content.split('\n')
            
            article = TechNewsArticle(
                title=content_lines[0].strip('# ') if content_lines else "AI技术发展最新动态",
                subtitle=content_lines[1].strip('## ') if len(content_lines) > 1 else "开源大语言模型领域重要进展分析",
                author="AI超元域",
                date=datetime.now().strftime("%Y-%m-%d"),
                content=response.content,
                sources=sources
            )
            
            return article
            
        except Exception as e:
            logging.error(f"生成文章时出错: {str(e)}")
            return TechNewsArticle(
                title="AI技术发展动态",
                subtitle="开源大语言模型进展综述",
                author="AI超元域",
                date=datetime.now().strftime("%Y-%m-%d"),
                content="内容生成失败",
                sources=[]
            )

    def save_results(self, articles_data: dict, tech_article: TechNewsArticle):
        """保存结果到文件"""
        try:
            # 创建输出目录
            output_dir = "output"
            articles_dir = f"{output_dir}/articles"
            os.makedirs(articles_dir, exist_ok=True)
            
            # 保存原始文章数据
            df = pd.DataFrame(articles_data["articles"])
            df.to_csv(f"{output_dir}/ai_articles.csv", index=False, encoding='utf-8')
            logging.info(f"原始数据已保存到 {output_dir}/ai_articles.csv")
            
            # 保存每篇原始文章
            for idx, article in enumerate(articles_data["articles"]):
                # 使用URL的哈希作为文件名的一部分
                url_hash = hashlib.md5(article["link"].encode()).hexdigest()[:8]
                file_name = f"{articles_dir}/article_{idx+1}_{url_hash}.md"
                
                with open(file_name, 'w', encoding='utf-8') as f:
                    f.write(f"# {article.get('title', '无标题')}\n\n")
                    f.write(f"作者: {article.get('author', '未知')}\n")
                    f.write(f"发布日期: {article.get('publish_date', '未知')}\n")
                    f.write(f"来源: {article.get('link', '')}\n\n")
                    if article.get('tags'):
                        f.write("标签: " + ", ".join(article['tags']) + "\n\n")
                    f.write("## 摘要\n\n")
                    f.write(f"{article.get('summary', '无摘要')}\n\n")
                    f.write("## 正文\n\n")
                    f.write(f"{article.get('content', '无正文内容')}\n")
            
            # 保存生成的科技资讯文章
            article_filename = f"{output_dir}/tech_article_{datetime.now().strftime('%Y%m%d')}.md"
            
            with open(article_filename, 'w', encoding='utf-8') as f:
                f.write(f"# {tech_article.title}\n\n")
                f.write(f"## {tech_article.subtitle}\n\n")
                f.write(f"作者: {tech_article.author}\n")
                f.write(f"日期: {tech_article.date}\n\n")
                f.write(f"{tech_article.content}\n\n")
                f.write("\n## 信息来源\n")
                for source in tech_article.sources:
                    f.write(f"- {source}\n")
                    
            logging.info(f"文章已保存到 {article_filename}")
            logging.info(f"原始文章已保存到 {articles_dir} 目录")
            
        except Exception as e:
            logging.error(f"保存结果时出错: {str(e)}")
            raise

def main():
    """主函数"""
    try:
        # 创建AI新闻生成器实例
        generator = AINewsGenerator()
        
        # 初始化工具
        tools = generator.initialize_tools()
        
        # 创建agent
        generator.create_agent(tools)
        
        # 搜索和提取文章
        logging.info("开始搜索和提取文章...")
        articles_data = generator.search_and_extract()
        
        if not articles_data["articles"]:
            logging.warning("未找到任何文章，请检查搜索条件或网络连接")
            return
            
        # 生成科技资讯文章
        logging.info("开始生成科技资讯文章...")
        tech_article = generator.generate_article(articles_data)
        
        # 保存结果
        generator.save_results(articles_data, tech_article)
        
        # 显示文章统计信息
        logging.info(f"\n文章统计信息：")
        print(f"- 收集的文章数量：{len(articles_data['articles'])}")
        print(f"- 生成的文章标题：{tech_article.title}")
        print(f"- 作者：{tech_article.author}")
        print(f"- 日期：{tech_article.date}")
        
        # 显示文章预览
        print("\n文章预览：")
        print("=" * 50)
        print(f"标题：{tech_article.title}")
        print(f"副标题：{tech_article.subtitle}")
        print("-" * 50)
        preview_length = 800  # 预览的字符数
        preview_content = tech_article.content[:preview_length]
        print(f"{preview_content}...")
        print("=" * 50)
        
        # 显示保存位置信息
        logging.info("\n文件保存信息：")
        print("- 原始数据：output/ai_articles.csv")
        print("- 科技资讯：output/tech_article_*.md")
        print("- 原文存档：output/articles/")
        
    except Exception as e:
        logging.error(f"程序运行出错: {str(e)}")
        raise

if __name__ == "__main__":
    main()
```