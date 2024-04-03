import "@/presentation/assets/style/Alignment.css"
import "@/presentation/assets/style/Button.css"
import "@/presentation/assets/style/Color.css"
import "@/presentation/assets/style/Global.css"
import "@/presentation/assets/style/Padding.css"
import "@/presentation/assets/style/Typography.css"
import Button from "@/presentation/components/button"

export default function InputField(props: any) {
    switch (props.type) {
        case "text":
            return (
                props.required === "true"
                ? <div>
                    <div className="hf gap4">
                        <h5 className="h5 txt gs600">{props.title}</h5>
                        <h5 className="h5 txt red500">*</h5>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="input gs900 w100"
                            name={props.name}
                            placeholder={props.placeholder}
                        />
                    </div>
                </div>
                : <div>
                    <div className="hf">
                        <h5 className="h5 txt gs600">{props.title}</h5>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="input gs900 w100"
                            name={props.name}
                            placeholder={props.placeholder}
                        />
                        <p className="descr gs500 fx400">{props.description}</p>
                    </div>
                </div>
            )
        case "add":
            return (
                <div>
                    <div className="hf">
                        <h5 className="h5 txt gs600">{props.title}</h5>
                    </div>
                    <div className="input-container">
                        <div className="input-and-button fc gap8">
                            <input
                                type="text"
                                className="input gs900 w100"
                                name={props.name}
                                placeholder={props.placeholder}/>
                            <Button className="mini-fill fc" onClick={props.onClick}>추가</Button>
                        </div>
                        <p className="descr gs700 fw700">{props.description}</p>
                    </div>
                </div>
            )
        case "select":
            return (
                <div>
                    <div className="hf">
                        <h5 className="h5 txt gs600">{props.title}</h5>
                        <h5 className="h5 txt red500">*</h5>
                    </div>
                    <div className="input-container">
                        <div className="buttons fc gap8">
                            <Button className="btn btn-choose gs900 fw400" onClick={props.onClick}>1개</Button>
                            <Button className="btn btn-choose gs900 fw400" onClick={props.onClick}>2개</Button>
                            <Button className="btn btn-choose gs900 fw400" onClick={props.onClick}>3개</Button>
                        </div>
                    </div>
                </div>
            )
        //case "file":
        //case "textarea":
        default:
            return (
                <div>
                    <div className="hf">
                        <h5 className="h5 txt gs600">{props.title}</h5>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="input gs900 w100"
                            name={props.name}
                            placeholder={props.placeholder}
                        />
                    </div>
                </div>
            )
    }
}