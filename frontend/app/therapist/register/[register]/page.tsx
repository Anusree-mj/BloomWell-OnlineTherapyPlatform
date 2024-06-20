'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer"
import TherapistSignupComponent from "@/components/therapists/signupComponents/therapistSignup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";

export default function Page({ params }: { params: { register: string } }) {
    const decodedRole = decodeURIComponent(params.register);
    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <TherapistSignupComponent roleType={decodedRole} />
            <Footer />
        </Provider>
    )
}

