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
  let data;
  //user id from cookie

  useEffect(() => {
    if (token === undefined) return null;
    else userData = JSON.parse(atob(token.split(".")[1]));
    data = { userId: userData.id._id };
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

  console.log(AllPortfolios);
  if (loading) return <Loading />;
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      All portfolios
      <div className="portfolios">
        {AllPortfolios.map((p) => {
          return (
            <Link to={"/portfolios/" + p._id}>
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
