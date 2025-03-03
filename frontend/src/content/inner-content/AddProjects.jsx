import React, { useState, useEffect, useRef } from "react";
import useCreateProject from "../../hooks/useCreateProject";
import SideBar from "../../pages/SideBar";
import Navbar from "../../pages/navbar";
import { message } from "antd";
import { useAllEmployees } from "../../hooks/useAllEmployees";

const AddProjects = () => {
  const { loading, error, createProject } = useCreateProject();
  const { employees } = useAllEmployees();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    priority: "",
  });
  const [showEmployees, setShowEmployees] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await createProject(projectData);
  };

  const handleEmployeeSelect = (employee) => {
    if (selectedEmployees.includes(employee._id)) {
      const updatedSelection = selectedEmployees.filter(id => id !== employee._id);
      setSelectedEmployees(updatedSelection);
      setProjectData({ ...projectData, assignedTo: updatedSelection });
    } else {
      const updatedSelection = [...selectedEmployees, employee._id];
      setSelectedEmployees(updatedSelection);
      setProjectData({ ...projectData, assignedTo: updatedSelection });
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowEmployees(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="admin-dashboard flex-row">
        <div className="side-bar-con">
          <SideBar />
        </div>
        <div className="navbar-and-admin-panel">
          <Navbar />
          <div className="admin-panel">
            <div className="add-employee-con">
              <h1>Add Projects</h1>
              <form onSubmit={handleFormSubmit} className="add-project-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="add-project-i add-form-i"
                    value={projectData.title}
                    onChange={handleInputChange}
                    placeholder="Project title"
                    required
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="description"
                    cols={10}
                    className="add-project-i add-form-i"
                    value={projectData.description}
                    onChange={handleInputChange}
                    placeholder="Project Description"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="priority"
                    className="add-project-i add-form-i"
                    value={projectData.priority}
                    onChange={handleInputChange}
                    placeholder="Set Priority"
                    required
                  />
                </div>

                <div className="form-group assign-employee">
                  <button
                    type="button"
                    className="assign-button add-form-i"
                    onClick={() => setShowEmployees(!showEmployees)}
                  >
                    Assign To?
                  </button>
                  {showEmployees && (
                    <div className="employee-dropdown" ref={dropdownRef}>
                      {employees.map((employee) => (
                        <div
                          key={employee._id}
                          className="employee-item"
                          onClick={() => handleEmployeeSelect(employee)}
                        >
                          <div className="employee-assign-detail flex-row">
                            {employee.name}
                            <div className="employee-assign-job">
                              {employee.jobTitle}
                            </div>
                          </div>
                          {selectedEmployees.includes(employee._id) && (
                            <span className="tick-mark">✔</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {error && message.error(error)}

                <button type="submit" className="submit-button add-btn">
                  {loading ? "Creating...." : "Create Project"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjects;
