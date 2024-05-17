'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import AdminVerifyTherapists from "@/components/admin/therapist/verifyTherapist";
import { Provider } from 'react-redux';
import store from "@/store";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <div style={{ paddingTop: '1rem' }}>
                <AdminVerifyTherapists />
            </div>
        </Provider>
    );
}
export default Page