import React from "react";
import "./serach.css";
import { useNavigate } from "react-router-dom";
// Take in a component as argument WrappedComponent
// And return another compo(nent
function HigherOrderSearch() {
  const navigate = useNavigate();
  let names2 = [
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

  let sortedNames = names2.sort();

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
          listItem.classList.add("list-itemstest");
          listItem.style.cursor = "pointer";
          listItem.onclick = function () {
            console.log(i);
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
    let items = document.querySelectorAll(".list-itemstest");
    items.forEach((item) => {
      item.remove();
    });
  }
  return (
    <div>
      <form
        className="searchformtest"
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
  );
}

export default HigherOrderSearch;
