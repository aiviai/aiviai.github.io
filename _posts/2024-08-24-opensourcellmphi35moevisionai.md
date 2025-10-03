---
layout: single
title: "微软最新开源大模型phi3.5全面解析：从MoE到vision，一站式掌握未来AI技术，轻松构建智能应用"
sidebar:
  nav: "docs"
date: 2024-08-24 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG, Vision]
tags: [AI, AI-Agents, AutoGen, Chainlit, HuggingFace, LLM, Ollama, Phi-3, RAG, Vision]
classes: wide
author_profile: true
---


#  微软最新开源大模型phi3.5全面解析：从MoE到vision，一站式掌握未来AI技术，轻松构建智能应用 

[ NVIDIA NIM | phi-3_5-moe  Experience the leading models to build enterprise generative AI apps now.  ![Image](https://build.nvidia.com/favicon.ico) https://build.nvidia.com/microsoft/phi-3_5-moe  ![Image](https://build.nvidia.com/opengraph-image.jpg?6ec102a0470b935b) ](<https://build.nvidia.com/microsoft/phi-3_5-moe>) [ microsoft/Phi-3.5-MoE-instruct · Hugging Face  We’re on a journey to advance and democratize artificial intelligence through open source and open science.  ![Image](https://huggingface.co/favicon.ico) https://huggingface.co/microsoft/Phi-3.5-MoE-instruct  ![Image](https://cdn-thumbnails.huggingface.co/social-thumbnails/models/microsoft/Phi-3.5-MoE-instruct.png) ](<https://huggingface.co/microsoft/Phi-3.5-MoE-instruct>)

[ Google Colab  ![Image](https://ssl.gstatic.com/colaboratory-static/common/6b90f1bc8641dbd2aa9dc6b83ace17ac/img/favicon.ico) https://colab.research.google.com/drive/1lebG8uDq0xFuQQCZJx4v_BUxqe9Pm2HU?usp=sharing  ![Image](https://colab.research.google.com/img/colab_favicon_256px.png) ](<https://colab.research.google.com/drive/1lebG8uDq0xFuQQCZJx4v_BUxqe9Pm2HU?usp=sharing>)

###  算法测试 

[ Longest Palindromic Substring - LeetCode  Can you solve this real interview question? Longest Palindromic Substring - Given a string s, return the longest palindromic substring in s. Example 1: Input: s = "babad" Output: "bab" Explanation: "aba" is also a valid answer. Example 2: Input: s = "cbbd" Output: "bb" Constraints: * 1 <= s.length <= 1000 * s consist of only digits and English letters.  ![Image](https://leetcode.com/favicon.ico) https://leetcode.com/problems/longest-palindromic-substring/  ![Image](https://leetcode.com/static/images/LeetCode_Sharing.png) ](<https://leetcode.com/problems/longest-palindromic-substring/>) [ Merge k Sorted Lists - LeetCode  Can you solve this real interview question? Merge k Sorted Lists - You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it. Example 1: Input: lists = [[1,4,5],[1,3,4],[2,6]] Output: [1,1,2,3,4,4,5,6] Explanation: The linked-lists are: [ 1->4->5, 1->3->4, 2->6 ] merging them into one sorted list: 1->1->2->3->4->4->5->6 Example 2: Input: lists = [] Output: [] Example 3: Input: lists = [[]] Output: [] Constraints: * k == lists.length * 0 <= k <= 104 * 0 <= lists[i].length <= 500 * -104 <= lists[i][j] <= 104 * lists[i] is sorted in ascending order. * The sum of lists[i].length will not exceed 104.  ![Image](https://leetcode.com/favicon.ico) https://leetcode.com/problems/merge-k-sorted-lists/  ![Image](https://leetcode.com/static/images/LeetCode_Sharing.png) ](<https://leetcode.com/problems/merge-k-sorted-lists/>) [ Substring with Concatenation of All Words - LeetCode  Can you solve this real interview question? Substring with Concatenation of All Words - You are given a string s and an array of strings words. All the strings of words are of the same length. A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated. * For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words. Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order. Example 1: Input: s = "barfoothefoobarman", words = ["foo","bar"] Output: [0,9] Explanation: The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words. The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words. Example 2: Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"] Output: [] Explanation: There is no concatenated substring. Example 3: Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"] Output: [6,9,12] Explanation: The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"]. The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"]. The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"]. Constraints: * 1 <= s.length <= 104 * 1 <= words.length <= 5000 * 1 <= words[i].length <= 30 * s and words[i] consist of lowercase English letters.  ![Image](https://leetcode.com/favicon.ico) https://leetcode.com/problems/substring-with-concatenation-of-all-words/  ![Image](https://leetcode.com/static/images/LeetCode_Sharing.png) ](<https://leetcode.com/problems/substring-with-concatenation-of-all-words/>)

###  NIM代码 
    
    
    export NVIDIA_API_KEY=nvapi-9kPgR5Yz28
    
    
    from openai import OpenAI
    import os
    
```
    client = OpenAI(
      base_url = "https://integrate.api.nvidia.com/v1",
      api_key = os.getenv("NVIDIA_API_KEY")
    )
```
    
```
    completion = client.chat.completions.create(
      model="microsoft/phi-3.5-moe-instruct",
      messages=[{"role":"user","content":"What is the latest version of Python?"}],
      temperature=0.2,
      top_p=0.7,
      max_tokens=1024,
      stream=True
    )
```
    
```
    for chunk in completion:
      if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```
    

##  **👉👉👉如有问题/项目合作请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  MoE UI 
    
    
```
    import os
    from openai import OpenAI as AsyncOpenAI
    import chainlit as cl
```
    
```
    api_key = os.environ.get("NVIDIA_API_KEY")
    client = AsyncOpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=api_key)
    cl.instrument_openai()
```
    
```
    settings = {
        "model": "microsoft/phi-3.5-moe-instruct",
        "temperature": 0.5,
        "top_p": 0.7,
        "max_tokens": 1024,
    }
```
    
```
    @cl.on_chat_start
    def start_chat():
        cl.user_session.set(
            "message_history",
            [{"role": "system", "content": "You are a helpful assistant."}],
        )
```
    
```
    async def async_generator(sync_gen):
        for item in sync_gen:
            yield item
```
    
```
    @cl.on_message
    async def run_conversation(message: cl.Message):
        message_history = cl.user_session.get("message_history")
        message_history.append({"role": "user", "content": message.content})
```
    
        msg = cl.Message(content="")
        await msg.send()
    
```
        stream = client.chat.completions.create(
            messages=message_history, stream=True, **settings
        )
```
    
```
        async for part in async_generator(stream):
            if token := part.choices[0].delta.content or "":
                await msg.stream_token(token)
```
    
        message_history.append({"role": "assistant", "content": msg.content})
        await msg.update()
    

###  vision 
    
    
```
    import requests
    import base64
    import json
```
    
    invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
    stream = False  # Changed to False to get a single JSON response
    
    with open("./dog.jpeg", "rb") as f:
        image_b64 = base64.b64encode(f.read()).decode()
    
    assert len(image_b64) < 180_000, \
        "To upload larger images, use the assets API (see docs)"
    
```
    headers = {
        "Authorization": "Bearer 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",
        "Accept": "application/json"  # Changed to accept JSON
    }
```
    
```
    payload = {
        "model": 'microsoft/phi-3.5-vision-instruct',
        "messages": [
            {
                "role": "user",
                "content": f'Describe the image. <img src="data:image/jpeg;base64,{image_b64}" />'
            }
        ],
        "max_tokens": 512,
        "temperature": 0.20,
        "top_p": 0.70,
        "stream": stream
    }
```
    
    response = requests.post(invoke_url, headers=headers, json=payload)
    
```
    # Parse the JSON response and print only the content
    if response.status_code == 200:
        response_json = response.json()
        description = response_json['choices'][0]['message']['content']
        print(description)
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
```

###  vision-UI 
    
    
```
    import chainlit as cl
    import requests
    import base64
    import os
```
    
    
```
    # Function to get image description from NVIDIA API
    async def get_image_description(image_path, api_key):
        invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
```
    
        with open(image_path, "rb") as f:
            image_b64 = base64.b64encode(f.read()).decode()
    
        assert len(image_b64) < 180_000, \
            "To upload larger images, use the assets API (see docs)"
    
```
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Accept": "application/json"
        }
```
    
```
        payload = {
            "model": 'microsoft/phi-3.5-vision-instruct',
            "messages": [
                {
                    "role": "user",
                    "content": f'Describe the image. <img src="data:image/jpeg;base64,{image_b64}" />'
                }
            ],
            "max_tokens": 512,
            "temperature": 0.20,
            "top_p": 0.70,
            "stream": False
        }
```
    
        response = requests.post(invoke_url, headers=headers, json=payload)
    
```
        if response.status_code == 200:
            response_json = response.json()
            description = response_json['choices'][0]['message']['content']
            return description
        else:
            return f"Error: {response.status_code}\n{response.text}"
```
    
    
```
    @cl.on_chat_start
    async def start():
        await cl.Message(content="Welcome! Please upload an image to get a description.").send()
```
    
    
```
    @cl.on_message
    async def on_message(msg: cl.Message):
        if not msg.elements:
            await cl.Message(content="No file attached. Please upload an image.").send()
            return
```
    
        # Processing images exclusively
        images = [file for file in msg.elements if "image" in file.mime]
    
```
        if not images:
            await cl.Message(content="Please upload an image file.").send()
            return
```
    
```
        # Get the API key from environment variable
        api_key = os.getenv('NVIDIA_API_KEY')
        if not api_key:
            await cl.Message(content="Error: NVIDIA API key not found in environment variables.").send()
            return
```
    
        # Process the first image
        image_path = images[0].path
    
        # Get image description
        description = await get_image_description(image_path, api_key)
    
        # Send the description back to the user
        await cl.Message(content=f"Image Description: {description}").send()
    
```
        # Optional: display the processed image
        with open(image_path, "rb") as f:
            image_content = f.read()
```
    
```
        elements = [
            cl.Image(name="processed_image", content=image_content, mime=images[0].mime)
        ]
        await cl.Message(content="Processed Image:", elements=elements).send()
```
    
        await cl.Message(content=f"Processed {len(images)} image(s)").send()
    
    
    if __name__ == "__main__":
        cl.run()

###  autogen studio 
    
    
    autogenstudio ui --port 8081
    

###  skills代码 
    
    
    #Name duck_duck_go
    #Description Search the web using DuckDuckGo.
    
    
    from duckduckgo_search import DDGS
    
```
    def search_duckduckgo(query, region='wt-wt', safesearch='off', max_results=5):
        """Search DuckDuckGo for the given query and return the results."""
        ddg = DDGS()
        results = ddg.text(keywords=query, region=region, safesearch=safesearch, max_results=max_results)
```
        
```
        for result in results:
            print(f"Title: {result['title']}")
            print(f"URL: {result['href']}")
            print(f"Snippet: {result['body']}\n")
```
        
        return results
    
```
    # Test the function
    if __name__ == "__main__":
        query = "Web scraping with Python"
        search_duckduckgo(query)
```
    
```
    # Example usage for autogen agent
    # Create a new Python script (e.g., execute_search.py) and import the function:
    # from skills import search_duckduckgo  
    # query = "autogenstudio"  
    # search_duckduckgo(query)
```

###  autogen prompt 
    
    
    You are a versatile AI assistant specialized in using the DuckDuckGo search API to gather information, refine search results, and transform them into engaging news articles. Your tasks include performing searches, analyzing results, and crafting informative news pieces based on the gathered information.
    When given a task or query:
    
```
    Use the search_duckduckgo function to gather initial information. Suggest Python code to execute this function, providing the necessary parameters (query, region, safesearch, max_results).
    After receiving the search results, analyze the titles, URLs, and snippets. If the information is insufficient or unclear, perform additional searches with refined queries.
    Synthesize and enhance the search results:
```
    
```
    Summarize key points from the search results
    Organize and explain the relevance of the sources
    Identify information gaps and suggest ways to fill them
```
    
    
    Transform the synthesized information into a well-structured news article:
    
```
    Create an attention-grabbing headline
    Write a concise lead paragraph summarizing key information (who, what, when, where, why, and how)
    Develop the story with supporting details, quotes, and context
    Include relevant background information
```
    
    
    Ensure journalistic standards are met:
    
```
    Maintain objectivity and balance
    Distinguish between facts and opinions
    Use proper attribution for quotes and claims
    Cross-reference information from multiple sources when available
```
    
    
    Enhance readability and engagement:
    
```
    Use clear, concise language for a general audience
    Break up long paragraphs and use subheadings where appropriate
    Include relevant statistics or data points
    Add a brief "Key Takeaways" section for complex topics
```
    
    
    If additional code execution is needed (e.g., to perform follow-up searches or process results), suggest the appropriate Python code in a code block, using the search_duckduckgo function.
    Present your final news article in a clear, structured format using Markdown.
    
```
    Always use Python code blocks for any code that needs to be executed. Include comments in your code to explain what each part does. If you need to save any code or results to a file, include # filename: <filename> as the first line in the code block.
    Do not suggest incomplete code or ask the user to modify the code. The user can only execute the code you provide without modifications.
    If there are any errors in the code execution, analyze the error message, fix the issue, and provide the corrected full code block.
    Continue this process of searching, analyzing, refining, and writing until you have produced a comprehensive and engaging news article based on the original query or task. Verify your final article carefully and include verifiable evidence where possible.
    Suggest a filename for the article using the format: "YYYYMMDD_headline_keywords.md"
    Reply 'ARTICLE_COMPLETE' when you have finished writing and editing the news article based on the search results.
```

###  ollama 
    
    
    ollama run phi3.5:latest
