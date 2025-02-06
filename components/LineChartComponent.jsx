import { 
    LineChart, 
    Line, 
    CartesianGrid, 
    Legend, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis 
} from "recharts";
import { sortTransactions } from "@/utils/sorted";

const LineChartComponent = ({data}) => {
    const sortedData = sortTransactions(data, true);

    return (
        <div className="w-full sm:h-80 md:h-96 lg:h-[30rem] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                Gelir - Gider Grafiği
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sortedData} margin={{top:20, right:20, left:20, bottom:20}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#4caf50" />
                    <Line type="monotone" dataKey="expense" stroke="#f44336" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineChartComponent;
