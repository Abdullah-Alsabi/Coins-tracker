import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import axios from "axios";
import { Card, Table, Button } from "react-bootstrap";
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
  const [deletedtrans, setdeletedtrans] = useState({});
  let { auth, setAuth } = useContext(userStatus);
  const [coins, setcoins] = useState([]);
  const [userId, setuserId] = useState("");
  const navigate = useNavigate();
  let token;
  if (auth === "user") token = document.cookie.split("jwt=")[1];

  let userData;
  let data;
  //user id from cookie

  useEffect(() => {
    // setloading(false);
    // i have to send the user id throgh the body
    if (auth !== "user") {
      navigate("/signin");
      return null;
    }
    userData = JSON.parse(atob(token.split(".")[1]));
    data = { userId: userData.id._id };
    setuserId(userData.id._id);

    axios
      .post("/portfolio/getportfolio/" + id, data)
      .then((res) => {
        setPortfolio(res.data);
        setcoins([]);
        res.data.transactions.map(async (t) => {
          let d = await axios
            .get(
              "https://api.coinstats.app/public/v1/coins/" +
                t.coinName +
                "?currency=USD"
            )
            .then((res) => {
              let my_object = {};
              my_object.coin = res.data;
              my_object.trans = t;

              my_object.total =
                t.tranType === "buy"
                  ? parseFloat(res.data.coin.price * t.tranAmount).toFixed(2)
                  : parseFloat(t.tranAmount * t.tranPrice).toFixed(2);
              coins.push(my_object);

              setloading(false);
            })
            .catch((err) => {
              console.log(err);
            });
          setcoins(await Promise.all(coins));

          return t.coinName;
        });

        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deletedtrans]);

  if (loading) return <Loading />;
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h2 className="mb-3"> Welcome to {Portfolio.portfolioName} portfolio</h2>
      <div className="container d-flex flex-row align-items-center justify-content-between columnBtns ">
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
                setTimeout(() => {
                  navigate("/portfolios");
                  setloading(false);
                }, 1000);
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
      </div>
      <div>
        <Card
          className="mb-3 Portfolio__card"
          style={{ width: "18rem", height: "100%" }}
        >
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
          <Table className="table__css" bordered hover variant="light">
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
                <th className="onPhone">PRICE</th>
                <th className="onPhone">TOTAL</th>
                <th>P/L</th>
                <th
                  className="onPhone"
                  style={{
                    borderTopRightRadius: "0.6rem",
                    borderRightColor: "transparent",
                  }}
                >
                  24H CHANGE
                </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((c, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={"/coins/"}>
                        <span>{c.coin.coin.name}</span>
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/"}>
                        <span>{c.trans.tranAmount}</span>
                      </Link>
                    </td>
                    <td className="onPhone">
                      <Link to={"/coins/"}>
                        <span>
                          $
                          {c.coin.coin.price < 0.1
                            ? parseFloat(c.coin.coin.price).toFixed(5)
                            : parseFloat(c.coin.coin.price).toFixed(2)}
                        </span>
                      </Link>
                    </td>
                    <td className="onPhone">
                      <Link to={"/coins/"}>
                        <span>
                          {c.trans.tranType} ● {c.total}{" "}
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to={"/coins/"}>
                        <span>
                          {c.trans.tranType} ●{" "}
                          {c.trans.tranType === "buy"
                            ? parseFloat(
                                c.total - c.trans.tranPrice * c.trans.tranAmount
                              ).toFixed(2)
                            : parseFloat(
                                c.total - c.trans.tranPrice * c.trans.tranAmount
                              ).toFixed(2)}
                          {" pl"}
                        </span>
                      </Link>
                    </td>
                    <td className="onPhone">
                      <Link to={"/coins/" + c.id}>
                        {c.coin.coin.priceChange1d > 0 ? (
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
                            {c.coin.coin.priceChange1d}
                          </span>
                        ) : c.coin.coin.priceChange1d === 0 ? (
                          <span
                            style={{
                              borderRadius: "0.3rem",
                              background: "#E0E0E0",
                              color: "#A9A9A9",
                              padding: "1%",
                            }}
                          >
                            {c.coin.coin.priceChange1d}
                          </span>
                        ) : c.coin.coin.priceChange1d < 0 ? (
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
                            {c.coin.coin.priceChange1d * -1}
                          </span>
                        ) : null}
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => {
                          setloading(true);

                          let data1 = {
                            userId: userId,
                            trans_id: c.trans._id,
                          };
                          console.log(
                            data1.userId,
                            " ",
                            data1.trans_id,
                            " ",
                            Portfolio._id
                          );
                          axios
                            .post(
                              "/transactions/deletetransactions/" +
                                Portfolio._id,
                              data1
                            )
                            .then((res) => {
                              setdeletedtrans(res.data);
                              setloading(false);
                            })
                            .catch((err) => {
                              console.log(err);
                              setloading(false);
                            });
                        }}
                        style={{
                          borderRadius: "0.3rem",
                          color: "#444",
                        }}
                        className="mt-3 mb-3 p-2 DeletePortfolio"
                      >
                        Delete
                      </button>
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
