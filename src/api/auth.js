// auth.js
import { supabase } from "../lib/supabase";

// 註冊
export const signUp = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  if (error) throw error;
  return data;
};

// 登入
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data; // 包含 user 與 session
};

// 登出
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
};

// 取得目前使用者資訊
export const getUser = () => supabase.auth.getUser();