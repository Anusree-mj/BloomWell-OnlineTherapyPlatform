'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from '../../components/common/footer/footer'
import Forgot from '../../components/common/forgotPassword/forgot'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <Forgot />
            <Footer />
        </Provider>
    )
}

export default Page