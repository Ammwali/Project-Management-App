const Project = require("../models/project-models");
const Admin = require("../models/admin-models");

const addProject = async (req, res) => {
  const { title, description, status, assignedTo, priority, progress } = req.body;

  try {
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: "Project already exists" });
    }

    const newProject = await Project.create({
      title,
      description,
      status,
      assignedTo, 
      priority,
      progress
    });

    await Admin.updateMany(
      { _id: { $in: assignedTo } },
      { $push: { projects: newProject._id } }
    );

    res.status(200).json({ message: "Project Created", newProject });
  } catch (error) {
    res.status(400).json({ error: "ERROR. Try again.", error });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.find().populate("assignedTo", "name email");
    if (!projects) {
      return res.status(400).json({ error: "No projects found." });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects", error });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate("assignedTo", "name email");
    if (!project) {
      return res.status(400).json({ error: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error });
  }
};

const updateProject = async (req, res) => {
  try {
    const currentProject = await Project.findById(req.params.id);
    if (!currentProject) {
      return res.status(400).json({ error: "Project not found." });
    }

    const oldAssignedTo = currentProject.assignedTo.map((id) => id.toString());
    const newAssignedTo = req.body.assignedTo ? req.body.assignedTo : oldAssignedTo;

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const toRemove = oldAssignedTo.filter((id) => !newAssignedTo.includes(id));
    const toAdd = newAssignedTo.filter((id) => !oldAssignedTo.includes(id));

    if (toRemove.length) {
      await Admin.updateMany(
        { _id: { $in: toRemove } },
        { $pull: { projects: updatedProject._id } }
      );
    }
    if (toAdd.length) {
      await Admin.updateMany(
        { _id: { $in: toAdd } },
        { $push: { projects: updatedProject._id } }
      );
    }

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(400).json({ error: "Project not found." });
    }

    await Admin.updateMany(
      { _id: { $in: project.assignedTo } },
      { $pull: { projects: project._id } }
    );

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Process failed. Try again.", err });
  }
};

module.exports = {
  getProject,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
};
