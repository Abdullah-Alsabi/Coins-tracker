import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import userStatus from "../utils/userStatus";
import Loading from "./Loading";
function Profile() {
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [currentpassword, setcurrentpassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  let { auth, setAuth } = useContext(userStatus);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  let token;

  let userData;

  if (auth === "user") {
    token = document.cookie.split("jwt=")[1];
    userData = JSON.parse(atob(token.split(".")[1]));
  }
  useEffect(() => {
    if (auth !== "user") {
      navigate("/signin");
      return null;
    }

    axios
      .get(`/users/getuser/${userData.id._id}`)
      .then((res) => {
        setuserName(res.data.userName);
        setEmail(res.data.email);
        console.log(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function hundleUpdate() {
    const data = {
      currentPassword: currentpassword,
      newPassword: newPassword,
    };
    console.log(data);

    axios
      .put(`/users/updateuser/${userData.id._id}`, data)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }
  // if (loading) return <Loading />;
  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 headercolor">Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      onChange={(e) => {
                        // setuserName(e.target.value);
                      }}
                      defaultValue={userName}
                      disabled
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Enter Username"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      onChange={(e) => {
                        // setEmail(e.target.value);
                      }}
                      defaultValue={email}
                      disabled
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email "
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      onChange={(e) => {
                        setcurrentpassword(e.target.value);
                      }}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      onChange={(e) => {
                        setnewPassword(e.target.value);
                      }}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-center">
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      type="button"
                      id="submit"
                      name="submit"
                      className=" m-1 btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={hundleUpdate}
                      type="button"
                      id="submit"
                      name="submit"
                      className=" m-1 btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
