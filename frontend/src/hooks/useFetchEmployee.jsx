import { useState, useEffect } from "react";
import { fetchOneEmployees } from "../fetching/FetchAllEnployees";

const useFetchEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        setError(null);
        setLoading(true);
        const { data, response } = await fetchOneEmployees(id);

        if (response.status === 200) {
          setEmployee(data.employee);
        } else if (response.status === 400) {
          setError(data.message);
        } else {
          setError("Could not fetch Employee");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getEmployee();
  }, [id]);

  return { employee, loading, error, setEmployee, setError };
};

export default useFetchEmployee;
