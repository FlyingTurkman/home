'use client'

import { productType } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Image from "next/image"
import { imageLoader } from "@/lib/src/imageLoader"
import { Label } from "../ui/label"
import ProductStars from "./ProductStars"
import { addToBasket } from "@/actions/addToBasket"
import { useSiteContext } from "@/context/SiteContextProvider"
import { toast } from "sonner"
import { FaShoppingCart } from "react-icons/fa"
import { IoAdd, IoRemove } from "react-icons/io5"
import { useState } from "react"













export default function ProductCard({
    product
}: {
    product: productType
}) {

    const [count, setCount] = useState<number>(1)

    const { setCart } = useSiteContext()

    return (
        <Card
        className="flex flex-col justify-between h-full"
        >
            <CardHeader>
                <CardTitle>
                    {product.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                width={256}
                height={256}
                loader={imageLoader}
                alt={`${product.title} image`}
                className="w-full rounded-md aspect-square object-contain"
                src={product.image}
                loading="lazy"
                fetchPriority="high"
                />
            </CardContent>
            <CardContent>
                <div
                className="flex flex-col gap-2"
                >

                    {/* Rating */}
                    <div
                    className="flex flex-row items-center gap-2"
                    >
                        <ProductStars
                        stars={product.rating.rate}
                        />
                        <Label>
                            ({product.rating.count})
                        </Label>
                    </div>

                    {/* Description */}
                    <CardDescription
                    className="line-clamp-3"
                    >
                        {product.description}
                    </CardDescription>

                    {/* Price label */}
                    <Label>
                        {product.price} $
                    </Label>
                </div>
            </CardContent>
            <CardFooter>
                <div
                className="flex flex-col gap-2 w-full"
                >
                    <div
                    className="flex flex-row items-center justify-between"
                    >
                        <Button
                        variant={'outline'}
                        disabled={count == 1}
                        onClick={() => {
                            setCount((prev) => prev == 1 ? 1 : prev - 1)
                        }}
                        >
                            <IoRemove/>
                        </Button>
                        <Label
                        className="text-xl"
                        >
                            {count}
                        </Label>
                        <Button
                        variant={'outline'}
                        onClick={() => {
                            setCount((prev) => prev + 1)
                        }}
                        >
                            <IoAdd/>
                        </Button>
                    </div>
                    <Button
                    className="w-full"
                    onClick={ async () => {
                        const response = await addToBasket({
                            ...product,
                            count
                        })

                        if (response.status) {
                            toast.success('İşlem başarılı', {
                                description: response.message
                            })
                        } else {
                            toast.error('İşlem başarısız.', {
                                description: response.message
                            })
                        }
                    }}
                    >
                        <FaShoppingCart/>
                        Sepete Ekle
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}