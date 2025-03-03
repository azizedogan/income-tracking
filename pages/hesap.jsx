"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import Spinner from "@/components/Spinner";
import Head from "next/head";

function Hesap() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    newPassword: "",
    currentPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    async function fetchUserData() {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData((prevData) => ({
            ...prevData,
            email: userSnap.data().email,
          }));
        }
      } catch (error) {
        setError("Bilgiler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const mapFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Mevcut şifreniz hatalı. Lütfen tekrar deneyin.";
      case "auth/weak-password":
        return "Yeni şifreniz çok zayıf. Lütfen en az 6 karakterden oluşan bir şifre belirleyin.";
      case "auth/email-already-in-use":
        return "Bu e-posta adresi zaten kullanımda. Lütfen farklı bir e-posta deneyin.";
      case "auth/requires-recent-login":
        return "Güvenlik nedeniyle şifrenizi değiştirmek için tekrar giriş yapmanız gerekmektedir.";
      case "auth/user-not-found":
        return "Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.";
      case "auth/network-request-failed":
        return "İnternet bağlantınızı kontrol edin ve tekrar deneyin.";
      default:
        return "Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin.";
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);

      if(!userSnap.exists()) {
        await setDoc(userRef, {email: userData.email});
      } else {
        await updateDoc(userRef, {
          email: userData.email,
        });
      }

      if (userData.newPassword) {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, userData.currentPassword);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, userData.newPassword); 
      }

      setUserData({
        email: userData.email,
        newPassword: "",
        currentPassword: "",
      });

      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      const errorMessage = mapFirebaseError(error.code);
      setError(errorMessage || "Bilgiler güncellenirken bir hata oluştu.");
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Head>
        <title>Hesap / Gelir-Gider Takip</title>
      </Head>
      <div className="container mx-auto pt-5 px-6 fixed left-[200px]">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md rounded-md mt-6 sm:mt-10">
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">Hesap Bilgileri</h2>

            {success && <p className="text-green-500 text-center">Bilgiler Güncellendi!</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-Posta</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">E-Posta adresiniz değiştirilemez.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mevcut Şifre</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={userData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Yeni Şifre</label>
                <input
                  type="password"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Güncelle
              </button>
            </form>
          </div>
        </div>
      </div>

  </>
);
}

export default Hesap;
