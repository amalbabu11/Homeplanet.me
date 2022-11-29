// Credit: https://gitlab.com/dandom25/electrends/
import React from "react";
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { Col, Row } from 'reactstrap';

function OurScatterChart(props) {

    console.log("scatterdata", props?.data);

    
    return(
        <Row className="justify-content-center">
        <ScatterChart width={730} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="District Population" domain={['dataMin - 10000', 'dataMax + 10000']} label={{ value: 'District Population', position: 'insideBottomRight', offset: -10 }} />
            <YAxis dataKey="y" name="Turnout" unit={"%"} label={{ value: 'Turnout', angle: -90, position: 'insideLeft' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Democrat" data={props.data[0]} fill="#0015bc" />
            <Scatter name="Republican" data={props.data[1]} fill="#e9141d" />
            <Scatter name="Libertarian" data={props.data[2]} fill="#fed105" />
            <Scatter name="Other" data={props.data[3]} fill="#00ff00" />
        </ScatterChart></Row>
    );

}

export default OurScatterChart;