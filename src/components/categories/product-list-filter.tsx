"use client"

import { useQueryString } from "@/hooks/use-querystring";
import { ChangeEvent, useState } from "react"
import { FilterGroup } from "./filter-group";

export const ProductListFilter = () => {
  const queryString = useQueryString();
  const [filterOpened, setFilterOpened] = useState(false);
  
  const order = queryString.get('order') ?? 'views';

  const handleSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    queryString.set('order', e.target.value);
  };


  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="text-3xl"><strong>12</strong> Produtos</div>
        <div className="w-full md:max-w-70 flex flex-row gap-5">
          <select 
            defaultValue={order}
            onChange={handleSelectChanged}
            className="h-14 flex-1 px-6 bg-white border border-gray-200 text-gray-500"
          >
            <option value={'views'}>Popularidade</option>
            <option value={'price'}>Por preço</option>
            <option value={'selling'}>Mais vendidos</option>r
          </select>
          <div 
            onClick={() => setFilterOpened(!filterOpened)}
            className="h-14 md:hidden flex items-center flex-1 px-6 bg-white border border-gray-200 text-gray-500">
              Filtrar
            </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row gap-8">
        <div className={`flex-1 md:max-w-70 ${filterOpened ? 'block' : 'hidden'} md:block`}>
          <FilterGroup id="tech" name="Tecnologia" />
          <FilterGroup id="color" name="Cores" />
        </div>
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