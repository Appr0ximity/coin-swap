import { useEffect, useState } from "react"
import { SwapInputCard } from "../ui/SwapInputCard"
import { SearchTokenCard } from "../ui/SearchTokenCard"

export const Swap = ()=>{

    const [fromToken, setFromToken] = useState({
        symbol: "FROM TOKEN",
        amount: 0
    })
    const [toToken, setToToken] = useState({
        symbol: "TO TOKEN",
        amount: 0
    })
    const [notSearching, setNotSearching] = useState(true)

    const searchToken = ()=>{
        setNotSearching(false)
    }

    useEffect(()=>{
        
    },[fromToken])

    const flipTokens = ()=>{
        const temp = fromToken
        setFromToken(toToken)
        setToToken(temp)
    }

    return <div className="flex justify-center items-center min-h-[40vh]">
        {notSearching && <div className="text-white">
            <div onClick={searchToken} id="from">
                <SwapInputCard token={fromToken} onAmountChange={(amount) => setFromToken({
                ...fromToken, amount
                })}></SwapInputCard>
            </div>
            <button onClick={flipTokens} type="button" className="relative z-10 -my-6 mx-auto block text-white bg-[#141417] hover:bg-[#343437] font-medium rounded-full text-sm p-2.5 hover:rotate-180 duration-200">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v12m0 0L1 9m4 4l4-4"/>
                </svg>
            </button>
            <div onClick={searchToken} id="to">
                <SwapInputCard token={toToken} onAmountChange={(amount) => setToToken({
                ...toToken, amount
                })}></SwapInputCard>
            </div>
            <button className="rounded-3xl font-semibold bg-white text-black py-3 px-14 mx-auto block mt-3 hover:bg-gray-300 hover:cursor-pointer">Connect Wallet</button>
            <p className="text-center text-sm mt-4 text-gray-300">Swap transaction</p>
        </div>}
        {!notSearching && <div>
            <SearchTokenCard></SearchTokenCard>
        </div>
        }
    </div>
}