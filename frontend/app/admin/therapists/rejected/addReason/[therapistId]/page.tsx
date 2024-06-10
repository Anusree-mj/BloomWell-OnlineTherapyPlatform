'use client'
import AdminSingleHeader from "@/components/admin/header/adminSingleHeader";
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import AddRejectingReasonComponent from "@/components/admin/therapist/addRejectingReason";

export default function Page({ params }: { params: { therapistId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <AdminSingleHeader />
            <div style={{ paddingTop: '1rem' }}>
                <AddRejectingReasonComponent therapistId={params.therapistId} />
            </div>
            <Footer />
        </Provider>
    )
}

