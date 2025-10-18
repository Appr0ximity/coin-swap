export const TokenCard = ({token}: {
        token: any
    })=>{
    
    const imageUrl = token.icon;
    const price = token.usdPrice;
    const priceChange = token.stats24h.priceChange;

    return <div className="flex mx-1 my-1 py-3 px-4 justify-between hover:cursor-pointer hover:bg-[#202021]">
        <div className="flex">
            <img className="rounded-full w-16 h-16 mr-3" src={imageUrl} alt={token.name || ""} />
            <div>
                <p className="text-white font-medium text-lg">{token.name}</p>
                <p className="text-gray-400">{token.symbol}</p>
            </div>
        </div>
        <div className="text-end">
            <p className="text-white text-lg font-medium font-sans self-end">${price?.toFixed(4)}</p>
            <p className={`${priceChange >= 0 ? 'text-green-500' : 'text-red-500'} text-sm`}>
                {priceChange > 0 && "+"}
                {priceChange?.toFixed(2)}%
            </p>
        </div>

    </div>
}