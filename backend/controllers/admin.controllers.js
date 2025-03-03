const Admin = require("../models/admin-models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const registerAdmin = async (req, res) => {
  const { name, email, password, role, skills, salary, jobTitle, projects } = req.body;
  try {
    if (!name || !email || !password || !role || !skills || !salary || !jobTitle) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Employee already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      salary,
      jobTitle,
      projects
    });
    // const AccessToken = jwt.sign(
    //   {
    //     admin: {
    //       id: newAdmin._id,
    //       name: newAdmin.name,
    //       role: newAdmin.role,
    //     },
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    if (newAdmin) {
      res
        .status(200)
        .json({
          message: "Employee added successfully",
          user: { id: newAdmin._id, name: newAdmin.name, role: newAdmin.role, skills: newAdmin.skills, salary: newAdmin.salary, jobTitle: newAdmin.jobTitle, projects: newAdmin.projects },
        });
    } else {
      res.status(500).json({ message: "Failed to add Employee" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error registering Employee", error });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordvalid = await bcrypt.compare(password, admin.password);
    if (!isPasswordvalid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const AccessToken = jwt.sign(
      {
        admin: {
          id: admin._id,
          name: admin.name,
          role: admin.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({
        message: "login Successfull",
        AccessToken,
        user: { id: admin._id, name: admin.name, role: admin.role },
      });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

const getAllmployees = async (req, res) => {
  try {
    const employees = await Admin.find({ role: 'user' })
      .populate('projects', 'title description status priority progress');
    res.status(200).json({ message: "Employees fetched successfully", employees });
  } catch (error) {
    res.status(500).json({ message: "An error occurred fetching Employees, try again later" });
  }
};

const getOneEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Admin.findById(id)
      .populate('projects', 'title description status priority progress');
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee fetched successfully", employee });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred fetching Employee, try again later" });
  }
};

const getOneEmployeeByName = async (req, res) => {
  const name = req.params.name;
  try {
    const employee = await Admin.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
      .populate('projects', 'title description status priority progress');
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee fetched successfully", employee });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred fetching Employee, try again later" });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const employee = await Admin.findByIdAndUpdate(id, data, { new: true })
      .populate('projects', 'title description status priority progress');
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "An error occurred updating Employee, try again later" });
  }
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Admin.findByIdAndDelete(id);
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred deleting Employee, try again later" });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  getAllmployees,
  getOneEmployee,
  getOneEmployeeByName,
  updateEmployee,
  deleteEmployee
};

