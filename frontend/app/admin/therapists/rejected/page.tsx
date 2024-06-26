'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import RejectedTherapistsComponent from "@/components/admin/therapist/rejectedTherapists";
import { Provider } from 'react-redux';
import store from "@/store";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
                <RejectedTherapistsComponent />
        </Provider>
    );
}
export default Page