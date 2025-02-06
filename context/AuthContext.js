import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authPopupVisible, setAuthPopupVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const showAuthPopup = () => setAuthPopupVisible(true);
  const hideAuthPopup = () => setAuthPopupVisible(false);

  return (
    <AuthContext.Provider
      value={{ user, loading, authPopupVisible, showAuthPopup, hideAuthPopup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
