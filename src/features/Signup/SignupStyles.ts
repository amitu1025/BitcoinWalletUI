import { makeStyles } from "@mui/styles";
import bgLogin from "../../assets/images/bg-login.jpeg";

const useStyles = makeStyles({
  bgLogin: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bgLogin})`,
    backgroundColor: "#000",
    backgroundSize: "cover",
    height: "100vh",
    // backgroundImage: `url(${"static/src/assets/images/bg-login.jpeg"})`,
  },
});

export { useStyles };
