export const TokenCard = ({symbol, name, uri, price, priceChange}: {
    symbol: string,
    name: string,
    uri: string,
    price: number,
    priceChange: number
})=>{
    return <div className="flex mx-1 my-1 py-3 px-4 justify-between hover:cursor-pointer hover:bg-[#202021]">
        <div className="flex">
            <img className="rounded-full w-16 h-16 mr-3" src={uri} alt="" />
            <div>
                <p className="text-white font-medium text-lg">{name}</p>
                <p className="text-gray-400">{symbol}</p>
            </div>
        </div>
        <div className="text-end">
            <p className="text-white text-lg font-medium font-sans self-end">${price?.toFixed(2)}</p>
            <p className={`${priceChange >= 0 ? 'text-green-500' : 'text-red-500'} text-sm`}>{priceChange>0 && "+"}{priceChange?.toFixed(2)}%</p>
        </div>

    </div>
}