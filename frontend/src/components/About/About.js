import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import TeamInfo from "./TeamInfo.js"
import toolInfo from "./ToolInfo.js"
import APIInfo from "./APIInfo.js"
import "../../styles/About.css";

const api_version = "v4"
const id = "39622546"
const REPO_URL = "https://gitlab.com/NathanSuss/group12-cs373"
const POSTMAN_URL = "https://documenter.getpostman.com/view/20771905/2s83tFHWkc"

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2
const getGitLabStats = async () => {
  let commitCount = 0;
  let issueCount = 0;
  let testCount = 0;

  TeamInfo.forEach((member) => {
    member.commits = 0;
    member.issues = 0;
    testCount += member.tests;
  });

  let commits = [],
    page = [],
    pageNum = 1;
  do {
    page = await fetch(
      `https://gitlab.com/api/${api_version}/projects/${id}/repository/commits?per_page=100&page=${pageNum}&all=true`
    );
    page = await page.json();
    commits = [...commits, ...page];
    pageNum += 1;
  } while (page.length === 100);

  commits.forEach((commit) => {
    const { author_name, author_email } = commit;
    TeamInfo.forEach((member) => {
    if (member.git_key === author_name || member.name === author_name || member.username === author_name || member.email === author_email){
        member.commits += 1;
    }
    });
    commitCount += 1;
    });

  pageNum = 0;
  page = [];
  let issues = [];
  do {
    page = await fetch(
      `https://gitlab.com/api/${api_version}/projects/${id}/issues?per_page=100&page=${pageNum}`
    );
    page = await page.json();
    issues = [...issues, ...page];
    pageNum += 1;
  } while (page.length === 100);

  issues.forEach((issue) => {
    const { author } = issue;
    const { name, username, author_email } = author;
    TeamInfo.forEach((member) => {
      if (
        member.git_key === name || 
        member.name === name ||
        member.username === username ||
        member.email === author_email
      ) {
        member.issues += 1;
        issueCount += 1;
    }
    });
    
    });

  return {
    teamMembers: TeamInfo,
    numCommits: commitCount,
    numIssues: issueCount,
    numTests: testCount,
  };
};

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [numCommits, setNumCommits] = useState(0);
  const [numIssues, setNumIssues] = useState(0);
  const [numTests, setNumTests] = useState(0);

  useEffect(() => {
    const getData = async () => {
      if (teamMembers === undefined || teamMembers.length === 0) {
        const stats = await getGitLabStats();
        setTeamMembers(stats.teamMembers);
        setNumCommits(stats.numCommits);
        setNumIssues(stats.numIssues);
        setNumTests(stats.numTests);
      }
    };
    getData();
  }, [teamMembers]);

  return (
    <Container>
      <h1>About Us</h1>
      <Container>
        <p>HomePlanet is a website that provides astronomical data in an easily-accessible format.</p>
        <p>Specifically, we focus on the habitability of Planets/Exoplanets and provide information on their stars and moons.</p>
        
      </Container>
      <h1>Team Members</h1>
      <Row className="g-3 m-0 justify-content-center" xs="auto" md={5}>
        {teamMembers.map((member) => {
          return (
            <Col key={member.name} as="div">
              <Card className="bioCard" style={{ width: "16rem" }}>
                <Card.Img className="bioPic" variant="top" src={member.picture} />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle>{member.role}</Card.Subtitle>
                  <Card.Text>{member.bio}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroupItem>Commits: {member.commits}</ListGroupItem>
                    <ListGroupItem>Issues: {member.issues}</ListGroupItem>
                    <ListGroupItem>Tests: {member.tests}</ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <h1>Repository Statistics</h1>
      <Container>
        <div className="repoStats">
          <Table>
            <thead>
              <tr>
                <th>Total Commits</th>
                <th>Total Issues</th>
                <th>Total Tests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{numCommits}</td>
                <td>{numIssues}</td>
                <td>{numTests}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <h1><br></br></h1>
            <header className="Tools">
                <h3> Tools Utilized </h3>
            </header>
            <> <Row className="g-3 m-0 justify-content-center" xs="auto" >
                    {toolInfo.map((member) => {
                        return (
                            <Col key={member.name} as="div" xs="auto" mx-auto>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{member.name}</Card.Title>
                                        <Card.Text>{member.description}</Card.Text>
                                        <Card.Link href={member.link}>Learn more</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})}
                </Row>
            </>
            <h1><br></br></h1>
            <header className="APIs">
                <h3> APIs Utilized </h3>
            </header>
            <> <Row className="g-3 m-0 justify-content-center" xs="auto" >
                    {APIInfo.map((member) => {
                        return (
                            <Col key={member.name} as="div" xs="auto" mx-auto>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{member.name}</Card.Title>
                                        <Card.Text>{member.description}</Card.Text>
                                        <Card.Link href={member.link}>Learn more</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )})}
                </Row>
            </>
            <h1><br></br></h1>
            <header className="APIs">
                <h3> Our Work </h3>
            </header>
            <> <Row className="g-3 m-0 justify-content-center" xs="auto" >
                    <Col key={"GitLab"} as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>GitLab Repository</Card.Title>
                                <Card.Link href={REPO_URL}>View our GitLab</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col key={"Postman"} as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Postman Documentation</Card.Title>
                                <Card.Link href={POSTMAN_URL}>View Our API Documentation on Postman</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        
      </Container>
    </Container>
  );
};
export default About;
