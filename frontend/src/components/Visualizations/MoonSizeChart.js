// Credit: https://gitlab.com/dandom25/electrends/

import ScatterPlot from "./OurScatterPlot";
import React, { useEffect, useState } from "react";

function MoonSizeChart() {

    const [scatterData, setScatterData] = useState([]);

    useEffect(() => {
        var api_url = `https://api.homeplanet.me/api/all_moons?`;
        const getData = async () => {
          let response = await fetch (
            api_url,
            { mode: 'cors', }
          );
          let body = []
          body = await response.json()
          console.log("BODY")
          console.log(JSON.stringify(body))
        setScatterData(computeScatterData(body['bodies']));
        };
        getData();
      }, []);

    const computeScatterData = (moonData) => {
        const earth = [];
        const mars = [];
        const jupiter = [];
        const saturn = [];
        const uranus = [];
        const neptune = [];
        const pluto = [];
        
        moonData.forEach(moon => {
            // if (moon.grav !== 0 && moon.volValue && moon.volExponent !== 0 && moon.volExponent){
            //     console.log("Moon vol valid");
            //     console.log("Planet = " + moon.aroundPlanet);
            // } 
            if (moon.massValue !== 0 && moon.massValue && moon.massExponent !== 0 && moon.massExponent){
                console.log("Moon mass valid");
                console.log("Planet = " + moon.aroundPlanet);
            }
            if (moon.gravity !== 0 && moon.gravity 
                && moon.massValue !== 0 && moon.massValue && moon.massExponent !== 0 && moon.massExponent){
                // var volTotal = moon.volValue * (Math.pow(10, moon.volExponent));
                var massTotal = moon.massValue * (Math.pow(10, moon.massExponent));

                if (moon.aroundPlanet === "terre"){
                    earth.push({"y": moon.gravity, "x": massTotal});
                } else if (moon.aroundPlanet === "jupiter"){
                    jupiter.push({"y": moon.gravity, "x": massTotal});
                } else if (moon.aroundPlanet === "uranus"){
                    uranus.push({"y": moon.gravity, "x": massTotal});
                } else if (moon.aroundPlanet === "mars"){
                    mars.push({"y": moon.gravity, "x": massTotal});
                } else if (moon.aroundPlanet === "neptune") {
                    neptune.push({"y": moon.gravity, "x": massTotal});
                } else if (moon.aroundPlanet === "pluton") {
                    pluto.push({"y": moon.gravity, "x": massTotal});
                } else if (moon.aroundPlanet === "saturn"){
                    saturn.push({"y": moon.gravity, "x": massTotal});
                }
            }
            
        });
        earth.sort((a, b) => (a.x > b.x) ? 1 : -1);
        mars.sort((a, b) => (a.x > b.x) ? 1 : -1);
        jupiter.sort((a, b) => (a.x > b.x) ? 1 : -1);
        saturn.sort((a, b) => (a.x > b.x) ? 1 : -1);
        uranus.sort((a, b) => (a.x > b.x) ? 1 : -1);
        neptune.sort((a, b) => (a.x > b.x) ? 1 : -1);

        return [earth, mars, jupiter, saturn, uranus, neptune, pluto];
    }

    return(
        <div>
            <h5>Is there a correlation between a moon's gravity & volume and what planet it orbits?</h5>
            <ScatterPlot data={scatterData}/>
        </div>
    );

} export default MoonSizeChart;