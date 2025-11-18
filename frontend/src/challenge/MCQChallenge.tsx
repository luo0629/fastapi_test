import "react";
import { useState } from "react";
import "./MCQChallenge.css";

//JSON数据形式
// {
//     content:"",
//     option:[],
//     correctAnswer:0,
//     explanation:""
// }


//多选挑战组件
//接收挑战数据和是否显示解释作为属性
export function MCQChallenge({challenge,showExplanation=false}:{challenge:any,showExplanation:boolean}) {
    //记录用户选择的答案
    const [selectedOptions,setSelectedOptions]=useState<null|number>(null);
    //是否显示解释
    const [shouldShowExplanation,setShouldShowExplanation]=useState<boolean>(showExplanation);

    //去报选项使用的是JSON形式
    const options=typeof challenge.options==="string"?JSON.parse(challenge.options):challenge.options;

    //处理选项选择
    const handleOptionSelect=(index:number)=>{
        if (selectedOptions !==null) return; //已经选择过答案
        setSelectedOptions(index);
        setShouldShowExplanation(true);
    }

    //获取选项的样式类
    const getOptionClass=(index:number)=>{
        //基础类
        let classes = "option-base";

        //如果未选择过答案，返回默认样式
        if (selectedOptions === null) {
            return classes + " option-unselected";
        }

        //选项正确就返回正确样式
        if(index == challenge.correct_answer_id){
            return classes + " option-correct";
        }

        //选项错误就返回错误样式
        if(index === selectedOptions && index !== challenge.correct_answer_id){
            return classes + " option-wrong";
        }

        //其他选项（未选择且未选中的选项）
        return classes + " option-disabled";
    }

    return (
        <div className="challenge-display">
            <div className="challenge-header">
                <div className="difficulty-badge">
                    <span className="difficulty-icon">⚡</span>
                    <span className="difficulty-text">难度：{challenge.difficulty}</span>
                </div>
                <h2 className="challenge-title">{challenge.title}</h2>
            </div>

            <div className="options-container">
                {options.map((option,index)=>(
                    <div className={getOptionClass(index)} key={index} onClick={()=>handleOptionSelect(index)}>
                        <div className="option-content">
                            <span className="option-marker">{String.fromCharCode(65 + index)}</span>
                            <span className="option-text">{option}</span>
                        </div>
                        {selectedOptions !== null && index === challenge.correct_answer_id && (
                            <div className="correct-indicator">✓</div>
                        )}
                        {selectedOptions !== null && index === selectedOptions && index !== challenge.correct_answer_id && (
                            <div className="wrong-indicator">✗</div>
                        )}
                    </div>
                ))}
            </div>

            {shouldShowExplanation && selectedOptions!==null && (
                <div className="explanation-container">
                    <div className="explanation-header">
                        <div className="explanation-icon">💡</div>
                        <h3 className="explanation-title">解析</h3>
                    </div>
                    <div className="explanation-content">
                        <p>{challenge.explanation}</p>
                    </div>
                </div>
            )}
        </div>
    )
}