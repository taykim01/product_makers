"use client"

import "./segmented_control.css";
import { useEffect, useRef, useState } from "react";

export default function SegmentedControl(
    {defaultIndex, contents, onSelect}
    :{defaultIndex?: number, contents: string[], onSelect: (id: number) => void}
    ) {

    const [idx, setIdx] = useState(defaultIndex || 0)
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [xLocation, setXLocation] = useState(0)
    const [indicatorLength, setIndicatorLength] = useState(0)

    const handleClick = (id: number) => {
        setIdx(id);
        setXLocation((id * indicatorLength) + 4)
        onSelect(id);
    }

    useEffect(() => {
        setIndicatorLength(indicatorRef.current!.clientWidth)
        setXLocation((idx * indicatorRef.current!.clientWidth) + 4)
    }, [idx])

    return (
        <div className="sc_container">
            {
                contents.map(
                    (content: string, id: number) => (
                        <div
                            key={content}
                            className="sc_content"
                            onClick={() => handleClick(id)}
                            style={{ fontWeight: idx === id ? "600" : "500" }}
                        >
                            {content}
                        </div>
                    )
                )
            }
            <div
                ref={indicatorRef}
                className="sc_indicator"
                style={{
                    width: `calc((100% - 8px)/${contents.length})`,
                    left: xLocation
                }}
            />
        </div>
    )
}
