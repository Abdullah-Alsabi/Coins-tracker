import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import "./signin-signup-nav-footer.css";
import "./serach.css";
import "../App.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
import "./addTransaction.css";
import { Form } from "react-bootstrap";

function AddTransaction() {
  //port id
  const { id } = useParams();
  let { auth, setAuth } = useContext(userStatus);
  const [transaction, setTransaction] = useState({});
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  // I Forced the function component to update because the search doesn't work only after refresh
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  let token;
  if (auth === "user") token = document.cookie.split("jwt=")[1];

  let userData;
  if (auth === "user") userData = JSON.parse(atob(token.split(".")[1]));

  async function hundleSubmit(e) {
    e.preventDefault();

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
      setTimeout(() => {
        navigate(`/portfolios/${id}`);
        setloading(false);
      }, 500);
    } catch (error) {
      setloading(false);
    }
  }

  let names = [
    {
      icon: "https://static.coinstats.app/coins/Bitcoin6l39t.png",
      name: "Bitcoin",
      symbol: "BTC",
      id: "bitcoin",
    },
    {
      icon: "https://static.coinstats.app/coins/EthereumOCjgD.png",
      name: "Ethereum",
      symbol: "ETH",
      id: "ethereum",
    },
    {
      icon: "https://static.coinstats.app/coins/binancecoinOxw.png",
      name: "Binance Coin",
      symbol: "BNB",
      id: "binance-coin",
    },
    {
      icon: "https://static.coinstats.app/coins/TetherfopnG.png",
      name: "Tether",
      symbol: "USDT",
      id: "tether",
    },
    {
      icon: "https://static.coinstats.app/coins/solanambZ.png",
      name: "Solana",
      symbol: "SOL",
      id: "solana",
    },
    {
      icon: "https://static.coinstats.app/coins/usd-coiniGm.png",
      name: "USD Coin",
      symbol: "USDC",
      id: "usd-coin",
    },
    {
      icon: "https://static.coinstats.app/coins/XRPdnqGJ.png",
      name: "XRP",
      symbol: "XRP",
      id: "ripple",
    },
    {
      icon: "https://static.coinstats.app/coins/CardanojXddT.png",
      name: "Cardano",
      symbol: "ADA",
      id: "cardano",
    },
    {
      icon: "https://static.coinstats.app/coins/terra-luna8uT.png",
      name: "Terra",
      symbol: "LUNA",
      id: "terra-luna",
    },
    {
      icon: "https://static.coinstats.app/coins/avalanche-2IQm.png",
      name: "Avalanche",
      symbol: "AVAX",
      id: "avalanche-2",
    },
    {
      icon: "https://static.coinstats.app/coins/1598367563043.png",
      name: "Polkadot",
      symbol: "DOT",
      id: "polkadot",
    },
    {
      icon: "https://static.coinstats.app/coins/DogecoinIZai5.png",
      name: "Dogecoin",
      symbol: "DOGE",
      id: "dogecoin",
    },
    {
      icon: "https://static.coinstats.app/coins/1622640708445.png",
      name: "Shiba Inu",
      symbol: "SHIB",
      id: "shiba-inu",
    },
    {
      icon: "https://static.coinstats.app/coins/1622462644229.png",
      name: "Polygon",
      symbol: "MATIC",
      id: "matic-network",
    },
    {
      icon: "https://static.coinstats.app/coins/binance-usdcP4.png",
      name: "Binance USD",
      symbol: "BUSD",
      id: "binance-usd",
    },
    {
      icon: "https://static.coinstats.app/coins/crypto-com-chain8Qr.png",
      name: "Crypto.com Coin",
      symbol: "CRO",
      id: "crypto-com-chain",
    },
    {
      icon: "https://static.coinstats.app/coins/wrapped-bitcoinoc1.png",
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      id: "wrapped-bitcoin",
    },
    {
      icon: "https://static.coinstats.app/coins/LitecoinGiD2Q.png",
      name: "Litecoin",
      symbol: "LTC",
      id: "litecoin",
    },
    {
      icon: "https://static.coinstats.app/coins/terrausdw3z.png",
      name: "TerraUSD",
      symbol: "UST",
      id: "terrausd",
    },
    {
      icon: "https://static.coinstats.app/coins/1579614462667.png",
      name: "Dai",
      symbol: "DAI",
      id: "dai",
    },
    {
      icon: "https://static.coinstats.app/coins/ChainLink0JkIR.png",
      name: "Chainlink",
      symbol: "LINK",
      id: "chainlink",
    },
    {
      icon: "https://static.coinstats.app/coins/AlgorandoUhKT.png",
      name: "Algorand",
      symbol: "ALGO",
      id: "algorand",
    },
    {
      icon: "https://static.coinstats.app/coins/1619105503987.png",
      name: "Bitcoin Cash",
      symbol: "BCH",
      id: "bitcoin-cash",
    },
    {
      icon: "https://static.coinstats.app/coins/TRONxJljY.png",
      name: "TRON",
      symbol: "TRX",
      id: "tron",
    },
    {
      icon: "https://static.coinstats.app/coins/1601456093963.png",
      name: "Uniswap",
      symbol: "UNI",
      id: "uniswap",
    },
    {
      icon: "https://static.coinstats.app/coins/1594216268358.png",
      name: "Stellar",
      symbol: "XLM",
      id: "stellar",
    },
    {
      icon: "https://static.coinstats.app/coins/axie-infinity7o3.png",
      name: "Axie Infinity",
      symbol: "AXS",
      id: "axie-infinity",
    },
    {
      icon: "https://static.coinstats.app/coins/staked-etheruqt.png",
      name: "Lido Staked Ether",
      symbol: "STETH",
      id: "staked-ether",
    },
    {
      icon: "https://static.coinstats.app/coins/CosmosyqCSZ.png",
      name: "Cosmos",
      symbol: "ATOM",
      id: "cosmos",
    },
    {
      icon: "https://static.coinstats.app/coins/compound-etherV8Q.png",
      name: "cETH",
      symbol: "CETH",
      id: "compound-ether",
    },
    {
      icon: "https://static.coinstats.app/coins/ftx-tokenwL9.png",
      name: "FTX Token",
      symbol: "FTT",
      id: "ftx-token",
    },
    {
      icon: "https://static.coinstats.app/coins/1594379268854.png",
      name: "Hedera",
      symbol: "HBAR",
      id: "hedera-hashgraph",
    },
    {
      icon: "https://static.coinstats.app/coins/VeChainTTaJ5.png",
      name: "VeChain",
      symbol: "VET",
      id: "vechain",
    },
    {
      icon: "https://static.coinstats.app/coins/nearNPL.png",
      name: "Near",
      symbol: "NEAR",
      id: "near",
    },
    {
      icon: "https://static.coinstats.app/coins/filecoinuB8.png",
      name: "Filecoin",
      symbol: "FIL",
      id: "filecoin",
    },
    {
      icon: "https://static.coinstats.app/coins/elrond-erd-2Twu.png",
      name: "Elrond",
      symbol: "EGLD",
      id: "elrond-erd-2",
    },
    {
      icon: "https://static.coinstats.app/coins/the-sandboxPFZ.png",
      name: "The Sandbox",
      symbol: "SAND",
      id: "the-sandbox",
    },
    {
      icon: "https://static.coinstats.app/coins/ethereum-classicPfU.png",
      name: "Ethereum Classic",
      symbol: "ETC",
      id: "ethereum-classic",
    },
    {
      icon: "https://static.coinstats.app/coins/cdai0sT.png",
      name: "cDAI",
      symbol: "CDAI",
      id: "cdai",
    },
    {
      icon: "https://static.coinstats.app/coins/Decentraland7FerE.png",
      name: "Decentraland",
      symbol: "MANA",
      id: "decentraland",
    },
    {
      icon: "https://static.coinstats.app/coins/magic-internet-moneyVY4.png",
      name: "Magic Internet Money",
      symbol: "MIM",
      id: "magic-internet-money",
    },
    {
      icon: "https://static.coinstats.app/coins/theta-tokenrot.png",
      name: "Theta Network",
      symbol: "THETA",
      id: "theta-token",
    },
    {
      icon: "https://static.coinstats.app/coins/TezosKe2SC.png",
      name: "Tezos",
      symbol: "XTZ",
      id: "tezos",
    },
    {
      icon: "https://static.coinstats.app/coins/FantomQxjPf.png",
      name: "Fantom",
      symbol: "FTM",
      id: "fantom",
    },
    {
      icon: "https://static.coinstats.app/coins/heliumrwY.png",
      name: "Helium",
      symbol: "HNT",
      id: "helium_hnt",
    },
    {
      icon: "https://static.coinstats.app/coins/compound-usd-coinY4B.png",
      name: "cUSDC",
      symbol: "CUSDC",
      id: "compound-usd-coin",
    },
    {
      icon: "https://static.coinstats.app/coins/MoneroxCKAn.png",
      name: "Monero",
      symbol: "XMR",
      id: "monero",
    },
    {
      icon: "https://static.coinstats.app/coins/the-graphdCm.png",
      name: "The Graph",
      symbol: "GRT",
      id: "the-graph",
    },
    {
      icon: "https://static.coinstats.app/coins/galarYY.png",
      name: "Gala",
      symbol: "GALA",
      id: "gala",
    },
    {
      icon: "https://static.coinstats.app/coins/KlaytnmW9JF.png",
      name: "Klaytn",
      symbol: "KLAY",
      id: "klay-token",
    },
    {
      icon: "https://static.coinstats.app/coins/EOSGAmMm.png",
      name: "EOS",
      symbol: "EOS",
      id: "eos",
    },
    {
      icon: "https://static.coinstats.app/coins/1594216225344.png",
      name: "IOTA",
      symbol: "MIOTA",
      id: "iota",
    },
    {
      icon: "https://static.coinstats.app/coins/pancakeswap-tokenbfr.png",
      name: "PancakeSwap",
      symbol: "CAKE",
      id: "pancakeswap-token",
    },
    {
      icon: "https://static.coinstats.app/coins/olympus1nf.png",
      name: "Olympus",
      symbol: "OHM",
      id: "olympus",
    },
    {
      icon: "https://static.coinstats.app/coins/arweavefsf.png",
      name: "Arweave",
      symbol: "AR",
      id: "arweave",
    },
    {
      icon: "https://static.coinstats.app/coins/internet-computer4kw.png",
      name: "Internet Computer",
      symbol: "ICP",
      id: "internet-computer",
    },
    {
      icon: "https://static.coinstats.app/coins/Harmonyz84Ap.png",
      name: "Harmony",
      symbol: "ONE",
      id: "harmony",
    },
    {
      icon: "https://static.coinstats.app/coins/bitcoin-cash-abc-2LnI.png",
      name: "Bitcoin Cash ABC",
      symbol: "BCHA",
      id: "bitcoin-cash-abc-2",
    },
    {
      icon: "https://static.coinstats.app/coins/flowSmF.png",
      name: "Flow",
      symbol: "FLOW",
      id: "flow",
    },
    {
      icon: "https://static.coinstats.app/coins/Loopring2KdYn.png",
      name: "Loopring",
      symbol: "LRC",
      id: "loopring",
    },
    {
      icon: "https://static.coinstats.app/coins/radixCWo.png",
      name: "Radix",
      symbol: "XRD",
      id: "radix",
    },
    {
      icon: "https://static.coinstats.app/coins/BitTorrent3802L.png",
      name: "BitTorrent",
      symbol: "BTT",
      id: "bittorrent-2",
    },
    {
      icon: "https://static.coinstats.app/coins/aaveZSi.png",
      name: "Aave",
      symbol: "AAVE",
      id: "aave",
    },
    {
      icon: "https://static.coinstats.app/coins/KusamatpZGF.png",
      name: "Kusama",
      symbol: "KSM",
      id: "kusama",
    },
    {
      icon: "https://static.coinstats.app/coins/QuantYOd3i.png",
      name: "Quant",
      symbol: "QNT",
      id: "quant",
    },
    {
      icon: "https://static.coinstats.app/coins/bitcoin-cash-svkYm.png",
      name: "Bitcoin SV",
      symbol: "BSV",
      id: "bitcoin-sv",
    },
    {
      icon: "https://static.coinstats.app/coins/amp-token91t.png",
      name: "Amp",
      symbol: "AMP",
      id: "amp-token",
    },
    {
      icon: "https://static.coinstats.app/coins/enjincoinUof.png",
      name: "Enjin Coin",
      symbol: "ENJ",
      id: "enjin-coin",
    },
    {
      icon: "https://static.coinstats.app/coins/1616753926594.png",
      name: "Stacks",
      symbol: "STX",
      id: "blockstack",
    },
    {
      icon: "https://static.coinstats.app/coins/Makerxxquk.png",
      name: "Maker",
      symbol: "MKR",
      id: "maker",
    },
    {
      icon: "https://static.coinstats.app/coins/ecashsfL.png",
      name: "eCash",
      symbol: "XEC",
      id: "ecash",
    },
    {
      icon: "https://static.coinstats.app/coins/ThorchainSDce2.png",
      name: "THORChain",
      symbol: "RUNE",
      id: "thorchain",
    },
    {
      icon: "https://static.coinstats.app/coins/huobi-btc2XB.png",
      name: "Huobi BTC",
      symbol: "HBTC",
      id: "huobi-btc",
    },
    {
      icon: "https://static.coinstats.app/coins/ZcashtcLvi.png",
      name: "Zcash",
      symbol: "ZEC",
      id: "zcash",
    },
    {
      icon: "https://static.coinstats.app/coins/theta-fuelJBy.png",
      name: "Theta Fuel",
      symbol: "TFUEL",
      id: "theta-fuel",
    },
    {
      icon: "https://static.coinstats.app/coins/NEOY4fUY.png",
      name: "NEO",
      symbol: "NEO",
      id: "neo",
    },
    {
      icon: "https://static.coinstats.app/coins/1638518507202.png",
      name: "Kadena",
      symbol: "KDA",
      id: "kadena",
    },
    {
      icon: "https://static.coinstats.app/coins/basic-attention-tokenbhU.png",
      name: "Basic Attention Token",
      symbol: "BAT",
      id: "basic-attention-token",
    },
    {
      icon: "https://static.coinstats.app/coins/kucoin-sharesNqa.png",
      name: "KuCoin Token",
      symbol: "KCS",
      id: "kucoin-shares",
    },
    {
      icon: "https://static.coinstats.app/coins/curve-dao-tokenDD2.png",
      name: "Curve DAO Token",
      symbol: "CRV",
      id: "curve-dao-token",
    },
    {
      icon: "https://static.coinstats.app/coins/1603372504064.png",
      name: "Celsius Network",
      symbol: "CEL",
      id: "celsius",
    },
    {
      icon: "https://static.coinstats.app/coins/Waves9jlmM.png",
      name: "Waves",
      symbol: "WAVES",
      id: "waves",
    },
    {
      icon: "https://static.coinstats.app/coins/huobi-tokenGkD.png",
      name: "Huobi Token",
      symbol: "HT",
      id: "huobi-token",
    },
    {
      icon: "https://static.coinstats.app/coins/celocil.png",
      name: "Celo",
      symbol: "CELO",
      id: "celo",
    },
    {
      icon: "https://static.coinstats.app/coins/fraxepT.png",
      name: "Frax",
      symbol: "FRAX",
      id: "frax",
    },
    {
      icon: "https://static.coinstats.app/coins/ethosGkP.png",
      name: "Voyager Token",
      symbol: "VGX",
      id: "ethos",
    },
    {
      icon: "https://static.coinstats.app/coins/Chilizo7VuK.png",
      name: "Chiliz",
      symbol: "CHZ",
      id: "chiliz",
    },
    {
      icon: "https://static.coinstats.app/coins/ECOMIkTq2m.png",
      name: "ECOMI",
      symbol: "OMI",
      id: "ecomi",
    },
    {
      icon: "https://static.coinstats.app/coins/HolowwK85.png",
      name: "Holo",
      symbol: "HOT",
      id: "holo",
    },
    {
      icon: "https://static.coinstats.app/coins/spell-tokenrfb.png",
      name: "Spell Token",
      symbol: "SPELL",
      id: "spell-token",
    },
    {
      icon: "https://static.coinstats.app/coins/Dash0FPAt.png",
      name: "Dash",
      symbol: "DASH",
      id: "dash",
    },
    {
      icon: "https://static.coinstats.app/coins/LINKRR314.png",
      name: "LINK",
      symbol: "LN",
      id: "link",
    },
    {
      icon: "https://static.coinstats.app/coins/convex-financeDFh.png",
      name: "Convex Finance",
      symbol: "CVX",
      id: "convex-finance",
    },
    {
      icon: "https://static.coinstats.app/coins/msolG0B.png",
      name: "Marinade staked SOL",
      symbol: "MSOL",
      id: "msol",
    },
    {
      icon: "https://static.coinstats.app/coins/1596713644608.png",
      name: "yearn.finance",
      symbol: "YFI",
      id: "yearn-finance",
    },
    {
      icon: "https://static.coinstats.app/coins/TrueUSDgdH0q.png",
      name: "TrueUSD",
      symbol: "TUSD",
      id: "trueusd",
    },
    {
      icon: "https://static.coinstats.app/coins/IoTeX3xTeX.png",
      name: "IoTeX",
      symbol: "IOTX",
      id: "iotex",
    },
    {
      icon: "https://static.coinstats.app/coins/compound-governance-tokenFHt.png",
      name: "Compound",
      symbol: "COMP",
      id: "compound-governance-token",
    },
    {
      icon: "https://static.coinstats.app/coins/NEXORqsiD.png",
      name: "NEXO",
      symbol: "NEXO",
      id: "nexo",
    },
    {
      icon: "https://coinstats.app/icons/fra.png",
      name: "Curve.fi Factory USD Metapool: Frax",
      symbol: "FRAX3CRV-f",
      id: "eth_frax3crv-f_0xd632f22692fac7611d2aa1c0d552930d43caed3b",
    },
  ];
  let sortedNames = names.sort();

  //reference
  let input = document.getElementById("inputtest");
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
          listItem.classList.add("list-itemstest");
          listItem.style.cursor = "pointer";
          listItem.onclick = function () {
            transaction.coinName = i.id;
            setTransaction({ ...transaction });
            input.value = i.name;
            removeElements();
          };

          //Display matched part in bold
          let word = "<b>" + i.name.substr(0, input.value.length) + "</b>";
          word += i.name.substr(input.value.length);
          word += " ● " + i.symbol + " ";
          word += `<img src=${i.icon} style="
          width: 40px; "  alt=${i.name} />`;
          //display the value in array
          listItem.innerHTML = word;
          document.querySelector(".listtest").appendChild(listItem);
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
  useEffect(() => {
    if (auth !== "user") {
      navigate("/signin");
      return null;
    }
  }, [auth]);
  return (
    <div>
      <div className="container d-flex flex-column align-items-center justify-content-center addTrans">
        {loading && <Loading />}

        <h2>Add Transaction</h2>
        <div>
          <form
            onClick={forceUpdate}
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
          placeholder="Price when you buy"
          onChange={(e) => {
            transaction.tranPrice = e.target.value;
            setTransaction({ ...transaction });
          }}
          onKeyPress={(e) =>
            e.key === "Enter" && document.getElementById("submit__btn").click()
          }
          name="totalCost"
        />
        <button onClick={hundleSubmit} id="submit__btn" className="submit__btn">
          Add
        </button>
      </div>
    </div>
  );
}

export default AddTransaction;
