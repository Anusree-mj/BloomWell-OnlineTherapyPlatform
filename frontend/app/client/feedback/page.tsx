'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientHeader from '@/components/client/header/clientHeader';
import FeedBackComponent from '@/components/client/navicons/activities/feedback';

const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClientHeader />
                <FeedBackComponent />
        </Provider>
    );
}
export default Page