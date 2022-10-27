import { Container, Col, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function MoonInstance(props) {
  let [searchParams] = useSearchParams();
  
  // let page = parseInt(searchParams.get("page") ?? "1")
  // let per_page = parseInt(searchParams.get("per_page") ?? "15")
  let moon_name = (searchParams.get("moon") ?? "Calypso")
  let [planet, setPlanet] = useState([])
  let [star, setStar] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://api.homeplanet.me/api/recommand/moon?moon=${moon_name}`,
        { mode: 'cors', }
      );
      let body = []
      body = await response.json()
      setStar(body['star'])
      setPlanet(body['planet'])  
    };
    getData();
  }, [moon_name]);

  return (
    <div className="Container">
      <React.Fragment>
        <Container className="card-container">
        <Row><h1 class="cardTitle">{props.data.englishName}</h1></Row>
          <Row className="Card">
            <Col>
              <hr />
              <img src={props.data.img} alt="moon" class="moon-img" width="350"/>
              <hr />
            </Col>
            <Col>
            <hr />
              <img src={props.data.orbit_img} alt="orbit" class="moon-orbit-img" width="350"/>
              <hr />
            </Col>
            <Row>
              <Col>
                <div class="bodyText">
                  <p>{" "}<strong>Mass:</strong> {props.data.massValue} 10^{props.data.massExponent} kg{" "}</p>
                  <p>{" "}<strong>Density:</strong> {props.data.density} 10^n g/km^3{" "}</p>
                  <p>{" "}<strong>Gravity:</strong> {props.data.gravity} m.s^-2{" "}</p>
                  <p>{" "}<strong>Volume:</strong> {props.data.volValue} 10^{props.data.volExponent} km^3{" "}</p>
                  {/* <p>{" "}<strong>Habitable? </strong> {props.data.is_habitable}{" "}</p> */}
                </div>
              </Col>
              <Row>
              <Col>
                <div class="model-links">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {" "}
                            <strong> Planet This Moon Orbits: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {planet.map((p) => (
                          <Link
                            class="link"
                            to={"/planet/" + p.planetKey}>
                            <p> {p.pl_name}</p>
                          </Link>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br></br>
                </div>
              </Col>
              <Col>
                <div class="model-links">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {" "}
                            <strong> Star You Might Be Interested In: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {star.map((p) => (
                          <Link
                            class="link"
                            to={"/star/" + p.starKey}>
                            <p> {p.star_name}</p>
                          </Link>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br></br>
                </div>
              </Col>
              </Row>
            </Row>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default MoonInstance;
