import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Coin() {
  const { id } = useParams();
  const [Coindetails, setCoindetails] = useState({});
  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/coins/" + id + "?currency=USD")
      .then((res) => {
        console.log(res.data.coin);
        setCoindetails(res.data.coin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(Coindetails);
  

  return <div>Welcome {id}</div>;
}

export default Coin;
