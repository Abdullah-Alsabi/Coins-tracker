import React, { useState, useEffect } from "react";
import "./serach.css";
import { useNavigate } from "react-router-dom";
function Search() {
  const navigate = useNavigate();
  let names = [
    {
      icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
      name: "Bitcoin",
      symbol: "BTC",
    },
    {
      icon: "https://static.coinstats.app/coins/EthereumOCjgD.png",
      name: "Ethereum",
      symbol: "ETH",
    },
    {
      icon: "https://static.coinstats.app/coins/binancecoinOxw.png",
      name: "Binance Coin",
      symbol: "BNB",
    },
    {
      icon: "https://static.coinstats.app/coins/TetherfopnG.png",
      name: "Tether",
      symbol: "USDT",
    },
    {
      icon: "https://static.coinstats.app/coins/solanambZ.png",
      name: "Solana",
      symbol: "SOL",
    },
    {
      icon: "https://static.coinstats.app/coins/usd-coiniGm.png",
      name: "USD Coin",
      symbol: "USDC",
    },
    {
      icon: "https://static.coinstats.app/coins/CardanojXddT.png",
      name: "Cardano",
      symbol: "ADA",
    },
    {
      icon: "https://static.coinstats.app/coins/XRPdnqGJ.png",
      name: "XRP",
      symbol: "XRP",
    },
    {
      icon: "https://static.coinstats.app/coins/terra-luna8uT.png",
      name: "Terra",
      symbol: "LUNA",
    },
    {
      icon: "https://static.coinstats.app/coins/avalanche-2IQm.png",
      name: "Avalanche",
      symbol: "AVAX",
    },
    {
      icon: "https://static.coinstats.app/coins/1598367563043.png",
      name: "Polkadot",
      symbol: "DOT",
    },
    {
      icon: "https://static.coinstats.app/coins/DogecoinIZai5.png",
      name: "Dogecoin",
      symbol: "DOGE",
    },
    {
      icon: "https://static.coinstats.app/coins/1622640708445.png",
      name: "Shiba Inu",
      symbol: "SHIB",
    },
    {
      icon: "https://static.coinstats.app/coins/1622462644229.png",
      name: "Polygon",
      symbol: "MATIC",
    },
    {
      icon: "https://static.coinstats.app/coins/binance-usdcP4.png",
      name: "Binance USD",
      symbol: "BUSD",
    },
    {
      icon: "https://static.coinstats.app/coins/crypto-com-chain8Qr.png",
      name: "Crypto.com Coin",
      symbol: "CRO",
    },
    {
      icon: "https://static.coinstats.app/coins/wrapped-bitcoinoc1.png",
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
    },
    {
      icon: "https://static.coinstats.app/coins/LitecoinGiD2Q.png",
      name: "Litecoin",
      symbol: "LTC",
    },
    {
      icon: "https://static.coinstats.app/coins/ChainLink0JkIR.png",
      name: "Chainlink",
      symbol: "LINK",
    },
    {
      icon: "https://static.coinstats.app/coins/terrausdw3z.png",
      name: "TerraUSD",
      symbol: "UST",
    },
    {
      icon: "https://static.coinstats.app/coins/1579614462667.png",
      name: "Dai",
      symbol: "DAI",
    },
    {
      icon: "https://static.coinstats.app/coins/AlgorandoUhKT.png",
      name: "Algorand",
      symbol: "ALGO",
    },
    {
      icon: "https://static.coinstats.app/coins/1619105503987.png",
      name: "Bitcoin Cash",
      symbol: "BCH",
    },
    {
      icon: "https://static.coinstats.app/coins/TRONxJljY.png",
      name: "TRON",
      symbol: "TRX",
    },
    {
      icon: "https://static.coinstats.app/coins/1601456093963.png",
      name: "Uniswap",
      symbol: "UNI",
    },
    {
      icon: "https://static.coinstats.app/coins/CosmosyqCSZ.png",
      name: "Cosmos",
      symbol: "ATOM",
    },
    {
      icon: "https://static.coinstats.app/coins/axie-infinity7o3.png",
      name: "Axie Infinity",
      symbol: "AXS",
    },
    {
      icon: "https://static.coinstats.app/coins/1594216268358.png",
      name: "Stellar",
      symbol: "XLM",
    },
    {
      icon: "https://static.coinstats.app/coins/staked-etheruqt.png",
      name: "Lido Staked Ether",
      symbol: "STETH",
    },
    {
      icon: "https://static.coinstats.app/coins/compound-etherV8Q.png",
      name: "cETH",
      symbol: "CETH",
    },
    {
      icon: "https://static.coinstats.app/coins/ftx-tokenwL9.png",
      name: "FTX Token",
      symbol: "FTT",
    },
    {
      icon: "https://static.coinstats.app/coins/VeChainTTaJ5.png",
      name: "VeChain",
      symbol: "VET",
    },
    {
      icon: "https://static.coinstats.app/coins/1594379268854.png",
      name: "Hedera",
      symbol: "HBAR",
    },
    {
      icon: "https://static.coinstats.app/coins/nearNPL.png",
      name: "Near",
      symbol: "NEAR",
    },
    {
      icon: "https://static.coinstats.app/coins/elrond-erd-2Twu.png",
      name: "Elrond",
      symbol: "EGLD",
    },
    {
      icon: "https://static.coinstats.app/coins/filecoinuB8.png",
      name: "Filecoin",
      symbol: "FIL",
    },
    {
      icon: "https://static.coinstats.app/coins/the-sandboxPFZ.png",
      name: "The Sandbox",
      symbol: "SAND",
    },
    {
      icon: "https://static.coinstats.app/coins/ethereum-classicPfU.png",
      name: "Ethereum Classic",
      symbol: "ETC",
    },
    {
      icon: "https://static.coinstats.app/coins/Decentraland7FerE.png",
      name: "Decentraland",
      symbol: "MANA",
    },
    {
      icon: "https://static.coinstats.app/coins/cdai0sT.png",
      name: "cDAI",
      symbol: "CDAI",
    },
    {
      icon: "https://static.coinstats.app/coins/theta-tokenrot.png",
      name: "Theta Network",
      symbol: "THETA",
    },
    {
      icon: "https://static.coinstats.app/coins/magic-internet-moneyVY4.png",
      name: "Magic Internet Money",
      symbol: "MIM",
    },
    {
      icon: "https://static.coinstats.app/coins/TezosKe2SC.png",
      name: "Tezos",
      symbol: "XTZ",
    },
    {
      icon: "https://static.coinstats.app/coins/FantomQxjPf.png",
      name: "Fantom",
      symbol: "FTM",
    },
    {
      icon: "https://static.coinstats.app/coins/galarYY.png",
      name: "Gala",
      symbol: "GALA",
    },
    {
      icon: "https://static.coinstats.app/coins/compound-usd-coinY4B.png",
      name: "cUSDC",
      symbol: "CUSDC",
    },
    {
      icon: "https://static.coinstats.app/coins/MoneroxCKAn.png",
      name: "Monero",
      symbol: "XMR",
    },
    {
      icon: "https://static.coinstats.app/coins/heliumrwY.png",
      name: "Helium",
      symbol: "HNT",
    },
    {
      icon: "https://static.coinstats.app/coins/KlaytnmW9JF.png",
      name: "Klaytn",
      symbol: "KLAY",
    },
    {
      icon: "https://static.coinstats.app/coins/the-graphdCm.png",
      name: "The Graph",
      symbol: "GRT",
    },
    {
      icon: "https://static.coinstats.app/coins/EOSGAmMm.png",
      name: "EOS",
      symbol: "EOS",
    },
    {
      icon: "https://static.coinstats.app/coins/pancakeswap-tokenbfr.png",
      name: "PancakeSwap",
      symbol: "CAKE",
    },
    {
      icon: "https://static.coinstats.app/coins/1594216225344.png",
      name: "IOTA",
      symbol: "MIOTA",
    },
    {
      icon: "https://static.coinstats.app/coins/internet-computer4kw.png",
      name: "Internet Computer",
      symbol: "ICP",
    },
    {
      icon: "https://static.coinstats.app/coins/flowSmF.png",
      name: "Flow",
      symbol: "FLOW",
    },
    {
      icon: "https://static.coinstats.app/coins/arweavefsf.png",
      name: "Arweave",
      symbol: "AR",
    },
    {
      icon: "https://static.coinstats.app/coins/Loopring2KdYn.png",
      name: "Loopring",
      symbol: "LRC",
    },
    {
      icon: "https://static.coinstats.app/coins/aaveZSi.png",
      name: "Aave",
      symbol: "AAVE",
    },
    {
      icon: "https://static.coinstats.app/coins/BitTorrent3802L.png",
      name: "BitTorrent",
      symbol: "BTT",
    },
    {
      icon: "https://static.coinstats.app/coins/QuantYOd3i.png",
      name: "Quant",
      symbol: "QNT",
    },
    {
      icon: "https://static.coinstats.app/coins/KusamatpZGF.png",
      name: "Kusama",
      symbol: "KSM",
    },
    {
      icon: "https://static.coinstats.app/coins/radixCWo.png",
      name: "Radix",
      symbol: "XRD",
    },
    {
      icon: "https://static.coinstats.app/coins/Harmonyz84Ap.png",
      name: "Harmony",
      symbol: "ONE",
    },
    {
      icon: "https://static.coinstats.app/coins/bitcoin-cash-svkYm.png",
      name: "Bitcoin SV",
      symbol: "BSV",
    },
    {
      icon: "https://static.coinstats.app/coins/amp-token91t.png",
      name: "Amp",
      symbol: "AMP",
    },
    {
      icon: "https://static.coinstats.app/coins/1616753926594.png",
      name: "Stacks",
      symbol: "STX",
    },
    {
      icon: "https://static.coinstats.app/coins/olympus1nf.png",
      name: "Olympus",
      symbol: "OHM",
    },
    {
      icon: "https://static.coinstats.app/coins/enjincoinUof.png",
      name: "Enjin Coin",
      symbol: "ENJ",
    },
    {
      icon: "https://static.coinstats.app/coins/Makerxxquk.png",
      name: "Maker",
      symbol: "MKR",
    },
    {
      icon: "https://static.coinstats.app/coins/ecashsfL.png",
      name: "eCash",
      symbol: "XEC",
    },
    {
      icon: "https://static.coinstats.app/coins/bitcoin-cash-abc-2LnI.png",
      name: "Bitcoin Cash ABC",
      symbol: "BCHA",
    },
    {
      icon: "https://static.coinstats.app/coins/ZcashtcLvi.png",
      name: "Zcash",
      symbol: "ZEC",
    },
    {
      icon: "https://static.coinstats.app/coins/ThorchainSDce2.png",
      name: "THORChain",
      symbol: "RUNE",
    },
    {
      icon: "https://static.coinstats.app/coins/huobi-btc2XB.png",
      name: "Huobi BTC",
      symbol: "HBTC",
    },
    {
      icon: "https://static.coinstats.app/coins/theta-fuelJBy.png",
      name: "Theta Fuel",
      symbol: "TFUEL",
    },
    {
      icon: "https://static.coinstats.app/coins/1638518507202.png",
      name: "Kadena",
      symbol: "KDA",
    },
    {
      icon: "https://static.coinstats.app/coins/NEOY4fUY.png",
      name: "NEO",
      symbol: "NEO",
    },
    {
      icon: "https://static.coinstats.app/coins/basic-attention-tokenbhU.png",
      name: "Basic Attention Token",
      symbol: "BAT",
    },
    {
      icon: "https://static.coinstats.app/coins/curve-dao-tokenDD2.png",
      name: "Curve DAO Token",
      symbol: "CRV",
    },
    {
      icon: "https://static.coinstats.app/coins/Waves9jlmM.png",
      name: "Waves",
      symbol: "WAVES",
    },
    {
      icon: "https://static.coinstats.app/coins/kucoin-sharesNqa.png",
      name: "KuCoin Token",
      symbol: "KCS",
    },
    {
      icon: "https://static.coinstats.app/coins/1603372504064.png",
      name: "Celsius Network",
      symbol: "CEL",
    },
    {
      icon: "https://static.coinstats.app/coins/huobi-tokenGkD.png",
      name: "Huobi Token",
      symbol: "HT",
    },
    {
      icon: "https://static.coinstats.app/coins/ECOMIkTq2m.png",
      name: "ECOMI",
      symbol: "OMI",
    },
    {
      icon: "https://static.coinstats.app/coins/fraxepT.png",
      name: "Frax",
      symbol: "FRAX",
    },
    {
      icon: "https://static.coinstats.app/coins/celocil.png",
      name: "Celo",
      symbol: "CELO",
    },
    {
      icon: "https://static.coinstats.app/coins/ethosGkP.png",
      name: "Voyager Token",
      symbol: "VGX",
    },
    {
      icon: "https://static.coinstats.app/coins/Chilizo7VuK.png",
      name: "Chiliz",
      symbol: "CHZ",
    },
    {
      icon: "https://static.coinstats.app/coins/convex-financeDFh.png",
      name: "Convex Finance",
      symbol: "CVX",
    },
    {
      icon: "https://static.coinstats.app/coins/LINKRR314.png",
      name: "LINK",
      symbol: "LN",
    },
    {
      icon: "https://static.coinstats.app/coins/Dash0FPAt.png",
      name: "Dash",
      symbol: "DASH",
    },
    {
      icon: "https://static.coinstats.app/coins/HolowwK85.png",
      name: "Holo",
      symbol: "HOT",
    },
    {
      icon: "https://static.coinstats.app/coins/msolG0B.png",
      name: "Marinade staked SOL",
      symbol: "MSOL",
    },
    {
      icon: "https://static.coinstats.app/coins/spell-tokenrfb.png",
      name: "Spell Token",
      symbol: "SPELL",
    },
    {
      icon: "https://static.coinstats.app/coins/TrueUSDgdH0q.png",
      name: "TrueUSD",
      symbol: "TUSD",
    },
    {
      icon: "https://static.coinstats.app/coins/NEXORqsiD.png",
      name: "NEXO",
      symbol: "NEXO",
    },
    {
      icon: "https://static.coinstats.app/coins/compound-governance-tokenFHt.png",
      name: "Compound",
      symbol: "COMP",
    },
    {
      icon: "https://coinstats.app/icons/fra.png",
      name: "Curve.fi Factory USD Metapool: Frax",
      symbol: "FRAX3CRV-f",
    },
    {
      icon: "https://static.coinstats.app/coins/NEMoyBWF.png",
      name: "NEM",
      symbol: "XEM",
    },
    {
      icon: "https://static.coinstats.app/coins/paxos-standardMI9.png",
      name: "Pax Dollar",
      symbol: "USDP",
    },
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
          i.name.toLowerCase().startsWith(input.value.toLowerCase()) &&
          input.value !== ""
        ) {
          //create li element
          let listItem = document.createElement("li");
          //One common class name
          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          listItem.onclick = function () {
            console.log(i);
            input.value = "";
            removeElements();

            navigate(`/coins/${i.name.toLowerCase()}`);
          };

          //Display matched part in bold
          let word = "<b>" + i.name.substr(0, input.value.length) + "</b>";
          word += i.name.substr(input.value.length);
          word += " ● " + i.symbol + " ";
          word += `<img src=${i.icon} style="
          width: 40px; "  alt=${i.name} />`;
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
        className="searchform search__css"
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
