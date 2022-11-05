import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import defaultLogo from "../../assets/planets/defaultPlanetImg.bmp"
import { Link as RouterLink } from "react-router-dom";
import "../../styles/Search.css";
import Highlight from "../Highlight/Highlight";


// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
export default function SearchCard(props) {
    if(props.model === "planets"){
        return <PlanetSCard data={props.data} highlight={props.highlight}/>
    } else if (props.model === "moons"){
        return <MoonSCard data={props.data} highlight={props.highlight}/>
    } else {
        return <StarSCard data={props.data} highlight={props.highlight}/>
    }
}

function PlanetSCard (props) {
    return (<Card className="search-card">
        <CardActionArea className="search-action" component={RouterLink} to={"/planet/id=" + props.data.id}>
        <CardContent>
        {/* <CardMedia className="companyLogo" component="img" image={"https://logo.clearbit.com/" + props.data.website} onError={({ currentTarget }) => {
                                                               currentTarget.onerror = null;
                                                               currentTarget.src=defaultLogo;
                 }} /> */}
            {/* <p><strong><Highlight by={props.highlight}>{props.data.name}</Highlight></strong></p>
            <p className="cardContent"><strong>Headquartered: </strong>
            <Highlight by={props.highlight}>{props.data.city}</Highlight>, <Highlight by={props.highlight}>{props.data.state}</Highlight></p>
            <p className="cardContent"><strong>Revenue: </strong>
            <Highlight by={props.highlight} pre="$" def="Not available">{props.data.revenue}</Highlight></p> 
            <p className="cardContent"><strong>Facility Emissions: </strong>
            <Highlight by={props.highlight}>{props.data.emissions}</Highlight></p>
            <p className="cardContent"><strong>Founded: </strong>
            <Highlight by={props.highlight}>{props.data.founded}</Highlight></p>
            <p className="cardContent"><strong>Subsidiaries: </strong>
            <Highlight by={props.highlight}>{props.data.subsidiaries}</Highlight></p> */}
        </CardContent>
        </CardActionArea>
    </Card>)
}

function MoonSCard (props) {
    return (<Card className="search-card-mini">
        <CardActionArea className="search-action" component={RouterLink} to={"/moon/id=" + props.data.id}>
            {/* <CardContent>
                <p className="card-content-wrap"><strong><Highlight by={props.highlight}>{props.data.name}</Highlight></strong></p>
                <p className="cardContent"><strong>State: </strong>
                <Highlight by={props.highlight}>{props.data.state}</Highlight></p>
                <p className="cardContent"><strong>Total Emissions: </strong>
                <Highlight by={props.highlight}>{props.data.emissions}</Highlight></p> 
                <p className="cardContent"><strong>Median Household: </strong>
                <Highlight by={props.highlight}>{props.data.income}</Highlight></p>
                <p className="cardContent"><strong>Second Largest Ethnic Group: </strong>
                <Highlight by={props.highlight}>{props.data.ethnicity}</Highlight></p>
                <p className="cardContent"><strong>Officials: </strong>
                {props.data.numOfficials}</p>
            </CardContent> */}
        </CardActionArea>
    </Card>)
}

function StarSCard (props) {
    return (<Card className="search-card-mini">
        <CardActionArea className="search-action" component={RouterLink} to={"/star/id=" + props.data.id}>
            <CardContent>
                {/* <p className="card-content-wrap"><strong><Highlight by={props.highlight}>{props.data.name}</Highlight></strong></p>
                <p className="cardContent">
                <Highlight by={props.highlight}>{props.data.city}</Highlight>, <Highlight by={props.highlight}>{props.data.state}</Highlight></p>
                <p className="cardContent"><strong>Address: </strong>
                <Highlight by={props.highlight}>{props.data.address}</Highlight></p> 
                <p className="cardContent"><strong>Zip Code: </strong>
                <Highlight by={props.highlight}>{props.data.zip}</Highlight></p>
                <p className="cardContent"><strong>Emissions (in tons): </strong>
                <Highlight by={props.highlight}>{props.data.emissions}</Highlight></p>
                <p className="cardContent"><strong>Most Common Emission: </strong>
                <Highlight by={props.highlight}>{props.data.mostcommonemission}</Highlight></p> */}
            </CardContent>
        </CardActionArea>
    </Card>)
}