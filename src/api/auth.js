import { supabase } from '../lib/supabase';

// 登入功能：對應測試帳號 ym2026@gmail.com
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data; // 回傳包含 session 與 user 資訊
};

// ✅ 新增：註冊功能
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};