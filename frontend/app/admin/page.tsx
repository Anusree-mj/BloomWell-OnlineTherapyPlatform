'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function () {
    const router = useRouter();
    useEffect(() => {
        const adminData = localStorage.getItem('adminData')
        if (!adminData) {
            router.push('/admin/login')
        }
    }, [])
    return (
        <>
            <AdminHeader />
        </>
    );
}
