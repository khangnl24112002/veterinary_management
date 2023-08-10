import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    // get token from localStorage
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  // set token as initial state
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    // Set token argument to localStorage
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken();
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
