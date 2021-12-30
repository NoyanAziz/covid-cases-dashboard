import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { CONTAINER_GRID_MIN_HEIGHT } from "../constants";

export const StyledContainerGrid = styled(Grid)`
  min-height: ${CONTAINER_GRID_MIN_HEIGHT};
`;
