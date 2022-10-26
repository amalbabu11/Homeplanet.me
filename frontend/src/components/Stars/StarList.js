import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
  CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function StarList() {
  let [searchParams] = useSearchParams();
  
  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [stars, setStars] = useState([])

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://homeplanet.me/api/all_stars?page=${page}&per_page=${per_page}`,
        // https://homeplanet.me/api/all_stars?page=1&per_page=15
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
      setStars(body['bodies']) 
    };
    getData();
  }, [page, per_page]);
  return (
    <Container >
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Box >
          <Grid container spacing={6} columns={20}>
          {stars.map((c) => ( // same thing as: for c in stars
              <Grid item xs={5}>
                <Card className="star_card">
                <CardActionArea component={RouterLink} to={"/star/" + c.key}>
                  <MDBCardImage className="img-grp" src={c.img} />
                  { <CardContent>
                    <h1 class="cardTitle"> {c.star_name} </h1>
                    <h3 class="cardSub">{c.state}</h3>
                    <CardContent>
                    {/* <ListGroup>
                        <ListGroupItem>
                          <strong>Luminosity Class:</strong> {c.st_lumclass}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Radius:</strong> {c.st_rad} Suns
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Mass:</strong> {c.st_mass} Suns
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Age:</strong> {c.st_age} million years
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Density: </strong> ~{c.pl_dens}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Eqt: </strong> ~{c.pl_eqt}
                        </ListGroupItem> */}
                      {/* </ListGroup> */}
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
            <Pagination shape="rounded" count={25} renderItem={(item) => (
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

export default StarList;


// import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
// import { Link as RouterLink } from "react-router-dom";
// import Vir61Img from "../../assets/stars/61Vir.jpg";
// import Vir61Orbit from "../../assets/stars/61VirOrbit.jpeg";
// import alfCenAImg from "../../assets/stars/alfCenA.jpeg";
// import alfCenAOrbit from "../../assets/stars/AlphaCenAOrbit.gif";
// import HIP17378Img from "../../assets/stars/HIP17378.png";
// import HIP17378Orbit from "../../assets/stars/HIP17378Orbit.png";
// import "../../styles/Stars.css";
// import { CardActionArea } from "@mui/material";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
// } from "mdb-react-ui-kit";

// const star_list = [
//   {
//     name: "61 Vir",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/61_Vir_as_seen_with_a_12.5%22_telescope_with_a_field_of_view_of_45.1_arcminutes.jpg/500px-61_Vir_as_seen_with_a_12.5%22_telescope_with_a_field_of_view_of_45.1_arcminutes.jpg",
//     orbit_img: "http://www.solstation.com/stars/61vir2or.jpg",
//     st_teff: 5571.0,
//     st_vmagearth: 29.44,
//     st_rad: 0.98,
//     st_mass: 0.94,
//     st_logg: 4.45,
//     st_age: 8.96,
//     st_lumclass: "MAINSEQ",
//     moons: [{key: 0, moonName: "Moon", moonKey: 0},
//     {key: 0, moonName: "Phobos", moonKey: 1},
//     {key: 0, moonName: "Triton", moonKey: 2}],
//     planets: [{key: 0, planetName: "Mercury", planetKey: 0},
//     {key: 0, planetName: "Neptune", planetKey: 2},
//     {key: 0, planetName: "Earth", planetKey: 1}],
//     key: 0,
//   },
//   {
//     name: "alf Cen A",
//     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/The_bright_star_Alpha_Centauri_and_its_surroundings.jpg/220px-The_bright_star_Alpha_Centauri_and_its_surroundings.jpg",
//     orbit_img: "https://www.daviddarling.info/images/AlphaCen.gif",
//     st_teff: 5801.0,
//     st_vmagearth: 25.35,
//     st_rad: 1.25,
//     st_mass: 1.06,
//     st_logg: 4.3,
//     st_age: 7.84,
//     moons: [{key: 0, moonName: "Moon", moonKey: 0},
//     {key: 0, moonName: "Phobos", moonKey: 1},
//     {key: 0, moonName: "Triton", moonKey: 2}],
//     planets: [{key: 0, planetName: "Mercury", planetKey: 0},
//     {key: 0, planetName: "Neptune", planetKey: 2},
//     {key: 0, planetName: "Earth", planetKey: 1}],
//     key: 1,
//   },
//   {
//     name: "HIP 17378",
//     img: "https://in-the-sky.org/image.php?style=icon&obj=21994",
//     orbit_img: "https://www.researchgate.net/profile/Suhail-Masda-2/publication/323141856/figure/fig3/AS:631612115001383@1527599471831/The-relative-orbit-of-the-binary-system-HIP-105947-constructed-using-the-relative.png",
//     st_teff: 5095.0,
//     st_vmagearth: 29.11,
//     st_rad: 2.27,
//     st_mass: 1.19,
//     st_logg: 4.01,
//     st_age: 6.28,
//     st_lumclass: "GIANT",
//     moons: [{key: 0, moonName: "Moon", moonKey: 0},
//     {key: 0, moonName: "Phobos", moonKey: 1},
//     {key: 0, moonName: "Triton", moonKey: 2}],
//     planets: [{key: 0, planetName: "Mercury", planetKey: 0},
//     {key: 0, planetName: "Neptune", planetKey: 2},
//     {key: 0, planetName: "Earth", planetKey: 1}],
//     key: 2,
//   },
// ];

// export function GetStarList() {
//   return star_list;
// }

// // Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
// function StarList() {
//   return (
//     <Container style={{ width: "100%" }}>
//       <div class="container-group">
//         <Row>
//           {star_list.map((c) => (
//             <Col>
//               <CardActionArea component={RouterLink} to={"/star/" + c.key}>
//                 <MDBCard class="card-style">
//                   <MDBCardImage className="img-grp" src={c.img} />
//                   <MDBCardBody>
//                     <MDBCardTitle class="cardTitle"> {c.name} </MDBCardTitle>
//                     <h3 class="cardSub">{c.state}</h3>

//                     <MDBCardText>
//                       <ListGroup>
//                         <ListGroupItem>
//                           <strong>Luminosity Class:</strong> {c.st_lumclass}
//                         </ListGroupItem>
//                         <ListGroupItem>
//                           <strong>Age: </strong> ~{c.st_age} UNITS
//                         </ListGroupItem>
//                         <ListGroupItem>
//                           <strong>Radius: </strong> ~{c.st_rad} Suns
//                         </ListGroupItem>
//                         <ListGroupItem>
//                           <strong>Mass: </strong> ~{c.st_mass} Suns
//                         </ListGroupItem>
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

// export default StarList;
