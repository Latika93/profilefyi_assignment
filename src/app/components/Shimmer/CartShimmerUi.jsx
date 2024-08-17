
const CartShimmerUi=() => {
    return (
        <div className="border-b pb-4 mb-4 flex items-center animate-pulse">
            <div className="w-20 h-20 bg-gray-300 rounded"></div>
            <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-300 rounded w-12"></div>
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}

export default CartShimmerUi