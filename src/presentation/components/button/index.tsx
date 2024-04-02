import "../../assets/style/Alignment.css"
import "../../assets/style/Button.css"
import "../../assets/style/Color.css"
import "../../assets/style/Global.css"
import "../../assets/style/Padding.css"
import "../../assets/style/Typography.css"

export default function Button(props: any) {
    switch (props.type) {
        case "mini-delete":
            return (
                <button className={props.type}>
                    {props.text}<img src="../../assets/image/delete_icon.webp" alt="delete icon" className="btn-icon"/>
                </button>
            )
        case "mini-reload":
            return (
                <button className={props.type}>
                    {props.text}<img src="../../assets/image/reload_icon.webp" alt="delete icon" className="btn-icon"/>
                </button>
            )
        case "mini":
        case "mini-fill":
            return (
                <button className={`${props.type}`}>{props.text}</button>
            )
        default:
            return (
                <button className={`btn ${props.type}`}>{props.text}</button>
            )
    }
}