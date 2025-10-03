---
layout: single
title: "Mistral-Large-Instruct-2411 & Pixtral-Large-Instruct-2411"
sidebar:
  nav: "docs"
date: 2024-11-20 00:00:00 +0800
categories: [Fine-Tuning, LLM, RAG, Vision]
tags: [AI, LangFlow, Mistral, RAG]
classes: wide
author_profile: true
---


#  Mistral-Large-Instruct-2411 & Pixtral-Large-Instruct-2411 

### 

Name  |  Number of parameters  |  Number of active parameters  |  Min. GPU RAM for inference (GB)   
---|---|---|---  
Mistral-Large-Instruct-2411  |  123B  |  123B  |  250   
Pixtral-Large-Instruct-2411  |  124B  |  124B  |  250   
  
###  LangFlow 
    
    
    python -m pip install langflow
    
    python -m langflow run
    

###  API 
    
    
```
    curl --location "https://api.mistral.ai/v1/chat/completions" \
         --header 'Content-Type: application/json' \
         --header 'Accept: application/json' \
         --header "Authorization: Bearer $MISTRAL_API_KEY" \
         --data '{
        "model": "mistral-large-latest",
        "messages": [{"role": "user", "content": "Who is the most renowned French painter?"}]
      }'
```

###  API 
    
    
    !pip install mistralai
    
    from google.colab import userdata
    
    from mistralai import Mistral
    api_key = userdata.get('MISTRAL_API_KEY')
    
    
    model = "mistral-large-latest"
    
    client = Mistral(api_key=api_key)
    
```
    chat_response = client.chat.complete(
        model=model,
        messages=[{"role":"user", "content":"你的知识库/训练数据截止日期?"}]
    )
```
    
    print(chat_response.choices[0].message.content)

###  代码 
    
    
    import os
    from mistralai import Mistral
    
    # Retrieve the API key from environment variables
    api_key = userdata.get('MISTRAL_API_KEY')
    
    # Specify model
    model = "pixtral-large-latest"
    
    # Initialize the Mistral client
    client = Mistral(api_key=api_key)
    
```
    # Define the messages for the chat
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "图中是否有一个穿着黑色无袖上衣、红色裤子的女性？如果有，请详细描述她的体貌特征(衣着、体态、肤色、发型、是否佩戴装饰品等)。"
                    #  "text": "图中是否有一个穿着长袖的小男孩，看上去七八岁左右"
                    # "text": "请详细描述图中每个人物的体貌特征。"
```
                    
    
```
                },
                {
                    "type": "image_url",
                    "image_url": "https://cdn.pixabay.com/photo/2013/10/09/20/47/large-193357_1280.jpg"
                }
            ]
        }
    ]
```
    
```
    # Get the chat response
    chat_response = client.chat.complete(
        model=model,
        messages=messages
    )
```
    
    # Print the content of the response
    print(chat_response.choices[0].message.content)
    

##  **👉👉👉如有问题或请联系我的徽信 stoeng**

##  **🔥🔥🔥本项目代码由AI超元域频道制作，观看更多大模型微调视频请访问我的频道⬇**

###  **👉👉👉** **[ 我的哔哩哔哩频道 ](<https://space.bilibili.com/3493277319825652>) **

###  **👉👉👉** **[ 我的YouTube频道 ](<https://www.youtube.com/@AIsuperdomain>) **

###  **👉👉👉我的开源项目** **[ https://github.com/win4r/AISuperDomain ](<https://github.com/win4r/AISuperDomain>) **
    
    
    !pip install bert-score
    
    import torch
    from bert_score import BERTScorer
    
```
    def calculate_bertscore(references, candidates, model_type="bert-base-uncased", lang="en"):
        """
        使用BERTScore计算参考文本和候选文本之间的相似度
```
    
```
        参数:
        references: 参考文本列表
        candidates: 候选（生成）文本列表
        model_type: 使用的BERT模型类型
        lang: 文本语言
```
    
