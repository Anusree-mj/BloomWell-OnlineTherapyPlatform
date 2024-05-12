'use client'

import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import WelcomeComponent from "@/components/welcome/clientWelcomeText"
import { clientWelcomeText } from "@/components/welcome/welcomeText"
import { useEffect } from "react"

const Page = () => {

    useEffect(() => {
        const userData = localStorage.getItem('clientData')
        if (!userData) {
            window.location.href = ('/login')
        } 
    },[])
    return (
        <>
            <LoginHeader />
            <WelcomeComponent welcomeText={clientWelcomeText} />
            <Footer />
        </>
    )
}

export default Page