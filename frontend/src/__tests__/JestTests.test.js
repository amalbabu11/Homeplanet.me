import React from "react";
import BrowserRouter from "react-router-dom";
// import OurNavbar from "../components/OurNavbar";

// Credit: https://gitlab.com/JohnPowow/animalwatch/-/blob/main/frontend/src/__tests__/JestTests.test.js

describe("Overall rendering tests", () => {
    // Test 1
    test("App renders without crashing", () => {
      <BrowserRouter>
        render(<App />);
        expect(screen.getByLabel('OurNavbar')).toBeInTheDocument();
      </BrowserRouter>;
    });
});