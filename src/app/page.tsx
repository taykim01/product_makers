"use client"

import Header from "@/presentation/components/header";
import SampleQuestion from "@/presentation/components/sample_question";
import { sampleQuestion } from "./data";
import FixedButton from "@/presentation/components/fixed_button";
import { useRouter } from "next/navigation";
import { useResponsive } from "@/presentation/hooks/useResponsive";
import { Device } from "./types";
import Button from "@/presentation/components/button";
import "@/app/page.css"

export default function Home() {
  const router = useRouter()
  const responsive = useResponsive()
  switch (responsive.responsive) {
    case Device.mobile:
      return (
        <main style={{ backgroundColor: "var(--gray-50)" }}>
          <Header type="default" color="white" />
          <div className="xp20">
            <div className="b24 black yp40">
              <div className="vf gap8">
                <div> 어려운 시험문제,</div>
                <div>이제 미리 풀어보세요.</div>
              </div>
            </div>
            <div className="vf gap12" style={{ backgroundColor: "var(--gray-50)" }}>
              <div className="vf gap32">
                {sampleQuestion.map((question, index) => (
                  <SampleQuestion
                    key={index}
                    question={question.question}
                    answer={question.answer}
                    hashtag={question.hashtag}
                    createdAt={question.createdAt}
                  />
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
            <div className="vf gap12" style={{ width: 393, maxHeight: "calc(100vh - 188px)", overflow: "scroll" }}>
                {sampleQuestion.map((question, index) => (
                  <SampleQuestion
                    key={index}
                    question={question.question}
                    answer={question.answer}
                    hashtag={question.hashtag}
                    createdAt={question.createdAt}
                  />
                ))}
            </div>
          </div>
        </main>
      );
  }
}
