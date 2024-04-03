import "./question_list.css"
import React, { useState, useEffect } from "react"

import CheckUserResultUseCase from "@/domain/use_case/check_user_result_use_case"
import Question from "@/presentation/components/question"
import FixedButton from "@/presentation/components/fixed_button"
import Header from "@/presentation/components/header"

// props로 questionList, quoteList 필요
export default function QuestionListComponent({ questionList, quoteList }: { questionList: string[], quoteList: string[] }) {
    const checkUserResultUseCase = new CheckUserResultUseCase()
    const [userAnswerList, setUserAnswerList] = useState<string[]>([]);
    const [resultBooleanList, setResultBooleanList] = useState<boolean[]>([]);

    useEffect(() => {
        setUserAnswerList(new Array(questionList.length).fill(''));
    }, [questionList]);

    const handleInputChange = (index: number, newValue: string) => {
        setUserAnswerList(currentValues =>
            currentValues.map((value, i) => i === index ? newValue : value)
        );
    };

    const handleCheckResults = () => {
        const response = checkUserResultUseCase.checkResult(userAnswerList, quoteList, questionList);
        // CodeResponse 객체에서 결과 데이터를 추출하여 상태를 업데이트
        if (response && Array.isArray(response)) {
            setResultBooleanList(response);
        } else {
            // 에러 처리나 기본값 설정
            console.error("결과 데이터를 가져오는 데 실패했습니다.");
            setResultBooleanList([]);
        }
    };

    return (
        <div>
            <div className="header_container"><Header progress={4}/></div>
            <div className="question_list_container">
                <div className="title_text">문제 풀이 시작!<br></br>
                <span className="sub_text">다음 () 안에 들어갈 내용으로 적절한 것은?</span></div>
                {questionList.map((question: string, index: number) => (
                    <Question
                        key={index}
                        type="response"
                        questionTitle={`질문 ${index + 1}`}
                        question={question}
                        onChange={(e: { target: { value: string } }) => handleInputChange(index, e.target.value)}
                    />
                ))}
            </div>
            <div className="fixed_button_container">
                <FixedButton
                    button = "single"
                    background = "red"
                    type = "main"
                    text = "다음으로"
                    onClick={() => handleCheckResults()} //그리고 000401페이지로 이동
                />
            </div>
        </div>
    )
}