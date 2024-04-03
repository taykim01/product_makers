import "@/presentation/components/components.css";

export default function Result(props: any) {
    switch (props.result) {
        case "correct":
            return (
                <div className="component_result_correct">
                    <div className="hf gap8">
                    <img src="../../assets/image/correct_icon.webp" alt= "correct" className="result_icon" />
                    <p className="result_correct_text">정답입니다!</p>
                    </div>
                </div>
            )
        case "wrong":
            return (
                <div className="component_result_wrong">
                <div className="hf gap8">
                    <img src="../../assets/image/wrong_icon.webp" alt= "wrong" className="result_icon"/>
                    <p className="result_wrong_text">나의 답변: {props.useranswer}</p>
                </div>
                </div>
            )
        default:
    }
}