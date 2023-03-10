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
import defaultStarImg from "../../assets/stars/defaultStarImg.png"
import redStar from "../../assets/stars/red-star.jpeg"
import blueStar from "../../assets/stars/blue-star.jpeg"
import yellowStar from "../../assets/stars/yellow-star.png"
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif";

// cleans up code by relocating high quantity String text. returns a map of explanations
function fillExplanations() {
  const unit_explanations = new Map();

  unit_explanations.set("mass", "This unit of measurement compares this star \
  to the mass of our sun. 0.5 Suns would mean that it has half the mass of \
  our sun. The mass of our sun is 1.9885 * 10^30 kilograms according to \
  https://en.wikipedia.org/wiki/Sun#cite_note-nssdc-5. \
  This mass number can be thought of as moving the decimal place of the first \
  number to the right a number of times equal to the exponent number. For \
  example: 1.15 * 10^3 => 1150.00");

  unit_explanations.set("radius", "This unit of measurement compares this star \
  to the radius of our sun. 0.5 Suns would mean that it has half the radius of \
  our sun. The radius of our sun is approximately 695,000 kilometers \
  according to https://en.wikipedia.org/wiki/Sun#cite_note-nssdc-5.");

  unit_explanations.set("luminosity", "The luminosity of a star is the \
  measure of how much electromagnetic radiation is emmitted in total from \
  the star. Stars are put into different classifications based on their \
  electromagnetic radiation output. Put simply, electromagnetic radition is \
  light - although there is much more too it than that. For more information \
  see: https://en.wikipedia.org/wiki/Stellar_classification and \
  https://en.wikipedia.org/wiki/Luminosity");

  unit_explanations.set("temperature", "A measure of how hot a star is in \
  Kelvin. For more information see: https://en.wikipedia.org/wiki/Kelvin");
  
  unit_explanations.set("gravity", "Surface gravity is very similar to other \
  explanations of gravity. However, instead of measureing in \
  meters/(seconds)??, it is measured in (centimeters * grams)/(seconds)??. \
  Either way, surface gravity is a measure of the acceleration downwards that \
  an object would experience at the surface of the star. For more \
  information see: https://en.wikipedia.org/wiki/\
  Centimetre%E2%80%93gram%E2%80%93second_system_of_units");
  
  unit_explanations.set("age", "The age of the star. Gyr measures billions of \
  years, so 1 gyr is 1 billion years old.");

  return unit_explanations;
}

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function StarInstance(props) {
  let id = useParams().starId ?? "1"
  console.log("ID IS : " + id)

  // Used for explanations of units of measurement. records which button is pressed
  const [explanationNum, setExplanationNum] = useState(0);
  function handleClick (exNum) {
    setExplanationNum(exNum);
  }

  let [star, setStar] = useState([])
  let [planet, setPlanet] = useState([])
  let [moon, setMoon] = useState([])
  // fetch data about this star
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

  // fetch recommended planet and moon based on this star
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://api.homeplanet.me/api/recommend/star?star=${id}`, 
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
      setMoon(body["moon"][0]); 
      setPlanet(body["planet"][0]);
    };
    getData();
  }, [id]);

  let color_img = "";
  if (star.color === "YELLOW"){
    color_img = yellowStar;
  } else if (star.color === "RED"){
    color_img = redStar;
  }  else {
     color_img = blueStar;
  }

  // unit_explanations is a map of all explanations
  const unit_explanations = fillExplanations();

  return (
    <div className="Container">
    <React.Fragment>
       <Container className="card-container">
         <Row><h1 class="cardTitle">{star.star_name}</h1></Row>
          <Row className="Card">
             <Col>
               <hr />
               <img src={star.img ?? defaultStarImg} alt="star" class="star-img" width="350"/>
              <hr />
             </Col>
             <Col>
             <hr />
               <img src={color_img} alt="color" class="star-color-img" width="350"/>
               <hr />
            </Col>
             <Row>
               <Col align="center">
                 <div class="bodyText">

                 <p>Click on each bolded attribute below to see more information</p>
                 <p onClick={() => handleClick(1)}> 
                 <strong>Mass: </strong> {star.st_mass ?? "Unknown"} Suns
                  </p>
                   {explanationNum === 1 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("mass")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                 <p onClick={() => handleClick(2)}> 
                 <strong>Radius: </strong> {star.st_rad ?? "Unknown"} Suns
                  </p>
                   {explanationNum === 2 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("radius")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                 <p onClick={() => handleClick(3)}> 
                 <strong>Luminosity Class: </strong> {star.st_lumclass ?? "Unknown"}
                  </p>
                   {explanationNum === 3 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("luminosity")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                 <p onClick={() => handleClick(4)}> 
                 <strong>Temperature: </strong> {star.st_teff ?? "Unknown"} Kelvin
                  </p>
                   {explanationNum === 4 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("temperature")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                 <p onClick={() => handleClick(5)}> 
                 <strong>Surface Gravity: </strong> {star.st_logg ?? "Unknown"} cgs
                  </p>
                   {explanationNum === 5 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("gravity")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}
                  
                 <p onClick={() => handleClick(6)}> 
                 <strong>Age: </strong> {star.st_age ?? "Unknown"} gyr
                  </p>
                   {explanationNum === 6 && (<div>
                    <TableContainer component={Paper} sx={{maxWidth:0.5}} justify="center">
                      <TableCell>
                        <p>{unit_explanations.get("age")}</p>
                      </TableCell>
                    </TableContainer>
                  </div>)}

                 </div>
               </Col>
               </Row>
               <Row>
               <Col>
                 <div class="model-links">
                  <TableContainer component={Paper}>
                     <Table sx={{ minWidth: 250 }}>
                      <TableHead>
                         <TableRow>
                           <TableCell>
                             {" "}
                             <strong> Moon With Same Percentile Mass: </strong>{" "}
                           </TableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {/* {props.data.moons.map((p) => ( */}
                           <Link
                             class="link"
                             to={"/moon/" + moon.index}>
                              <MDBCardImage className="img-grp" src={moon.img ?? defaultMoonImg} />
                             <p> {moon.englishName}</p>
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
                             <strong> Planet That Orbits This Star: </strong>{" "}
                           </TableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {/* {props.data.planets.map((p) => ( */}
                           <Link
                             class="link"
                             to={"/planet/" + planet.index}>
                            <MDBCardImage className="img-grp" src={planet.img ? `//images.weserv.nl/?url=${planet.img}` : defaultPlanetImg} />
                             <p> {planet.pl_name}</p>
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
         </Container>
       </React.Fragment>
    </div>
  );
}

export default StarInstance;
