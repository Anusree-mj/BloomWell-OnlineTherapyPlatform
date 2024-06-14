'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import AdminConnectionRequestsComponent from "@/components/admin/therapist/manageConnectionRequests";
import { Provider } from 'react-redux';
import store from "@/store";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
                <AdminConnectionRequestsComponent />
        </Provider>
    );
}
export default Page