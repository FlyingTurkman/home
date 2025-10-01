'use client'


import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { cartCookieType, cartProductType } from '@/types'





export type siteContextType = {
    cart: cartCookieType[]
    setCart: Dispatch<SetStateAction<cartCookieType[]>>
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

    const [cart, setCart] = useState<cartCookieType[]>([])

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
