"use client"

import FixedButton from "@/presentation/components/fixed_button"
import Header from "@/presentation/components/header"
import InputField from "@/presentation/components/input_field"
import SegmentedControl from "@/presentation/components/segmented_control"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Mobile() {
    const router = useRouter()
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(1)
    const [rawText, setRawText] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [textOrFile, setTextOrFile] = useState<number>(0)
    const [userSettings, setUserSettings] = useState({
        blankCount: 0,
        questionCount: 0,
        subject: "",
        includeWords: [],
        excludeWords: []
    })

    const handleClick = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 4) return prevStep;
                return prevStep + 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
        if (step === 3) router.push("/question-list")
    }

    const goBack = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 1) return prevStep;
                return prevStep - 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
    }

    const getDisabled = () => {
        if (step === 1) {
            if (textOrFile === 0) return rawText === "" ? true : false
            else return file === null ? true : false
        } else if (step === 3) {
            if (userSettings.blankCount === 0) return true
            if (userSettings.questionCount === 0) return true
            return false
        }
        else return false

    }

    return (
        <main className="vf" style={{ backgroundColor: `${step === 3 ? "var(--white)" : "var(--gray-50)"}`, flexGrow: 1 }}>
            <Header type="progress" color="white" state={step} onClick={goBack} />
            {
                step === 1 && <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                    <SegmentedControl
                        defaultIndex={0}
                        contents={["텍스트", "이미지 / PDF"]}
                        onSelect={(e) => setTextOrFile(e)}
                    />
                    {
                        textOrFile === 0
                            ? <InputField
                                type="textarea"
                                placeholder="강의 내용을 입력해주세요"
                                toParent={(value: any) => setRawText(value)}
                                required={false}
                            />
                            : <InputField
                                type="file"
                                toParent={(value: any) => setFile(value)}
                                required={false}
                            />
                    }
                </div>
            }
            {
                step === 2 &&
                <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                    <div className="gray-900 b24">내용을 확인해주세요</div>
                    <InputField
                        type="textarea"
                        value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in tellus eget turpis faucibus mollis. Sed non risus tellus. Sed scelerisque condimentum urna vitae aliquet. Integer vitae ipsum convallis, vehicula augue sit amet, convallis quam. Nulla facilisi. Quisque tincidunt aliquet faucibus. Donec eu convallis libero."}
                        toParent={(value: any) => setRawText(value)}
                        required={false}
                    />
                </div>
            }
            {
                step === 3 &&
                <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                    <div className="gray-900 b24">필수 정보를 입력해주세요</div>
                    <div className="vf gap32">
                        <InputField
                            type="select"
                            title="문장 당 빈칸 개수"
                            required={true}
                            toParent={(value: any) => setUserSettings({ ...userSettings, blankCount: value })}
                        />
                        <InputField
                            type="number"
                            title="문제 개수"
                            required={true}
                            toParent={(value: any) => setUserSettings({ ...userSettings, questionCount: value })}
                        />
                        <InputField
                            type="hashtag"
                            title="과목명"
                            required={false}
                            toParent={(value: any) => setUserSettings({ ...userSettings, subject: value })}
                            placeholder="과목명은 빈칸 문제의 해시태그가 됩니다."
                        />
                        <InputField
                            type="add"
                            title="질문에 포함할 단어"
                            required={false}
                            toParent={(value: any) => setUserSettings({ ...userSettings, includeWords: value })}
                        />
                        <InputField
                            type="add"
                            title="질문에서 제외할 단어"
                            required={false}
                            toParent={(value: any) => setUserSettings({ ...userSettings, excludeWords: value })}
                        />
                    </div>
                </div>
            }
            <FixedButton
                onClick={handleClick}
                text={step === 3 ? "질문 생성하기!" : "다음으로"}
                color="white"
                disabled={getDisabled()}
            />
        </main>
    )
}