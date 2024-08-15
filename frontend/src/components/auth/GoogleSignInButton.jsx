import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { Auth } from '../../api/auth';
import { useAuth } from '../../utils/AuthContext';

const GoogleSignInButton = (text = 'signin_with') => {
  const { loginSetup } = useAuth();
  const onSuccess = async (response) => {
    const decoded = jwtDecode(response?.credential);
    const apiResponse = await Auth.LoginWithGoogleAPI(decoded);
    if (apiResponse.success) {
      loginSetup(
        apiResponse.accessToken,
        apiResponse.refreshToken,
        apiResponse.user
      );
      toast.success('Login Successful');
    } else {
      toast.error(apiResponse.message);
    }
  };

  const onFailure = (error) => {
    console.error('Error:', error);
    toast.error('Error logging in');
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex justify-center w-full">
        <GoogleLogin
          size="large"
          logo_alignment="center"
          text={text}
          shape="rectangular"
          lang="en"
          style={{ width: '100%' }}
          //   width={'400'}
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </div>
    </div>
  );
};

export default GoogleSignInButton;
