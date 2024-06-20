'use client'
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ClientTherapyComponent from "@/components/client/therapy/clientTherapyComponent";
import ClientHeader from "@/components/client/header/clientHeader";

export default function Page({ params }: { params: { therapistId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientHeader />
            <ClientTherapyComponent therapistId={params.therapistId} />
            <Footer />
        </Provider>
    )
}

