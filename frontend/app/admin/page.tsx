'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from '../../store'

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />

        </Provider>
    );
}
export default Page