import { useState } from "react";
import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

function EditFormModal({transaction, onSave, onCancel, setMenuOpen, userId}) {
    const [formData, setFormData] = useState(transaction);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if(!userId) {
                return;
            }

            const transactionDoc = doc(db, "transactions", userId, "userTransactions", formData.id);
            await updateDoc(transactionDoc, formData);

            onSave(formData);

            setMenuOpen(null);
        } catch(error) {
            throw error;
        }

        setMenuOpen(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-lg w-full p-6 sm:p-10 rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Düzenleme</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tarih</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Kategori</label>
                        <input 
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ödeme Şekli</label>
                        <input 
                            type="text"
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Açıklama</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Miktar</label>
                        <input 
                            type="number" 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleChange} 
                            className="w-full mt-1 border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button 
                            type="button" 
                            onClick={onCancel} 
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-gray-400"
                        >
                            İptal
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-400"
                        >
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditFormModal;
