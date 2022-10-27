import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
  CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif"

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
function MoonList() {
  let [searchParams] = useSearchParams();
  
  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [moons, setMoons] = useState([])

  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/all_moons?page=${page}&per_page=${per_page}`,
        `http://54.172.67.234:8000/api/all_moons?page=${page}&per_page=${per_page}`,
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
      setMoons(body['bodies'])
    };
    getData();
  }, [page, per_page]);
  return (
    <Container >
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Box >
          <Grid container spacing={6} columns={20}>
          {moons.map((c) => (
              <Grid item xs={5}>
                <Card className="moon_card">
                <CardActionArea component={RouterLink} to={"/moon/" + c.index}>
                  <MDBCardImage className="img-grp" src={c.img ?? defaultMoonImg} />
                  { <CardContent>
                    <h1 class="cardTitle"> {c.englishName} </h1>
                    <h3 class="cardSub">{c.state}</h3>
                    <CardContent>
                    {/* <ListGroup>
                        <ListGroupItem>
                          <strong>Mass:</strong> {c.mass} 10^{c.massExponent} kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Density:</strong> {c.massValue} 10^n kg
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Gravity: </strong> ~{c.gravity} m.s^-2
                        </ListGroupItem>
                      </ListGroup> */}
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
            <Pagination shape="rounded" count={13} renderItem={(item) => (
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

export default MoonList;

