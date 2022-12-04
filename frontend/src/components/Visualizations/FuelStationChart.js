// Credit: https://gitlab.com/dandom25/electrends/
import PieChart from "./ProviderPieChart";
import React, { useEffect, useState } from "react";

function FuelStationChart() {

    const [pieData, setPieData] = useState([]);

  useEffect(() => {
    var api_url = `https://api.findacarfor.me/fuel_stations?page=1&count=120`;
    const getData = async () => {
      let response = await fetch (
        api_url,
        { mode: 'cors', }
      );

      let body = []
      body = await response.json()

      console.log("results=" + JSON.stringify(body['results']))
      setPieData(computePieData(body['results']));
    };
    getData();
  }, []);

    const computePieData = (fuelStationData) => {
        var data = [{"name": "food", "value": 0},
                    {"name": "convenience_store", "value": 0},
                    {"name": "atm", "value": 0},
                    {"name": "restaurant", "value": 0},
                    {"name": "finance", "value": 0},];

        const cnts = [0, 0];

        fuelStationData.forEach(station => {
            console.log("station types = " + station.types);
            if(station.types.includes("food")){
                data[0].value++;
                ++cnts[0];
            } 
            if(station.types.includes("convenience_store")){
                data[1].value++;
                ++cnts[1];
            }
            if(station.types.includes("atm")){
                data[2].value++;
                ++cnts[2];
            }
            if(station.types.includes("restaurant")){
                data[3].value++;
                ++cnts[3];
            }
            if(station.types.includes("finance")){
                data[4].value++;
                ++cnts[4];
            }
        });
        console.log("fuelStationChart data = " + JSON.stringify(data))
        return data;
    }

    return(
        <div>
            <h4>Percent of Each Ammentity Out of All Gas Stations</h4>
            <PieChart data={pieData}/>
        </div>
    );



}

export default FuelStationChart;