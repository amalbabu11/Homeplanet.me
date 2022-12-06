// Credit: https://gitlab.com/dandom25/electrends/
import PieChart from "./OurPieChart";
import React, { useEffect, useState } from "react";

function StarTypeChart() {

    const [pieData, setPieData] = useState([]);

  useEffect(() => {
    var api_url = `https://api.homeplanet.me/api/all_stars?`;
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
      setPieData(computePieData(body['bodies']));
    };
    getData();
  }, []);

    const computePieData = (starData) => {
        var data = [{"name": "MAINSEQ", "value": 0},
                    {"name": "GIANT", "value": 0}];

        const cnts = [0, 0];

        starData.forEach(star => {
            if(star.st_lumclass === "MAINSEQ"){
                data[0].value++;
                ++cnts[0];
            } else if(star.st_lumclass === "GIANT"){
                data[1].value++;
                ++cnts[1];
            } else {
                console.log("OTHER LUMCLASS : " + star.st_lumclass);
            }
        });
        console.log("startypechart date = " + JSON.stringify(data))
        return data;
    }

    return(
        <div>
            <h4>How many stars are Main Sequence stars vs Giant stars?</h4>
            <PieChart data={pieData}/>
        </div>
    );



}

export default StarTypeChart;