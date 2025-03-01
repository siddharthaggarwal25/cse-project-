import React from "react"
const AuthContext = React.createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
  });
  
  export default AuthContext;
  
