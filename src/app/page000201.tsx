"use client";

import "@/app/pages.css"
import Header from "@/presentation/components/header/index"
import SegmentedControl from "@/presentation/components/segmented_control"
import FixedButton from "@/presentation/components/fixed_button"
import InputField from "@/presentation/components/input_field"
import inputInformationsData from "./input_informations_data"

export default function UserInputScreen() {
    let state: string = useState("left");
    //let type: string = useState("disabled-main");

    const inputInformations = inputInformationsData.map(inputInformation => {
        return <input
                    type={inputInformation.type}
                    required={inputInformation.required}
                    title={inputInformation.title}
                    placeholder={inputInformation.placeholder}
                    description={inputInformation.description}
                />
    })

    const changeInputType = async () => {
        return (
            <>
                <Header
                    type="progress"
                    color="white"
                    step="1"
                />
                <main className="bg-gs100">
                    <div>
                        {state === "left"
                        ? <SegmentedControl
                            state="right"
                            onClick={changeInputType}
                        />
                        : <SegmentedControl
                            state="left"
                            onClick={changeInputType}
                        />
                        }
                    </div>
                    <div>
                        {state === "left"
                        ? <InputField
                            type="file"
                            placeholder="이미지,PDF를 올리거나,\n텍스트를 붙여넣어주세요!"
                        />
                        : <InputField
                            type="textarea"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tellus eget turpis faucibus mollis. Sed non risus tellus. Sed scelerisque condimentum urna vitae aliquet. Integer vitae ipsum convallis, vehicula augue sit amet, convallis quam. Nulla facilisi. Quisque tincidunt aliquet faucibus. Donec eu convallis libero."
                        />
                        }
                    </div>
                    <FixedButton
                        button="single"
                        type="disabled-main"
                        background="white"
                        text="다음으로"
                        onClick={page00020201}
                    />
                </main>
            </>
        )
    }

    const page00020201 = async () => {
        return (
            <>
                <Header
                    type="progress"
                    color="white"
                    step="1"
                />
                <main className="bg-gs100">
                    <div className="h3 fw700 w100">내용을 확인해주세요</div>
                    <div>
                        <InputField
                            type="textarea"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tellus eget turpis faucibus mollis. Sed non risus tellus. Sed scelerisque condimentum urna vitae aliquet. Integer vitae ipsum convallis, vehicula augue sit amet, convallis quam. Nulla facilisi. Quisque tincidunt aliquet faucibus. Donec eu convallis libero."
                        />
                    </div>
                    <FixedButton
                        button="single"
                        type="main"
                        background="white"
                        text="확인했어요"
                        onClick={page000203}
                    />
                </main>
            </>
        )

    }

    const page000203 = async () => {
        return (
            <>
                <Header
                    type="progress"
                    color="white"
                    step="2"
                />
                <main className="bg-gs50">
                    <div className="h3 fw700 w100">필수 정보를 입력해주세요</div>
                    <div>
                        {inputInformations}
                    </div>
                    <FixedButton
                        button="single"
                        type="disabled-main"
                        background="white"
                        text="다음으로"
                        onClick={page00020201}
                    />
                </main>
            </>
        )
    }


    return (
        <>
            <Header
                type="progress"
                color="white"
                step="1"
            />
            <main className="bg-gs100">
                <div>
                    <SegmentedControl
                        state={state}
                        onClick={changeInputType}
                    />
                </div>
                <div>
                    <InputField
                        type="textarea"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tellus eget turpis faucibus mollis. Sed non risus tellus. Sed scelerisque condimentum urna vitae aliquet. Integer vitae ipsum convallis, vehicula augue sit amet, convallis quam. Nulla facilisi. Quisque tincidunt aliquet faucibus. Donec eu convallis libero."
                    />
                </div>
                <FixedButton
                    button="single"
                    type="disabled-main"
                    background="white"
                    text="다음으로"
                    onClick={page00020201}
                />
            </main>
        </>
    )
}