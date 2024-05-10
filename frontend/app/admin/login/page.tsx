import AdminLogin from "@/components/admin/loginCompnents/login"
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from '../../../components/common/footer/footer'

const Page = () => {
    return (
        <>
            <LoginHeader />
            <AdminLogin />
            <Footer />
        </>
    )
}

export default Page