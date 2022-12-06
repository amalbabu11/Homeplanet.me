import React from "react";
import MoonList from "./Moons/MoonList.js";
import { Container, Col, Row } from "react-bootstrap";

class Moons extends React.Component {
  render() {
    return (
      <Container >
        {/* Handle Moon Sort */}
        <h1>Moons</h1>
        <Row>
          <Col>
            <MoonList />  
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Moons;