'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientHeader from '@/components/client/header/clientHeader';
import FeedBackComponent from '@/components/client/navicons/feedback';
import Footer from '@/components/common/footer';
const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientHeader />
            <FeedBackComponent />
            <Footer />
        </Provider>
    );
}
export default Page