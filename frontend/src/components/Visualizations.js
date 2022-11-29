import { React } from "react";
import { Container } from "react-bootstrap";
// import CompanyEmissionsChart from "./Visualizations/CompanyEmissionsChart";
// import FacilityEmissionsChart from "./Visualizations/FacilityEmissionsChart";
import PlanetTemperatureChart from "./Visualizations/PlanetTemperatureChart";
import { Stack } from "@mui/material"
// import "../styles/Visualizations.css"

function Visualizations() {

  return (
    <Container>
      <h1 className="wrapper">Our Visualizations</h1>

      <Stack>
      <h3 className="wrapperTitle">Planet Temperatures</h3>
      <PlanetTemperatureChart />
      </Stack>

    </Container>
  );

}
export default Visualizations;
