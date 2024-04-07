import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import KeyIcon from "@mui/icons-material/Key";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

const StackInfo = ({ info, copyToClipboard }: any) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      <Item
        sx={{
          my: 1,
          mx: "auto",
          p: 1,
        }}
      >
        <Stack spacing={1} direction="row" alignItems="center">
          <Avatar>
            <KeyIcon color="primary" />
          </Avatar>
          <Typography color="primary" fontWeight={"bold"}>
            {info}
          </Typography>
          <IconButton
            onClick={() => copyToClipboard(info)}
            color="primary"
            aria-label="Copy content"
          >
            <ContentCopyIcon />
          </IconButton>
        </Stack>
      </Item>
    </Box>
  );
};

export default StackInfo;
