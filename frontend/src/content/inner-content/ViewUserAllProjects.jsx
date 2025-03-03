import React from "react";
import UserSideBar from "../../pages/UserSideBar";
import { Spin } from "antd";
import { useAllProjects } from "../../hooks/useAllProjects";
import { useAuth } from "../../contexts/AuthContext";
import useFetchEmployee from "../../hooks/useFetchEmployee";
import { Link } from "react-router-dom";

const ViewUserAllProjects = () => {
  const { userData } = useAuth();
  const { projects, loading, error, setProjects } = useAllProjects();
  const { employee } = useFetchEmployee(userData.id);

  if (loading) {
    return (
      <div className="user-dashboard flex-row">
        <div className="user-side-bar-con">
          <UserSideBar />
        </div>
        <div className="navbar-and-user-panel">
          <div className="user-panel">
            <Spin className="loader" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="user-dashboard flex-row">
        <div className="user-side-bar-con">
          <UserSideBar />
        </div>
        <div className="navbar-and-user-panel">
          <div className="user-panel -panel">
            <div className="user-projects-and-all-projects">
              <div className="user-projects -container">
                <div className="head-and-length flex-row">
                  <h4>My Projects</h4>
                  <p>{employee?.projects.length}</p>
                </div>
                {employee?.projects.map((project, index) => (
                  <div
                    className="user-project-card user-project-display-card -card"
                    key={index}
                  >
                    <div className="project-user-card-head flex-row">
                      <div className="project-user-card-icon">
                        <i className="ri-mac-line ri-xl"></i>
                      </div>
                      <div className="project-user-card-and-detail">
                        {project.assignedTo && project.assignedTo.length > 0 ? (
                          <>
                            <h5>
                              {project.assignedTo.map((emp) => emp.name).join(", ")}
                            </h5>
                            <p>
                              {project.assignedTo.map((emp) => emp.email).join(", ")}
                            </p>
                          </>
                        ) : (
                          <>
                            <h5>{employee.name}</h5>
                            <p>{employee.email}</p>
                          </>
                        )}
                      </div>
                      <div className="project-user-card-priority">
                        <p>{project.priority}</p>
                      </div>
                    </div>
                    <div className="project-user-card-body">
                      <h4>{project.title}</h4>
                      <p>
                        {project
                          ? project.description.substring(
                              0,
                              Math.floor(project.description.length / 3)
                            ) + "..."
                          : ""}
                        <Link to={`/user-dashboard/user/project/${project?._id}`}>
                          See More
                        </Link>
                      </p>
                      <span className="project-user-status">{project.status}</span>
                      <div className="progress-width-high flex-row progress-user-project">
                        <div className="progress-con-high">
                          <div
                            className="progress-bar-high"
                            style={{
                              width: `${project.progress ? project.progress : 0}%`,
                              backgroundColor:
                                project.progress <= 30
                                  ? "#EA6D91"
                                  : project.progress <= 50
                                  ? "#E48522"
                                  : "#312549",
                            }}
                          ></div>
                        </div>
                        <span className="progress-text-high">
                          {Math.round(project.progress ? project.progress : 0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="user-projects">
                <div className="head-and-length flex-row">
                  <h4>All Projects</h4>
                  <p>{projects.length}</p>
                </div>
                <div className="all-user-projects">
                  {projects.map((project, index) => (
                    <div
                      className="user-project-card user-project-display-card -project-card"
                      key={index}
                    >
                      <div className="project-user-card-head flex-row">
                        <div className="project-user-card-icon">
                          <i className="ri-mac-line ri-xl"></i>
                        </div>
                        <div className="project-user-card-and-detail">
                          {project.assignedTo && project.assignedTo.length > 0 ? (
                            <>
                              <h5>
                                {project.assignedTo
                                  .map((emp) => emp.name)
                                  .join(", ")}
                              </h5>
                              {/* <p>
                                {project.assignedTo
                                  .map((emp) => emp.email)
                                  .join(", ")}
                              </p> */}
                            </>
                          ) : (
                            <>
                              <h5>No Employee Assigned</h5>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="project-user-card-body user-all-projects-head">
                        <h4>{project.title}</h4>
                        <span className="project-user-status">{project.status}</span>
                        <div className="progress-width-high flex-row progress-user-project">
                          <div className="progress-con-high">
                            <div
                              className="progress-bar-high"
                              style={{
                                width: `${project.progress ? project.progress : 0}%`,
                                backgroundColor:
                                  project.progress <= 30
                                    ? "#EA6D91"
                                    : project.progress <= 50
                                    ? "#E48522"
                                    : "#312549",
                              }}
                            ></div>
                          </div>
                          <span className="progress-text-high">
                            {Math.round(project.progress ? project.progress : 0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUserAllProjects;
