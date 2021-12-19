import "./components/signin-signup-nav-footer.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import { useState } from "react";
import userStatus from "./utils/userStatus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Coins from "./components/Coins";
import Coin from "./components/Coin";
import AddPortfolio from "./components/AddPortfolio";
import Portfolio from "./components/Portfolio";
import AllPortfolios from "./components/AllPortfolios";
import Transaction from "./components/Transaction";
import AddTransaction from "./components/AddTransaction";
import EditTransaction from "./components/EditTransaction";
import Search from "./components/Search";
import SignInAdmin from "./components/SignInAdmin";
function App() {
  let [auth, setAuth] = useState(false);

  // function getCookie(cname) {
  //   var arrayb = document.cookie.split(";");
  //   for (const item of arrayb) {
  //     if (item.startsWith("jwt=")) {
  //       return item.substr(4);
  //     }
  //   }
  // }
  // let token = getCookie("jwt");

  // const value = token;
  return (
    <userStatus.Provider value={{ auth, setAuth }}>
      <div className="App allButFooter">
        <NavBar />

        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signinadmin" element={<SignInAdmin />}></Route>

          <Route path="/coins" element={<Coins />}></Route>
          <Route path="/portfolios" element={<AllPortfolios />}></Route>
          <Route path="/portfolios/:id" element={<Portfolio />}></Route>
          <Route path="/addportfolio" element={<AddPortfolio />}></Route>
          <Route
            path="/transactions/edit/:id"
            element={<EditTransaction />}
          ></Route>
          <Route
            path="/portfolios/:id/addtransaction"
            element={<AddTransaction />}
          ></Route>
          <Route path="/coins/:id" element={<Coin />}></Route>
        </Routes>
      </div>
      <Footer />
    </userStatus.Provider>
  );
}

export default App;
