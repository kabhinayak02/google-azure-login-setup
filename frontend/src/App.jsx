// import { useState } from 'react'
// import './App.css'
// import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
// import GoogleLogin from './components/GoogleLogin'
// import Dashboard from './components/Dashboard'
// import PageNotFound from './components/PageNotFound'
// import RefreshHandler from './components/RefreshHandler'
// import { GoogleOAuthProvider } from '@react-oauth/google'

// function App() {
//   const [isAuthenticated, setIsAutheticated] = useState(false);
//   const clientId = import.meta.env.VITE_CLIENT_ID;
//   const GoogleAuthWrapper = () => {
//     return (
//       <GoogleOAuthProvider clientId={clientId}>
//         <GoogleLogin/>
//       </GoogleOAuthProvider>
//     )
//   }

//   const PrivateRoute = ({element}) => {
//     return isAuthenticated ? element : <Navigate to='/login' />
//   }

//   return (
   
//     <BrowserRouter>
//      <RefreshHandler setIsAutheticated={setIsAutheticated} />
//       <Routes>
//         <Route path="/login" element={<GoogleAuthWrapper/>} />
//         <Route path="/" element={<Navigate to="/login" />} /> 
//         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>} />
//         <Route path="*" element={<PageNotFound/>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';             // Combined login page
import MicrosoftCallback from './components/MicrosoftCallback'; // MS OAuth callback handler
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import RefreshHandler from './components/RefreshHandler';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAutheticated={setIsAutheticated} />
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />                  {/* Combined login */}
          <Route path="/oauth/microsoft" element={<MicrosoftCallback />} /> {/* MS redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
