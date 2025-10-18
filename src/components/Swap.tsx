import { SwapInputCard } from "../ui/SwapInputCard"

export const Swap = ()=>{
    return <div className="flex justify-center items-center">
        <div className="text-white">
            <SwapInputCard></SwapInputCard>
            <SwapInputCard></SwapInputCard>
        </div>
    </div>
}