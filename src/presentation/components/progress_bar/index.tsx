import "./progress_bar.css"

export default function ProgressBar({ state }: { state: 0 | 1 | 2 | 3 | 4 | 5}) {
    return (
        <div className="hf sbj gap8 w100">
            {Array.from({ length: state }, (_, index) => (
                <div key={`pb-color-${index}`} className="pb-color" />
            ))}
            {Array.from({ length: 4 - state }, (_, index) => (
                <div key={`pb-gray-${index}`} className="pb-gray" />
            ))}
        </div>
    )
}
