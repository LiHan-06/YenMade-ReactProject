import axios from "axios";

// 這是你組員提供的資訊
const supabaseUrl = "https://kficknhvujgeaooqxiif.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaWNrbmh2dWpnZWFvb3F4aWlmIiwicm9sZSI6Imfub24iLCJpYXQiOjE3NjkwOTI0NjYsImV4cCI6MjA4NDY2ODQ2Nn0.E8ANauiwk7mY6k9lSnGtURWptrh-yZkrZSA98GRdTUo";

const productRequest = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});

// 取得所有產品資料
export const getProductsApi = () => productRequest.get("/products?select=*");
