import { productType } from "@/types";
import MainPageClient from "./page.client";
import { apiBasePath } from "@/lib/src/constants";


export default async function Home() {

  const products = await getProducts()

  return (
    <MainPageClient
    products={products}
    />
  );
}



async function getProducts(): Promise<productType[]> {

  try {
    
    const res = await fetch(`${apiBasePath}/products`, {
      next: {
        revalidate: 60
      }
    })

    const response = await res.json()

    const products: productType[] = JSON.parse(JSON.stringify(response))

    // return with first 4 products
    return products

  } catch (error) {
    console.log('Error: ', error)

    return []
  }
}