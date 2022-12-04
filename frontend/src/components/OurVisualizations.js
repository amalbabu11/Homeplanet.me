import { React } from "react";
import { Container } from "react-bootstrap";
// import CompanyEmissionsChart from "./Visualizations/CompanyEmissionsChart";
// import FacilityEmissionsChart from "./Visualizations/FacilityEmissionsChart";
import PlanetTemperatureChart from "./Visualizations/PlanetTemperatureChart";
import MoonSizeChart from "./Visualizations/MoonSizeChart";
import StarTypeChart from "./Visualizations/StarTypeChart";
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

      <Stack>
        <h3 className="wrapperTitle">Moon Sizes</h3>
        <MoonSizeChart />
      </Stack>

      <Stack>
        <h3 className="wrapperTitle">Star Types</h3>
        <StarTypeChart />
      </Stack>

    </Container>
  );

}
export default Visualizations;
