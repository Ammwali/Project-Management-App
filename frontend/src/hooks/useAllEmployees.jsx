import { message } from "antd";
import { useState, useEffect } from "react";
import { fetchAllEnployees } from "../fetching/FetchAllEnployees";


export const useAllEmployees = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        setError(null);
        setLoading(true);
        const { data, response } = await fetchAllEnployees();

        if (response.status === 200) {

          setEmployees(data.employees);
        } else if (response.status === 400) {
          setError(data.message);
        } else {
          setError("Could not fetch Employees");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return { loading, error, employees };
};