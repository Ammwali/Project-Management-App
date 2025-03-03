import React from "react";
import "./App.css";
import "./UserPanel.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/userDashboard";
import { useAuth } from "./contexts/AuthContext";
import AddEmployees from "./content/inner-content/AddEmployees";
import ViewEmployees from "./content/inner-content/ViewEmployees";
import UpdateEmployee from "./content/inner-content/UpdateEmployee";
import ViewProjects from "./content/inner-content/ViewProjects";
import AddProjects from "./content/inner-content/AddProjects";
import UpdateProject from "./content/inner-content/UpdateProject";
import UserProfile from "./content/inner-content/UserProfile";
import UpdateUserProject from "./content/inner-content/UpdateUserProject";
import ViewUserAllProjects from "./content/inner-content/ViewUserAllProjects";
const App = () => {
  const { isAuthenticated, userData } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              userData.role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/user-dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user-dashboard"
          element={
            isAuthenticated && userData.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employees/add-employees"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <AddEmployees />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employees"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <ViewEmployees />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/employees/update-employee/:id"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <UpdateEmployee />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/projects"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <ViewProjects />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/projects/add-projects"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <AddProjects />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/projects/project/:id"
          element={
            isAuthenticated && userData.role === "admin" ? (
              <UpdateProject />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* User routes */}

        <Route
          path="/user/profile"
          element={
            isAuthenticated && userData.role === "user" ? (
              <UserProfile />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/user-dashboard/user/project/:id"
          element={
            isAuthenticated && userData.role === "user" ? (
              <UpdateUserProject />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/user/projects"
          element={
            isAuthenticated && userData.role === "user" ? (
              <ViewUserAllProjects />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
