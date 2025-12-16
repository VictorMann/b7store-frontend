"use server"

import { api } from "@/libs/axios";
import { Product } from "@/types/product";

type ProductFilters = {
  metadata?: object;
  orderBy: 'selling' | 'views' | 'price';
  limit: number;
}

export const getProducts = async ({ metadata, orderBy, limit }: ProductFilters) : Promise<Product[]> => {
  try {
    let params: any = {};
    if (metadata) params.metadata = JSON.stringify(metadata);
    if (orderBy) params.orderBy = orderBy;
    if (limit) params.limit = limit;

    const resp = await api.get('/products', { params });
    if (resp.status === 200) {
      return resp.data.products;
    }

  } catch (ex) {
    console.log(ex);
  }
  return [];
}