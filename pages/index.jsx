"use Client";

import { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useTransaction } from "@/context/TransactionContext";
import { useAuth } from "@/context/AuthContext";

import Stats from "@/components/Stats";
import LineChartComponent from "@/components/LineChartComponent";

export default function Home() {
  const [data, setData] = useState([]);
  const { setTransactions } = useTransaction();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchAndFormatData() {
      if(!user || !user.uid) return;

        try {
          const q = collection(db, "transactions", user.uid, "userTransactions");
          const snapshot = await getDocs(q);

          const transactions = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              ...data, 
              date: data.date && data.date?.toDate ? data.date.toDate() : new Date(data.date),
              amount: Number(data.amount),
            };
          });

          setTransactions(transactions);

          const groupedData = transactions.reduce((acc, transaction) => {
            const dateKey = transaction.date.toISOString().split("T")[0];

            if (!acc[dateKey]) {
                acc[dateKey] = { date: dateKey, income: 0, expense: 0 };
            }

            if (transaction.type === "Gelir") {
                acc[dateKey].income += transaction.amount;
            } else if (transaction.type === "Gider") {
                acc[dateKey].expense += transaction.amount;
            }
            return acc;
          }, {});

          setData(Object.values(groupedData));
        } catch (error) {
            throw error;
        }
    }

    fetchAndFormatData();
  }, [user]);

  return (
    <main className="w-[80%] container ml-48">
        <div className="flex justify-evenly items-center shadow-md mb-16 py-1">
          <Stats />
        </div>

        <LineChartComponent data={data} />
    </main>
  );
}
