import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransaction() {
    return useContext(TransactionContext);
}
