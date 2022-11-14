import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
  CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
// used for Planet search
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function PlanetList() {
  let [searchParams] = useSearchParams();
  
  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let search_val = searchParams.get("search") ?? "none";
  // let sort = searchParams.get("sort")
  let [planets, setPlanets] = useState([])
  let [numInstances, setInstances] = useState(0)
  var parser = document.createElement('a');
  parser.href = window.location.href;
  console.log("parser.href = " + parser.href);
  console.log("parser.hash = " + parser.hash);
  var sort_val = parser.hash.slice(2);
  console.log("sort param = " + sort_val)

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        `https://api.homeplanet.me/api/all_planets?page=${page}&per_page=${per_page}&${sort_val}=true`,
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
      setPlanets(body['bodies'])
      setInstances(body['total_size'])
    };
    getData();
  }, [page, per_page, sort_val]);
  let total_pages = Math.ceil(numInstances/per_page)

  const [searchVal, setSearchVal] = useState("");
  return (
    <Container >
      <>
      {/* Begin Planet Search Implmentation */}
      <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", flexDirection: "column", padding: 20}}>
          <form>
          <TextField
              id="search-bar"
              className="text"
              onInput={(e) => {
                  setSearchVal(e.target.value);
                }}
                label="Search for a Planet"
                placeholder="Example: Earth"
                size="small"/>

              <IconButton type="submit" aria-label="search" href={'#/search='+searchVal}>
                  <SearchIcon style={{ fill: "blue"}}/>
              </IconButton>
          </form>

          {/* At this point, we have a nav bar and a search value, now we just need to call the api for it and display*/}
          <p>searchVal: {searchVal}</p>
        </div>
      {/* End Star Search implementation, start Moon List implmentation */}

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Box >
            <Grid container spacing={6} columns={20}>
            {planets.map((c) => (
                <Grid item xs={5}>
                  <Card className="planet_card">
                  <CardActionArea component={RouterLink} to={"/planet/" + (parseInt(c.index) + 1)}>
                    <MDBCardImage className="img-grp" src={c.img ? `//images.weserv.nl/?url=${c.img}` : defaultPlanetImg} />
                    { <CardContent>
                      <h1 class="cardTitle"> {c.pl_name} </h1>
                      <h3 class="cardSub">{c.state}</h3>
                      <CardContent>
                      </CardContent>
                    </CardContent> }
                  </CardActionArea>
                  </Card>
                </Grid>
            ))}
            </Grid>
          </Box>
        </div>
       <div style={{display: 'flex', justifyContent: 'center'}}>
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

export default PlanetList;
