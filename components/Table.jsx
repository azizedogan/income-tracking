import { db } from "@/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useTransaction } from "@/context/TransactionContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import Spinner from "./Spinner";
import ToggleMenu from "./ToggleMenu";

function Table({onEdit, menuOpen, setMenuOpen, data}) {
    const { transactions, setTransactions } = useTransaction();
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();

    const handleMenuToggle = (id) => {
        setMenuOpen(menuOpen === id ? null : id);
    }

    const handleDelete = async (id) => {
        if(!user) return;

        try {
            const transactionDel = doc(db, `transactions/${user.uid}/userTransactions`, id);
            await deleteDoc(transactionDel);

            setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
            setMenuOpen(null);
        } catch(error) {
            throw error;
        }
    }

    const fetchUserData = async(userId) => {
        try {
            setLoading(true);
            const userTransactionsRef = collection(db, `transactions/${userId}/userTransactions`);
            const querySnapshot = await getDocs(userTransactionsRef);

            return querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

        } catch(error) {
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user) {
            fetchUserData(user.uid)
            .then((data) => {
                setTransactions(data);
            }).catch((error) =>{
                throw error;
            });
        }
    }, [user, setTransactions]);

    if(loading) return <Spinner />;

    return (
        <>
            {transactions.length > 0 ? (
                <div className="w-[1300px] mx-auto border border-gray-300 rounded-lg p-4 shadow-lg dark:border-gray-800">
                    <div className="hidden md:flex bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex-1 text-left font-semibold text-gray-600 dark:text-gray-200">
                            Tarih
                        </div>
                        <div className="flex-1 text-left font-semibold text-gray-600 dark:text-gray-200">
                            Kategori
                        </div>
                        <div className="flex-1 text-left font-semibold text-gray-600 dark:text-gray-200">
                            Ödeme Şekli
                        </div>
                        <div className="flex-[2] text-left font-semibold text-gray-600 dark:text-gray-200">
                            Açıklama
                        </div>
                        <div className="flex-1 text-left font-semibold text-gray-600 dark:text-gray-200">
                            Miktar
                        </div>
                        <div className="w-8"></div>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        {data.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm"
                            >
                                <div className="flex-1 text-left text-sm text-gray-800 dark:text-gray-100 md:text-base">
                                    {new Date(transaction.date).toLocaleDateString()}
                                </div>

                                <div className="flex-1 text-left text-sm text-gray-800 dark:text-gray-100 md:text-base">
                                    {transaction.category}
                                </div>

                                <div className="flex-1 text-left text-sm text-gray-800 dark:text-gray-100 md:text-base">
                                    {transaction.paymentType}
                                </div>

                                <div className="flex-[2] text-left text-sm text-gray-800 dark:text-gray-100 md:text-base">
                                    {transaction.description || "-"}
                                </div>

                                <div
                                    className={`flex-1 text-left text-sm md:text-base ${
                                        transaction.type === "Gelir"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {transaction.amount}
                                </div>

                                <div className="w-8 text-center relative">
                                    <button
                                        className="p-2 text-gray-600 hover:text-gray-800"
                                        onClick={() => handleMenuToggle(transaction.id)}
                                    >
                                        <HiEllipsisHorizontal size={24} />
                                    </button>
                                    {menuOpen === transaction.id && (
                                        <ToggleMenu
                                            transaction={transaction}
                                            handleEdit={onEdit}
                                            menuOpen={menuOpen}
                                            handleDelete={handleDelete}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-8">
                    <p 
                        className="text-3xl text-gray-600 mb-8"
                    >
                        Siz de verilerinizi eklemeye başlayın!
                    </p>
                    <Link 
                        href="/gelir" 
                        className="mr-4 px-4 py-4 bg-green-200 text-black text-2xl rounded-lg hover:bg-green-300"
                    >
                        Gelir Ekleyin
                    </Link>
                    <Link 
                        href="/gider" 
                        className="px-4 py-4 bg-red-200 text-black text-2xl rounded-lg hover:bg-red-300"
                    >
                        Gider Ekleyin
                    </Link>
                </div>
            )}
        </>
    );
}

export default Table;
