"""
前端：
    通过Clerk认证 产生JWT令牌
    会向后端发送这个jwt token
后端：
    与Clerk产生链接,来验证这个token的时效性
    方法:1.通过网络响应,向Clerk服务器验证(token验证)
         2.通过本地验证(不需要网络请求,通过公钥来验证token的合法性)
"""

from fastapi import Request, HTTPException
from clerk_backend_api import Clerk, AuthenticateRequestOptions
import os
from dotenv import load_dotenv

# 导入并加载 .env 文件中的环境变量
load_dotenv()

# 创建 Clerk SDK 实例，通过 API 密钥进行初始化
clerk_sdk = Clerk(api_key=os.getenv("CLERK_API_KEY"))

def authenticate_and_get_user_details(request):
    try:
        # 使用 Clerk SDK 对请求进行身份验证
        # AuthenticateRequestOptions 指定请求的有效来源
        # jwt_key 用于验证 JWT 令牌的有效性
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions=["http://localhost:5173"],  # 允许的请求来源
            jwt_key=os.getenv("JWT_KEY")  # 从环境变量中获取 JWT 密钥
        )
        
        # 如果请求未通过身份验证（即未登录），返回 401 错误
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="无效的令牌")
        
        #获取登录的用户id
        user_id=request_state.payload.get("sub")

        #这样不仅验证了令牌的时效性，还获取了发送请求的用户身份
        return {"user_id":user_id}
    
    except Exception as e:
        # 如果发生任何异常，返回 500 错误，表示无效请求
        raise HTTPException(status_code=500, detail=str(e))