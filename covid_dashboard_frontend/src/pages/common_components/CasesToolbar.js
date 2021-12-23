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
import {
  PAGE_TITLES,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TOOLBAR_OPTIONS_MARGIN_LEFT,
} from "../../constants";

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
              sx={{ ml: TOOLBAR_OPTIONS_MARGIN_LEFT }}
              style={
                window.location.pathname.split("/")[1] === "global-cases"
                  ? { color: PRIMARY_COLOR, textDecoration: "none" }
                  : { color: SECONDARY_COLOR, textDecoration: "none" }
              }
            >
              {PAGE_TITLES.globalCovidCases}
            </Typography>

            <Typography
              variant="body"
              noWrap
              component={Link}
              underline="none"
              to="/us-cases"
              sx={{ ml: TOOLBAR_OPTIONS_MARGIN_LEFT }}
              style={
                window.location.pathname.split("/")[1] === "us-cases"
                  ? { color: PRIMARY_COLOR, textDecoration: "none" }
                  : { color: SECONDARY_COLOR, textDecoration: "none" }
              }
            >
              {PAGE_TITLES.usCovidCases}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
    </Box>
  );
};
