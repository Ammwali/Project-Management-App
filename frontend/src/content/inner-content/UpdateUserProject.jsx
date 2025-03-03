import React, { useState, useEffect, useRef } from "react";
import { useOneProject, updateProject } from "../../hooks/useProjectsUpdates";
import { useParams } from "react-router-dom";
import UserSideBar from "../../pages/UserSideBar";
import { Spin, message } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import useFetchEmployee from "../../hooks/useFetchEmployee";

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
            progress <= 30 ? "#EA6D91" : progress <= 50 ? "#E48522" : "#312549",
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

const UpdateUserProject = () => {
  const { id } = useParams();
  const { loading, error, project, setProject } = useOneProject(id);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { userData } = useAuth();
  const { employee } = useFetchEmployee(userData.id);

  const [updatedProject, setUpdatedProject] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    progress: 0,
    assignedTo: [],
  });

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
    }
  }, [project]);

  const [statusError, setStatusError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "status") {
      setStatusError("");
    }
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const allowedStatuses = ["In Progress", "On Hold", "Completed"];
    if (!allowedStatuses.includes(updatedProject.status)) {
      setStatusError("Status must be 'In Progress', 'On Hold', or 'Completed'.");
      setUpdateLoading(false);
      return;
    }

    const payload = { ...updatedProject, progress: Number(updatedProject.progress) };

    try {
      await updateProject(id, payload, setProject, (msg) =>
        message.error(msg)
      );
    } catch (err) {
      message.error("Failed to update project");
    } finally {
      setUpdateLoading(false);
    }
  };

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

  const teamMembers =
    project.assignedTo && employee
      ? project.assignedTo.filter((emp) => emp._id !== employee._id)
      : [];

  return (
    <div className="user-dashboard flex-row">
      <div className="user-side-bar-con">
        <UserSideBar />
      </div>
      <div className="navbar-and-user-panel">
        <div className="user-panel">
          <div className="user-project-detail-card-and-form flex-row">
            <div className="user-project-detail-card-with-team-members">
              <div className="user-project-detail-card">
                <div className="user-project-detail-priority-and-title flex-row">
                  <h4>{project.title}</h4>
                  <p>{project.priority}</p>
                </div>
                <div className="user-project-detail-body">
                  <p>{project.description}</p>
                  <span className="-status">{project.status}</span>
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

              <div className="team-display-card">
                {teamMembers.length > 0 ? (
                  <>
                    <h4>Team Members</h4>
                    {teamMembers.map((emp, index) => (
                      <div key={index} className="team-card">
                        <h5>{emp.name}</h5>
                        <p>{emp.email}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h5>No Other Employees Assigned</h5>
                  </>
                )}
              </div>
            </div>
            <div className="user-profile-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <input
                    type="text"
                    name="status"
                    className="profile-i"
                    placeholder="Status"
                    value={updatedProject.status || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="profile-update-btn"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProject;
