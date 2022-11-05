import { Container, Dropdown } from "react-bootstrap";

function PlanetSort() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/sort-mass">Mass</Dropdown.Item>
          <Dropdown.Item href="#/sort-radius">Radius</Dropdown.Item>
          <Dropdown.Item href="#/sort-density">Density</Dropdown.Item>
          <Dropdown.Item href="#/sort-eqtmp">Equilibrium Temperature</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default PlanetSort;
