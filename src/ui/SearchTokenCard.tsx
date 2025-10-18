import axios from "axios"
import { useEffect, useState } from "react"
import { TokenCard } from "./TokenCard"

export const SearchTokenCard = ()=>{
    const[tokens, setTokens] = useState<any[]>([])
    const[query, setQuery] = useState("")


    useEffect(()=>{
        axios(`https://lite-api.jup.ag/tokens/v2/search?query=${query}`).then((res)=>{
            setTokens(res.data || [])
        }).catch((err)=>{
            console.log(err)
            setTokens([])
        })
    },[query])

    return <div className="bg-[#141417] min-w-[30vw]">
        <input onChange={e=> setQuery(e.target.value)} type="text" placeholder="Search for the required token" className="text-white px-10 py-4 min-w-[30vw] text-2xl"/>
        {tokens.map((token)=>{
            return <TokenCard name={token.name} symbol={token.symbol} uri={token.icon} price={token.usdPrice} priceChange={token.stats24h.priceChange}></TokenCard>
        })}
    </div>
}