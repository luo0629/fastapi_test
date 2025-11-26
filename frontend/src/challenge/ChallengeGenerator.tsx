import "react";
import { useState,useEffect } from "react";
import { MCQChallenge } from "./MCQChallenge";
import { api } from "../utils/api";
import type { Challenge } from "../utils/types";

interface QuotaType {
    id?: number;  // 如果 id 可选，且为数字
    user_id: string;  // 用户ID，字符串类型
    quota_remaining: number;  // 剩余挑战次数，数字类型
    last_reset_date: Date;  // 最近重置的时间，日期类型
}


//用户挑战表单
export function ChallengeGenerator() {
    const[challenge,setChallenge]=useState<Challenge | null>(null);
    const[isLoading,setIsLoading]=useState(false);
    const[error,setError]=useState<string | null>(null);
    //设置难度
    const[difficulty,setDifficulty]=useState("easy");
    const{makeRequest}=api();
    
    const[quota,setQuota]=useState<QuotaType>();

    useEffect(()=>{
        fetchQuota();
    },[])

    //获取用户配额
    const fetchQuota=async()=>{
        try{
            const data=await makeRequest<QuotaType>("quota");
            setQuota(data)
        }catch(err){
            console.log(err)
        }
    }
    //生成挑战
    const generateChallenge=async()=>{
        setIsLoading(true)
        setError(null)

        try{
            const data=await makeRequest<Challenge>("generate-challenge",{
                method:"POST",
                body:JSON.stringify({difficulty})
            })
            setChallenge(data)
            fetchQuota()
        }catch(err:any){
            setError(err.message||"生成挑战失败")
        }finally{
            setIsLoading(false)
        }
    }
    //计算下次用户额度重置时间
    const getNextResetTime=()=>{
        if (!quota?.last_reset_date) return null
        const resertDate=new Date(quota.last_reset_date)
        resertDate.setHours(resertDate.getHours()+24)
        return resertDate
    }


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
                {/* 标题区域 */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
                    <h1 className="text-3xl font-bold text-white text-center">挑战生成器</h1>
                </div>

                <div className="p-8 space-y-8">
            {/* 配额显示区域 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600">今日剩余挑战次数</p>
                            <p className="text-2xl font-bold text-slate-900">{quota?.quota_remaining || 0}</p>
                        </div>
                    </div>
                    {quota?.quota_remaining === 0 && (
                        <div className="text-right">
                            <p className="text-sm font-medium text-orange-600">额度已用完</p>
                            <p className="text-xs text-slate-500">下次重置：{getNextResetTime()?.toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>
            {/* 难度选择表单 */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <label htmlFor="difficulty" className="block text-sm font-semibold text-slate-700 mb-3">
                    选择挑战难度
                </label>
                <div className="relative">
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e)=>setDifficulty(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 pr-10 text-base font-medium text-slate-900 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer hover:border-slate-300"
                    >
                        <option value="easy">🟢 简单模式</option>
                        <option value="medium">🟡 中等模式</option>
                        <option value="hard">🔴 困难模式</option>
                    </select>
                    {/* 自定义下拉箭头 */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">选择适合您技能水平的挑战难度</p>
            </div>
            {/* 生成按钮 */}
            <div className="flex justify-center">
                <button
                    onClick={generateChallenge}
                    // disabled={isLoading || quota?.quota_remaining===0}
                    disabled={false}
                    className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 min-w-[200px]"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>生成挑战中...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>生成挑战</span>
                        </div>
                    )}
                </button>
            </div>
            {/* 错误信息 */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}
                      {/* 挑战显示区域 */}
            {challenge && (
                <div className="border-t border-slate-200 pt-8">
                    <MCQChallenge challenge={challenge} showExplanation={false} />
                </div>
            )}
                </div>
            </div>
        </div>
    )
}