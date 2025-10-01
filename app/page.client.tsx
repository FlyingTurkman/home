'use client'

import ProductCard from "@/components/products/ProductCard"
import { Button } from "@/components/ui/button"
import { productType } from "@/types"














export default function MainPageClient({
    products
}: {
    products: productType[]
}) {

    return (
        <div
        className="container mx-auto my-10"
        >
            <Button
            onClick={() => {

                fetch('http://localhost:3001/cart/api/homeApi/1', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({ count: 1 })
                })
            }}
            >
                Test
            </Button>
            <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 direction-rtl"
            >
                {products.map((product) => {

                    return (
                        <ProductCard
                        key={product.id}
                        product={product}
                        />
                    )
                })}
            </div>
        </div>
    )
}