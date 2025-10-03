---
layout: single
title: "本地配置开源大模型实现混合智能体，MoA+ollama打造真正超越gpt4o的AI agent"
sidebar:
  nav: "docs"
date: 2024-06-19 00:00:00 +0800
categories: [AI-Agents, Fine-Tuning, LLM, RAG]
tags: [AI, AI-Agents, GPT, GPT-4, LLM, Llama-3, Mistral, Ollama, RAG]
classes: wide
author_profile: true
---


#  本地配置开源大模型实现混合智能体，MoA+ollama打造真正超越gpt4o的AI agent 

###  视频中的模型组合 

> phi3 3.8b   
>  llama3 8b   
>  mistral 7b   
> 

###  论文: [ https://arxiv.org/abs/2406.04692 ](<https://arxiv.org/abs/2406.04692>)

##  项目地址 

###  1.支持ollama等各种API接口的MoA [ https://github.com/win4r/MoA ](<https://github.com/win4r/MoA>)

###  2.官方版MoA(只支持togetherAPI) [ https://github.com/togethercomputer/MoA ](<https://github.com/togethercomputer/MoA>)

###  **👉👉👉** 如有问题请联系我的徽信 stoeng 

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  论文简介: 

> 论文提出了一种称为混合智能体(Mixture-of-Agents,MoA)的方法,利用多个大语言模型(LLM)的集体智慧来提高自然语言理解和生成任务的性能。 
> 
>   1. MoA采用了分层结构,每一层包含多个LLM智能体。每个智能体都将前一层所有智能体的输出作为辅助信息来生成自己的回答。通过迭代地综合和优化回答,MoA可以充分利用不同LLM的独特优势。 
> 

>   2. 实验发现,即使其他模型提供的辅助回答质量较低,LLM也倾向于生成更好的回答,体现出LLM具有内在的协作性。MoA正是利用了这种协作性。 
> 

>   3. 在AlpacaEval 2.0、MT-Bench和FLASK等基准测试中,MoA取得了目前最佳的性能,仅使用开源LLM就超过了GPT-4。例如在AlpacaEval 2.0上,MoA达到了65.1%的得分,而GPT-4 Omni为57.5%。 
> 

>   4. 进一步的分析表明,MoA并非简单地从辅助回答中选择最佳答案,而是对它们进行了复杂的综合;使用更多不同的LLM作为提议者可以提高MoA的性能。 
> 

>   5. 通过预算分析,MoA的几种实现可以达到与GPT-4 Turbo相当的性能,同时成本却降低了一半。 
> 

> 
> 展示了如何通过混合智能体的框架来发挥多个LLM的协同效应,在提高性能的同时兼顾了计算成本,为后续研究指明了一个很有前景的方向。 

###  MoA 的核心思想 

> MoA 的核心思想是“混合智能体”，即通过结合多个大型语言模型 (LLM) 的优势来实现更强大的性能。传统的 LLM 通常在某些任务上表现出色，而在其他任务上可能存在不足。MoA 则通过将不同 LLM 的能力进行整合，从而在各种任务上都达到更高的水平。 

###  工作原理 

> **MoA 的工作原理**
> 
> MoA 采用了一种分层的架构，每一层都包含多个 LLM 代理。这些代理协同工作，共同处理输入并生成响应。MoA 的工作流程通常包括以下步骤： 
> 
>   1. **输入处理：** 将用户的输入发送给 MoA 的第一层。 
> 

>   2. **分层处理：** 每一层的 LLM 代理都会对输入进行处理，并生成中间结果。 
> 

>   3. **结果聚合：** 将每一层的中间结果进行聚合，生成最终的响应。 
> 


###  流程 

[ ![Image](%E6%9C%AC%E5%9C%B0%E9%85%8D%E7%BD%AE%E5%BC%80%E6%BA%90%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%AE%9E%E7%8E%B0%E6%B7%B7%E5%90%88%E6%99%BA%E8%83%BD%E4%BD%93%EF%BC%8CMoA+ollama%E6%89%93%E9%80%A0%E7%9C%9F%E6%AD%A3%E8%B6%85%E8%B6%8Agpt4o%E7%9A%84AI%20agent%209bbdb6b5be3d488487c183c4ffe44f60/Untitled.png) ](<%E6%9C%AC%E5%9C%B0%E9%85%8D%E7%BD%AE%E5%BC%80%E6%BA%90%E5%A4%A7%E6%A8%A1%E5%9E%8B%E5%AE%9E%E7%8E%B0%E6%B7%B7%E5%90%88%E6%99%BA%E8%83%BD%E4%BD%93%EF%BC%8CMoA+ollama%E6%89%93%E9%80%A0%E7%9C%9F%E6%AD%A3%E8%B6%85%E8%B6%8Agpt4o%E7%9A%84AI%20agent%209bbdb6b5be3d488487c183c4ffe44f60/Untitled.png>)

