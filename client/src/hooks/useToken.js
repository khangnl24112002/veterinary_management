import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    // get token from localStorage
    const tokenString = localStorage.getItem("accessToken");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  // set token as initial state
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    // Set token argument to localStorage
    localStorage.setItem("accessToken", JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
    setToken();
  };

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
