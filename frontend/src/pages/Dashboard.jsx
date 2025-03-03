import React from "react";
// import { Button } from "antd";

import AdminDashboard from "./AdminDashboard";
import SideBar from "./SideBar";
import Navbar from "./navbar";

const Dashboard = () => {
  return (
    <div className="admin-dashboard flex-row">
   <div className="side-bar-con">
      <SideBar/>
   </div>
    <div className="navbar-and-admin-panel">
    <Navbar/>
    <AdminDashboard/>
    </div>
   </div>
  );
};

export default Dashboard;
