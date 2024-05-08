import AdminLogin from "@/app/components/admin/loginCompnents/login"
import { LoginHeader } from "@/app/components/common/headers/loginHeader"
import Footer from '../components/common/footer/footer'
import Forgot from '../components/common/forgotPassword/forgot'
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