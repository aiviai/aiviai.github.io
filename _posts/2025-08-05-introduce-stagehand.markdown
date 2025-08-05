---
layout: single  
title: "🚀🚀颠覆性创新！Stagehand革命性AI浏览器自动化框架！支持TypeScript+Python+云端部署！比Browser-Use更快更精准！代码精准控制+自然语言决策效率提升10倍！保姆级教程！"  
sidebar:
  nav: "docs"
date: 2025-08-02 10:00:00 +0800  
categories: AIAgents
tags: [Stagehand, 浏览器自动化, Browser-Use, AI, Playwright, 自动化, browserbase]
classes: wide  

author_profile: true  
---

当传统浏览器自动化框架频频崩溃，基于AI驱动的Browser-Use又过于难以掌控时，一个名为Stagehand的项目悄然改变了游戏规则。
> 
🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1tDhPzXEp6/)
- [👉👉👉 通过YouTube观看](https://youtu.be/AOVrgnvYr60)
- [👉👉👉 Browser-Use](https://youtu.be/jsd8TpzicRQ)
- [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
- [👉👉👉 SuperClaude视频](https://youtu.be/bMO13RNjvBk)
- [👉👉👉 Claudia视频](https://youtu.be/WIwW7V56wxE)
- [👉👉👉 Task Master视频](https://youtu.be/6dhOUJ_vnIY)
- [👉👉👉 Zen MCP编程视频](https://youtu.be/2WgICfNzgZY)
- [👉👉👉 Augment编程视频](https://youtu.be/DbM3QZy5I6E)
- [👉👉👉 Serena MCP视频](https://youtu.be/DZ-gLebVnmg)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。
> 
🔥AI智能体相关视频
- [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
- [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
- [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
- [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  
- [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  


作为开发者，你一定遇到过这样的场景：

**传统自动化工具**像Selenium、Playwright虽然功能强大，但写起来就像在走钢丝——网页稍微改个样式，整个脚本就崩了。你得不断维护那些脆弱的选择器，简直是噩梦。

**纯**AI驱动的Browser-Use看上去很强大，"帮我完成点击这个博客总结博客第一篇文章这个任务"一句话搞定，但实际用起来就像盲盒——你永远不知道它会做出什么意外操作，生产环境根本不敢用。

这就是Stagehand要解决的核心问题：**如何在可控性和智能性之间找到完美平衡？**

## Stagehand：最聪明的妥协方案

Stagehand不是要替代Playwright，而是要增强它。它在Playwright的基础上，巧妙地融入了AI能力，让你可以：

- **需要精确控制时**：用传统代码
- **面对陌生页面时**：用自然语言

这种混合模式才是真正适合生产环境的方案。

## 三大核心能力，简单到爆

### 1. `act()` - 自然语言执行操作

```jsx
// 不用再找复杂的选择器了
await page.act("点击登录按钮");
await page.act("在搜索框输入'iPhone 15'");

```

### 2. `extract()` - 智能数据提取

```jsx
// 结构化提取数据，再复杂的页面也不怕
const result = await page.extract({
  instruction: "提取商品价格和库存信息",
  schema: z.object({
    price: z.number(),
    stock: z.string()
  })
});

```

### 3. `observe()` - 预览和缓存

这个功能绝了！你可以预览AI要执行的操作，确认无误后再运行，还能缓存重复操作节省成本。

## 独特优势：为什么选择Stagehand？

### 🎯 **生产级可靠性**

不像其他AI工具那样不可预测，Stagehand通过原子指令和缓存机制，让AI变得可控可靠。

### 🚀 **学习成本极低**

基于Playwright构建，熟悉的API + 三个新方法，上手零门槛。

### 💪 **适应性超强**

网页改版？没问题！Stagehand的AI能力让脚本自动适应UI变化，大大减少维护工作。

### 🔧 **灵活可控**

想要精确控制就用代码，需要智能处理就用自然语言，完全由你决定。

### 💰 **成本友好**

智能缓存机制避免重复的API调用，为你节省真金白银。

## 实战场景：它能为你做什么？

**表单自动填写 + 数据丰富**

```jsx
// 传统方法需要写一堆脆弱的选择器
// Stagehand只需要几行代码
await page.act("填写公司信息表单");
const enrichedData = await page.extract({
  instruction: "提取联系人和公司详情",
  schema: companySchema
});

```

**电商价格监控**

```jsx
// 自动适应不同网站的布局变化
await page.goto("某电商网站");
await page.act("搜索目标商品");
const priceInfo = await page.extract({
  instruction: "获取价格、折扣和库存状态",
  schema: priceSchema
});

```

**自动化测试**
结合传统Playwright的精确控制和AI的智能判断，让测试脚本更加健壮。

## 开源生态：值得信赖的选择

Stagehand采用开源模式，拥有活跃的开发者社区。这意味着：

- ✅ 完全透明，你知道每一步是怎么执行的
- ✅ 持续改进，社区贡献让它越来越强大
- ✅ 文档齐全，上手无忧
- ✅ 专业支持，遇到问题有人帮

## 快速开始：一行命令搞定

```bash
npx create-browser-app --example quickstart

```

就这么简单！Stagehand已经为你准备好了一切。

在这个AI工具层出不穷的时代，真正能解决实际问题的产品并不多。Stagehand成功弥合了传统自动化工具和AI代理之间的鸿沟，为开发者提供了一个既智能又可控的解决方案。

如果你正在为浏览器自动化的维护成本头疼，或者想要构建更智能的Web工作流，Stagehand绝对值得一试。它不是万能药，但确实代表了浏览器自动化的一个重要进步。

---

*想了解更多技术干货？关注我的博客和频道，不错过每一个改变开发体验的好工具！*

项目仓库:[https://github.com/browserbase/stagehand](https://github.com/browserbase/stagehand)

browserbase api获取:[https://www.browserbase.com/](https://www.browserbase.com/)

### 🚀安装笔记

```markdown
# 使用 uv（推荐）
uv venv .venv
source .venv/bin/activate  # Linux/Mac
uv pip install stagehand python-dotenv

# 或使用 pip
pip install stagehand python-dotenv

# 完整安装playwright
python -m playwright install

# 指定安装特定浏览器
python -m playwright install chromium

```

### 🚀基于本地浏览器

```python
import asyncio
import os
from dotenv import load_dotenv
from stagehand import StagehandConfig, Stagehand

# 加载.env文件中的环境变量到系统环境中
load_dotenv()

async def main():
    # 检查API密钥是否设置
    api_key = os.getenv("OPENAI_API_KEY")

    config = StagehandConfig(
        env="LOCAL",  # 本地运行
        # AI模型配置 - 使用环境变量
        model_name="gpt-4o-mini",  # 使用更便宜的模型
        model_api_key=api_key,  # 从环境变量读取

        # 本地运行配置
        headless=False,  # 显示浏览器窗口
        verbose=3,  # 详细日志
        debug_dom=True,  # DOM调试
    )

    # 使用配置创建Stagehand实例
    stagehand = Stagehand(config)

    # 初始化Stagehand（启动浏览器会话）
    await stagehand.init()

    # 获取页面对象，用于后续的页面操作
    page = stagehand.page

    await page.goto("https://www.aivi.fyi/")

    # # 使用observe()获取所有博客文章链接
    # blog_links = await page.observe("找到页面上所有可点击的博客文章或文章链接")
    # print(f"✅ 博客文章或文章链接: {blog_links}")

    #
    # await page.act(blog_links[0])  # 直接传递ObserveResult对象
    #
    # data_post_1 = await page.extract("提取博客的标题并总结博客内容")
    #
    # print(f"✅ 第一篇博客: {data_post_1}")
    #
    #
    # await page.go_back() # 使用浏览器后退
    #
    #
    # await page.act(blog_links[1])  # 直接传递ObserveResult对象
    #
    # data_post_2 = await page.extract("提取博客的标题并总结博客内容")
    #
    # print(f"✅ 第二篇博客: {data_post_2}")

    # 使用observe()获取所有博客文章链接
    blog_links = await page.observe("找到页面上所有可点击的博客文章或文章链接")
    print(f"✅ 发现 {len(blog_links)} 篇博客文章")

    # 使用 for 循环处理所有博客链接
    for i, blog_link in enumerate(blog_links):
        print(f"\n🚀 正在处理第 {i + 1} 篇博客...")

        await page.act(blog_link)

        blog_data = await page.extract("提取博客的标题并总结博客内容")

        print(f"✅ 第 {i + 1} 篇博客: {blog_data}")

        # 如果不是最后一篇，返回主页
        if i < len(blog_links) - 1:
            await page.go_back()

if __name__ == "__main__":
    asyncio.run(main())
```

### 🚀基于云端浏览器执行

```python
# 导入必要的库
import asyncio  # 异步编程库，用于处理异步任务
import os  # 操作系统接口，用于访问环境变量
from stagehand import Stagehand, StagehandConfig  # 导入Stagehand核心类
from dotenv import load_dotenv  # 用于加载.env文件中的环境变量

# 加载.env文件中的环境变量到系统环境中
load_dotenv()

async def main():
    """主函数：执行Stagehand自动化任务"""

    # 创建Stagehand配置对象
    config = StagehandConfig(
        env="BROWSERBASE",  # 使用Browserbase云端浏览器环境（而非本地）
        api_key=os.getenv("BROWSERBASE_API_KEY"),  # Browserbase API密钥
        project_id=os.getenv("BROWSERBASE_PROJECT_ID"),  # Browserbase项目ID
        model_name="gpt-4o-mini",  # 使用的AI模型名称
        model_api_key=os.getenv("OPENAI_API_KEY")  # AI模型的API密钥（如OpenAI）
    )

    # 使用配置创建Stagehand实例
    stagehand = Stagehand(config)

    try:
        # 初始化Stagehand（启动浏览器会话）
        await stagehand.init()

        # 获取页面对象，用于后续的页面操作
        page = stagehand.page

        await page.goto("https://www.aivi.fyi/")

        # 使用observe()获取所有博客文章链接
        blog_links = await page.observe("找到页面上所有可点击的博客文章或文章链接")
        print(f"✅ 博客文章或文章链接: {blog_links}")

        await page.act(blog_links[0])  # 直接传递ObserveResult对象

        data_post_1 = await page.extract("提取博客的标题并总结博客内容")

        print(f"✅ 第一篇博客: {data_post_1}")

    finally:
        # 无论执行成功还是失败，都要关闭浏览器会话释放资源
        await stagehand.close()

# 程序入口点：当脚本直接运行时执行main函数
if __name__ == "__main__":
    # 运行异步主函数
    asyncio.run(main())
```

