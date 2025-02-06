import { useEffect, useState } from "react";
import { useTransaction } from "@/context/TransactionContext";
import Table from "@/components/Table";
import EditFormModal from "@/components/EditFormModal";
import Filter from "@/components/Filter";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";

function SonIslemler() {
    const { transactions, setTransactions } = useTransaction();
    const [menuOpen, setMenuOpen] = useState(null);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [filteredData, setFilteredData] = useState(transactions);
    const { user } = useAuth();

    const handleSave = (updatedTransaction) => {
        setTransactions((prev) =>
            prev.map((transaction) =>
             transaction.id === updatedTransaction.id ? updatedTransaction : transaction
            )
        );
        setEditingTransaction(null);
    };

    const handleCancel = () => {
        setEditingTransaction(null);
        setMenuOpen(null);
    };

    const handleFilter = (data) => {
        setFilteredData(data);
    }

    useEffect(() => {
        setFilteredData(transactions);
    }, [transactions]);

    return (
        <>
            <Head>
                <title>Son İşlemler / Gelir-Gider Takip</title>
            </Head>
            <div className="container mx-auto pt-5 px-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-3xl font-semibold mb-8">Son İşlemler</h2>      
                    <Filter data={transactions} onFilter={handleFilter} />
                </div>

                {editingTransaction && (
                    <EditFormModal 
                        transaction={editingTransaction} 
                        onSave={handleSave} 
                        onCancel={handleCancel} 
                        setMenuOpen={setMenuOpen}
                        userId={user.uid}
                    />
                )}

                <Table 
                    data={filteredData}
                    setTransactions={setTransactions} 
                    menuOpen={menuOpen} 
                    setMenuOpen={setMenuOpen} 
                    onEdit={setEditingTransaction} 
                />
            </div>
        </>
    );
}

export default SonIslemler;
