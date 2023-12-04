import type { NextApiRequest, NextApiResponse } from 'next';
 
export type ResponseData = {
  WEB3_AUTH_CLIENT_ID: string;
  XRP_API_KEY: string;
  FAUCET_SEED: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    WEB3_AUTH_CLIENT_ID: process.env.WEB3_AUTH_CLIENT_ID!,
    XRP_API_KEY: process.env.XRP_API_KEY!,
    FAUCET_SEED: process.env.FAUCET_SEED!
  }

  res.status(200).json(env)
}