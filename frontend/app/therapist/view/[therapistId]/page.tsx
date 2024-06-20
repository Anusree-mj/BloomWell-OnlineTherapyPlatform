'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ViewTherapistComponent from "@/components/therapists/viewDetails/viewTherapistDetailsComponent";

export default function Page({ params }: { params: { therapistId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <ViewTherapistComponent therapistId={params.therapistId} />
            <Footer />
        </Provider>
    )
}

