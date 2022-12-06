// Credit: https://gitlab.com/dandom25/electrends/

import ScatterPlot from "./ProviderScatterPlot";
import React, { useEffect, useState } from "react";

function CarSafetyChart() {

    const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    var api_url = `https://api.findacarfor.me/specs?page=1&count=877`;
    const getData = async () => {
      let response = await fetch (
        api_url,
        { mode: 'cors', }
      );
      let body = []
      body = await response.json()
      console.log("BODY[results]")
      console.log((body['results']))
      setScatterData(computeScatterData(body['results']));
    };
    getData();
  }, []);

    const computeScatterData = (carData) => {
        const recalled = [];
        const not_recalled = [];
        
        carData.forEach(car => {
            if (car.OverallRating !== "Not Rated"){
                if (car.RecallsCount > 0){
                    recalled.push({"x": parseInt(car.OverallRating), "y": car.ComplaintsCount});
                } else {
                    not_recalled.push({"x": parseInt(car.OverallRating), "y": car.ComplaintsCount});
                }
            }
            
        });
        recalled.sort((a, b) => (a.x > b.x) ? 1 : -1);
        not_recalled.sort((a, b) => (a.x > b.x) ? 1 : -1);

        console.log("recalled" + recalled)
        console.log("not recalled" + not_recalled)
        return [recalled, not_recalled];
    }

    return(
        <div>
            <h5>Does a car's safety rating and number of complaints affect if it gets recalled?</h5>
            <ScatterPlot data={scatterData}/>
        </div>
    );

}

export default CarSafetyChart;