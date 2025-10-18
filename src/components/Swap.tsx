import { useState } from "react"
import { SwapInputCard } from "../ui/SwapInputCard"

export const Swap = ()=>{

    const [fromToken, setFromToken] = useState("SOL")
    const [toToken, setToToken] = useState("SOA")

    const flipTokens = ()=>{
        const temp = fromToken
        setFromToken(toToken)
        setToToken(temp)
    }

    return <div className="flex justify-center items-center min-h-[40vh]">
        <div className="text-white">
            <SwapInputCard token={fromToken}></SwapInputCard>
            <button onClick={flipTokens} type="button" className="relative z-10 -my-6 mx-auto block text-white bg-[#141417] hover:bg-[#343437] font-medium rounded-full text-sm p-2.5 hover:rotate-180 duration-200">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v12m0 0L1 9m4 4l4-4"/>
                </svg>
            </button>
            <SwapInputCard token={toToken}></SwapInputCard>
            <button className="rounded-3xl font-semibold bg-white text-black py-3 px-14 mx-auto block mt-3 hover:bg-gray-300 hover:cursor-pointer">Connect Wallet</button>
            <p className="text-center text-sm mt-4 text-gray-300">Swap transaction</p>
        </div>
    </div>
}