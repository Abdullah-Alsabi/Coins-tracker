import "./components/signin-signup-nav-footer.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import { useState } from "react";
import userStatus from "./components/userStatus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
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
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
          </Routes>
        </Router>
      </div>
    </userStatus.Provider>
  );
}

export default App;
