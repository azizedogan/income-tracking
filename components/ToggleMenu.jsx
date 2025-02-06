import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

function ToggleMenu({menuOpen, transaction, handleEdit, handleDelete}) {
    return (
        menuOpen === transaction.id && (
            <div className="absolute top-5 right-0 mt-2 w-40 z-10 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md" role="menu" aria-label="Transaction menu">
                <button
                 onClick={() => handleEdit(transaction)}
                 className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                 tabIndex={0}
                >
                    <HiOutlinePencilSquare /> Düzenle
                </button>
                <button
                 onClick={() => handleDelete(transaction.id)}
                 className="flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                 tabIndex={0}
                >
                    <HiOutlineTrash /> Sil
                </button>
            </div>    
        )
    );
}

export default ToggleMenu;
