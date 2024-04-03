"use client"

import "./segmented_control.css";
import "../../assets/styles/Global.css"
import { useEffect, useRef, useState } from "react";

export default function SegmentedControl(props: any) {

    const [idx, setIdx] = useState(props.defaultIndex || 0)
    const labels = props.contents;
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [xLocation, setXLocation] = useState(0)
    const [indicatorLength, setIndicatorLength] = useState(0)

    const handleClick = (id: number) => {
        setIdx(id);
        setXLocation((id * indicatorLength) + 4)
        props.onSelect(id);
    }

    useEffect(() => {
        setIndicatorLength(indicatorRef.current!.clientWidth)
        setXLocation((idx * indicatorRef.current!.clientWidth) + 4)
    }, [idx])

    return (
        <div className="sc_container">
            {
                labels.map(
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
                    width: `calc((100% - 8px)/${labels.length})`,
                    left: xLocation
                }}
            />
        </div>
    )
}
