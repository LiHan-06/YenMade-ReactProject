// 在檔案頂部加上
const BASE_URL = "https://https://jsfcqsihzmtnsbpirsfc.supabase.co";
import axios from "axios";
export async function getUserById(userId) {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`);
  return data;
}
