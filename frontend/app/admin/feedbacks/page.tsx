'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminFeedBackComponent from "@/components/admin/other/feedbackComponet";
import { useEffect } from "react";
import { adminAuth } from "@/utilities/auth";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    useEffect(() => {
        const { status } = adminAuth()
        if (status !== 'ok') {
            router.push('/admin/login');
        }
    }, [])
    return (
        <Provider store={store}>
            <AdminHeader />
            <AdminFeedBackComponent />
        </Provider>
    );
}
export default Page