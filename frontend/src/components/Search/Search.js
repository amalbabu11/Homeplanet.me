import { Box, Grid, CardActionArea, Stack, Pagination, PaginationItem, Card, 
    CardContent, CardHeader, CardMedia, Typography, } from "@mui/material";
  import { Link as RouterLink, useSearchParams } from "react-router-dom";
  import React, { useEffect, useState } from "react";
  import { MDBCardTitle, MDBCardImage, } from "mdb-react-ui-kit";
  import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
  import TextField from "@mui/material/TextField";
  import defaultPlanetImg from "../../assets/planets/defaultPlanetImg.bmp"
  import defaultMoonImg from "../../assets/moons/defaultMoonImg.gif";
  import defaultStarImg from "../../assets/stars/defaultStarImg.png"
  import Highlighter from "react-highlight-words";

  // Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
  function Search() {
    let [searchParams] = useSearchParams();
    
    let page = parseInt(searchParams.get("page") ?? "1")
    let per_page = parseInt(searchParams.get("per_page") ?? "4")
    let [planets, setPlanets] = useState([])
    let [moons, setMoons] = useState([])
    let [stars, setStars] = useState([])
    const [search_val, setSearchVal] = useState("");
  
    useEffect(() => {
      // credit to AnimalWatch.me
      var api_url_planet = `https://api.homeplanet.me/api/all_planets?page=${page}&per_page=${per_page}`;
      var api_url_moon = `https://api.homeplanet.me/api/all_moons?page=${page}&per_page=${per_page}`;
      var api_url_star = `https://api.homeplanet.me/api/all_stars?page=${page}&per_page=${per_page}`;
      if (search_val !== "" && search_val !== null){
        api_url_planet += `&search=` + search_val;
        api_url_moon += `&search=` + search_val;
        api_url_star += `&search=` + search_val;
      }
      const getData = async () => {
        let response_planet = await fetch (
          api_url_planet,
          { mode: 'cors', }
        );
        let response_moon = await fetch (
            api_url_moon,
            { mode: 'cors', }
          );
        let response_star = await fetch (
            api_url_star,
            { mode: 'cors', }
          );
        let body_planet = []
        body_planet = await response_planet.json()
        setPlanets(body_planet['bodies'])
        let body_moon = []
        body_moon = await response_moon.json()
        setMoons(body_moon['bodies'])
        let body_star = []
        body_star = await response_star.json()
        setStars(body_star['bodies'])
      };
      getData();
    }, [page, per_page, search_val]);
  
    return (
      <Container >
        <>
        <h1>Search</h1>
        <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", flexDirection: "column", padding: 20}}>
            <form>
            <TextField
                id="search-bar"
                className="text"
                onInput={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  label="Search"
                  placeholder="Example: Phobos"
                  size="small"/>
            </form>
          </div>  
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Box >
                <h2>Planet Results</h2>
                <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" justifyContent="center" flexWrap="wrap" gap="70px">
          {planets.map((c) => (
            <Card className="planet_card">
                  <CardActionArea component={RouterLink} to={"/planet/" + (parseInt(c.index))}>
                    <MDBCardImage className="img-grp" src={c.img ? `//images.weserv.nl/?url=${c.img}` : defaultPlanetImg} />
                    { <CardContent>
                      <h1 class="cardTitle"> <Highlighter searchWords={[search_val]} textToHighlight={c.pl_name}/> </h1>
                      <h3 class="cardSub">{c.state}</h3>
                      <CardContent>
                      </CardContent>
                    </CardContent> }
                  </CardActionArea>
                  </Card>
          ))}
              </Stack>
            </div>
          </Container>
            </Box>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Box >
                <h2>Moon Results</h2>
                <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" justifyContent="center" flexWrap="wrap" gap="70px">
          {moons.map((c) => (
            <Card className="moon_card">
            <CardActionArea component={RouterLink} to={"/moon/" + c.index}>
              <MDBCardImage className="img-grp" src={c.img ?? defaultMoonImg} />
              { <CardContent>
                <h1 class="cardTitle"> <Highlighter searchWords={[search_val]} textToHighlight={c.englishName}/> </h1>
                <h3 class="cardSub">{c.state}</h3>
              </CardContent> }
            </CardActionArea>
            </Card>
          ))}
              </Stack>
            </div>
          </Container>
            </Box>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Box >
                <h2>Star Results</h2>
                <Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" justifyContent="center" flexWrap="wrap" gap="70px">
          {stars.map((c) => (
              <Card className="star_card">
              <CardActionArea component={RouterLink} to={"/star/" + (parseInt(c.index))}>
                <MDBCardImage className="img-grp" src={c.img ?? defaultStarImg}/>
                { <CardContent>
                  <h1 class="cardTitle"> <Highlighter searchWords={[search_val]} textToHighlight={c.star_name}/> </h1>
                  <h3 class="cardSub">{c.state}</h3>
                </CardContent> }
              </CardActionArea>
              </Card>
          ))}
              </Stack>
            </div>
          </Container>
            </Box>
          </div>
        </>
        </Container>
    );
  }
  
  export default Search;
  