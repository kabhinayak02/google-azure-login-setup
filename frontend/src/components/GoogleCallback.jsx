import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const res = await fetch(`http://localhost:8080/auth/google/callback?code=${code}`);
        const data = await res.json();
        localStorage.setItem("user-info", JSON.stringify({ ...data.user, token: data.token }));
        navigate("/dashboard");
      } else {
        console.error("No code found in URL");
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Logging in with Google...</div>;
};

export default GoogleCallback;
