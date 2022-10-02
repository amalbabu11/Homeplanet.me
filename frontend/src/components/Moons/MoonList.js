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
    density: 3.344,
    gravity: 1.62,
    radius: 1737.0,
    planet: "earth",
    key: 0,
  },
  {
    name: "Phobos",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg",
    mass: 1.06e10,
    density: 1.9,
    gravity: 0.78,
    radius: 1353.4,
    planet: "mars",
    key: 1,
  },
  {
    name: "Triton",
    img: "https://cdn.sci.news/images/enlarge6/image_7216e-Triton.jpg",
    mass: 1.4762e15,
    density: 1.75,
    gravity: 0.003,
    radius: 1737.0,
    planet: "neptune",
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
