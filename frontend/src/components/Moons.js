import React from "react";
import MoonList from "./Moons/MoonList.js";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../styles/Planets.css";
import MoonSort from "./Moons/MoonSort.js";
import MoonSearch from "./Moons/MoonSearch.js";

class Moons extends React.Component {
  render() {
    return (
      <Container >

        {/* Handle Moon Search */}
        <Row>
          <Col>
            <div class="container-group text-center">
              <h2>Search</h2>
            </div>
            <MoonSearch />
          </Col>
        </Row>
        {/* Handle Moon Sort */}
        <Row>
          <Col>
            <div class="container-group text-center">
              <h2>Sort By</h2>
            </div>
            <MoonSort />
          </Col>
        </Row>
        {/* Handle Displaying all Moons (moon list) */}
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
