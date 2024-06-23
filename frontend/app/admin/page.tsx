'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from '../../store'
import DashBoardComponent from "@/components/admin/other/dashBoardComponent";
const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <DashBoardComponent />
        </Provider>
    );
}
export default Page