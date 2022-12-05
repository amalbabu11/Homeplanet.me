import React from "react";
import MoonList from "./Moons/MoonList.js";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../styles/Planets.css";
import MoonSort from "./Moons/MoonSort.js";
import MoonSearch from "./Moons/MoonList.js";

class Moons extends React.Component {
  render() {
    return (
      <Container >
        {/* Handle Moon Sort */}
        <Row>
          <Col>
            <h1>Moons</h1>
            <h2>Sort By</h2>
            <MoonSort />
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
