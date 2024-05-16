'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import TherapistSignupComponent from "@/components/therapists/signupComponents/therapistSignup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";

export default function Page({ params }: { params: { register: string } }) {
    console.log(params.register, 'role obtained')
    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <TherapistSignupComponent roleType={params.register} />
            <Footer />
        </Provider>

    )
}

