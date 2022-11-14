import { Container, Dropdown } from "react-bootstrap";

function StarSort() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/sort-st-rad">Radius</Dropdown.Item>
          <Dropdown.Item href="#/sort-st-mass">Mass</Dropdown.Item>
          <Dropdown.Item href="#/sort-st-age">Age</Dropdown.Item>
          <Dropdown.Item href="#/sort-st-logg">Gravity</Dropdown.Item>
          <Dropdown.Item href="#/sort_st_teff">Temperature</Dropdown.Item>
          {/* </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default StarSort;
