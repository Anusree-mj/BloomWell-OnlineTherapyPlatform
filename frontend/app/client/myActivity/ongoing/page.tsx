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
import { getClientOngoingActivityAction } from "@/store/clients/clientMyActionReducer";
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

// Define the type for therapist details
interface TherapistDetails {
  _id: string;
  name: string;
}

const Page = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [therapistDetails, setTherapistDetails] = useState<TherapistDetails | null>(null); // Allow therapistDetails to be either null or a TherapistDetails object
  const [ongoingActivity, setOngoingActivity] = useState([]); // Initialize ongoingActivity as an empty array
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = clientAuth();
      if (response.status === 'ok') {
        const { clientDetails } = response;
        if (clientDetails?.isConnected && clientDetails?.therapistDetails) {
          setTherapistDetails(clientDetails.therapistDetails); // Now it can safely be an object

          // Dispatch the action to fetch ongoing activities
          const result = await dispatch(getClientOngoingActivityAction({ therapistId: clientDetails.therapistDetails._id }));
          setOngoingActivity(result.payload); // Assuming the result is available as payload
        }
      }
      setLoading(false); // Stop loading after data fetching is done
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex', backgroundColor: '#325343',
        flexDirection: 'column', minHeight: '80vh',
        alignItems: 'center', justifyContent: 'center', pb: 8
      }}>
        <p>Loading...</p> {/* Replace with a proper spinner if needed */}
      </Box>
    );
  }

  return (
    <Provider store={store}>
      <ToastContainer />
      <ClientHeader />
      <OngoingActivityComponent therapistDetails={therapistDetails} ongoingActivity={ongoingActivity} />
      <Footer />
    </Provider>
  );
};

export default Page;
