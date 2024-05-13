'use client'

import AdminLogin from "@/components/admin/loginCompnents/login"
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from '../../../components/common/footer/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../../../store'

const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <AdminLogin />
            <Footer />
        </Provider>
    )
}

export default Page