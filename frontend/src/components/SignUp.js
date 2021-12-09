import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "./signin-signup-nav-footer.css";
import userStatus from "./userStatus";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

function SignUp() {
  const navigate = useNavigate();
  let { auth, setAuth } = useContext(userStatus);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  async function hundleSubmit(e) {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setloading(true);
      const { data } = await axios.post("/users/signup", user, config);
      setAuth(true);
      navigate("/");
      setloading(false);
    } catch (error) {
      setError(error.response.data.message);
      setloading(false);
    }
  }

  return (
    <div>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <form onSubmit={hundleSubmit}>
        <h2>sign up</h2>
        <label>User Name</label>
        <input
          type="text"
          onChange={(e) => {
            user.userName = e.target.value;
            setUser({ ...user });
          }}
          name="userName"
          required
        />
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => {
            user.email = e.target.value;
            setUser({ ...user });
          }}
          name="email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            user.password = e.target.value;
            setUser({ ...user });
          }}
          name="password"
          required
        />
        <button className="submit__btn">Sign up</button>
        <Row className="mt-3">
          <Col>
            Have an account?{" "}
            <Link className="Link" to="/signin">
              Signin
            </Link>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default SignUp;
