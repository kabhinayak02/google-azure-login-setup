const MicrosoftLogin = () => {
  const clientId = import.meta.env.VITE_MS_CLIENT_ID;
  const redirectUri = "http://localhost:3000"; // frontend
  const scope = "User.Read";

  const handleLogin = () => {
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scope}&state=12345`;
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with Microsoft</button>;
};

export default MicrosoftLogin;
