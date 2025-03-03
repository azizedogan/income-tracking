"use client";

import React, { useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";

function Gider() {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const { user, showAuthPopup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if(!amount || !category || !paymentType || !date) return;
        if (!user) {
            showAuthPopup();
            return;
        }

        const newTransaction = {
            amount: Number(amount),
            category,
            paymentType,
            description,
            date,
            type: "Gider",
        };

        try {
            const transactionsCollection = collection(db, "transactions", user.uid,"userTransactions");

            await addDoc(transactionsCollection, newTransaction);

            setAmount("");
            setCategory("");
            setPaymentType("");
            setDescription("");
            setDate("");

        } catch(error) {
            throw error;
        }
    }  

    return (
        <>
            <Head>
                <title>Gider / Gelir-Gider Takiip</title>
            </Head>

            <div className="w-[40%] container rounded-lg shadow-lg p-4 mb-5">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Gider Ekleme Formu
                    </h2>
                </div>

                <form className="py-8 px-6 sm:px-12 text-lg space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Gider Miktarı</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            placeholder="Miktar (TL)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Kategori</label>
                        <select 
                            name="category" 
                            required 
                            className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Seç</option>
                            <option value="Alışveriş">Alışveriş</option>
                            <option value="Araba">Araba</option>
                            <option value="Cep Telefonu">Cep Telefonu</option>
                            <option value="Diğer Gider">Diğer Gider</option>
                            <option value="Eğitim">Eğitim</option>
                            <option value="Eğlence">Eğlence</option>
                            <option value="Elektrik">Elektrik</option>
                            <option value="Ev">Ev</option>
                            <option value="Evcil Hayvan">Evcil Hayvan</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Faturalar">Faturalar</option>
                            <option value="Gıda">Gıda</option>
                            <option value="Hediye">Hediye</option>
                            <option value="Hobi">Hobi</option>
                            <option value="Kırtasiye">Kırtasiye</option>
                            <option value="Kira">Kira</option>
                            <option value="Kişisel Bakım">Kişisel Bakım</option>
                            <option value="Kredi">Kredi</option>
                            <option value="Market">Market</option>
                            <option value="Mobilya">Mobilya</option>
                            <option value="Sağlik">Sağlık</option>
                            <option value="Sigorta">Sigorta</option>
                            <option value="Spor">Spor</option>
                            <option value="Tatil">Tatil</option>
                            <option value="Ulaşım">Ulaşım</option>
                            <option value="Vergi">Vergi</option>
                            <option value="Yatırım Giderleri">Yatırım Giderleri</option>
                            <option value="Yemek">Yemek</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Ödeme Şekli</label>
                        <select 
                            name="paymentType" 
                            required 
                            className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <option value="">Seç</option>
                            <option value="Nakit">Nakit</option>
                            <option value="Banka">Banka</option>
                            <option value="Kredi Kartı">Kredi Kartı</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Açıklama</label>
                        <textarea 
                            name="description" 
                            cols="30" 
                            rows="2" 
                            className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                            placeholder="İsteğe Bağlı"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Tarih Seçin</label>
                        <input 
                            type="date" 
                            name="date"
                            required
                            className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit" 
                            className="flex items-center gap-2 px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
}

export default Gider;
