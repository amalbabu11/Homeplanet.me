// Credit: https://gitlab.com/dandom25/electrends/
import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

import { Row } from 'reactstrap';

function OurBarChart(props) {

    console.log("bardata", props?.data);
    
    return(
        <Row className="justify-content-center">
        <BarChart width={750} height={250} data={props?.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="make"/>
            <YAxis dataKey="avgPrice"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="avgPrice" />
        </BarChart></Row>
    );

}

export default OurBarChart;
