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

const planet_list = [
  {
    name: "Mercury",
    img: "https://scx2.b-cdn.net/gfx/news/hires/2015/whatsimporta.jpg",
    mass: 0.000174,
    radius: 0.0341,
    period: 88.0,
    semi_major_axis: 0.387098,
    temperature: 400.0,
    distance_light_year: 1.1e-05,
    host_star_mass: 1.0,
    host_star_temperature: 6000.0,
    moons: [{key: 0, moonName: "Phobos", moonKey: 1}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 0,
  },
  {
    name: "Earth",
    img: "https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg",
    mass: 0.00315,
    radius: 0.0892,
    period: 365.2,
    semi_major_axis: 1.0,
    temperature: 288.0,
    distance_light_year: 0.0,
    host_star_mass: 1.0,
    host_star_temperature: 6000.0,
    moons: [{key: 0, moonName: "Moon", moonKey: 0}],
    stars: [{key: 0, starName: "61 Vir", starKey:0}, 
    {key: 1, starName: "alf Cen A", starKey: 1},
    {key: 2, starName: "Fomalhaut", starKey: 2}],
    key: 1,
  },
  {
    name: "Neptune",
    img: "http://cen.acs.org/content/dam/cen/99/11/WEB/09911-feature3-venus.jpg",
    mass: 0.0537,
    radius: 0.346,
    period: 59800.0,
    semi_major_axis: 30.07,
    temperature: 737.0,
    distance_light_year: 4e-06,
    host_star_mass: 1.0,
    host_star_temperature: 6000.0,
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