```
        返回:
        包含精确度(P)、召回率(R)和F1分数的字典
        """
        # 初始化BERTScorer
        scorer = BERTScorer(model_type=model_type, lang=lang)
```
    
        # 计算BERTScore
        P, R, F1 = scorer.score(candidates, references)
    
```
        # 转换为Python原生数据类型
        P = P.tolist()
        R = R.tolist()
        F1 = F1.tolist()
```
    
```
        return {
            "Precision": P,
            "Recall": R,
            "F1": F1
        }
```
    
```
    # 示例使用
    references = [
        "The cat is sitting on the mat.",
        "A dog is playing in the park."
    ]
    candidates = [
        "A feline is resting on a rug.",
        "A canine is running on grass in a park."
    ]
```
    
    # 计算BERTScore
    results = calculate_bertscore(references, candidates)
    
```
    # 打印结果
    for i, (ref, cand) in enumerate(zip(references, candidates)):
        print(f"Example {i+1}:")
        print(f"Reference: {ref}")
        print(f"Candidate: {cand}")
        print(f"Precision: {results['Precision'][i]:.4f}")
        print(f"Recall: {results['Recall'][i]:.4f}")
        print(f"F1: {results['F1'][i]:.4f}")
        print()
```
    
```
    # 计算平均分数
    avg_precision = sum(results['Precision']) / len(results['Precision'])
    avg_recall = sum(results['Recall']) / len(results['Recall'])
    avg_f1 = sum(results['F1']) / len(results['F1'])
```
    
```
    print("Average Scores:")
    print(f"Precision: {avg_precision:.4f}")
    print(f"Recall: {avg_recall:.4f}")
    print(f"F1: {avg_f1:.4f}")
```
    
    
```
    import os
    from mistralai import Mistral
    import torch
    from bert_score import BERTScorer
    from typing import List, Dict, Union, Tuple
    from dataclasses import dataclass
    from datetime import datetime
```
    
```
    @dataclass
    class MatchDetails:
        """匹配详情数据类"""
        score: float
        threshold: float
        difference: float
        status: str
        confidence: str
```
    
```
    class ImageSemanticAnalyzer:
        def __init__(self, 
                     api_key: str = None, 
                     model_type: str = "bert-base-chinese", 
                     lang: str = "zh",
                     threshold: Dict[str, float] = None,
                     log_results: bool = True):
            """
            初始化图像语义分析器
```
            
```
            参数:
            api_key: Mistral API密钥
            model_type: BERT模型类型
            lang: 文本语言
            threshold: 匹配阈值字典
            log_results: 是否记录分析结果
            """
            self.threshold = threshold or {
                'precision': 0.7,
                'recall': 0.7,
                'f1': 0.7
            }
```
            
            self.log_results = log_results
            self.api_key = userdata.get('MISTRAL_API_KEY')
            
```
            if not self.api_key:
                raise ValueError(
                    "No API key provided. Please either pass the API key directly "
                    "or set the MISTRAL_API_KEY environment variable."
                )
```
            
```
            try:
                self.model = "pixtral-large-latest"
                self.client = Mistral(api_key=self.api_key)
                self.scorer = BERTScorer(model_type=model_type, lang=lang)
            except Exception as e:
                raise Exception(f"Failed to initialize Mistral client: {str(e)}")
```
        
```
        def analyze_image(self, prompt: str, image_url: str) -> str:
            """分析图像并返回AI的描述"""
            try:
                messages = [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            },
                            {
                                "type": "image_url",
                                "image_url": image_url
                            }
                        ]
                    }
                ]
```
                
```
                chat_response = self.client.chat.complete(
                    model=self.model,
                    messages=messages
                )
```
                
                return chat_response.choices[0].message.content
                
            except Exception as e:
                raise Exception(f"Error during image analysis: {str(e)}")
        
```
        def calculate_semantic_similarity(self, 
                                       prompt: str, 
                                       ai_response: str) -> Tuple[Dict[str, float], bool]:
            """计算语义相似度并判断是否匹配目标"""
            try:
                references = [prompt]
                candidates = [ai_response]
```
                
                P, R, F1 = self.scorer.score(candidates, references)
                
