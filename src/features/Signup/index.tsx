import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Collapse,
  Container,
  CssBaseline,
  IconButton,
  Paper,
} from "@mui/material";
import { useStyles } from "./SignupStyles";
import { useNavigate } from "react-router-dom";
import Copyright from "../../app/components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../../redux/users/usersSlice";
import CloseIcon from "@mui/icons-material/Close";
import { z } from "zod";

// Define the validation schema
const signupSchema = z.object({
  firstname: z
    .string()
    .min(4, { message: "Firstname must be at least 4 characters long" }),
  lastname: z
    .string()
    .min(4, { message: "Lastname must be at least 4 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const signupErrorMsg = useSelector((state: any) => state.users.errors);
  const signupSuccessMsg = useSelector(
    (state: any) => state.users.signupSuccessMsg
  );
  const [signupSuccess, setSignupSuccess] = React.useState("");
  const [signupError, setSignupError] = React.useState("");
  const [erroropen, setErrorOpen] = React.useState(false);
  const [successopen, setSuccessOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (signupErrorMsg) {
      setSignupError(signupErrorMsg);
      setErrorOpen(true);
      dispatch(resetError());
    }
    if (signupSuccessMsg) {
      setSignupSuccess(signupSuccessMsg);
      setSuccessOpen(true);
      dispatch(resetError());
    }
  }, [signupSuccessMsg, signupErrorMsg]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Validate the form
      signupSchema.parse(form);
      dispatch(registerUser(form));
    } catch (err: any) {
      // Handle the validation errors
      setErrors(err.formErrors.fieldErrors);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box className={classes.bgLogin}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
        <CssBaseline />
        <Paper elevation={24} sx={{ borderRadius: 4, marginTop: 8 }}>
          <Collapse in={erroropen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setErrorOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ m: 3 }}
            >
              {signupError}
            </Alert>
          </Collapse>
          <Collapse in={successopen}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccessOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ m: 3 }}
            >
              {signupSuccess}
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
            <Typography component="h1" variant="h5">
              Sign Up
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
                id="firstname"
                label="Firstname"
                name="firstname"
                error={!!errors.firstname}
                helperText={errors?.firstname}
                value={form.firstname}
                onChange={handleChange}
                autoComplete="firstname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={!!errors.lastname}
                helperText={errors?.lastname}
                id="lastname"
                label="Lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                autoComplete="lastname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors?.email}
                id="email"
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                error={!!errors.password}
                helperText={errors?.password}
                value={form.password}
                onChange={handleChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
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
