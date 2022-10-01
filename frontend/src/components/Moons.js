import React from "react";
import MoonList from "./Moons/MoonList.js";
import { Container, Col, Row } from "react-bootstrap";

class Moons extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div class="container-group text-center">
              <h1>Moons</h1>
            </div>
            <MoonList />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Moons;
