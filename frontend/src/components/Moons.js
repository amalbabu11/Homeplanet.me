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
            <div class="container-group text-center">
              <h2>Sort By</h2>
            </div>
            <MoonSort />
          </Col>
        </Row>
        {/* Handle Displaying all Moons (moon list) and search function for moons */}
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
