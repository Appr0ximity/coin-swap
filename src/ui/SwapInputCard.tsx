import { useAtom } from "jotai"
import "./SwapInputCard.css"
import { fromTokenAtom, toTokenAtom } from "../atoms"

export const SwapInputCard = ({fromOrTo}: {fromOrTo: "FROM"|"TO"})=>{

    const [token, setToken] = fromOrTo === "FROM" ? useAtom(fromTokenAtom) : useAtom(toTokenAtom)
    const [otherToken, setOtherToken] = fromOrTo === "TO" ? useAtom(fromTokenAtom) : useAtom(toTokenAtom)

    return <div className="bg-[#141417] group hover:cursor-pointer active:bg-[#1a1a1d] pt-4 sm:pt-5 pb-6 sm:pb-8 px-4 sm:px-7 w-full my-1 rounded-lg sm:rounded-xl touch-manipulation">
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Pay on Solana</p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-0">
            <div className="flex text-2xl sm:text-3xl md:text-4xl items-baseline flex-wrap">
                <input
                    value={token.amount} 
                    onChange={async (e)=> {
                        const inputAmount = parseFloat(e.target.value) || 0;
                        setToken({
                            ...token,
                            amount: inputAmount
                        })
                        
                        if (inputAmount > 0 && token.id && otherToken.id && token.decimals) {
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
                    className="field-sizing-content min-w-4 z-10 text-2xl sm:text-3xl md:text-4xl"
                />
                <p className="mx-3 sm:mx-5 group-hover:text-blue-500 text-lg sm:text-2xl md:text-3xl truncate max-w-[180px] sm:max-w-none">{token.symbol}</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 self-start sm:self-auto">$ {(token.price * token?.amount).toFixed(3)}</p>
        </div>
    </div>
}