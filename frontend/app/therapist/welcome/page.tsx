'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer"
import WelcomeComponent from "@/components/common/welcome/welcomeComponent"
import { therapistWelcomeText } from "@/components/common/welcome/welcomeText"

const Page = () => {

    return (
        <>
            <LoginHeader />
            <WelcomeComponent welcomeText={therapistWelcomeText} />
            <Footer />
        </>
    )
}

export default Page