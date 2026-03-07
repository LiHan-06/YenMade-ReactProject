import { useContext } from "react";
import { AuthContext, CartContext } from "../context/ContextDefinitions";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth 報錯");
  return context;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart 報錯");
  return context;
}