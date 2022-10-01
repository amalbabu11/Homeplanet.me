import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "../../styles/Planets.css";
import { CardActionArea } from "@mui/material";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

const moon_list = [
  {
    name: "Moon",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    mass: 7.346e22,
    vol: 2.1968e10,
    density: 3.344,
    gravity: 1.62,
    radius: 1737.0,
    key: 0,
  },
  {
    name: "Moon2",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    mass: 7.346e22,
    vol: 2.1968e10,
    density: 3.344,
    gravity: 1.62,
    radius: 1737.0,
    key: 1,
  },
  {
    name: "Moon3",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    mass: 7.346e22,
    vol: 2.1968e10,
    density: 3.344,
    gravity: 1.62,
    radius: 1737.0,
    key: 2,
  },
];

export function GetMoonList() {
  return moon_list;
}

function MoonList() {
  return (
    <Container style={{ width: "100%" }}>
      <div class="container-group">
        <Row>
          {moon_list.map((c) => (
            <Col>
              <CardActionArea component={RouterLink} to={"/moon/" + c.key}>
                <MDBCard class="card-style">
                  <MDBCardImage className="img-grp" src={c.img} />
                  <MDBCardBody>
                    <MDBCardTitle class="cardTitle"> {c.name} </MDBCardTitle>
                    <h3 class="cardSub">{c.state}</h3>
                    <MDBCardText>
                      <ListGroup>
                        <ListGroupItem>
                          <strong>Mass:</strong> {c.mass} UNITS
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Radius: </strong> ~{c.radius} UNITS
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Gravity: </strong> ~{c.gravity} UNITS
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Volume: </strong> ~{c.vol} UNITS
                        </ListGroupItem>
                      </ListGroup>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </CardActionArea>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default MoonList;
