"use client"

import FixedButton from "@/presentation/components/fixed_button"
import Header from "@/presentation/components/header"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { sampleQuestion } from "../data"
import Question from "@/presentation/components/question/index"

export default function Mobile() {
    const router = useRouter()
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(4)
    const [questionList, setQuestionList] = useState(sampleQuestion)
    const [answerList, setAnswerList] = useState<string[]>([])

    useEffect(() => {
        const answerLength: string[] = []
        for (let index = 0; index < sampleQuestion.length; index++) {
            answerLength.push("")
        }
        setAnswerList(answerLength)
    }, [])

    const handleClick = () => {
        if (step < 5) {
            setStep((prevStep) => {
                if (prevStep >= 5) return prevStep;
                return prevStep + 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
        if (step === 5) router.push("/final-result")
    }

    const goBack = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 1) return prevStep;
                return prevStep - 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
    }

    const setAnswer = (value: string, index: number) => {
        const newAnswerList = answerList.map((item, idx) => {
            if (idx === index) {
                return value;
            }
            return item;
        });
        if (index >= answerList.length) {
            newAnswerList.push(value);
        }
        setAnswerList(newAnswerList);
    }

    return (
        <main className="vf" style={{ backgroundColor: "var(--white)", flexGrow: 1 }}>
            <Header type={step === 5 ? "default" : "progress"} color="white" state={step} onClick={goBack} />
            {
                step === 4 && <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                    <div className="gray-900 b24">문제를 확인해주세요</div>
                    <div className="vf gap32" style={{ paddingBottom: 100 }}>
                        {questionList.map((question, index) => (
                            <Question
                                key={index}
                                index={index}
                                type="suggested"
                                question={question.question}
                                answer={question.answer}
                                onClick={() => setQuestionList(questionList.filter((_, i) => i !== index))}
                                subOnClick={() => { }}
                            />
                        ))}
                    </div>
                </div>
            }
            {
                step === 5 &&
                <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                    <div className="vf gap8">
                        <div className="gray-900 b24">문제 풀이 시작!</div>
                        <div className="m16 gray-600">다음 [ _____ ]안에 들어갈 내용으로 적절한 것은?</div>
                    </div>
                    <div className="vf gap32" style={{ paddingBottom: 100 }}>
                        {questionList.map((question, index) => (
                            <Question
                                key={index}
                                index={index + 1}
                                type="response"
                                question={question.question}
                                answer={question.answer}
                                toParent={(value) => setAnswer(value, index)}
                            />
                        ))}
                    </div>
                </div>
            }
            <FixedButton
                onClick={handleClick}
                text={step === 4 ? "시작하기" : "다음으로"}
                color="white"
                disabled={false}
                subButtonText={step === 5 ? undefined : "다시 생성하기"}
                subButtonOnClick={step === 5 ? undefined : () => { }}
            />
        </main>
    )
}