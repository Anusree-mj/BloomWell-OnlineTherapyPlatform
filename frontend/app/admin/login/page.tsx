import AdminLogin from "@/app/components/admin/loginCompnents/login"
import { LoginHeader } from "@/app/components/common/headers/loginHeader"
import Footer from '../../components/common/footer/footer'

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