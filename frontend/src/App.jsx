import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';             // Combined login page
import MicrosoftCallback from './components/MicrosoftCallback'; // MS OAuth callback handler
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import RefreshHandler from './components/RefreshHandler';
import GoogleCallback from './components/GoogleCallback'; // Google OAuth callback handler

function App() {
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAutheticated={setIsAutheticated} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />                  {/* Combined login */}
          <Route path="/oauth/microsoft" element={<MicrosoftCallback />} /> {/* MS redirect */}
          <Route path="/oauth/google" element={<GoogleCallback />} /> {/* Google redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
