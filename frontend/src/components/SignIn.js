import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "./signin-signup-nav-footer.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
function SignIn() {
  let { auth, setAuth } = useContext(userStatus);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  async function hundleSubmit(e) {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setloading(true);
      const { data } = await axios.post("/users/signin", user, config);
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
        <h2>sign in</h2>
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
        <button className="submit__btn">Sign in</button>
        <Row className="mt-3">
          <Col>
            Don't have an account yet?{" "}
            <Link className="Link" to="/signup">
              Signup
            </Link>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default SignIn;
