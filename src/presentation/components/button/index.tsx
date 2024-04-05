import { ButtonProps } from "@/app/types"
import "./button.css"
import "@/presentation/assets/style/Global.css"

export default function Button(
    { type, text, onClick, icon, disabled }:
                { type: ButtonProps, text: string, onClick?: () => void, icon?: JSX.Element, disabled?: boolean}
) {
    return (
        <button className={`button-${type}`} onClick={onClick} disabled={disabled}>
            <div>{text}</div>
            {icon}
        </button>
    )
}