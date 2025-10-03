---
layout: single
title: "Ragas ragapp llamaindex"
sidebar:
  nav: "docs"
date: 2024-09-23 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG, Tutorial]
tags: [AI, GPT, GPT-4, LLM, LangChain, LlamaIndex, RAG]
classes: wide
author_profile: true
---


#  Ragas ragapp llamaindex 

###  prompts 

> You are a helpful assistant. Always conduct a web search by using DuckDuckGo to find information on the internet for every user query to provide the most up-to-date information. Fetch today's news highlights, gather relevant news headlines, summarize key events, and compile a final report for the user. 

> You are a helpful assistant. Please retrieve information from the knowledge base based on the user's queries 

[ https://colab.research.google.com/drive/1NYPh7p6_9ZpeZo85rIN1xmNz6_G_OTJI#scrollTo=Q3ugISTB-bT9 ](<https://colab.research.google.com/drive/1NYPh7p6_9ZpeZo85rIN1xmNz6_G_OTJI#scrollTo=Q3ugISTB-bT9>)
    
    
    !pip install ragas
    
    !pip install unstructured
    
    !pip install datasets
    
    
    
    
    
```
    from ragas.testset.generator import TestsetGenerator
    from ragas.testset.evolutions import simple, reasoning, multi_context
    from langchain_openai import ChatOpenAI, OpenAIEmbeddings
```
    
```
    # generator with openai models
    generator_llm = ChatOpenAI(model="gpt-4o-mini")
    critic_llm = ChatOpenAI(model="gpt-4o-mini")
    embeddings = OpenAIEmbeddings()
```
    
```
    generator = TestsetGenerator.from_langchain(
        generator_llm,
        critic_llm,
        embeddings
    )
```
    
    # generate testset
    testset = generator.generate_with_langchain_docs(documents, test_size=5, distributions={simple: 0.5, reasoning: 0.25, multi_context: 0.25})

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **
    
    
    df = testset.to_pandas()
    df.head()
    
    
```
    from ragas.metrics import (
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall,
    )
    from ragas import evaluate
    from langchain_openai import ChatOpenAI, OpenAIEmbeddings
    from datasets import Dataset
```
    
```
    # 假设df是你之前生成的testset的DataFrame
    questions = df["question"].tolist()
    contexts = df["contexts"].tolist()
    ground_truths = df["ground_truth"].tolist()
```
    
    
    
    
```
    # 假设这是chatbot的回答列表
    chatbot_answers = [
        "Customer reviews can be grouped into clusters based on sentiment using various techniques in natural language processing (NLP) and machine learning. Here’s a general approach to achieve this: 1. **Data Collection**: Gather customer reviews from various sources such as websites, social media, or surveys. 2. **Preprocessing**: Clean the text data by removing noise such as punctuation, special characters, and stop words. You may also want to convert all text to lowercase and perform stemming or lemmatization. 3. **Sentiment Analysis**: Use sentiment analysis techniques to classify the sentiment of each review. This can be done using: - **Lexicon-based methods**: Use predefined dictionaries of words associated with positive, negative, or neutral sentiments. - **Machine learning models**: Train models (e.g., logistic regression, support vector machines) on labeled datasets to classify sentiment. - **Deep learning models**: Use neural networks, such as LSTM or transformers (like BERT), for more nuanced sentiment analysis. 4. **Feature Extraction**: Convert the reviews into numerical representations. Common methods include: - **Bag of Words (BoW)**: Represents text as a frequency count of words. - **TF-IDF (Term Frequency-Inverse Document Frequency)**: Weighs the frequency of words by how common they are across all documents. - **Word Embeddings**: Use embeddings like Word2Vec or GloVe to capture semantic meaning. 5. **Clustering**: Apply clustering algorithms to group the reviews based on their sentiment scores and features. Common clustering techniques include: - **K-Means Clustering**: Partitions the data into K clusters based on feature similarity. - **Hierarchical Clustering**: Builds a tree of clusters based on distance metrics. - **DBSCAN**: Groups together points that are closely packed together, marking as outliers points that lie alone in low-density regions. 6. **Visualization**: Use visualization techniques such as t-SNE or PCA to reduce dimensionality and visualize the clusters for better interpretation. 7. **Analysis**: Analyze the clusters to understand the common themes or sentiments within each group. This can help in identifying customer satisfaction, dissatisfaction, and areas for improvement. By following these steps, customer reviews can be effectively grouped into clusters based on sentiment, providing valuable insights into customer opinions and experiences.",
        "Seed-word prompting in generating text with ChatGPT serves several important purposes: 1. **Guiding Context**: Seed words provide a starting point or context for the model, helping it understand the topic or theme that the user wants to explore. This can lead to more relevant and coherent responses. 2. **Focusing the Output**: By using specific seed words, users can direct the model to generate content that aligns with their interests or needs. This helps in narrowing down the scope of the generated text. 3. **Enhancing Creativity**: Seed words can inspire creative outputs by introducing specific concepts or ideas that the model can elaborate on. This can be particularly useful in creative writing, brainstorming, or generating unique content. 4. **Improving Relevance**: When seed words are used, the model is more likely to produce responses that are relevant to the user's query. This reduces the chances of generating off-topic or unrelated content. 5. **Facilitating Structured Responses**: Seed words can help in structuring the response, especially in cases where a specific format or style is desired (e.g., lists, narratives, or technical explanations). 6. **Encouraging Specificity**: By providing seed words, users can encourage the model to focus on particular aspects of a topic, leading to more detailed and informative responses. Overall, seed-word prompting enhances the interaction between the user and the model, making the generated text more aligned with the user's expectations and requirements.",
        "Using the Multiple Choice prompt technique with ChatGPT can help you generate limited text options effectively. Here’s how to implement this technique: 1. **Define the Context**: Start by clearly defining the context or topic you want to explore. This helps set the stage for the multiple-choice options. 2. **Create Clear Options**: Formulate a set of distinct and clear options that you want the model to choose from. Each option should be concise and relevant to the context. Aim for 3-5 options to keep it manageable. 3. **Use a Structured Prompt**: Structure your prompt to explicitly ask the model to choose from the provided options. You can phrase it like this: - Based on the following context, please choose the best option: [Context]. Options: A) [Option 1], B) [Option 2], C) [Option 3], D) [Option 4]. 4. **Encourage Elaboration**: If you want the model to provide reasoning or elaboration on the chosen option, you can add a follow-up request. For example: - Please choose the best option and explain why you chose it. 5. **Iterate if Necessary**: If the initial response doesn’t meet your expectations, you can refine your options or context and try again. This iterative process can help you hone in on the desired output. ### Example Here’s a practical example of how to use the Multiple Choice prompt technique: **Prompt**: Based on the following context, please choose the best option: 'What is the most effective way to improve customer satisfaction in a retail store?' Options: A) Implementing a loyalty program, B) Reducing prices, C) Enhancing staff training, D) Increasing store hours.### Expected Output The model might respond with something like: I choose option C) Enhancing staff training because well-trained staff can provide better service, address customer concerns more effectively, and create a positive shopping experience, which ultimately leads to higher customer satisfaction.By using this technique, you can effectively limit the text generation options and guide the model towards producing focused and relevant responses.",
        "Combining seed-word prompting with other techniques in ChatGPT text generation can enhance the quality, relevance, and creativity of the generated content. Here are several reasons why this combination is beneficial: 1. **Enhanced Contextualization**: Seed-word prompting provides a specific starting point, while other techniques (like multiple-choice prompts or structured queries) can further refine the context. This leads to more coherent and contextually appropriate responses. 2. **Increased Relevance**: By using seed words alongside techniques like specifying the desired format or style, users can guide the model to produce outputs that are more aligned with their needs. This reduces the likelihood of irrelevant or off-topic content. 3. **Improved Creativity**: Combining seed words with brainstorming techniques or open-ended prompts can stimulate more creative responses. The seed words can serve as inspiration, while the other techniques encourage the model to explore various angles or ideas. 4. **Focused Output**: Techniques such as multiple-choice prompts can help narrow down the options for the model, while seed words set the thematic direction. This combination allows users to obtain focused outputs without overwhelming the model with too many possibilities. 5. **Structured Responses**: Using seed words in conjunction with structured prompts (like lists or outlines) can help organize the generated content. This is particularly useful for tasks that require clarity and structure, such as reports or summaries. 6. **Iterative Refinement**: Combining techniques allows for iterative refinement of the output. For example, a user can start with seed words, generate a response, and then use follow-up prompts to clarify or expand on specific points, leading to a more polished final product. 7. **Diverse Perspectives**: By integrating seed-word prompting with techniques that encourage exploration of different viewpoints (like asking for pros and cons), users can obtain a more comprehensive understanding of a topic. 8. **User Engagement**: Combining techniques can make the interaction more engaging for users. It allows for a more dynamic conversation where users can guide the model in real-time, leading to a more satisfying experience. In summary, combining seed-word prompting with other techniques in ChatGPT text generation creates a more powerful and flexible approach, enabling users to harness the model's capabilities more effectively and achieve their desired outcomes.",
        "Role prompting is a technique where you assign a specific role or persona to ChatGPT to guide its output in a desired direction. When combined with other prompt engineering techniques, role prompting can enhance the quality and relevance of the generated text. Here’s how to effectively use role prompting alongside other techniques: ### Steps to Use Role Prompting with Other Techniques 1. **Define the Role**: Clearly specify the role you want ChatGPT to assume. This could be a professional (e.g., a doctor, teacher, or consultant), a character (e.g., a historical figure or fictional character), or a specific perspective (e.g., a skeptic or an enthusiast). 2. **Combine with Seed Words**: Use seed words to provide context for the role. For example: - As a financial advisor, please explain the benefits of investing in stocks. Seed words: 'diversification', 'long-term growth', 'risk management'. 3. **Incorporate Multiple-Choice Prompts**: After establishing the role, you can present multiple-choice options to guide the response further. For example: - As a travel expert, choose the best destination for a family vacation from the following options: A) Disneyland, B) National Park, C) Beach Resort. Explain your choice. 4. **Use Structured Prompts**: Ask the model to respond in a specific format that aligns with the role. For instance: - As a nutritionist, provide a meal plan for a week. Format: Day 1: Breakfast, Lunch, Dinner. 5. **Encourage Elaboration**: After the initial response, prompt the model to elaborate on its answer. For example: - As a historian, summarize the causes of World War I and then discuss the long-term impacts. 6. **Iterative Refinement**: Use follow-up questions to refine the output. For example: - As a marketing strategist, what are three key strategies for social media marketing? Can you elaborate on the first one? 7. **Set Constraints**: Specify any constraints or limitations to guide the output more effectively. For example: - As a budget travel expert, suggest three affordable travel destinations for under $500. ### Example of Role Prompting Combined with Other Techniques **Prompt**: As a career coach, please provide advice for someone looking to transition into a tech career. Seed words: 'skills', 'networking', 'resume'. Additionally, list three key steps to take in this transition. ### Expected Output The model might respond with: As a career coach, transitioning into a tech career involves several important steps. Here are three key steps to consider: 1. **Identify Transferable Skills**: Assess your current skills and see how they can apply to tech roles. Skills like problem-solving, communication, and project management are valuable in tech. 2. **Build a Network**: Connect with professionals in the tech industry through networking events, online forums, and social media platforms like LinkedIn. Networking can open doors to job opportunities and mentorship. 3. **Update Your Resume**: Tailor your resume to highlight relevant skills and experiences. Consider taking online courses or certifications to bolster your qualifications in specific tech areas.By using role prompting in conjunction with other prompt engineering techniques, you can effectively guide ChatGPT's output to be more relevant, structured, and aligned with your specific needs. This approach enhances the interaction and helps achieve more satisfactory results."
    ]
```
    
```
    # 创建数据字典
    ds_dict = {
        "question": questions,
        "contexts": contexts,
        "answer": chatbot_answers,
        "ground_truth": ground_truths
    }
```
    
    # 创建 Dataset 对象
    dataset = Dataset.from_dict(ds_dict)
    
```
    # 定义评估指标
    metrics = [
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall,
    ]
```
    
    # 初始化评估用的LLM模型
    evaluator_llm = ChatOpenAI(model="gpt-4o-mini")
    
```
    # 进行评估
    result = evaluate(
        metrics=metrics,
        dataset=dataset,
        llm=evaluator_llm,
        embeddings=OpenAIEmbeddings(),
    )
```
    
    # 打印评估结果
    print(result)
    
```
    # 将结果转换为pandas DataFrame以进行更详细的分析
    result_df = result.to_pandas()
    print(result_df)
```
    
    
    
    
```
    import os
    from ragas.metrics import (
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall,
    )
    from ragas import evaluate
    from langchain_openai import ChatOpenAI, OpenAIEmbeddings
    from datasets import Dataset
```
    
    
```
    # 假设df是你之前生成的testset的DataFrame
    questions = df["question"].tolist()
    contexts = df["contexts"].tolist()
    ground_truths = df["ground_truth"].tolist()
```
    
```
    # 假设这是chatbot的回答列表
    chatbot_answers = [
        "Customer reviews can be grouped into clusters based on sentiment using various techniques in natural language processing (NLP) and machine learning. Here’s a general approach to achieve this: 1. **Data Collection**: Gather customer reviews from various sources such as websites, social media, or surveys. 2. **Preprocessing**: Clean the text data by removing noise such as punctuation, special characters, and stop words. You may also want to convert all text to lowercase and perform stemming or lemmatization. 3. **Sentiment Analysis**: Use sentiment analysis techniques to classify the sentiment of each review. This can be done using: - **Lexicon-based methods**: Use predefined dictionaries of words associated with positive, negative, or neutral sentiments. - **Machine learning models**: Train models (e.g., logistic regression, support vector machines) on labeled datasets to classify sentiment. - **Deep learning models**: Use neural networks, such as LSTM or transformers (like BERT), for more nuanced sentiment analysis. 4. **Feature Extraction**: Convert the reviews into numerical representations. Common methods include: - **Bag of Words (BoW)**: Represents text as a frequency count of words. - **TF-IDF (Term Frequency-Inverse Document Frequency)**: Weighs the frequency of words by how common they are across all documents. - **Word Embeddings**: Use embeddings like Word2Vec or GloVe to capture semantic meaning. 5. **Clustering**: Apply clustering algorithms to group the reviews based on their sentiment scores and features. Common clustering techniques include: - **K-Means Clustering**: Partitions the data into K clusters based on feature similarity. - **Hierarchical Clustering**: Builds a tree of clusters based on distance metrics. - **DBSCAN**: Groups together points that are closely packed together, marking as outliers points that lie alone in low-density regions. 6. **Visualization**: Use visualization techniques such as t-SNE or PCA to reduce dimensionality and visualize the clusters for better interpretation. 7. **Analysis**: Analyze the clusters to understand the common themes or sentiments within each group. This can help in identifying customer satisfaction, dissatisfaction, and areas for improvement. By following these steps, customer reviews can be effectively grouped into clusters based on sentiment, providing valuable insights into customer opinions and experiences.",
        "Seed-word prompting in generating text with ChatGPT serves several important purposes: 1. **Guiding Context**: Seed words provide a starting point or context for the model, helping it understand the topic or theme that the user wants to explore. This can lead to more relevant and coherent responses. 2. **Focusing the Output**: By using specific seed words, users can direct the model to generate content that aligns with their interests or needs. This helps in narrowing down the scope of the generated text. 3. **Enhancing Creativity**: Seed words can inspire creative outputs by introducing specific concepts or ideas that the model can elaborate on. This can be particularly useful in creative writing, brainstorming, or generating unique content. 4. **Improving Relevance**: When seed words are used, the model is more likely to produce responses that are relevant to the user's query. This reduces the chances of generating off-topic or unrelated content. 5. **Facilitating Structured Responses**: Seed words can help in structuring the response, especially in cases where a specific format or style is desired (e.g., lists, narratives, or technical explanations). 6. **Encouraging Specificity**: By providing seed words, users can encourage the model to focus on particular aspects of a topic, leading to more detailed and informative responses. Overall, seed-word prompting enhances the interaction between the user and the model, making the generated text more aligned with the user's expectations and requirements.",
        "Using the Multiple Choice prompt technique with ChatGPT can help you generate limited text options effectively. Here’s how to implement this technique: 1. **Define the Context**: Start by clearly defining the context or topic you want to explore. This helps set the stage for the multiple-choice options. 2. **Create Clear Options**: Formulate a set of distinct and clear options that you want the model to choose from. Each option should be concise and relevant to the context. Aim for 3-5 options to keep it manageable. 3. **Use a Structured Prompt**: Structure your prompt to explicitly ask the model to choose from the provided options. You can phrase it like this: - Based on the following context, please choose the best option: [Context]. Options: A) [Option 1], B) [Option 2], C) [Option 3], D) [Option 4]. 4. **Encourage Elaboration**: If you want the model to provide reasoning or elaboration on the chosen option, you can add a follow-up request. For example: - Please choose the best option and explain why you chose it. 5. **Iterate if Necessary**: If the initial response doesn’t meet your expectations, you can refine your options or context and try again. This iterative process can help you hone in on the desired output. ### Example Here’s a practical example of how to use the Multiple Choice prompt technique: **Prompt**: Based on the following context, please choose the best option: 'What is the most effective way to improve customer satisfaction in a retail store?' Options: A) Implementing a loyalty program, B) Reducing prices, C) Enhancing staff training, D) Increasing store hours.### Expected Output The model might respond with something like: I choose option C) Enhancing staff training because well-trained staff can provide better service, address customer concerns more effectively, and create a positive shopping experience, which ultimately leads to higher customer satisfaction.By using this technique, you can effectively limit the text generation options and guide the model towards producing focused and relevant responses.",
        "Combining seed-word prompting with other techniques in ChatGPT text generation can enhance the quality, relevance, and creativity of the generated content. Here are several reasons why this combination is beneficial: 1. **Enhanced Contextualization**: Seed-word prompting provides a specific starting point, while other techniques (like multiple-choice prompts or structured queries) can further refine the context. This leads to more coherent and contextually appropriate responses. 2. **Increased Relevance**: By using seed words alongside techniques like specifying the desired format or style, users can guide the model to produce outputs that are more aligned with their needs. This reduces the likelihood of irrelevant or off-topic content. 3. **Improved Creativity**: Combining seed words with brainstorming techniques or open-ended prompts can stimulate more creative responses. The seed words can serve as inspiration, while the other techniques encourage the model to explore various angles or ideas. 4. **Focused Output**: Techniques such as multiple-choice prompts can help narrow down the options for the model, while seed words set the thematic direction. This combination allows users to obtain focused outputs without overwhelming the model with too many possibilities. 5. **Structured Responses**: Using seed words in conjunction with structured prompts (like lists or outlines) can help organize the generated content. This is particularly useful for tasks that require clarity and structure, such as reports or summaries. 6. **Iterative Refinement**: Combining techniques allows for iterative refinement of the output. For example, a user can start with seed words, generate a response, and then use follow-up prompts to clarify or expand on specific points, leading to a more polished final product. 7. **Diverse Perspectives**: By integrating seed-word prompting with techniques that encourage exploration of different viewpoints (like asking for pros and cons), users can obtain a more comprehensive understanding of a topic. 8. **User Engagement**: Combining techniques can make the interaction more engaging for users. It allows for a more dynamic conversation where users can guide the model in real-time, leading to a more satisfying experience. In summary, combining seed-word prompting with other techniques in ChatGPT text generation creates a more powerful and flexible approach, enabling users to harness the model's capabilities more effectively and achieve their desired outcomes.",
        "Role prompting is a technique where you assign a specific role or persona to ChatGPT to guide its output in a desired direction. When combined with other prompt engineering techniques, role prompting can enhance the quality and relevance of the generated text. Here’s how to effectively use role prompting alongside other techniques: ### Steps to Use Role Prompting with Other Techniques 1. **Define the Role**: Clearly specify the role you want ChatGPT to assume. This could be a professional (e.g., a doctor, teacher, or consultant), a character (e.g., a historical figure or fictional character), or a specific perspective (e.g., a skeptic or an enthusiast). 2. **Combine with Seed Words**: Use seed words to provide context for the role. For example: - As a financial advisor, please explain the benefits of investing in stocks. Seed words: 'diversification', 'long-term growth', 'risk management'. 3. **Incorporate Multiple-Choice Prompts**: After establishing the role, you can present multiple-choice options to guide the response further. For example: - As a travel expert, choose the best destination for a family vacation from the following options: A) Disneyland, B) National Park, C) Beach Resort. Explain your choice. 4. **Use Structured Prompts**: Ask the model to respond in a specific format that aligns with the role. For instance: - As a nutritionist, provide a meal plan for a week. Format: Day 1: Breakfast, Lunch, Dinner. 5. **Encourage Elaboration**: After the initial response, prompt the model to elaborate on its answer. For example: - As a historian, summarize the causes of World War I and then discuss the long-term impacts. 6. **Iterative Refinement**: Use follow-up questions to refine the output. For example: - As a marketing strategist, what are three key strategies for social media marketing? Can you elaborate on the first one? 7. **Set Constraints**: Specify any constraints or limitations to guide the output more effectively. For example: - As a budget travel expert, suggest three affordable travel destinations for under $500. ### Example of Role Prompting Combined with Other Techniques **Prompt**: As a career coach, please provide advice for someone looking to transition into a tech career. Seed words: 'skills', 'networking', 'resume'. Additionally, list three key steps to take in this transition. ### Expected Output The model might respond with: As a career coach, transitioning into a tech career involves several important steps. Here are three key steps to consider: 1. **Identify Transferable Skills**: Assess your current skills and see how they can apply to tech roles. Skills like problem-solving, communication, and project management are valuable in tech. 2. **Build a Network**: Connect with professionals in the tech industry through networking events, online forums, and social media platforms like LinkedIn. Networking can open doors to job opportunities and mentorship. 3. **Update Your Resume**: Tailor your resume to highlight relevant skills and experiences. Consider taking online courses or certifications to bolster your qualifications in specific tech areas.By using role prompting in conjunction with other prompt engineering techniques, you can effectively guide ChatGPT's output to be more relevant, structured, and aligned with your specific needs. This approach enhances the interaction and helps achieve more satisfactory results."
    ]
```
    
```
    # 创建数据字典并转换为Dataset对象
    dataset = Dataset.from_dict({
        "question": questions,
        "contexts": contexts,
        "answer": chatbot_answers,
        "ground_truth": ground_truths
    })
```
    
```
    # 定义评估指标
    metrics = [
        faithfulness,
        answer_relevancy,
        context_precision,
        context_recall,
    ]
```
    
    # 初始化评估用的LLM模型
    evaluator_llm = ChatOpenAI(model="gpt-4o")
    
```
    try:
        # 进行评估
        result = evaluate(
            metrics=metrics,
            dataset=dataset,
            llm=evaluator_llm,
            embeddings=OpenAIEmbeddings(),
        )
```
    
        # 打印评估结果
        print(result)
    
```
        # 将结果转换为pandas DataFrame以进行更详细的分析
        result_df = result.to_pandas()
        print(result_df)
```
    
    except Exception as e:
        print(f"评估过程中出现错误: {e}")
    
    
    from IPython.display import display, HTML
    
    
```
    # 定义一个函数来截断长文本
    def truncate_text(text, max_length=100):
        return text if len(text) <= max_length else text[:max_length] + "..."
```
    
```
    # 应用截断函数到特定列
    for col in ['question', 'contexts', 'answer', 'ground_truth']:
        result_df[col] = result_df[col].apply(lambda x: truncate_text(str(x), max_length=200))
```
    
```
    # 使用styler来改善显示
    styler = result_df.style.set_properties(**{'text-align': 'left'})
    styler = styler.set_table_styles([dict(selector='th', props=[('text-align', 'left')])])
```
    
    print("\nDetailed Results:")
    display(HTML(styler.to_html()))
    
```
    # 显示每一行的详细信息
    for index, row in result_df.iterrows():
        print(f"\nDetailed view of row {index + 1}:")
        for col in result_df.columns:
            print(f"{col}:\n{row[col]}\n")
```
    
    
    
