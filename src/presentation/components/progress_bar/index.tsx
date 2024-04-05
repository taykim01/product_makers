import "./progress_bar.css"

export default function ProgressBar({ state }: { state: 0 | 1 | 2 | 3 | 4}) {
    return (
        <div className="hf sbj gap8 w100">
            {Array(state).fill(<div className="pb-color" />)}
            {Array(4 - state).fill(<div className="pb-gray" />)}
        </div>
    )
}