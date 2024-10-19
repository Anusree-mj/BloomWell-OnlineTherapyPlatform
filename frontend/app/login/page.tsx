'use client'
import Header from '../../components/common/headers/header'
import Footer from '../../components/common/footer'
import Login from '../../components/common/login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../../store'

const Page = () => {
 

  return (
    <Provider store={store}>
      <ToastContainer />
      <Header />
      <Login />
      <Footer />
    </Provider>
  )
}

export default Page