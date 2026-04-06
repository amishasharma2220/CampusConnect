import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [userName, setUserName] = useState("Student");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);