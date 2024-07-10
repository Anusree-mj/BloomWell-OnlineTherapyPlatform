'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminPayment from "@/components/admin/therapist/paymentComponent";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
                <AdminPayment />
        </Provider>
    );
}
export default Page