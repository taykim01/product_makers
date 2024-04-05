"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive"
import { Device } from "../types"
import Desktop from "./desktop"
import Mobile from "./mobile"

export default function Home() {
    const responsive = useResponsive()
    switch (responsive.responsive) {
        case Device.mobile:
            return (<Mobile />)
        default:
            return (<Desktop />)
    }
}