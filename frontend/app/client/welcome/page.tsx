'use client'

import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import WelcomeComponent from "@/components/welcome/clientWelcomeText"
import { clientWelcomeText } from "@/components/welcome/welcomeText"


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