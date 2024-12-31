---
layout: single  
title: "Claude颠覆性创新！MCP模型上下文协议！轻松为Claude加入搜索引擎、网页抓取、Text to SQL、文件管理、GitHub操作等功能！Model Context Protocol为AI开挂"  
sidebar:
  nav: "docs"
date: 2024-11-26 10:00:00 +0800  
categories: AIAgents  
tags: [Anthropic, MCP, AI协议, Claude 3.5, AI工具]  
classes: wide  

author_profile: true  
---

人工智能公司Anthropic推出了模型上下文协议（Model Context Protocol，简称MCP），旨在为AI助手与外部数据源之间建立安全、标准化的连接。MCP作为开放协议，允许开发者在AI工具与各种数据源（如文件系统、数据库、API等）之间创建双向连接，提升AI系统的互操作性和功能扩展性。

### 本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://b23.tv/lXC0XdH)
- [👉👉👉 通过YouTube观看](https://youtu.be/KbgDABTSV9I)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng


## MCP协议的核心特点

### 客户端-服务器架构
MCP采用客户端-服务器架构，开发者可以通过MCP服务器公开数据，或构建MCP客户端，将AI应用与这些服务器连接。这一设计使得AI助手能够直接访问本地或远程的文件、数据库记录、API响应等多种资源，甚至可以实时操作浏览器，从而在更广泛的应用场景中提供智能支持。

### Claude 3.5内置支持
值得注意的是，Claude 3.5 Sonnet版本已内置MCP服务器支持，用户只需进行简单配置，即可实现AI助手与本地数据的无缝连接。此外，Anthropic还提供了针对Google Drive、Slack、GitHub等常用平台的预构建MCP服务器，方便开发者快速集成。

## 行业应用与生态发展

多家企业和开发工具公司已开始采用MCP协议，以增强其平台功能。例如，Replit的总裁表示，MCP将成为AI智能体与互联网生态之间的通用语言，推动AI与应用系统互操作的快速发展。

MCP的推出标志着AI系统与外部数据源连接方式的标准化进程，为开发者提供了更高效的集成路径。随着生态系统的不断发展，MCP有望成为AI助手与现实世界应用之间的桥梁，推动人工智能技术的进一步普及和应用。


### 安装和配置


#### 1. 安装Claude桌面版 [点击下载安装](https://claude.ai/download)

#### 2. 安装sqlite3

```bash

# macOS命令 使用 Homebrew 安装所需工具
brew install uv git sqlite3

#Windows命令
winget install --id=astral-sh.uv -e
winget install git.git sqlite.sqlite

```

#### 3. 创建数据库

```bash

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

```bash

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
uvx mcp-server-sqlite

```


#### 4. 配置 Claude Desktop

```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

```bash
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "/Users/charlesqin/test.db"]
    }
  }
}

```

```bash

{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "/Users/charlesqin/test.db"]
    }
  }
}

```

#### prompts

```bash

What's the average price of all products in the database?

Can you analyze the price distribution and suggest any pricing optimizations?

Could you help me design and create a new table for storing customer orders?



```


#### Brave search

```bash

### api
https://api.search.brave.com/app/dashboard

```

```bash

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


````

#### 文件管理

```bash 

{
  "mcpServers": {
	  "filesystem": {
	    "command": "npx",
	    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/charlesqin/Desktop", "/Users/charlesqin/Documents"]
	  }
	}
}


```

#### 完整配置文件

```bash

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