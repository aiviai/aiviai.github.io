---
layout: single
title: "vLLM+glm-4-9b-chat+chatTTS"
sidebar:
  nav: "docs"
date: 2024-06-08 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM]
tags: [AI, AI-Agents, AutoGen, GPT, GPT-4, HuggingFace, LLM, Llama-3]
classes: wide
author_profile: true
---


#  vLLM+glm-4-9b-chat+chatTTS 

###  colab脚本 

[ https://colab.research.google.com/drive/12ZeWOwPUYqY74WMLqR-0MvBCsP7W5qaK?usp=sharing ](<https://colab.research.google.com/drive/12ZeWOwPUYqY74WMLqR-0MvBCsP7W5qaK?usp=sharing>)

###  安装和配置 
    
    
```
    conda create -n myenv python=3.9 -y
    conda activate myenv
    pip install vllm
```

###  开启API接口 
    
    
    ##通用模型localhost
    python -m vllm.entrypoints.openai.api_server --model NousResearch/Meta-Llama-3-8B-Instruct --dtype auto --api-key token-abc123
    
    ##通用模型公网访问
    python -m vllm.entrypoints.openai.api_server --model NousResearch/Meta-Llama-3-8B-Instruct --dtype auto --api-key token-abc123 --host 0.0.0.0
    
```
    ##glm-4-9b的公网访问 
    ##需要将 trust_remote_code 选项设置为 True
    python -m vllm.entrypoints.openai.api_server --model THUDM/glm-4-9b-chat --dtype auto --api-key token-abc123 --host 0.0.0.0 --trust-remote-code
```

###  chatTTS配置 

ChatTTS是专门为对话场景设计的文本转语音模型，例如LLM助手对话任务。它支持英文和中文两种语言。最大的模型使用了10万小时以上的中英文数据进行训练。在HuggingFace中开源的版本为4万小时训练且未SFT的版本. 
    
    
    ##https://pydigger.com/pypi/chattts-fork
    
    conda create --name chattts -y
    
    conda activate chattts
    
    mkdir chattts
    cd chattts
    
    pip install chattts-fork
    
    chattts hello,world
    
    ##查看帮助命令
    chattts -h

###  chatTTS在终端中使用 
    
    
    #女性
    chattts -s 2 '你好 今天天气怎么样呀.'
    
    #男性
    chattts -s 3333 '你好 今天天气怎么样呀.'

男性 

Seed  |  age  |  style   
---|---|---  
111  |  young  |  Literary   
333  |  young  |  Gentle   
666  |  middle-aged  |  White-collar   
7777  |  middle-aged  |  Hong Kong-style   
9999  |  middle-aged  |  Deep and resonant   
  
女性 

Seed  |  age  |  style   
---|---|---  
2  |  young  |  Emotionally rich   
4  |  middle-aged  |  Deeply emotional   
1111  |  middle-aged  |  Clear and pure   
3333  |  middle-aged  |  Calm and serene   
  
###  chatTTS代码 
    
    
    ##项目代码和视频由AI超元域频道原创，禁止盗搬
    import subprocess
    
```
    def run_chattts(text):
        command = f"chattts -s 2 '{text}'"
        try:
            result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            return result.stdout.decode('utf-8')
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")
            print(f"Output: {e.stdout.decode('utf-8')}")
            print(f"Error: {e.stderr.decode('utf-8')}")
            return None
```
    
```
    # 测试
    text = "你好 今天天气怎么样呀."
    output = run_chattts(text)
    if output:
        print(output)
```

###  chatTTS调用autogen的代码 
    
    
    ##安装autogen
    pip install pyautogen
    
    
```
    ##项目代码和视频由AI超元域频道原创，禁止盗搬
    import subprocess
    import shlex
```
    
```
    def run_chattts(text, output_file, speaker_index):
        # 对文本进行转义和格式化
        escaped_text = shlex.quote(text)
```
        
```
        # 根据说话者的索引选择不同的声音参数
        if speaker_index % 2 == 0:
            voice_param = "-s 2"  # 女性声音
        else:
            voice_param = "-s 666"  # 男性声音
```
        
```
        command = f"chattts {voice_param} -o {output_file} {escaped_text}"
        try:
            subprocess.run(command, shell=True, check=True)
        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")
            print(f"Output: {e.stdout}")
            print(f"Error: {e.stderr}")
```
    
```
    gpt4 = {
        "config_list": [
            {
                "model": "gpt-4",
                "base_url": "https://api.openai.com/v1",
```
    
```
                "api_key": "sk-proj-bw8wKQbsn0NclaecvN6MT3BlbkFJYwnSpU1VcPtkSEP17sGF",
            },
        ],
        "cache_seed": None,  # Disable caching.
    }
```
    
```
    glm = {
        "config_list": [
            {
                "model": "THUDM/glm-4-9b-chat",
                "base_url": "http://216.81.245.215:8000/v1/",
                "api_key": "token-abc123",
            },
        ],
        "cache_seed": None,  # Disable caching.
    }
```
    
    from autogen import ConversableAgent
    
```
    Darcy = ConversableAgent(
        "Darcy (glm)",
        llm_config=glm,
        system_message="你是《傲慢与偏见》中的男主角达西先生。你是一位富有、高傲但内心善良的绅士。你对伊丽莎白的智慧和独立性格印象深刻,但又常常被她的言语所挑战。请根据伊丽莎白的发言,以达西的口吻和性格进行回应。",
    )
    Elizabeth = ConversableAgent(
        "Elizabeth (gpt4)",
        llm_config=gpt4,
        system_message="你是《傲慢与偏见》中的女主角伊丽莎白。你是一位聪慧、独立且性格开朗的年轻女性。你对达西先生的傲慢和自负初impression不佳,但渐渐被他的真诚和善良所吸引。请根据达西先生的发言,以伊丽莎白的口吻和性格进行回应。",
    )
```
    
    chat_result = Elizabeth.initiate_chat(Darcy, message="达西先生,我们在上次的舞会上初次见面,我对您的第一印象是傲慢和自负。您几乎没有和任何女士跳舞,只是站在那里评判别人。我想知道,您为什么给人这样的印象?您真的如此高傲,还是有什么其他的原因?请告诉我您的想法。", max_turns=5)
    
```
    # 生成音频文件
    for i, message in enumerate(chat_result.chat_history):
        text = message["content"]
        output_file = f"output_{i}.wav"
        run_chattts(text, output_file, i)
```

###  🔥如有问题请联系我的徽信 stoeng 

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) ** ****

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **
