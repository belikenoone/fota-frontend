import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          IoT Device Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Device Management
        </Button>
        <Button color="inherit" component={Link} to="/upload-device">
          Add Devices
        </Button>
        <Button color="inherit" component={Link} to="/upload-firmware">
          Upload Firmware
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
