import { createContext } from "react";

const userStatus = createContext({
  auth: false,
  setAuth: (a) => {},
});

export default userStatus;
