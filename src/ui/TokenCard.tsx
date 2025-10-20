export const TokenCard = ({token}: {
        token: any
    })=>{
    
    const imageUrl = token.icon;
    const price = token.usdPrice;
    const priceChange = token.stats24h.priceChange;

    return <div className="flex mx-1 my-1 py-3 sm:py-4 px-3 sm:px-4 justify-between hover:cursor-pointer hover:bg-[#202021] active:bg-[#202021] touch-manipulation min-h-[72px]">
        <div className="flex items-center">
            <img className="rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-2 sm:mr-3 flex-shrink-0" src={imageUrl} alt={token.name || ""} />
            <div className="min-w-0">
                <p className="text-white font-medium text-sm sm:text-base md:text-lg truncate">{token.name}</p>
                <p className="text-gray-400 text-xs sm:text-sm truncate">{token.symbol}</p>
            </div>
        </div>
        <div className="text-end ml-2 flex-shrink-0">
            <p className="text-white text-sm sm:text-base md:text-lg font-medium font-sans">${price?.toFixed(4)}</p>
            <p className={`${priceChange >= 0 ? 'text-green-500' : 'text-red-500'} text-xs sm:text-sm`}>
                {priceChange > 0 && "+"}
                {priceChange?.toFixed(2)}%
            </p>
        </div>

    </div>
}