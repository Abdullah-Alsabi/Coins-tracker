import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./signin-signup-nav-footer.css";
import "./serach.css";
import "../App.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
import "./addTransaction.css";
import { Form } from "react-bootstrap";
import HigherOrderSearch from "./HigherOrderSearch";

function AddTransaction() {
  //port id
  const { id } = useParams();
  console.log(id);
  let { auth, setAuth } = useContext(userStatus);
  const [transaction, setTransaction] = useState({});
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
  let userData;
  if (token === undefined) return null;
  else userData = JSON.parse(atob(token.split(".")[1]));

  async function hundleSubmit(e) {
    e.preventDefault();
    console.log(transaction);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      transaction.id = userData.id._id;
      transaction._id = id;
      setTransaction({ ...transaction });
      setloading(true);
      const { data } = await axios.post(
        "/transactions/addtransactions",
        transaction,
        config
      );

      navigate("/portfolios");
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

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
    "curve.fi ",
    "paxos-standard-token",
    "nem",
    "compound-governance-token",
    "msol",
    "iotex",
  ];

  let sortedNames = names.sort();

  //reference
  let input = document.getElementById("inputtest");
  //Execute function on keyup
  if (input) {
    input.addEventListener("keyup", (e) => {
      console.log(input.value);
      //loop through above array
      //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
      removeElements();
      for (let i of sortedNames) {
        //convert input to lowercase and compare with each string
        if (
          i.toLowerCase().startsWith(input.value.toLowerCase()) &&
          input.value !== ""
        ) {
          //create li element
          let listItem = document.createElement("li");
          //One common class name
          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          listItem.onclick = function () {
            transaction.coinName = i;
            setTransaction({ ...transaction });

            input.value = i;
            removeElements();
          };

          //Display matched part in bold
          let word = "<b>" + i.substr(0, input.value.length) + "</b>";
          word += i.substr(input.value.length);
          //display the value in array
          listItem.innerHTML = word;
          document.querySelector(".listtest").appendChild(listItem);
          console.log(listItem);
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

  return (
    <div>
      <div className="container d-flex flex-column align-items-center justify-content-center addTrans">
        {loading && <Loading />}

        <h2>Add Transaction</h2>
        <div>
          <form
            className="searchform"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <input type="text" id="inputtest" placeholder="Ex. bitcoin" />
            </div>
            <ul className="listtest"></ul>
          </form>
        </div>

        <label>Coin Name</label>

        <label>Transaction Type</label>

        <div className="mb-3">
          <Form.Check
            defaultChecked
            onClick={() => {
              transaction.tranType = "buy";
              setTransaction({ ...transaction });
            }}
            label="buy"
            name="group1"
            type={"radio"}
            id={`buy`}
          />
          <Form.Check
            onClick={() => {
              transaction.tranType = "sell";
              setTransaction({ ...transaction });
            }}
            label="sell"
            name="group1"
            type={"radio"}
            id={`sell`}
          />
        </div>
        <label>Amount</label>
        <input
          placeholder="Quantity of coins"
          type="number"
          onChange={(e) => {
            transaction.tranAmount = e.target.value;
            setTransaction({ ...transaction });
          }}
          name="totalCost"
        />
        <label>Price </label>
        <input
          type="number"
          placeholder="In USD $"
          onChange={(e) => {
            transaction.tranPrice = e.target.value;
            setTransaction({ ...transaction });
          }}
          name="totalCost"
        />
        <button onClick={hundleSubmit} className="submit__btn">
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTransaction;
