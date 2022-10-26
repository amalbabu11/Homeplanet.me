import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function PlanetInstance(props) {
  return (
    <div className="Container">
      <React.Fragment>
        <Container className="card-container">
          <Row><h1 class="cardTitle">{props.data.pl_name}</h1></Row>
          <Row className="Card">
            <Col>
              <hr />
              <img src={props.data.img} alt="planet" class="planet-img" width="350"/>
              <hr />
            </Col>
            <Col>
            <hr />
              <img src={props.data.orbit_img} alt="orbit" class="planet-orbit-img" width="350"/>
              <hr />
            </Col>
            <Row>
              <Col>
                <div class="bodyText">
                  {/*This is the information provided by get_planets() in utils.py*/}
                  <p>{" "}<strong>Mass:</strong> {props.data.pl_masse} Earth masses{" "}</p>
                  <p>{" "}<strong>Radius: </strong> {props.data.pl_rade} Earth radiuses{" "}</p>
                  <p>{" "}<strong>Density: </strong> {props.data.pl_dens} g/cm^3{" "}</p>
                  <p>{" "}<strong>Equilibrium Temperature: </strong> {props.data.pl_eqt} Kelvin{" "}</p>
                  <p>{" "}<strong>Orbits around: </strong> {props.data.hostname}{" "}</p>
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
                            <strong> Moons That Orbit This Planet: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.data.moons.map((p) => (
                          <Link
                            class="link"
                            to={"/moon/" + p.moonKey}>
                            <p> {p.moonName}</p>
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
                            <strong> Stars You Might Be Interested In: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.data.stars.map((p) => (
                          <Link
                            class="link"
                            to={"/star/" + p.starKey}>
                            <p> {p.starName}</p>
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

export default PlanetInstance;
