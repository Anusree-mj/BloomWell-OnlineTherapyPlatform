import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import WelcomeComponent from "@/components/welcome/clientWelcomeText"
import { therapistWelcomeText } from "@/components/welcome/welcomeText"

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