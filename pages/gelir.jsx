import React, { useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";

function Gelir() {
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
            type: "Gelir",
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
                <title>Gelir / Gelir-Gider Takiip</title>
            </Head>

            <div className="fixed left-1/2 transform -translate-x-1/2 top-20 sm:top-24 md:top-28 
            bg-gray-100 dark:bg-gray-800 rounded-lg p-4 sm:p-5 shadow-lg 
            w-[95%] sm:w-[90%] md:w-[80%] max-w-[600px]">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        Gelir Ekleme Formu
                    </h2>
                </div>

                <form className="py-8 px-6 sm:px-12 text-lg space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Gelir Miktarı</label>
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
                            <option value="Bonus">Bonus</option>
                            <option value="Diğer Gelir">Diğer Gelir</option>
                            <option value="Emeklilik">Emeklilik</option>
                            <option value="İş">İş</option>
                            <option value="Maaş">Maaş</option>
                            <option value="Ödenek">Ödenek</option>
                            <option value="Yatırım Geliri">Yatırım Geliri</option>
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
                            <option value="Kart">Kart</option>
                            <option value="Diğer">Diğer</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-gray-700 dark:text-gray-300">Açıklama</label>
                        <textarea 
                            name="description" 
                            cols="30" 
                            rows="3" 
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

export default Gelir;
