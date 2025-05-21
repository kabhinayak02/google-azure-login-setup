import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (authResult) => {
    if (authResult.code) {
      const res = await fetch(`http://localhost:8080/auth/google?code=${authResult.code}`);
      const data = await res.json();
      localStorage.setItem('user-info', JSON.stringify({ ...data.user, token: data.token }));
      navigate('/dashboard');
    }
  };

  const handleMicrosoftLogin = () => {
    const clientId = import.meta.env.VITE_MS_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth/microsoft";
    const scope = "User.Read";
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scope}&state=ms`;
    window.location.href = authUrl;
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (err) => console.error("Google Error", err),
    flow: "auth-code",
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <button onClick={googleLogin}>Sign in with Google</button>
      <button onClick={handleMicrosoftLogin}>Sign in with Microsoft</button>
    </div>
  );
};

export default LoginPage;
