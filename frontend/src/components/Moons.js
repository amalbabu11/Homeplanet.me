import React from "react";
import MoonList from "./Moons/MoonList.js";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../styles/Planets.css";

class Moons extends React.Component {
  render() {
    return (
      <Container >
        <Row>
        <h1>Moons</h1>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
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
