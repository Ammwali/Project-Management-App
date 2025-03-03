import React, { useEffect, useState, useRef } from "react";
import SideBar from "../../pages/SideBar";
import Navbar from "../../pages/navbar";
import { useOneProject, updateProject, deleteProject } from "../../hooks/useProjectsUpdates";
import { useParams, useNavigate } from "react-router-dom";
import { useAllEmployees } from "../../hooks/useAllEmployees";
import { Spin, message } from "antd";

// Draggable progress bar component
const DraggableProgressBar = ({ progress, onProgressChange }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateProgress = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.min(100, Math.max(0, (offsetX / rect.width) * 100));
    onProgressChange(newProgress);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateProgress(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateProgress(e);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="draggable-progress-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{
        position: "relative",
        width: "100%",
        height: "5px",
        background: "#e0e0e0",
        borderRadius: "10px",
        cursor: "pointer",
        margin: "10px 0",
      }}
    >
      <div
        className="draggable-progress-bar"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor:
            progress <= 30 ? "#E05254" : progress <= 50 ? "yellow" : "#56AED1",
          borderRadius: "10px",
          transition: isDragging ? "none" : "width 0.3s ease",
        }}
      ></div>
      <span
        className="draggable-progress-handle"
        style={{
          position: "absolute",
          left: `${progress}%`,
          transform: "translateX(-50%)",
          top: "-4px",
          width: "13px",
          height: "13px",
          background: "#fff",
          border: "2px solid #312549",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 1,
        }}
      ></span>
    </div>
  );
};

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, project, setProject } = useOneProject(id);
  const { employees } = useAllEmployees();
  
  const [updatedProject, setUpdatedProject] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    progress: 0,
    assignedTo: [],
  });
  
  const [statusError, setStatusError] = useState("");
  const [showEmployees, setShowEmployees] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (project) {
      setUpdatedProject({
        title: project.title || "",
        description: project.description || "",
        status: project.status || "",
        priority: project.priority || "",
        progress: project.progress || 0,
        assignedTo: project.assignedTo || [],
      });
      setSelectedEmployees(project.assignedTo || []);
    }
  }, [project]);

  const handleChange = (e) => {
    if (e.target.name === "status") {
      setStatusError("");
    }
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allowedStatuses = ["In Progress", "On Hold", "Completed"];
    if (!allowedStatuses.includes(updatedProject.status)) {
      setStatusError("Status must be 'In Progress', 'On Hold', or 'Completed'.");
      return; 
    }

    updateProject(id, updatedProject, setProject, (msg) => message.error(msg));
  };

  const handleDelete = () => {
    deleteProject(id, navigate, (msg) => message.error(msg));
  };

  const handleEmployeeSelect = (employee) => {
    const alreadySelected = selectedEmployees.some(emp => emp._id === employee._id);
    let updatedSelection;
    if (alreadySelected) {
      updatedSelection = selectedEmployees.filter(emp => emp._id !== employee._id);
    } else {
      updatedSelection = [...selectedEmployees, employee];
    }
    setSelectedEmployees(updatedSelection);
    setUpdatedProject({ ...updatedProject, assignedTo: updatedSelection.map(emp => emp._id) });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowEmployees(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (statusError) {
      message.error(statusError);
    }
  }, [statusError]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  if (loading) {
    return (
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
    );
  }
  
  return (
    <>
      <div className="admin-dashboard flex-row">
        <div className="side-bar-con">
          <SideBar />
        </div>
        <div className="navbar-and-admin-panel">
          <Navbar />
          <div className="admin-panel">
            <div className="project-and-update-form">
              {/* Displaying project details */}
              <div className="inprogress-cards-con">
                <div className="inprogress-head flex-row">
                  <div
                    className="bg-color"
                    style={{
                      background:
                        project.status === "In Progress"
                          ? "#9919F7"
                          : project.status === "Completed"
                          ? "#E09396"
                          : "orange",
                    }}
                  ></div>
                  <p className="inprogress-head-heading">{project.status}</p>
                </div>
                <div className="project-card">
                  <div className="project-card-body">
                    <div className="head-and-prio flex-row">
                      <h4>{project.title}</h4>
                      <p
                        className="project-prio prio"
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
                    </div>
                    <div className="employee-and-things flex-row">
                      <div className="project-employee flex-row">
                        <i className="ri-user-6-line"></i>
                        {project.assignedTo && project.assignedTo.length > 0 ? (
                          <div>
                            <p>{project.assignedTo.map(emp => emp.name).join(", ")}</p>
                          </div>
                        ) : (
                          <p>Not Assigned</p>
                        )}
                      </div>
                    </div>
                    <div className="project-card-description">
                      <p>{project.description}</p>
                    </div>
                    <div className="draggable-progress-bar-con flex-row">
                    <DraggableProgressBar
                      progress={Number(updatedProject.progress)}
                      onProgressChange={(newProgress) =>
                        setUpdatedProject((prev) => ({ ...prev, progress: newProgress }))
                      }
                    />
                    <span className="progress-text-high">
                      {Math.round(updatedProject.progress)}%
                    </span>
                    </div>
                  </div>
                </div>
                <button onClick={handleDelete} disabled={loading} className="delete-btn">
                  {loading ? "Deleting..." : "Delete Project"}
                </button>
              </div>

              <div className="update-project-form add-employee-con">
                <h4>Edit Project</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="title"
                      className="add-form-i"
                      placeholder="Title"
                      value={updatedProject.title || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="description"
                      className="add-form-i update-text-area"
                      placeholder="Description"
                      cols={10}
                      value={updatedProject.description || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="update-form-grid">
                    <div className="form-group">
                      <input
                        type="text"
                        name="status"
                        className="add-form-i"
                        placeholder="Status"
                        value={updatedProject.status || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="priority"
                        className="add-form-i"
                        placeholder="Priority"
                        value={updatedProject.priority || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
              
                  <div className="form-group assign-employee">
                    <button
                      type="button"
                      className="assign-button add-form-i"
                      onClick={() => setShowEmployees(!showEmployees)}
                    >
                      {selectedEmployees.length > 0 
                        ? selectedEmployees.map(emp => emp.name).join(", ") 
                        : "Assign To?"}
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
                            {selectedEmployees.some(emp => emp._id === employee._id) && (
                              <span className="tick-mark">✔</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="submit-button add-btn">
                    {loading ? "Updating...." : "Update Project"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
