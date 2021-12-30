import React from "react";

import { Box, AppBar, Container, Divider, Toolbar } from "@mui/material";

import Logo from "../../Logo";
import { PAGE_TITLES, PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants";
import {
  StyledAppBarTitle,
  StyledLink,
} from "../../styled_components/AppBarStyles";

export const CasesToolbar = () => {
  return (
    <Box>
      <AppBar elevation={0} color="inherit" position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Logo />
            <StyledAppBarTitle
              id="global-cases-title"
              variant="body"
              noWrap
              component={StyledLink}
              underline="none"
              to="/global-cases"
              style={
                window.location.pathname.split("/")[1] === "global-cases"
                  ? { color: PRIMARY_COLOR }
                  : { color: SECONDARY_COLOR }
              }
            >
              {PAGE_TITLES.globalCovidCases}
            </StyledAppBarTitle>

            <StyledAppBarTitle
              id="us-cases-title"
              variant="body"
              noWrap
              component={StyledLink}
              underline="none"
              to="/us-cases"
              style={
                window.location.pathname.split("/")[1] === "us-cases"
                  ? { color: PRIMARY_COLOR }
                  : { color: SECONDARY_COLOR }
              }
            >
              {PAGE_TITLES.usCovidCases}
            </StyledAppBarTitle>
          </Toolbar>
        </Container>
      </AppBar>
      <Divider />
    </Box>
  );
};
