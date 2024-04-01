import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";

const AuthLayout = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      debugger;
      navigate("/home");
    }
  }, [navigate, token]);

  return (
    <Box
      position="relative"
      overflow="auto"
      style={{ minHeight: "100vh", background: "#EEF4F9" }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
