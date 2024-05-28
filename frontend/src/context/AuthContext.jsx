import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user-auth') )|| null);

  return <AuthContext.Provider value={{authUser, setAuthUser}}>
    {children}
    </AuthContext.Provider>;
}
