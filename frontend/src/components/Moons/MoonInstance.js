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

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function MoonInstance(props) {
  let id = useParams().moonId ?? "1"
  console.log("ID IS : " + id)
  // let index = useParams().moonId ?? "1"
  // console.log("ID IS : " + index)
  // console.log("SEARCH PARAMS")
  // console.log(searchParams)
  // let [searchParams] = useSearchParams();
  // let index = parseInt(searchParams.get("index") ?? "1")
  // let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [moon, setMoon] = useState([])
  let [star, setStar] = useState([])
  let [planet, setPlanet] = useState([])

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/moon?index=${index}`,
        // `https://homeplanet.me/api/moon?index=${index}`, // TODO: comment this back in
        `http://54.172.67.234:8000/api/moon?index=${id}`, // TODO: comment this out
        // http://54.172.67.234:800//api/all_stars?page=1&per_page=15
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
        // `https://homeplanet.me/api/star?index=${index}`,
        `http://54.172.67.234:8000/api/star?${id}`,
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
<<<<<<< Updated upstream
        `https://api.homeplanet.me/api/recommand/moon?moon=${moon_name}`,
=======
        // `https://homeplanet.me/api/planet?index=${index}`,
        `http://54.172.67.234:8000/api/planet?${id}`,
>>>>>>> Stashed changes
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
              <img src={moon.orbit_img} alt="orbit" class="moon-orbit-img" width="350"/>
              <hr />
            </Col>
            <Row>
              <Col>
                <div class="bodyText">
                  <p>{" "}<strong>Mass:</strong> {moon.massValue} 10^{moon.massExponent} kg{" "}</p>
                  <p>{" "}<strong>Density:</strong> {moon.density} 10^n g/km^3{" "}</p>
                  <p>{" "}<strong>Gravity:</strong> {moon.gravity} m.s^-2{" "}</p>
                  <p>{" "}<strong>Volume:</strong> {moon.volValue} 10^{moon.volExponent} km^3{" "}</p>
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
                        {/* {planet.map((p) => ( */}
                          <Link
                            class="link"
                            to={"/planet/" + planet.index}>
                            <p> {planet.pl_name}</p>
                          </Link>
                        {/* ))} */}
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
                        {/* {star.map((p) => ( */}
                          <Link
                            class="link"
                            to={"/star/" + star.index}>
                            <p> {star.star_name}</p>
                          </Link>
                        {/* ))} */}
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
