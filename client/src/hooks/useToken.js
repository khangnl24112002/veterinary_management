import { useState } from "react";

export default function useToken() {
  const getTokens = () => {
    // get token from localStorage
    const accessTokenString = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(accessTokenString);
    const refreshTokenString = localStorage.getItem("refreshToken");
    const refreshToken = JSON.parse(refreshTokenString);
    return {
      accessToken,
      refreshToken,
    };
  };
  // set token as initial state
  const [tokens, setTokens] = useState(getTokens());

  const saveTokens = (accessToken, refreshToken) => {
    // Set token argument to localStorage
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    setTokens({ accessToken, refreshToken });
  };

  const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setTokens();
  };

  return {
    setTokens: saveTokens,
    tokens,
    removeTokens,
  };
}
