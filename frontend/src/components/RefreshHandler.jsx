import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RefreshHandler = ({ setIsAutheticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const token = JSON.parse(data)?.token;
        if (token) {
            setIsAutheticated(true);
            if (location.pathname === '/' || location.pathname === '/login') {
                navigate('/dashboard', {
                    replace: false
                });
            }
        }
    }, [navigate, location, setIsAutheticated]);
    return null;
}

export default RefreshHandler;