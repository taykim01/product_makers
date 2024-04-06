"use client"

import { useResponsive } from "@/presentation/hooks/useResponsive";
import { Device } from "../types";
import Mobile from "./mobile";
import Desktop from "./desktop";
import ReduxProvider from "@/presentation/states/store";

export default function Home() {
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