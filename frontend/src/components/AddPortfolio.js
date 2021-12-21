import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signin-signup-nav-footer.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
function AddPortfolio() {
  let { auth, setAuth } = useContext(userStatus);
  const [portfolio, setPortfolio] = useState({});
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  let token;
  if (auth === "user") token = document.cookie.split("jwt=")[1];

  let userData;
  if (auth === "user") userData = JSON.parse(atob(token.split(".")[1]));


  async function hundleSubmit(e) {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      portfolio.id = userData.id._id;
      setPortfolio({ ...portfolio });
      setloading(true);
      const { data } = await axios.post(
        "/portfolio/addportfolio",
        portfolio,
        config
      );
      navigate("/portfolios");
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }
  if (auth !== "user") {
    navigate("/signin");
    return null;
  }
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      {loading && <Loading />}
      <form onSubmit={hundleSubmit}>
        <h2>Add Portfolio</h2>
        <label>Portfolio Name</label>
        <input
          type="text"
          onChange={(e) => {
            portfolio.portfolioName = e.target.value;
            setPortfolio({ ...portfolio });
          }}
          name="portfolioName"
          required
        />
        <label>total Cost</label>
        <input
          type="number"
          onChange={(e) => {
            portfolio.totalCost = e.target.value;
            setPortfolio({ ...portfolio });
          }}
          name="totalCost"
        />
        <button className="submit__btn">Add</button>
      </form>
    </div>
  );
}

export default AddPortfolio;
