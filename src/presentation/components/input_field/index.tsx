import "../../assets/style/Alignment.css"
import "../../assets/style/Button.css"
import "../../assets/style/Color.css"
import "../../assets/style/Global.css"
import "../../assets/style/Padding.css"
import "../../assets/style/Typography.css"

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
                            <button className="mini-fill fc">추가</button>
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
                            <button className="btn btn-choose gs900 fw400">1개</button>
                            <button className="btn btn-choose gs900 fw400">2개</button>
                            <button className="btn btn-choose gs900 fw400">3개</button>
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