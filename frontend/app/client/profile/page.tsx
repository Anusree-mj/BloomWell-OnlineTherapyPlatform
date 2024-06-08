'use client'
import ClientProfiletHeader from "@/components/client/header/clientProfileHeader";
import Footer from "@/components/common/footer/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ClientProfileComponent from "@/components/client/profile/details/clientProfileComponent";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientProfiletHeader />
            <ClientProfileComponent />
            <Footer />
        </Provider>
    )
}

export default Page