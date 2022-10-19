import React, { useState } from "react";
import UserContext from "./userConext";

const UserState = (props) => {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
