'use client'
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import { Provider } from 'react-redux';
import store from '../../store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <TherapistHeader />
            <div style={{ paddingTop: '5.6rem' }}>
            </div>
        </Provider>
    );
}
export default Page