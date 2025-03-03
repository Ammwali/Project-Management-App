import React from 'react'
import { useAuth } from "../contexts/AuthContext";


const UserNavbar = () => {
  const { userData } = useAuth();
  
  return (
    <div className='user-navbar flex-row'>
        <div className="user-greetings">
        <h3 className='user-head'>Hi, {userData.name}</h3>
        <p>Here's your overview of your business</p>
        </div>
      
    </div>
  )
}

export default UserNavbar
