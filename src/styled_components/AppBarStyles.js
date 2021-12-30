import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { SECONDARY_COLOR, TOOLBAR_OPTIONS_MARGIN_LEFT } from "../constants";
import { Link } from "react-router-dom";

export const StyledAppBarTitle = styled(Typography)`
  margin-left: ${TOOLBAR_OPTIONS_MARGIN_LEFT};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${SECONDARY_COLOR};
`;
