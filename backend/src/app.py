#编写基础的FastAPI应用
from fastapi import FastAPI,Request,Response
from fastapi.middleware.cors import CORSMiddleware  #解决跨域请求问题
from clerk_backend_api import Clerk
import os

clerk_sdk=Clerk(api_key=os.getenv("CLERK_API_KEY"))

app=FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                    )
