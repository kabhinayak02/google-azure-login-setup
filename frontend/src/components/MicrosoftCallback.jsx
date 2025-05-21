import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MicrosoftCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("code++++++ ", code);

    if (code) {
      fetch(`http://localhost:8080/auth/microsoft?code=${code}`)
        .then(res => res.json())
        .then(data => {
          localStorage.setItem("user-info", JSON.stringify({ ...data.user, token: data.token }));
          navigate("/dashboard");
        })
        .catch(err => console.error("Microsoft login error", err));
    }
  }, []);

  return <p>Logging in with Microsoft...</p>;
};

export default MicrosoftCallback;
