import { Container, Dropdown } from "react-bootstrap";

function StarFilter() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/filter-mainseq">MAINSEQ</Dropdown.Item>
          <Dropdown.Item href="#/filter-giant">GIANT</Dropdown.Item>
          {/* </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default StarFilter;