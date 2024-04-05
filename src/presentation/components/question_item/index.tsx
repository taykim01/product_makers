import { QuestionTypeProps } from "@/app/types";
import "./question_item.css"
import Button from "../button";
import Icon from "@/presentation/assets/image/icon";
import { blank } from "@/app/data";
import Result from "../result";

export default function QuestionItem(
    { type, question, answer, onClick, subOnClick, index, toParent, userAnswer }
        : { type: QuestionTypeProps, question: string, answer: string, index: number, onClick?: () => void, subOnClick?: () => void, toParent?: (value: string) => void, userAnswer?: string}
) {

    function StyledQuestion({ text, answer }: { text: string, answer: string }) {
        const before = text.split(answer)[0];
        const after = text.split(answer)[1];
        return (
            <div>{before}<span className="sb16 brand-600">{answer}</span>{after}</div>
        );
    }

    return (
        <div className="vf gap16">
            <div className="vf gap8">
                <div className="m16 gray-600">질문 {index}</div>
                <div className="r16 brand-900">
                    {(type === "response" || type === "suggested") && question.replace(answer, blank)}
                    {type === "result" && <StyledQuestion text={question} answer={answer} />}
                </div>
            </div>
            {
                (type === "response" && toParent)
                && <input
                    className="question-input r16 gray-900"
                    type="text"
                    placeholder="정답을 입력하세요"
                    onChange={(e) => toParent(e.target.value)}
                />
            }
            {
                type === "suggested" &&
                <div className="hf gap4">
                    <Button type="mini" text="빈칸 옮기기" onClick={subOnClick} />
                    <Button type="mini" text="삭제하기" icon={<Icon type="trash" />} onClick={onClick} />
                </div>
            }
            {
                type === "result" &&
                <Result
                    result={userAnswer === answer ? "correct" : "wrong"}
                    userAnswer={userAnswer}
                />
            }
        </div>
    )
}