import { message } from "antd";
import { useState, useEffect } from "react";
import { fetchAllProjects } from "../fetching/FetchAllProjects";


export const useAllProjects = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setError(null);
        setLoading(true);
        const { data, response } = await fetchAllProjects();

        if (response.status === 200) {
          setProjects(data);
        //   console.log(projects)
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
    getProjects();
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return { loading, error, projects, setProjects };
};