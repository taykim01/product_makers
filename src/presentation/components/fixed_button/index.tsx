import Button from "../button";
import "./fixed_button.css";

export default function FixedButton(
    { color, text, onClick, disabled, subButtonText, subButtonOnClick}: 
    { color: "white" | "gray", text: string, onClick: () => void, disabled: boolean, subButtonText?: string, subButtonOnClick?: () => void}
    ) {
    return (
        <div className={`fb-container fb-${color} hf gap8`}>
            {
                subButtonText &&
                <Button
                    type="sub"
                    text={subButtonText}
                    onClick={subButtonOnClick}
                />
            }
            <Button
                type="main"
                text={text}
                onClick={onClick}
                disabled={disabled}
            />
        </div>
    )
}