import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  // const { logout, userData, isAuthenticated } = useAuth();
  return (
    <div className="side-bar">
      <div className="logo-color">ProManage</div>
      <ul>
        <li>
          <NavLink to="/admin-dashboard" className="dashboard-link admin-links">
            <i className="ri-dashboard-line ri-xl"></i>Dashboard
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/employees" className="employee-link admin-links">
            <i className="ri-group-line ri-xl"></i>Employees
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/projects" className="project-link admin-links">
          <i class="ri-computer-line ri-xl"></i>Projects
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
