import { Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { onAuthStateChanged } from 'firebase/auth';
import "./App.css";
import { auth } from "../src/firebase";
import AppHeader from "./components/header";
import MyForm from "./components/form";
import Search from "./components/search";
import ThankYouPage from "./components/thankyou";
import Logout from "./components/logout";
import AboutUs from "./components/aboutUs"
import Login from "./components/auth/Login";
import WelcomePage from "./components/welcome"

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Row>
          <header id="header">
            <AppHeader />
          </header>
        </Row>
        <Row>
          <Col xs={2}>
            <div className="sidebar">
              <h2>Thank You for helping us reduce crime!</h2>
            </div>
          </Col>

          <Col xs={10}>
            <Routes>
              <Route exact path="/Evidence-Archives/" element={<WelcomePage />} />
              <Route exact path="/" element={<WelcomePage />} />
              <Route exact path="/form" element={<MyForm />} />
              <Route exact path="/aboutus" element={<AboutUs />} />
              <Route exact path="/login" element={<Login />} />
              {authUser ? (
                <Route exact path="/search" element={<Search />} />
              ) : (<Route exact path="/login" element={<Login />} />
              )}
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/thankyou" element={<ThankYouPage />} />
            </Routes>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;