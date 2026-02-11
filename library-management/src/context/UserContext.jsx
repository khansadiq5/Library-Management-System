import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // userData contains { name, email, password }
    setUser(userData);
    console.log("User Logged In:", userData.name);
  };

  const signup = (userData) => {
    setUser(userData);
    console.log("User Signed Up:", userData.name);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};