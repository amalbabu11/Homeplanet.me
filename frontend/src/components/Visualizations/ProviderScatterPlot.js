// Credit: https://gitlab.com/dandom25/electrends/
import React from "react";
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { Col, Row } from 'reactstrap';

function OurScatterChart(props) {

    console.log("scatterdata", props?.data);
    
    return(
        <Row className="justify-content-center">
        <ScatterChart width={730} height={450}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="Overall Safety Rating" domain={[0, 5]} label={{ value: 'Safety Rating', position: 'insideBottomRight', offset: -10 }} />
            <YAxis dataKey="y" type="number" name="Number of Complaints" domain={[0, 100]} label={{ value: 'Complaints', angle: -90, position: 'insideLeft' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Recalled" data={props.data[0]} fill= "#e9141d"/>
            <Scatter name="Not Recalled" data={props.data[1]} fill="#0015bc" />
        </ScatterChart></Row>
    );

}

export default OurScatterChart;