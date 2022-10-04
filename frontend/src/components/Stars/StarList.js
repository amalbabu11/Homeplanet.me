import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import Vir61Img from "../../assets/stars/61Vir.jpg";
import Vir61Orbit from "../../assets/stars/61VirOrbit.jpeg";
import alfCenAImg from "../../assets/stars/alfCenA.jpeg";
import alfCenAOrbit from "../../assets/stars/AlphaCenAOrbit.gif";
import HIP17378Img from "../../assets/stars/HIP17378.png";
import HIP17378Orbit from "../../assets/stars/HIP17378Orbit.png";
import "../../styles/Stars.css";
import { CardActionArea } from "@mui/material";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

const star_list = [
  {
    name: "61 Vir",
    img: Vir61Img,
    orbit_img: Vir61Orbit,
    st_teff: 5571.0,
    st_vmagearth: 29.44,
    st_rad: 0.98,
    st_mass: 0.94,
    st_logg: 4.45,
    st_age: 8.96,
    st_lumclass: "MAINSEQ",
    moons: [{key: 0, moonName: "Moon", moonKey: 0},
    {key: 0, moonName: "Phobos", moonKey: 1},
    {key: 0, moonName: "Triton", moonKey: 2}],
    planets: [{key: 0, planetName: "Mercury", planetKey: 0},
    {key: 0, planetName: "Neptune", planetKey: 2},
    {key: 0, planetName: "Earth", planetKey: 1}],
    key: 0,
  },
  {
    name: "alf Cen A",
    img: alfCenAImg,
    orbit_img: alfCenAOrbit,
    st_teff: 5801.0,
    st_vmagearth: 25.35,
    st_rad: 1.25,
    st_mass: 1.06,
    st_logg: 4.3,
    st_age: 7.84,
    moons: [{key: 0, moonName: "Moon", moonKey: 0},
    {key: 0, moonName: "Phobos", moonKey: 1},
    {key: 0, moonName: "Triton", moonKey: 2}],
    planets: [{key: 0, planetName: "Mercury", planetKey: 0},
    {key: 0, planetName: "Neptune", planetKey: 2},
    {key: 0, planetName: "Earth", planetKey: 1}],
    key: 1,
  },
  {
    name: "HIP 17378",
    img: HIP17378Img,
    orbit_img: HIP17378Orbit,
    st_teff: 5095.0,
    st_vmagearth: 29.11,
    st_rad: 2.27,
    st_mass: 1.19,
    st_logg: 4.01,
    st_age: 6.28,
    st_lumclass: "GIANT",
    moons: [{key: 0, moonName: "Moon", moonKey: 0},
    {key: 0, moonName: "Phobos", moonKey: 1},
    {key: 0, moonName: "Triton", moonKey: 2}],
    planets: [{key: 0, planetName: "Mercury", planetKey: 0},
    {key: 0, planetName: "Neptune", planetKey: 2},
    {key: 0, planetName: "Earth", planetKey: 1}],
    key: 2,
  },
];

export function GetStarList() {
  return star_list;
}

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function StarList() {
  return (
    <Container style={{ width: "100%" }}>
      <div class="container-group">
        <Row>
          {star_list.map((c) => (
            <Col>
              <CardActionArea component={RouterLink} to={"/star/" + c.key}>
                <MDBCard class="card-style">
                  <MDBCardImage className="img-grp" src={c.img} />
                  <MDBCardBody>
                    <MDBCardTitle class="cardTitle"> {c.name} </MDBCardTitle>
                    <h3 class="cardSub">{c.state}</h3>

                    <MDBCardText>
                      <ListGroup>
                        <ListGroupItem>
                          <strong>Luminosity Class:</strong> {c.st_lumclass}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Age: </strong> ~{c.st_age} UNITS
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Radius: </strong> ~{c.st_rad} Suns
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Mass: </strong> ~{c.st_mass} Suns
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

export default StarList;
