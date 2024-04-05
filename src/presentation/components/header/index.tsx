"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive"
import "./header.css"
import { Device } from "@/app/types";
import Icon from "@/presentation/assets/image/icon";
import ProgressBar from "../progress_bar";
import Button from "../button";
import { useRouter } from "next/navigation";

export default function Header(
    { onClick, type, state, color }: { onClick?: () => void, type: "default" | "progress" | "text", state?: 0 | 1 | 2 | 3 | 4 | 5, color: "white" | "gray"| "transparent" }
) {
    const responsive = useResponsive()
    const router = useRouter()

    switch (responsive.responsive) {
        case Device.desktop:
            return (
                <div className={`header-desktop header header-${color}`}>
                    <div>로고</div>
                </div>
            )

        default:
            return (
                <div className={`header-mobile header header-${color}`}>
                    <div className="hf gap20 w100 ca">
                        <Icon type="back" onClick={onClick} />
                        {
                            type === "progress"
                                ? state && <ProgressBar state={state} />
                                : type === "text" && <div onClick={onClick} className="r16 gray-900">메인화면으로</div>
                        }
                    </div>
                </div>
            )
    }
}