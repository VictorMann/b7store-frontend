"use server"

type ShippingInfoResponse = {
    zipcode: string;
    cost: number;
    days: number;
}

export const getShippingInfo = async (zipcode: string): Promise<ShippingInfoResponse | false> => {
    // TODO: Fazer requisição para pegar info do cep
    return {
        zipcode: '123456',
        cost: 14.99,
        days: 3
    }
}