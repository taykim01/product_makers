import Icon from "@/presentation/assets/image/icon";
import "./result.css";

export default function ResultItem({ result, userAnswer }: { result: "correct" | "wrong", userAnswer?: string }) {
    return (
        <div className={`result result-${result}`}>
            <div className="hf gap8 ca">
                <Icon type={result} />
                <div className="m14">
                    {
                        result === "wrong"
                            ? `나의 답변: ${userAnswer}`
                            : "정답입니다!"
                    }
                </div>
            </div>
        </div>
    )
}