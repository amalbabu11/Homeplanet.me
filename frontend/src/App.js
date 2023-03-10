import About from "./components/About/About.js";
import Search from "./components/Search/Search.js";
import Home from "./components/Splash/Home.js";
import Moons from "./components/Moons.js";
import Planets from "./components/Planets.js";
import Stars from "./components/Stars.js";
import Visualizations from "./components/OurVisualizations.js";
import ProviderVisualizations from "./components/ProviderVisualizations.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState } from "react";
import OurNavbar from "./components/OurNavbar.js";
import { GetMoonList } from "./components/Moons/MoonList.js";
import MoonInstance from "./components/Moons/MoonInstance.js";
import StarInstance from "./components/Stars/StarInstance.js";
import PlanetInstance from "./components/Planets/PlanetInstance.js";
// import GetStarList from "./components/Stars/StarList.js"

function App() {
  // document.body.style = 'background: #ADA7C9;';
  return (
    <>
      <OurNavbar></OurNavbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/moons" element={<Moons />} />
          <Route path="/stars" element={<Stars />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/providervisualizations" element={<ProviderVisualizations />} />
          <Route path="/planet/:planetId" element={<PlanetInstance />} />
          <Route path="/moon/:moonId" element={<MoonInstance />} />
          <Route path="/star/:starId" element={<StarInstance />} />
        </Routes>
      </div>
    </>
  );
}

export default App;