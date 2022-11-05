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
// import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif"
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
import { CardActionArea, CardContent } from "@mui/material";

// testing import for user story #15 and 45
import Box from "@mui/material/Box"; 
import Card from "@mui/material/Card"
import ExplanationBox from "./ExplanationBox.js";

// cleans up PlanetInstance by removing excessive String text. returns a map of explanations
function fillExplanations() {
  const unit_explanations = new Map();
  
  unit_explanations.set("mass", "Earth masses are how many times you would need \
  to multiply the mass of the Earth in order to reach the mass of this \
  planet. One Earth mass \
  is: 5.972 x 10^24 kg according to https://en.wikipedia.org/wiki/Earth");

  unit_explanations.set("radius", "Earth radiuses are how many times you would \
  need to multiply the radius of the Earth in order to reach the radius of \
  this planet. One Earth radius is about: 6,378 km according \
  to https://imagine.gsfc.nasa.gov/features/cosmic/earth_info.html#:~:text=Its%20equatorial%20radius%20is%206378,the%20polar%20and%20equatorial%20values.");

  return unit_explanations;
}

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function PlanetInstance(props) {
  let id = useParams().planetId ?? "1"
  console.log("ID IS : " + id)

  let [planet, setPlanet] = useState([])
  let [star, setStar] = useState([])
  let [moon, setMoon] = useState([])

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

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

    // Fetching the reccomended moon based on this planet
    useEffect(() => {
      const getData = async () => {
        let response = await fetch (
          `https://api.homeplanet.me/api/moon?index=${id}`,
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
        setMoon(body[0]) 
      };
      getData();
    }, [id]);

    // Fetching the reccomended star based on this planet
    useEffect(() => {
      const getData = async () => {
        let response = await fetch (
          `https://api.homeplanet.me/api/star?index=${id}`,
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
        setStar(body[0]) 
      };
      getData();
    }, [id]);

    // // let planet_img = `//images.weserv.nl/?url=${planet.img}`
    // <MDBCardImage className="img-grp" src={c.img ? `//images.weserv.nl/?url=${c.img}` : defaultPlanetImg} />
    // let planet_img = 

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
              <embed type="text/html" src={planet.orbit_img} width="500" height="200"></embed>
              <hr />
              </Col>
            <Row>
              <Col align="center">
                <div class="bodyText">
                  {/*This is the information provided by get_planets() in utils.py*/}
                   <p onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> 
                  <strong>Mass:</strong> {planet.pl_masse} Earth masses
                  </p>
                   {isHovering && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <p>{unit_explanations.get("mass")}</p>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </div>)}
                  <p>{" "}<strong>Radius: </strong> {planet.pl_rade} Earth radiuses{" "}</p>
                  <p>{" "}<strong>Density: </strong> {planet.pl_dens} g/cm^3{" "}</p>
                  <p>{" "}<strong>Equilibrium Temperature: </strong> {planet.pl_eqt} Kelvin{" "}</p>
                  <p>{" "}<strong>Orbits around: </strong> {planet.hostname}{" "}</p>
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
                            <strong> Stars You Might Be Interested In: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <Link
                            class="link"
                            to={"/star/" + star.index}>
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
