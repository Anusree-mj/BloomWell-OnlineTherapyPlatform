'use client'

import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import WelcomeComponent from "@/components/welcome/clientWelcomeText"
import { clientWelcomeText } from "@/components/welcome/welcomeText"
import { useEffect } from "react"
import { useRouter } from "next/router"

const Page = () => {
    const router = useRouter()
    useEffect(() => {
        const userData = localStorage.getItem('clientData')
        if (!userData) {
            router.push('/login')
        }
    }, [])
    return (
        <>
            <LoginHeader />
            <WelcomeComponent welcomeText={clientWelcomeText} />
            <Footer />
        </>
    )
}

export default Page