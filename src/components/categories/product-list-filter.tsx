"use client"

import { useState } from "react"

export const ProductListFilter = () => {
  const [filterOpened, setFilterOpened] = useState(false);
  

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="text-3xl"><strong>12</strong> Produtos</div>
        <div className="w-full md:max-w-70 flex flex-row gap-5">
          <select className="h-14 flex-1 px-6 bg-white border border-gray-200 text-gray-500">
            <option>Ordenar por</option>
          </select>
          <div 
            onClick={() => setFilterOpened(!filterOpened)}
            className="h-14 md:hidden flex items-center flex-1 px-6 bg-white border border-gray-200 text-gray-500">
              Filtrar
            </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className={`flex-1 md:max-w-70 ${filterOpened ? 'block' : 'hidden'} md:block`}>filtro</div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3">
          <div className="a">...</div>
          <div className="a">...</div>
          <div className="a">...</div>
          <div className="a">...</div>
        </div>
      </div>
    </div>
  )
}