import { Container, Dropdown } from "react-bootstrap";

function StarSort() {
  return (
    <Container>
      <Dropdown class="dropdownStyle">
        <Dropdown.Toggle variant="success" id="dropdown-sort">
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/404">Not Implemented 1</Dropdown.Item>
          <Dropdown.Item href="#/404">Not Implemented 2</Dropdown.Item>

          {/* </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default StarSort;
