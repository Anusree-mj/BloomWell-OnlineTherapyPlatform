'use client'
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import ConnectionComponent from "@/components/client/navicons/activities/connectionComponent";
import ClientHeader from "@/components/client/header/clientHeader";

const Page = () => {

    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientHeader />
            <ConnectionComponent />
            <Footer />
        </Provider>
    )
}

export default Page