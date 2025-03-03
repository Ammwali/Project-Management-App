import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchOneEmployees,
  fetchUpdateEmployees,
  fetchDeleteEmployees,
} from "../../fetching/FetchAllEnployees";
import useFetchEmployee from "../../hooks/useFetchEmployee";
import Navbar from "../../pages/navbar";
import SideBar from "../../pages/SideBar";
import { message } from "antd";
import { Spin } from "antd";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { employee, loading, error, setEmployee, setError } = useFetchEmployee(id);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    role: "",
    email: "",
    skills: "",
    salary: "",
    createdAt: "",
    updatedAt: "",
    jobTitle: "",
    projects: "",
  });


  useEffect(() => {
    if (employee) {
      setUpdatedData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        skills: employee.skills,
        salary: employee.salary,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt,
        jobTitle: employee.jobTitle,
        projects: employee.projects,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchUpdateEmployees(id, updatedData);
      const { data, response } = await fetchOneEmployees(id);
      if (response.status === 200) {
        setEmployee(data.employee);
        message.success("Employee Updated");
      } else if (response.status === 400) {
        setError(data.message);
      } else {
        setError("Could not Update Employee");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await fetchDeleteEmployees(id);
      message.success("Employee deleted successfully");
      navigate("/employees");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <>
        <div className="admin-dashboard flex-row">
          <div className="side-bar-con">
            <SideBar />
          </div>
          <div className="navbar-and-admin-panel">
            <Navbar />
            <div className="admin-panel">
              <Spin className="loader" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    {error && message.error(error)}
      <div className="admin-dashboard flex-row">
        <div className="side-bar-con">
          <SideBar />
        </div>
        <div className="navbar-and-admin-panel">
          <Navbar />
          <div className="admin-panel">
            <div className="employee-main flex-row">
              <div className="employee-card flex-row">
                <div className="employee-name-and-delete-btn">
                  <h4>{employee.name}</h4>
                  <p>
                    Member since{"  "}
                    {employee.createdAt
                      ? new Date(employee.createdAt).toLocaleDateString()
                      : "Invalid date"}
                  </p>
                  <button onClick={handleDelete} disabled={loading} className="delete-btn">
                    {loading ? "Deleting..." : "Delete Employee"}
                  </button>
                </div>
                <div className="employee-details">
                  <span className="employee-detail-head">
                    Official Information
                  </span>
                <div className="employee-details-body">
                <div className="employee-email">
                    <p>Email</p>
                    <span>{employee.email}</span>
                  </div>
                  <div className="employee-skills">
                    <p>Skills</p>
                    <span>
                      {Array.isArray(employee.skills) &&
                      employee.skills.length > 0
                        ? employee.skills.join(", ")
                        : "No skills available"}
                    </span>
                  </div>
                  <div className="employee-salary">
                    <p>Salary</p>
                    <span>{`PKR ${Number(
                      employee.salary
                    ).toLocaleString()}`}</span>
                  </div>
                  <div className="employee-salary">
                    <p>Job Title</p>
                    <span>{employee.jobTitle}</span>
                  </div>
                </div>
                </div>
              </div>

              <div className="update-form add-employee-con">
                <h4>Edit Employee</h4>

                <form onSubmit={handleSubmit}>
                  <div className="update-form-grid">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="add-form-i"
                        placeholder="Email"
                        value={updatedData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="skills"
                        className="add-form-i"
                        placeholder="Type Skills"
                        value={updatedData.skills}
                        onChange={(e) => {
                          const skillsArray = e.target.value.split(",");
                          setUpdatedData({
                            ...updatedData,
                            skills: skillsArray,
                          });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="salary"
                        className="add-form-i"
                        placeholder="Salary"
                        value={updatedData.salary}
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, "");
                          if (!isNaN(value)) {
                            setUpdatedData({
                              ...updatedData,
                              salary: Number(value),
                            });
                          }
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="jobTitle"
                        className="add-form-i"
                        placeholder="Job Title"
                        value={updatedData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button type="submit" className="add-btn">
                    Update
                  </button>
                </form>
              </div>
            </div>

            <div className="employee-project">
              <p className="working-on">Working on :</p>

              {employee.projects && employee.projects.length > 0 ? (
                employee.projects.map((project, index) => (
                  <div key={index} className="project-detail">
                    <h4>{project.title}</h4>
                    <p className="project-description">{project.description}</p>
                    <div className="project-status-detail flex-row">
                      <div className="status-and-priority">
                        <p className="status">
                          Status:
                          {project.status === "In Progress" ? (
                            <i
                              className="ri-refresh-line ri-xl"
                              style={{ color: "#3D78D7" }}
                            ></i>
                          ) : project.status === "On Hold" ? (
                            <i
                              className="ri-pause-large-line"
                              style={{ color: "#FFC107" }}
                            ></i>
                          ) : project.status === "Completed" ? (
                            <i
                              className="ri-check-double-line ri-xl"
                              style={{ color: "#5FC715" }}
                            ></i>
                          ) : (
                            "❔"
                          )}
                          {project.status}
                        </p>
                        <p className="priority">
                          Priority:
                          {project.priority === "High" ? (
                            <i
                              class="ri-circle-fill ri-xl"
                              style={{ color: "#E62E2D" }}
                            ></i>
                          ) : project.priority === "Medium" ? (
                            <i
                              class="ri-circle-fill ri-xl"
                              style={{ color: "#E86129" }}
                            ></i>
                          ) : project.priority === "Low" ? (
                            <i
                              class="ri-circle-fill ri-xl"
                              style={{ color: "#5FC715" }}
                            ></i>
                          ) : (
                            "❔"
                          )}
                          {project.priority}
                        </p>
                      </div>
                      <div className="progress-width">
                        <p>Progress</p>
                        <div className="progress-bar-container">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor:
                                project.progress <= 30
                                  ? "red"
                                  : project.progress <= 50
                                  ? "yellow"
                                  : "#56AED1",
                            }}
                          ></div>
                          <span className="progress-text">
                            {Math.round(project.progress)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>This employee isn’t assigned to any project.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default UpdateEmployee;
