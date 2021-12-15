import React from "react";

import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";

import Logo from "../../Logo";

export const CasesToolbar = () => {
  return (
    <Box>
      <AppBar elevation={0} color="inherit" position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Logo />
            <Typography
              variant="body"
              noWrap
              component={Link}
              underline="none"
              to="/global-cases"
              sx={{ ml: 5 }}
              style={
                window.location.pathname.split("/")[1] === "global-cases"
                  ? { color: "#1DA1F2", textDecoration: "none" }
                  : { color: "gray", textDecoration: "none" }
              }
            >
              Covid Cases
            </Typography>

            <Typography
              variant="body"
              noWrap
              component={Link}
              underline="none"
              to="/us-cases"
              sx={{ ml: 5 }}
              style={
                window.location.pathname.split("/")[1] === "us-cases"
                  ? { color: "#1DA1F2", textDecoration: "none" }
                  : { color: "gray", textDecoration: "none" }
              }
            >
              US Cases
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
    </Box>
  );
};
