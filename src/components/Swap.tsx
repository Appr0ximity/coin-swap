import { useEffect, useState } from "react"
import { SwapInputCard } from "../ui/SwapInputCard"
import { SearchTokenCard } from "../ui/SearchTokenCard"
import { useAtom } from "jotai"
import { fromTokenAtom, searchingAtom, toTokenAtom } from "../atoms"
import { useWallet } from "@solana/wallet-adapter-react"
import { VersionedTransaction } from "@solana/web3.js"
import { Buffer } from "buffer"

export const Swap = ()=>{

    const [fromToken, setFromToken] = useAtom(fromTokenAtom)
    const [toToken, setToToken] = useAtom(toTokenAtom)
    const [searching, setSearching] = useAtom(searchingAtom)
    const [fromOrTo, setFromOrTo] =  useState<"TO" | "FROM">("FROM")
    const [buttonText, setButtonText] = useState<"Connect Wallet" | "Loading" | "Select Token" | "Swap Tokens" | "Enter Amount" | "Insufficient Balance">("Connect Wallet")
    const wallet = useWallet()

    const checkButtonText = ()=>{
        if(!wallet.publicKey){
            setButtonText("Connect Wallet")
            return
        }
        if(fromToken.id == "" || toToken.id == ""){
            setButtonText("Select Token")
            return
        }
        if(searching){
            setButtonText("Loading")
            return
        }
        if(fromToken.amount === 0){
            setButtonText("Enter Amount")
            return
        }
        setButtonText("Swap Tokens")
    }

    const searchFromToken = ()=>{
        setButtonText("Loading")
        setFromOrTo("FROM")
        setSearching(true)
    }

    const searchToToken = ()=>{
        setButtonText("Loading")
        setFromOrTo("TO")
        setSearching(true)
    }

    useEffect(()=>{
        checkButtonText()
    }, [wallet.publicKey, fromToken.id, toToken.id, searching, fromToken.amount])

    useEffect(() => {
        const request = async () => {
            if (!wallet.publicKey) {
                setButtonText("Connect Wallet");
                return;
            }
            try {
                setButtonText("Loading")
                const holdingsResponse = await fetch(`https://lite-api.jup.ag/ultra/v1/holdings/${wallet.publicKey.toString()}`).then(res => res.json());
                if(fromToken.id == "So11111111111111111111111111111111111111112"){
                    if(holdingsResponse.uiAmount < fromToken.amount){
                        setButtonText("Insufficient Balance")
                    }else{
                        setButtonText("Swap Tokens")
                    }
                    return
                }
                if (holdingsResponse.tokens && fromToken.id) {
                    const requiredTokenAccounts = holdingsResponse.tokens[fromToken.id];
                    if (!requiredTokenAccounts || requiredTokenAccounts.length === 0) {
                        setButtonText("Insufficient Balance");
                        return;
                    }
                    const requiredToken = requiredTokenAccounts.find((acc: any) => acc.isAssociatedTokenAccount) || requiredTokenAccounts[0];
                    if (!requiredToken || requiredToken.uiAmount < fromToken.amount) {
                        setButtonText("Insufficient Balance");
                        return;
                    }
                    setButtonText("Swap Tokens");
                } else {
                    setButtonText("Connect Wallet");
                }
            } catch (error) {
            setButtonText("Connect Wallet");
            }
        };
        request();
    }, [wallet.publicKey, fromToken.amount]);

    const swapCoins = async ()=>{
        try {
            setButtonText("Loading")
            if(!wallet){
                return
            }
            if(!wallet.signTransaction){
                alert("Your wallet doesn't allow to sign a transaction! Connect to a wallet which allows signing")
                setButtonText("Swap Tokens")
                return
            }
            const orderResponse = await (
                await fetch(
                    `https://lite-api.jup.ag/ultra/v1/order?inputMint=${fromToken.id}&outputMint=${toToken.id}&amount=${fromToken.amount * Math.pow(10, fromToken.decimals)}&taker=${wallet.publicKey}`
                )
            ).json();

            const transactionBase64 = orderResponse.transaction

            const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, "base64"))

            const signedTransaction = await wallet.signTransaction(transaction)
            const executeResponse = await (
                await fetch('https://lite-api.jup.ag/ultra/v1/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        signedTransaction: Buffer.from(signedTransaction.serialize()).toString('base64'),
                        requestId: orderResponse.requestId,
                    }),
                })
            ).json();
            if (executeResponse.status === "Success") {
                alert(`✅ Swap successful!\n\nView transaction:\nhttps://solscan.io/tx/${executeResponse.signature}`);
                setButtonText("Swap Tokens")
            } else {
                alert(`❌ Swap failed.\n\nCheck transaction:\nhttps://solscan.io/tx/${executeResponse.signature}`);
                setButtonText("Swap Tokens")
            } 
        } catch (error) {
            console.error("Swap error:", error);
            alert("An error occurred during swap. Check console for details.");
            setButtonText("Swap Tokens")
        }
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
            <button onClick={swapCoins} disabled={buttonText != "Swap Tokens"} className="rounded-3xl font-semibold bg-white text-black py-3 px-14 mx-auto block mt-3 hover:bg-gray-300 hover:cursor-pointer disabled:bg-gray-400 duration-200 disabled:cursor-default">{buttonText}</button>
            {fromToken.amount > 0 && toToken.amount > 0 && (
                <p className="text-center text-sm mt-4 text-gray-300">
                    1 {fromToken.name} = {(toToken.amount/fromToken.amount).toFixed(6)} {toToken.name}
                </p>
            )}
        </div>}
        {searching && <div>
            <SearchTokenCard fromOrTo={fromOrTo}></SearchTokenCard>
        </div>
        }
    </div>
}