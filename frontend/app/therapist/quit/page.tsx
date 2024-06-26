'use client'
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import TherapistHeader from "@/components/therapists/header/therapistHeader";
import TherapistQuitComponent from "@/components/therapists/navIcons/quit/quitComponent";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <TherapistQuitComponent />
            <Footer />
        </Provider>
    )
}

export default Page