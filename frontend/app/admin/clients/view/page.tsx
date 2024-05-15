'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminManageClients from "@/components/admin/clients/manageClientComponent";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <div style={{ paddingTop: '5.6rem' }}>
                <AdminManageClients />
            </div>
        </Provider>
    );
}
export default Page