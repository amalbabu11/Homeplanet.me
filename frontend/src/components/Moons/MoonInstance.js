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
import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif"
import moonOrbit from "../../assets/moons/MoonOrbit.jpeg"

// cleans up code by relocating high quantity String text. returns a map of explanations
function fillExplanations() {
  const unit_explanations = new Map();
  
  unit_explanations.set("mass", "A kilogram is approximately 2.205 pounds. \
  The total mass can be thought of as moving the decimal place of the first \
  number to the right a number of times equal to the exponent number. For \
  example: 1.15 * 10^3 => 1150.00");

  unit_explanations.set("density", "Density is the measure of how much \
  mass fits into a space. In other words, mass/volume = density. \
  In this case, it is measured in grams per cubic centimeter. \
  See more at: https://en.wikipedia.org/wiki/Density");
  
  unit_explanations.set("gravity", "Measured in meters/(second^2). Speed \
  (or velocity) is measured in meters per second. Gravity is a \
  measure of how something will accelerate - or change speeds over time. \
  As acceleration is the change in speed over time, this is measured as \
  (meters/second)/second, or m/s^2. For more information see:\
  https://en.wikipedia.org/wiki/Gravity_of_Earth");

  unit_explanations.set("volume", "Volume is the measure of how much space \
  something will fill. In this case, it is measured in cubic kilometers \
  The total volume can be thought of as moving the decimal place of the first \
  number to the right a number of times equal to the exponent number. For \
  example: 1.15 * 10^3 => 1150.00");
  
  unit_explanations.set("habitability", "This field tells us if it would be \
  theoretically possible for life to exist on this celestial body.");
  
  unit_explanations.set("host_planet", "The host planet is just the planet \
  that this moon orbits around.");

  return unit_explanations;
}

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function MoonInstance(props) {
  let id = useParams().moonId ?? "1"
  console.log("ID IS : " + id)
  let [moon, setMoon] = useState([])
  let [star, setStar] = useState([])
  let [planet, setPlanet] = useState([])

  // Used for explanations of units of measurement. records which button is pressed
  const [explanationNum, setExplanationNum] = useState(0);
  function handleClick (exNum) {
    setExplanationNum(exNum);
  }

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

  // Fetching the reccomended star based on this moon
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

  // Fetching the reccomended planet based on this moon
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

  // unit_explanations is a map of all explanations
  const unit_explanations = fillExplanations();

  return (
    <div className="Container">
      <React.Fragment>
        <Container className="card-container">
        <Row><h1 class="cardTitle">{moon.englishName}</h1></Row>
          <Row className="Card">
            <Col>
              <hr />
              <img src={moon.img ?? defaultMoonImg} alt="moon" class="moon-img" width="350"/>
              <hr />
            </Col>
            <Col>
            <hr />
              <img src={moonOrbit} alt="orbit" class="moon-orbit-img" width="350"/>
              <hr />
            </Col>
            <Row>
              <Col align="center">
                <div class="bodyText">

                <p onClick={() => handleClick(1)}> 
                    <strong>Mass:</strong> {moon.massValue ?? "Unknown"} * 10^{moon.massExponent} kg
                  </p>
                   {explanationNum === 1 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("mass")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                <p onClick={() => handleClick(2)}> 
                    <strong>Density:</strong> {moon.density ?? "Unknown"} g/cm^3
                  </p>
                   {explanationNum === 2 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("density")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                <p onClick={() => handleClick(3)}> 
                  <strong>Gravity:</strong> {moon.gravity ?? "Unknown"} * m/s^2
                  </p>
                   {explanationNum === 3 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("gravity")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                <p onClick={() => handleClick(4)}> 
                  <strong>Volume: </strong> 
                  {moon.volValue != 0 && moon.volValue} 
                  {moon.volValue == 0 && "Unknown "} 
                  * 10^{moon.volExponent} km^3
                  </p>
                   {explanationNum === 4 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("volume")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                <p onClick={() => handleClick(5)}> 
                  <strong>Habitable? </strong> {moon.is_habitable ?? "No"}
                  </p>
                   {explanationNum === 5 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("habitability")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                <p onClick={() => handleClick(6)}> 
                  <strong>Host planet: </strong> {moon.aroundPlanet ?? "Unknown"}
                  </p>
                   {explanationNum === 6 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("host_planet")}</p>
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
                            <strong> Planet This Moon Orbits: </strong>{" "}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <Link
                            class="link"
                            to={"/planet/" + planet.index}>
                            <p> {planet.pl_name}</p>
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

export default MoonInstance;
