---
layout: single  
title: "🚀颠覆MCP！Open WebUI新技术mcpo横空出世！支持ollama！轻松支持各种MCP Server！Cline+Claude3.7轻松开发论文检索MCP Server！本地部署mcpo！- 完整教程"  
sidebar:
  nav: "docs"
date: 2025-04-03 10:00:00 +0800  
categories: AIAgents  
tags: [mcpo, MCP, AI协议, Claude 3.7, Claude,Open WebUI, AI工具, Cline, AI编程, MCP Server]  
classes: wide  

author_profile: true  
---

Open WebUI 的 MCPo 项目：将 MCP 工具无缝集成到 OpenAPI 的创新解决方案!

随着人工智能工具和模型的快速发展，如何高效、安全地将这些工具集成到标准化的 API 接口中成为了开发者面临的重要挑战。Open WebUI 的 **MCPo 项目**（Model Context Protocol-to-OpenAPI Proxy Server）正是为了解决这一问题而设计的。本文将带您深入了解 MCPo 的功能、优势及其对开发者生态的影响。

---

### 🚀本篇笔记所对应的视频：

- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV1rjZSYtExH/)
- [👉👉👉 通过YouTube观看](https://youtu.be/AAiG_j4Lx4c)
- [👉👉👉 我的开源项目](https://github.com/win4r/AISuperDomain)
- [👉👉👉 请我喝咖啡](https://ko-fi.com/aila)
- 👉👉👉 我的微信：stoeng
- 👉👉👉 承接大模型微调、RAG、AI智能体、AI相关应用开发等项目。

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  



### **什么是 MCPo？**

MCPo 是一个简单、可靠的代理服务器，能够将任何基于 MCP 协议的工具转换为兼容 OpenAPI 的 HTTP 服务器。它通过标准化 RESTful API 接口，让复杂的工具变得易于使用，并支持与大语言模型（LLM）代理和应用程序的无缝交互。

### 核心功能：

- **即时兼容性**：支持 OpenAPI 工具、SDK 和用户界面，无需额外配置。
- **安全性与稳定性**：采用标准化的 HTTPS 传输协议，支持 JWT 和 API 密钥认证。
- **自动生成文档**：无需手动配置，自动生成交互式 Swagger UI 文档。
- **纯 HTTP 支持**：无需额外的套接字或胶合代码，简化开发流程。

---

### **MCPo 的工作原理**

MCPo 的核心在于其代理功能，它能够动态发现 MCP 工具并生成 REST API 端点，同时提供人性化的 OpenAPI 文档。以下是其典型工作流程：

1. 启动 MCPo 服务器，例如：
或通过 Python：
    
    ```bash
    uvx mcpo --port 8000 -- your_mcp_server_command
    
    ```
    
    ```bash
    pip install mcpo
    mcpo --port 8000 -- your_mcp_server_command
    
    ```
    
2. 自动生成 API 文档，访问地址为 `http://localhost:8000/docs`。
3. 用户可以直接调用生成的 API 端点，通过 HTTP 客户端或其他工具进行交互。

此外，MCPo 支持通过配置文件管理多个 MCP 工具，使不同工具可以通过唯一路由访问。例如：

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "time": {
      "command": "uvx",
      "args": ["mcp-server-time", "--local-timezone=America/New_York"]
    }
  }
}

```

---

### **最新功能更新**

根据项目最新发布的更新日志，MCPo 引入了以下新特性：

- **图像内容支持**：现在可以直接处理 MCP 工具生成的图像内容，并以二进制格式返回给用户，用于动态图表、AI艺术等场景。
- **CLI API 密钥认证**：通过 `-api-key` 参数轻松保护端点，适用于公共或多代理部署。
- **灵活的跨域访问控制（CORS）**：新增 `-cors-allow-origins` 参数，为前端应用和远程 UI 集成提供支持，同时保持安全性。

---

### **为什么选择 MCPo？**

相比原生 MCP 协议，MCPo 提供了显著优势：

- **用户友好的接口**：不需要学习新的协议，仅需熟悉 HTTP REST 接口即可操作。
- **即插即用的集成能力**：兼容数千种现有工具和服务。
- **强大的文档支持**：自动维护准确且易用的文档。
- **安全与稳定性保障**：基于成熟框架（如 FastAPI），确保高性能和长久支持。

---

### **社区反馈与未来发展**

MCPo 项目已在 GitHub 和 Reddit 社区中引发广泛讨论。开发者对其易用性和强大的功能表示认可，同时也提出了改进建议，例如增加 SSL 支持和更灵活的配置选项。

随着人工智能工具需求的增长，MCPo 有望成为连接 AI 工具与标准化接口的重要桥梁，为开发者提供更高效、更安全的解决方案。

---

### 🚀安装ollama

[https://ollama.com/](https://ollama.com/)

### 🚀在ollama中安装模型

```bash
ollama run gemma3
```

### 🚀安装mcpo

```bash
# 安装mcpo
pip install mcpo

mcpo --port 8000 --api-key "top-secret" -- your_mcp_server_command

# 启动时间mcp server
uvx mcpo --port 8000 --api-key "top-secret" -- uvx mcp-server-time --local-timezone=America/New_York

# 启动fetch mcp server
uvx mcpo --port 8000 -- uvx mcp-server-fetch

# 查看文档：
http://localhost:8000/docs
http://localhost:8000/openapi.json

# 使用配置文件启动
mcpo --config /path/to/config.json

# 配置文件示例：
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "time": {
      "command": "uvx",
      "args": ["mcp-server-time", "--local-timezone=America/New_York"]
    }
  }
}
```

### 🚀安装Open WebUI

```bash
# pip 安装
pip install -U open-webui

# 启动 
open-webui serve

# 源代码安装
git clone -b v0.6.0 https://github.com/open-webui/open-webui.git
cd open-webui/

cp -RPp .env.example .env

npm i
npm run build

cd ./backend
pip install -r requirements.txt -U

# 启动
bash start.sh

```

### 🚀测试通过MCPO调用MCP Fetch server

```bash
import requests
import json

def fetch_webpage(url, max_length=10000, start_index=0, raw=False):
    """
    Fetch content from a URL using the MCP Fetch server.

    Args:
        url (str): The URL to fetch
        max_length (int): Maximum number of characters to return
        start_index (int): Start content from this character index
        raw (bool): Get raw HTML content without markdown conversion

    Returns:
        dict: The response from the server containing the fetched content
    """
    try:
        # Make a POST request to the fetch endpoint
        response = requests.post(
            "http://localhost:8000/fetch",
            json={
                "url": url,
                "max_length": max_length,
                "start_index": start_index,
                "raw": raw
            }
        )

        # Ensure the request was successful
        response.raise_for_status()

        # Parse the response
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# Example usage
if __name__ == "__main__":
    # Fetch the specific URL you requested
    target_url = "https://www.aivi.fyi/aiagents/RooCode-Gemini2.5Pro-OpenAIAgentsSDK"
    result = fetch_webpage(target_url)
    print(result)
```