```
                scores = {
                    "Precision": P[0].item(),
                    "Recall": R[0].item(),
                    "F1": F1[0].item()
                }
```
                
```
                is_match = (
                    scores["Precision"] >= self.threshold['precision'] and
                    scores["Recall"] >= self.threshold['recall'] and
                    scores["F1"] >= self.threshold['f1']
                )
```
                
                return scores, is_match
                
            except Exception as e:
                raise Exception(f"Error calculating semantic similarity: {str(e)}")
        
```
        def analyze_match_details(self, similarity_scores: Dict[str, float]) -> Dict[str, MatchDetails]:
            """分析匹配细节，提供每个指标的详细评估"""
            analysis = {}
```
            
```
            for metric, score in similarity_scores.items():
                threshold = self.threshold[metric.lower()]
                difference = score - threshold
                status = "通过" if score >= threshold else "未通过"
                confidence = self._calculate_confidence(difference)
```
                
```
                analysis[metric] = MatchDetails(
                    score=score,
                    threshold=threshold,
                    difference=difference,
                    status=status,
                    confidence=confidence
                )
```
            
            return analysis
        
```
        def _calculate_confidence(self, difference: float) -> str:
            """根据与阈值的差距计算置信度级别"""
            if difference >= 0.1:
                return "高"
            elif difference >= 0.05:
                return "中"
            elif difference >= 0:
                return "低"
            else:
                return "不满足"
```
        
```
        def log_result(self, result: Dict) -> None:
            """记录分析结果到文件"""
            if not self.log_results:
                return
```
                
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"analysis_log_{timestamp}.txt"
            
```
            try:
                with open(filename, "w", encoding="utf-8") as f:
                    f.write("=== 图像分析结果 ===\n\n")
                    f.write(f"时间: {timestamp}\n\n")
```
                    
                    f.write("AI响应:\n")
                    f.write(f"{result['ai_response']}\n\n")
                    
```
                    f.write("语义相似度分数:\n")
                    for metric, score in result['similarity_scores'].items():
                        f.write(f"{metric}: {score:.4f}\n")
```
                    
```
                    f.write("\n详细匹配分析:\n")
                    for metric, details in result['match_analysis'].items():
                        f.write(f"\n{metric}分析:\n")
                        f.write(f"  得分: {details.score:.4f}\n")
                        f.write(f"  阈值: {details.threshold:.4f}\n")
                        f.write(f"  差距: {details.difference:.4f}\n")
                        f.write(f"  状态: {details.status}\n")
                        f.write(f"  置信度: {details.confidence}\n")
```
                    
                    f.write("\n目标匹配结果:\n")
                    f.write(f"是否匹配目标: {'是' if result['is_target_match'] else '否'}\n")
                    
            except Exception as e:
                print(f"Warning: Failed to log results: {str(e)}")
        
```
        def analyze_and_evaluate(self, prompt: str, image_url: str) -> Dict:
            """完整的分析流程：包含详细的匹配分析"""
            try:
                ai_response = self.analyze_image(prompt, image_url)
                similarity_scores, is_match = self.calculate_semantic_similarity(prompt, ai_response)
                match_analysis = self.analyze_match_details(similarity_scores)
```
                
```
                result = {
                    "ai_response": ai_response,
                    "similarity_scores": similarity_scores,
                    "is_target_match": is_match,
                    "match_analysis": match_analysis
                }
```
                
                if self.log_results:
                    self.log_result(result)
                
                return result
                
            except Exception as e:
                raise Exception(f"Error in analysis and evaluation: {str(e)}")
    
```
    def format_analysis_result(result: Dict) -> str:
        """格式化分析结果为易读的字符串"""
        output = []
```
        
        output.append("AI响应:")
        output.append(result["ai_response"])
        
```
        output.append("\n语义相似度分数:")
        for metric, score in result['similarity_scores'].items():
            output.append(f"{metric}: {score:.4f}")
```
        
