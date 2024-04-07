"use client"
import { InputFieldProps } from "@/app/types";
import "./input_field.css"
import { useEffect, useState } from "react";
import Button from "../button";

export default function InputField(
    { type, placeholder, title, required, toParent, value }:
        { type: InputFieldProps, placeholder?: string, title?: string, required: boolean, toParent?: (value: string | string[] | number) => void, value?: string }
) {
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [input, setInput] = useState<string>(value || "")
    const [selected, setSelected] = useState<number>(0)

    useEffect(() => {
        setInput(value || "")
    }, [])

    const handleAdd = () => {
        if (input === "") return
        toParent && toParent([...selectedWords, input])
        setSelectedWords([...selectedWords, input])
        setInput("")
    }

    const handleChange = (e: any) => {
        if (type === "select") {
            if (toParent) toParent(e);
            setSelected(e);
        } else if (type === "file") {
            setInput(e.target.files[0].name);
            if (toParent) toParent(e.target.files[0]);
        } else {
            setInput(e.target.value);
            if (toParent) toParent(e.target.value);
        }
    }

    switch (type) {
        case "textarea":
            return (
                <textarea
                    className="input-large r16 gray-700"
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value || ""}
                />
            )
        case "file":
            return (
                <label htmlFor="file">
                    <div className="input-file">
                        {
                            input
                                ? <div className="r16 gray-700">{input}</div>
                                : <div className="b26 gray-700">클릭해서, 이미지나 PDF를 올려주세요!</div>
                        }
                        <input
                            id="file"
                            type="file"
                            style={{ display: "none" }}
                            className="input-large r16 gray-700"
                            onChange={handleChange}
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
                                {
                                    type === "hashtag"
                                        ? <div className="input hf gap8 r16 gray-900 ca pr">
                                            <div>#</div>
                                            <input
                                                type="text"
                                                className="input-hashtag"
                                                onChange={handleChange}
                                                value={input}
                                            />
                                        </div>
                                        : <input
                                            type={type === "number" ? "number" : "text"}
                                            className="input r16 gray-900"
                                            onChange={handleChange}
                                            value={input}
                                        />
                                }
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