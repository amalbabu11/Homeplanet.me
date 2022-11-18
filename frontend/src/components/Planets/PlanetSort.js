import { Container, Dropdown } from "react-bootstrap";

function PlanetSort() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/sort-pl-masse">Mass</Dropdown.Item>
          <Dropdown.Item href="#/sort-pl-rade">Radius</Dropdown.Item>
          <Dropdown.Item href="#/sort-pl-dens">Density</Dropdown.Item>
          <Dropdown.Item href="#/sort-pl-orbper">Orbital Period</Dropdown.Item>
          <Dropdown.Item href="#/sort-pl-eqt">Equilibrium Temperature</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default PlanetSort;
