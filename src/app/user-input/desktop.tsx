"use client"

import "../page.css"
import Button from "@/presentation/components/button"
import Header from "@/presentation/components/header"
import InputField from "@/presentation/components/input_field"
import ProgressBar from "@/presentation/components/progress_bar"
import SegmentedControl from "@/presentation/components/segmented_control"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Desktop() {
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
    const titles = ["교재나 시험 내용을 입력해주세요", "내용을 확인해주세요", "필수 정보를 입력해주세요"]

    const handleClick = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 4) return prevStep;
                return prevStep + 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
        if (step === 3) router.push("/question-list")
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
        <main className="vf" style={{ backgroundColor: `${step === 3 ? "var(--white)" : "var(--gray-50)"}`, height: "100%" }}>
            <Header type="default" color="white" />
            <div className="yp64 xp120 vf gap40 bb" style={{ height: "100%" }}>
                <div className="hf sbj gap80 ca">
                    <div className="b28 gray-900 f0">{titles[step - 1]}</div>
                    <ProgressBar state={step} />
                </div>
                {
                    step === 1 && <div className="vf gap24" style={{ height: "100%" }}>
                        <div style={{ width: 393 }}>
                            <SegmentedControl
                                defaultIndex={0}
                                contents={["텍스트", "이미지 / PDF"]}
                                onSelect={(e) => setTextOrFile(e)}
                            />
                        </div>
                        <div className="fg">
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
                        <div className="ase">
                            <Button
                                type="main"
                                text="다음으로"
                                onClick={handleClick}
                                disabled={getDisabled()}
                            />
                        </div>
                    </div>
                }
                {
                    step === 2 &&
                    <div className="vf gap24" style={{ height: "100%" }}>
                        <InputField
                            type="textarea"
                            placeholder="강의 내용을 입력해주세요"
                            toParent={(value: any) => setRawText(value)}
                            required={false}
                        />
                        <div className="ase">
                            <Button
                                type="main"
                                text="다음으로"
                                onClick={handleClick}
                                disabled={getDisabled()}
                            />
                        </div>
                    </div>
                }
                {
                    step === 3 &&
                    <div className="vf gap24" style={{ height: "100%" }}>
                        <div className="question-grid" style={{ height: "100%" }}>
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
                        <div className="ase">
                            <Button
                                type="main"
                                text="다음으로"
                                onClick={handleClick}
                                disabled={getDisabled()}
                            />
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}