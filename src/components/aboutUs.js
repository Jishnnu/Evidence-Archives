import { Row, Col, Card } from "react-bootstrap";
import img from "../assets/police.svg";
import karthikpic from "../assets/karthik.png";
import jishnupic from "../assets/jishnu.png";
import harshitpic from "../assets/harshitpic.png";
import sunnypic from "../assets/sunny.jpeg";
import React from "react";

const teamData = [
  {
    personName: "Karthik Banjan [Team Lead]",
    personRole: "Blockchain Management, Website Requirements",
    personImage: karthikpic,
  },
  {
    personName: "Harshit Singh",
    personRole: "Website (Frontend Design & Code - React Bootstrap)",
    personImage: harshitpic,
  },
  {
    personName: "Jishnu Anilkumar",
    personRole: "Website (Backend), Authentication, Storage, Cloud Services",
    personImage: jishnupic,
  },
  {
    personName: "Sunny Singh",
    personRole: "Documentation, Design Layout",
    personImage: sunnypic,
  },
];
export default function AboutUs() {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Row style={{ marginTop: "50px" }}>
        <h5 style={{ textAlign: "left", marginLeft: "188px", marginTop: "40px" }}>The Team</h5>
        <div className="aboutHeadline">
          <h2>
            Meet our team of{" "}
            <span style={{ fontStyle: "italic" }}>
              creators
            </span>
            ,<br></br>
            <span style={{ fontStyle: "italic" }}>
              designers
            </span>
            , and world-class
            <br></br>
            <span style={{ fontStyle: "italic" }}>
              problem solvers
            </span>
          </h2>
          <img src={img} />
        </div>
        <div className="aboutTitle">
          <p style={{ textAlign: "left" }}>
            <i>Transforming ideas into reality:</i>&nbsp;
            Four college students banded together to embark on a transformative journey of innovation and creativity, culminating in a remarkable final year project that stands as a testament to their passion, hard work, and perseverance.
          </p>
        </div>
        <Row>
          <div className="card-div">
            {teamData.map((member, index) => (
              <Col key={index} sm={6} md={3}>
                <Card className="card-image">
                  <Card.Img variant="top" src={member.personImage} />
                  <Card.Body>
                    <Card.Title>{member.personName}</Card.Title>
                    <Card.Text>{member.personRole}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
        </Row>
      </Row>
      <br></br>
    </div>
  );
}
