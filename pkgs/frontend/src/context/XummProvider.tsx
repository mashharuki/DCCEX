import { GlobalContext } from '@/context/GlobalProvider';
import { EXPLORER, WS_URL } from "@/utils/consts";
import { getEnv } from "@/utils/getEnv";
import React, { createContext, useContext, useState } from 'react';
import {
  AccountSetAsfFlags,
  AccountSetTfFlags,
  Client,
  TrustSetFlags,
  Wallet,
  dropsToXrp,
  xrpToDrops
} from 'xrpl';
import { Xumm } from "xumm";

export type TokenInfo = {
  "id": number | null;
  "currency": string | null;
  "value": string;
  "issuer": string | null;
}

export type AmmInfo = {
  "command": string;
  "asset": {
    "currency": string;
    "issuer": string;
  },
  "asset2": {
    "currency": string;
    "issuer": string | null;
  } | null,
  "ledger_index": "validated"
}

// XRPLインスタンスを作成
const client = new Client(WS_URL);
export const XummContext = createContext<any>({});

/**
 * XummProvider
 * @param param0 
 * @returns 
 */
export const XummProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [address, setAddress] = useState<string | null>();
  const [balance, setBalance] = useState<string | null>();
  const [xumm, setXumm] = useState<Xumm | null>();

  const globalContext = useContext(GlobalContext);

  /**
   * 初期化＆認証メソッド
   */
  const login = async():Promise<any> => {
    // get env
    const { XRP_API_KEY } = await getEnv();
    // XUMM用のインスタンスを作成する。
    const newXumm = new Xumm(XRP_API_KEY);

    try {
      globalContext.setLoading(true)

      // authorize
      await newXumm.authorize();
      const account = await newXumm.user.account;
      const userInfo = await newXumm.user;
      console.log("user info:", userInfo);
      console.log("account address:", account);
  
      setAddress(account);
      setXumm(newXumm);
      await getAccountInfo(account!);
    } catch(err) {
      console.error("eer:", err)
    } finally {
      globalContext.setLoading(false)
    }
  }

  /**
   * アカウント情報を取得するメソッド
   */
  const getAccountInfo = async(
    address: string
  ) => {
    try {
      // Connect to the client   
      await client.connect();
      
      const {
        result: { account_data },
      }: any = await client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated',
      });

      const newBalance = dropsToXrp(account_data.Balance);
      console.log("account's balance: ", newBalance)

      setBalance(newBalance);
    } catch (error) {
      console.error("err", error);
    } finally {
      await client.disconnect();
    }
  };

  /**
   * faucet用のXRP 送信トランザクション
   */
  const sendFaucet = async(destination: string) => {
    try {
      globalContext.setLoading(true)
      // Connect to the client   
      await client.connect();
      // get env
      const { FAUCET_SEED } = await getEnv();
      // Create a wallet using the seed
      const wallet = await Wallet.fromSeed(FAUCET_SEED);

      // tx data
      const tx: any = {
        TransactionType: 'Payment',
        Amount: xrpToDrops(5), 
        Destination: destination,
      }

      tx.Account = wallet.address;
      // send faucet XRP
      const response = await client.submit(tx, { wallet });
      console.log("send FAUCET XRP res:", response);
      // 5秒後に新しい残高を取得
      setTimeout(async function() {
        await getAccountInfo(address!);
      }, 5000);
    } catch (error) { 
      console.error("send FAUCET XRP err", error);
      globalContext.setLoading(false);
    } finally {
      await client.disconnect();
      globalContext.setLoading(false);
    }
  }

  /**
   * トークンを新しく作るメソッド
   */
  const issueNewToken = async (
    currency_code: string, 
    issue_quantity: string
  ) => {
    try {
      globalContext.setLoading(true)
      // Connect to the client   
      await client.connect();
      // Create trust line to issuer ----------------------------------------------
      // get env
      const { FAUCET_SEED } = await getEnv();
      // Create a wallet using the seed
      const wallet = await Wallet.fromSeed(FAUCET_SEED);
      console.log(`Got faucet wallet address ${wallet.address}.`)
      const issuer = (await client.fundWallet(wallet)).wallet
      console.log(`Got issuer address ${issuer.address}.`)

      // Enable issuer DefaultRipple ----------------------------------------------
      const issuer_setup_result = await client.submitAndWait({
        "TransactionType": "AccountSet",
        "Account": issuer.address,
        "SetFlag": AccountSetAsfFlags.asfDefaultRipple,
        "Flags": (AccountSetTfFlags.tfDisallowXRP | AccountSetTfFlags.tfRequireDestTag)
      }, {
        autofill: true, 
        wallet: issuer
      } )

      // get metaData & TransactionResult
      const metaData: any = issuer_setup_result.result.meta!;
      const transactionResult = metaData.TransactionResult;

      if (transactionResult == "tesSUCCESS") {
        console.log(`Issuer DefaultRipple enabled: ${EXPLORER}/transactions/${issuer_setup_result.result.hash}`)
      } else {
        throw `Error sending transaction: ${issuer_setup_result}`
      }

      // Create trust line to issuer ----------------------------------------------
      const trust_result = await client.submitAndWait({
        "TransactionType": "TrustSet",
        "Account": wallet.address,              // トラストラインに設定したいアカウントを指定する。
        "Flags": TrustSetFlags.tfClearNoRipple, // 発行者アカウントでRipplingをオンにする。
        "LimitAmount": {
          "currency": currency_code,
          "issuer": issuer.address,
          "value": "100000000000000000" // Large limit, arbitrarily chosen
        }
      }, {
        autofill: true, 
        wallet: wallet
      })

      // get metaData & TransactionResult
      const metaData2: any = trust_result.result.meta!;
      const transactionResult2 = metaData2.TransactionResult;

      if (transactionResult2 == "tesSUCCESS") {
        console.log(`Trust line created: ${EXPLORER}/transactions/${trust_result.result.hash}`)
      } else {
        throw `Error sending transaction: ${trust_result}`
      }

      // Issue tokens -------------------------------------------------------------
      const issue_result = await client.submitAndWait({
        "TransactionType": "Payment",
        "Account": issuer.address,
        "Amount": {
          "currency": currency_code,
          "value": issue_quantity,
          "issuer": issuer.address
        },
        "Destination": wallet.address
      }, {
        autofill: true, 
        wallet: issuer
      })

       // get metaData & TransactionResult
       const metaData3: any = issue_result.result.meta!;
       const transactionResult3 = metaData3.TransactionResult;

      if (transactionResult3 == "tesSUCCESS") {
        console.log(`Tokens issued: ${EXPLORER}/transactions/${issue_result.result.hash}`)
      } else {
        throw `Error sending transaction: ${issue_result}`
      }

      const tokenInfo: TokenInfo = {
        "id": null,
        "currency": currency_code,
        "value": issue_quantity,
        "issuer": issuer.address
      }

      // AMM 作成コストを取得する
      const amm_fee_drops = await getAmmcost();
      // 発行した後にすぐにuserがSwapでトークンをゲットできるようにこのタイミングでXRPとのAMMを作成する。
      const ammcreate_result = await client.submitAndWait({
        "TransactionType": "AMMCreate",
        "Account": wallet.address,
        "Amount": {
          currency: tokenInfo.currency!,
          issuer: tokenInfo.issuer!,
          value: issue_quantity
        },
        "Amount2": xrpToDrops(10), // 10 XRP
        "TradingFee": 500, // 0.5%
        "Fee": amm_fee_drops
      }, {
        autofill: true, 
        wallet: wallet, 
        failHard: true
      })

      // get metaData & TransactionResult
      const metaData4: any = ammcreate_result.result.meta!;
      const transactionResult4 = metaData4.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult4 == "tesSUCCESS") {
        console.log(`AMM created: ${EXPLORER}/transactions/${ammcreate_result.result.hash}`)
        const amm_info_request: AmmInfo = {
          "command": "amm_info",
          "asset": {
            "currency": tokenInfo.currency!,
            "issuer": tokenInfo.issuer!,
          },
          "asset2": {
            "currency": "XRP",
            "issuer": null
          },
          "ledger_index": "validated"
        }
        // confirm AMM Info
        await confirmAmm(amm_info_request)
      } else {
        throw `Error sending transaction: ${JSON.stringify(ammcreate_result)}`
      }

      globalContext.setLoading(false);
      await client.disconnect();
      return tokenInfo;
    } catch(err) {
      console.error("err:", err)
      globalContext.setLoading(false);
      await client.disconnect();
      return null;
    }
  }

  /**
   * AMMのペアを新しく生成するメソッド
   */
  const createAmm = async(
    wallet: any,
    token1Info: TokenInfo,
    token2Info: TokenInfo,
    amm_fee_drops: string,
  ) => {
    try {
      globalContext.setLoading(true);
      var ammcreate_result;

      if(token2Info.currency != null) {
        ammcreate_result = await client.submitAndWait({
          "TransactionType": "AMMCreate",
          "Account": wallet.address,
          "Amount": {
            currency: token1Info.currency!,
            issuer: token1Info.issuer!,
            value: "15"
          },
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": "100"
          },
          "TradingFee": 500, // 0.5%
          "Fee": amm_fee_drops
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      } else {
        ammcreate_result = await client.submitAndWait({
          "TransactionType": "AMMCreate",
          "Account": wallet.address,
          "Amount": {
            currency: token1Info.currency!,
            issuer: token1Info.issuer!,
            value: "15"
          },
          "Amount2": token2Info.value,
          "TradingFee": 500, // 0.5%
          "Fee": amm_fee_drops
        }, {
          autofill: true, 
          wallet: wallet, 
          failHard: true
        })
      }
  
      // get metaData & TransactionResult
      const metaData: any = ammcreate_result.result.meta!;
      const transactionResult = metaData.TransactionResult;
    
      // Use fail_hard so you don't waste the tx cost if you mess up
      if (transactionResult == "tesSUCCESS") {
        console.log(`AMM created: ${EXPLORER}/transactions/${ammcreate_result.result.hash}`)
        console.log(`Created AMM Info: ${metaData}`)

        var amm_info_request: AmmInfo;
        // create AMM Info (another XRP pattern)
        if(token2Info.currency != null) {
          amm_info_request = {
            "command": "amm_info",
            "asset": {
              "currency": token1Info.currency!,
              "issuer": token1Info.issuer!,
            },
            "asset2": {
              "currency": token2Info.currency!,
              "issuer": token2Info.issuer!,
            },
            "ledger_index": "validated"
          }
        } else {
          amm_info_request = {
            "command": "amm_info",
            "asset": {
              "currency": token1Info.currency!,
              "issuer": token1Info.issuer!,
            },
            "asset2": {
              "currency": "XRP",
              "issuer": null
            },
            "ledger_index": "validated"
          }
        }
        // confirm AMM Info
        await confirmAmm(amm_info_request)
      } else {
        throw `Error sending transaction: ${JSON.stringify(ammcreate_result)}`
      }
    } catch(err) {
      console.error("create amm err:", err)
    } finally {
      globalContext.setLoading(false);
    }
  }
  
  /**
   * AMMのコストを取得するメソッド
   */
  const getAmmcost = async(): Promise<string> => {
    const ss = await client.request({
      "command": "server_state"
    })
    const amm_fee_drops = ss.result.state.validated_ledger!.reserve_inc.toString()
    console.log(`Current AMMCreate transaction cost: ${dropsToXrp(amm_fee_drops)} XRP`)

    return amm_fee_drops;
  }

  /**
   * すでにトークンペアのAMMが作成されているか確認する関数
   */
  const checkExistsAmm = async (
    amm_info_request: AmmInfo, 
    token1Info: TokenInfo,
    token2Info: TokenInfo,
  ) => {
    try {
      const amm_info_result = await client.request(amm_info_request)
      console.log(amm_info_result)
    } catch(err: any) {
      if (err.data.error === 'actNotFound') {
        if(token2Info.issuer != null) {
          console.log(`No AMM exists yet for the pair
            ${token2Info.currency}.${token2Info.issuer} /
            ${token1Info.currency}.${token1Info.issuer}
            (This is probably as expected.)`)
        } else {
          console.log(`No AMM exists yet for the pair
            XRP /
            ${token1Info.currency}.${token1Info.issuer}
            (This is probably as expected.)`)
        }
      } else {
        throw(err)
      }
    }
  };

  /**
   * AMMの情報を取得するメソッド
   */
  const confirmAmm = async(
    amm_info_request: AmmInfo
  ): Promise<any> => {
    try {
      globalContext.setLoading(true);
      // get AMM info
      const amm_info_result2 = await client.request(amm_info_request)
      console.log("amm_info_result2:", amm_info_result2)
  
      const results = amm_info_result2.result as any;

      console.log("amm_info_result2:", results.amm)
  
      const lp_token = results.amm.lp_token
      const amount = results.amm.amount
      const amount2 = results.amm.amount2
  
      const ammInfo: TokenInfo = {
        "id": null,
        "currency": lp_token.currency,
        "issuer": lp_token.issuer,
        "value": "0"
      }
  
      console.log(`The AMM account ${lp_token.issuer} has ${lp_token.value} total
                  LP tokens outstanding, and uses the currency code ${lp_token.currency}.`)
      if(amount2.currency != undefined) {
        console.log(`In its pool, the AMM holds ${amount.value} ${amount.currency}.${amount.issuer}
                     and ${amount2.value} ${amount2.currency}.${amount2.issuer}`)
      } else {
        console.log(`In its pool, the AMM holds ${amount.value} ${amount.currency}.${amount.issuer}
                     and ${amount2} XRP`)
      }
  
      globalContext.setLoading(false);
      return {
        ammInfo
      };
    } catch(err) {
      console.error("Check token balances err:", err)
      globalContext.setLoading(false);
      return null;
    }
  }

  /**
   * AMM Deposit メソッド
   */
  const depositAmm = async(
    token1Info: TokenInfo,
    token1Amount: string,
    token2Info: TokenInfo,
    token2Amount: string,
  ) => {
    var ammdeposit_result;
    // Connect to the client   
    await client.connect();
    try {
      globalContext.setLoading(true);

      // get env
      const { FAUCET_SEED } = await getEnv();
      // Create a wallet using the seed
      const wallet = await Wallet.fromSeed(FAUCET_SEED);
      
      if(token1Info.issuer != null && token2Info.issuer != null) {
        // send tokens before AMM Deposit 
        const { 
          created, 
          resolve, 
          resolved, 
          websocket 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "Payment",
          "Account": address,
          "Destination": wallet.address,      
          "DestinationTag": 1,
          "Amount": {
            "currency": token1Info.currency,        
            "value": token1Amount,                   
            "issuer": token1Info.issuer!
          },
        });

        console.log("Payment Payload URL:", created.next.always);
        console.log("Payment Payload QR:", created.refs.qr_png);
        
        websocket.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved;

        // send tokens before AMM Deposit 
        const { 
          created: created2, 
          resolve: resolve2, 
          resolved: resolved2, 
          websocket: websocket2 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "Payment",
          "Account": address,
          "Destination": wallet.address,      
          "DestinationTag": 1,
          "Amount": {
            "currency": token2Info.currency,        
            "value": token2Amount,                   
            "issuer": token2Info.issuer!
          },
        });

        console.log("Payment2 Payload URL:", created2.next.always);
        console.log("Payment2 Payload QR:", created2.refs.qr_png);
        
        websocket2.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve2({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved2;

        // AMM Deposit
        ammdeposit_result = await client.submitAndWait({
          "TransactionType": "AMMDeposit",
          "Account": wallet.address,
          "Amount": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": {
            "currency": token2Info.currency!,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Asset2": {
            "currency": token2Info.currency!,
            "issuer": token2Info.issuer!,
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet
        })

        // get metaData & TransactionResult
        const metaData: any = ammdeposit_result.result.meta!;
        const transactionResult = metaData.TransactionResult;
        // Use fail_hard so you don't waste the tx cost if you mess up
        if (transactionResult == "tesSUCCESS") {
          console.log(`AMM Deposit: ${EXPLORER}/transactions/${ammdeposit_result.result.hash}`)
          console.log(`Deposit AMM Info: ${metaData}`)
        } else {
          throw `Error sending transaction: ${JSON.stringify(ammdeposit_result)}`
        }
      } else if(token2Info.issuer == null) {
        // send tokens before AMM Deposit 
        const { 
          created, 
          resolve, 
          resolved, 
          websocket 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "Payment",
          "Account": address,
          "Destination": wallet.address,      
          "DestinationTag": 1,
          "Amount": {
            "currency": token1Info.currency!,        
            "value": token1Amount,                   
            "issuer": token1Info.issuer!
          },
        });

        console.log("Payment Payload URL:", created.next.always);
        console.log("Payment Payload QR:", created.refs.qr_png);
        
        websocket.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved;

        // send tokens before AMM Deposit 
        const { 
          created: created2, 
          resolve: resolve2, 
          resolved: resolved2, 
          websocket: websocket2 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "Payment",
          "Account": address,
          "Destination": wallet.address,      
          "DestinationTag": 1,
          "Amount": xrpToDrops(token2Amount), 
        });

        console.log("Payment2 Payload URL:", created2.next.always);
        console.log("Payment2 Payload QR:", created2.refs.qr_png);
        
        websocket2.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve2({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved2;
      
        // AMM Deposit
        ammdeposit_result = await client.submitAndWait({
          "TransactionType": "AMMDeposit",
          "Account": wallet.address,
          "Amount": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": xrpToDrops(token2Amount),
          "Asset": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Asset2": { 
            "currency": "XRP"
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet
        })

        // get metaData & TransactionResult
        const metaData: any = ammdeposit_result.result.meta!;
        const transactionResult = metaData.TransactionResult;
        // Use fail_hard so you don't waste the tx cost if you mess up
        if (transactionResult == "tesSUCCESS") {
          console.log(`AMM Deposit: ${EXPLORER}/transactions/${ammdeposit_result.result.hash}`)
          console.log(`Deposit AMM Info: ${metaData}`)
        } else {
          throw `Error sending transaction: ${JSON.stringify(ammdeposit_result)}`
        }
      } else if(token1Info.issuer == null) {
        // send tokens before AMM Deposit 
        const { 
          created, 
          resolve, 
          resolved, 
          websocket 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "Payment",
          "Account": address,
          "Destination": wallet.address,      
          "DestinationTag": 1,
          "Amount": {
            "currency": token2Info.currency,        
            "value": token2Amount,                   
            "issuer": token2Info.issuer!
          },
        });

        console.log("Payment Payload URL:", created.next.always);
        console.log("Payment Payload QR:", created.refs.qr_png);
        
        websocket.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved;

        // send tokens before AMM Deposit 
        const { 
          created: created2, 
          resolve: resolve2, 
          resolved: resolved2, 
          websocket: websocket2 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "Payment",
          "Account": address,
          "Destination": wallet.address,      
          "DestinationTag": 1,
          "Amount": xrpToDrops(token1Amount), 
        });

        console.log("Payment2 Payload URL:", created2.next.always);
        console.log("Payment2 Payload QR:", created2.refs.qr_png);
        
        websocket2.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve2({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved2;

        // AMM Deposit
        ammdeposit_result = await client.submitAndWait({
          "TransactionType": "AMMDeposit",
          "Account": wallet.address,
          "Amount": xrpToDrops(token1Amount),
          "Amount2": {
            "currency": token2Info.currency!,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": "XRP"
          },
          "Asset2": { 
            "currency": token2Info.currency!,
            "issuer": token2Info.issuer!,
          },
          "Flags" : 1048576,
        }, {
          autofill: true, 
          wallet: wallet
        })

        // get metaData & TransactionResult
        const metaData: any = ammdeposit_result.result.meta!;
        const transactionResult = metaData.TransactionResult;
        // Use fail_hard so you don't waste the tx cost if you mess up
        if (transactionResult == "tesSUCCESS") {
          console.log(`AMM Deposit: ${EXPLORER}/transactions/${ammdeposit_result.result.hash}`)
          console.log(`Deposit AMM Info: ${metaData}`)
        } else {
          throw `Error sending transaction: ${JSON.stringify(ammdeposit_result)}`
        }
      }
    } catch(err) {
      console.error("error occuered while depositAmm:", err)
    } finally {
      await client.disconnect();
      globalContext.setLoading(false);
    }
  }

  /**
   * AMM Withdraw メソッド
   */
  const withdrawAmm = async(
    token1Info: TokenInfo,
    token1Amount: string,
    token2Info: TokenInfo,
    token2Amount: string,
  ) => {
    try {
      globalContext.setLoading(true);
      if(token1Info.currency != null && token2Info.currency != null) { 
        // send LP Token to wallet address

        // withdraw AMM

        // send tokens to address from wallet.address
        const { 
          created, 
          resolve, 
          resolved, 
          websocket 
        } = await xumm!.payload!.createAndSubscribe({
            "TransactionType": "AMMWithdraw",
            "Account": address,
            "Amount": {
              "currency": token1Info.currency,
              "issuer": token1Info.issuer!,
              "value": token1Amount
            },
            "Amount2": {
              "currency": token2Info.currency,
              "issuer": token2Info.issuer!,
              "value": token2Amount
            },
            "Asset": {
              "currency": token1Info.currency,
              "issuer": token1Info.issuer!,
            },
            "Asset2": {
              "currency": token2Info.currency,
              "issuer": token2Info.issuer!,
            },
            "Fee" : "10",
            "Flags" : 1048576,
          })

        console.log("AMMWithdraw Payload URL:", created.next.always);
        console.log("AMMWithdraw Payload QR:", created.refs.qr_png);
        
        websocket.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved;
      } else if(token2Info.currency == null) {
        const { 
          created, 
          resolve, 
          resolved, 
          websocket 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "AMMWithdraw",
          "Account": address!,
          "Amount": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
            "value": token1Amount
          },
          "Amount2": token2Amount,
          "Asset": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Asset2": {
            "currency": "XRP"
          },
          "Fee" : "10",
          "Flags" : 1048576,
        })
        
        console.log("AMMWithdraw Payload URL:", created.next.always);
        console.log("AMMWithdraw Payload QR:", created.refs.qr_png);
        
        websocket.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved;
      } else if(token1Info.currency == null) {
        const { 
          created, 
          resolve, 
          resolved, 
          websocket 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "AMMWithdraw",
          "Account": address!,
          "Amount": token1Amount,
          "Amount2": {
            "currency": token2Info.currency,
            "issuer": token2Info.issuer!,
            "value": token2Amount
          },
          "Asset": {
            "currency": "XRP"
          },
          "Asset2": { 
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
          },
          "Flags" : 1048576,
        })

        console.log("AMMWithdraw Payload URL:", created.next.always);
        console.log("AMMWithdraw Payload QR:", created.refs.qr_png);
        
        websocket.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };

        await resolved;
      }
    } catch(err) {
      console.error("error occuered while withdrawAmm:", err)
    } finally {
      globalContext.setLoading(false);
    }
  };

  /**
   * Swap
   */
  const swap = async(
    token1Info: TokenInfo,
    token2Info: TokenInfo,
    token1Value: string,
    token2Value: string
  ) => {
    // path find
    var result; 
    
    try {
      // Connect to the client   
      await client.connect();
      globalContext.setLoading(true);
    
      if(token1Info.currency != null && token2Info.currency != null) { 
        result = await client.request({
          command: 'path_find',
          subcommand: 'create',
          source_account: address,
          source_amount: {
            "currency": token2Info.currency,  
            "value": token2Value,                   
            "issuer": token2Info.issuer
          },
          destination_account: address,
          destination_amount: {
            "currency": token1Info.currency,  
            "value": token1Value,                   
            "issuer": token1Info.issuer
          }
        });
      } else if(token2Info.currency == null) {
        result = await client.request({
          command: 'path_find',
          subcommand: 'create',
          source_account: address,
          source_amount: {
            "currency": "XRP",
          },
          destination_account: address,
          destination_amount: {
            "currency": token1Info.currency,  
            "value": token1Value,                   
            "issuer": token1Info.issuer
          }
        });
      } 
    
      console.log("path find:", result)

      // get env
      const { FAUCET_SEED } = await getEnv();
      // Create a wallet using the seed
      const wallet = await Wallet.fromSeed(FAUCET_SEED);

      // AccountSet Tx ------------------------------------------
      const { 
        created: create2, 
        resolve : resolve2, 
        resolved: resolved2, 
        websocket: websocket2 
      } = await xumm!.payload!.createAndSubscribe({
        "TransactionType": "AccountSet",
        "Account": address!,
        "Domain": "6578616D706C656D617368686172756B692E636F6D", 
        "SetFlag": AccountSetAsfFlags.asfDefaultRipple,
        "Flags": (AccountSetTfFlags.tfDisallowXRP | AccountSetTfFlags.tfRequireDestTag)
      })

      console.log("AccountSet Payload URL:", create2.next.always);
      console.log("AccountSet Payload QR:", create2.refs.qr_png);
      
      websocket2.onmessage = (msg) => {
        const data = JSON.parse(msg.data.toString());
        // トランザクションへの署名が完了/拒否されたらresolve
        if (typeof data.signed === "boolean") {
          resolve2({
            signed: data.signed,
            txid: data.txid,
          });
        }
      };

      // resolveされるまで待機
      await resolved2;
      
      // Create trust line (token1 & token2) to user ----------------------------------------------
      if(token1Info.issuer != null) {
        const { 
          created: create3, 
          resolve : resolve3, 
          resolved: resolved3, 
          websocket: websocket3 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "TrustSet",
          "Account": address!,
          "Flags": TrustSetFlags.tfClearNoRipple, 
          "LimitAmount": {
            "currency": token1Info.currency!,
            "issuer": token1Info.issuer!,
            "value": "100000000000000000000000000" // Large limit, arbitrarily chosen
          }
        })
  
        console.log("TrustSet Payload URL:", create3.next.always);
        console.log("TrustSet Payload QR:", create3.refs.qr_png);
        
        websocket3.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve3({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };
  
        // resolveされるまで待機
        await resolved3;
      }
      if(token2Info.issuer != null) {
        const { 
          created: create3, 
          resolve : resolve3, 
          resolved: resolved3, 
          websocket: websocket3 
        } = await xumm!.payload!.createAndSubscribe({
          "TransactionType": "TrustSet",
          "Account": address!,
          "Flags": TrustSetFlags.tfClearNoRipple, 
          "LimitAmount": {
            "currency": token2Info.currency!,
            "issuer": token2Info.issuer!,
            "value": "100000000000000000000000000" // Large limit, arbitrarily chosen
          }
        })
  
        console.log("TrustSet Payload URL:", create3.next.always);
        console.log("TrustSet Payload QR:", create3.refs.qr_png);
        
        websocket3.onmessage = (msg) => {
          const data = JSON.parse(msg.data.toString());
          // トランザクションへの署名が完了/拒否されたらresolve
          if (typeof data.signed === "boolean") {
            resolve3({
              signed: data.signed,
              txid: data.txid,
            });
          }
        };
  
        // resolveされるまで待機
        await resolved3;
      }
      
      // Swap用のトランザクションデータを作成する
      var swapTxData: any;

      if(token1Info.currency != null && token2Info.currency != null) { 
        swapTxData = {
          "TransactionType": "Payment",
          "Account": address,
          "Destination": address,      // AMMの際は自分自身のアドレスを指定
          "DestinationTag": 1,
          "Amount": {
            "currency": token1Info.currency,        // ここで変換先トークンの種類を指定する。
            "value": token1Value,                   // ここで変換先トークンの金額を指定する。
            "issuer": token1Info.issuer!
          },
          "SendMax": {
            "currency": token2Info.currency,  // ここで変換先のトークンの種類を指定する。
            "value": token2Value,
            "issuer": token2Info.issuer!
          },
          "Paths": [
            [
              {
                "account": token2Info.issuer!,
                "type": "1"
              },
              {
                "currency": token1Info.currency,
                "issuer": token1Info.issuer!,
                "type": "48"
              }
            ]
          ]
        }
      } else if (token2Info.currency == null) { // XRP > その他のトークン
        swapTxData = {
          "TransactionType": "Payment",
          "Account": address,
          "Destination": address,      // AMMの際は自分自身のアドレスを指定
          "DestinationTag": 1,
          "Amount": {
            "currency": token1Info.currency,        // ここで変換先トークンの種類を指定する。
            "value": token1Value,                   // ここで変換先トークンの金額を指定する。
            "issuer": token1Info.issuer
          },
          "SendMax": token2Value,
          "Paths": [
            [
              {
                "currency": token1Info.currency,
                "issuer": token1Info.issuer,
                "type": 48
              }
            ]
          ]
        }
      } else if (token1Info.currency == null) { // その他のトークン > XRP
        swapTxData = {
          "TransactionType": "Payment",
          "Account": address,
          "Destination": address,      // AMMの際は自分自身のアドレスを指定
          "DestinationTag": 1,
          "Amount": token1Value,
          "SendMax": {
            "currency": token2Info.currency,        // ここで変換先トークンの種類を指定する。
            "value": token2Value,                   // ここで変換先トークンの金額を指定する。
            "issuer": token2Info.issuer
          },
          "Paths": [
            [
              {
                "currency": "XRP",
                "type": 16
              }
            ]
          ]
        }
      }

      // Swap用のトランザクションを実行
      const { 
        created, 
        resolve, 
        resolved, 
        websocket 
      } = await xumm!.payload!.createAndSubscribe(swapTxData)

      console.log("Payload URL:", created.next.always);
      console.log("Payload QR:", created.refs.qr_png);
      
      websocket.onmessage = (msg) => {
        const data = JSON.parse(msg.data.toString());
        // トランザクションへの署名が完了/拒否されたらresolve
        if (typeof data.signed === "boolean") {
          resolve({
            signed: data.signed,
            txid: data.txid,
          });
        }
      };

      // resolveされるまで待機
      await resolved;
      
      // Check balances ------------------------------------------------------------
      console.log("Getting hot address balances...");
      // get hot address data
      const balances = await client.request({
        command: "account_lines",
        account: address,
        ledger_index: "validated"
      })
      console.log("address's balance Info:", balances.result);
    } catch(err) {
      console.error("error occuered while swaping:", err);
    } finally {
      globalContext.setLoading(false);
      await client.disconnect();
    }
  };

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = {
    address,
    balance,
    xumm,
    login,
    sendFaucet,
    issueNewToken,
    createAmm,
    getAmmcost,
    checkExistsAmm,
    confirmAmm,
    depositAmm,
    withdrawAmm,
    swap
  };

  return (
    <XummContext.Provider value={global}>
      {children}
    </XummContext.Provider>
  )
}