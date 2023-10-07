import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
}
