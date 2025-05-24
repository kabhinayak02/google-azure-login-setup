import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleMicrosoftLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/microsoft/url");
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error("Failed to get Microsoft login URL", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/google/url");
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error("Failed to get Microsoft login URL", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={handleMicrosoftLogin}>Sign in with Microsoft</button>
    </div>
  );
};

export default LoginPage;
