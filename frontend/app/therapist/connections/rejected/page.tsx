'use client'
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import RejectedConnectionsComponent from '@/components/therapists/navIcons/connections/rejectedConnection';

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <RejectedConnectionsComponent />
            <Footer />
        </Provider>
    )
}

export default Page