'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import NotificationsComponent from '@/components/user/notifications/notificationComponent';
import Footer from '@/components/common/footer';

export default function Page({ params }: { params: { userId: string } }) {
    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <NotificationsComponent userId={params.userId} />
            <Footer />
        </Provider>
    );
}
