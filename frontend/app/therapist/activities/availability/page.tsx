'use client'
import TherapistHeader from '@/components/therapists/header/therapistHeader';
import Footer from "@/components/common/footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from "@/store";
import AddAvailabilityForm from '@/components/therapists/navIcons/activities/availabilityComponent';
import DateProvider from '@/utilities/dateProvider';

const Page = () => {

    return (
        <Provider store={store}>
            <DateProvider>
                <ToastContainer />
                <TherapistHeader />
                <AddAvailabilityForm />
                <Footer />
            </DateProvider>
        </Provider>
    )
}

export default Page