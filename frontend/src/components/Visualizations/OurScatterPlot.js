// Credit: https://gitlab.com/dandom25/electrends/
import React from "react";
import { CartesianGrid, Legend, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { Col, Row } from 'reactstrap';

function OurScatterChart(props) {

    console.log("scatterdata", props?.data);
    
    return(
        <Row className="justify-content-center">
        <ScatterChart width={730} height={450}
            margin={{ top: 20, right: 20, bottom: 20, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="Volume" label={{ value: 'Volume (kg)', offset: -10,position: 'insideBottomRight'}} />
            <YAxis dataKey="y" type="number" name="Gravity" label={{ value: 'Gravity (m/s²)', offset: -30, angle: -90, position: 'insideLeft' }}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Earth" data={props.data[0]} fill= "#00C25E"/>
            <Scatter name="Mars" data={props.data[1]} fill= "#FB4F28"/>
            <Scatter name="Jupiter" data={props.data[2]} fill= "#5E4400"/>
            <Scatter name="Saturn" data={props.data[3]} fill= "#FAC100"/>
            <Scatter name="Uranus" data={props.data[4]} fill= "#01FCFF"/>
            <Scatter name="Neptune" data={props.data[5]} fill="#244FE3"/>
            <Scatter name="Pluto" data={props.data[6]} fill="#ec42f5"/>
        </ScatterChart></Row>
    );

}

export default OurScatterChart;