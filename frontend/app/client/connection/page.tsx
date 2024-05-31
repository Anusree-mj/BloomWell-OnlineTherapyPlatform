'use client'
import { LoginHeader } from "@/components/common/headers/loginHeader"
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ConnectionComponent from "@/components/client/connection/connectionComponent";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <LoginHeader />
            <ConnectionComponent />
            <Footer />
        </Provider>
    )
}

export default Page