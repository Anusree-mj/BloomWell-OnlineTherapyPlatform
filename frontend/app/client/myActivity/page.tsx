'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClienttHeader from '@/components/client/header/clientHeader';
import AllActivityComponent from '@/components/client/myActivity/allActivityComponent';
const Page = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <ClienttHeader />
            <div style={{ paddingTop: '5.6rem' }}>
                <AllActivityComponent />
            </div>
        </Provider>
    );
}
export default Page