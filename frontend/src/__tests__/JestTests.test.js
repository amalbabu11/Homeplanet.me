import * as React from 'react'
import BrowserRouter from "react-router-dom";
import App from "../App";
import Stars from "../components/Stars";
import Moons from "../components/Moons";
import Planets from "../components/Planets";
import StarInstance from "../components/Stars/StarInstance";
import MoonInstance from "../components/Moons/MoonInstance";
import PlanetInstance from "../components/Planets/PlanetInstance";
import About from "../components/About/About";
import Home from "../components/Splash/Home";
 
// Credit: https://gitlab.com/JohnPowow/animalwatch/-/blob/main/frontend/src/__tests__/JestTests.test.js

describe("Overall rendering tests", () => {
    // Test 1
    test("App renders without crashing", () => {
      <BrowserRouter>
        render(<App />);
        expect(screen.getByLabel('OurNavbar')).toBeInTheDocument();
      </BrowserRouter>;
    });

    // Test 2
    test("About Page renders without crashing", () => {
        <BrowserRouter>
        render(<About />);
        expect(screen.getByText('About')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 3
    test("Home Page renders without crashing", () => {
        <BrowserRouter>
        render(<Home />);
        expect(screen.getByText('HomePlanet')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 4
    test("Moons Page renders without crashing", () => {
        <BrowserRouter>
        render(<Moons />);
        expect(screen.getByText('Moons')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 5
    test("Planets Page renders without crashing", () => {
        <BrowserRouter>
        render(<Planets />);
        expect(screen.getByText('Planets')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 6
    test("Stars Page renders without crashing", () => {
        <BrowserRouter>
        render(<Stars />);
        expect(screen.getByText('Stars')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 7
    test("Moon Instance Page renders without crashing", () => {
        <BrowserRouter>
        render(<MoonInstance />);
        expect(screen.getByText('Mass')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 8
    test("Star Instance Page renders without crashing", () => {
        <BrowserRouter>
        render(<PlanetInstance />);
        expect(screen.getByText('Mass')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 9
    test("Star Instance Page renders without crashing", () => {
        <BrowserRouter>
        render(<StarInstance />);
        expect(screen.getByText('Mass')).toBeInTheDocument();
        </BrowserRouter>;
    });

    // Test 10
    test("NavBar renders without crashing", () => {
        <BrowserRouter>
        render(<App />);
        expect(screen.getByLabel('About Us')).toBeInTheDocument();
        </BrowserRouter>;
    });

});