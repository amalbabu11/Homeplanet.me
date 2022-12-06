import React from "react";
import StarList from "./Stars/StarList.js";
import { Container, Col, Row } from "react-bootstrap";

class Stars extends React.Component {
  render() {
    return (
      <Container>
          <h1>Stars</h1>
        <Row>
          <Col>
          </Col>
          <Col>
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