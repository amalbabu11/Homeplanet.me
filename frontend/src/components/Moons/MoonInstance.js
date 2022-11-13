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

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function MoonInstance(props) {
  let id = useParams().moonId ?? "1"
  console.log("ID IS : " + id)
  let [moon, setMoon] = useState([])
  let [star, setStar] = useState([])
  let [planet, setPlanet] = useState([])

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
              <Col>
                <div class="bodyText">
                  <p>{" "}<strong>Mass:</strong> {moon.massValue} 10^{moon.massExponent} kg{" "}</p>
                  <p>{" "}<strong>Density:</strong> {moon.density} 10^n g/km^3{" "}</p>
                  <p>{" "}<strong>Gravity:</strong> {moon.gravity} m.s^-2{" "}</p>
                  <p>{" "}<strong>Volume:</strong> {moon.volValue} 10^{moon.volExponent} km^3{" "}</p>
                  <p>{" "}<strong>Discovered In:</strong> {moon.discoveryDate} AD{" "}</p>
                  <p>{" "}<strong>Habitable? </strong> {moon.is_habitable ?? "No"}{" "}</p>
                  <p>{" "}<strong>Around Planet: </strong> {moon.aroundPlanet ?? "Unknown"}{" "}</p>
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
