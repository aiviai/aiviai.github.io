---
layout: single  
title: "🚀重磅开源！本地部署1.7B参数超强OCR大模型dots.ocr！超越GPT-4o和olmOCR！结构化精准提取复杂PDF扫描件！完美识别中英文文档、模糊扫描件与复杂表格！文档解析准确率接近100%！"  
sidebar:
  nav: "docs"
date: 2025-08-02 10:00:00 +0800  
categories: LLMs
tags: [dots.ocr, OCR, multimodal, AI, VLM, PDF, olmOCR]
classes: wide  

author_profile: true  
---

dots.ocr是小红书团队开源的一个多语言文档解析神器。它能干什么呢？给它一张包含文字、表格、公式的复杂文档图片，它就能准确地告诉你每个元素在哪里、是什么类型、里面写的什么内容，甚至还能保持人类阅读的逻辑顺序。

🚀本篇笔记所对应的视频：
- [👉👉👉 通过哔哩哔哩观看](https://www.bilibili.com/video/BV13w8XzoEnR/)
- [👉👉👉 通过YouTube观看](https://youtu.be/t_8ZgUIgnLo)
- [👉👉👉 Context Engineering视频](https://youtu.be/oEZ7aN7jOEI)
- [👉👉👉 olmOCR视频](https://youtu.be/XF3Q_ZjwfaI)
- [👉👉👉 InternVL3 OCR视频](https://youtu.be/_EqUR0dYGtE)
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

### 🔥AI智能体相关视频

1. [AI智能体视频 1](https://youtu.be/vYm0brFoMwA) 
2. [AI智能体视频 2](https://youtu.be/szTXELuaJos)  
3. [AI智能体视频 3](https://youtu.be/szTXELuaJos)  
4. [AI智能体视频 4](https://youtu.be/RxR3x_Uyq4c)  
5. [AI智能体视频 5](https://youtu.be/IrTEDPnEVvU)  
6. [AI智能体视频 6](https://youtu.be/q_IdxUGZsow)  


听起来好像没什么特别的？毕竟市面上OCR工具一抓一大把。但是这个项目的厉害之处在于——它用一个统一的视觉语言模型就搞定了传统方案需要多个模型配合才能完成的复杂任务。

## 性能到底有多强？

我仔细看了看项目里的性能对比表，说不震惊是假的。在OmniDocBench这个权威测试集上，dots.ocr的表现简直是降维打击：

- **文本识别**：Edit距离只有0.032（英文）和0.066（中文），这意味着识别准确率接近完美
- **表格解析**：TEDS得分达到88.6%和89.0%，超越了Gemini 2.5 Pro的85.8%
- **阅读顺序**：Edit距离仅为0.040和0.067，远优于其他竞争对手

更让人意外的是，它甚至在公式识别上都能和那些参数量大几十倍的模型掰手腕。想象一下，一个1.7B的"小不点"，竟然能在这么多维度上碾压GPT-4o、Qwen2.5-VL-72B这些巨无霸。

## 多语言支持：真正的全球化

作为一个多语言工作者，我特别关注dots.ocr的多语言能力。项目团队专门构建了一个包含100种语言、1493个PDF图片的内部测试集。结果显示，dots.ocr在多语言文档解析上有着"决定性优势"。

这对于处理国际化文档、小语种资料的朋友来说，绝对是个福音。不用再为了解析一份阿拉伯语或者泰语的PDF而头疼了。

## 架构设计：简约而不简单

传统的文档解析方案通常需要多个模型配合：先用检测模型找到文档中的各种元素，再用识别模型提取文字内容，最后还要用额外的算法处理阅读顺序。这种流水线式的设计复杂度高、容易出错。

dots.ocr的思路完全不同。它把所有任务都交给一个视觉语言模型来处理，只需要改变输入的提示词，就能在不同任务间切换。这种设计不仅简化了架构，还提高了各个任务间的协同效果。

## 实际体验：上手就能用

项目的易用性做得相当不错。你可以通过几种方式体验：

1. **在线体验**：访问官方Demo页面直接测试
2. **本地部署**：支持Docker一键部署，也可以用vLLM进行高性能推理
3. **API调用**：提供了详细的代码示例，集成到自己的项目中很方便

我特别喜欢它的输出格式。解析结果会生成三个文件：

- JSON格式的结构化数据，包含每个元素的位置、类型和内容
- Markdown文件，适合进一步编辑和处理
- 带有标注框的可视化图片，方便检查解析效果

## 局限性：没有完美的模型

诚实地说，dots.ocr也不是万能的。项目团队很坦诚地列出了一些局限：

- 复杂表格和公式的解析还不够完美
- 文档中的图片暂时还不能解析
- 对于字符密度特别高的图片可能会解析失败
- 在大批量PDF处理时性能还有优化空间

但考虑到这是一个1.7B参数的模型，能做到这个程度已经相当不容易了。

## 技术细节：站在巨人的肩膀上

从技术实现来看，dots.ocr基于Qwen2.5-VL架构，使用了aim-v2的设计思路。项目团队还特别感谢了MonkeyOCR、OmniDocBench等开源项目的贡献。

这种开放的合作精神值得点赞。正是因为有了这些优秀的开源基础，我们才能看到像dots.ocr这样令人惊喜的成果。

dots.ocr的出现，让我们看到了小而美的模型设计理念。在这个动辄千亿参数的大模型时代，一个1.7B的模型能在专业领域做到如此出色，确实令人印象深刻。

对于需要处理大量文档的朋友，不妨试试这个工具。项目的开源协议也很友好，商业使用基本没有障碍。

最后想说的是，开源社区的力量真的很强大。像dots.ocr这样的项目，不仅推动了技术进步，也为整个社区贡献了宝贵的资源。希望能有更多这样的优秀项目涌现出来。

---

*✅项目地址：https://github.com/rednote-hilab/dots.ocr*

### 🚀笔记

```markdown
# 1. 环境准备
conda create -n dots_ocr python=3.12          # 创建名为dots_ocr的conda虚拟环境，使用Python 3.12
conda activate dots_ocr                       # 激活虚拟环境

# 2. 项目下载
git clone https://github.com/rednote-hilab/dots.ocr.git    # 克隆dots.ocr项目代码
cd dots.ocr                                   # 进入项目目录

# 3. 安装PyTorch
pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/cu128
                                             # 安装PyTorch 2.7.0版本（支持CUDA 12.8）

# 4. 安装CUDA工具链
conda install cuda-toolkit -c nvidia        # 安装CUDA编译工具包，解决flash-attn编译问题

# 5. 第一次尝试安装项目依赖（失败）
pip install -e .                             # 以开发模式安装项目，但因为缺少CUDA工具链而失败

# 7. 下载模型权重
python3 tools/download_model.py             # 下载dots.ocr预训练模型权重文件

# model downloaded to /home/Ubuntu/dots.ocr/weights/DotsOCR

# 8. vLLM部署准备（失败，因为vllm未安装）
export hf_model_path=./weights/DotsOCR       # 设置模型路径环境变量
export PYTHONPATH=$(dirname "$hf_model_path"):$PYTHONPATH  # 添加模型路径到Python路径
sed -i '/^from vllm\.entrypoints\.cli\.main import main$/a\from DotsOCR import modeling_dots_ocr_vllm' `which vllm`
                                             # 尝试修改vllm配置文件（失败，因为vllm未安装）

# 9. 尝试启动vLLM服务（失败）
CUDA_VISIBLE_DEVICES=0 vllm serve ${hf_model_path} \
    --tensor-parallel-size 1 \
    --gpu-memory-utilization 0.95 \
    --chat-template-content-format string \
    --served-model-name model \
    --trust-remote-code                      # 尝试启动vLLM服务，但因为vllm未安装而失败

# 10. 使用HuggingFace方式测试（成功）
python3 demo/demo_hf.py                     # 使用HuggingFace Transformers直接运行模型演示，成功

# 11. 尝试Gradio Web界面（有问题）
python demo/demo_gradio.py                  # 启动Gradio Web演示界面，但出现跨域和资源加载问题

# 12. 尝试Gradio标注界面（有问题）
python demo/demo_gradio_annotion.py         # 启动Gradio图像标注演示界面，同样出现问题
```