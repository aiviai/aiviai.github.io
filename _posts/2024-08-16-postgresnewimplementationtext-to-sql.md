---
layout: single
title: "Postgres.new实现text to SQL"
sidebar:
  nav: "docs"
date: 2024-08-16 00:00:00 +0800
categories: [Fine-Tuning, LLM]
tags: [AI, API, GitHub, NPM, OpenAI, PostgreSQL, SQL, Text-to-SQL]
classes: wide
author_profile: true
---



#  Postgres.new实现text to SQL 

> postgres.new项目利用AI助手来解析用户输入的文本，并将其转换为相应的SQL操作，从而简化了数据操作和可视化过程。这种方式提高了数据处理的效率，使用户能够更直观地与数据库进行交互，而无需深入了解SQL语法 。 

###  GitHub验证申请： 

[ https://github.com/settings/apps/new ](<https://github.com/settings/apps/new>)

###  执行步骤 
    
    
    git clone https://github.com/supabase-community/postgres-new.git
    

###  根目录.env文件设置 
    
    
```
    SUPABASE_AUTH_GITHUB_CLIENT_ID=Iv23linqH7
    SUPABASE_AUTH_GITHUB_SECRET=2b41e6ae04d0445a
    SUPABASE_AUTH_GITHUB_REDIRECT_URI=http://localhost:54321/auth/v1/callback
```

###  前端配置 
    
    
    cd ./postgres-new/apps/postgres-new
    
    npm i
    
    npx supabase start
    
```
    npx supabase status -o env \
      --override-name api.url=NEXT_PUBLIC_SUPABASE_URL \
      --override-name auth.anon_key=NEXT_PUBLIC_SUPABASE_ANON_KEY |
        grep NEXT_PUBLIC >> .env.local
```
    
    echo 'OPENAI_API_KEY="<openai-api-key>"' >> .env.local
    
    npm run dev
    
    

##  **👉👉👉如有问题请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  数据库配置 
    
    
    cd ./postgres-new/apps/db-service
    
    npm run generate:certs
    
    sudo npm install pg-gateway@^0.2.5-alpha.2
    
    npm run dev
    
    
    psql "host=localhost port=5432 user=postgres"
    
    psql "host=localhost port=5432 user=postgres password=postgres"
    

###  prompt 
    
    
    用合适的图表显示商品库存
    
    阳光果园的橙子的订单日期是什么时候
    
    创建一个视图来连接这两个表
    
    显示视图
    
    将库存信息和订单详情整合在一起，为数据分析和业务决策提供一个综合的视角。
    
    供应商性能视图：设计一个评估供应商表现的视图，包括他们提供的产品的销售情况和盈利能力。并显示这个视图
    
    时间序列视图：构建一个展示每日销售趋势的视图，包括订单数、日销售额和7日移动平均。
    
    创建一个客户表格，字段包括id、客户名称、联系电话、电子邮件、注册日期
    
    
    
    
    请更新库存表(inventory)中的这些记录：
    
```
    更新苹果的记录：2024年3月1日新进货300千克，新进价5.5元，新售价9元。总销量增加到50千克，总库存为750千克。
    更新牛奶的记录：2024年3月1日新进货500盒，新进价3.8元，新售价5.5元。总销量增加到100盒，总库存为1400盒。
    更新面包的记录：2024年3月2日新进货150个，新进价2.2元，新售价4元。总销量增加到80个，总库存为270个。
    更新鸡蛋的记录：2024年3月2日新进货80盒，新进价11元，新售价16.5元。总销量增加到30盒，总库存为150盒。
    更新可乐的记录：2024年3月3日新进货200瓶，新进价2.8元，新售价4.5元。总销量增加到80瓶，总库存为420瓶。
```
    
    然后，向订单详情表(order_details)添加这些新记录：
    
```
    订单ORD101，2024年3月10日，购买20千克苹果和30盒牛奶。
    订单ORD102，2024年3月11日，购买15个面包和5盒鸡蛋。
    订单ORD103，2024年3月12日，购买25瓶可乐。
```
