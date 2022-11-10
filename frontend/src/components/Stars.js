import React from "react";
import StarList from "./Stars/StarList.js";
import { Container, Col, Row } from "react-bootstrap";
import StarSort from "./Stars/StarSort.js"

class Stars extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div class="container-group text-center">
              <h2>Sort By</h2>
            </div>
            <StarSort />
          </Col>
        </Row>
        <Row>
          <Col>
            <div class="container-group text-center">
              <h1>Stars</h1>
            </div>
            <StarList />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Stars;