```
        output.append("\n详细匹配分析:")
        for metric, details in result['match_analysis'].items():
            output.append(f"\n{metric}分析:")
            output.append(f"  得分: {details.score:.4f}")
            output.append(f"  阈值: {details.threshold:.4f}")
            output.append(f"  差距: {details.difference:.4f}")
            output.append(f"  状态: {details.status}")
            output.append(f"  置信度: {details.confidence}")
```
        
        output.append("\n目标匹配结果:")
        output.append(f"是否匹配目标: {'是' if result['is_target_match'] else '否'}")
        
```
        if result['is_target_match']:
            output.append("目标匹配成功！")
            min_confidence = min(
                details.confidence 
                for details in result['match_analysis'].values()
            )
            output.append(f"整体置信度: {min_confidence}")
        else:
            output.append("未达到匹配阈值，建议检查以下方面:")
            failed_metrics = [
                metric for metric, details in result['match_analysis'].items()
                if details.status == "未通过"
            ]
            output.extend([f"  - {metric}" for metric in failed_metrics])
```
        
        return "\n".join(output)
    
```
    def main():
        """主函数：演示如何使用ImageSemanticAnalyzer"""
        try:
            # 设置自定义阈值
            custom_threshold = {
                'precision': 0.7,
                'recall': 0.7,
                'f1': 0.7
            }
```
            
```
            # 初始化分析器
            api_key = "your-api-key-here"  # 替换为实际的API密钥
            analyzer = ImageSemanticAnalyzer(
                api_key=api_key, 
                threshold=custom_threshold,
                log_results=True  # 启用结果记录
            )
```
            
```
            # 测试prompt和图片URL
            prompt = "图中是否有一个穿着黑色无袖上衣、红色裤子的女性？如果有，请详细描述她的体貌特征。"
            image_url = "https://cdn.pixabay.com/photo/2013/10/09/20/47/large-193357_1280.jpg"
```
            
            # 进行分析
            result = analyzer.analyze_and_evaluate(prompt, image_url)
            
```
            # 格式化并打印结果
            formatted_result = format_analysis_result(result)
            print(formatted_result)
```
            
        except Exception as e:
            print(f"发生错误: {str(e)}")
    
    if __name__ == "__main__":
        main()
    
    
    !pip install mistralai torch bert-score matplotlib seaborn numpy
    
```
    import os
    from mistralai import Mistral
    import torch
    from bert_score import BERTScorer
    from typing import List, Dict, Union, Tuple
    from dataclasses import dataclass
    from datetime import datetime
    import numpy as np
    import matplotlib.pyplot as plt
    import seaborn as sns
    from pathlib import Path
```
    
```
    @dataclass
    class MatchDetails:
        """匹配详情数据类"""
        score: float
        threshold: float
        difference: float
        status: str
        confidence: str
```
    
```
    class ImageSemanticAnalyzer:
        def __init__(self, 
                     api_key: str = None, 
                     model_type: str = "bert-base-chinese", 
                     lang: str = "zh",
                     threshold: Dict[str, float] = None,
                     log_results: bool = True,
                     output_dir: str = "analysis_results"):
            """初始化图像语义分析器"""
            self.threshold = threshold or {
                'precision': 0.7,
                'recall': 0.7,
                'f1': 0.7
            }
```
            
```
            self.log_results = log_results
            self.output_dir = Path(output_dir)
            if log_results:
                self.output_dir.mkdir(parents=True, exist_ok=True)
```
                
```
            self.api_key = userdata.get('MISTRAL_API_KEY')
            if not self.api_key:
                raise ValueError(
                    "No API key provided. Please either pass the API key directly "
                    "or set the MISTRAL_API_KEY environment variable."
                )
```
            
```
            try:
                self.model = "pixtral-large-latest"
                self.client = Mistral(api_key=self.api_key)
                self.scorer = BERTScorer(model_type=model_type, lang=lang)
```
                
```
                # 设置matplotlib中文字体
                plt.rcParams['font.sans-serif'] = ['SimHei']
                plt.rcParams['axes.unicode_minus'] = False
```
                
            except Exception as e:
                raise Exception(f"Failed to initialize Mistral client: {str(e)}")
    
