import { supabase } from "../lib/supabase";
//import bcrypt from "bcryptjs";

// 註冊
export const signUp = async (email, password, full_name) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, full_name }]);

  if (error) throw error;
  return data;
};

// 登入
export const signIn = async (email, password) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;

  const match = await bcrypt.compare(password, data.password);
  if (!match) throw new Error("密碼錯誤");

  // 同步呼叫官方登入
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (authError) {
    console.error(
      "Auth 系統登入失敗 (可能是 Auth 中沒這帳號):",
      authError.message,
    );
  }

  // console.log(data);
  return data;
};
