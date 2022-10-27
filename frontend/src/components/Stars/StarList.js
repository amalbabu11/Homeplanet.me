import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
  CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import defaultStarImg from "../../assets/stars/defaultStarImg.png"

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2


function StarList() {
  let [searchParams] = useSearchParams();
  
  let page = parseInt(searchParams.get("page") ?? "1")
  let per_page = parseInt(searchParams.get("per_page") ?? "12")
  let [stars, setStars] = useState([])
  useEffect(() => {
    const getData = async () => {
      let response = await fetch (
        // `https://homeplanet.me/api/all_stars?page=${page}&per_page=${per_page}`,
        `http://54.172.67.234:8000/api/all_stars?page=${page}&per_page=${per_page}`,
        // https://homeplanet.me/api/all_stars?page=1&per_page=15
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
    };
    getData();
  }, [page, per_page]);

  return (
    <Container >
      <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Box >
          <Grid container spacing={6} columns={20}>
          {stars.map((c) => (  // same thing as: for c in stars
              <Grid item xs={5}>
                <Card className="star_card">
                <CardActionArea component={RouterLink} to={"/star/" + c.index}>
                  <MDBCardImage className="img-grp" src={c.img ?? defaultStarImg}/>
                  { <CardContent>
                    <h1 class="cardTitle"> {c.star_name} </h1>
                    <h3 class="cardSub">{c.state}</h3>
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
            <Pagination shape="rounded" count={25} renderItem={(item) => (
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

export default StarList;
