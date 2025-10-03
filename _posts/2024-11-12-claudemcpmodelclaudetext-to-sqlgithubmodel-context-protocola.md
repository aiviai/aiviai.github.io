---
layout: single
title: "Claude颠覆性创新！MCP模型上下文协议！轻松为Claude加入搜索引擎、网页抓取、Text to SQL、文件管理、GitHub操作等功能！Model Context Protocol为AI开挂"
sidebar:
  nav: "docs"
date: 2024-11-12 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG]
tags: [AI, Claude, RAG]
classes: wide
author_profile: true
---


#  **Claude颠覆性创新！MCP模型上下文协议！轻松为Claude加入搜索引擎、网页抓取、Text to SQL、文件管理、GitHub操作等功能！Model Context Protocol为AI开挂**

###  下载 

[ https://claude.ai/download ](<https://claude.ai/download>)

###  安装sqlite3 
    
    
    # macOS命令 使用 Homebrew 安装所需工具
    brew install uv git sqlite3
    
    
```
    #Windows命令
    winget install --id=astral-sh.uv -e
    winget install git.git sqlite.sqlite
```
    
    

###  创建数据库 
    
    
```
    # 创建一个新的 SQLite 数据库在用户主目录下
    # 创建一个新的SQLite数据库
    sqlite3 ~/test.db <<EOF
    CREATE TABLE 进销存 (
    商品编号 INTEGER PRIMARY KEY,
    商品名称 TEXT,
    库存数量 INTEGER,
    售价 REAL,
    进货价 REAL,
    供应商 TEXT
    );
```
    
    
    
```
    INSERT INTO 进销存 (商品名称, 库存数量, 售价, 进货价, 供应商) VALUES
    ('智能手表', 50, 199.99, 150.00, '科技供应商A'),
    ('无线耳机', 100, 89.99, 60.00, '电子供应商B'),
    ('蓝牙音箱', 75, 79.99, 50.00, '音响供应商C'),
    ('笔记本电脑包', 200, 34.99, 20.00, '箱包供应商D'),
    ('桌面LED台灯', 120, 45.99, 30.00, '家居供应商E'),
    ('键盘', 150, 129.99, 80.00, '科技供应商A'),
    ('鼠标垫', 300, 12.99, 5.00, '电子供应商B'),
    ('USB集线器', 180, 49.99, 25.00, '科技供应商A'),
    ('摄像头', 80, 69.99, 45.00, '电子供应商B'),
    ('屏幕保护膜', 500, 9.99, 3.00, '配件供应商F'),
    ('旅行转换器', 90, 27.99, 15.00, '配件供应商F'),
    ('游戏耳机', 60, 159.99, 120.00, '音响供应商C'),
    ('健身追踪器', 40, 119.99, 90.00, '科技供应商A'),
    ('便携式充电器', 110, 24.99, 15.00, '电子供应商B'),
    ('迷你无人机', 25, 299.99, 200.00, '科技供应商A'),
    ('便携式固态硬盘', 70, 179.99, 140.00, '存储供应商G'),
    ('手机支架', 250, 15.99, 8.00, '配件供应商F'),
    ('高性能鼠标', 130, 89.99, 60.00, '科技供应商A'),
    ('儿童学习平板', 40, 159.99, 100.00, '电子供应商B'),
    ('智能家居开关', 95, 49.99, 30.00, '家居供应商E');
    EOF
```
    
    
    
    uvx mcp-server-sqlite

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **

###  配置 Claude Desktop 
    
    
    nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
    
    
```
    {
      "mcpServers": {
        "sqlite": {
          "command": "uvx",
          "args": ["mcp-server-sqlite", "--db-path", "/Users/charlesqin/test.db"]
        }
      }
    }
```

###  输入配置文件内容 
    
    
```
    {
      "mcpServers": {
        "sqlite": {
          "command": "uvx",
          "args": ["mcp-server-sqlite", "--db-path", "/Users/charlesqin/test.db"]
        }
      }
    }
```

###  prompts 
    
    
    What's the average price of all products in the database?
    
    Can you analyze the price distribution and suggest any pricing optimizations?
    
    Could you help me design and create a new table for storing customer orders?
    

###  **openweathermap** api key 

[ https://home.openweathermap.org/api_keys ](<https://home.openweathermap.org/api_keys>)

###  步骤 
    
    
    brew install uv
    
    
    mkdir weather_service
    cd weather_service
    
    # 使用 uv init 初始化，添加 --no-workspace 参数
    uv init --no-workspace
    
```
    # 然后再运行 create-mcp-server
    uvx create-mcp-server \
      --name weather_service \
      --version "0.1.0" \
      --description "A MCP server project for weather service"
```
    
    
    nano ~/Library/Application\ Support/Claude/claude_desktop_config.json

###  配置文件 
    
    
```
    {
      "mcpServers": {
        "fetch": {
          "command": "uvx",
          "args": ["mcp-server-fetch"]
        },
        "filesystem": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/charlesqin/test.db"]
        },
        "sqlite": {
          "command": "uvx",
          "args": ["mcp-server-sqlite", "--db-path", "/Users/charlesqin/test.db"]
        },
        "git": {
          "command": "uvx",
          "args": ["mcp-server-git", "--repository", "/Users/charlesqin/claude-test"]
        },
        "github": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-github"],
          "env": {
            "GITHUB_PERSONAL_ACCESS_TOKEN": ""
          }
        },
        "postgres": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
        },
        "brave-search": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-brave-search"],
          "env": {
            "BRAVE_API_KEY": ""
          }
        },
        "filesystem-extra": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/charlesqin/Desktop", "/Users/charlesqin/Documents"]
        },
        "everything": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-everything"]
        }
      }
    }
```

###  网页抓取 
    
    
    ### 命令
    uvx mcp-server-fetch
    
```
    ### 配置
    {
    	"mcpServers": {
    	  "fetch": {
    	    "command": "uvx",
    	    "args": ["mcp-server-fetch"]
    	  }
    	}
    }
```
    
    
```
    ### Prompt示例
    Fetch the content of a URL, convert it to Markdown format, and translate it into Chinese:
    	https://www.anthropic.com/news/model-context-protocol
```
    

###  Brave search 
    
    
    ### api
    https://api.search.brave.com/app/dashboard
    
    
```
    {
      "mcpServers": {
        "brave-search": {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-brave-search"],
          "env": {
            "BRAVE_API_KEY": ""
          }
        }
      }
    }
```
    

###  文件管理 
    
    
```
    {
      "mcpServers": {
    	  "filesystem": {
    	    "command": "npx",
    	    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/charlesqin/Desktop", "/Users/charlesqin/Documents"]
    	  }
    	}
    }
```
