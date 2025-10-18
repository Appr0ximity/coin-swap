import "./SwapInputCard.css"

export const SwapInputCard = ()=>{
    return <div className="bg-[#141417] group hover:cursor-pointer py-5 px-10 min-w-[30vw] my-1">
        <p className="text-gray-400 text-sm mb-6">Pay on {}</p>
        <div className="flex justify-between items-baseline">
            <div className="flex text-4xl items-baseline">
                <input placeholder="0" type="number" className="field-sizing-content min-w-4"/>
                <p className="ml-5 group-hover:text-blue-500">ETH</p>
            </div>
            <p className="text-sm text-gray-500">$ 0.45</p>
        </div>
    </div>
}