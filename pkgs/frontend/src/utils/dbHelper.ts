import { AmmInfo } from "@/context/XummProvider";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import type { Database } from "../db/schema";
import { ResponseData } from "../pages/api/env";

/**
 * DBクライアントを作成
 * @returns 
 */
const getSupabaseClient = async (): Promise<SupabaseClient> => {
  const res = await fetch('/api/env')
  const env: ResponseData = await res.json()
  // Supabase用のクライアントを作成
  const supabase: SupabaseClient = createClient<Database>(env.SUPABASE_PUBLIC_URL, env.SUPABASE_API_KEY);
  return supabase
}

/**
 * 全てのカーボンクレジットを取得するメソッド
 */
export const getAllCarbonCreditTokens = async() => {
  const supabase = await getSupabaseClient();

  try {
    let { 
      data: carbon_credit_tokens, 
      error 
    } = await supabase
                .from('carbon_credit_tokens')
                .select('*')

    console.log("carbon_credit_tokens:", carbon_credit_tokens);
    return carbon_credit_tokens;
  } catch(err) {
    console.error("getAllCarbonCreditTokens error:", err);
    return null;
  }
}

/**
 * 全てのフレームワークを取得するメソッド
 */
export const getAllFramework = async() => {
  const supabase = await getSupabaseClient();

  try { 
    // 取得する
    let { 
      data: credit_frameworks, 
      error 
    } = await supabase
                .from('credit_frameworks')
                .select('*')
    
    console.log("credit_frameworks:", credit_frameworks);
    return credit_frameworks;
  } catch(err) {
    console.error("getAllFramework error:", err);
    return null;
  }
}

/**
 * 全てのAMMペアを取得するメソッド
 */
export const getAllAmmPair = async() => {
  const supabase = await getSupabaseClient();

  try { 
    let { 
      data: amm_pairs, 
      error 
    } = await supabase
                .from('amm_pairs')
                .select('*')
    
    console.log("amm_pairs:", amm_pairs);
    return amm_pairs;
  } catch(err) {
    console.error("getAllAmmPair error:", err);
    return null;
  }
}

/**
 * 新しくカーボンクレジットトークンを登録するメソッド
 */
export const insertNewCarbonCreditToken = async(
  currency: string,
  issuer: string,
  framework: string
) => {
  const supabase = await getSupabaseClient();

  try { 
    // 最大値を取得する
    const { 
      data: maxIdData, 
      error: maxIdError 
    } = await supabase
                .from('carbon_credit_tokens')
                .select('id', { count: 'exact' }) 
                .order('id', { ascending: false })
                .limit(1);

    const maxId = maxIdData!.length > 0 ? maxIdData![0].id : 0;
    console.log("maxId", maxId)

    // insert
    const { 
      data, 
      error 
    } = await supabase
                .from('carbon_credit_tokens')
                .insert([
                  { 
                    id: maxId + 1,
                    currency: currency,
                    issuer: issuer,
                    framework: framework
                  },
                ])
                .select()
  } catch(err) {
    console.error("insertNewCarbonCreditToken error:", err);
  }
}

/**
 * 新しくAMMペアを登録するメソッド
 */
export const insertNewAmmPair = async(
  lpTokencode: string,
  ammInfo: AmmInfo
) => {
  const supabase = await getSupabaseClient();

  try { 
    // insert
    const { 
      data, 
      error 
    } = await supabase
                .from('amm_pairs')
                .insert([
                  { 
                    lptokencode: lpTokencode,
                    token1currency: ammInfo.asset.currency,
                    token1issuer: ammInfo.asset.issuer,
                    token2currency: ammInfo.asset2?.currency,
                    token2issuer: ammInfo.asset2?.issuer
                  },
                ])
                .select()
  } catch(err) {
    console.error("insertNewAmmPair error:", err);
  }
}