"use client"

import Header from "@/presentation/components/header";
import SampleQuestion from "@/presentation/components/sample_question";
import FixedButton from "@/presentation/components/fixed_button";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/presentation/hooks/useResponsive";
import { Device, Question, Result } from "./types";
import Button from "@/presentation/components/button";
import "@/app/page.css"
import { useEffect, useState } from "react";
import ReadQuestionsUseCase from "@/domain/use_case/read_questions_use_case";
import LoadingDialogue from "@/presentation/components/loading_dialogue";
import QuoteRepository from "@/data/respository/quote_repository";

export default function Home() {
  const router = useRouter()
  const responsive = useResponsive()
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const increment = 50;
    const maxScrollY = 1500;
    const interval = setInterval(() => {
      setScrollY(prevScrollY => prevScrollY + increment);
    }, 2000);

    if (scrollY > maxScrollY) setScrollY(0);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const initData = async () => {
    const read_questions_use_case = new ReadQuestionsUseCase()
    const response = await read_questions_use_case.readQuestions()
    if (response.result === Result.SUCCESS) {
      setQuestionList(response.payload)
      setLoading(false)
    }
    else console.log(response.message)
  }

  useEffect(() => {
    initData()
  }, [])



  switch (responsive.responsive) {
    case Device.mobile:
      return (
        <main style={{ backgroundColor: "var(--gray-50)", maxHeight: "100vh" }}>
          <Header type="default" color="white" />
          <div className="xp20 pt40 vf gap40">
            <div className="b28 black pt40">
              <div className="vf ca gap12">
                <div> 어려운 시험문제,</div>
                <div>이제 미리 풀어보세요.</div>
              </div>
            </div>
            <div className="pb32" style={{ transform: "scale(1)" }}>
              <div className="loader" />
            </div>
            <div className="vf gap12" style={{ backgroundColor: "var(--gray-50)" }}>
              <div className="vf gap12 scroll-questions">
                <div className="scroll-blur" />
                {questionList.map((question, index) => (
                  <div key={index} style={{ transform: `translateY(-${scrollY}px)`, transition: "all 0.5s ease-in-out" }}>
                    <SampleQuestion
                      key={index}
                      question={question.question}
                      answer={question.answer}
                      hashtag={question.hashtag}
                      createdAt={question.createdAt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FixedButton
            onClick={() => router.push("/user-input")}
            text="질문 만들기"
            color="gray"
            disabled={false}
          />
          {loading && <LoadingDialogue />}
        </main>
      );
    default:
      return (
        <main style={{ backgroundColor: "var(--gray-50)", maxHeight: "100vh" }}>
          <Header type="default" color="white" />
          <div className="xp120 yp40 hf sbj ca bb" style={{ maxHeight: "calc(100vh - 108px)" }}>
            <div className="vf gap80" style={{ width: 360 }}>
              <div className="b28 black yp40">
                <div className="vf gap12 tca">
                  <div> 어려운 시험문제,</div>
                  <div>이제 미리 풀어보세요.</div>
                </div>
              </div>
              <div className="pb32" style={{ transform: "scale(2)" }}>
                <div className="loader" />
              </div>
              <Button
                type="main"
                text="나도 사용하기"
                onClick={() => router.push("/user-input")}
              />
            </div>
            <div className="vf gap12 scroll-questions">
              <div className="scroll-blur" />
              {questionList.map((question, index) => (
                <div key={index} style={{ transform: `translateY(-${scrollY}px)`, width: 393, transition: "all 0.5s ease-in-out" }}>
                  <SampleQuestion
                    key={index}
                    question={question.question}
                    answer={question.answer}
                    hashtag={question.hashtag}
                    createdAt={question.createdAt}
                  />
                </div>
              ))}
            </div>
          </div>
          {loading && <LoadingDialogue />}
        </main>
      );
  }
}
