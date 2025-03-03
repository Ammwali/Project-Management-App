import React from 'react'
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
// import LogoutIcon from '../svgComponents/LogoutIcon';
const UserSideBar = () => {
  const { logout} = useAuth();
    // const { logout, userData, isAuthenticated } = useAuth();
  return (
    <>
        <div className="user-side-bar">
           
           <div className="user-dashboard-heading">
            <h3>ProManage</h3>
           </div>

           <div className="user-links-con">
           <div className="user-link">
              <NavLink to="/user-dashboard" className="user-links user-dashboard-link"><i class="ri-home-4-line ri-xl"></i><span className='links-name'>Dashboard</span></NavLink>
            </div>

            <div className="user-link">
              <NavLink to="/user/projects" className="user-links Explore-Projects-link">
              <i className="ri-computer-line ri-xl"></i><span className='links-name'>Projects</span></NavLink>
            </div>

            <div className="user-link">
              <NavLink to="/user/profile" className="user-links profile-link"><i className="ri-user-settings-line ri-xl"></i><span className='links-name'>Profile</span></NavLink>
            </div>
           </div>

           <button onClick={logout} className='logout-btn-user'><i class="ri-logout-circle-line ri-xl"></i><span>Logout</span></button>
        </div>
    </>
  )
}

export default UserSideBar