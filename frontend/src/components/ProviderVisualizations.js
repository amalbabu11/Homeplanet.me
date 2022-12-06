import { React } from "react";
import { Container } from "react-bootstrap";
import CarSafetyChart from "./Visualizations/CarSafetyChart";
import FuelStationChart from "./Visualizations/FuelStationChart";
import ListingPriceChart from "./Visualizations/ListingPriceChart";
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

      <Stack>
        <h3 className="wrapperTitle">Listing Prices</h3>
        <ListingPriceChart />
      </Stack>

      <Stack>
        <h3 className="wrapperTitle">Gas Station Ammentity Spread</h3>
        <FuelStationChart />
      </Stack>

    </Container>
  );

}
export default ProviderVisualizations;
