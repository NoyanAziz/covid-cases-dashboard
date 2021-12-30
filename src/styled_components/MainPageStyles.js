import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

import {
  HEADING_FONT,
  HEADING_MARGIN_LEFT,
  HEADING_PADDING,
} from "../constants";

export const HeadingBox = styled(Box)`
  text-align: left;
  margin-left: ${HEADING_MARGIN_LEFT};
  padding: ${HEADING_PADDING};
`;

export const HeadingTypography = styled(Typography)`
  font-family: ${HEADING_FONT};
`;
