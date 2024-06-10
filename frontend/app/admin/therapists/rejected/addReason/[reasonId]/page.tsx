'use client'
import AdminSingleHeader from "@/components/admin/header/adminSingleHeader";
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import AddRejectingReasonComponent from "@/components/admin/therapist/addRejectingReason";

const reasonItems = [
    'Invalid or Expired License', 'Insufficient Experience', 'Incomplete or Incorrect Information',
    'Background Check Issues', 'Not taking therapists at the moment'
]
const url = 'admin/therapists/rejected'
export default function Page({ params }: { params: { reasonId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <AdminSingleHeader />
            <div style={{ paddingTop: '1rem' }}>
                <AddRejectingReasonComponent reasonId={params.reasonId} reasonItems={reasonItems}
                    url={url} />
            </div>
            <Footer />
        </Provider>
    )
}

