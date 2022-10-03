import React, { useEffect, useState } from 'react'
import {Row, Col, Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import teamInfo from "./TeamInfo.js"
import toolInfo from "./ToolInfo.js"
import APIInfo from "./APIInfo.js"
import parseInfo from "./query.js"

const getGitLabInfo = async () => {
    let gitlabJson = parseInfo(), totalTestCount = 0, totalCommitCount = gitlabJson["commits_num"], totalIssueCount = gitlabJson["issues_num"];    
    teamInfo.forEach((member) => {
        member.issues = gitlabJson["issues"][member.username];
        member.commits = gitlabJson["commits"][member.username];
        member.tests = 0;
    });

    return {
		totalCommits: totalCommitCount,
		totalIssues: totalIssueCount,
        totalTests: totalTestCount,
        teamMembers: teamInfo,
	}
}

const About = () => {
  const [teamList, setTeamList] = useState([])
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
            <header className = "About-header">
                <h1>
                    About
                </h1>
            </header>
            <header className = "About-description">
                <h3>
                    Description
                </h3>
                <p>
                    HomePlanet is a website that ... 
                </p>
            </header>
            <h4><br></br></h4>
            <header className = "Members">
                <h3>
                    Members
                </h3>
            </header>
            <>
            <Row className="g-3 m-0 justify-content-center" xs="auto" md={5}>
                {teamInfo.map((member) => {
                    return (
                        <Col key = {member.name} as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Img variant="top" src = {member.picture_path}></Card.Img>
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
                    )
                })}
                </Row>
            </>
            <h1><br></br></h1>
            <header className = "Gitlab Stats">
                <h3>
                    Repository Statistics
                </h3>
            </header>
            <>
            <Row className="g-3 m-0 justify-content-center" xs="auto" >
                    <Col key = "totalCommits" as="div" xs="auto" mx-auto>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total commits:</Card.Title>
                            <Card.Text>{totalCommits}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col key = "totalIssues" as="div" xs="auto" mx-auto>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total issues:</Card.Title>
                            <Card.Text>{totalIssues}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col key = "totalTests" as="div" xs="auto" mx-auto>
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
            <header className = "Tools">
                <h3>
                    Tools Utilized
                </h3>
            </header>
            <>
            <Row className="g-3 m-0 justify-content-center" xs="auto" >
                {toolInfo.map((member) => {
                    return (
                        <Col key = {member.name} as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{member.name}</Card.Title>
                                <Card.Text>{member.description}</Card.Text>
                                <Card.Link href={member.link}>Learn more</Card.Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    )
                })}
                </Row>
            </>
            <h1><br></br></h1>
            <header className = "APIs">
                <h3>
                    APIs Utilized
                </h3>
            </header>
            <>
            <Row className="g-3 m-0 justify-content-center" xs="auto" >
                {APIInfo.map((member) => {
                    return (
                        <Col key = {member.name} as="div" xs="auto" mx-auto>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{member.name}</Card.Title>
                                <Card.Text>{member.description}</Card.Text>
                                <Card.Link href={member.link}>Learn more</Card.Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    )
                })}
                </Row>
            </>
            <h1><br></br></h1>
            <header className = "APIs">
                <h3>
                    Our Work
                </h3>
            </header>
            <>
            <Row className="g-3 m-0 justify-content-center" xs="auto" >
                <Col key = {"GitLab"} as="div" xs="auto" mx-auto>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>GitLab Repository</Card.Title>
                        <Card.Link href="https://gitlab.com/NathanSuss/group12-cs373">View our GitLab</Card.Link>
                    </Card.Body>
                </Card>
                </Col>
                <Col key = {"Postman"} as="div" xs="auto" mx-auto>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Postman Documentation</Card.Title>
                        <Card.Link href="https://documenter.getpostman.com/view/20771905/2s83tFHWkc">View Our Postman Doc</Card.Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </>
        </div>
    )
}

export default About