```
        def analyze_image(self, prompt: str, image_url: str) -> str:
            """分析图像并返回AI的描述"""
            try:
                messages = [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            },
                            {
                                "type": "image_url",
                                "image_url": image_url
                            }
                        ]
                    }
                ]
```
                
```
                chat_response = self.client.chat.complete(
                    model=self.model,
                    messages=messages
                )
```
                
                return chat_response.choices[0].message.content
                
            except Exception as e:
                raise Exception(f"Error during image analysis: {str(e)}")
    
```
        def calculate_semantic_similarity(self, prompt: str, ai_response: str) -> Tuple[Dict[str, float], bool]:
            """计算语义相似度并判断是否匹配目标"""
            try:
                references = [prompt]
                candidates = [ai_response]
```
                
                P, R, F1 = self.scorer.score(candidates, references)
                
```
                scores = {
                    "Precision": P[0].item(),
                    "Recall": R[0].item(),
                    "F1": F1[0].item()
                }
```
                
```
                is_match = (
                    scores["Precision"] >= self.threshold['precision'] and
                    scores["Recall"] >= self.threshold['recall'] and
                    scores["F1"] >= self.threshold['f1']
                )
```
                
                return scores, is_match
                
            except Exception as e:
                raise Exception(f"Error calculating semantic similarity: {str(e)}")
    
```
        def analyze_match_details(self, similarity_scores: Dict[str, float]) -> Dict[str, MatchDetails]:
            """分析匹配细节，提供每个指标的详细评估"""
            analysis = {}
```
            
```
            for metric, score in similarity_scores.items():
                threshold = self.threshold[metric.lower()]
                difference = score - threshold
                status = "通过" if score >= threshold else "未通过"
                confidence = self._calculate_confidence(difference)
```
                
```
                analysis[metric] = MatchDetails(
                    score=score,
                    threshold=threshold,
                    difference=difference,
                    status=status,
                    confidence=confidence
                )
```
            
            return analysis
    
```
        def _calculate_confidence(self, difference: float) -> str:
            """根据与阈值的差距计算置信度级别"""
            if difference >= 0.1:
                return "高"
            elif difference >= 0.05:
                return "中"
            elif difference >= 0:
                return "低"
            else:
                return "不满足"
```
    
```
        def count_matched_features(self, ai_response: str, target_features: List[str]) -> Dict[str, Union[int, float, List[str]]]:
            """计算目标特征的匹配数量"""
            matched_features = []
            total_features = len(target_features)
```
            
```
            for feature in target_features:
                if feature.lower() in ai_response.lower():
                    matched_features.append(feature)
```
            
            match_count = len(matched_features)
            match_rate = match_count / total_features if total_features > 0 else 0
            
```
            return {
                "total_features": total_features,
                "matched_count": match_count,
                "match_rate": match_rate,
                "matched_features": matched_features,
                "unmatched_features": [f for f in target_features if f not in matched_features]
            }
```
    
```
        def visualize_results(self, result: Dict, timestamp: str) -> str:
            """生成分析结果的可视化报告"""
            plt.figure(figsize=(15, 10))
```
            
```
            # 1. 相似度分数条形图
            plt.subplot(2, 2, 1)
            scores = result['similarity_scores']
            sns.barplot(x=list(scores.keys()), y=list(scores.values()))
            plt.axhline(y=0.7, color='r', linestyle='--', label='阈值')
            plt.title('语义相似度分数')
            plt.ylim(0, 1)
```
            
```
            # 2. 置信度雷达图
            metrics = list(result['match_analysis'].keys())
            confidence_map = {'高': 3, '中': 2, '低': 1, '不满足': 0}
            confidence_scores = [confidence_map[result['match_analysis'][m].confidence] for m in metrics]
```
            
```
            angles = np.linspace(0, 2*np.pi, len(metrics), endpoint=False)
            confidence_scores.append(confidence_scores[0])
            angles = np.concatenate((angles, [angles[0]]))
```
            
