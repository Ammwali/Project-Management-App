import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";


const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(false);

      const res = await fetch("https://promange-app.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 400) {
        setError(data.message);
      } else if (res.status === 401) {
        setError(data.message);
      } else {
        message.error("Login Failed");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  
 

  return { loading, error, loginUser, responseData };
};

export default useLogin;
