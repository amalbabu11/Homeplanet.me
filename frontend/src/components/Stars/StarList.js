import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
// import Crawford from "../../assets/counties/crawford.png";
// TODO: add images in assets folder instead 
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
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/61_Vir_as_seen_with_a_12.5%22_telescope_with_a_field_of_view_of_45.1_arcminutes.jpg/500px-61_Vir_as_seen_with_a_12.5%22_telescope_with_a_field_of_view_of_45.1_arcminutes.jpg",
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
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/The_bright_star_Alpha_Centauri_and_its_surroundings.jpg/220px-The_bright_star_Alpha_Centauri_and_its_surroundings.jpg",
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
    img: "https://in-the-sky.org/image.php?style=icon&obj=21994",
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
