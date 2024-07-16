'use client'

import AdminHeader from "@/components/admin/header/adminHeader";
import { Provider } from 'react-redux';
import store from "@/store";
import AdminFeedBackComponent from "@/components/admin/other/feedbackComponet";

const Page = () => {
    return (
        <Provider store={store}>
            <AdminHeader />
            <AdminFeedBackComponent />
        </Provider>
    );
}
export default Page