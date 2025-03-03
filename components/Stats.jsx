"use client";

import { useTransaction } from "@/context/TransactionContext";
import { HiArrowTrendingDown, HiArrowTrendingUp, HiOutlineCircleStack } from "react-icons/hi2";
import Stat from "./Stat";

function Stats() {
    const { transactions } = useTransaction();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        const totalAmount = Number(transaction.amount) || 0;
        if(transaction.type === "Gelir") {
            totalIncome += totalAmount;
        } else if(transaction.type === "Gider") {
            totalExpense += totalAmount;
        }
    });

    const balance = totalIncome - totalExpense;

    return (
        <>
            <Stat
                icon={<HiArrowTrendingUp size={30} />}
                title="Gelir"
                value={`${totalIncome.toLocaleString()} ₺`}
                color="#00b300"

            />
            <Stat
                icon={<HiArrowTrendingDown size={30} />}
                title="Gider"
                value={`${totalExpense.toLocaleString()} ₺`}
                color="#ff3333"
             />
            <Stat
                icon={<HiOutlineCircleStack size={30} />}
                title="Mevcut"
                value={`${balance.toLocaleString()} ₺`}
                color={balance >= 0 ? "#0000FF" : "#ff3333"}
             />
        </>
    );
}

export default Stats;
