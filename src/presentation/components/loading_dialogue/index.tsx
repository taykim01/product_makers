import "./loading_dialogue.css"

export default function LoadingDialogue() {
    return (
        <div className="ld-container">
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
        </div>
    )
}