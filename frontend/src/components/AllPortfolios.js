import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import userStatus from "../utils/userStatus";
function AllPortfolios() {
  const [AllPortfolios, setAllPortfolios] = useState([]);
  const [loading, setloading] = useState(true);
  const { auth, setAuth } = useContext(userStatus);
  const navigate = useNavigate();
  let token;

  let userData;
  if (auth === "user") {
    token = document.cookie.split("jwt=")[1];
    userData = JSON.parse(atob(token.split(".")[1]));
  }

  //user id from cookie

  useEffect(() => {
    if (auth !== "user") {
      navigate("/signin");
      return null;
    }
    axios
      .get("/portfolio/getportfolios/" + userData.id._id)
      .then((res) => {
        setAllPortfolios(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      All portfolios
      <Link to={`/addportfolio`}>
        <p
          style={{
            borderRadius: "0.3rem",
            color: "#444",
          }}
          className="mt-3 p-2 addTransaction"
        >
          Add Portfolio
        </p>
      </Link>
      <div className="portfolios">
        {AllPortfolios.map((p, index) => {
          return (
            <Link key={index} to={"/portfolios/" + p._id}>
              <Card
                className="Portfolio__card"
                style={{ width: "18rem", height: "100%" }}
              >
                <Card.Body>
                  <Card.Title>{p.portfolioName}</Card.Title>
                  <Card.Text>
                    This portfolio total cost is {p.totalCost}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default AllPortfolios;
