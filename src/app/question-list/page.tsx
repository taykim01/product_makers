"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive"
import { Device } from "../types"
import Desktop from "./desktop"
import Mobile from "./mobile"
import ReduxProvider from "@/presentation/states/store"

export default function Page() {
    const responsive = useResponsive()
    switch (responsive.responsive) {
        case Device.mobile:
            return (
                <ReduxProvider><Mobile /></ReduxProvider>
            )
        default:
            return (
                <ReduxProvider><Desktop /></ReduxProvider>
            )
    }
}