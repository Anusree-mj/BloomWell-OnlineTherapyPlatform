'use client'
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import AddRejectingReasonComponent from "@/components/admin/therapist/addRejectingReason";

const reasonItems = [
    'Scheduling Conflicts', 'Specialization Mismatch', 'Personal Reasons',
    'Client Needs Specialized Care', 'Not connecting  at the moment'
]
const postUrl = 'therapist/rejected/connections'
const successUrl = 'therapist/dashboard/connections/rejected'
export default function Page({ params }: { params: { reasonId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <div style={{ paddingTop: '1rem' }}>
                <AddRejectingReasonComponent reasonId={params.reasonId} reasonItems={reasonItems}
                    postUrl={postUrl} successUrl={successUrl} />
            </div>
            <Footer />
        </Provider>
    )
}

