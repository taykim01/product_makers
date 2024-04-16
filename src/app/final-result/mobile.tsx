"use client"

import FixedButton from "@/presentation/components/fixed_button"
import Header from "@/presentation/components/header"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Score from "@/presentation/components/score"
import QuestionItem from "@/presentation/components/question_item"
import { useAppSelector } from "@/presentation/states/store"
import { Question } from "../types"

export default function Mobile() {
    const router = useRouter()
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(4)
    const [questionList, setQuestionList] = useState<Question[]>([])
    const questionArray: Question[] = useAppSelector((state: any) => state.finalQuestions.questions)

    useEffect(() => {
        if (questionArray.length > 0) setQuestionList(questionArray)
    }, [])

    const goBack = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 1) return prevStep;
                return prevStep - 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
        router.push("/")
    }

    const result = {
        correct: questionList.filter((question) => question.answer.trim().toLowerCase().replace(/\s+/g, "").replace("-", "").replace(".", "").replace(",", "").replace("\'", "").replace("\"", "").trim() === question.keyword.trim().toLowerCase().replace(/\s+/g, "").replace("-", "").replace(".", "").replace(",", "").replace("\'", "").replace("\"", "").trim()).length,
        wrong: questionList.filter((question) => question.answer.trim().toLowerCase().replace(/\s+/g, "").replace("-", "").replace(".", "").replace(",", "").replace("\'", "").replace("\"", "").trim() !== question.keyword.trim().toLowerCase().replace(/\s+/g, "").replace("-", "").replace(".", "").replace(",", "").replace("\'", "").replace("\"", "").trim()).length
    }

    return (
        <main className="vf" style={{ backgroundColor: "var(--white)", flexGrow: 1, paddingBottom: 120 }}>
            <Header type="text" color="white" onClick={goBack} />

            <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                <div className="vf gap8">
                    <div className="gray-900 b24">{result.correct > result.wrong ? "정말 멋져요!🤩" : "아쉬워요.. 😢"}</div>
                    <div className="m16 gray-600">다시 한번 도전하시겠어요?</div>
                </div>
                <Score
                    correct={result.correct}
                    wrong={result.wrong}
                />
                <div className="vf gap32" style={{ paddingBottom: 100 }}>
                    {questionList.map((question, index) => (
                        <QuestionItem
                            key={index}
                            index={index + 1}
                            type="result"
                            question={question.question}
                            answer={question.keyword}
                            userAnswer={question.answer}
                        />
                    ))}
                </div>
            </div>
            <FixedButton
                onClick={() => router.push("/")}
                text="홈으로"
                color="white"
                disabled={false}
            />
        </main>
    )
}