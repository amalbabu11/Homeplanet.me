// Credit: https://gitlab.com/dandom25/electrends/

import BarChart from "./ProviderBarChart";
import React, { useEffect, useState } from "react";

function ListingPriceChart() {

    const [barData, setBarData] = useState([]);

  useEffect(() => {
    var api_url = `https://api.findacarfor.me/listings?page=1&count=2695`;
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
      console.log("BODY[results]")
      console.log((body['results']))
      setBarData(computeBarData(body['results']));
    };
    getData();
  }, []);

    const computeBarData = (listingData) => {
        var data = [{"make": "BMW", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Chevy", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Cadillac", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Ford", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Hyundai", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Honda", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Jeep", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Nissan", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Ram", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"},
                    {"make": "Toyota", "avgPrice": 0, "count": 0, "total_price": 0, "fill":"#5a6270"}];
        
        const cnts = [0, 0, 0, 0, 0];

        listingData.forEach(listing => {
            if(listing.brand_name === "BMW"){
                data[0].count++;
                data[0].total_price += listing.ask_price;
                ++cnts[0];
            } else if(listing.brand_name === "CHEVROLET"){
                data[1].count++;
                data[1].total_price += listing.ask_price;
                ++cnts[1];
            } else if(listing.brand_name === "CADILLAC"){
                data[2].count++;
                data[2].total_price += listing.ask_price;
                ++cnts[2];
            } else if(listing.brand_name === "FORD"){
                data[3].count++;
                data[3].total_price += listing.ask_price;
                ++cnts[3];
            } else if(listing.brand_name === "HYUNDAI"){
                data[4].count++;
                data[4].total_price += listing.ask_price;
                ++cnts[4];
            } else if(listing.brand_name === "HONDA"){
                data[5].count++;
                data[5].total_price += listing.ask_price;
                ++cnts[5];
            } else if(listing.brand_name === "JEEP"){
                data[6].count++;
                data[6].total_price += listing.ask_price;
                ++cnts[6];
            } else if(listing.brand_name === "NISSAN"){
                data[7].count++;
                data[7].total_price += listing.ask_price;
                ++cnts[7];
            } else if(listing.brand_name === "RAM"){
                data[8].count++;
                data[8].total_price += listing.ask_price;
                ++cnts[8];
            } else if(listing.brand_name === "TOYOTA"){
                data[9].count++;
                data[9].total_price += listing.ask_price;
                ++cnts[9];
            }
        });

        data.forEach(entry => {
            entry.avgPrice = entry.total_price/entry.count;

        })

        console.log("Car listing data array");
        console.log(data);
        return data;
    }

    return(
        <div>
            <h4>Average Listing Price for the Top 10 Car Brands</h4>
            <BarChart data={barData}/>
           
        </div>
    );

}

export default ListingPriceChart;