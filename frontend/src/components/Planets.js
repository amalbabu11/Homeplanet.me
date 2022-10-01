import React from "react";
import PlanetList from "./Planets/PlanetList.js";
import { Container, Col, Row } from "react-bootstrap";

class Planets extends React.Component {
  render() {
    return (
      <Container>
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
