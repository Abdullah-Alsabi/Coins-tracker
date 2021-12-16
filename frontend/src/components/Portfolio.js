import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import userStatus from "../utils/userStatus";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
function Portfolio() {
  //portfolio Id from params
  const { id } = useParams();
  const [Portfolio, setPortfolio] = useState({});
  const [loading, setloading] = useState(true);
  let { auth, setAuth } = useContext(userStatus);
  const navigate = useNavigate();

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
    // setloading(false);
    // i have to send the user id throgh the body
    if (token === undefined) return null;
    else userData = JSON.parse(atob(token.split(".")[1]));
    data = { userId: userData.id._id };
    axios
      .post("/portfolio/getportfolio/" + id, data)
      .then((res) => {
        setPortfolio(res.data);
        console.log(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(Portfolio);
  if (loading) return <Loading />;
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-3"> Welcome to {Portfolio.portfolioName} portfolio</h2>
      <Link to={`/portfolios/${id}/addtransaction/`}>
        <p
          style={{
            borderRadius: "0.3rem",
            color: "#444",
          }}
          className="mt-3 p-2 addTransaction"
        >
          Add Transaction
        </p>
      </Link>

      <button
        onClick={() => {
          setloading(true);
          // i have to send the user id throgh the body
          if (token === undefined) return null;
          else userData = JSON.parse(atob(token.split(".")[1]));
          data = { userId: userData.id._id };
          axios
            .post("/portfolio/deleteportfolio/" + id, data)
            .then((res) => {
              setloading(false);
              navigate("/portfolios");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        style={{
          borderRadius: "0.3rem",
          color: "#444",
        }}
        className="mt-3 mb-3 p-2 DeletePortfolio"
      >
        Delete Portfolio
      </button>

      <div>
        <Card className="mb-3" style={{ width: "18rem", height: "100%" }}>
          <Card.Body>
            <Card.Title>{Portfolio.portfolioName}</Card.Title>
            <Card.Text>
              This portfolio total cost is {Portfolio.totalCost} <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="Transaction__Table">
        <h4>Holdings</h4>
        {Portfolio.transactions.length > 0 ? (
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
                  NAME
                </th>
                <th>AMOUNT</th>
                <th>PRICE</th>
                <th>TOTAL</th>
                <th
                  style={{
                    borderTopRightRadius: "0.6rem",
                    borderRightColor: "transparent",
                  }}
                >
                  24H CHANGE
                </th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {Portfolio.transactions.map((t, index) => {
                return (
                  <tr>
                    <td>
                      <Link to={"/coins/"}>
                        <span>{t.coinName}</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/"}>
                        <span>{t.tranAmount}</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/"}>
                        <span>{t.tranPrice}</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/"}>
                        <span>{t.tranType}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h2>You don't have transactions yet</h2>
        )}
      </div>
    </div>
  );
}

export default Portfolio;

/*

<td>
                      <Link to={"/coins/" + t.id}>
                        <div className="d-flex justify-content-start align-items-center">
                          <img
                            src={t.icon}
                            width={"40vw"}
                            height={"40vh"}
                            alt={t.id}
                          />
                          <span style={{ marginLeft: "1rem" }}>
                            {t.name}
                            <span> • {t.symbol}</span>
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td style={{ textAlign: "justify" }}>
                      <Link to={"/coins/" + t.id}>
                        <span>
                          $
                          {t.price < 0.1
                            ? t.price.toFixed(5)
                            : t.price.toFixed(2)}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/" + t.id}>
                        {t.priceChange1d > 0 ? (
                          <span
                            style={{
                              background: "rgba(52,199,89,0.15)",
                              color: "#34c759",
                              borderRadius: "0.3rem",
                              padding: "1%",
                            }}
                          >
                            <i className="icon-priceUp">
                              <AiOutlineCaretUp />{" "}
                            </i>
                            {t.priceChange1d}
                          </span>
                        ) : t.priceChange1d === 0 ? (
                          <span
                            style={{
                              borderRadius: "0.3rem",
                              background: "#E0E0E0",
                              color: "#A9A9A9",
                              padding: "1%",
                            }}
                          >
                            {t.priceChange1d}
                          </span>
                        ) : t.priceChange1d < 0 ? (
                          <span
                            style={{
                              borderRadius: "0.3rem",
                              padding: "1%",
                              background: "rgba(255,53,53,0.15)",
                              color: "#ff3535",
                            }}
                          >
                            <i className="icon-priceDown">
                              <AiOutlineCaretDown />{" "}
                            </i>
                            {t.priceChange1d * -1}
                          </span>
                        ) : null}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/" + t.id}>
                        <div>
                          <img
                            src={
                              "https://static.coinstats.app/sparks/" +
                              t.id +
                              "_1w.png"
                            }
                            alt=""
                          />
                        </div>
                      </Link>
                    </td>
*/
