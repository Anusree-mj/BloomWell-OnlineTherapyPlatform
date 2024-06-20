'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientHeader from '@/components/client/header/clientHeader';
import AllActivityComponent from '@/components/client/navicons/activities/allActivityComponent';
import Footer from '@/components/common/footer';

const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientHeader />
            <AllActivityComponent />
            <Footer />
        </Provider>
    );
}
export default Page