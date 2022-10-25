import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
  CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function PlanetList() {
  let [searchParams] = useSearchParams();
  
  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "15")
  let [planets, setPlanets] = useState([])

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://homeplanet.me/api/all_planets?page=${page}&per_page=${per_page}`,
        // https://homeplanet.me/api/all_planets?page=1&per_page=15
        { mode: 'cors', }
      );
      console.log("RESPONSE")
      console.log(response)
      console.log(response.text)
      console.log(response.status)
      console.log(JSON.stringify(response))
      let body = []
      body = await response.json()
      console.log("BODY")
      console.log(JSON.stringify(body))
      setPlanets(body['bodies'])
    };
    getData();
  }, [page, per_page]);
  return (
    <Container >
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Box >
          <Grid container spacing={4} columns={16}>
          {planets.map((c) => (
              <Grid item xs={5}>
                <Card className="planet_card">
                <CardActionArea component={RouterLink} to={"/planet/" + c.key}>
                  <MDBCardImage className="img-grp" src={c.img} />
                  { <CardContent>
                    <h1 class="cardTitle"> {c.pl_name} </h1>
                    <h3 class="cardSub">{c.state}</h3>
                    <CardContent>
                    <ListGroup>
                        <ListGroupItem>
                          <strong>Mass:</strong> {c.pl_masse} 
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Radius:</strong> {c.pl_rade} 10^n kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Density: </strong> ~{c.pl_dens}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Eqt: </strong> ~{c.pl_eqt}
                        </ListGroupItem>
                      </ListGroup>
                    </CardContent>
                  </CardContent> }
                </CardActionArea>
                </Card>
              </Grid>
          ))}
          </Grid>
          </Box>
        </div>
       <div style={{display: 'flex', justifyContent: 'center'}}>
          <Stack>
            <Pagination shape="rounded" count={17} renderItem={(item) => (
              <PaginationItem
              component={RouterLink}
              to={`?page=${item.page}&per_page=${per_page}`}
              {...item}
              />
              )}
              />
          </Stack>
      </div>
      </>
      </Container>
  );
}

export default PlanetList;


// import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
// import { Link as RouterLink } from "react-router-dom";
// import "../../styles/Planets.css";
// import { CardActionArea } from "@mui/material";
// import MercuryImg from "../../assets/planets/MercuryImg.jpeg";
// import MercuryOrbit from "../../assets/planets/MercuryOrbit.jpeg";
// import EarthImg from "../../assets/planets/EarthImg.jpeg";
// import EarthOrbit from "../../assets/planets/EarthOrbit.jpeg";
// import NeptuneImg from "../../assets/planets/Neptune.jpeg";
// import NeptuneOrbit from "../../assets/planets/NeptuneOrbit.jpeg";

// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
// } from "mdb-react-ui-kit";

// const planet_list = [
//   {
//     name: "Mercury",
//     img: "https://scx2.b-cdn.net/gfx/news/hires/2015/whatsimporta.jpg",
//     orbit_img: "http://luna1.diviner.ucla.edu/~jpierre/mercury/posters/Poster-03/images/spin-orbit-resonance.jpg",
//     mass: 0.000174,
//     radius: 0.0341,
//     period: 88.0,
//     semi_major_axis: 0.387098,
//     temperature: 400.0,
//     distance_light_year: 1.1e-05,
//     host_star_mass: 1.0,
//     host_star_temperature: 6000.0,
//     is_habitable: "No",
//     moons: [{key: 0, moonName: "Phobos", moonKey: 1}],
//     stars: [{key: 0, starName: "61 Vir", starKey:0}, 
//     {key: 1, starName: "alf Cen A", starKey: 1},
//     {key: 2, starName: "Fomalhaut", starKey: 2}],
//     key: 0,
//   },
//   {
//     name: "Earth",
//     img: "https://cdn.mos.cms.futurecdn.net/yCPyoZDQBBcXikqxkeW2jJ-1200-80.jpg",
//     orbit_img: "https://www.nasa.gov/sites/default/files/orbit-3.jpg",
//     mass: 0.00315,
//     radius: 0.0892,
//     period: 365.2,
//     semi_major_axis: 1.0,
//     temperature: 288.0,
//     distance_light_year: 0.0,
//     host_star_mass: 1.0,
//     host_star_temperature: 6000.0,
//     is_habitable: "Yes",
//     moons: [{key: 0, moonName: "Moon", moonKey: 0}],
//     stars: [{key: 0, starName: "61 Vir", starKey:0}, 
//     {key: 1, starName: "alf Cen A", starKey: 1},
//     {key: 2, starName: "Fomalhaut", starKey: 2}],
//     key: 1,
//   },
//   {
//     name: "Neptune",
//     img: "http://cen.acs.org/content/dam/cen/99/11/WEB/09911-feature3-venus.jpg",
//     orbit_img: "https://www.nasa.gov/images/content/569229main_hubble-neptune-with-moons-full.jpg",
//     mass: 0.0537,
//     radius: 0.346,
//     period: 59800.0,
//     semi_major_axis: 30.07,
//     temperature: 737.0,
//     distance_light_year: 4e-06,
//     host_star_mass: 1.0,
//     host_star_temperature: 6000.0,
//     is_habitable: "No",
//     moons: [{key: 0, moonName: "Triton", moonKey: 2}],
//     stars: [{key: 0, starName: "61 Vir", starKey:0}, 
//     {key: 1, starName: "alf Cen A", starKey: 1},
//     {key: 2, starName: "Fomalhaut", starKey: 2}],
//     key: 2,
//   },
// ];

// export function GetPlanetList() {
//   return planet_list;
// }

// // Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
// function PlanetList() {
//   return (
//     <Container style={{ width: "100%" }}>
//       <div class="container-group">
//         <Row>
//           {planet_list.map((c) => (
//             <Col>
//               <CardActionArea component={RouterLink} to={"/planet/" + c.key}>
//                 <MDBCard class="card-style">
//                   <MDBCardImage className="img-grp" src={c.img} />
//                   <MDBCardBody>
//                     <MDBCardTitle class="cardTitle"> {c.name} </MDBCardTitle>
//                     <h3 class="cardSub">{c.state}</h3>
//                     <MDBCardText>
//                       <ListGroup>
//                         <ListGroupItem><strong>Radius:</strong> {c.radius} Jupiters</ListGroupItem>
//                         <ListGroupItem><strong>Distance From Earth: </strong> ~{c.distance_light_year} Light Years</ListGroupItem>
//                         <ListGroupItem><strong>Mass: </strong> ~{c.mass} Jupiters</ListGroupItem>
//                         <ListGroupItem><strong>Temperature: </strong> ~{c.temperature} degrees Kelvin</ListGroupItem>
//                       </ListGroup>
//                     </MDBCardText>
//                   </MDBCardBody>
//                 </MDBCard>
//               </CardActionArea>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </Container>
//   );
// }

// export default PlanetList;
