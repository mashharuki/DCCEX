import { ResponseData } from "../pages/api/env";
import { getEnv } from "../utils/getEnv";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { XrplPrivateKeyProvider, getXRPLChainConfig } from "@web3auth/xrpl-provider";
import { init, getAccounts, getBalance } from "./xrpl";

// 変数
var web3auth: Web3Auth;
var idToken;

/**
 * ログイン メソッド
 */
export const login = async() => {
  // get env
  const env: ResponseData = await getEnv();

  web3auth = new Web3Auth({
    clientId: env.WEB3_AUTH_CLIENT_ID,
    web3AuthNetwork: 'sapphire_mainnet',
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
    },
  });

  const xrplProvider = new XrplPrivateKeyProvider({
    config: {
      chainConfig: getXRPLChainConfig("testnet"), // devnet, testnet, mainnet
    },
  });
  
  const adapter = new OpenloginAdapter({
    privateKeyProvider: xrplProvider // <-- Injecting the XRPL provider
  });
  web3auth.configureAdapter(adapter);

  // initModal
  await web3auth.initModal();
    
  const provider = await web3auth.connect();
  const authenticateUser = await web3auth.authenticateUser();
  const user = await web3auth.getUserInfo();
  init(provider!);
  const userAccount = await getAccounts();
  const balance = await getBalance();
  //const result = await rpc.signMessage();
  //const result2 = await rpc.signAndSendTransaction();
  // set idToken
  idToken = authenticateUser.idToken;

  console.log("provider:", provider)
  console.log("user:", user)
  console.log("Accpuint info: ", userAccount);
  console.log("Balance", balance);
  //console.log("result:", result);
  //console.log("results2:", result2)
  
  return provider;
}

/**
 * logout method
 */
export const logout = async() => {
  // logout
  await web3auth.logout();
}

/**
 * getPrivateKey method
 * @param provider 
 * @returns 
 */
const getPrivateKey = async(provider: SafeEventEmitterProvider) => {
  return (await provider.request({
    method: "private_key",
  })) as string;
};