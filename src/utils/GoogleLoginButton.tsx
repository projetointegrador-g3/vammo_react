import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastAlert } from './ToastAlert';
import axios from 'axios';

const GoogleLoginButton = () => {
   const navigate = useNavigate();
    // const { handleGoogleLogin } = useContext(AuthContext);

     const login = GoogleLogin({

      onSuccess: async tokenResponse => {
        console.log(tokenResponse);
        
        const userInfo = await axios
          .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then(res => res.data);
  
        console.log(userInfo);
      },
      // flow: 'implicit', // implicit is the default
    });
    
  return (
    <>
      <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log('Google Login com sucesso:', credentialResponse);
        console.log(jwtDecode(credentialResponse.credential));
        navigate('/home')
      }}
      onError={() => console.log('Login falhou!')} 
      auto_select={true}
      />
    </>

  );
};

export default GoogleLoginButton;
