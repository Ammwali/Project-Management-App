import { useState, useEffect } from "react";
import {
  fetchOneProjects,
  fetchUpdateProjects,
  fetchDeleteProjects,
} from "../fetching/FetchAllProjects";
import { message } from "antd";

export const useOneProject = (id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        setError(null);
        setLoading(true);
        const { data, response } = await fetchOneProjects(id);

        if (response.status === 200) {
          setProject(data);
        } else if (response.status === 400) {
          setError(data.message);
        } else {
          setError("Could not fetch Projects");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return { loading, error, project, setProject };
};

export const updateProject = async (id, updatedProject, setProject, setError) => {
  try {
    await fetchUpdateProjects(id, updatedProject);
    const { data, response } = await fetchOneProjects(id);
    if (response.status === 200) {
      setProject(data);
      message.success("Project updated successfully");
    } else if (response.status === 400) {
      setError(data.message);
    } else {
      setError("Could not update Project");
    }
  } catch (error) {
    setError(error.message || "An error occurred");
  }
};

export const deleteProject = async (id,navigate, setError) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if(!confirmDelete) return;

    try {
        await fetchDeleteProjects(id)
        message.success("Project Deleted")
        navigate('/projects')
    } catch (error) {
        setError(error.message)
    }
}
