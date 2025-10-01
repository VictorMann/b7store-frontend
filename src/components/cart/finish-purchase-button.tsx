import { clearCartCookie } from "@/actions/clear-cart-cookie";
import { finishCart } from "@/actions/finish-cart";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FinishPurchaseButton = () => {
  const { token, hydrated } = useAuthStore(state => state);
  const cartStore = useCartStore(state => state);

  if (!hydrated) return null;

  if (!token) {
    return (
      <Link
        href={'/login'}
        className="block text-center cursor-pointer w-full px-6 py-5 bg-blue-600 text-white border-0 rounded-sm hover:opacity-90">
          Faça login para finalizar
      </Link>
    )
  }

  const handleFinishButton = async () => {
    if (!token || !cartStore.selectedAddressId) return;
    
    const sessionUrl = await finishCart(
      token,
      cartStore.selectedAddressId,
      cartStore.cart
    );

    if (sessionUrl) {
      await clearCartCookie();
      cartStore.clearCart();
      redirect(sessionUrl);
    } else {
      alert('Ocorreu um erro');
    }
  };
  
  return (
    <button 
      disabled={!cartStore.selectedAddressId ? true : false}
      onClick={handleFinishButton}
      type="button"
      className="cursor-pointer w-full px-6 py-5 bg-blue-600 text-white border-0 rounded-sm hover:opacity-90 disabled:opacity-20">
        Finalizar Compra
    </button>
  )
}