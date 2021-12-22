import React, { useState } from "react";
import { connect } from "react-redux";

import { Box, Typography, Grid, Divider } from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { USSelectionBar } from "./nested_components/us_covid_cases/USSelectionBar";
import { DataGraph } from "./common_components/DataGraph";
import { useQuery } from "../utils";

export const UnconnectedUSCovidCases = ({ usCovidCases }) => {
  const query = useQuery();
  const [selectedGraphValue, setSelectedGraphValue] = useState("confirmed");

  return (
    <Box className="div">
      <CasesToolbar sx={{ minHeight: "10vh" }} />

      <Box
        justifyItems={"flex-start"}
        sx={{ width: "100%", maxWidth: 500, p: 2 }}
      >
        <Typography
          component="div"
          variant="h3"
          color="#1DA1FF"
          style={{ fontFamily: "sans-serif" }}
        >
          US Covid Cases
        </Typography>
      </Box>

      <Grid
        container
        justifyContent={"space-between"}
        sx={{ minHeight: "60vh" }}
      >
        <Grid item xs={2} sx={{ py: 10 }}>
          <USSelectionBar
            selectedGraphValue={selectedGraphValue}
            setSelectedGraphValue={setSelectedGraphValue}
          />
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid item xs={9} sx={{ p: 10 }}>
          <DataGraph
            covidCases={usCovidCases}
            selectedGraphValue={selectedGraphValue}
            selectedArea={query.get("state") ? query.get("state") : ""}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  usCovidCases: state.covid_cases_data.usCovidCases,
});

export const USCovidCases = connect(mapStateToProps)(UnconnectedUSCovidCases);
