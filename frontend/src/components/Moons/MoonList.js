import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "../../styles/Planets.css";
import { CardActionArea } from "@mui/material";
import MoonImg from "../../assets/moons/moon.jpg";
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
    img: MoonImg,
    mass: 7.346e22,
    density: 3.344,
    gravity: 1.62,
    radius: 1737.0,
    planets: [{key: 0, planetName: "Earth", planetKey: 1}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 0,
  },
  {
    name: "Phobos",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg",
    mass: 1.06e10,
    density: 1.9,
    gravity: 0.78,
    radius: 1353.4,
    planets: [{key: 0, planetName: "Mercury", planetKey: 0}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 1,
  },
  {
    name: "Triton",
    img: "https://cdn.sci.news/images/enlarge6/image_7216e-Triton.jpg",
    mass: 1.4762e15,
    density: 1.75,
    gravity: 0.003,
    radius: 1737.0,
    planets: [{key: 0, planetName: "Neptune", planetKey: 2}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
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
