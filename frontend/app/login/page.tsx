'use client'
import Header from '../../components/common/headers/header'
import Footer from '../../components/common/footer'
import Login from '../../components/common/login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../../store'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/loading';

const Page = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('clientData')) {
      const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');
      const { questionnaire, isAnUser } = clientData;
      if (Array.isArray(questionnaire) && questionnaire.length === 0) {
        router.push('/client/details');
      } else if (!isAnUser) {
        router.push('/client/payment');
      } else {
        router.push('/client/myActivity/ongoing');
      }
    } else if (localStorage.getItem('therapistData')) {
      const therapistData = JSON.parse(localStorage.getItem('therapistData') || '{}');
      const { image } = therapistData;
      if (image) {
        router.push('/therapist/activities/active');
      } else {
        router.push('/therapist/welcome');
      }
    } else {
      setLoading(false); // Once the check is done, set loading to false
    }
  }, [router]);
  if (loading) return (<Loading />)
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