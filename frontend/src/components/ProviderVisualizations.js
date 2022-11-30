import { React } from "react";
import { Container } from "react-bootstrap";
// import CompanyEmissionsChart from "./Visualizations/CompanyEmissionsChart";
// import FacilityEmissionsChart from "./Visualizations/FacilityEmissionsChart";
import CarSafetyChart from "./Visualizations/CarSafetyChart";
import { Stack } from "@mui/material"
// import "../styles/Visualizations.css"

function ProviderVisualizations() {

  return (
    <Container>
      <h1 className="wrapper">Provider Visualizations</h1>

      <Stack>
      <h3 className="wrapperTitle">Car Safety</h3>
      <CarSafetyChart />
      </Stack>

    </Container>
  );

}
export default ProviderVisualizations;
