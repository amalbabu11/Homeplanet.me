import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import "../../styles/Planets.css";
import { CardActionArea } from "@mui/material";
import MercuryImg from "../../assets/planets/MercuryImg.jpeg";
import MercuryOrbit from "../../assets/planets/MercuryOrbit.jpeg";
import EarthImg from "../../assets/planets/EarthImg.jpeg";
import EarthOrbit from "../../assets/planets/EarthOrbit.jpeg";
import NeptuneImg from "../../assets/planets/Neptune.jpeg";
import NeptuneOrbit from "../../assets/planets/NeptuneOrbit.jpeg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";

const planet_list = [
  {
    name: "Mercury",
    img: MercuryImg,
    orbit_img: MercuryOrbit,
    mass: 0.000174,
    radius: 0.0341,
    period: 88.0,
    semi_major_axis: 0.387098,
    temperature: 400.0,
    distance_light_year: 1.1e-05,
    host_star_mass: 1.0,
    host_star_temperature: 6000.0,
    is_habitable: "No",
    moons: [{key: 0, moonName: "Phobos", moonKey: 1}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 0,
  },
  {
    name: "Earth",
    img: EarthImg,
    orbit_img: EarthOrbit,
    mass: 0.00315,
    radius: 0.0892,
    period: 365.2,
    semi_major_axis: 1.0,
    temperature: 288.0,
    distance_light_year: 0.0,
    host_star_mass: 1.0,
    host_star_temperature: 6000.0,
    is_habitable: "Yes",
    moons: [{key: 0, moonName: "Moon", moonKey: 0}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 1,
  },
  {
    name: "Neptune",
    img: NeptuneImg,
    orbit_img: NeptuneOrbit,
    mass: 0.0537,
    radius: 0.346,
    period: 59800.0,
    semi_major_axis: 30.07,
    temperature: 737.0,
    distance_light_year: 4e-06,
    host_star_mass: 1.0,
    host_star_temperature: 6000.0,
    is_habitable: "No",
    moons: [{key: 0, moonName: "Triton", moonKey: 2}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 2,
  },
];

export function GetPlanetList() {
  return planet_list;
}

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function PlanetList() {
  return (
    <Container style={{ width: "100%" }}>
      <div class="container-group">
        <Row>
          {planet_list.map((c) => (
            <Col>
              <CardActionArea component={RouterLink} to={"/planet/" + c.key}>
                <MDBCard class="card-style">
                  <MDBCardImage className="img-grp" src={c.img} />
                  <MDBCardBody>
                    <MDBCardTitle class="cardTitle"> {c.name} </MDBCardTitle>
                    <h3 class="cardSub">{c.state}</h3>
                    <MDBCardText>
                      <ListGroup>
                        <ListGroupItem><strong>Radius:</strong> {c.radius} Jupiters</ListGroupItem>
                        <ListGroupItem><strong>Distance From Earth: </strong> ~{c.distance_light_year} Light Years</ListGroupItem>
                        <ListGroupItem><strong>Mass: </strong> ~{c.mass} Jupiters</ListGroupItem>
                        <ListGroupItem><strong>Temperature: </strong> ~{c.temperature} degrees Kelvin</ListGroupItem>
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

export default PlanetList;
