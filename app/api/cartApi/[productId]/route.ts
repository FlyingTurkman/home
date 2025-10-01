import { cartCookieType } from "@/types"
import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"













// update product
export async function POST(req: NextRequest, { params }: { params: Promise<{ productId: string }>}): Promise<NextResponse> {

    try {
        
        const { productId } = await params

        if (isNaN(Number(productId))) {
            return NextResponse.json('Lütfen geçerli bir ürün numarası giriniz.', { status: 400 })
        }

        const { count }: { count: number } = await req.json()

        if (!count) {
            return NextResponse.json('Lütfen ürün sayısı giriniz.', { status: 400 })
        }

        const cookieStore = await cookies()

        const store = cookieStore.get('cart')?.value

        if (!store) {
            return NextResponse.json('Sepetinizde bir ürün bulunmamaktadır.', { status: 400 })
        }

        const items: cartCookieType[] = JSON.parse(store)

        const cartProduct: cartCookieType | undefined = items.find((item) => item.productId.toString() == productId)

        if (!cartProduct) {
            return NextResponse.json('Sepetinizde böyle bir ürün bulunmamaktadır.', { status: 400 })
        }

        const newCartItems: cartCookieType[] = items.map((item) => {

            if (item.productId.toString() == productId) {
                return {
                    productId: Number(productId),
                    count
                }
            } else {
                return item
            }
        })

        cookieStore.set('cart', JSON.stringify(newCartItems), { expires: Date.now() + 1000 * 60 * 60 * 24 * 30 })

        return NextResponse.json('Ürün başarıyla güncellendi.', { status: 200 })
    } catch (error) {
        console.log('Error: ', error)

        return NextResponse.json('Beklenmedik bir hata meydana geld.', { status: 400 })
    }
}



// delete from cart
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ productId: string }>}): Promise<NextResponse> {
    try {

        const { productId } = await params

        if (isNaN(Number(productId))) {
            return NextResponse.json('Lütfen geçerli bir ürün numarası giriniz.', { status: 400 })
        }
        
        const cookieStore = await cookies()

        const store = cookieStore.get('cart')?.value

        if (!store) {
            return NextResponse.json('Sepetiniz zaten boş.', { status: 400 })
        }

        const items: cartCookieType[] = JSON.parse(store)

        const newItems: cartCookieType[] = items.filter((item) => item.productId.toString() != productId)

        cookieStore.set('cart', JSON.stringify(newItems), { expires: Date.now() + 1000 * 60 * 60 * 24 * 30})

        return NextResponse.json('Ürün sepetinizden başarıyla kaldırıldı.', { status: 200 })
        
    } catch (error) {
        console.log('Error: ', error)

        return NextResponse.json('Beklenmedik bir hata meydana geldi.', { status: 400 })
    }
}