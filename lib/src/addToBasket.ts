import { cartProductType } from "@/types";
















export function addToBasket(product: cartProductType): cartProductType[] {
    
    const storage = localStorage.getItem('cart')

    let items: cartProductType[] = []

    if (!storage) {
        
        items = [product]

    } else {
        
        items = JSON.parse(storage)
    
        const isItemExist = items.find((i) => i.id == product.id)
    
        if (!isItemExist) {
            items = [...items, product]
        } else {
    
            const { count, ...rest } = isItemExist
            items = [
                {
                    count: count + product.count,
                    ...rest
                },
                ...items.filter((i) => i.id != product.id)
            ]
        }
    }

    localStorage.setItem('cart', JSON.stringify(items))

    // return items for context set 

    return items

}