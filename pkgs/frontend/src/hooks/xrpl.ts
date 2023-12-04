import { IProvider } from "@web3auth/base";
import { convertStringToHex, Payment, xrpToDrops } from "xrpl";

var provider: IProvider;

/**
 * 初期化メソッド
 * @param setProvider 
 */
export const init = (setProvider: IProvider) => {
  provider = setProvider;
}

export const getAccounts = async (): Promise<any> => {
  try {
    const accounts = await provider.request<never, string[]>({
      method: "xrpl_getAccounts",
    });
    if (accounts) {
      const accInfo = (await provider.request({
        method: "account_info",
        params: [
          {
            account: accounts[0],
            strict: true,
            ledger_index: "validated",
          },
        ],
      })) as Record<string, Record<string, string>>;
      console.log("XRPL account info", accInfo);
      // xrpl Account
      const account = accInfo?.account_data?.Account;
      // Balance
      const balance = accInfo?.account_data?.Balance;
      console.log(account);
      console.log(balance);
      return accInfo;
    } else {
      return "No accounts found, please report this issue.";
    }
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const getBalance = async (): Promise<any> => {
  try {
    const accounts = await provider.request<string[], never>({
      method: "xrpl_getAccounts",
    });

    if (accounts) {
      const accInfo = (await provider.request({
        method: "account_info",
        params: [
          {
            account: accounts[0],
            strict: true,
            ledger_index: "validated",
          },
        ],
      })) as Record<string, Record<string, string>>;
      return accInfo.account_data?.Balance;
    } else {
      return "No accounts found, please report this issue.";
    }
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const signMessage = async (): Promise<any> => {
  try {
    const msg = "Hello world";
    const hexMsg = convertStringToHex(msg);
    const txSign = await provider.request< { signature: string }, never>({
      method: "xrpl_signMessage",
      params: {
        signature: hexMsg,
      },
    });
    return txSign;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const signAndSendTransaction = async (): Promise<any> => {
  try {
    const accounts = await provider.request<never, string[]>({
      method: "xrpl_getAccounts",
    });

    if (accounts && accounts.length > 0) {
      const tx: Payment = {
        TransactionType: "Payment",
        Account: accounts[0] as string,
        Amount: xrpToDrops(50),
        Destination: "rM9uB4xzDadhBTNG17KHmn3DLdenZmJwTy",
      };
      const txSign = await provider.request({
        method: "xrpl_submitTransaction",
        params: {
          transaction: tx,
        },
      });
      return txSign;
    } else {
      return "failed to fetch accounts";
    }
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
