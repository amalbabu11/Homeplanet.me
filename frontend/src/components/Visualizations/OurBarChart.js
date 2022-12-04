// Credit: https://gitlab.com/dandom25/electrends/
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { Col, Row } from 'reactstrap';
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"]

function OurBarChart(props) {

    console.log("bardata", props?.data);
    
    return(
        <Row className="justify-content-center">
        <BarChart width={730} height={250} data={props?.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" unit={" K"}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="NumPlanets" />
        </BarChart></Row>
    );

}

export default OurBarChart;
