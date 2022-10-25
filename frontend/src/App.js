import "bootstrap/dist/css/bootstrap.min.css";

// import logo from './assets/logo.svg';
import About from "./components/About/About.js";
import Home from "./components/Splash/Home.js";
import Moons from "./components/Moons.js";
import Planets from "./components/Planets.js";
import Stars from "./components/Stars.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState } from "react";
import OurNavbar from "./components/OurNavbar.js";
import { GetMoonList } from "./components/Moons/MoonList.js";
import MoonInstance from "./components/Moons/MoonInstance.js";
import { GetStarList } from "./components/Stars/StarList.js";
import StarInstance from "./components/Stars/StarInstance.js";
import PlanetInstance from "./components/Planets/PlanetInstance.js";
// import { GetPlanetList } from "./components/Planets/PlanetList.js";

function App() {
  return (
    <>
      <OurNavbar></OurNavbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/stars" element={<Stars />} />
          {GetStarList().map((c) => (
            <Route
              path={"/star/" + c.key}
              element={<StarInstance data={c} />}
            />
          ))}
          <Route path="/moons" element={<Moons />} />
          {/* {GetMoonList().map((c) => (
            <Route
              path={"/moon/" + c.key}
              element={<MoonInstance data={c} />}
            />
          ))} */}
          <Route path="/planets" element={<Planets />} />
          {/* {GetPlanetList().map((c) => (
            <Route
              path={"/planet/" + c.key}
              element={<PlanetInstance data={c} />}
            />
          ))} */}
        </Routes>
      </div>
    </>
  );
}

export default App;

// import "bootstrap/dist/css/bootstrap.min.css";

// // import logo from './assets/logo.svg';
// import About from "./components/About/About.js";
// import Home from "./components/Splash/Home.js";
// import Planets from "./components/Planets.js";
// import Moons from "./components/Moons.js";
// import Stars from "./components/Stars.js";
// import { BrowserRouter as Routes, Route } from "react-router-dom";
// import "./App.css";
// import React from "react";
// import OurNavbar from "./components/OurNavbar.js";
// // import CompanyInfo from "./components/Companies/CompanyInfo.js";
// // import FacilityInstance from "./components/Facilities/FacilityInstance.js";
// // import CountyInstance from "./components/Counties/CountyInstance.js";
// import './index.css'

// function App() {
//   return (
//     <>
//       <OurNavbar></OurNavbar>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/planets" element={<Planets />} />
//           {/* <Route path="/facilities/:facilityId" element={<FacilityInstance />} /> */}
//           <Route path="/moons" element={<Moons />} />
//           {/* <Route path="/companies/:companyId" element={<CompanyInfo />} /> */}
//           <Route path="/stars" element={<Stars />} />
//           {/* <Route path="/counties/:countyId" element={<CountyInstance />} /> */}
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;