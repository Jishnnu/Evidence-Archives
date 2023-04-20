import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TypeWriter from 'typewriter-effect'
import '../App.css'

function WelcomePage() {
    return (
        <div className="welcomeBackground">
            <Container>
                <h1 style={{ color: "#000000", marginTop: "250px" }}>
                    <TypeWriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 45,                            
                            strings: ["Welcome to Evidence Archives", "Official website of the Police department"]
                        }}
                    />
                </h1>
                <p>
                    Securing the safety of our community, one step at a time.
                </p>
                <Link to="/form">
                    <Button className="getStartedBtn" variant="success" size="lg">
                        Get Started
                    </Button>
                </Link>
            </Container>
        </div>
    );
}

export default WelcomePage;
