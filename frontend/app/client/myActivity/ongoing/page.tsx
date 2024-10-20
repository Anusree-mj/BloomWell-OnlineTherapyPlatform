'use client'
import { Provider } from 'react-redux';
import store from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientHeader from '@/components/client/header/clientHeader';
import Footer from '@/components/common/footer';
import OngoingActivityComponent from '@/components/client/navicons/activities/ongoingAtivityComponent';
import { useEffect, useState } from 'react';
import { clientAuth } from '@/utilities/auth';
import { getClientOngoingActivityAction, clientMyActivityStateType } from "@/store/clients/clientMyActionReducer";
import { useDispatch, useSelector } from "react-redux";
import { clientStateType } from '@/store/clients/clientReducer';
import Loading from '@/components/common/loading';

const Page = () => {
  return (
    <Provider store={store}>
      <PageContent />
    </Provider>
  );
};

const PageContent = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  let isTable = false;

  // Fetch therapistDetails and ongoingActivity from Redux state
  const therapistDetails = useSelector((state: { client: clientStateType }) => state.client.client.therapistDetails);
  const ongoingActivity = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.ongoingActivities);
  const isLoading = useSelector((state: { clientMyActivity: clientMyActivityStateType }) => state.clientMyActivity.isLoading)

  useEffect(() => {
    const response = clientAuth();
    if (response.status === 'ok') {
      const { clientDetails } = response;
      if (clientDetails?.isConnected && clientDetails?.therapistDetails) {
        dispatch(getClientOngoingActivityAction({ therapistId: clientDetails?.therapistDetails._id }));
        console.log('isloading after dispatch', isLoading)
        if (!isLoading) {
          console.log('therapistdataaaaaaa',therapistDetails)
          if (therapistDetails && therapistDetails.name !== '') {
            isTable = true;
          }
          setLoading(false)
        }
      }
    }
  }, [dispatch]);
  if (loading) return (<Loading />)
  return (
    <>
      <ToastContainer />
      <ClientHeader />
      {/* Pass therapistDetails and ongoingActivity as props to OngoingActivityComponent */}
      <OngoingActivityComponent therapistDetails={therapistDetails} ongoingActivity={ongoingActivity} isTable={isTable} />
      <Footer />
    </>
  );
};

export default Page;
