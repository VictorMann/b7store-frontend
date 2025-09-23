"use client"

import Image from "next/image";
import { useState } from "react";

type Props = {
  text: string;
}

export const ProductDescription = ({ text }: Props) => {
  const [opened, setOpened] = useState(true);

  return (
    <div className="bg-white border border-gray-200 p-8 mt-12">
      <div className="flex justify-between items-center">
        <div className="text-2xl">Informações do Produto</div>
        <div
          onClick={() => setOpened(!opened)} 
          className="size-12 border border-gray-200 flex justify-center items-center cursor-pointer">
          <Image 
            src={'/assets/ui/arrow-left-s-line.png'}
            alt=""
            width={24}
            height={24}
            className={`transition-all ${opened ? 'rotate-0' : 'rotate-180'}`}
          />
        </div>
      </div>
      <div className={`mt-7 pt-7 text-gray-500 border-t border-gray-200 ${opened ? '' : 'hidden'}`}>
        {text}
      </div>
    </div>
  )
}