```
            ax = plt.subplot(2, 2, 2, projection='polar')
            ax.plot(angles, confidence_scores)
            ax.fill(angles, confidence_scores, alpha=0.25)
            ax.set_xticks(angles[:-1])
            ax.set_xticklabels(metrics)
            plt.title('置信度分布')
```
            
```
            # 3. 特征匹配分析
            if 'feature_matches' in result:
                plt.subplot(2, 2, 3)
                match_data = result['feature_matches']
                plt.pie([match_data['matched_count'], 
                        len(match_data['unmatched_features'])],
                       labels=['已匹配', '未匹配'],
                       autopct='%1.1f%%')
                plt.title('特征匹配率')
```
            
```
            # 保存结果
            viz_path = self.output_dir / f'analysis_viz_{timestamp}.png'
            plt.suptitle(f'图像分析结果可视化 - {timestamp}')
            plt.tight_layout()
            plt.savefig(viz_path)
            plt.close()
```
            
            return str(viz_path)
    
```
        def log_result(self, result: Dict, timestamp: str) -> str:
            """记录分析结果到文件"""
            if not self.log_results:
                return ""
```
                
            log_path = self.output_dir / f'analysis_log_{timestamp}.txt'
            
```
            try:
                with open(log_path, "w", encoding="utf-8") as f:
                    f.write("=== 图像分析结果 ===\n\n")
                    f.write(f"时间: {timestamp}\n\n")
```
                    
                    f.write("AI响应:\n")
                    f.write(f"{result['ai_response']}\n\n")
                    
```
                    f.write("语义相似度分数:\n")
                    for metric, score in result['similarity_scores'].items():
                        f.write(f"{metric}: {score:.4f}\n")
```
                    
```
                    f.write("\n详细匹配分析:\n")
                    for metric, details in result['match_analysis'].items():
                        f.write(f"\n{metric}分析:\n")
                        f.write(f"  得分: {details.score:.4f}\n")
                        f.write(f"  阈值: {details.threshold:.4f}\n")
                        f.write(f"  差距: {details.difference:.4f}\n")
                        f.write(f"  状态: {details.status}\n")
                        f.write(f"  置信度: {details.confidence}\n")
```
                    
```
                    if 'feature_matches' in result:
                        f.write("\n特征匹配分析:\n")
                        feature_matches = result['feature_matches']
                        f.write(f"总特征数: {feature_matches['total_features']}\n")
                        f.write(f"已匹配数: {feature_matches['matched_count']}\n")
                        f.write(f"匹配率: {feature_matches['match_rate']*100:.1f}%\n")
```
                        
```
                        f.write("\n已匹配特征:\n")
                        for feature in feature_matches['matched_features']:
                            f.write(f"- {feature}\n")
```
                        
```
                        f.write("\n未匹配特征:\n")
                        for feature in feature_matches['unmatched_features']:
                            f.write(f"- {feature}\n")
```
                    
                    f.write("\n目标匹配结果:\n")
                    f.write(f"是否匹配目标: {'是' if result['is_target_match'] else '否'}\n")
                    
                return str(log_path)
                    
```
            except Exception as e:
                print(f"Warning: Failed to log results: {str(e)}")
                return ""
```
    
```
        def analyze_and_evaluate(self, prompt: str, image_url: str, target_features: List[str] = None) -> Dict:
            """完整的分析流程：包含特征匹配和可视化"""
            try:
                # 基本分析
                ai_response = self.analyze_image(prompt, image_url)
                similarity_scores, is_match = self.calculate_semantic_similarity(prompt, ai_response)
                match_analysis = self.analyze_match_details(similarity_scores)
```
                
```
                # 整合结果
                result = {
                    "ai_response": ai_response,
                    "similarity_scores": similarity_scores,
                    "is_target_match": is_match,
                    "match_analysis": match_analysis
                }
```
                
