'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClienttHeader from '@/components/client/header/clientHeader';
import NotificationsComponent from '@/components/client/notifications/notificationComponent';

const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClienttHeader />
            <div style={{ paddingTop: '5.6rem' }}>
                <NotificationsComponent />
            </div>
        </Provider>
    );
}
export default Page