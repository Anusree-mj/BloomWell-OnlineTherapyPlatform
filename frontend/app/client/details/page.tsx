'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ClientDetailsComponent from "@/components/client/submitDetails/submitClientDetails";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <ClientDetailsComponent />
            <Footer />
        </Provider>
    )
}

export default Page