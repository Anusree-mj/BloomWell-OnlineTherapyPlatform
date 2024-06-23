'use client'
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import TherapistProfileComponent from "@/components/therapists/profile/details/therapistProfileComponent";
import TherapistHeader from "@/components/therapists/header/therapistHeader";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <TherapistProfileComponent />
            <Footer />
        </Provider>
    )
}

export default Page