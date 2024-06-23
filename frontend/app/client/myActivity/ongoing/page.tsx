'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientHeader from '@/components/client/header/clientHeader';
import Footer from '@/components/common/footer';
import OngoingActivityComponent from '@/components/client/navicons/activities/ongoingAtivityComponent';

const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientHeader />
            <OngoingActivityComponent />
            <Footer />
        </Provider>
    );
}
export default Page