import { Close } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import Register from "../../features/Auth/components/Register";
import Login from "../../features/Auth/components/Login";

const useStyles = makeStyles({
  closeButton: {
    position: "absolute!important",
    top: "8px",
    right: "8px",
    color: "#c1c1c1",
    zIndex: "1",
  },
});
export default function Header() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </CodeIcon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopping
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Register{" "}
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            return false
          }
        }}
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {/* <Register closeDialog={handleClose} /> */}
          <Login closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
