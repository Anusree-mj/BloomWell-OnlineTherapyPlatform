import React, { useState, useEffect } from 'react';
import { useGoogleLogin, TokenResponse, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from '@mui/material';

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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log("dsd",tokenResponse)
      setUser(tokenResponse as any)
    }
  });
  

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <button onClick={()=>login()}>Login with google</button>
      {profile&& profile.name}
    </div>
  );
};

export default SocialLoginComponent;
