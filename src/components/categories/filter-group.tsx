"use client"

import Image from "next/image"
import { FilterItem } from "./filter-item"
import { useState } from "react"

type Props = {
  id: string;
  name: string;
}

export const FilterGroup = ({ id, name }: Props) => {
  const [opened, setOpened] = useState(true);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex-1 font-bold text-xl">{name}</div>
        <div
          onClick={() => setOpened(!opened)} 
          className="size-8 cursor-pointer flex justify-center items-center">
          <Image
            src='/assets/ui/arrow-left-s-line.png'
            className={`${opened ? 'rotate-0' : 'rotate-180'} transition-all`}
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className={`overflow-y-hidden ${opened ? 'max-h-[500px]' : 'max-h-0'} transition-all`}>
        <FilterItem groupId={id} item={{id: 'node', label: 'NodeJS'}} />
        <FilterItem groupId={id} item={{id: 'react', label: 'React'}} />
        <FilterItem groupId={id} item={{id: 'rn', label: 'React Native'}} />

      </div>
      
    </div>
  )
}