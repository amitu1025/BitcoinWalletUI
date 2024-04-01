import { Box, Typography } from "@mui/material";
import Copyright from "../Copyright";

const Footer = () => {
  return (
    <Box
      height="50px"
      position="fixed"
      bottom={0}
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
