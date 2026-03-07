import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabase";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [], //購物車項目
  },
  reducers: {
    createCart(state, action) {
      // 購物車項目的寫入
      console.log("createCart", action.payload);
      // state.carts = action.payload;
    },
  },
});

// 非同步
export const getCartAsync = createAsyncThunk(
  "cart/getCartAsync",
  async (data, error, { dispatch }) => {
    const res = await supabase.from("carts").select("*");
    console.log("getCartAsync", res.data);
    // dispatch(setCart(res.data.data.carts));
    if (error) throw error;
  },
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (data, error, { dispatch }) => {
    const res = await supabase
      .from("carts")
      .insert([cartData])
      .select()
      .single();
    if (error) throw error;
    console.log("加入購物車", data);
    dispatch(getCartAsync());
  },
);

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
