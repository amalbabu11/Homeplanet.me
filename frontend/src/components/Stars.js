import React from "react";
import StarList from "./Stars/StarList.js";
import { Container, Col, Row } from "react-bootstrap";
import StarSort from "./Stars/StarSort.js";

class Stars extends React.Component {
  render() {
    return (
      <Container>
          <h1>Stars</h1>
        <Row>
            <h2>Sort By</h2>
          <StarSort />
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
