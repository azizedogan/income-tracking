function Stat({ icon, title, value, color }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 flex items-center space-x-8">
            <div className="flex-shrink-0 w-20 h-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <svg className="w-8 h-8" color={color}>
                    {icon}
                </svg>
            </div>

            <div className="flex flex-col">
                <h5 className="text-[1.2rem] uppercase tracking-[0.4px] font-semibold text-gray-600 dark:text-gray-400">
                    {title}
                </h5>

                <p className="text-[2rem] leading-[1] font-medium text-gray-800 dark:text-gray-100">{value}</p>
            </div>
        </div>
    );
}

export default Stat;
