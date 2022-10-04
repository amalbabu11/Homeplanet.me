import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "../../styles/Planets.css";
import { CardActionArea } from "@mui/material";
import MoonImg from "../../assets/moons/moon.jpg";
import MoonOrbit from "../../assets/moons/MoonOrbit.jpeg";
import PhobosImg from "../../assets/moons/Phobos.jpeg";
import PhobosOrbit from "../../assets/moons/PhobosOrbit.png";
import TritonImg from "../../assets/moons/Triton.jpeg";
import TritonOrbit from "../../assets/moons/TritonOrbit.png";

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
    orbit_img: "https://physicsworld.com/wp-content/uploads/2006/08/bulge.jpg",
    mass: 7.346e22,
    density: 3.344,
    gravity: 1.62,
    radius: 1737.0,
    planets: [{key: 0, planetName: "Earth", planetKey: 1}],
    stars: [{key: 0, starName: "61 Vir", starKey:0},
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    is_habitable: "No",
    key: 0,
  },
  {
    name: "Phobos",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg",
    orbit_img: "http://astronomynow.com/wp-content/uploads/2016/03/MAVEN-Phobos_orbit_compare_940x737.png",
    mass: 1.06e10,
    density: 1.9,
    gravity: 0.78,
    radius: 1353.4,
    is_habitable: "No",
    planets: [{key: 0, planetName: "Mercury", planetKey: 0}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 1,
  },
  {
    name: "Triton",
    img: "https://cdn.sci.news/images/enlarge6/image_7216e-Triton.jpg",
    orbit_img: "https://britastro.org/wp-content/uploads/2020/08/Triton_and_Neptune_opposition_2020_300x300_0.png",
    mass: 1.4762e15,
    density: 1.75,
    gravity: 0.003,
    radius: 1737.0,
    is_habitable: "No",
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

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
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
                          <strong>Mass:</strong> {c.mass} 10^n kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Radius: </strong> ~{c.radius} km
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Gravity: </strong> ~{c.gravity} m.s^-2
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
