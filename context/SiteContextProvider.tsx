'use client'


import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { cartProductType } from '@/types'





export type siteContextType = {
    cart: cartProductType[]
    setCart: Dispatch<SetStateAction<cartProductType[]>>
}



const SiteContext = createContext<siteContextType>({
    cart: [],
    setCart: () => {}
})



export function useSiteContext(): siteContextType {
    const ctx = useContext(SiteContext)

    if (!ctx) {
        throw new Error('useSiteContext must be within SiteContextProvider')
    }

    return ctx
}


export default function SiteContextProvider({
    children
}: {
    children: ReactNode
}) {

    const [cart, setCart] = useState<cartProductType[]>([])

    const value: siteContextType = {
        cart,
        setCart
    }

    useEffect(() => {

        // initial shopping cart set
        const cartStorage = localStorage.getItem('cart')

        if (!cartStorage) {
            setCart([])
        } else {
            setCart(JSON.parse(cartStorage))
        }
    }, [])
    return (
        <SiteContext.Provider
        value={value}
        >
            {children}
        </SiteContext.Provider>
    )
}
