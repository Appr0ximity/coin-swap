import { useAtom } from "jotai"
import "./SwapInputCard.css"
import { fromTokenAtom, toTokenAtom } from "../atoms"

export const SwapInputCard = ({fromOrTo}: {fromOrTo: "FROM"|"TO"})=>{

    const [token, setToken] = fromOrTo === "FROM" ? useAtom(fromTokenAtom) : useAtom(toTokenAtom)

    return <div className="bg-[#141417] group hover:cursor-pointer pt-5 pb-8 px-7 min-w-[30vw] my-1">
        <p className="text-gray-400 text-sm mb-6">Pay on Solana</p>
        <div className="flex justify-between items-baseline">
            <div className="flex text-4xl items-baseline">
                <input 
                    onChange={(e)=> {
                        setToken({
                            ...token,
                            amount: parseFloat(e.target.value) || 0
                        })
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="0" 
                    type="number" 
                    className="field-sizing-content min-w-4 z-10"
                />
                <p className="mx-5 group-hover:text-blue-500">{token.symbol}</p>
            </div>
            <p className="text-sm text-gray-500">$ 0.45</p>
        </div>
    </div>
}