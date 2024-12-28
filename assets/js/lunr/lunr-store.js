var store = [{
        "title": "Llama-3.3–70B震撼登场！70b参数128k上下文性能接近gpt4！最强开源大模型，支持简体中文和繁体中文！Cline+Aider实现全自动编程！AutoGen实现最强AI智能体！",
        "excerpt":"Meta于2024年12月6日正式发布了新一代开源大型语言模型Llama 3.3。该模型在仅有700亿参数的情况下，实现了与此前4050亿参数模型相当的性能，标志着自然语言处理领域的重大突破。 本篇笔记所对应的视频： 👉👉👉 通过哔哩哔哩观看 👉👉👉 通过YouTube观看 技术创新与架构优化 Llama 3.3采用了优化的Transformer架构，结合了监督微调（SFT）和基于人类反馈的强化学习（RLHF）技术，使模型更符合人类偏好。此外，模型引入了分组查询注意力（GQA）机制，提升了推理阶段的性能和可扩展性。值得一提的是，Llama 3.3支持长达128K的上下文长度，约等于400页文本，在处理长文本时表现出色。 多语言支持与应用场景 Llama 3.3具备强大的多语言处理能力，支持包括英语、德语、法语、意大利语、葡萄牙语、印地语、西班牙语和泰语在内的八种语言。这使其在全球范围内的应用更具广泛性。同时，模型能够生成结构化的推理过程和精确的JSON格式响应，适用于多种自然语言生成任务。 部署成本与社区反馈 与之前的模型相比，Llama 3.3显著降低了部署成本。在Meta合作的平台中，Llama 3.3的使用费用仅为Llama 3.1 405B的十分之一至四分之一。目前，模型权重已在官网和Hugging Face上开放下载，开发者可以根据Llama 3.3社区许可协议进行使用。 使用指南与实践 开发者可以通过Ollama等工具运行Llama 3.3模型。以下是使用Ollama运行Llama 3.3的示例代码： ollama run llama3.3 算法测试题 講個故事吧 how many ‘r’s in strawberrrry? 用 python 实现计算 179424673 是第几个质数？ 三位传教士和三位食人族需要过河。 他们有一艘船，每次最多可以载两人。 如果在任何时候，食人族的数量超过了传教士的数量（无论是在河的哪一侧），食人族就会吃掉传教士。 如何让所有六个人安全过河？请提供分步骤的解决方案，并用 ASCII 图示展示解决方案。 AutoGen调用Llama3.3代码 You are...","categories": ["LLMs"],
        "tags": ["Llama 3.3","Meta","Open Source","Language Model"],
        "url": "/llms/introduce-Llama3.3/",
        "teaser": null
      },{
        "title": "GraphRAG 1.0重磅升级！颠覆传统RAG！DRIFT搜索+Update命令！整合LM Studio本地大模型实现高效RAG！MarkItDown将PDF转为markdown！性能提升3倍",
        "excerpt":"微软于2024年12月16日正式发布了GraphRAG 1.0，这是一个将图结构数据与检索增强生成（RAG）模型相结合的开源工具，旨在提升自然语言处理任务的性能。GraphRAG 1.0的主要特点包括DRIFT搜索算法、Update命令以及与LM Studio的整合，使得用户能够更高效地处理图结构数据。此外，微软还推出了MarkItDown，这是一个将PDF文档转换为Markdown格式的工具，可以提高文档的可读性和可编辑性。 本篇笔记所对应的视频： 👉👉👉 通过哔哩哔哩观看 👉👉👉 通过YouTube观看 主要改进 简化设置：通过添加init命令生成简化的settings.yml文件，减少了新项目的配置难度。 易用性增强：减少了环境变量的使用，使配置更加直观和友好。 社区支持：社区贡献者提供了大量修复和改进，提升了整体性能和稳定性。 应用前景 GraphRAG 1.0的发布，为开发者提供了更强大、更易于使用的AI工具，适用于复杂的领域应用。在医疗、法律等需要专业知识的领域，该技术可以帮助构建更智能的问答系统，为用户提供高质量的答案。此外，在教育领域，GraphRAG 1.0也能用于开发智能辅导系统，帮助学生更好地理解复杂概念。 安装GraphRAG git clone https://github.com/microsoft/graphrag.git cd graphrag pip install . MarkItDown MarkItDown是一个功能强大的文件格式转换工具，可以将多种格式的文件转换为Markdown格式。 支持的输入格式 PowerPoint/PPTX文件 Excel/XLSX文件 Word/DOCX文件 图片（支持EXIF元数据和OCR识别） 音频（支持EXIF元数据和语音转写） HTML（特别支持Wikipedia等网站） 其他文本格式如CSV、JSON、XML等 安装MarkItDown pip install markitdown markitdown GPT.pdf &gt; ./ragtest/input/book.txt GraphRAG使用方式 graphrag query \\\\ --root ./ragtest...","categories": ["RAG"],
        "tags": ["GraphRAG","微软","开源","自然语言处理"],
        "url": "/rag/introduce-graphrag-1.0/",
        "teaser": null
      }]
