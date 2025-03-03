import React from "react";
import { Spin } from "antd";
import { useAuth } from "../contexts/AuthContext";
import useFetchEmployee from "../hooks/useFetchEmployee";
import UserSideBar from "./UserSideBar";
import UserNavbar from "./UserNavbar";
import CardU from "../content/CardU";
import { useAllEmployees } from "../hooks/useAllEmployees";
import { useAllProjects } from "../hooks/useAllProjects";
import Calendar from "../content/Calender";
import { Link } from "react-router-dom";
import { useOneProject } from "../hooks/useProjectsUpdates";
const UserDashboard = () => {
  const { userData } = useAuth();
  const { employee, loading, error } = useFetchEmployee(userData.id);
  

  const { employees } = useAllEmployees();
  const { projects } = useAllProjects();


  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );
  const inprogressProjects = projects.filter(
    (project) => project.status === "In Progress"
  );
  const onHoldProjects = projects.filter(
    (project) => project.status === "On Hold"
  );

 
  let selectedProject = null;
  if (employee && employee.projects && employee.projects.length > 0) {
    selectedProject =
      employee.projects.find((proj) => proj.priority === "High") ||
      employee.projects.find((proj) => proj.priority === "Medium") ||
      employee.projects.find((proj) => proj.priority === "Low");
  }


  if (loading) {
    return (
      <div className="user-dashboard flex-row">
        <div className="user-side-bar-con">
          <UserSideBar />
        </div>
        <div className="navbar-and-user-panel">
          <div className="user-navbar-con">
            <UserNavbar />
          </div>
          <div className="user-panel">
            <Spin className="loader" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard flex-row">
      <div className="user-side-bar-con">
        <UserSideBar />
      </div>
      <div className="navbar-and-user-panel">
        <div className="user-navbar-con">
          <UserNavbar />
        </div>

        <div className="user-panel">
          <div className="cards-and-calender">
            <div className="user-card-con-grid">
              <CardU
                icon={<i className="ri-group-line ri-lg"></i>}
                title={"Employees"}
                length={employees.length}
                description={"All active and inactive employees"}
              />
              <CardU
                icon={<i className="ri-macbook-line ri-lg"></i>}
                title={"Projects"}
                length={projects.length}
                description={"In Progress and completed projects"}
              />
            </div>
            <Calendar />
          </div>

          <div className="salary-cards-status-cards-project-card flex-row">

            <div className="user-project-card">
              <div className="project-user-card-head flex-row">
                <div className="project-user-card-icon">
                  <i className="ri-mac-line ri-xl"></i>
                </div>
                <div className="project-user-card-and-detail">
                  <h5>{employee.name}</h5>
                  <p>{employee.email}</p>
                </div>
                <div className="project-user-card-priority" style={{ display: !selectedProject? "none" : "block",}}>
                  <p>{selectedProject ? selectedProject.priority : ""}</p>
                </div>
              </div>
              <div className="project-user-card-body">
                <h4>
                  {" "}
                  {selectedProject
                    ? selectedProject.title
                    : "No Project Assigned"}
                </h4>
                <p>
                  {selectedProject
                    ? selectedProject.description.substring(
                        0,
                        Math.floor(selectedProject.description.length / 3)
                      ) + "..."
                    : ""} <Link to={`/user-dashboard/user/project/${selectedProject?._id}`}>See More</Link>
                </p>
                <span className="project-user-status" style={{ display: !selectedProject? "none" : "inline",}}>{selectedProject ? selectedProject.status : ""}</span>
            
                <div className="progress-width-high flex-row progress-user-project" style={{ display: !selectedProject? "none" : "flex",}}>
                  <div className="progress-con-high">
                    <div
                      className="progress-bar-high"
                      style={{
                       
                        
                        width: `${
                          selectedProject.progress? selectedProject.progress : 0
                        }%`,
                        backgroundColor:
                          selectedProject?.progress <= 30
                          ? "#EA6D91"
                          : selectedProject?.progress <= 50
                          ? "#E48522"
                          : "#312549",
                      }}
                    ></div>
                  </div>
                  <span className="progress-text-high">
                    {Math.round(selectedProject.progress? selectedProject.progress : 0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Salary and Status Cards */}
            <div className="salaryCard-and-statusCards flex-row">
              <div className="salaryCard flex-row">
                <div className="salaryCard-details">
                  <div className="salary-head-and-details flex-row">
                    <h4>Salary</h4>
                    <div>Paid on 1st Feb</div>
                  </div>
                  <div className="more-details flex-row">
                    <div className="tax">
                      <p>Tax,</p>
                      <div>-5000PKR</div>
                    </div>
                  </div>
                  <span>{`PKR ${Number(
                    employee.salary
                  ).toLocaleString()}`}</span>
                  <p>+ 50,000PKR Performance Bonus</p>
                </div>
                <div className="salary-icon-and-last-month">
                  <div className="salaryCard-icon-bg">
                    <div className="salaryCard-icon">
                      <i className="ri-line-chart-line ri-xl"></i>
                    </div>
                  </div>
                  <div className="last-month">
                    <p>Previous</p>
                    <div>200,000PKR</div>
                  </div>
                </div>
              </div>

              <div className="status-cards">
                <div className="status-card flex-row">
                  <div className="status-card-icon">
                    <i className="ri-refresh-line ri-lg"></i>
                  </div>
                  <div className="status-card-details">
                    <h5>In Progress</h5>
                    <span>{inprogressProjects.length}</span>
                  </div>
                </div>

                <div className="status-card flex-row">
                  <div className="status-card-icon">
                    <i className="ri-pause-large-line ri-lg"></i>
                  </div>
                  <div className="status-card-details">
                    <h5>On Hold</h5>
                    <span>{onHoldProjects.length}</span>
                  </div>
                </div>

                <div className="status-card flex-row">
                  <div className="status-card-icon">
                    <i className="ri-check-double-line ri-lg"></i>
                  </div>
                  <div className="status-card-details">
                    <h5>Completed</h5>
                    <span>{completedProjects.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
