import { CredentialResponse, GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastAlert } from './ToastAlert';
import axios from 'axios';

const GoogleLoginButton = () => {
   const navigate = useNavigate();

   // Importando o ID Google
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
   const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const response = await axios.post('https://vammo.onrender.com/login', {
          token: credentialResponse.credential,
        });

        console.log('Login bem-sucedido:', response.data);
      } catch (error) {
        console.error('Erro ao autenticar:', error);
      }
    }
  };
    
  return (
    <div id='customBtn'>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={(handleSuccess => {
              navigate('/home')
              console.log(jwtDecode(handleSuccess.credential))
            })}
            onError={() => console.log('Erro no login')} />
      </GoogleOAuthProvider>
    </div>

  );
};

export default GoogleLoginButton;
