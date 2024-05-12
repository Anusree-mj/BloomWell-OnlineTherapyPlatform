'use client'

import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import WelcomeComponent from "@/components/welcome/clientWelcomeText"
import { therapistWelcomeText } from "@/components/welcome/welcomeText"
import { useEffect } from "react"

const Page = () => {

    // useEffect(() => {
    //     const userData = localStorage.getItem('therapistData')
    //     if (!userData) {
    //         window.location.href = ('/login')
    //     } 
    // },[])
    return (
        <>
            <LoginHeader />
            <WelcomeComponent welcomeText={therapistWelcomeText} />
            <Footer />
        </>
    )
}

export default Page