import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";

function Coin() {
  // id is coin name
  const { id } = useParams();
  const [Coindetails, setCoindetails] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/coins/" + id + "?currency=USD")
      .then((res) => {
   
        setCoindetails(res.data.coin);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  function convertToInternationalCurrencySystem(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }
  if (loading) return <Loading />;
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div className="imgDiv mb-3">
        <img
          src={Coindetails.icon}
          width={"40vw"}
          height={"40vh"}
          alt={Coindetails.id}
        />
      </div>

      <div className="FirstInfoDiv">
        <div className="d-flex flex-row justify-content-center">
          <p>
            {Coindetails.name} Price ({Coindetails.symbol})
          </p>
          <p
            style={{
              background: "#fee996",
              height: "25px",
              width: "30px",
            }}
          >
            #{Coindetails.rank}
          </p>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <span>
            $
            {Coindetails.price < 0.1
              ? parseFloat(Coindetails.price).toFixed(5)
              : parseFloat(Coindetails.price).toFixed(2)}
          </span>
          {Coindetails.priceChange1d > 0 ? (
            <span
              style={{
                background: "rgba(52,199,89,0.15)",
                color: "#34c759",
                borderRadius: "0.3rem",
              }}
            >
              <i className="icon-priceUp">
                <AiOutlineCaretUp />{" "}
              </i>
              {Coindetails.priceChange1d}
            </span>
          ) : Coindetails.priceChange1d === 0 ? (
            <span
              style={{
                borderRadius: "0.3rem",
                background: "#E0E0E0",
                color: "#A9A9A9",
              }}
            >
              {Coindetails.priceChange1d}
            </span>
          ) : Coindetails.priceChange1d < 0 ? (
            <span
              style={{
                borderRadius: "0.3rem",

                background: "rgba(255,53,53,0.15)",
                color: "#ff3535",
              }}
            >
              <i className="icon-priceDown">
                <AiOutlineCaretDown />{" "}
              </i>
              {Coindetails.priceChange1d * -1}
            </span>
          ) : null}
        </div>
      </div>

      <img
        className="mt-3 mb-2"
        style={{ backgroundColor: "rgba(138, 138, 138, 0.102)" }}
        src={"https://static.coinstats.app/sparks/" + id + "_1w.png"}
        alt=""
        height={"60vh"}
        width={"200vw"}
      />

      <div className="middleInfoDiv">
        <div className="topLeft">
          <span>Market Cap</span>
          <AiOutlineInfoCircle className="IconForInfo" />
          <div className="hideMoreInfo">
            <p>
              The market capitalization of a cryptocurrency is its current price
              multiplied by its circulating supply (the total number of mined
              coins).
            </p>
            <b>Market Cap = Current Price x Circulating Supply.</b>
          </div>
          <p>{convertToInternationalCurrencySystem(Coindetails.marketCap)}</p>
        </div>
        <div className="topRight">
          <span>Circulating Supply</span>
          <AiOutlineInfoCircle className="IconForInfo" />
          <div className="hideMoreInfo">
            <p>
              Available supply or circulating supply is the best approximation
              of coins or tokens in circulation and publicly available.
            </p>
          </div>
          <p>
            {convertToInternationalCurrencySystem(Coindetails.availableSupply)}
          </p>
        </div>
        <div className="bottomLeft">
          <span>Volume 24h</span>
          <AiOutlineInfoCircle className="IconForInfo" />
          <div className="hideMoreInfo">
            <p>
              Volume 24h is referring to the total amount of a cryptocurrency
              traded in the previous 24 hours.
            </p>
          </div>
          <p>{convertToInternationalCurrencySystem(Coindetails.volume)}</p>
        </div>
        <div className="bottomRight">
          <span>Total Supply</span>
          <AiOutlineInfoCircle className="IconForInfo" />
          <div className="hideMoreInfo">
            <p>
              The total supply of a cryptocurrency is referring to the total
              amount of coins in circulation or locked minus the removed ones.
            </p>
            <b>
              Total supply = Onchain Supply - Coins Removed from Circulation
            </b>
          </div>
          <p>{convertToInternationalCurrencySystem(Coindetails.totalSupply)}</p>
        </div>
      </div>
    </div>
  );
}

export default Coin;

// availableSupply: 18899637
// exp: Array(3)
// 0: "https://blockchair.com/bitcoin/"
// 1: "https://btc.com/"
// 2: "https://btc.tokenview.com/"
// length: 3
// icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png"
// id: "bitcoin"
// marketCap: 924905189606.2966
// name: "Bitcoin"
// price: 48937.7224338381
// priceBtc: 1
// priceChange1d: -0.41
// priceChange1h: -0.68
// priceChange1w: 0.3
// rank: 1
// symbol: "BTC"
// totalSupply: 21000000
// twitterUrl: "https://twitter.com/bitcoin"
// volume: 28699896987.048317
// websiteUrl: "http://www.bitcoin.org"
