import "./score.css"

export default function Score({ correct, wrong }: { correct: number, wrong: number }) {
    return (
        <div className="vf gap8">
            <div className="hf gap4">
                <div className="sb16 gray-800">{(correct * 100 / (wrong + correct)).toFixed(2)}%</div>
                <div className="r16 gray-500">정답률</div>
            </div>
            <div className="pr">
                <div className="score-color" style={{ width: `${(correct * 100 / (wrong + correct))}%` }} />
                <div className="score-gray" />
            </div>
            <div className="hf gap2 gray-500 m12 ase">
                <div>{correct}</div>
                <div>/</div>
                <div>{correct + wrong}</div>
            </div>
        </div>
    )
}