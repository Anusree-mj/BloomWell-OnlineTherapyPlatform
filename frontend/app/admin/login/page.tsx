'use client'

import AdminLogin from "@/components/admin/loginCompnents/login"
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from '../../../components/common/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../../../store'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Loading from "@/components/common/loading";

const Page = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('adminData')) {
            router.push('/admin');
        } else {
            setLoading(false)
        }
    }, [router]);
    if (loading) {
        return (<Loading />)
    }
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