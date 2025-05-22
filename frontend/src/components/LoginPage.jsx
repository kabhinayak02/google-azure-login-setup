import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  // const handleGoogleSuccess = async (authResult) => {
  //   if (authResult.code) {
  //     const res = await fetch(`http://localhost:8080/auth/google?code=${authResult.code}`);
  //     const data = await res.json();
  //     localStorage.setItem('user-info', JSON.stringify({ ...data.user, token: data.token }));
  //     navigate('/dashboard');
  //   }
  // };

  const handleMicrosoftLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/microsoft/url");
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error("Failed to get Microsoft login URL", err);
    }
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: handleGoogleSuccess,
  //   onError: (err) => console.error("Google Error", err),
  //   flow: "auth-code",
  // });

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      const res = await fetch(`http://localhost:8080/auth/google?code=${code}`);
      const data = await res.json();
      localStorage.setItem("user-info", JSON.stringify({ ...data.user, token: data.token }));
      navigate("/dashboard");
    },
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <button onClick={googleLogin}>Sign in with Google</button>
      <button onClick={handleMicrosoftLogin}>Sign in with Microsoft</button>
    </div>
  );
};

export default LoginPage;
