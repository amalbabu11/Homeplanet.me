// // Credit: https://gitlab.com/dandom25/electrends/

// import ScatterPlot from "./ScatterPlot";
// import React, { useEffect, useState } from "react";

// function CarSafetyChart() {
//     const [scatterData, setScatterData] = useState([]);
//     var api_url = `https://api.homeplanet.me/api/all_planets?`;
//     // if (sort_val !== "" && sort_val !== null){
//     //   api_url += `&` + sort_val + `=true`;
//     // }
//     // if (search_val !== "" && search_val !== null){
//     //   api_url += `&search=` + search_val;
//     // }
//     const getData = async () => {
//       let response = await fetch (
//         api_url,
//         { mode: 'cors', }
//       );
//       console.log("RESPONSE")
//       console.log(response)
//       console.log(response.text)
//       console.log(response.status)
//       console.log(JSON.stringify(response))
//       let body = []
//       body = await response.json()
//       console.log("BODY")
//       console.log(JSON.stringify(body))
//     //   setPlanets(body['bodies'])
//       setBarData(computeBarData(body['bodies']));
//     //   setInstances(body['total_size'])
//     };
//     getData();
//   }, []);

//   const computeScatterData = (planetData) => {
//     const dems = [];
//     const repubs = [];
//     const liberts = [];
//     const other = [];
    
//     electionData.forEach(election => {
//         if(election.num_votes > 1 && election.num_votes < 1000000) {
//             if(election.winning_party === "Democratic") {
//                 dems.push({ "x": election.district.population,/*Date.parse(election.general_date),*/
//                             "y": ((election.num_votes / election.district.population) * 100).toFixed(2)})
//             } else if(election.winning_party === "Republican") {
//                 repubs.push({ "x": election.district.population,/*Date.parse(election.general_date),*/
//                             "y": ((election.num_votes / election.district.population) * 100).toFixed(2)})
//             } else if(election.winning_party === "Libertarian") {
//                 liberts.push({ "x": election.district.population,/*Date.parse(election.general_date),*/
//                             "y": ((election.num_votes / election.district.population) * 100).toFixed(2)})
//             } else if(election.winning_party !== "TBD"){
//                 other.push({ "x": election.district.population,/*Date.parse(election.general_date),*/
//                             "y": ((election.num_votes / election.district.population) * 100).toFixed(2)})
//             }
//         }
//     });
//     dems.sort((a, b) => (a.x > b.x) ? 1 : -1);
//     repubs.sort((a, b) => (a.x > b.x) ? 1 : -1);
//     liberts.sort((a, b) => (a.x > b.x) ? 1 : -1);
//     other.sort((a, b) => (a.x > b.x) ? 1 : -1);
//     return [dems, repubs, liberts, other];


//   return (



//   )

// } export default CarSafetyChart;

// Credit: https://gitlab.com/dandom25/electrends/

import ScatterPlot from "./ScatterPlot";
import React, { useEffect, useState } from "react";

function CarSafetyChart() {

    const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    // credit to AnimalWatch.me
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