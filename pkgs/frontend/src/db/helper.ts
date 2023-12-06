import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../db/schema";

/**
 * DBクライアントを作成
 * @returns 
 */
export const getSupabaseClient = async(
  supabaseUrl: string,
  supabaseApiKey: string
): Promise<SupabaseClient> => {
  // Supabase用のクライアントを作成
  const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseApiKey);
  return supabase
}
