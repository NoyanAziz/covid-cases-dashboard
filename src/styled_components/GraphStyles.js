import { styled } from "@mui/system";
import { Card } from "@mui/material";

import { GRAPH_CARD_HORIZONTAL_PADDING } from "../constants";

export const StyledGraphCard = styled(Card)`
  padding-left: ${GRAPH_CARD_HORIZONTAL_PADDING};
  padding-right: ${GRAPH_CARD_HORIZONTAL_PADDING};
`;
