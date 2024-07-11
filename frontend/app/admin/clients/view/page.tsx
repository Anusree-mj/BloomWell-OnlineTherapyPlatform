'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminManageClients from "@/components/admin/clients/manageClientComponent";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <AdminManageClients />
        </Provider>
    );
}
export default Page