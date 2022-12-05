import React from "react";
import MoonList from "./Moons/MoonList.js";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../styles/Planets.css";
import MoonFilter from "./Moons/MoonFilter.js";

class Moons extends React.Component {
  render() {
    return (
      <Container >
        {/* Handle Moon Sort */}
        <Row>
        <h1>Moons</h1>
          <Col>
            {/* <h2>Sort By</h2> */}
            {/* <MoonSort /> */}
          </Col>
          <Col>
          {/* <h2>Filter By Host Planet</h2> */}
            {/* <MoonFilter /> */}
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