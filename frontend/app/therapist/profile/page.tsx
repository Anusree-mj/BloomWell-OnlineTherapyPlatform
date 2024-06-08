'use client'
import TherapistProfileHeader from "@/components/therapists/header/therapistProfileHeader";
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import TherapistProfileComponent from "@/components/therapists/profile/details/therapistProfileComponent";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistProfileHeader />
            <TherapistProfileComponent />
            <Footer />
        </Provider>
    )
}

export default Page