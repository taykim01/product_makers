"use client"

import Header from "@/presentation/components/header";
import SampleQuestion from "@/presentation/components/sample_question";
import { sampleQuestion } from "./data";
import FixedButton from "@/presentation/components/fixed_button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main style={{ backgroundColor: "var(--gray-50)" }}>
      <Header type="default" color="white" />
      <div className="b24 black yp40 xp20">AK47</div>
      <div className="vf gap12" style={{ backgroundColor: "var(--gray-50)" }}>
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
      <FixedButton
        onClick={() => router.push("/user-input")}
        text="질문 만들기"
        color="gray"
        disabled={false}
      />
    </main>
  );
}
