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
          <Row><h1 class="cardTitle">{props.data.name}</h1></Row>
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
                  <p>{" "}<strong>Mass:</strong> {props.data.mass} Jupiters{" "}</p>
                  <p>{" "}<strong>Radius:</strong> {props.data.radius} Jupiters{" "}</p>
                  <p>{" "}<strong>Period:</strong> {props.data.period} Earth days{" "}</p>
                  <p>{" "}<strong>Temperature:</strong> {props.data.temperature} degrees Kelvin{" "}</p>
                  <p>{" "}<strong>Distance From Earth:</strong> {props.data.distance_light_year} Light Years{" "}</p>
                  <p>{" "}<strong>Host Star Mass:</strong> {props.data.host_star_mass} Suns{" "}</p>
                  <p>{" "}<strong>Host Star Temperature:</strong> {props.data.host_star_temperature} Kelvins{" "}</p>
                  <p>{" "}<strong>Habitable? </strong> {props.data.is_habitable}{" "}</p>
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
