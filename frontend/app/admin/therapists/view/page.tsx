'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminManageTherapists from "@/components/admin/therapist/manageTherapists";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
                <AdminManageTherapists />
        </Provider>
    );
}
export default Page