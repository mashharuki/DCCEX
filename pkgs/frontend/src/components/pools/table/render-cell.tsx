import React from "react";

interface Props {
  lpTokenInfo: any;
  columnKey: string | React.Key;
}

/**
 * RenderCell Component
 * @param param0 
 * @returns 
 */
export const RenderCell = ({ 
  lpTokenInfo, 
  columnKey 
}: Props) => {

  // @ts-ignore
  const cellValue = lpTokenInfo[columnKey];

  console.log("lpTokenInfo:", lpTokenInfo)
  console.log("columnKey:", columnKey)
  console.log("cellValue:", lpTokenInfo.lptokencode)

  /**
   * 文字列を表示用に加工する
   * @param inputString 
   * @returns 
   */
  const outPutChar = (inputString: string) => {
    if (inputString.length < 4) {
      console.error('文字列が短すぎます');
      return;
    }
  
    const firstFourChars = inputString.slice(0, 4);
    const lastFourChars = inputString.slice(-4);
  
    return firstFourChars + '...' + lastFourChars;
  }
  
  // get LP Token info by XRPL API
  /*
  const init = async() => {
    // amm info request
    const amm_info_request = {
      "command": "amm_info",
      "asset": {
        "currency": lpTokenInfo.token1Currency,
        "issuer": lpTokenInfo.token1Issuer,
      },
      "asset2": {
        "currency": lpTokenInfo.token2Currency,
        "issuer": lpTokenInfo.token2Issuer, 
      },
      "ledger_index": "validated"
    }
    // get AMMInfo
    const result: ConfrimAmmInfo = await xumm.confirmAmm(amm_info_request);
    setAmmInfos(result);
  }

  useEffect(() => {
    init();
  }, [])
  */

  switch (columnKey) {
    case "lpTokenCode":
      return (
        <div>
          <div className="text-left">
            <span>{outPutChar(lpTokenInfo.lptokencode)}</span>
          </div>
        </div>
      );
    case "lpTokenBalance":
      return (
        <div>
          <div className="text-left">
            {"0.0"}
          </div>
        </div>
      );
    case "token1Currency":
      return (
        <div>
          <div className="text-left">
            <span>{lpTokenInfo.token1currency}</span>
          </div>
        </div>
      );
    case "token1Balance":
      return (
        <div>
          <div className="text-left">
            {"0.0"}
          </div>
        </div>
      );
    case "token2Currency":
      return (
        <div>
          <div className="text-left">
            <span>{lpTokenInfo.token2currency}</span> 
          </div>
        </div>
      );
    case "token2Balance":
      return (
        <div>
          <div className="text-left">
            {"0.0"}
          </div>
        </div>
      );
    default:
      return "";
  }
};