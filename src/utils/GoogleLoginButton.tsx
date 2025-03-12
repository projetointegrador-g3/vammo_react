import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { ToastAlert } from "./ToastAlert";
import axios from "axios";
import { Button } from "../components/ui/button";

const GoogleLoginButton = () => {

    // Função executada após o login
  const responseGoogle = (response: any) => {
    console.log('Google Login Response:', response);
    ToastAlert('Login efetuado com sucesso!', 'sucesso');
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        console.log("Usuário logado:", userInfo.data);
        ToastAlert('Login efetuado com sucesso!', 'sucesso');

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    },
    onError: () => {
      ToastAlert('Erro ao fazer login', 'erro');
    }
  });

  return (
    <Button 
      onClick={() => login()} 
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
    >
      <img 
        src="" 
        alt="Google Logo" 
        className="w-5 h-5"
      />
      Entrar com Google
    </Button>

  );
};

export default GoogleLoginButton;
