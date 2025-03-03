"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { TransactionProvider } from "@/context/TransactionContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import AuthPopup from "@/components/AuthPopup";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <>
      <Head>
        <title>Gelir-Gider Takip</title>
      </Head>
      <div className={`${theme}`}>
        <AuthProvider>
          <TransactionProvider>
            <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
            
            <div className="relative">
            <Sidebar />

              <div className="w-full container mt-36 me-1">
                <AuthPopupWrapper>
                  <Component {...pageProps} />
                </AuthPopupWrapper>
              </div>
            </div>
          </TransactionProvider>
        </AuthProvider>
      </div>
    </>
  );
}

const AuthPopupWrapper = ({ children }) => {
  const { authPopupVisible, hideAuthPopup } = useAuth();

  return (
    <>
      {authPopupVisible && <AuthPopup closePopup={hideAuthPopup} />}
      {children}
    </>
  );
};