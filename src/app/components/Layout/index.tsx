import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import Header from "../Header";
// import Footer from "../Footer";
import { styled } from "@mui/material/styles";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  marginTop: theme.spacing(12),
  color: theme.palette.text.secondary,
}));

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = sessionStorage.getItem("token");
  const user = useSelector((state: any) => state.users.data);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [location.pathname, navigate, token]);

  return (
    <Box position="relative" overflow="auto" style={{ minHeight: "100vh" }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Item>
            <Header />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
