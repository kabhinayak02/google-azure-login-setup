import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem('user-info')
    const userData = JSON.parse(data);

    setUserInfo(userData);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login');
  }
  return (
    // <div style={{width:"100vw"}}>
    //   <div>
    //     <h1>Welcome {userInfo?.name}</h1>
    //     <h3>Email: {userInfo?.email}</h3>
    //     <div className='' style={{width:"400px"}}>
    //       <p style={{width:"100%",textWrap:"wrap"}}>Our JWT Token: <span style={{width:"100px",textWrap:"wrap",display:"flex",}} className='break-all ZZwhitespace-normal'>{userInfo?.token}</span></p>
    //     </div>  

    //     <img src={userInfo?.imageUrl} alt={userInfo?.email} />
    //   </div>
    //   <button onClick={handleLogout}>Logout</button>

    // </div>

    <div className="w-screen flex flex-col items-center">
      <h1 className="text-2xl font-semibold mt-4">Welcome {userInfo?.name}</h1>
      <h3 className="text-lg mt-1">Email: {userInfo?.email}</h3>

      {/* JWT Token Block */}
      <div className="w-full max-w-md bg-gray-800 text-white p-4 rounded-md mt-4 break-all">
        <p className="mb-0">
          <span className="font-semibold">Our JWT Token:</span>
          <br />
          <span>{userInfo?.token}</span>
        </p>
      </div>

      <img
        src={userInfo?.imageUrl}
        alt={userInfo?.email}
        className="mt-4 w-24 h-24 rounded-full object-cover"
      />

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>




  )
}

export default Dashboard