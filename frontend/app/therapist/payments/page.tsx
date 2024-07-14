'use client'
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import TherapistEarningsComponent from '@/components/therapists/navIcons/payments/paymentComponent';

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <TherapistEarningsComponent />
            <Footer />
        </Provider>
    )
}

export default Page