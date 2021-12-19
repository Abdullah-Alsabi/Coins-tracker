import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import Loading from "./Loading";

function Coins() {
  const [AllCoins, setallCoins] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD"
      )
      .then((res) => {
        console.log(res.data.coins);
        setallCoins(res.data.coins);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //get coins names
  // let s = "";
  // AllCoins.forEach((c) => {
  //   s += `"${c.id}",`;
  // });
  // console.log(s);

  if (loading) return <Loading />;

  return (
    <div className="main-container">
      <h2>Welcome to Coins Tracker</h2>
      {loading && <Loading />}
      <div className="container_table">
        <Table className="table__css" striped bordered hover variant="light">
          <thead>
            <tr
              style={{
                borderTopWidth: "0px",
                borderBottomWidth: "0px",
              }}
            >
              <th
                className="onPhone"
                style={{
                  borderTopLeftRadius: "0.6rem",
                }}
              >
                #
              </th>
              <th>Name</th>
              <th>Price</th>
              <th>24h Change</th>
              <th
                className="onPhone"
                style={{
                  borderTopRightRadius: "0.6rem",
                  borderRightColor: "transparent",
                }}
              >
                Price Graph (7D)
              </th>
            </tr>
          </thead>
          <tbody>
            {AllCoins.map((coin, index) => {
              return (
                <tr>
                  <td className="onPhone">
                    <Link to={"/coins/" + coin.id}>
                      <span>{index + 1}</span>
                    </Link>
                  </td>
                  <td>
                    <Link to={"/coins/" + coin.id}>
                      <div className="d-flex justify-content-start align-items-center coinNamediv">
                        <img
                          src={coin.icon}
                          width={"35vw"}
                          height={"35vh"}
                          alt={coin.id}
                        />
                        <span style={{ marginLeft: "1rem" }}>
                          <span className="onPhone">{coin.name}</span>
                          <span className="onPhone">•</span>
                          <span> {coin.symbol}</span>
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td style={{ textAlign: "justify" }}>
                    <Link to={"/coins/" + coin.id}>
                      <span>
                        $
                        {coin.price < 0.1
                          ? coin.price.toFixed(5)
                          : coin.price.toFixed(2)}
                      </span>
                    </Link>
                  </td>
                  <td>
                    <Link to={"/coins/" + coin.id}>
                      {coin.priceChange1d > 0 ? (
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
                          {coin.priceChange1d}
                        </span>
                      ) : coin.priceChange1d === 0 ? (
                        <span
                          style={{
                            borderRadius: "0.3rem",
                            background: "#E0E0E0",
                            color: "#A9A9A9",
                            padding: "1%",
                          }}
                        >
                          {coin.priceChange1d}
                        </span>
                      ) : coin.priceChange1d < 0 ? (
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
                          {coin.priceChange1d * -1}
                        </span>
                      ) : null}
                    </Link>
                  </td>
                  <td className="onPhone">
                    <Link to={"/coins/" + coin.id}>
                      <div>
                        <img
                          src={
                            "https://static.coinstats.app/sparks/" +
                            coin.id +
                            "_1w.png"
                          }
                          alt=""
                        />
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Coins;
