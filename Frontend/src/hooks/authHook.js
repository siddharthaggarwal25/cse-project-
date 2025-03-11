import { useState, useCallback, useEffect } from "react";

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [credit, setCredit] = useState(false);

  // Login function to initialize auth state
  const login = useCallback((uid, token, currentCredit, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setCredit(currentCredit);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        credit: currentCredit,
      })
    );
  }, []);

  // Logout function to clear auth state
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setCredit(null);
    localStorage.removeItem("userData");
  }, []);

  // Function to update credit dynamically
  const updateCredit = useCallback((newCredit) => {
    setCredit(newCredit);

    // Update local storage to persist changes
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      storedData.credit = newCredit;
      localStorage.setItem("userData", JSON.stringify(storedData));
    }
  }, []);

  // Auto logout based on token expiration
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Restore auth state from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.credit, // Ensure credit is restored
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, credit, updateCredit };
};

export default useAuth;