```
                # 特征匹配分析
                if target_features:
                    result['feature_matches'] = self.count_matched_features(
                        ai_response, 
                        target_features
                    )
```
                
                # 生成时间戳
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                
```
                # 记录和可视化
                if self.log_results:
                    log_path = self.log_result(result, timestamp)
                    viz_path = self.visualize_results(result, timestamp)
                    result['log_path'] = log_path
                    result['visualization_path'] = viz_path
```
                
                return result
                
            except Exception as e:
                raise Exception(f"Error in analysis and evaluation: {str(e)}")
    
```
    def format_analysis_result(result: Dict) -> str:
        """格式化分析结果为易读的字符串"""
        output = []
```
        
        output.append("AI响应:")
        output.append(result["ai_response"])
        
```
        output.append("\n语义相似度分数:")
        for metric, score in result['similarity_scores'].items():
            output.append(f"{metric}: {score:.4f}")
```
        
```
        output.append("\n详细匹配分析:")
        for metric, details in result['match_analysis'].items():
            output.append(f"\n{metric}分析:")
            output.append(f"  得分: {details.score:.4f}")
            output.append(f"  阈值: {details.threshold:.4f}")
            output.append(f"  差距: {details.difference:.4f}")
            output.append(f"  状态: {details.status}")
            output.append(f"  置信度: {details.confidence}")
```
        
```
        if 'feature_matches' in result:
            feature_matches = result['feature_matches']
            output.append("\n\n特征匹配分析:")
            output.append(f"总特征数: {feature_matches['total_features']}")
            output.append(f"已匹配数: {feature_matches['matched_count']}")
            output.append(f"匹配率: {feature_matches['match_rate']*100:.1f}%")
```
            
```
            output.append("\n已匹配特征:")
            for feature in feature_matches['matched_features']:
                output.append(f"- {feature}")
```
            
```
            output.append("\n未匹配特征:")
            for feature in feature_matches['unmatched_features']:
                output.append(f"- {feature}")
```
        
        output.append("\n目标匹配结果:")
        output.append(f"是否匹配目标: {'是' if result['is_target_match'] else '否'}")
        
```
        if result['is_target_match']:
            output.append("目标匹配成功！")
            min_confidence = min(
                details.confidence 
                for details in result['match_analysis'].values()
            )
            output.append(f"整体置信度: {min_confidence}")
        else:
            output.append("未达到匹配阈值，建议检查以下方面:")
            failed_metrics = [
                metric for metric, details in result['match_analysis'].items()
                if details.status == "未通过"
            ]
            output.extend([f"  - {metric}" for metric in failed_metrics])
```
        
```
        if 'log_path' in result:
            output.append(f"\n分析日志已保存至: {result['log_path']}")
        if 'visualization_path' in result:
            output.append(f"可视化结果已保存至: {result['visualization_path']}")
```
        
        return "\n".join(output)
    
```
    def main():
        try:
            # 设置自定义阈值
            custom_threshold = {
                'precision': 0.7,
                'recall': 0.7,
                'f1': 0.7
            }
```
            
            # 定义输出目录
            output_dir = "analysis_results"
            
```
            # 初始化分析器（使用环境变量中的API密钥）
            analyzer = ImageSemanticAnalyzer(
                threshold=custom_threshold,
                log_results=True,
                output_dir=output_dir
            )
```
            
```
            # 定义目标特征列表
            target_features = [
                "黑色无袖上衣",
                "红色裤子",
                "深色头发",
                "发髻",
                "棕色包",
                "浅色鞋子"
            ]
```
            
```
            # 测试prompt和图片URL
            prompt = "图中是否有一个穿着黑色无袖上衣、红色裤子的女性？如果有，请详细描述她的体貌特征。"
            image_url = "https://cdn.pixabay.com/photo/2013/10/09/20/47/large-193357_1280.jpg"
```
            
            # 进行分析
            result = analyzer.analyze_and_evaluate(prompt, image_url, target_features)
            
```
            # 格式化并打印结果
            formatted_result = format_analysis_result(result)
            print(formatted_result)
```
            
        except Exception as e:
            print(f"发生错误: {str(e)}")
    
    if __name__ == "__main__":
        main()
