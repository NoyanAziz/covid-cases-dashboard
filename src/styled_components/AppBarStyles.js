import { Link } from "react-router-dom";

import { styled } from "@mui/system";
import { Typography } from "@mui/material";

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TOOLBAR_OPTIONS_MARGIN_LEFT,
} from "../constants";

export const StyledAppBarTitle = styled(Typography)`
  margin-left: ${TOOLBAR_OPTIONS_MARGIN_LEFT};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) =>
    props.selected === true ? PRIMARY_COLOR : SECONDARY_COLOR};
`;
