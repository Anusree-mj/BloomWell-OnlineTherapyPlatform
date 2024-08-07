'use client'
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import TherapistsScheulesComponent from '@/components/therapists/navIcons/activities/scheduleComponent';

const Page = () => {

    return (
        <Provider store={store}>           
                <ToastContainer />
                <TherapistHeader />
                <TherapistsScheulesComponent />
                <Footer />
        </Provider>
    )
}

export default Page