import { atom } from "jotai"

export interface Token {
    id?: string,
    name: string,
    symbol: string,
    uri: string,
    price: number,
    priceChange: number,
    amount: number,
    decimals: number
}

export const searchingAtom = atom<Boolean>(false)

export const fromTokenAtom = atom<Token>({
    id: "",
    name: "",
    symbol: "FROM TOKEN",
    uri: "",
    price: 0,
    priceChange: 0,
    amount: 0,
    decimals: 0
})
export const toTokenAtom = atom<Token>({
    id: "",
    name: "",
    symbol: "TO TOKEN",
    uri: "",
    price: 0,
    priceChange: 0,
    amount: 0,
    decimals: 0
})
export const allTokensAtom = atom<Token[]>([])