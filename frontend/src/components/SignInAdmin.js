import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signin-signup-nav-footer.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
function SignInAdmin() {
  let { auth, setAuth } = useContext(userStatus);
  const [admin, setAdmin] = useState({});
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
      const { data } = await axios.post("/admin/signin", admin, config);
      setAuth("admin");
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
        <h2>sign in for admin</h2>
        <label>Admin User Name</label>
        <input
          type="text"
          onChange={(e) => {
            admin.userName = e.target.value;
            setAdmin({ ...admin });
          }}
          name="userName"
          required
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            admin.password = e.target.value;
            setAdmin({ ...admin });
          }}
          name="password"
          required
        />
        <button className="submit__btn">Sign in</button>
      </form>
    </div>
  );
}

export default SignInAdmin;
