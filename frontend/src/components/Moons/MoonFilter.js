import { Container, Dropdown } from "react-bootstrap";

function MoonFilter() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/filter-earth">Earth</Dropdown.Item>
          <Dropdown.Item href="#/filter-mars">Mars</Dropdown.Item>
          <Dropdown.Item href="#/filter-jupiter">Jupiter</Dropdown.Item>
          <Dropdown.Item href="#/filter-saturn">Saturn</Dropdown.Item>
          <Dropdown.Item href="#/filter-uranus">Uranus</Dropdown.Item>
          <Dropdown.Item href="#/filter-neptune">Neptune</Dropdown.Item>
          <Dropdown.Item href="#/filter-pluto">Pluto</Dropdown.Item>
          {/* </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default MoonFilter;