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
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
import defaultPlanetOrbit from "../../assets/planets/defaultPlanetOrbit.png"
// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function PlanetInstance(props) {
  let id = useParams().planetId ?? "1"
  console.log("ID IS : " + id)

  let [planet, setPlanet] = useState([])
  let [star, setStar] = useState([])
  let [moon, setMoon] = useState([])

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
              <Col>
                <div class="bodyText">
                  {/*This is the information provided by get_planets() in utils.py*/}
                  <p>{" "}<strong>Mass:</strong> {planet.pl_masse} Earth masses{" "}</p>
                  <p>{" "}<strong>Radius: </strong> {planet.pl_rade} Earth radii{" "}</p>
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