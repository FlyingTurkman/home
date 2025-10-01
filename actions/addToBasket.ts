'use server'











'use server'

import { cartCookieType, cartProductType, responseType } from "@/types";
import { cookies } from "next/headers";










type addTobasketResponseType = responseType & {
    products?: cartCookieType[]
}





export async function addToBasket(product: cartProductType): Promise<addTobasketResponseType> {

    try {
        const cookieStore = await cookies()

        const storage = cookieStore.get('cart')?.value

        
        let items: cartCookieType[] = []

        if (!storage) {
            const cartItem: cartCookieType[] = [{
                productId: product.id,
                count: product.count
            }]

            items = cartItem
        } else {

            const oldItems: cartCookieType[] = JSON.parse(storage)

            const existingProduct = oldItems.find((o) => o.productId == product.id)

            if (existingProduct) {
                items = oldItems.map((oldItem) => {

                    if (oldItem.productId == product.id) {

                        return {
                            productId: product.id,
                            count: existingProduct.count + product.count
                        }
                    } else {
                        return oldItem
                    }
                })
            } else {
                items = [...oldItems, {
                    productId: product.id,
                    count: product.count
                }]
            }

        }

        cookieStore.set('cart', JSON.stringify(items), { expires: Date.now() + 1000 * 60 * 60 * 24 * 30 }) // sets 30 days

        return {
            status: true,
            message: 'Ürün sepete başarıyla eklendi',
            products: items
        }
    } catch (error) {
        console.log('Error: ', error)

        return {
            status: false,
            message: 'Beklenmedik bir hata meydana geldi.'
        }
    }
    
    

}