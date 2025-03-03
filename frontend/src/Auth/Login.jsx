import React from "react";
import { Form, Input, Button, Alert, Spin } from "antd";
import useLogin from "../hooks/useLogin";
// import loginImage from "../assets/images/Pink and Black Modern Initials Logo Design.PNG"

const Login = () => {
  const { loading, error, loginUser } = useLogin();

  const handleLogin = async (values) => {
    await loginUser(values);
  };
  return (
    <>
     <div className="login-page-container">
     <div className="login-con">
        <h1>Welcome Back</h1>
        <p>
        <span>ProManage</span> makes project management easier,<br /> improving teamwork and efficiency</p>

        <Form onFinish={handleLogin} autoComplete="off" className="login-form">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input placeholder="Please enter your email" className="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password placeholder="Enter your password" className="password" />
          </Form.Item>
          {error && (
            <Alert
              description={error}
              type="error"
              showIcon
              closable
              className="alert"
            />
          )}
          <Form.Item>
            <Button
              type={loading ? undefined : "primary"} 
              htmlType="submit"
              className="login-btn"
            >
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>

       <h2 className="logo-color">ProManage</h2>

      </div>
       
       <div className="img-con"> 
        <img src="/images/login-img.png" alt="" />
        <p>It boosts productivity by simplifying project management  <br /> and enhancing collaboration</p>
       </div>
     </div>
    </>
  );
};

export default Login;
