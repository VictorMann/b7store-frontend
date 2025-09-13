"use client"

import { Product } from "@/types/product"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Props = {
  item: Product
}

export const ProductItem = ({ item }: Props) => {
  const [liked, setLiked] = useState<boolean>(item.liked);

  const handleClikLiked = () => {
    let l = !liked;
    setLiked(l);
  };

  const link = `/product/${item.id}`;

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6">
      <div className="flex justify-end">
        <div 
          className="size-12 border border-gray-200 rounded-sm flex justify-center items-center cursor-pointer"
          onClick={() => handleClikLiked()}>
          {liked &&
            <Image
              src={'/assets/ui/heart-3-fill.png'}
              alt=""
              width={24}
              height={24}
              />
          }
          {!liked &&
            <Image
              src={'/assets/ui/heart-3-line.png'}
              alt=""
              width={24}
              height={24}
              />
          }
        </div>
      </div>
      <div className="flex justify-center">
        <Link href={link}>
          <Image 
            src={item.image} 
            alt={item.label}
            width={200}
            height={200}
            className="max-w-full h-48"
          />
        </Link>
      </div>
      <div className="mt-9 text-lg font-bold"><Link href={link}>{item.label}</Link></div>
      <div className="mt-3 text-2xl font-bold text-blue-600"><Link href={link}>R$ {item.price.toFixed(2)}</Link></div>
      <div className="mt-5 text-gray-400">Em até 12x no cartão</div>
    </div>
  )
}