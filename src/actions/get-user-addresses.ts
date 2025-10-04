"use server"

import { data } from "@/data"
import { Address } from "@/types/address"

export const getUserAddresses = async (token: string): Promise<Address[]> => {
    // TODO: Pegar endereços do usuário pelo token
    return data.addresses;
}