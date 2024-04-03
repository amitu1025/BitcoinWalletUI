import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  Paper,
} from "@mui/material";
import { useStyles } from "./LoginStyles";
import { useNavigate } from "react-router-dom";
import Copyright from "../../app/components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthentication,
  resetError,
} from "../../redux/users/usersSlice";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" }),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const loginErrorMsg = useSelector((state: any) => state.users.errors);
  const loginSuccess = useSelector((state: any) => state.users.loginSuccess);
  const [loginError, setLoginError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const token = sessionStorage.getItem("token");

  const [form, setForm] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    if (loginErrorMsg) {
      setLoginError(loginErrorMsg);
      setOpen(true);
      dispatch(resetError());
    }
  }, [loginErrorMsg]);

  React.useEffect(() => {
    if (loginSuccess && token) {
      navigate("/home");
    }
  }, [loginSuccess, token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // try {
    //   const formData = new FormData(event.currentTarget);
    //   setErrors({ email: "", password: "" });
    //   const userData = {
    //     username: formData.get("email"),
    //     password: formData.get("password"),
    //   };
    //   dispatch(getUserAuthentication(userData));
    // }
    try {
      // Validate the form
      loginSchema.parse(form);
      const formData = new FormData(event.currentTarget);
      const userData = {
        username: formData.get("email"),
        password: formData.get("password"),
      };
      dispatch(getUserAuthentication(userData));
    } catch (err: any) {
      // Handle the validation errors
      setErrors(err.formErrors.fieldErrors);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e?.target?.value });
  };

  return (
    <Box className={classes.bgLogin}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
        <CssBaseline />
        <Paper elevation={24} sx={{ borderRadius: 4, marginTop: 8 }}>
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ m: 3 }}
            >
              {loginError}
            </Alert>
          </Collapse>
          <Box
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon style={{ fill: "#ad66ff" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors?.email}
                id="email"
                label="Email Address"
                name="email"
                value={form?.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={!!errors.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={errors.password}
                value={form?.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
