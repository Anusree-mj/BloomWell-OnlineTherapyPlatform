'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientHeader from '@/components/client/header/clientHeader';
import Footer from '@/components/common/footer';
import DateProvider from '@/utilities/dateProvider';
import BookSlotComponent from '@/components/client/navicons/activities/bookSlotComponent';

const Page = () => {
    return ( 
        <Provider store={store}>
            <DateProvider>
                <ToastContainer />
                <ClientHeader />
                <BookSlotComponent />
                <Footer />
            </DateProvider>
        </Provider>
    );
}
export default Page