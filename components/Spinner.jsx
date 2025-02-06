function Spinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div 
                className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
                role="status"
                aria-label="Loading"
            >
            </div>
        </div>
    )
}

export default Spinner;
