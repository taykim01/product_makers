"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive"
import "./header.css"
import { Device } from "@/app/types";
import Icon from "@/presentation/assets/image/icon";
import ProgressBar from "../progress_bar";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header(
    { onClick, type, state, color }: { onClick?: () => void, type: "default" | "progress" | "text", state?: 0 | 1 | 2 | 3 | 4 | 5, color: "white" | "gray" | "transparent" }
) {
    const responsive = useResponsive()
    const router = useRouter()

    switch (responsive.responsive) {
        case Device.desktop:
            return (
                <div className={`header-desktop header header-${color}`}>
                    <Image
                        src={"https://firebasestorage.googleapis.com/v0/b/kairos-3326d.appspot.com/o/signiture.webp?alt=media&token=7aa5a7f5-643a-4d82-87a6-7d5546e99470"}
                        alt="logo"
                        width={127}
                        height={30}
                    />
                </div>
            )

        default:
            return (
                <div className={`header-mobile header header-${color}`}>
                    <div className="hf gap40 w100 ca sbj">
                        <Icon type="back" onClick={onClick} />
                        {
                            type === "progress"
                                ? state && <ProgressBar state={state} />
                                : type === "text" && <div onClick={onClick} className="r16 gray-900">메인화면으로</div>
                        }
                        <Image
                            src={"https://firebasestorage.googleapis.com/v0/b/kairos-3326d.appspot.com/o/logo.webp?alt=media&token=d35df359-3385-4d09-b738-09d3cbc7ce14"}
                            alt="logo"
                            width={28}
                            height={28}
                        />
                    </div>
                </div>
            )
    }
}