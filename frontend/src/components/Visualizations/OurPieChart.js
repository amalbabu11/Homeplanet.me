// Credit: https://gitlab.com/dandom25/electrends
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Col, Row } from 'reactstrap';

function OurPieChart(props) {

    console.log("piedata", props?.data);

    const pie_colors = ["#84BCDA", "#4C6085"];

    let renderLabel = function(entry) {
        return entry.name;
    }
    
    return(
        <Row>
            <Col>
            <Row className="justify-content-center">
                <PieChart width={500} height={400}>
                    {/* <Pie data={props?.data} dataKey="numStars" nameKey="luminosityClass" cx="50%" cy="50%" outerRadius={150} label={renderLabel}> */}
                    <Pie data={props?.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label={renderLabel}>
                    {props?.data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pie_colors[index]}/>
                    ))}</Pie>
                </PieChart>
                </Row>
            </Col>
        </Row>
    );

}

export default OurPieChart;
