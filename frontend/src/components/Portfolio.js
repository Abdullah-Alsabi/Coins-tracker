import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import userStatus from "../utils/userStatus";
function Portfolio() {
  //portfolio Id from params
  const { id } = useParams();
  const [Portfolio, setPortfolio] = useState({});
  const [loading, setloading] = useState(false);
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
    //user id from cookie
    console.log(userData.id._id);
  let data = { userId: userData.id._id };
  useEffect(() => {
    setloading(true);
    // i have to send the user id throgh the body
    axios
      .post("/portfolio/getportfolio/" + id, data)
      .then((res) => {
        setPortfolio(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(Portfolio);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      {loading && <Loading />}
      <h2 className="mb-3"> Welcome to {Portfolio.portfolioName} portfolio</h2>
      <div>
        <Card className="mb-3" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{Portfolio.portfolioName}</Card.Title>
            <Card.Text>
              This portfolio total cost is {Portfolio.totalCost} <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="Transaction__Table">
        <Table bordered hover variant="light">
          <thead>
            <tr
              style={{
                borderTopWidth: "0px",
                borderBottomWidth: "0px",
              }}
            >
              <th
                style={{
                  borderTopLeftRadius: "0.6rem",
                  borderLeftWidth: "0px",
                }}
              >
                #
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th
                style={{
                  borderTopRightRadius: "0.6rem",
                  borderRightColor: "transparent",
                }}
              >
                Price Graph (7D)
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      </div>
    </div>
  );
}

export default Portfolio;
