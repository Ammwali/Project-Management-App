import React, { useState } from "react";
import { useAllEmployees } from "../hooks/useAllEmployees";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); 

  const { loading, error, employees } = useAllEmployees();


  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <div className="search-bar-con">
        <input
          type="search"
          placeholder="Search Employees by Name"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e.target.value);
            }
          }}
          className="search-bar"
        />
      </div>

      {loading && <Spin className="loader" />}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="employee-table">
        <div className="table-head flex-row">
          <p>Name</p>
          <p className="skills-para">Skills</p>
          <p>Job Title</p>
          <p>Email</p>
         
        </div>

        <div className="tab-div">
          {filteredEmployees.map((employee) => (
            <div key={employee._id} className="table-body flex-row">
              <p>{employee.name}</p>
              <p className="skills-para">
                <span className="skills-td">
                  {employee.skills.length > 2
                    ? employee.skills.slice(0, 2).join(", ") + " ..."
                    : employee.skills.join(", ")}
                </span>
              </p>
              <p>{employee.jobTitle}</p>
              <p className="flex-row email-td">
                <i className="ri-mail-line ri-xl"></i>
                {employee.email}
              </p>
            
              <span className="edit-btn-p">
                <button
                  onClick={() =>
                    navigate(`/employees/update-employee/${employee._id}`)
                  }
                  className="edit-btn"
                >
                  Edit
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
