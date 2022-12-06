import React from "react";
import PlanetList from "./Planets/PlanetList.js";
import { Container, Col, Row } from "react-bootstrap";
import "../App.css";

class Planets extends React.Component {
  render() {
    return (
      <Container>
          <h1>Planets</h1>
        <Row>
          <Col>
            <PlanetList />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Planets;
