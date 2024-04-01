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
import { useStyles } from "./SignupStyles";
import { useNavigate } from "react-router-dom";
import Copyright from "../../app/components/Copyright";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../../redux/users/usersSlice";
import CloseIcon from "@mui/icons-material/Close";

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
    const formData = new FormData(event.currentTarget);
    const userData = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      username: formData.get("email"),
      password: formData.get("password"),
    };
    dispatch(registerUser(userData));
    // navigate("/login");
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
                autoComplete="firstname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Lastname"
                name="lastname"
                autoComplete="lastname"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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
