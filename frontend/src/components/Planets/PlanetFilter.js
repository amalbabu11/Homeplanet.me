import { Container, Dropdown } from "react-bootstrap";

function PlanetFilter() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/filter-toocold">Too Cold</Dropdown.Item>
          <Dropdown.Item href="#/filter-habitabletemp">Habitable Range</Dropdown.Item>
          <Dropdown.Item href="#/filter-toohot">Too Hot</Dropdown.Item>
          {/* </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default PlanetFilter;