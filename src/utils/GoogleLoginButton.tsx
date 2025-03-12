import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { ToastAlert } from './ToastAlert';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const GoogleLoginButton = () => {
    const { handleGoogleLogin } = useContext(AuthContext);

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          await handleGoogleLogin(tokenResponse.access_token);
        } else {
          ToastAlert('Erro ao obter token do Google', 'erro');
        }
      },
      onError: () => {
        ToastAlert('Erro ao fazer login com Google', 'erro');
      },
    });
    
  return (
    <button 
      onClick={() => login()}>
      <img 
        src='https://ik.imagekit.io/grupo03/Vammo/google-sigh-up%20(1).png?updatedAt=1741185816536' 
        alt='Google Logo' 
        className='w-15 cursor-pointer mx-43 mt-2'
      />
    </button>

  );
};

export default GoogleLoginButton;
