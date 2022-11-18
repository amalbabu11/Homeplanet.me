import { Container, Dropdown } from "react-bootstrap";

function MoonSort() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/sort-mass-exponent">Mass</Dropdown.Item>
          <Dropdown.Item href="#/sort-density">Density</Dropdown.Item>
          <Dropdown.Item href="#/sort-gravity">Gravity</Dropdown.Item>
          <Dropdown.Item href="#/sort-vol-exponent">Volume</Dropdown.Item>
          <Dropdown.Item href="#/sort-discovery-date">Discovery Date</Dropdown.Item>
          {/* </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default MoonSort;
