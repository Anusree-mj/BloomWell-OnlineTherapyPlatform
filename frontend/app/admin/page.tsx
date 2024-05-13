'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { useEffect } from "react";

export default function () {
    useEffect(() => {
        const adminData = localStorage.getItem('adminData')
        if (!adminData) {
            window.location.href = ('/admin/login')
        }
    }, [])
    return (
        <>
            <AdminHeader />
        </>
    );
}
