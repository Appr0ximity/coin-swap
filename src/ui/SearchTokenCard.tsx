import axios from "axios"
import { useEffect, useState } from "react"
import { TokenCard } from "./TokenCard"
import { useAtom, useSetAtom } from "jotai"
import { allTokensAtom, fromTokenAtom, searchingAtom, toTokenAtom } from "../atoms"

export const SearchTokenCard = ({fromOrTo} : {fromOrTo: "FROM" | "TO"})=>{
    const [tokens, setTokens] = useAtom(allTokensAtom)
    const[query, setQuery] = useState("")
    const setSearching = useSetAtom(searchingAtom)
    const setFromToken = useSetAtom(fromTokenAtom)
    const setToToken = useSetAtom(toTokenAtom)


    useEffect(()=>{
        axios(`https://lite-api.jup.ag/tokens/v2/search?query=${query}`).then((res)=>{
            setTokens(res.data || [])
        }).catch((err)=>{
            console.log(err)
            setTokens([])
        })
    },[query])

    const handleTokenSelect = (token: any) => {
        const selectedToken = {
            id: token.id,
            name: token.name,
            symbol: token.symbol,
            uri: token.icon,
            price: token.usdPrice,
            priceChange: token.stats24h.priceChange,
            amount: 0,
            decimals: token.decimals
        }
        
        if (fromOrTo === "FROM") {
            setFromToken(selectedToken)
        } else {
            setToToken(selectedToken)
        }
        setSearching(false)
    }

    return <div className="flex w-full">
        <div className="text-white flex-shrink-0">
            <button onClick={()=>{setSearching(false)}} type="button" className="relative mr-2 sm:mr-3 z-10 mx-auto block text-white hover:bg-[#141417] active:bg-[#141417] bg-[#343437] font-medium rounded-full text-sm p-2.5 sm:p-3 rotate-90 hover:cursor-pointer touch-manipulation">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v12m0 0L1 9m4 4l4-4"/>
                </svg>
            </button>
            </div>
        <div className="bg-[#141417] flex-1 rounded-lg sm:rounded-xl overflow-hidden">
            <input onChange={e=> setQuery(e.target.value)} type="text" placeholder="Search for the required token" className="text-white px-4 sm:px-10 py-3 sm:py-4 w-full text-base sm:text-xl md:text-2xl bg-transparent border-none outline-none"/>
            <div className="max-h-[60vh] overflow-y-auto">
                {tokens.map((token: any, index: number)=>{
                    return <div key={token.id || token.address || index} onClick={() => handleTokenSelect(token)}>
                        <TokenCard token={token}></TokenCard>
                    </div>
                })}
            </div>
        </div>
    </div>
}