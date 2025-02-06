export function sortTransactions(data, isAscending = true) {
    return data.sort((a,b) => {
        const dataA = new Date(a.date);
        const dataB = new Date(b.date);
        return isAscending ? dataA - dataB : dataB - dataA;
    });
}