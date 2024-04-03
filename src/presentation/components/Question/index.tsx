import "@/presentation/components/components.css"

import React, { useState } from "react"
import { blank } from "@/app/types"

export default function Question(props: any) {
    
    const [isVisible, setIsVisible] = useState(true);

    const handleChange = (e: any) => {
        const value = e.target.value
        props.onChange(value)
    }

    const hideElement = () => {
        setIsVisible(false)
    }

    const splittedQuestion = props.question.split(blank);

    const highlightedQuote = splittedQuestion.map((part:any, index:any) => (
        <React.Fragment key={index}>
            {part}
            {index < splittedQuestion.length - 1 && (
            <span className="text-highlight">{props.answer[index]}</span>
            )}
        </React.Fragment>
        ))


    switch (props.type) {
        case "result":
            return (
                <div className="component_question_container">
                    <div className="question_title_text">{props.questionTitle}.</div>
                    <div className="question_text_alt">
                    다음 () 안에 들어갈 단어로 적절한 것은? <br></br> {highlightedQuote}
                    </div>
                </div>
            )
        case "suggested":
            return (
                isVisible && (
                    <div className="component_question_container">
                        <div className="question_title_text">{props.questionTitle}.</div>
                        <span style={{whiteSpace: 'pre'}} className="question_text">{props.question}</span>
                        <div>
                            <div className="hf gap8">
                                <button className="question_button">빈칸 옮기기</button>
                                <button className="question_button" onClick={hideElement}>삭제하기<img src="../../assets/image/delete_icon.webp" alt= "delete" className="delete_icon"/></button>
                            </div>
                        </div>
                    </div>
                )
            )
        case "response":
            return (
                <div className="component_question_container">
                    <div className="question_title_text">{props.questionTitle}.</div>
                    <span style={{whiteSpace: 'pre'}} className="question_text">{props.question}</span>
                    <input
                        type="text"
                        name="userAnswer"
                        className="question_inputfield"
                        placeholder={props.placeholder || ""}
                        onChange={handleChange}
                        defaultValue=""
                    />
                </div>
            )
        default:
    }
}