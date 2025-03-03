import React from "react";
import { useAllEmployees } from "../../hooks/useAllEmployees";
import SideBar from "../../pages/SideBar";
import Navbar from "../../pages/navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import EmployeeTable from "../EmployeeTable";
const ViewEmployees = () => {
  const { loading, error, employees } = useAllEmployees();
  const [searchTerm, setSearchTerm] = useState("");

  // const filteredEmployees = employees.filter(employee =>
  //   employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const currentDate = new Date();

  return (
    <>
      <div className="admin-dashboard flex-row">
        <div className="side-bar-con">
          <SideBar />
        </div>
        <div className="navbar-and-admin-panel">
          <Navbar />
          <div className="admin-panel">
            <div className="heading-and-addemployee-btn flex-row">
              <div className="date-and-heading">
                <h2 className="dash-heading">Employee</h2>
                <p className="date">{currentDate.toDateString()}</p>
              </div>
              <div className="add-user-card">
                <Link to="/employees/add-employees">
                  <i className="ri-add-line ri-xl"></i> Add employees
                </Link>
              </div>
            </div>

           

            <EmployeeTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmployees;
