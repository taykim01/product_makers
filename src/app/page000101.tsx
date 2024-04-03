"use client";

import "@/app/pages.css"
import Header from "@/presentation/components/header/index"
import SampleQuestion from "@/presentation/components/sample_question"
import FixedButton from "@/presentation/components/fixed_button"
import sampleQuestionsData from "./sample_questions_data"

export default function IndexScreen() {

    const page000201 = async () => {

    }

    const sampleQuestions = sampleQuestionsData.map(sampleQuestion => {
        return <SampleQuestion
                    title={sampleQuestion.title}
                    date={sampleQuestion.date}
                    text={sampleQuestion.text}
                />
    })


    return (
        <>
            <Header
                type="default"
                color="white"
            />
            <main className="bg-gs100">
                <div className="h3 fw700 yp40 xp20 w100">빈칸 문제 생성 서비스(가제)</div>
                <div>
                    {sampleQuestions}
                </div>
                <FixedButton
                    button="single"
                    type="main"
                    background="white"
                    text="정답 제출"
                    onClick={page000201}
                />
            </main>
        </>
    )
}