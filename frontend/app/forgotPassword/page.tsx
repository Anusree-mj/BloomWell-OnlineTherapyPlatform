import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from '../../components/common/footer/footer'
import Forgot from '../../components/common/forgotPassword/forgot'
const Page = () => {
    return (
        <>
            <LoginHeader />
            <Forgot />
            <Footer />
        </>
    )
}

export default Page