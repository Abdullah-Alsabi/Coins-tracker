import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signin-signup-nav-footer.css";
import "./serach.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
import "./addTransaction.css";

function AddTransaction() {
  let { auth, setAuth } = useContext(userStatus);
  const [portfolio, setPortfolio] = useState({});
  const [loading, setloading] = useState(false);
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
  if (token === undefined) return null;
  else userData = JSON.parse(atob(token.split(".")[1]));

  console.log(userData.id._id);

  let names = [
    "bitcoin",
    "ethereum",
    "binance-coin",
    "tether",
    "solana",
    "usd-coin",
    "cardano",
    "ripple",
    "polkadot",
    "dogecoin",
    "terra-luna",
    "avalanche-2",
    "shiba-inu",
    "binance-usd",
    "crypto-com-chain",
    "matic-network",
    "wrapped-bitcoin",
    "litecoin",
    "dai",
    "terrausd",
    "tron",
    "algorand",
    "chainlink",
    "bitcoin-cash",
    "uniswap",
    "stellar",
    "axie-infinity",
    "cosmos",
    "staked-ether",
    "compound-ether",
    "near",
    "ftx-token",
    "vechain",
    "filecoin",
    "elrond-erd-2",
    "ethereum-classic",
    "cdai",
    "the-sandbox",
    "hedera-hashgraph",
    "decentraland",
    "magic-internet-money",
    "theta-token",
    "tezos",
    "compound-usd-coin",
    "gala",
    "monero",
    "eos",
    "fantom",
    "klay-token",
    "the-graph",
    "internet-computer",
    "pancakeswap-token",
    "iota",
    "flow",
    "helium_hnt",
    "loopring",
    "bittorrent-2",
    "kusama",
    "olympus",
    "bitcoin-sv",
    "amp-token",
    "quant",
    "ecash",
    "radix",
    "aave",
    "enjin-coin",
    "bitcoin-cash-abc-2",
    "maker",
    "blockstack",
    "harmony",
    "theta-fuel",
    "arweave",
    "huobi-btc",
    "neo",
    "thorchain",
    "zcash",
    "celsius",
    "huobi-token",
    "basic-attention-token",
    "kucoin-shares",
    "waves",
    "bitclout",
    "ethos",
    "frax",
    "kadena",
    "chiliz",
    "holo",
    "dash",
    "ecomi",
    "trueusd",
    "link",
    "curve-dao-token",
    "nexo",
    "celo",
    "eth_frax3crv-f_0xd632f22692fac7611d2aa1c0d552930d43caed3b",
    "paxos-standard-token",
    "nem",
    "compound-governance-token",
    "msol",
    "iotex",
  ];

  let sortedNames = names.sort();

  //reference
  let input = document.getElementById("input");
  //Execute function on keyup
  if (input) {
    input.addEventListener("keyup", (e) => {
      //loop through above array
      //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
      removeElements();
      for (let i of sortedNames) {
        //convert input to lowercase and compare with each string
        if (
          i.toLowerCase().startsWith(input.value.toLowerCase()) &&
          input.value != ""
        ) {
          //create li element
          let listItem = document.createElement("li");
          //One common class name
          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          listItem.onclick = function () {
            displayNames(i);
            console.log(input.value);
            removeElements();
          };

          //Display matched part in bold
          let word = "<b>" + i.substr(0, input.value.length) + "</b>";
          word += i.substr(input.value.length);
          //display the value in array
          listItem.innerHTML = word;
          document.querySelector(".list").appendChild(listItem);
        }
      }
    });
  }
  function displayNames(value) {
    input.value = value;
    removeElements();
  }
  function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
      item.remove();
    });
  }

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
      setAuth(true);
      navigate("/portfolios");
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  return (
    <div>
      <div className="container d-flex flex-column align-items-center justify-content-center">
        {loading && <Loading />}
        <form onSubmit={hundleSubmit} autocomplete="off">
          <h2>Add Transaction</h2>

          <label>Coin Name</label>
          <div>
            <form
              className="searchform"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <input type="text" id="input" placeholder="Ex. bitcoin" />
              </div>
              <ul className="list"></ul>
            </form>
          </div>

          <label>Transaction Type</label>
          <label className="containerType sell">
            Sell
            <input type="radio" name="radio" checked="checked" />
            <span className="checkmark"></span>
          </label>

          <label className="containerType buy">
            Buy
            <input type="radio" name="radio" />
            <span className="checkmark"></span>
          </label>

          <label>Amount</label>
          <input
            placeholder="Quantity of coins"
            type="number"
            onChange={(e) => {
              portfolio.totalCost = e.target.value;
              setPortfolio({ ...portfolio });
            }}
            name="totalCost"
          />

          <label>Price </label>
          <input
            type="number"
            placeholder="In USD $"
            onChange={(e) => {
              portfolio.totalCost = e.target.value;
              setPortfolio({ ...portfolio });
            }}
            name="totalCost"
          />

          <button className="submit__btn">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
