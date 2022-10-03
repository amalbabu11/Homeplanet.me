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

function MoonInstance(props) {
  return (
    <div className="Container">
      <React.Fragment>
        <Container className="card-container">
          <Row className="Card">
            <Col>
              <h1 class="cardTitle">{props.data.name}</h1>
              <hr />
              <img src={props.data.img} alt="moon" class="moon-img" width="350"/>
              <hr />
            </Col>
            <Row>
              <Col>
                <div class="bodyText">
                  <p>
                    {" "}<strong>Mass:</strong> {props.data.mass} 10^n kg{" "}
                  </p>
                  <p>
                  {" "}<strong>Density:</strong> {props.data.density} 10^n km^3{" "}
                  </p>
                  <p>
                  {" "}<strong>Gravity:</strong> {props.data.gravity} m.s^-2{" "}
                  </p>
                  <p>
                  {" "}<strong>Radius:</strong> {props.data.radius} km{" "}
                  </p>
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
                        {props.data.planets.map((p) => (
                          <Link
                            class="link"
                            to={"/planet/" + p.planetKey}>
                            <p> {p.planetName}</p>
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

export default MoonInstance;
