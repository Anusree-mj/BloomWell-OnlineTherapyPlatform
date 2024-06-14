'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminTherapistsQuitComponent from "@/components/admin/therapist/quitTherapists";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
                <AdminTherapistsQuitComponent />
        </Provider>
    );
}
export default Page