import React from "react";
import PlanetList from "./Planets/PlanetList.js";
import { Container, Col, Row } from "react-bootstrap";
import PlanetSort from "./Planets/PlanetSort.js";

class Planets extends React.Component {
  render() {
    return (
      <Container>
        <Row>
        <div class="container-group text-center">
            <h1>Sort By</h1>
          </div>
          <PlanetSort />
          </Row>
        <Row>
          <Col>
            <div class="container-group text-center">
              <h1>Planets</h1>
            </div>
            <PlanetList />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Planets;
