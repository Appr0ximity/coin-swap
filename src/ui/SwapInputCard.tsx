import { useAtom } from "jotai"
import "./SwapInputCard.css"
import { fromTokenAtom, toTokenAtom } from "../atoms"

export const SwapInputCard = ({fromOrTo}: {fromOrTo: "FROM"|"TO"})=>{

    const [token, setToken] = fromOrTo === "FROM" ? useAtom(fromTokenAtom) : useAtom(toTokenAtom)
    const [otherToken, setOtherToken] = fromOrTo === "TO" ? useAtom(fromTokenAtom) : useAtom(toTokenAtom)

    return <div className="bg-[#141417] group hover:cursor-pointer pt-5 pb-8 px-7 min-w-[30vw] my-1">
        <p className="text-gray-400 text-sm mb-6">Pay on Solana</p>
        <div className="flex justify-between items-baseline">
            <div className="flex text-4xl items-baseline">
                <input
                    value={token.amount || ""} 
                    onChange={async (e)=> {
                        const inputAmount = parseFloat(e.target.value) || 0;
                        setToken({
                            ...token,
                            amount: inputAmount
                        })
                        
                        if (inputAmount > 0 && token.id && otherToken.id && token.decimals) {
                            // Convert to smallest unit (e.g., 1 SOL = 1000000000 lamports)
                            const amountInSmallestUnit = Math.floor(inputAmount * Math.pow(10, token.decimals));
                            
                            try {
                                const orderResponse = await (
                                    await fetch(
                                        `https://lite-api.jup.ag/ultra/v1/order?inputMint=${token.id}&outputMint=${otherToken.id}&amount=${amountInSmallestUnit}`
                                    )
                                ).json();

                                if (orderResponse.outAmount) {
                                    setOtherToken({
                                        ...otherToken,
                                        amount: (orderResponse.outAmount / Math.pow(10, otherToken.decimals)) || 0
                                    })
                                }
                            } catch (error) {
                                console.error('Error fetching swap quote:', error);
                            }
                        }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="0" 
                    type="number" 
                    className="field-sizing-content min-w-4 z-10"
                />
                <p className="mx-5 group-hover:text-blue-500">{token.symbol}</p>
            </div>
            <p className="text-sm text-gray-500">$ {(token.price * token?.amount).toFixed(3)}</p>
        </div>
    </div>
}