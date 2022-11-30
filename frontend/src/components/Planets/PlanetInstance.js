import { Container, Col, Row } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
// import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif"
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
import defaultPlanetOrbit from "../../assets/planets/defaultPlanetOrbit.png"
import { CardActionArea, CardContent } from "@mui/material";
import defaultStarImg from "../../assets/stars/defaultStarImg.png"
import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif";

// cleans up code by relocating high quantity String text. returns a map of explanations
function fillExplanations() {
  // TODO: In the future, might be able to export map to be shared by all <...>Instance.js files
  const unit_explanations = new Map();
  
  unit_explanations.set("mass", "Earth masses are how many times you would need \
  to multiply the mass of the Earth in order to reach the mass of this \
  planet. One Earth mass \
  is: 5.972 x 10^24 kg according to https://en.wikipedia.org/wiki/Earth");

  unit_explanations.set("radius", "Earth radiuses are how many times you would \
  need to multiply the radius of the Earth in order to reach the radius of \
  this planet. One Earth radius is about: 6,378 km according \
  to https://imagine.gsfc.nasa.gov/features/cosmic/earth_info.html#\
  :~:text=Its%20equatorial%20radius%20is%206378,the%20polar%20and%20\
  equatorial%20values.");

  unit_explanations.set("density", "Density is the measure of how much \
  mass fits into a space. In other words, mass/volume = density. \
  In this case, it is measured in grams per cubic centimeter. \
  See more at: https://en.wikipedia.org/wiki/Density");

  unit_explanations.set("eq_temp", "When no other sources of energy are \
  considered, and when a planet is treated as if it had no atmosphere; the \
  temperature the planet would become is the equilibrium temperature. This is \
  because it won't get any hotter than the energy the sun is providing. See \
  more at: https://en.wikipedia.org/wiki/Planetary_equilibrium_temperature#:\
  ~:text=Thermal%20equilibrium%20exists%20when%20the,\
  is%20the%20planetary%20equilibrium%20temperature.");

  unit_explanations.set("orb_per", "Orbital period is the amount of time a given \
  astronomical object takes to complete one orbit around another object, in this case, \
  the planet around its star.");
  
  unit_explanations.set("hostname", "The hostname is just the celestial body \
  (planet, star, moon, etc) that THIS celestial body orbits around.");

  return unit_explanations;
}

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function PlanetInstance(props) {
  let id = useParams().planetId ?? "1"
  console.log("ID IS : " + id)

  let [planet, setPlanet] = useState([])
  let [star, setStar] = useState([])
  let [moon, setMoon] = useState([])

  // Used for explanations of units of measurement. records which button is pressed
  const [explanationNum, setExplanationNum] = useState(0);
  function handleClick (exNum) {
    setExplanationNum(exNum);
  }

  // fetch data about this planet
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://api.homeplanet.me/api/planet?index=${id}`,
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
      setPlanet(body[0]) 
    };
    getData();
  }, [id]);

  // fetch recommended moon and star based on this planet
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://api.homeplanet.me/api/recommand/planet?planet=${id}`, 
        { mode: 'cors', }
      );
      console.log("RESPONSE");
      console.log(response);
      console.log(response.text);
      console.log(response.status);
      console.log(JSON.stringify(response));
      let body = [];
      body = await response.json();
      console.log("BODY");
      console.log(JSON.stringify(body));
      setStar(body["star"][0]);
      setMoon(body["moon"][0]);
    };
    getData();
  }, [id]);

  // unit_explanations is a map of all explanations
  const unit_explanations = fillExplanations();

  return (
    <div className="Container">
      <React.Fragment>
        <Container className="card-container">
          <Row><h1 class="cardTitle">{planet.pl_name}</h1></Row>
          <Row className="Card">
            <Col>
              <hr />
              <img src={planet.img ? `//images.weserv.nl/?url=${planet.img}` : defaultPlanetImg} alt="planet" class="planet-img" width="350"/>
              <hr />
            </Col>
            <Col>
              <hr />
              <img src={planet.orbit_img ? `//images.weserv.nl/?url=${planet.orbit_img}` : defaultPlanetOrbit} alt="planet" class="planet-orbit" width="350"/>
              <hr />
            </Col>
            <Row>
              <Col align="center">
                <div class="bodyText">

                  <p>Click on each bolded attribute below to see more information</p>

                  {/* This is the information provided by get_planets() in utils.py*/}
                   <p onClick={() => handleClick(1)}> 
                    <strong>Mass:</strong> {planet.pl_masse ?? "Unknown"} Earth masses
                  </p>
                   {explanationNum === 1 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("mass")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                  <p onClick={() => handleClick(2)}> 
                  <strong>Radius:</strong> {planet.pl_rade ?? "Unknown"} Earth radiuses
                  </p>
                   {explanationNum === 2 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("radius")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                  <p onClick={() => handleClick(3)}> 
                  <strong>Density: </strong> {planet.pl_dens ?? "Unknown"} g/cm^3
                  </p>
                   {explanationNum === 3 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("density")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                  <p onClick={() => handleClick(4)}> 
                  <strong>Equilibrium Temperature: </strong> {planet.pl_eqt ?? "Unknown"} Kelvin
                  </p>
                   {explanationNum === 4 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("eq_temp")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                  <p onClick={() => handleClick(5)}> 
                  <strong>Hostname: </strong> {planet.hostname ?? "Unknown"}
                  </p>
                   {explanationNum === 5 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("hostname")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                  <p onClick={() => handleClick(6)}> 
                  <strong>Orbital Period: </strong> {planet.pl_orbper ?? "Unknown"} Earth Years
                  </p>
                   {explanationNum === 6 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("orb_per")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                </div>
              </Col>
              <Row>
              <Col>
                <div class="model-links">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {" "}
                            <strong> Moons That Orbit This Planet: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <Link
                            class="link"
                            to={"/moon/" + moon.index}>
                              <MDBCardImage className="img-grp" src={moon.img ?? defaultMoonImg} />
                            <p> {moon.englishName}</p>
                          </Link>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br></br>
                </div>
              </Col>
              <Col>
                <div class="model-links">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 250 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {" "}
                            <strong> Star You Might Be Interested In: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <Link
                            class="link"
                            to={"/star/" + star.index}>
                              <MDBCardImage className="img-grp" src={star.img ?? defaultStarImg}/>
                            <p> {star.star_name}</p>
                          </Link>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <br></br>
                </div>
              </Col>
              </Row>
            </Row>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default PlanetInstance;
