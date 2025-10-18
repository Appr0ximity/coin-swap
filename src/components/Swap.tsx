import { useState } from "react"
import { SwapInputCard } from "../ui/SwapInputCard"
import { SearchTokenCard } from "../ui/SearchTokenCard"
import { useAtom } from "jotai"
import { fromTokenAtom, searchingAtom, toTokenAtom } from "../atoms"

export const Swap = ()=>{

    const [fromToken, setFromToken] = useAtom(fromTokenAtom)
    const [toToken, setToToken] = useAtom(toTokenAtom)
    const [searching, setSearching] = useAtom(searchingAtom)
    const [fromOrTo, setFromOrTo] =  useState<"TO" | "FROM">("FROM")

    const searchFromToken = ()=>{
        setFromOrTo("FROM")
        setSearching(true)
    }

    const searchToToken = ()=>{
        setFromOrTo("TO")
        setSearching(true)
    }

    const flipTokens = async () => {
        const temp = fromToken;
        const newFromToken = {...toToken};
        const newToToken = {...temp};
        setFromToken(newFromToken);
        setToToken(newToToken);
        if (newFromToken.amount > 0 && newFromToken.id && newToToken.id) {
            const amountInSmallestUnit = Math.floor(newFromToken.amount * Math.pow(10, newFromToken.decimals));
            try {
                const orderResponse = await fetch(`https://lite-api.jup.ag/ultra/v1/order?inputMint=${newFromToken.id}&outputMint=${newToToken.id}&amount=${amountInSmallestUnit}`)
                .then(res => res.json());
                if (orderResponse.outAmount) {
                    setToToken({
                        ...newToToken,
                        amount: (orderResponse.outAmount / Math.pow(10, newToToken.decimals)) || 0
                    });
                }
            } catch (error) {
                console.error('Error fetching swap quote:', error);
            }
        }
    }

    return <div className="flex justify-center items-center min-h-[40vh]">
        {!searching && <div className="text-white">
            <div onClick={searchFromToken} id="from">
                <SwapInputCard fromOrTo="FROM"></SwapInputCard>
            </div>
            <button onClick={flipTokens} type="button" className="relative z-10 -my-6 mx-auto block text-white bg-[#141417] hover:bg-[#343437] font-medium rounded-full text-sm p-2.5 hover:rotate-180 duration-200">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v12m0 0L1 9m4 4l4-4"/>
                </svg>
            </button>
            <div onClick={searchToToken} id="to">
                <SwapInputCard fromOrTo="TO"></SwapInputCard>
            </div>
            <button className="rounded-3xl font-semibold bg-white text-black py-3 px-14 mx-auto block mt-3 hover:bg-gray-300 hover:cursor-pointer">Connect Wallet</button>
            <p className="text-center text-sm mt-4 text-gray-300">1 {fromToken.name} = {toToken.amount/fromToken.amount} {toToken.name}</p>
        </div>}
        {searching && <div>
            <SearchTokenCard fromOrTo={fromOrTo}></SearchTokenCard>
        </div>
        }
    </div>
}