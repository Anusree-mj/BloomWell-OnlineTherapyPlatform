import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { getSignInWithGoogleAction } from '@/store/clients/clientReducer';
import { Box } from '@mui/system';
import Image from 'next/image';

interface User {
  credential: any;
  access_token: string;
  // Add any other properties you expect in the user object
}

interface Profile {
  // Define the expected structure of the profile object
  id: string;
  email: string;
  name: string;
  picture: string;
  // Add other fields as necessary
}

const SocialLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log("dsd", tokenResponse)
      setUser(tokenResponse as any)
      dispatch(getSignInWithGoogleAction({ profile: tokenResponse, handleSigninWithGoogleSuccess }));

    }
  });


  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //           Accept: 'application/json'
  //         }
  //       })
  //       .then((res) => {
  //         console.log('response got from google axios', res.data)
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);
  // useEffect(() => {
  //   console.log('profile detailsss', profile)
  // }, [profile])
  const handleSigninWithGoogleSuccess = () => {
    router.push('/client/details')
  }
  return (
    <Box>
      <Button sx={{
        mt: 2, display: 'flex', alignItems: 'center', gap: 1,
        '&:hover': {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }
      }} onClick={() => { login() }} >
        <Image src="/google.png"
          alt="google"
          width={20}
          height={20} />
        Sign In with Google
      </Button>
    </Box>
  );
};

export default SocialLoginComponent;
