"use client"

import ReadFileUseCase from "@/domain/use_case/read_file_use_case"
import "../page.css"
import Button from "@/presentation/components/button"
import Header from "@/presentation/components/header"
import InputField from "@/presentation/components/input_field"
import ProgressBar from "@/presentation/components/progress_bar"
import SegmentedControl from "@/presentation/components/segmented_control"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { Result } from "../types"
import LoadingDialogue from "@/presentation/components/loading_dialogue"
import CreateFillInTheBlankUseCase from "@/domain/use_case/create_fill_in_the_blank_use_case"
import { useAppDispatch } from "@/presentation/states/store"
import { applyInput } from "@/presentation/states/reducers/final_questions_slice"

export default function Desktop() {
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
    const titles = ["교재나 시험 내용을 입력해주세요", "내용을 확인해주세요", "필수 정보를 입력해주세요"]
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFile(file);
        }
    };

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setFile(file);
        }
    };

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
            const createKeyPhrasesResponse = await create_fill_in_the_blank_use_case.quoteKeyPhrases(rawText, userSettings.questionCount, userSettings.excludeWords.join(", "), userSettings.includeWords.join(", "))
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

    const goBack = () => {
        if (step < 4) {
            setStep((prevStep) => {
                if (prevStep >= 1) return prevStep;
                return prevStep - 1 as 0 | 1 | 2 | 3 | 4 | 5;
            });
        }
        if (step === 1) router.back()
        else if (step === 2) setStep(1)
        else if (step === 3) setStep(2)
    }

    const getDisabled = () => {
        if (step === 1) {
            if (textOrFile === 0) return rawText === "" ? true : false
            else return !file
        } else if (step === 2) {
            return rawText.length > 6400 ? true : false // '내용을 확인해주세요' 단계에서 rawText의 길이가 6400자 이상인 경우 다음으로 넘어가지 않도록
        } else if (step === 3) {
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
                                        value={rawText}
                                    />
                                    : (
                                        <>
                                            <div onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleFileInputClick} style={{
                                                display: 'flex',
                                                width: '100%',
                                                height: '100%',
                                                padding: '40px 20px',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '16px',
                                                boxSizing: 'border-box',
                                                border: 'none',
                                                outline: 'none',
                                                resize: 'none',
                                                backgroundColor: 'var(--white)',
                                                fontFamily: 'PretendardVariable',
                                                fontSize: '16px',
                                                fontWeight: '400',
                                                cursor: 'pointer',
                                                margin: '10px 0',
                                            }}>
                                                {file ? file.name : "이미지나 PDF 파일을 여기에 드래그 앤 드롭하거나 클릭해서 선택하세요."}
                                            </div>
                                            <input type="file" style={{ display: 'none' }} onChange={handleFileChange} ref={fileInputRef} />
                                        </>
                                    )}
                        </div>
                        <div className="ase hf gap8">
                            <Button
                                type="sub"
                                text="뒤로가기"
                                onClick={goBack}
                                disabled={false}
                            />
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
                            value={rawText}
                        />
                        <div
                            style={{
                                color: rawText.length > 6400 ? 'red' : 'grey',
                            }}
                        >
                            {`${rawText.length}/6400`}
                        </div>
                        <div className="ase hf gap8">
                            <Button
                                type="sub"
                                text="뒤로가기"
                                onClick={goBack}
                                disabled={false}
                            />
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
                        <div className="ase hf gap8">
                            <Button
                                type="sub"
                                text="뒤로가기"
                                onClick={goBack}
                                disabled={false}
                            />
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
            {loading && <LoadingDialogue />}
        </main>
    )
}