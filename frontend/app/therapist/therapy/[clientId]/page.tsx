'use client'
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import TherapistTherapyComponent from "@/components/therapists/therapy/therapistTherapyComponent";
import TherapistHeader from "@/components/therapists/header/therapistHeader";

export default function Page({ params }: { params: { clientId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <TherapistTherapyComponent clientId={params.clientId} />
            <Footer />
        </Provider>
    )
}

