import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import useFetchEmployee from "../../hooks/useFetchEmployee";
import UserNavbar from "../../pages/UserNavbar";
import UserSideBar from "../../pages/UserSideBar";
import { useState, useEffect } from "react";
import { Spin, message } from "antd";
import {
  fetchOneEmployees,
  fetchUpdateEmployees,
} from "../../fetching/FetchAllEnployees";

const UserProfile = () => {
  const { userData } = useAuth();
  const { employee, loading, error, setEmployee, setError } = useFetchEmployee(
    userData.id
  );
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
  const [updateLoading, setUpdateLoading] = useState(false)

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
    setUpdateLoading(true)
    try {
      await fetchUpdateEmployees(userData.id, updatedData);
      const { data, response } = await fetchOneEmployees(userData.id);
      if (response.status === 200) {
        setEmployee(data.employee);
        message.success("Profile Updated");
      } else if (response.status === 400) {
        setError(data.message);
      } else {
        setError("Could not Update Profile");
      }
    } catch (error) {
      setError(error.message);
    }finally{
        setUpdateLoading(false)
    }
  };

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
        <div className="navbar-and-user-panel user-profile-navbar-and-user-panel">
            
          <div className="user-panel user-profile-panel">
          <div className="manage-profile">
                <h4>Manage your profile</h4>
            </div>
              <div className="user-detail-card-and-profile-form flex-row">
                <div className="user-detail-card">
                  <div className="user-name-and-profession">
                    <h4>{employee.name}</h4>
                    <p>{employee.jobTitle}</p>
                  </div>
                  
                  <div className="user-email">
                    <div className="user-inner flex-row"><div className="user-profile-icon-bg">
                    <div className="user-profile-icon"><i className="fa-regular fa-envelope fa-xl"></i></div>
                    </div>{employee.email}</div>
                  </div>
                  <div className="user-skills">
                    <div className="user-inner flex-row">
                    <div className="user-profile-icon-bg">
                    <div className="user-profile-icon"><i class="ri-code-s-slash-fill ri-xl"></i></div>
                    </div>
                      {Array.isArray(employee.skills) &&
                      employee.skills.length > 0
                        ? employee.skills.join(", ")
                        : "No skills available"}
                    </div>
                  </div>

                  
                </div>


                 <div className="user-profile-form">
                    <form onSubmit={handleSubmit}>



                    <div className="form-group">
                        <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="profile-i"
                        placeholder="Name"
                        value={updatedData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="profile-i"
                        placeholder="Email"
                        value={updatedData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Skills</label>
                      <input
                        type="text"
                        name="skills"
                        className="profile-i"
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
                        <label className="form-label">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        className="profile-i"
                        placeholder="Job Title"
                        value={updatedData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                      
                      <button className="profile-update-btn">{updateLoading? "Updating.." : "Update"}</button>
                    
                    </form>
                 </div>
              </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
