import React from 'react'
import { useAuth } from '../contexts/AuthContext';
const Navbar = () => {
    const { logout, userData } = useAuth();
  return (
    <div className="navbar flex-row">
    <div className="admin-name-greet">
      <h3>Hi , {userData.name}</h3>
      <p>Keep up the good work!</p>
    </div>
    <button onClick={logout} className="logout-btn">
      Logout
    </button>
  </div>
  )
}

export default Navbar