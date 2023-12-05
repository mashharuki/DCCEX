import type { NextApiRequest, NextApiResponse } from 'next';
 
export type ResponseData = {
  ISSUER_SEED: string;
  XRP_API_KEY: string;
  FAUCET_SEED: string;
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const env: ResponseData = {
    ISSUER_SEED: process.env.ISSUER_SEED!,
    XRP_API_KEY: process.env.XRP_API_KEY!,
    FAUCET_SEED: process.env.FAUCET_SEED!
  }

  res.status(200).json(env)
}