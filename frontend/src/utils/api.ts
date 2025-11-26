//编写发送clerk token的请求头
import { useAuth } from "@clerk/clerk-react";

// 定义 API 响应接口
interface ApiResponse<T> {
    data?: T;
    error?: string;
}

// 定义 API 错误接口
interface ApiError {
    detail: string;
}

export const api=()=>{
    const{getToken}=useAuth();

    const  makeRequest=async <T>(endpoint:string,options:RequestInit = {}): Promise<T>=>{
        const token=await getToken()
        console.log('Debug - Token obtained:', token ? 'Token exists' : 'No token')
        console.log('Debug - Token length:', token?.length || 0)
        const defaultOptions={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }

        const response=await fetch(`http://localhost:8000/api/${endpoint}`,{
            ...defaultOptions,
            ...options
        })

        if(!response.ok){
            const errorData: ApiError = await response.json().catch(() => ({} as ApiError));
            if (response.status===429){
                throw new Error("每日额度达标")
            }
            throw new Error(errorData?.detail||'一个错误')
        }

        // 返回 JSON 响应数据
        return await response.json() as T;
    }
    return{makeRequest}
}
