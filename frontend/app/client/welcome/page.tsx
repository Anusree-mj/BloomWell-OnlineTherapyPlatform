'use client'

import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import WelcomeComponent from "@/components/common/welcome/welcomeComponent"
import { clientWelcomeText } from "@/components/common/welcome/welcomeText"


const Page = () => {
       return (
        <>
            <LoginHeader />
            <WelcomeComponent welcomeText={clientWelcomeText} />
            <Footer />
        </>
    )
}

export default Page