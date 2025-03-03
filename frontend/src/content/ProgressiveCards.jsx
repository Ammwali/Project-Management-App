import React from "react";
import { Link } from "react-router-dom";

const ProgressiveCards = ({ Map, heading, bgColor }) => {
  return (
    <>
      <div className="all-projects-con">
        <div className="inprogress-cards-con">
          <div className="inprogress-head flex-row">
            <div className="bg-color" style={{ background: bgColor }}></div>
            <p className="inprogress-head-heading">{heading}</p>
            <p className="inprogress-head-length">{Map.length}</p>
          </div>

          <div className="progress-body">
            {Map.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-card-head flex-row">
                  <Link className="flex-row" to={`/projects/project/${project._id}`}>
                    <i className="ri-edit-line ri-lg"></i> 
                    <p>Edit Project</p>
                  </Link>
                </div>
                <div className="project-card-body">
                  <h4>{project.title}</h4>
                  <div className="employee-and-things flex-row">
                    <div className="project-employee flex-row">
                      <i className="ri-user-6-line"></i>
                      {project.assignedTo && project.assignedTo.length > 0 ? (
                        <p>
                        {project.assignedTo[0].name}
                        {project.assignedTo.length > 1 && " ..."}
                      </p>
                      ) : (
                        <p>No employee assigned</p>
                      )}
                    </div>
                    <p
                      className="project-prio"
                      style={{
                        background:
                          project.priority === "High"
                            ? "rgba(255, 104, 104, 0.207)"
                            : project.priority === "Low"
                            ? "rgba(172, 255, 47, 0.272)"
                            : "rgba(255, 166, 0, 0.248)",
                        color:
                          project.priority === "High"
                            ? "rgb(253, 120, 120)"
                            : project.priority === "Low"
                            ? "greenyellow"
                            : "orange",
                      }}
                    >
                      {project.priority}
                    </p>
                    <Link className="arrow" to={`/projects/project/${project._id}`}>
                      <i className="ri-arrow-right-long-line ri-lg"></i>
                    </Link>
                  </div>
                  <div className="progress-width-high flex-row">
                    <div className="progress-con-high">
                      <div
                        className="progress-bar-high"
                        style={{
                          width: `${project.progress ? project.progress : 0}%`,
                          backgroundColor:
                            project.progress <= 30
                              ? "#E05254"
                              : project.progress <= 50
                              ? "yellow"
                              : "#56AED1",
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
    </>
  );
};

export default ProgressiveCards;
