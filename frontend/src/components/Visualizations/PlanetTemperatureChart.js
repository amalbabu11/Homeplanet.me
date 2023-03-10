// Credit: https://gitlab.com/dandom25/electrends/

import BarChart from "./OurBarChart";
import React, { useEffect, useState } from "react";

function PlanetTemperatureChart() {

    const [barData, setBarData] = useState([]);

  useEffect(() => {
    var api_url = `https://api.homeplanet.me/api/all_planets?`;
    const getData = async () => {
      let response = await fetch (
        api_url,
        { mode: 'cors', }
      );
      console.log("RESPONSE")
      console.log(response)
      console.log(response.text)
      console.log(response.status)
      console.log(JSON.stringify(response))
      let body = []
      body = await response.json()
      console.log("BODY")
      console.log(JSON.stringify(body))
      setBarData(computeBarData(body['bodies']));
    };
    getData();
  }, []);

    const computeBarData = (planetData) => {
        // <100, 100-200, 200-300, 300-400, 400-500, 500-600, >600
        var data = [{"range": "<100", "NumPlanets": 0, "fill": '#00FAF8'},
                    {"range": "100", "NumPlanets": 0, "fill": '#00FAF8'},
                    {"range": "200", "NumPlanets": 0, "fill": '#00FAF8'},
                    {"range": "277-312", "NumPlanets": 0, "fill": '#00E631'},
                    {"range": "300", "NumPlanets": 0, "fill": '#FF2000'},
                    {"range": "400", "NumPlanets": 0, "fill": '#FF2000'},
                    {"range": "500", "NumPlanets": 0, "fill": '#FF2000'},
                    {"range": "600+", "NumPlanets": 0, "fill": '#FF2000'}];

        const cnts = [0, 0, 0, 0, 0];

        planetData.forEach(planet => {
            if(planet.pl_eqt < 100 && planet.pl_eqt !==  0){
                data[0].NumPlanets++;
                ++cnts[0];
            } else if(planet.pl_eqt < 200){
                data[1].NumPlanets++;
                ++cnts[1];
            } else if(planet.pl_eqt < 277){
                data[2].NumPlanets++;
                ++cnts[2];
            }
            else if(planet.pl_eqt < 312){
                data[3].NumPlanets++;
                ++cnts[3];
            } else if(planet.pl_eqt < 400){
                data[4].NumPlanets++;
                ++cnts[4];
            } else if(planet.pl_eqt < 500){
                data[5].NumPlanets++;
                ++cnts[5];
            } else if (planet.pl_eqt < 600){
                data[6].NumPlanets++;
                ++cnts[6];
            } else if (planet.pl_eqt !== null && planet.pl_eqt !== 0){
                data[7].NumPlanets++;
                ++cnts[7];
            }
        });

        console.log("Planet temp data array");
        console.log(data);
        return data;
    }

    return(
        <div>
            <h4>How many planets have an average temperature that is suitable for humans?</h4>
            <BarChart data={barData}/>
            <p>Each planet's equilibrium temperature is rounded to the nearest hundred Kelvin and 
                placed in a bucket. 
            </p>
            <p>The blue bars show the planets that would be too cold for humans,
                the green is the number of planets within the habitable range, and the red is too hot.</p>
            
        </div>
    );



}

export default PlanetTemperatureChart;