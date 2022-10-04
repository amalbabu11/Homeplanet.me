import React, { useEffect, useState, version } from 'react'
import { Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import teamInfo from "./TeamInfo.js"
import toolInfo from "./ToolInfo.js"
import APIInfo from "./APIInfo.js"

const api_version = "v4"
const id = "39622546"
const COMMITS_URL = `https://gitlab.com/api/${api_version}/projects/${id}/repository/commits`
const ISSUES_URL = `https://gitlab.com/api/${api_version}/projects/${id}/issues`
const REPO_URL = "https://gitlab.com/NathanSuss/group12-cs373"
const POSTMAN_URL = "https://documenter.getpostman.com/view/20771905/2s83tFHWkc"

// Adapted from Electrends https://gitlab.com/dandom25/electrends/
const getGitLabInfo = async () => {
    let totalCommitCount = 0, totalIssueCount = 0, totalTestCount = 0;
    teamInfo.forEach((member) => {
        member.issues = 0;
        member.commits = 0;
        member.tests = 0;
    });

    let commits = await fetch(COMMITS_URL)
    commits = await commits.json()
    totalCommitCount = commits.length

    commits.forEach((commit) => {
        const { author_name, author_email } = commit
        teamInfo.forEach((member) => {
            if (member.name === author_name || author_name === member.username || member.username === author_name || member.email === author_email) {
                member.commits += 1
            }
        })
    })

    let issues = await fetch(ISSUES_URL)
    issues = await issues.json()
    totalIssueCount = issues.length

    issues.forEach((issue) => {
        console.log(issue)
        const { author } = issue
        const { name, username } = author
        teamInfo.forEach((member) => {
            if (member.name === name || name === member.username || member.username === username || member.name === username) {
                member.issues += 1
            }
        })
    })

    return {
        totalCommits: totalCommitCount,
        totalIssues: totalIssueCount,
        totalTests: totalTestCount,
        teamMembers: teamInfo,
    }
}

const About = () => {
    const [teamList] = useState([])
    const [totalCommits, setTotalCommits] = useState(0)
    const [totalIssues, setTotalIssues] = useState(0)
    const [totalTests, setTotalTests] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            if (teamList === undefined || teamList.length === 0) {
                const gitlabInfo = await getGitLabInfo()
                setTotalCommits(gitlabInfo.totalCommits)
                setTotalIssues(gitlabInfo.totalIssues)
                setTotalTests(gitlabInfo.totalTests)
            }
        }
        fetchData()
    }, [teamList])


    return (
        <div className="About">
            <header className="About-header">
                <h1> About </h1>
            </header>
            <header className="About-description">
                <h3> Description </h3>
                <p>HomePlanet is a website that provides astronomical data in an easily-accessible format. </p>
                <p>Specifically, we focus on the habitability of Planets/Exoplanets and provide information on their stars and moons.</p>
                
            </header>
            <h4><br></br></h4>
            <header className="Members">
                <h3> Members </h3>
            </header>
            <> <Row className="g-3 m-0 justify-content-center" xs="auto" md={5}>
                    {teamInfo.map((member) => {
                        return (
                            <Col key={member.name} as="div" xs="auto" mx-auto>
                                <Card style={{ width: '16rem' }}>
                                    <Card.Body>
                                        <Card.Img variant="top" src={member.picture}></Card.Img>
                                        <Card.Title>{member.name}</Card.Title>
                                        <Card.Subtitle>{member.role}</Card.Subtitle>
                                        <Card.Text>{member.bio}</Card.Text>
                                    </Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroupItem>Commits: {member.commits}</ListGroupItem>
                                        <ListGroupItem>Issues: {member.issues}</ListGroupItem>
                                        <ListGroupItem>Tests: {member.tests}</ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        )})}
                </Row> </>
            <h1><br></br></h1>
            <header className="Gitlab Stats">
                <h3> Repository Statistics </h3>
            </header>
            <> <Row className="g-3 m-0 justify-content-center" xs="auto" >
                    <Col key="totalCommits" as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Total commits:</Card.Title>
                                <Card.Text>{totalCommits}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col key="totalIssues" as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Total issues:</Card.Title>
                                <Card.Text>{totalIssues}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col key="totalTests" as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Total tests:</Card.Title>
                                <Card.Text>{totalTests}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
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
        </div>
    )
}

export default About
