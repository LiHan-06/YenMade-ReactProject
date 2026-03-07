import { useState, useEffect, useCallback, useMemo } from "react";
import { CartContext } from "./ContextDefinitions";
import { useAuth } from "../hooks/useAppContext"; 
import { 
  fetchCartWithDetails, 
  addToCartApi, 
  updateCartQuantityApi, 
  deleteCartItemApi, 
  clearCartApi 
} from "../api/carts";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();


  const fetchCart = useCallback(async () => {
    try {
      const guestId = localStorage.getItem("guest_id");
      const data = await fetchCartWithDetails(user?.id, guestId);
      setCart(data || []);
    } catch (error) {
      console.error("Fetch cart error:", error);
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      if (active) await fetchCart();
    };
    loadData();
    return () => { active = false; };
  }, [fetchCart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(item.product?.price) || 0;
      return acc + price * (item.quantity || 0);
    }, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  }, [cart]);

  const deliveryFee = cart.length > 0 ? 300 : 0;

  const addToCart = async (productId, variantId, quantity = 1) => {
    try {
      await addToCartApi(user?.id, productId, variantId, quantity);
      await fetchCart(); 
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartQuantityApi(cartItemId, newQuantity);
      await fetchCart();
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await deleteCartItemApi(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi(user?.id);
      setCart([]);
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartCount, 
        fetchCart, 
        addToCart, 
        updateQuantity, 
        removeItem, 
        clearCart, 
        totalPrice, 
        deliveryFee 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}