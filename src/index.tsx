import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux";
// import Layout from "./app/component/Layout";
import { BrowserRouter } from "react-router-dom";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { blue, purple, red } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#635bff",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
