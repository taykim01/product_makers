import { Timestamp } from "firebase/firestore"
import "./sample_question.css"
import formatDate from "@/presentation/utils/format_date"
import { blank } from "@/app/data"

export default function SampleQuestion(
    { question, hashtag, answer, createdAt }
        : { question: string, answer:string, hashtag: string, createdAt: Timestamp | Date }
) {
    return (
        <div className="p20 vf gap8 sq-container">
            <div className="hf w100 sbj">
                <div className="m12 brand-600 sq-tag"># {hashtag || "없음"}</div>
                <div className="r12 gray-500">{formatDate(createdAt)}</div>
            </div>
            <div className="r14 gray-900">Q: {question}</div>
        </div>
    )
}