import {
  Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card,
  CardContent, CardHeader, CardMedia, Typography, Table,
} from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, Form, ListGroupItem } from "react-bootstrap";
import defaultStarImg from "../../assets/stars/defaultStarImg.png"
// used for Star search
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Highlighter from "react-highlight-words";

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2

function StarList() {
  let [searchParams] = useSearchParams();

  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [stars, setStars] = useState([])
  let [numInstances, setInstances] = useState(0)
  var parser = document.createElement('a');
  parser.href = window.location.href;
  console.log("parser.href = " + parser.href);
  console.log("parser.hash = " + parser.hash);
  const [search_val, setSearchVal] = useState("");
  const [sort_val, setSortVal] = useState("");
  const [filter_val, setFilterVal] = useState("");

  useEffect(() => {
    // credit to AnimalWatch.me
    var api_url = `https://api.homeplanet.me/api/all_stars?page=${page}&per_page=${per_page}`;
    if (sort_val !== "" && sort_val !== null) {
      api_url += `&` + sort_val + `=true`;
    }
    if (search_val !== "" && search_val !== null) {
      api_url += `&search=` + search_val;
    }
    if (filter_val !== "" && filter_val !== null) {
      api_url += `&filter=` + filter_val;
    }

    const getData = async () => {
      let response = await fetch(
        api_url,
        { mode: 'cors', }
      );
      console.log("RESPONSE")
      console.log(response)
      console.log(response.text)
      console.log(response.status)
      console.log(JSON.stringify(response))
      let body = []
      body = await response.json()
      console.log("BODY")
      console.log(JSON.stringify(body))
      setStars(body['bodies'])
      setInstances(body['total_size'])
    };
    getData();
  }, [page, per_page, sort_val, search_val, filter_val]);
  let total_pages = Math.ceil(numInstances / per_page)

  return (
    <Container >
      <>
        {/* Begin Star Search Implmentation */}
        <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", flexDirection: "column", padding: 20 }}>
          <form>
            <TextField
              id="search-bar"
              className="text"
              onInput={(e) => {
                setSearchVal(e.target.value);
              }}
              label="Search for a Star"
              placeholder="Example: alf cen A"
              size="small" />
          </form>
        </div>

        {/* sort button implementation */}
        <Row>
          <Form.Group as={Col} controlId="formSort">
            <Form.Label><h2>Sort by</h2></Form.Label>
            <Form.Select type="sort" onChange={(e) => setSortVal(e.target.value)}>
              <option value="">-</option>
              <option value="sort-st-rad">Radius</option>
              <option value="sort-st-age">Age</option>
              <option value="sort-st-logg">Gravity</option>
              <option value="sort_st_teff">Temperature</option>
            </Form.Select>
          </Form.Group>

          {/* filter button implementation */}
          <Form.Group as={Col} controlId="formFilter">
            <Form.Label><h2>Filter by</h2></Form.Label>
            <Form.Select type="sort" onChange={(e) => setFilterVal(e.target.value)}>
              <option value="">-</option>
              <option value="mainseq">MAINSEQ</option>
              <option value="giant">GIANT</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <p></p>

        <Container>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row" justifyContent="center" flexWrap="wrap" gap="70px">
              {stars.map((c) => (
                <Card className="star_card">
                  <CardActionArea component={RouterLink} to={"/star/" + (parseInt(c.index))}>
                    <MDBCardImage className="img-grp" src={c.img ?? defaultStarImg} />
                    {<CardContent>
                      <h1 class="cardTitle"> <Highlighter searchWords={[search_val]} textToHighlight={c.star_name} /> </h1>
                      <h3 class="cardSub">{c.state}</h3>
                    </CardContent>}
                  </CardActionArea>
                </Card>
              ))}
            </Stack>
          </div>
          <p></p>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Stack>
            <Pagination shape="rounded" count={total_pages} renderItem={(item) => (
              <PaginationItem
                component={RouterLink}
                to={`?page=${item.page}&per_page=${per_page}`}
                {...item}
              />
            )}
            />
          </Stack>
        </div>
        <Row>
          <h3 className="text-center mt-5">
            Displaying {per_page} out of {numInstances} Instances
          </h3>
        </Row>
        <Row>
          <h3 className="text-center mt-5">
            Displaying {page} out of {total_pages} Pages
          </h3>
        </Row>

      </>
    </Container>
  );
}

export default StarList;
