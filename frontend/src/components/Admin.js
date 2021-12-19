import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Loading from "./Loading";
import { Table, Button } from "react-bootstrap";
function Admin() {
  const [users, setusers] = useState([]);
  const [deleteduser, setdeleteduser] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get("/users/getusers")
      .then((res) => {
        console.log(res.data);
        setusers(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [deleteduser]);
  return (
    <div className="main-container">
      <h2>Welcome to Coins Tracker</h2>
      {loading && <Loading />}
      <div className="container_table">
        <Table striped bordered hover variant="light" className="table__css">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              return (
                <tr>
                  <td>
                    <span>{u.userName}</span>
                  </td>
                  <td>
                    <span>{u.email}</span>
                  </td>
                  <td>
                    {" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        setloading(true);

                        axios
                          .delete("/users/deleteuser/" + u._id)
                          .then((res) => {
                            setdeleteduser(res.data);
                            setloading(false);
                          })
                          .catch((err) => {
                            console.log(err);
                            setloading(false);
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Admin;
