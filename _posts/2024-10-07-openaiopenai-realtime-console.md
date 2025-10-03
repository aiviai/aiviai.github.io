---
layout: single
title: "openai/openai-realtime-console"
sidebar:
  nav: "docs"
date: 2024-10-07 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, API, Console, GitHub, NPM, OpenAI, Real-Time]
classes: wide
author_profile: true
---



#  openai/openai-realtime-console 
    
    
    git clone https://github.com/openai/openai-realtime-console.git
    
    npm install
    
    #http://localhost:3000/
    
    
    git clone https://github.com/openai/openai-realtime-api-beta.git
    
    npm i openai/openai-realtime-api-beta --save
    
    
    
    
    #uninstall
    
    rm -rf openai-realtime-console
    
    npm uninstall -g openai-realtime-console
    
    npm cache clean --force
    

###  API Key 

[ https://platform.openai.com/api-keys ](<https://platform.openai.com/api-keys>)

###  虚拟信用卡注册地址 

[ https://bewildcard.com/i/VLM ](<https://bewildcard.com/i/VLM>)

###  虚拟信用卡邀请码 VLM 

###  test 
    
    
    Write Python code to get the latest news.
    
    How should I read a book?
    
    I enjoy reading social science books.
    
    economics books
    
    Skin in the game
    
    What do you think of this book?
    
    What are the thought-provoking insights in this book?
    
    Search for the latest AI news.

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  server.js 
    
    
```
    import express from 'express';
    import cors from 'cors';
    import axios from 'axios';
    import dotenv from 'dotenv';
```
    
    dotenv.config();
    
    const app = express();
    const port = process.env.PORT || 3001;
    
```
    // 正确的CORS配置
    app.use(cors({
      origin: 'http://localhost:3000', // 替换为你的React应用的URL
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
```
    
    app.use(express.json());
    
```
    app.get('/api/news', async (req, res) => {
      try {
        const { q } = req.query;
        const apiKey = process.env.SERPAPI_API_KEY;
```
    
```
        if (!apiKey) {
          throw new Error('SERPAPI API key is not set');
        }
```
    
```
        const response = await axios.get('https://serpapi.com/search', {
          params: {
            engine: 'google_news',
            q,
            gl: 'us',
            hl: 'en',
            api_key: apiKey
          }
        });
```
    
```
        const newsResults = response.data.news_results;
        res.json(newsResults);
      } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ error: 'Failed to fetch news', details: error.message });
      }
    });
```
    
```
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
```

###  Tools 
    
    
```
        //新增
        async function performGoogleSearch(query: string): Promise<Array<{title: string, url: string}>> {
          console.log('Starting Google search for:', query);
          try {
            const response = await fetch(`http://localhost:3001/api/news?q=${encodeURIComponent(query)}`);
```
        
```
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
```
        
            const results = await response.json();
            console.log('Search results:', results);
        
```
            return results.map((item: any) => ({
              title: item.title,
              url: item.link
            }));
          } catch (error) {
            console.error('Error in performGoogleSearch:', error);
            return [{
              title: 'Error',
              url: ''
            }];
          }
        }
```
        
    
    
```
    //1
    {conversationItem.type === 'function_call_output' && 
    conversationItem.formatted.tool?.name === 'google_search' && (
      <div>
        <h4>Google Search Results:</h4>
        {(() => {
          let results;
          try {
            results = typeof conversationItem.formatted.output === 'string'
              ? JSON.parse(conversationItem.formatted.output)
              : conversationItem.formatted.output;
```
            
```
            if ('error' in results) {
              return <p>Error: {results.error} {results.details && `(${results.details})`}</p>;
            }
```
    
```
            if (!Array.isArray(results)) {
              console.error('Unexpected search results format:', results);
              return <p>Unexpected search results format.</p>;
            }
```
            
```
            return results.map((result, index) => (
              <div key={index}>
                <h5>{result.title}</h5>
                <p>{result.description}</p>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.url}
                </a>
              </div>
            ));
          } catch (error) {
            console.error('Error parsing search results:', error);
            return <p>Error displaying search results.</p>;
          }
        })()}
```
    
