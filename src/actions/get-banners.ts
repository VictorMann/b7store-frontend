"use server"

import { api } from "@/libs/axios";
import { Banner } from "@/types/banner";

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const resp = await api.get('/banners');
    if (resp.status === 200) {
      return resp.data.banners;
    }
  } 
  catch (ex) {
    console.log(ex);
  }
  return [];
};