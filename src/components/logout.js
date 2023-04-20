import React from 'react';
import { Container } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

function Logout() {
    return (
        <Container className="py-5 text-center">
            <br></br><br></br><br></br>
            <FaCheckCircle size={120} className="text-success mb-3" />
            <h1 className="mb-3">Logout</h1>
            <p className="lead mb-5">
                You are signed out. It is a good idea to close unnecessary tabs.
            </p>
        </Container>
    );
}

export default Logout;