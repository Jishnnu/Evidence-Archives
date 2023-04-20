import { Form, Button, Spinner } from "react-bootstrap";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
    // Get form inputs
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if code and password fields are valid
        if (password === "" || email === "") {
            alert('Mandatory Fields empty');
        } else {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)                    
                    window.location.href = "/search";
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    alert("Incorrect username or password. Please try again.");
                });
        }
    };

    return (
        <div className="login">
            <h1 className="mb-4">LOGIN</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Email <span style={{ color: "red" }}>*</span> </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Enter Your Station/Jurisdiction Email"
                        minLength={1}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <br></br>

                <Form.Group>
                    <Form.Label>Enter Password <span style={{ color: "red" }}>*</span> </Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Enter Your Password"
                        minLength={11}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br></br>

                <Button variant="success" type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <Spinner animation="border" role="status"> {/* Show the spinner during loading state */}
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ) : (
                        'Login' // Show the normal text on the submit button
                    )}
                </Button>

                <br></br>
            </Form>
        </div>
    );
}
export default Login;