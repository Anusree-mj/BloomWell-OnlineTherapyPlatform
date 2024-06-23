'use client'
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ClientMedicalInfoViewComponent from "@/components/admin/clients/clientMedicalInfoComponent";
import { LoginHeader } from "@/components/common/headers/loginHeader";

export default function Page({ params }: { params: { clientId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
                <ClientMedicalInfoViewComponent clientId={params.clientId} />
            <Footer />
        </Provider>
    )
}

