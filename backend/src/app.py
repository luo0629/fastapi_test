#编写基础的FastAPI应用
from fastapi import FastAPI,Request,Response
from fastapi.middleware.cors import CORSMiddleware  #解决跨域请求问题
from clerk_backend_api import Clerk
import os
from .routes import challenge,webhooks

clerk_sdk=Clerk(bearer_auth=os.getenv("CLERK_API_KEY"))

app=FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                    )

#加载路由
app.include_router(challenge.router,prefix="/api")
app.include_router(webhooks.router,prefix="/webhooks")
