"use client"
import { InputFieldProps } from "@/app/types";
import "./input_field.css"
import { useState } from "react";
import Button from "../button";

export default function InputField(
    { type, placeholder, title, required, toParent }:
        { type: InputFieldProps, placeholder?: string, title: string, required: boolean, toParent?: (value: string[] | number) => void }
) {
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [input, setInput] = useState<string>("")
    const [selected, setSelected] = useState<number>(0)

    const handleAdd = () => {
        if (input === "") return
        setSelectedWords([...selectedWords, input])
        setInput("")
        toParent && toParent(selectedWords)
    }

    const handleChange = (e: any) => {
        switch (type) {
            case "select":
                toParent && toParent(e)
                setSelected(e)
            case "file":
                setInput(e.target.files[0].name)
                toParent && toParent(e.target.files[0])
            default:
                setInput(e.target.value)
                toParent && toParent(e.target.value)

        }
    }

    switch (type) {
        case "textarea":
            return (
                <textarea
                    className="input-large r16 gray-700"
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={input}
                />
            )
        case "file":
            return (
                <label htmlFor="file">
                    <div className="input-file">
                        {
                            input
                            ? <div className="r16 gray-700">{input}</div>
                            : <div className="b26 gray-700">이미지, PDF를 올리거나,<br />텍스트를 붙여넣어주세요!</div>
                        }
                        <input
                            id="file"
                            type="file"
                            style={{ display: "none" }}
                            className="input-large r16 gray-700"
                            placeholder={placeholder}
                            onChange={handleChange}
                            value={input}
                        />
                    </div>
                </label>
            )
        default:
            return (
                <div className="vf gap8">
                    <div className="hf gap4">
                        <div className="sb16 gray-600">{title}</div>
                        {required && <div className="16SB red-500">*</div>}
                    </div>
                    <div className="vf gap4 w100">
                        {type === "select" ? (
                            <div className="hf gap8">
                                {[1, 2, 3].map((num) => (
                                    <div
                                        key={num}
                                        onClick={() => handleChange(num)}
                                        className={`input cj r16 gray-900 ${selected === num ? "input-selected" : ""}`}
                                    >
                                        {num}개
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="hf gap8">
                                <input
                                    type="text"
                                    className="input r16 gray-900"
                                    onChange={handleChange}
                                    value={input}
                                />
                                {
                                    type === "add" && (
                                        <Button type="main" text="추가" onClick={handleAdd} />
                                    )
                                }
                            </div>
                        )}
                        {type === "add" ? (
                            <div className="b12 gray-700">{selectedWords.join(", ")}</div>
                        ) : (
                            <div className="r12 gray-500">{placeholder}</div>
                        )}
                    </div>
                </div>
            );
    }
}