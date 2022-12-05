import React from "react";
import StarList from "./Stars/StarList.js";
import StarFilter from "./Stars/StarFilter.js";
import { Container, Col, Row } from "react-bootstrap";

class Stars extends React.Component {
  render() {
    return (
      <Container>
          <h1>Stars</h1>
        <Row>
          <Col>
          {/* <h2>Sort By</h2> */}
          {/* <StarSort /> */}
          </Col>
          <Col>
          {/* <h2>Filter By Luminosity Class</h2> */}
            {/* <StarFilter /> */}
          </Col>
          </Row>
        <Row>
          <Col>
            <StarList />
          </Col>
          
        </Row>
      </Container>
    );
  }
}
export default Stars;