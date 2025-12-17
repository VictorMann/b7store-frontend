"use server"

import { api } from "@/libs/axios";
import { Category, CategoryMetadata } from "@/types/category";

type CategoryWithMetadata = {
  category: Category;
  metadata: CategoryMetadata[];
}

export const getCategoryWithMetadata = async (slug: string) => {
  try {
    const resp = await api.get(`/category/${slug}/metadata`);
    if (resp.status === 200 && !resp.data.error) {
      return resp.data as CategoryWithMetadata;
    }
  } catch (ex) {}
  return null;
};