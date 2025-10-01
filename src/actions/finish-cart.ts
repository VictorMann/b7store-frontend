"use server"

import { CartItem } from "@/types/cart-item"

export const finishCart = async (token: string, addressId: number, cart: CartItem[]) => {
  // TODO: requisição para finalizar compra e gerar url de pagamento.

  return 'https://google.com';
};