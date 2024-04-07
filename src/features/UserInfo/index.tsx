import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import WalletIcon from "../../assets/images/crypto-wallet.png";
import { getAllUsers } from "../../redux/users/usersSlice";
import StackInfo from "./StackInfo";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UserInfo = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [userInfo, setUserinfo] = React.useState<any>(null);
  const [openSnackbar, setSnackbarOpen] = React.useState(false);
  const [isMultipleWallet, setIsMultipleWallet] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const allUsers: any = useSelector((state: any) => state?.users?.allusers);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  React.useEffect(() => {
    if (allUsers) {
      if (allUsers[0]?.wallet.constructor.name === "Array") {
        setIsMultipleWallet(true);
      }
      setUserinfo(allUsers[0]);
    }
  }, [allUsers]);

  const copyToClipboard = (data: any) => {
    navigator.clipboard.writeText(data).then(() => {
      setSnackbarOpen(true);
    });
  };

  const action = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={handleClose}>
        COPIED
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const multipleWallet =
    isMultipleWallet &&
    userInfo?.wallet?.map((wal: any) => {
      return (
        <>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar sx={{ bgcolor: blue[500] }}>
                <VpnKeyIcon />
              </Avatar>
            </Box>
            <StackInfo
              copyToClipboard={copyToClipboard}
              info={`Address: ${wal?.address ?? ""}`}
            />
            <StackInfo
              copyToClipboard={copyToClipboard}
              info={`Public Key: ${wal?.publicKey ?? ""}`}
            />
            <StackInfo
              copyToClipboard={copyToClipboard}
              info={`Private Key: ${wal?.privateKey ?? ""}`}
            />
          </CardContent>
        </>
      );
    });

  return (
    <>
      <Card sx={{ maxWidth: "70%", fontWeight: "bold" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userInfo?.firstname?.slice(0, 1)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          sx={{ fontSize: 3, fontWeight: "bold" }}
          title={`${userInfo?.firstname} ${userInfo?.lastname}`}
          subheader={"Wallet"}
        />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width="100%"
        >
          <CardMedia
            sx={{ width: "30%" }}
            component="img"
            image={WalletIcon}
            alt="Wallet"
          />
        </Box>
        <CardContent>
          {!isMultipleWallet && (
            <StackInfo
              copyToClipboard={copyToClipboard}
              info={`Address: ${userInfo?.address ?? ""}`}
            />
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Private keys">
            <LockIcon color="primary" />
          </IconButton>
          <Typography component="h1" color="primary" variant="h5">
            Master Keys
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {isMultipleWallet ? (
            multipleWallet
          ) : (
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar sx={{ bgcolor: blue[500] }}>
                  <VpnKeyIcon />
                </Avatar>
              </Box>
              <StackInfo
                copyToClipboard={copyToClipboard}
                info={`Public Key: ${userInfo?.wallet?.publicKey ?? ""}`}
              />
              <StackInfo
                copyToClipboard={copyToClipboard}
                info={`Private Key: ${userInfo?.wallet?.privateKey ?? ""}`}
              />
            </CardContent>
          )}
        </Collapse>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Content copied to clipboard!"
        action={action}
      />
    </>
  );
};

export default UserInfo;
