import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

// 註冊
export const signUp = async (email, password, full_name) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword, full_name }]);

  if (error) throw error;
  return data;
};

// 登入
export const signIn = async (email, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw error;

  const match = await bcrypt.compare(password, data.password);
  if (!match) throw new Error('密碼錯誤');

  return data;
};
