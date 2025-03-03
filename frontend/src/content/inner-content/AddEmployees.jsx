import React, { useState, useEffect, useRef } from "react";
import useEmployeeReg from "../../hooks/useEmployeeRegister";
import SideBar from "../../pages/SideBar";
import Navbar from "../../pages/navbar";
import { message } from "antd";

const AddEmployees = () => {
  const { loading, error, registerEmployee } = useEmployeeReg();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    salary: "",
    skills: [],
    jobTitle: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSkillChange = (skill) => {
    const skills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];

    setFormData({ ...formData, skills });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSalaryChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setFormData({ ...formData, salary: formattedValue });
  };

  const handleAdding = async (e) => {
    e.preventDefault();

    let finalSkills = [...formData.skills];
    const manualSkill = inputValue.trim();

    if (manualSkill && !finalSkills.includes(manualSkill)) {
      finalSkills = [...finalSkills, manualSkill];
    }

    const transformedData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      salary: Number(formData.salary.replace(/,/g, "")),
      skills: finalSkills, 
      jobTitle: formData.jobTitle,
    };

    
    setFormData((prev) => ({
      ...prev,
      skills: finalSkills,
    }));
    setInputValue("");

    console.log("Submitting:", transformedData);
    await registerEmployee(transformedData);
  };

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
              <h1>Add Employees</h1>

              <form onSubmit={handleAdding} className="add-form">
                <div className="form-grid-con">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="add-form-i"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="add-form-i"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="form-group toggle-form-grp">
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="add-form-i"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Set password"
                        required
                      />
                      <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i class="fa-regular fa-eye"></i>
                        ) : (
                          <i class="fa-regular fa-eye-slash"></i>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="jobTitle"
                      className="add-form-i"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="Enter job title"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="salary"
                    className="add-form-i salary-add"
                    value={formData.salary}
                    onChange={handleSalaryChange}
                    placeholder="Enter salary"
                  />
                </div>

                <div className="form-group" ref={dropdownRef}>
                  <div className="custom-dropdown">
                    <input
                      type="text"
                      placeholder="Add skills or select"
                      className="skills-add add-form-i"
                      value={inputValue}
                      onClick={() => setIsOpen(true)}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    {isOpen && (
                      <div className="dropdown-list">
                        {["JavaScript", "React", "Node.js", "MongoDB"].map(
                          (skill) => (
                            <div
                              key={skill}
                              className={`dropdown-item ${
                                formData.skills.includes(skill)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => handleSkillChange(skill)}
                            >
                              {skill}
                              {formData.skills.includes(skill) && (
                                <span className="checkmark">✓</span>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group radio-form-group">
                  <label className="label-name">Select Role</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === "user"}
                        onChange={handleInputChange}
                        required
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      <span className="radio-label">Employee</span>
                    </label>

                    <label className="radio-item">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === "admin"}
                        onChange={handleInputChange}
                        required
                        className="radio-input"
                      />
                      <span className="custom-radio"></span>
                      <span className="radio-label">Project Manager</span>
                    </label>
                  </div>
                </div>

                {error && (
                  message.error(error)
                )}

                <div className="form-group">
                  <button type="submit" className="add-btn" disabled={loading}>
                    {loading ? "Adding...." : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployees;
