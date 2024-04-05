"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive"
import "./header.css"
import { Device } from "@/app/types";
import Icon from "@/presentation/assets/image/icon";
import ProgressBar from "../progress_bar";
import Button from "../button";
import { useRouter } from "next/navigation";

export default function Header(
    { onClick, type, state }: { onClick?: () => void, type: "default" | "progress" | "text", state?: 0 | 1 | 2 | 3 | 4 }
) {
    const responsive = useResponsive()
    const router = useRouter()

    switch (responsive.responsive) {
        case Device.desktop:
            return (
                <div className={`header-desktop header`}>
                    <div>로고</div>
                    <div><Button type="sub" text="메인화면으로" onClick={() => router.push("/")} /></div>
                </div>
            )

        default:
            return (
                <div className={`header-mobile header`}>
                    <div className="hf gap20 w100 ca">
                        <Icon type="back" onClick={() => router.back()} />
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