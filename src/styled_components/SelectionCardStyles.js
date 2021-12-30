import { styled } from "@mui/system";
import { ListItem, FormControl } from "@mui/material";

import { DROPDOWN_MIN_WIDTH, LIST_ITEM_MARGIN } from "../constants";

export const StyledFormControl = styled(FormControl)`
  min-width: ${DROPDOWN_MIN_WIDTH};
`;

export const StyledListItem = styled(ListItem)`
  margin: ${LIST_ITEM_MARGIN};
`;
