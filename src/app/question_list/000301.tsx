import "./question_list.css"
import React, { useState, useEffect } from "react"

import ModifyQuestionUseCase from "@/domain/use_case/modify_question_use_case"
import Question from "@/presentation/components/Question"
import FixedButton from "@/presentation/components/fixed_button"
import Header from "@/presentation/components/Header"

// props로 questionList[],rawText, quoteList[], questionNum, blankNum 필요
export default function QuestionListComponent({ questionList, rawText, quoteList, questionNum, blankNum }: { questionList: string[], rawText: string, quoteList: string[], questionNum: number, blankNum: number }) {
    const modifyQuestionUseCase = new ModifyQuestionUseCase()
    const [questions, setQuestions] = useState<string[]>([]);
    const [quotes, setQuotes] = useState<string[]>([]);
    
    useEffect(() => {
        setQuestions(questionList)
    }, [questionList])

    useEffect(() => {
        setQuotes(quoteList)
    }, [quoteList])

    const handleDelete = (index: number) => {
        setQuestions(currentQuestions =>
            currentQuestions.filter((_, questionIndex) => questionIndex !== index)
        )
        setQuotes(currentQuotes =>
            currentQuotes.filter((_, quoteIndex) => quoteIndex !== index)
        )
    }

    return (
        <div>
            <div className="header_container"><Header progress={3}/></div>
            <div className="question_list_container">
                <div className="title_text">문제를 확인해주세요</div>
                {questions.map((question: string, index: number) => (
                    <Question
                        key={index}
                        type="suggested"
                        questionTitle={`질문 ${index + 1}`}
                        question={question}
                        onClick={() => modifyQuestionUseCase.relocateBlank(index, blankNum, quoteList)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}
            </div>
            <div className="fixed_button_container">
                <FixedButton
                    button = "double"
                    background1 = "red"
                    background2 = "red"
                    type1 = "main"
                    type2 = "main"
                    text1 = "다시 생성하기"
                    text2 = "시작하기"
                    onClick1={modifyQuestionUseCase.recreateQuestion(rawText, questionNum, quoteList)}
                    //onClick2=00030101페이지로 이동
                />
            </div>
        </div>
    )
}