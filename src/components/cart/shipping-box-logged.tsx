"use client"

import { getShippingInfo } from "@/actions/get-shipping.info";
import { getUserAddresses } from "@/actions/get-user-addresses";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart"
import { Address } from "@/types/address";
import { ChangeEvent, useEffect, useState, useTransition } from "react";

export const ShippingBoxLogged = () => {
  const { token, hydrated } = useAuthStore(state => state);
  const cartStore = useCartStore(state => state);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (hydrated && token) {
      startTransition(() => {
        getUserAddresses(token).then(setAddresses);
      });
    }
  }, [token, hydrated]);

  useEffect(() => {
    if (cartStore.selectedAddressId) {
      updateShippingInfo();
    }
  }, [cartStore.selectedAddressId]);

  const handleSelectedAddress = (e: ChangeEvent<HTMLSelectElement>) => {
    cartStore.clearShipping();
    const id = parseInt(e.target.value);
    if (id) {
      const address = addresses.find(addr => addr.id === id);
      if (address) {
        cartStore.setShippingZipcode(address.zipcode);
        cartStore.setSelectedAddressId(id);
      }
    }
  };

  const updateShippingInfo = async () => {
    if (cartStore.shippingZipcode.length > 4) {
      const shippingInfo = await getShippingInfo(cartStore.shippingZipcode);
      if (shippingInfo) {
        cartStore.setShippingCost(shippingInfo.cost);
        cartStore.setShippingDays(shippingInfo.days);
      }
    }
  };

  const handleAddAddressButton = () => {

  }

  return (
    <div className="flex flex-col gap-4">
      <select 
        onChange={handleSelectedAddress}
        value={cartStore.selectedAddressId ?? ''}
        className="flex-1 px-6 py-5 bg-white border border-gray-200 rounded-sm"
      >
        <option value="">
          {addresses.length === 0 ? 'Nenhum endereço cadastrado' : 'Selecione um endereço'}
        </option>
        {addresses.map(item => (
          <option key={item.id} value={item.id}>
            {item.street}, {item.number} - {item.city} ({item.zipcode})
          </option>
        ))}
      </select>
      <button
        className="cursor-pointer px-6 py-5 bg-blue-600 text-white border-0 rounded-sm hover:opacity-90"
        onClick={handleAddAddressButton}
      >
        Adicionar endereço
      </button>
    </div>
  )
}