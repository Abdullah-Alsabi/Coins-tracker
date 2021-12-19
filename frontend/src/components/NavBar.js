import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../App.css";
import userStatus from "../utils/userStatus";
import Logo from "../images/Logo.png";
import Search from "./Search";
function NavBar() {
  let { auth, setAuth } = useContext(userStatus);

  let token = document.cookie.split("jwt=")[1];
  let tokenadmin = document.cookie.split("jwtadmin=")[1];
  if (tokenadmin) {
    setAuth("admin");
  } else if (token) {
    setAuth("user");
  } else setAuth("none");

  let userData;
  if (auth === "user") userData = JSON.parse(atob(token.split(".")[1]));

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
            {auth === "none" ? (
              <Link className="Link_Nav" to="/Signup">
                Signup
              </Link>
            ) : null}
            {auth === "none" ? (
              <Link className="Link_Nav" to="/Signin">
                signin
              </Link>
            ) : null}
            {auth === "user" ? (
              <Link className="Link_Nav" to="/portfolios">
                My portfolios
              </Link>
            ) : null}

            <div className="searchDiv">
              <Search />
            </div>
            {auth === "user" ? (
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
                        setAuth("none");
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
            {auth === "admin" ? (
              <div>
                <Button
                  className="Link_Nav_signOut"
                  variant="danger"
                  onClick={() => {
                    axios
                      .get("/admin/signout")
                      .then((res) => {
                        setAuth("none");
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
