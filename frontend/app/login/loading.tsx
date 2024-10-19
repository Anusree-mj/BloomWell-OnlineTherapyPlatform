'use client'
import Loader from "@/components/common/loader/loader";
import { Box } from "@mui/system";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Loading() {
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
        router.push('/client/myActivity/ongoing')
      }
    } else if (localStorage.getItem('therapistData')) {
      const therapistData = JSON.parse(localStorage.getItem('therapistData') || '{}');
      const { image } = therapistData;
      if (image) {
        router.push('/therapist/activities/active')
      } else {
        router.push('/therapist/welcome');
      }
    }
  }, [])
  return (
    <Box sx={{minHeight:'100vh', backgroundColor: '#325343', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </Box>
  );
}
