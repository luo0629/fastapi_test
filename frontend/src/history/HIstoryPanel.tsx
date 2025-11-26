import "react";
import { useState,useEffect } from "react";
import { MCQChallenge } from "../challenge/MCQChallenge";
import "./HistoryPanel.css";
import { api } from "../utils/api";

export function HistoryPanel() {
    const[history,setHistory]=useState<any[]>([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState("");
    const {makeRequest}=api();
    //组件渲染完后获取历史记录
    useEffect(()=>{
        fetchHistory();
    },[]);

    //获取历史记录
    const fetchHistory=async()=>{
        setIsLoading(true);
        setError("");

        try{
            const data:any=await makeRequest("my-history")
            setHistory(data.challenges)
        }catch(error){
            setError("加载历史记录失败")
        }finally{
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="history-loading">
                <div className="loading-spinner"></div>
                <p>正在加载历史记录...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="history-error">
                <div className="error-icon">⚠️</div>
                <h3>加载失败</h3>
                <p>{error}</p>
                <button className="retry-button" onClick={fetchHistory}>
                    <span className="retry-icon">🔄</span>
                    重试
                </button>
            </div>
        );
    }

    return (
        <div className="history-panel">
            <div className="history-header">
                <h2 className="history-title">
                    <span className="history-icon">📚</span>
                    历史记录
                </h2>
                <div className="history-count">
                    共 {history.length} 条记录
                </div>
            </div>

            {history.length === 0 ? (
                <div className="history-empty">
                    <div className="empty-icon">📝</div>
                    <h3>暂无历史记录</h3>
                    <p>开始挑战吧！你的历史记录会显示在这里</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map((challenge, index) => (
                        <div className="history-item" key={challenge.id}>
                            <div className="history-item-header">
                                <span className="history-item-number">#{index + 1}</span>
                                <span className="history-item-date">
                                    {new Date(challenge.createdAt || Date.now()).toLocaleDateString('zh-CN')}
                                </span>
                            </div>
                            <MCQChallenge challenge={challenge} showExplanation />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}