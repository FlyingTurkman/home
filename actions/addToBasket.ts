'use server'











'use server'

import { tokenExpiryTime } from "@/lib/src/constants";
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

            // if cart empty directly adding product with count
            const cartItem: cartCookieType[] = [{
                productId: product.id,
                count: product.count
            }]

            items = cartItem
        } else {

            // getting all cart items
            const oldItems: cartCookieType[] = JSON.parse(storage)

            // finding for existing item. using for count adding
            const existingProduct = oldItems.find((o) => o.productId == product.id)

            if (existingProduct) {
                items = oldItems.map((oldItem) => {

                    if (oldItem.productId == product.id) {

                        // updating new count for existing product
                        return {
                            productId: product.id,
                            count: existingProduct.count + product.count
                        }
                    } else {
                        return oldItem
                    }
                })
            } else {

                // if product doesnt exist directly adding to cart
                items = [...oldItems, {
                    productId: product.id,
                    count: product.count
                }]
            }

        }

        cookieStore.set('cart', JSON.stringify(items), { expires: Date.now() + tokenExpiryTime }) // sets 30 days

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