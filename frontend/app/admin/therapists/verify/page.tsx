'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import ManageClients from "@/components/admin/clients/manageClientComponent";
import { Provider } from 'react-redux';
import store from "@/store";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <div style={{ paddingTop: '5.6rem' }}>
                <h1>DashBoard</h1>
            </div>
        </Provider>
    );
}
export default Page