import "@/presentation/assets/style/Button.css"
import "@/presentation/assets/style/Global.css"

export default function Button(props: any) {
    switch (props.type) {
        case "mini-delete":
            return (
                <button className={props.type} onClick={props.onClick}>
                    {props.text}<img src="@/presentation/assets/image/delete_icon.webp" alt="delete icon" className="btn-icon"/>
                </button>
            )
        case "mini-reload":
            return (
                <button className={props.type} onClick={props.onClick}>
                    {props.text}<img src="@/presentation//assets/image/reload_icon.webp" alt="delete icon" className="btn-icon"/>
                </button>
            )
        case "mini":
        case "mini-fill":
            return (
                <button className={`${props.type}`} onClick={props.onClick}>{props.text}</button>
            )
        default:
            return (
                <button className={`btn ${props.type}`} onClick={props.onClick}>{props.text}</button>
            )
    }
}