import os
import json
from openai import OpenAI
from typing import Dict,Any

client=OpenAI(api_key=os.getenv("OPENAI_API_KEY"),base_url="https://api.z.ai/api/paas/v4/")

#AI生成挑战函数
def generate_challenge_with_ai(difficulty:str)->Dict[str,Any]:
    #提示词
    system_prompt = """你是一位专业的编程挑战题目创建专家。
        你的任务是生成一个包含多项选择题的编程问题。
        题目的难度应该符合指定的难度级别。

        简单题目：侧重于基础语法、简单操作或常见的编程概念。
        中等题目：涵盖中级概念，如数据结构、算法或语言特性。
        困难题目：包含高级主题、设计模式、优化技术或复杂算法。

        请按照以下JSON结构返回题目：
        {
            "title": "问题标题",
            "options": ["选项1", "选项2", "选项3", "选项4"],
            "correct_answer_id": 0, // 正确答案的索引 (0-3)
            "explanation": "关于正确答案为何正确的详细解释"
        }

        确保所有选项都看似合理，但其中只有一个选项是明确正确的。"""
    try:
        response=client.chat.completions.create(
            model="glm-4.6",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"生成一个{difficulty} 难度的编程挑战"}
            ],
            response_format={"type":"json_object"},
            temperature=0.7
        )
        #获取响应的内容
        content=response.choices[0].message.content
        challenge_data=json.loads(content)
        
        #对返回的json数据进行缺失值检验，防止出现所需项确实
        required_fields=["title","options","correct_answer_id","explanation"]
        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"缺少属性：{field}")
        
        return challenge_data
    except Exception as e:
        print(e)
        return{
            "title": "关于Python列表操作的题目",
            "options": [
                "list.append(x) - 在列表末尾添加元素x",
                "list.add(x) - 在列表末尾添加元素x", 
                "list.insert(x) - 在列表开头插入元素x",
                "list.push(x) - 在列表末尾压入元素x"
            ],
            "correct_answer_id": 0,
            "explanation": "在Python中，list.append(x)是向列表末尾添加元素的正确方法。list.add()不是列表的有效方法；list.insert()需要指定位置参数；list.push()不是Python列表的方法，而是其他语言如JavaScript中数组的方法。"
        }
        

