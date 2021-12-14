import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../App.css";
import userStatus from "../utils/userStatus";
import Logo from "../images/Logo.png";

function NavBar() {
  let { auth, setAuth } = useContext(userStatus);

  function getCookie(cname) {
    var arrayb = document.cookie.split(";");
    for (const item of arrayb) {
      if (item.startsWith("jwt=")) {
        return item.substr(4);
      }
    }
  }
  let token = getCookie("jwt");
  setAuth(token === undefined ? false : true);
  console.log(auth);
  let userData;
  if (
    token === undefined
      ? null
      : (userData = JSON.parse(atob(token.split(".")[1])))
  )
    console.log(userData.id.userName);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img height="40px" width="40px" alt="logo" src={Logo}></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex ">
            {!auth ? (
              <Link className="Link_Nav" to="/Signup">
                Signup
              </Link>
            ) : null}
            {!auth ? (
              <Link className="Link_Nav" to="/Signin">
                signin
              </Link>
            ) : null}
            {auth ? (
              <Link className="Link_Nav" to="/portfolios">
                My portfolios
              </Link>
            ) : null}
            {auth ? (
              <Link className="Link_Nav" to="/addportfolio">
                Add portfolio
              </Link>
            ) : null}
            {auth ? (
              <div className="authDiv">
                {" "}
                <h6 className="Link_Nav_userWelcome">
                  Welcome {userData.id.userName}{" "}
                </h6>{" "}
                <Button
                  className="Link_Nav_signOut"
                  variant="danger"
                  onClick={() => {
                    axios
                      .get("/users/signout")
                      .then((res) => {
                        setAuth(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  signout
                </Button>
              </div>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
