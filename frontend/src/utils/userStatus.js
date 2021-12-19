import { createContext } from "react";

const userStatus = createContext({
  auth: "none",
  setAuth: (a) => {},
});

export default userStatus;
