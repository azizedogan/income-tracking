"use server";

function Filter({data, onFilter}) {
    const handleFilterChange = (filterType) => {
     let filtered = [...data];

     if(filterType === "newToOld") {
        filtered.sort((a,b) => new Date(b.date) - new Date(a.date));
     } else if (filterType === "oldToNew") {
        filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
     } else if(filterType === "highestAmount") {
        filtered.sort((a,b) => b.amount - a.amount);
     } else if(filterType === "lowestAmount") {
        filtered.sort((a,b) => a.amount - b.amount);
     }

     onFilter(filtered);
    }

    return (
        <div className="mb-4">
            <select  
                onChange={(e) => handleFilterChange(e.target.value)} 
                className="mx-9 px-4 p-2 border rounded-md bg-white text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Seçim Yapınız</option>
                <option value="newToOld">Tarihe Göre(Yeni - Eski)</option>
                <option value="oldToNew">Tarihe Göre(Eski- Yeni)</option>
                <option value="highestAmount">En Yüksek Miktar</option>
                <option value="lowestAmount">En Düşük Miktar</option>
            </select>
        </div>
    );
}

export default Filter;
