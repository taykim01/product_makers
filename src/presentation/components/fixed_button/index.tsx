import "../../assets/style/Alignment.css"
import "../../assets/style/Button.css"
import "../../assets/style/Color.css"
import "../../assets/style/Global.css"
import "../../assets/style/Padding.css"
import "../../assets/style/Typography.css"

export default function FixedButton(props: any) {
    return (
        props.button === "single"
        ? <div className={`${props.button} bg-${props.background}}`}>
            <button className={`btn ${props.type} fw700`}>{props.text}</button>
        </div>
        : <div className={`${props.button} bg-${props.background}}`}>
            <button className={`btn ${props.type} fw700`}>{props.text}</button>
            <button className={`btn ${props.type} fw700`}>{props.text}</button>
        </div>
    )
}