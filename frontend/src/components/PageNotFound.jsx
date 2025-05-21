import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
        <div>404 - Page Not Found</div>
        <button onClick={()=> navigate('/')}>Login</button>
    </>
  )
}

export default PageNotFound