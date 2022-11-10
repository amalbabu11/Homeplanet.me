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
  to https://imagine.gsfc.nasa.gov/features/cosmic/earth_info.html#\
  :~:text=Its%20equatorial%20radius%20is%206378,the%20polar%20and%20\
  equatorial%20values.");

  unit_explanations.set("density", "Density is the measure of how much \
  mass fits into a space. In other words mass/volume = density. \
  In this case, it is measured in grams per cubic centimeter. \
  See more at: https://en.wikipedia.org/wiki/Density");

  unit_explanations.set("eq_temp", "Equilibrium Temperature (eq_temp) \
  not written yet");
  
  unit_explanations.set("hostname", "hostname not written yet (and I don't \
  know if this one needs an explanation)");

  return unit_explanations;
}

function displayExplanation(key){
  return <p>key</p>
}

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function PlanetInstance(props) {
  let id = useParams().planetId ?? "1"
  console.log("ID IS : " + id)

  let [planet, setPlanet] = useState([])
  let [star, setStar] = useState([])
  let [moon, setMoon] = useState([])

  // Used for explanations of units of measurement
  const [explanationNum, setExplanationNum] = useState(0);
  function handleClick (exNum) {
    setExplanationNum(exNum);
  }

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
                  <p>Click on each field to see explanation about unit of measurement</p>

                  {/* This is the information provided by get_planets() in utils.py*/}
                   <p onClick={() => handleClick(1)}> 
                  <strong>Mass:</strong> {planet.pl_masse} Earth masses
                  </p>
                   {explanationNum == 1 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("mass")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                  <p onClick={() => handleClick(2)}> 
                  <strong>Radius:</strong> {planet.pl_rade} Earth radiuses
                  </p>
                   {explanationNum == 2 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("radius")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                  <p onClick={() => handleClick(3)}> 
                  <strong>Density: </strong> {planet.pl_dens} g/cm^3
                  </p>
                   {explanationNum == 3 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("density")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                  <p onClick={() => handleClick(4)}> 
                  <strong>Equilibrium Temperature: </strong> {planet.pl_eqt} Kelvin
                  </p>
                   {explanationNum == 4 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("eq_temp")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                  <p onClick={() => handleClick(5)}> 
                  <strong>Orbits around: </strong> {planet.hostname}
                  </p>
                   {explanationNum == 5 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("hostname")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                 

                  {/* <p><strong>Mass:</strong> {planet.pl_masse} Earth masses</p>
                  <p>{" "}<strong>Radius: </strong> {planet.pl_rade} Earth radiuses{" "}</p>
                  <p>{" "}<strong>Density: </strong> {planet.pl_dens} g/cm^3{" "}</p>
                  <p>{" "}<strong>Equilibrium Temperature: </strong> {planet.pl_eqt} Kelvin{" "}</p>
                  <p>{" "}<strong>Orbits around: </strong> {planet.hostname}{" "}</p> */}
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
