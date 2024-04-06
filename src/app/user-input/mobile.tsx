"use client"

import CreateFillInTheBlankUseCase from "@/domain/use_case/create_fill_in_the_blank_use_case"
import ReadFileUseCase from "@/domain/use_case/read_file_use_case"
import FixedButton from "@/presentation/components/fixed_button"
import Header from "@/presentation/components/header"
import InputField from "@/presentation/components/input_field"
import SegmentedControl from "@/presentation/components/segmented_control"
import { applyInput } from "@/presentation/states/reducers/final_questions_slice"
import { useAppDispatch } from "@/presentation/states/store"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Result } from "../types"
import LoadingDialogue from "@/presentation/components/loading_dialogue"

export default function Mobile() {
    const router = useRouter()
    const [step, setStep] = useState<0 | 1 | 2 | 3 | 4 | 5>(1)
    const [rawText, setRawText] = useState("")
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<any>()
    const [textOrFile, setTextOrFile] = useState<number>(0)
    const [userSettings, setUserSettings] = useState({
        blankCount: 0,
        questionCount: 0,
        subject: "",
        includeWords: [],
        excludeWords: []
    })

    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 4) return prevStep;
                return prevStep + 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
        if (step === 1) {
            if (textOrFile === 0) return
            else {
                setLoading(true)
                const read_file_use_case = new ReadFileUseCase()
                const response = await read_file_use_case.readFile(file)
                if (response.result === Result.SUCCESS) {
                    setRawText(response.payload)
                    setLoading(false)
                }
                else {
                    alert(response.message)
                    setLoading(false)
                }
            }
        } else if (step === 3) {
            setLoading(true)
            const create_fill_in_the_blank_use_case = new CreateFillInTheBlankUseCase()
            const createKeyPhrasesResponse = await create_fill_in_the_blank_use_case.quoteKeyPhrases(rawText, userSettings.questionCount)
            if (createKeyPhrasesResponse.result === Result.SUCCESS) {
                const createQuestionResponse = await create_fill_in_the_blank_use_case.createQuestion(
                    createKeyPhrasesResponse.payload,
                    userSettings.excludeWords.join(", "),
                    userSettings.includeWords.join(", ")
                )
                if (createQuestionResponse.result === Result.SUCCESS) {
                    dispatch(applyInput(createQuestionResponse.payload))
                    setLoading(false)
                    router.push("/question-list")
                } else {
                    alert(createQuestionResponse.message)
                    setLoading(false)

                }
            } else {
                alert(createKeyPhrasesResponse.message)
                setLoading(false)
            }
        }
    }

    const getDisabled = () => {
        if (step === 1) {
            if (textOrFile === 0) return rawText === "" ? true : false
            else return file ? false : true
        } else if (step === 3) {
            if (userSettings.questionCount === 0) return true
            return false
        }
        else return false
    }


    const goBack = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 1) return prevStep;
                return prevStep - 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
    }

    return (
        <main className="vf" style={{ maxHeight: "100vh", backgroundColor: `${step === 3 ? "var(--white)" : "var(--gray-50)"}`, flexGrow: 1, paddingBottom: 120 }}>
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
                                value={rawText}
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
                        placeholder="강의 내용을 입력해주세요"
                        toParent={(value: any) => setRawText(value)}
                        required={false}
                        value={rawText}
                    />
                </div>
            }
            {
                step === 3 &&
                <div className="vf yp40 xp20 gap40 bb" style={{ height: "100vh" }}>
                    <div className="gray-900 b24">필수 정보를 입력해주세요</div>
                    <div className="vf gap32">
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
            {loading && <LoadingDialogue />}
            <FixedButton
                onClick={handleClick}
                text={step === 3 ? "질문 생성하기!" : "다음으로"}
                color="gray"
                disabled={getDisabled()}
            />
        </main>
    )
}