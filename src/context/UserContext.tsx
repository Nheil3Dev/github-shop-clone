"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: {
    username: string;
    email: string;
    jwt: string;
  };
  login: (props: { username: string; email: string; jwt: string }) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    jwt: "",
  });

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("jwt");
    setUser({
      username: "",
      email: "",
      jwt: "",
    });
  };

  const login = ({
    username,
    email,
    jwt,
  }: {
    username: string;
    email: string;
    jwt: string;
  }) => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("jwt", jwt);
    setUser({
      username,
      email,
      jwt,
    });
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const jwt = localStorage.getItem("jwt");

    if (username && jwt && email) {
      setUser({
        username,
        email,
        jwt,
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
