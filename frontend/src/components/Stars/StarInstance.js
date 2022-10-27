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

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
function StarInstance(props) {
  let id = useParams().starId ?? "1"
  console.log("ID IS : " + id)

  // let [searchParams] = useSearchParams();
  
  // let index = parseInt(searchParams.get("index") ?? "1")
  // let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [star, setStar] = useState([])
  let [planet, setPlanet] = useState([])
  let [moon, setMoon] = useState([])
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/star?index=${index}`,
        `https://api.homeplanet.me/api/star?index=${id}`,
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
      setStar(body[0]) 
    };
    getData();
  }, [id]);

  // Fetching the reccomended planet
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/planet?index=${index}`,
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
      // setMoon(body['moon']) 
      setPlanet(body[0]) 
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/moon?index=${index}`,
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

  let color_img = "";
  if (star.color === "YELLOW"){
    color_img = yellowStar;
  } else if (star.color === "RED"){
    color_img = redStar;
  }  else {
     color_img = blueStar;
  }

  return (
    <div className="Container">
    <React.Fragment>
       <Container className="card-container">
         <Row><h1 class="cardTitle">{star.star_name}</h1></Row>
          <Row className="Card">
             <Col>
               <hr />
               <img src={star.img} alt="star" class="star-img" width="350"/>
              <hr />
             </Col>
             <Col>
             <hr />
               <img src={color_img} alt="color" class="star-color-img" width="350"/>
               <hr />
            </Col>
             <Row>
               <Col>
                 <div class="bodyText">
                  <p>{" "}<strong>Mass: </strong> {star.st_mass} Suns{" "}</p>
                  <p>{" "}<strong>Radius: </strong> {star.st_rad} Suns{" "}</p>
                   <p>{" "}<strong>Luminosity Class: </strong> {star.st_lumclass} {" "}</p>
                   <p>{" "}<strong>Temperature: </strong> {star.st_teff} Kelvin{" "}</p>
                   <p>{" "}<strong>Surface Gravity: </strong> {star.st_logg} cgs{" "}</p>
                   <p>{" "}<strong>Age: </strong> {star.st_age} gyr (billion years){" "}</p>
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
                             <strong> Moon You Might Be Interested In: </strong>{" "}
                           </TableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {/* {props.data.moons.map((p) => ( */}
                           <Link
                             class="link"
                             to={"/moon/" + moon.index}>
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
                             <strong> Planet You Might Be Interested In: </strong>{" "}
                           </TableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {/* {props.data.planets.map((p) => ( */}
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
             </Row>
           </Row>
         </Container>
       </React.Fragment>
    </div>
  );
}

export default StarInstance;




// import React from "react";
// import { Container, Col, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// // Adapted from Electrends https://gitlab.com/dandom25/electrends/
// function StarInstance(props) {
//   return (
//     <div className="Container">
//       <React.Fragment>
//       <Container className="card-container">
//         <Row><h1 class="cardTitle">{props.data.star_name}</h1></Row>
//           <Row className="Card">
//             <Col>
//               <hr />
//               <img src={props.data.img} alt="star" class="star-img" width="350"/>
//               <hr />
//             </Col>
//             <Col>
//             <hr />
//               <img src={props.data.orbit_img} alt="orbit" class="star-orbit-img" width="350"/>
//               <hr />
//             </Col>
//             <Row>
//               <Col>
//                 <div class="bodyText">
//                   <p>{" "}<strong>Mass: </strong> {props.data.st_mass} Suns{" "}</p>
//                   <p>{" "}<strong>Radius: </strong> {props.data.st_rad} Suns{" "}</p>
//                   <p>{" "}<strong>Luminosity Class: </strong> {props.data.st_lumclass} {" "}</p>
//                   <p>{" "}<strong>Temperature: </strong> {props.data.st_teff} Kelvin{" "}</p>
//                   <p>{" "}<strong>Surface Gravity: </strong> {props.data.st_logg} cgs{" "}</p>
//                   <p>{" "}<strong>Age: </strong> {props.data.st_age} gyr (billion years){" "}</p>
//                 </div>
//               </Col>
//               </Row>
//               <Row>
//               <Col>
//                 <div class="model-links">
//                   <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 250 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>
//                             {" "}
//                             <strong> Moons You Might Be Interested In: </strong>{" "}
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {props.data.moons.map((p) => (
//                           <Link
//                             class="link"
//                             to={"/moon/" + p.index}>
//                             <p> {p.moonName}</p>
//                           </Link>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <br></br>
//                 </div>
//               </Col>
//               <Col>
//                 <div class="model-links">
//                   <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 250 }}>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>
//                             {" "}
//                             <strong> Planets You Might Be Interested In: </strong>{" "}
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {props.data.planets.map((p) => (
//                           <Link
//                             class="link"
//                             to={"/planet/" + p.index}>
//                             <p> {p.planetName}</p>
//                           </Link>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <br></br>
//                 </div>
//               </Col>
//             </Row>

//           </Row>
//         </Container>
//       </React.Fragment>
//     </div>
//   );
// }
// export default StarInstance;
