import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLogin = () => {
  const navigate = useNavigate();

  // API call to your backend to exchange code for user info and token
  const googleAuth = (code) => {
    return axios.get(`http://localhost:8080/auth/google?code=${code}`);
  };

  const handleSuccess = async (authResult) => {
    if (!authResult?.code) return;
    try {
      const result = await googleAuth(authResult.code);
      console.log("result#####", result);
      const { name, email, imageUrl } = result.data.user;
      const token = result.data.token;
      const obj = { email, name, token, imageUrl };

      localStorage.setItem("user-info", JSON.stringify(obj));
      navigate('/dashboard');
    } catch (error) {
      console.error("Error exchanging code with server:", error);
    }
  };

  const handleError = (error) => {
    console.error("Google login failed:", error);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code",
  });

  return (
    <div className='App'>
      <button onClick={googleLogin} aria-label="Login with Google">
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
