
import { ImageSlider } from "@/components/product/image-slider";
import { ProductDescription } from "@/components/product/product-description";
import { ProductDetails } from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";
import { RelatedProdutsSkeleton } from "@/components/product/related-products-skeleton";
import { data as d } from "@/data";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  let data: any = {...d};
  const dataItem = d.prodsEx.find(item => item.id === parseInt(id));
  if (dataItem) data = { product: dataItem };
  

  return (
    <div>
      <div className="text-gray-500 mb-4">
        <Link href={'/'}>Home</Link> &gt; <Link href={'/'}>TEMPORARIO</Link>  &gt; {data.product.label}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-32">
        <ImageSlider images={data.product.images} />
        <ProductDetails product={data.product} />
      </div>

      <ProductDescription text={data.product.description} />

      <Suspense fallback={<RelatedProdutsSkeleton />}>
        <RelatedProducts id={data.product.id} />
      </Suspense>

    </div>
  )
}