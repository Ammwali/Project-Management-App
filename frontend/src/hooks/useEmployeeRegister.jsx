import { message } from "antd";
import { useState } from "react";

const useEmployeeReg = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerEmployee = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);
      } else if (res.status === 400 || res.status === 401) {
        setError(data.message);
      } else {
        message.error("Could not Register Employee");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerEmployee };
};

export default useEmployeeReg;
