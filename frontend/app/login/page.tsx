'use client'
import React from 'react'
import Header from '../../components/common/headers/header'
import Footer from '../../components/common/footer/footer'
import Login from '../../components/loginComponents/login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../../store'

const Page = () => {
  return (
    <Provider store={store}>
    <ToastContainer />
      <Header />
      <div style={{ paddingTop: '5.6rem' }}>
        <Login />
      </div>
      <Footer />
      </Provider>
  )
}

export default Page