###  MoA 的优势 

>   * **性能提升：** 通过结合多个 LLM 的优势，MoA 在各种任务上都实现了显著的性能提升，甚至在某些基准测试中超越了 GPT-4o。 
> 

>   * **灵活性：** MoA 可以灵活地选择和组合不同的 LLM，从而适应不同的应用场景。 
> 

>   * **可扩展性：** MoA 可以方便地添加新的 LLM，从而进一步提升性能。 
> 


###  **MoA 的应用**

>   * **文本生成：** MoA 可以生成更准确、更流畅、更富有创造性的文本。 
> 

>   * **机器翻译：** MoA 可以实现更高质量的机器翻译。 
> 

>   * **对话系统：** MoA 可以构建更智能、更人性化的对话系统。 
> 


###  API注册 

together API: [ https://api.together.ai/settings/billing ](<https://api.together.ai/settings/billing>)

groq API: [ https://console.groq.com/keys ](<https://console.groq.com/keys>)

###  ollama API 
    
    
```
        "model": "codestral:22b",
        "base_url": "http://localhost:11434/v1",
        "api_key": "ollama",
```

###  ollama拉取并运行模型 
    
    
```
    ollama run llama3:instruct
    ollama run mistral:instruct
    ollama run phi3:instruct
```

###  配置命令 
    
    
    ##下载官方的，不支持ollama
    git clone https://github.com/togethercomputer/MoA.git   
    
    cd MoA
    
    pip install -r requirements.txt
    
    cd alpaca_eval
    
    pip install -e .
    
    cd FastChat
    
    pip install -e ".[model_worker,llm_judge]"
    
    cd ..
    
    export TOGETHER_API_KEY=<API KEY>
    
    export OPENAI_API_KEY=<API KEY>
    
    ##自定义部分
    export GROQ_API_KEY=<API KEY>
    
    
    python bot.py
    

###  测试问题 
    
    
    How can I dive deeper into machine learning?
    
    Implement a Snake game using Python.

bot.py 
    
    
```
    import datasets
    from functools import partial
    from loguru import logger
    from utils import (
        generate_together_stream,
        generate_with_references,
        DEBUG,
    )
    import typer
    from rich import print
    from rich.console import Console
    from rich.markdown import Markdown
    from rich.prompt import Prompt
    from datasets.utils.logging import disable_progress_bar
    from time import sleep
```
    
    disable_progress_bar()
    
    console = Console()
    
    welcome_message = """
    # Welcome to the Together AI MoA (Mixture-of-Agents) interactive demo!
    
    Mixture of Agents (MoA) is a novel approach that leverages the collective strengths of multiple LLMs to enhance performance, achieving state-of-the-art results. By employing a layered architecture where each layer comprises several LLM agents, MoA significantly outperforms GPT-4 Omni’s 57.5% on AlpacaEval 2.0 with a score of 65.1%, using only open-source models!
    
```
    This demo uses the following LLMs as reference models, then passes the results to the aggregate model for the final response:
    - llama3-8b-8192
    - llama3-70b-8192
    - mixtral-8x7b-32768
    - gemma-7b-it
```
    
    """
    
```
    default_reference_models = [
        "llama3-8b-8192",###[modify]
        "llama3-70b-8192",###[modify]
        "mixtral-8x7b-32768",###[modify]
        "gemma-7b-it",###[modify]
    ]
```
    
    
```
    def process_fn(
        item,
        temperature=0.7,
        max_tokens=2048,
    ):
        """
        Processes a single item (e.g., a conversational turn) using specified model parameters to generate a response.
```
    
```
        Args:
            item (dict): A dictionary containing details about the conversational turn. It should include:
                         - 'references': a list of reference responses that the model may use for context.
                         - 'model': the identifier of the model to use for generating the response.
                         - 'instruction': the user's input or prompt for which the response is to be generated.
            temperature (float): Controls the randomness and creativity of the generated response. A higher temperature
                                 results in more varied outputs. Default is 0.7.
            max_tokens (int): The maximum number of tokens to generate. This restricts the length of the model's response.
                              Default is 2048.
```
    
```
        Returns:
            dict: A dictionary containing the 'output' key with the generated response as its value.
        """
```
    
```
        references = item.get("references", [])
        model = item["model"]
        messages = item["instruction"]
```
    
```
        output = generate_with_references(
            model=model,
            messages=messages,
            references=references,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        if DEBUG:
            logger.info(
                f"model: {model}, instruction: {item['instruction']}, output: {output[:20]}"
            )
```
    
        print(f"\nFinished querying [bold]{model}.[/bold]")
    
        return {"output": output}
    
    
```
    def main(
        model: str = "llama3/llama3-8b-8192",
        reference_models: list[str] = default_reference_models,
        temperature: float = 0.7,
        max_tokens: int = 512,
        rounds: int = 1,
        multi_turn=True,
    ):
        """
        Runs a continuous conversation between user and MoA.
```
    
```
        Args:
        - model (str): The primary model identifier used for generating the final response. This model aggregates the outputs from the reference models to produce the final response.
        - reference_models (List[str]): A list of model identifiers that are used as references in the initial rounds of generation. These models provide diverse perspectives and are aggregated by the primary model.
        - temperature (float): A parameter controlling the randomness of the response generation. Higher values result in more varied outputs. The default value is 0.7.
        - max_tokens (int): The maximum number of tokens that can be generated in the response. This limits the length of the output from each model per turn. Default is 2048.
        - rounds (int): The number of processing rounds to refine the responses. In each round, the input is processed through the reference models, and their outputs are aggregated. Default is 1.
        - multi_turn (bool): Enables multi-turn interaction, allowing the conversation to build context over multiple exchanges. When True, the system maintains context and builds upon previous interactions. Default is True. When False, the system generates responses independently for each input.
        """
        md = Markdown(welcome_message)
        console.print(md)
        sleep(0.75)
        console.print(
            "\n[bold]To use this demo, answer the questions below to get started [cyan](press enter to use the defaults)[/cyan][/bold]:"
        )
```
    
```
        data = {
            "instruction": [[] for _ in range(len(reference_models))],
            "references": [""] * len(reference_models),
            "model": [m for m in reference_models],
        }
```
    
        num_proc = len(reference_models)
    
```
        model = Prompt.ask(
            "\n1. What main model do you want to use?",
            default="llama3-70b-8192",###[modify]
        )
        console.print(f"Selected {model}.", style="yellow italic")
        temperature = float(
            Prompt.ask(
                "2. What temperature do you want to use? [cyan bold](0.7) [/cyan bold]",
                default=0.7,
                show_default=True,
            )
        )
        console.print(f"Selected {temperature}.", style="yellow italic")
        max_tokens = int(
            Prompt.ask(
                "3. What max tokens do you want to use? [cyan bold](512) [/cyan bold]",
                default=512,
                show_default=True,
            )
        )
        console.print(f"Selected {max_tokens}.", style="yellow italic")
```
    
        while True:
    
```
            try:
                instruction = Prompt.ask(
                    "\n[cyan bold]Prompt >>[/cyan bold] ",
                    default="Top things to do in NYC",
                    show_default=True,
                )
            except EOFError:
                break
```
    
```
            if instruction == "exit" or instruction == "quit":
                print("Goodbye!")
                break
            if multi_turn:
                for i in range(len(reference_models)):
                    data["instruction"][i].append({"role": "user", "content": instruction})
                    data["references"] = [""] * len(reference_models)
            else:
                data = {
                    "instruction": [[{"role": "user", "content": instruction}]]
                    * len(reference_models),
                    "references": [""] * len(reference_models),
                    "model": [m for m in reference_models],
                }
```
    
            eval_set = datasets.Dataset.from_dict(data)
    
```
            with console.status("[bold green]Querying all the models...") as status:
                for i_round in range(rounds):
                    eval_set = eval_set.map(
                        partial(
                            process_fn,
                            temperature=temperature,
                            max_tokens=max_tokens,
                        ),
                        batched=False,
                        num_proc=num_proc,
                    )
                    references = [item["output"] for item in eval_set]
                    data["references"] = references
                    eval_set = datasets.Dataset.from_dict(data)
```
    
```
            console.print(
                "[cyan bold]Aggregating results & querying the aggregate model...[/cyan bold]"
            )
            output = generate_with_references(
                model=model,
                temperature=temperature,
                max_tokens=max_tokens,
                messages=data["instruction"][0],
                references=references,
                generate_fn=generate_together_stream,
            )
```
    
```
            all_output = ""
            print("\n")
            console.log(Markdown(f"## Final answer from {model}"))
```
    
```
            for chunk in output:
                out = chunk.choices[0].delta.content
                if out is not None:
                    console.print(out, end="")
                    all_output += out
            print()
```
    
```
            if DEBUG:
                logger.info(
                    f"model: {model}, instruction: {data['instruction'][0]}, output: {all_output[:20]}"
                )
            if multi_turn:
                for i in range(len(reference_models)):
                    data["instruction"][i].append(
                        {"role": "assistant", "content": all_output}
                    )
```
    
    
    if __name__ == "__main__":
        typer.run(main)

utils.py 
    
    
```
    import os
    import json
    import time
    import requests
    import openai
    import copy
```
    
    from loguru import logger
    
    
    DEBUG = int(os.environ.get("DEBUG", "0"))
    
    
```
    def generate_together(
        model,
        messages,
        max_tokens=2048,
        temperature=0.7,
        streaming=False,
    ):
```
    
        output = None
    
        for sleep_time in [1, 2, 4, 8, 16, 32]:
    
            try:
    
                endpoint = "https://api.groq.com/openai/v1/chat/completions"###[modify]
    
```
                if DEBUG:
                    logger.debug(
                        f"Sending messages ({len(messages)}) (last message: `{messages[-1]['content'][:20]}...`) to `{model}`."
                    )
```
    
```
                res = requests.post(
                    endpoint,
                    json={
                        "model": model,
                        "max_tokens": max_tokens,
                        "temperature": (temperature if temperature > 1e-4 else 0),
                        "messages": messages,
                    },
                    headers={
                        "Authorization": f"Bearer {os.environ.get('TOGETHER_API_KEY')}",
                    },
                )
                if "error" in res.json():
                    logger.error(res.json())
                    if res.json()["error"]["type"] == "invalid_request_error":
                        logger.info("Input + output is longer than max_position_id.")
                        return None
```
    
                output = res.json()["choices"][0]["message"]["content"]
    
                break
    
```
            except Exception as e:
                logger.error(e)
                if DEBUG:
                    logger.debug(f"Msgs: `{messages}`")
```
    
                logger.info(f"Retry in {sleep_time}s..")
                time.sleep(sleep_time)
    
        if output is None:
    
            return output
    
        output = output.strip()
    
        if DEBUG:
            logger.debug(f"Output: `{output[:20]}...`.")
    
        return output
    
    
```
    def generate_together_stream(
        model,
        messages,
        max_tokens=2048,
        temperature=0.7,
    ):
        endpoint = "https://api.groq.com/openai/v1"###[modify]
        client = openai.OpenAI(
            api_key=os.environ.get("GROQ_API_KEY"), base_url=endpoint ###[modify]
        )
        endpoint = "https://api.groq.com/openai/chat/completions" ###[modify]
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature if temperature > 1e-4 else 0,
            max_tokens=max_tokens,
            stream=True,  # this time, we set stream=True
        )
```
    
        return response
    
    
```
    def generate_openai(
        model,
        messages,
        max_tokens=2048,
        temperature=0.7,
    ):
```
    
```
        client = openai.OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )
```
    
        for sleep_time in [1, 2, 4, 8, 16, 32]:
            try:
    
```
                if DEBUG:
                    logger.debug(
                        f"Sending messages ({len(messages)}) (last message: `{messages[-1]['content'][:20]}`) to `{model}`."
                    )
```
    
```
                completion = client.chat.completions.create(
                    model=model,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
                output = completion.choices[0].message.content
                break
```
    
```
            except Exception as e:
                logger.error(e)
                logger.info(f"Retry in {sleep_time}s..")
                time.sleep(sleep_time)
```
    
        output = output.strip()
    
        return output
    
    
```
    def inject_references_to_messages(
        messages,
        references,
    ):
```
    
        messages = copy.deepcopy(messages)
    
        system = f"""You have been provided with a set of responses from various open-source models to the latest user query. Your task is to synthesize these responses into a single, high-quality response. It is crucial to critically evaluate the information provided in these responses, recognizing that some of it may be biased or incorrect. Your response should not simply replicate the given answers but should offer a refined, accurate, and comprehensive reply to the instruction. Ensure your response is well-structured, coherent, and adheres to the highest standards of accuracy and reliability.
    
    Responses from models:"""
    
        for i, reference in enumerate(references):
    
            system += f"\n{i+1}. {reference}"
    
        if messages[0]["role"] == "system":
    
            messages[0]["content"] += "\n\n" + system
    
        else:
    
            messages = [{"role": "system", "content": system}] + messages
    
        return messages
    
    
```
    def generate_with_references(
        model,
        messages,
        references=[],
        max_tokens=2048,
        temperature=0.7,
        generate_fn=generate_together,
    ):
```
    
        if len(references) > 0:
    
            messages = inject_references_to_messages(messages, references)
    
```
        return generate_fn(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
```
    
