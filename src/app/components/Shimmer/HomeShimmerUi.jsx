
const HomeShimmerUi = () => {
    return (
        <div className="border rounded-lg shadow-lg overflow-hidden bg-gray-300 animate-pulse">
            <div className="relative w-full h-64 bg-gray-400"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-400 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-400 rounded w-full"></div>
            </div>
        </div>
    );
}

export default HomeShimmerUi