import "@/presentation/assets/style/Alignment.css"
import "@/presentation/assets/style/Button.css"
import "@/presentation/assets/style/Color.css"
import "@/presentation/assets/style/Global.css"
import "@/presentation/assets/style/Padding.css"
import "@/presentation/assets/style/Typography.css"
import Button from "@/presentation/components/button"

export default function FixedButton(props: any) {
    return (
        props.button === "single"
        ? <div className={`${props.button} grad-${props.background}}`}>
            <Button className={`btn ${props.type} fw700`} onClick={props.onClick}>{props.text}</Button>
        </div>
        : <div className={`${props.button} grad-${props.background}}`}>
            <Button className={`btn ${props.type1} fw700`} onClick={props.onClick}>{props.text1}</Button>
            <Button className={`btn ${props.type2} fw700`} onClick={props.onClick}>{props.text2}</Button>
        </div>
    )
}