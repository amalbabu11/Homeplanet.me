import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
  CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function PlanetList() {
  let [searchParams] = useSearchParams();
  
  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [planets, setPlanets] = useState([])

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/all_planets?page=${page}&per_page=${per_page}`,
        // `http://54.172.67.234:8000/api/all_planets?page=${page}&per_page=${per_page}`,
        // https://homeplanet.me/api/all_planets?page=1&per_page=15
        `https://api.homeplanet.me/api/all_planets?page=${page}&per_page=${per_page}`,
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
    };
    getData();
  }, [page, per_page]);
  return (
    <Container >
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Box >
          <Grid container spacing={6} columns={20}>
          {planets.map((c) => (
              <Grid item xs={5}>
                <Card className="planet_card">
                <CardActionArea component={RouterLink} to={"/planet/" + (parseInt(c.index) + 1)}>
                  <MDBCardImage className="img-grp" src={c.img ?? defaultPlanetImg} />
                  { <CardContent>
                    <h1 class="cardTitle"> {c.pl_name} </h1>
                    <h3 class="cardSub">{c.state}</h3>
                    <CardContent>
                    <ListGroup>
                        {/* <ListGroupItem>
                          <strong>Mass:</strong> {c.pl_masse} 
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Radius:</strong> {c.pl_rade} 10^n kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Density: </strong> ~{c.pl_dens}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Eqt: </strong> ~{c.pl_eqt}
                        </ListGroupItem> */}
                      </ListGroup>
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
            <Pagination shape="rounded" count={17} renderItem={(item) => (
              <PaginationItem
              component={RouterLink}
              to={`?page=${item.page}&per_page=${per_page}`}
              {...item}
              />
              )}
              />
          </Stack>
      </div>
      </>
      </Container>
  );
}

export default PlanetList;
