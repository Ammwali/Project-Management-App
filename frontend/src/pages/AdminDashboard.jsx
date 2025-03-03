import React from "react";
import Card from "../content/Card";
import { useAllEmployees } from "../hooks/useAllEmployees";
import { Spin } from "antd";
import { useAllProjects } from "../hooks/useAllProjects";
import HighCard from "../content/HighCard";

const AdminDashboard = () => {
  const { loading, error, employees } = useAllEmployees();
  const { projects } = useAllProjects();
  const icon = <i className="ri-group-3-line ri-lgh3"></i>;
  const title = "Employees";
  const length = employees.length;
  const description = `All active and inactive employees`;
  const currentDate = new Date();

  const iconProject = <i className="fa-solid fa-laptop fa-lg"></i>;
  const titleProject = "Projects";
  const lengthProject = projects.length;
  const descriptionProject = `All active and inactive projects`;

  const inProgressProjects = projects.filter(
    (project) => project.status === "In Progress"
  );
  const iconInProgress = <i className="fa-solid fa-spinner fa-lg"></i>;
  const titleInProgress = "In Progress Projects";
  const lengthInProgress = inProgressProjects.length;
  const descriptionInProgress = `Projects currently in progress`;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );
  const iconCompleted = <i className="ri-check-double-line ri-lg"></i>;
  const titleCompleted = "Completed Projects";
  const lengthCompleted = completedProjects.length;
  const descriptionCompleted = `Projects that are Completed`;

  const highPriorityProjects = projects.filter(
    (project) => project.priority === "High"
  );

  if (loading) {
    return (
      <div className="admin-panel">
        <h2 className="dash-heading">Dashboard</h2>
        <p className="date">{currentDate.toDateString()}</p>
        <Spin className="loader" />
      </div>
    );
  }

  return (
    <>
      <div className="admin-panel">
        <h2 className="dash-heading">Dashboard</h2>
        <p className="date">{currentDate.toDateString()}</p>

        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="total-card-con">
          <Card
            title={title}
            length={length}
            description={description}
            icon={icon}
          />
          <Card
            title={titleProject}
            length={lengthProject}
            description={descriptionProject}
            icon={iconProject}
          />
          <Card
            title={titleInProgress}
            length={lengthInProgress}
            description={descriptionInProgress}
            icon={iconInProgress}
          />
          <Card
            title={titleCompleted}
            length={lengthCompleted}
            description={descriptionCompleted}
            icon={iconCompleted}
          />
        </div>

        <div className="high-project-con">
          <h3 className="high-project-title">High Priority Projects</h3>
          <div className="high-project-grid">
            {highPriorityProjects.map((project, index) => (
              <HighCard key={index} index={index} progress={project.progress} date={project.createdAt} projectTitle={project.title} titleIcon={"fa-regular fa-face-smile fa-xl"} icon={"fa-regular fa-clock fa-lg"}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
