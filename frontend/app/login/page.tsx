import React from 'react'
import Header from '../components/common/headers/header'
import Footer from '../components/common/footer/footer'
import Login from '../components/loginComponents/login'

const Page = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '7.5rem' }}>
        <Login />
      </div>
      <Footer />
    </>
  )
}

export default Page