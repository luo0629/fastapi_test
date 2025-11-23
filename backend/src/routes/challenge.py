from fastapi import APIRouter,Depends,HTTPException,Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database.db import(get_challenge_quota,get_user_challenges,create_challenge,create_challenge_quota,reset_quota_if_needed)

from ..utils import authenticate_and_get_user_details
from ..database.models import get_db
import json
from datetime import datetime

router=APIRouter()


# 定义一个 Pydantic 模型，用于接收创建或查询 Challenge 的请求数据
class ChallengeRequest(BaseModel):
    # 定义字段 difficulty，类型为字符串
    difficulty: str  

    # 配置模型的额外信息
    class Config:
        # json_schema_extra 用于在生成的 OpenAPI 文档中提供示例
        # 这里给出了一个字段示例，方便前端或测试工具参考
        json_schema_extra = {
            "example": {
                "difficulty": "easy"  # 请求示例中 difficulty 的值
            }
        }



#生成挑战的接口
@router.post("/generate-challenge")
async def generate_challenge(request:ChallengeRequest,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request)
        user_id=user_details.get('user_id') 

        quota=get_challenge_quota(db,user_id)
        if not quota:
            quota=create_challenge_quota(db,user_id)
        quota=reset_quota_if_needed(db,quota)

        if quota.quota_remaining<=0:
            raise HTTPException(status_code=429,detail="Quota exhausted")

        challenge_data=None

        #TODO:生成挑战

        quota.quota_remaining-=1
        db.commit()

        return challenge_data   

    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))


#获取历史挑战的接口
@router.get("/my-history")
async def my_history(request:Request,db:Session=Depends(get_db)):
    user_details=authenticate_and_get_user_details(request)
    user_id=user_details.get('user_id')

    challenges=get_user_challenges(db,user_id)
    return {"challenges":challenges}


#获取当前配额状态的接口
@router.get("/quota")
async def get_quota(request:Request,db:Session=Depends(get_db)):
    user_details=authenticate_and_get_user_details(request)
    user_id=user_details.get('user_id')
    quota=get_challenge_quota(db,user_id)
    if not quota:
        return{"user_id":user_id,
               "quota_remaining":0,
               "last_reset_time":datetime.now()}
    
    quota=reset_quota_if_needed(db,quota)
    return quota
