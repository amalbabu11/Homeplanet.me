import { Container, Col, Row } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif"
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
import { CardActionArea, CardContent } from "@mui/material";

import Box from "@mui/material/Box"; 
import Card from "@mui/material/Card"

function ExplanationBox(props) {
    console.log("explanation = " + props.explanation)
    return (
        <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>
                    {/* <p>{"Hiiii test"}</p> */}
                    <p>{props.explanation}</p>
                </TableCell>
                </TableRow>
            </TableHead>
            </Table>
        </TableContainer>
    )
}

export default ExplanationBox;