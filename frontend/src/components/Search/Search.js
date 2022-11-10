import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SearchCard from "./SearchCard";
import "../../styles/Search.css";

const SEARCH_PATHS = ["moons", "stars", "planets"]
const RESULT_LIMIT = 10

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
export default function Search () {
    let [searchParams] = useSearchParams();
	let [params, setParams] = useState("")
    const [searchQ, setSearch] = useState("")

    const [results, setResults] = useState({
        moons: [],
        stars: [],
        planets: [],
    })

    let navigate = useNavigate();

    const updateSearch = (search) => {
      let path = `?q=${search}`
      navigate(path)
      setParams(search)
    }

    useEffect(() => {
        if(searchParams.get("q")){
            setParams(searchParams.get("q"))
            setSearch(searchParams.get("q"))
        }


        const constructParams = (params) => {
            let p = ""
            if(params) {
                p = "q=" + params
            }
            return p
        }

        const getResults = async ({model, params}) => {
            let url = `https://api.homeplanet.me/${model}?per_page=${RESULT_LIMIT}`
            if(params){
                url = `${url}&${constructParams(params)}`
            } 
            let data = await fetch(url)
            data = await data.json()
            return data
        }

        const getData = async () => {
            try{
                let promises = SEARCH_PATHS.map((model) => {
                    return getResults({
                        model: model,
                        params: searchParams.get("q"),
                    })
                })
                let resolved = await Promise.all(promises)
                let output = {}
                resolved.forEach((data, i) => {
                    let count = data['numInstances']
                    if(count > RESULT_LIMIT) {
                        output[SEARCH_PATHS[i]] = data["list"].slice(0, RESULT_LIMIT - 1);
                        let extraResults = [{eor: true, amount: count - RESULT_LIMIT}]
                        output[SEARCH_PATHS[i]] = output[SEARCH_PATHS[i]].concat(extraResults)
                    } else {
                        output[SEARCH_PATHS[i]] = data["list"].slice(0, RESULT_LIMIT);

                    }
                })
                setResults(output)
            } catch (err) {
                console.error(err)
            }

        } 
        getData()
    }, [params, searchParams])

        return (
            <div>
                <div className="bar-box">
                <h1 className="title-wrapper">
                    {searchParams.get("q") ? `Results for ${searchParams.get("q")}` : "Search for any planet, moon, or star here"}
                </h1>
                <TextField className="searchbar" onKeyPress={(ev) => {
                    if(ev.key === "Enter"){
                        ev.preventDefault();
                        updateSearch(ev.target.value)
                    }
                }}
                    label="Search"
                    placeholder="Enter sitewide search here"
                    value={searchQ}
                    onChange={event => setSearch(event.target.value)}
                />
                </div>

            <Container className="last-spacer">
                <h1 className="title-wrapper">Planet Results</h1>
                <Stack direction="row" flexWrap="wrap" className="center-row">
                    {results["planets"].map((c) => (
                        c["eor"] ? 
                        <Button className="search-button" variant="outlined" component={RouterLink} to={`/planets?q=${searchParams.get("q") ? searchParams.get("q") : ""}`}>
                                <Typography> View {c["amount"]} more results in planets</Typography>
                        </Button>: <SearchCard model="planets" data={c} highlight={params} />
                    ))}
                </Stack> 

                <h1 className="title-wrapper">Moon Results</h1>
                <Stack direction="row" flexWrap="wrap" className="center-row">
                    {results["moons"].map((c) => (
                        c["eor"] ? 
                        <Button className="search-button" variant="outlined" component={RouterLink} to={`/moons?q=${searchParams.get("q") ? searchParams.get("q") : ""}`}>
                                <Typography className="card-title"> View {c["amount"]} more results in moons</Typography>
                        </Button>: <SearchCard model="moons" data={c} highlight={params}/>
                    ))}
                </Stack> 

                <h1 className="title-wrapper">Star Results</h1>
                <Stack direction="row" flexWrap="wrap" className="center-row">
                    {results["stars"].map((f) => (      
                        f["eor"] ? 
                        <Button className="search-button" variant="outlined" component={RouterLink} to={`/stars?q=${searchParams.get("q") ? searchParams.get("q") : ""}`}>
                                <Typography className="card-title"> View {f["amount"]} more results in stars</Typography>
                        </Button> : <SearchCard model="stars" data={f} highlight={params}/>
                    ))}
                </Stack> 
            </Container> 
            </div>       
        )
}