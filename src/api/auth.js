// auth.js
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

export const signUp = async (email, password, full_name) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword, full_name }]);

  if (error) throw error;
  return data;
};

  