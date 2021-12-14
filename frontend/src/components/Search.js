import React from "react";
import "./serach.css";
import { useNavigate } from "react-router-dom";
function Search() {
  const navigate = useNavigate();
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

  console.log(sortedNames);

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
            input.value = "";
            removeElements();
            navigate(`/coins/${i}`);
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
  return (
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
  );
}

export default Search;
