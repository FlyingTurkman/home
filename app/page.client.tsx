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