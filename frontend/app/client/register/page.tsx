
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import ClientSignupComponent from "@/components/signupComponents/client/clientSignup"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import { useEffect } from "react";

const Page = () => {
   
    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <ClientSignupComponent />
            <Footer />
        </Provider>

    )
}

export default Page