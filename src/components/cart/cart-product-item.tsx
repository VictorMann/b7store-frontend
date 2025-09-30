import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item"
import Image from "next/image";

type Props = {
  item: CartListItem;
}

export const CartProductItem = ({ item }: Props) => {
  const cartStore = useCartStore(state => state);

  const updateCookie = async () => {
    const updatedCart = useCartStore.getState().cart;
    await setCartState(updatedCart);
  }

  const handleAlterQuantity = async (sinal: '+' | '-') => {
    if (sinal === '+') {
      cartStore.updateQuantity(item.product.id, item.quantity + 1);
      await updateCookie();
    } else {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.product.id, item.quantity - 1);
        await updateCookie();
      }
      else await handleRemove();
    }
  };

  const handleRemove = async () => {
    cartStore.removeItem(item.product.id);
    await updateCookie();
  };

  return (
    <div className="flex items-center p-6 gap-4 md:gap-8 border-0 md:border-b border-gray-200">
      <div className="border border-gray-200 p-1">
        <Image
          src={item.product.image}
          alt={item.product.label}
          width={96}
          height={90}
          className="size-24 md:size-16"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <div className="text-sm mb-2">{item.product.label}</div>
          <div className="hidden md:block text-xs text-gray-500">COD: {item.product.id}</div>
        </div>
        <div className="">
          <div className="flex rounded-sm text-gray-500">
            <div
              onClick={() => handleAlterQuantity('-')} 
              className="size-10 text-2xl cursor-pointer border border-r-0 border-gray-200 flex justify-center items-center">-</div>
            <div className="size-10 border border-gray-200 flex justify-center items-center">{item.quantity}</div>
            <div 
              onClick={() => handleAlterQuantity('+')} 
              className="size-10 text-2xl cursor-pointer border border-l-0 border-gray-200 flex justify-center items-center">+</div>
          </div>
        </div>
      </div>
      <div className="w-34 md:w-40 flex-1 flex flex-col md:flex-row justify-between items-end md:items-center">
        <div className="text-lg text-blue-600">R$ {item.product.price.toFixed(2)}</div>
        <div 
          onClick={handleRemove}
          className="cursor-pointer size-12 border border-gray-200 flex justify-center items-center rounded-sm">
          <Image 
            src={'/assets/ui/trash.png'}
            alt=""
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  )
}