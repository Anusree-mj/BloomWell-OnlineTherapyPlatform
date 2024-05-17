'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import AdminVerifyTherapists from "@/components/admin/therapist/manageTherapist";
import { Provider } from 'react-redux';
import store from "@/store";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <div style={{ paddingTop: '5.6rem' }}>
                <AdminVerifyTherapists />
            </div>
        </Provider>
    );
}
export default Page