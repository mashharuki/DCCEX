import { GlobalContext } from '@/context/GlobalProvider';
import { ConfrimAmmInfo, XummContext } from '@/context/XummProvider';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import InputNumberBox from '../common/inputBox/InputNumberBox';
import { PageHeader } from "../common/pageHeader";
import Spinner from '../common/spinner';
import styles from "./../createToken/createForm/CreateForm.module.css";

/**
 * PoolDetailContent Component
 * @returns 
 */
export const PoolDetailContent = () => {
  const router = useRouter();
  const xumm = useContext(XummContext);
  const globalContext = useContext(GlobalContext);
  const [lpTokenInfo, setLpTokenInfo] = useState<ConfrimAmmInfo>();

  /**
   * 初期化メソッド
   */
  const init = async() => {
    globalContext.setLoading(true);
    //プール情報を取得する
    await xumm.clientConnect();
    const poolInfo = await xumm.confirmAmm({
      "command": "amm_info",
      "asset": {
        "currency": router.query.token1Currency,
        "issuer": router.query.token1Issuer
      },
      "asset2": {
        "currency": router.query.token2Currency,
        "issuer": router.query.token2Currency != "XRP" ? router.query.token2Issuer : null
      },
      "ledger_index": "validated"
    });

    console.log("poolInfo:", poolInfo)
    //await xumm.clientDisConnect();
    setLpTokenInfo(poolInfo!);
    globalContext.setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className=" h-full">
      <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6  gap-6 flex flex-col w-full">
          {globalContext.loading ? (
            <Spinner/>
          ) : (
            <>
              {xumm.address == null ? (
                <h2 className='justify-center text-center'>Please Login!</h2>
              ) : (
                <>
                  {/* PageHeader */}
                  <PageHeader/>
                  <div className="h-full flex flex-col gap-2">
                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center flex-col rounded-b-lg p-5 mx-auto">
                        <div className=" mx-auto mt-10 bg-gray-900 w-500 rounded-t-lg px-5">
                          <div className="text-center bg-gray-900 text-white rounded-lg p-2 mt-10 cursor-pointer text-4xl">
                            Pool Detail Info
                          </div>
                        </div>
                        { lpTokenInfo != undefined && ( 
                          <div className={styles.tabBody}>
                            <InputNumberBox
                              leftHeader={"LpToken Code"}
                              right={""}
                              value={lpTokenInfo!.ammInfo.currency!}
                              onChange={() => {}}
                            />
                            <br/>
                            <InputNumberBox
                              leftHeader={"LpToken Balance"}
                              right={""}
                              value={lpTokenInfo!.ammInfo.value}
                              onChange={() => {}}
                            />
                            <br/>
                            <InputNumberBox
                              leftHeader={`Token1 Balance`}
                              right={""}
                              value={lpTokenInfo!.token1Amount}
                              onChange={() => {}}
                            />
                            <br/>
                            <InputNumberBox
                              leftHeader={"Token2 Balance"}
                              right={""}
                              value={lpTokenInfo!.token2Amount}
                              onChange={() => {}}
                            />
                            <br/>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
