"use client"

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
}

export const ImageSlider = ({ images }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="max-w-sm mx-auto md:mx-0">
      <div className="p-4 border border-gray-200 bg-white">
        <Image
          src={images[selectedImageIndex]}
          alt=""
          width={380}
          height={380}
          className="max-w-full"
        />
      </div>
      <div className="mt-4 flex grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`p-2 bg-white cursor-pointer border ${index === selectedImageIndex ? 'border-blue-500' : 'border-gray-200'}`}>
                <Image 
                  src={image}
                  alt=""
                  width={80}
                  height={80}
                />
          </div>
        ))}
      </div>
    </div>
  )
}