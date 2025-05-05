import React from "react"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../contexts/AuthContext";


const unAuthenticadedRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
]);

const authenticadedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

const Router: React.FC = () => {
  const {user} = useAuth();

  return (
    <RouterProvider router={user ? authenticadedRoutes : unAuthenticadedRoutes} />
  )
}

export default Router;